import { useState, useEffect } from "react";
import styled from "styled-components";
import ShoppingMenu from "./ShoppingMenu";
import MoongchiPick from "./MoongchiPick";
import banner1 from "../../../assets/images/common/배너1.png";
import banner2 from "../../../assets/images/common/배너2.png";
import banner3 from "../../../assets/images/common/배너3.png";
import bannerButtonLeft from "../../../assets/images/common/배너버튼_왼.png";
import bannerButtonRight from "../../../assets/images/common/배너버튼_오.png";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import AIMoongchii from "../../../assets/images/moongchies/AI뭉치.png";
import InfiniteScroll from "react-infinite-scroll-component";
import loadingImg from "../../../assets/images/moongchies/로딩중.gif";
import { useHistoryStack } from "../../../utils/useHistoryStack";

const SHOPPING_STATE_KEY = "shoppingPageState";

const images = [banner1, banner2, banner3];

const Wrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.$index * 100}%);
`;

const SlideItem = styled.img`
  min-width: 100%;
  object-fit: cover;
`;

const NavButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  border: none;
  cursor: pointer;

  ${(props) => (props.$left ? "left: 10px;" : "right: 10px;")}
`;
const BannerButtonImg = styled.img`
  width: 20px;
`;
const Title = styled.div`
  font-size: 20px;
  padding: 3% 3% 0 3%;

  color: #5849d0;
  font-family: DunggeunmisoBold;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Items = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px 10px 0px 10px;
`;
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 10px;
  gap: 3px;
  width: 50%;
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/0.65;
  border: none;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #eff3ff;
  background-color: white;
`;
const ItemName = styled.div`
  width: 100%;
  font-size: 15px;
  padding-left: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: black;
`;
const Price = styled.div`
  font-size: 15px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
  padding-left: 2px;
`;
const Moongchi = styled.img`
  width: 25px;
`;
const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const LoadingImg = styled.img`
  width: 170px;
`;

type Product = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string | null;
};

const Main = () => {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState<Array<Product>>([]);
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState<number>(0);
  const menuOrder = [0, 1, 2, 3, 4];
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { push } = useHistoryStack();

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleItemClick = (itemId: number) => {
    push();
    const state = {
      menuClicked,
      scrollY: window.scrollY,
    };
    sessionStorage.setItem(SHOPPING_STATE_KEY, JSON.stringify(state));
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  // 마운트 시 복원
  useEffect(() => {
    const raw = sessionStorage.getItem(SHOPPING_STATE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved.menuClicked) setMenuClicked(saved.menuClicked);
      setTimeout(() => {
        if (saved.scrollY) window.scrollTo(0, saved.scrollY);

        sessionStorage.removeItem(SHOPPING_STATE_KEY);
      }, 100);
    }
  }, []);

  const fetchData = async () => {
    if (menuClicked === 0) return;
    const lastItemId = products[products.length - 1]?.id ?? 0;

    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등
    const url = `/api/products/categories/${menuClicked}/scroll${
      lastItemId !== 0 ? `?lastId=${lastItemId}` : ""
    }`;

    fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // 예: 401, 404, 500 등일 때
          throw new Error(`서버 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setProducts([...products, ...result]);
        if (result.length === 0) setHasMore(false);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  useEffect(() => {
    setProducts([]); // 상품 초기화
    setHasMore(true); // hasMore 초기화
    fetchData();
  }, [menuClicked]);

  const title = () => {
    if (menuClicked === menuOrder[0]) {
      return (
        <Title>
          <Moongchi src={AIMoongchii} />
          AI 뭉치가 추천하는 공구템이에요!
        </Title>
      );
    } else if (menuClicked === menuOrder[1]) {
      return <Title>신선식품</Title>;
    } else if (menuClicked === menuOrder[2]) {
      return <Title>가공식품</Title>;
    } else if (menuClicked === menuOrder[3]) {
      return <Title>주방용품</Title>;
    } else if (menuClicked === menuOrder[4]) {
      return <Title>생활용품</Title>;
    }
  };

  return (
    <Wrapper>
      <SliderWrapper>
        <Slide $index={index}>
          {images.map((src, i) => (
            <SlideItem key={i} src={src} alt={`slide-${i}`} />
          ))}
        </Slide>
        <NavButton $left onClick={prevSlide}>
          <BannerButtonImg src={bannerButtonLeft} alt="" />
        </NavButton>
        <NavButton onClick={nextSlide}>
          <BannerButtonImg src={bannerButtonRight} alt="" />
        </NavButton>
      </SliderWrapper>
      <ShoppingMenu
        menuClicked={menuClicked}
        setMenuClicked={setMenuClicked}
        setHasMore={setHasMore}
        setProducts={setProducts}
      />
      {title()}
      {menuClicked === 0 ? (
        <MoongchiPick />
      ) : (
        <InfiniteScroll
          dataLength={products?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <Loading>
              <LoadingImg src={loadingImg} />
            </Loading>
          }
        >
          <Items>
            {products.map((product) => (
              <Item
                key={product.id}
                onClick={() => handleItemClick(product.id)}
              >
                <Img src={product.imgUrl}></Img>
                <ItemName>{product.name}</ItemName>
                <Price>{product.price.toLocaleString()}원</Price>
              </Item>
            ))}
          </Items>
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default Main;
