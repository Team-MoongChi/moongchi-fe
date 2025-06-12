import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShoppingMenu from "./ShoppingMenu";
import banner1 from "../../../assets/images/common/banner1.png";
import bannerButtonLeft from "../../../assets/images/common/배너버튼_왼.png";
import bannerButtonRight from "../../../assets/images/common/배너버튼_오.png";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const images = [banner1, banner1, banner1];

const Wrapper = styled.div`
  padding-top: 4%;
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
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
  padding: 5% 3% 0 3%;
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;
const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
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
  border: 2px solid #eff3ff;
`;
const ItemName = styled.div`
  font-size: 15px;
  padding-left: 2px;
`;
const Price = styled.div`
  font-size: 15px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
  padding-left: 2px;
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

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleItemClick = (itemId: number) => {
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("/api/products", {
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
        console.log(result);
        setProducts(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  const title = () => {
    if (menuClicked === 0) {
      return <Title>공구 열기 좋은 물건을 찾아 왔어요!</Title>;
    } else if (menuClicked === 1) {
      return <Title>전체</Title>;
    } else if (menuClicked === 2) {
      return <Title>신선식품</Title>;
    } else if (menuClicked === 3) {
      return <Title>가공식품</Title>;
    } else if (menuClicked === 4) {
      return <Title>생활용품</Title>;
    } else if (menuClicked === 5) {
      return <Title>주방용품</Title>;
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
      <ShoppingMenu menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
      {title()}
      <Items>
        {products.map((product) => (
          <Item key={product.id} onClick={() => handleItemClick(product.id)}>
            <Img src={product.imgUrl}></Img>
            <ItemName>{product.name}</ItemName>
            <Price>{product.price.toLocaleString()}원</Price>
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
};

export default Main;
