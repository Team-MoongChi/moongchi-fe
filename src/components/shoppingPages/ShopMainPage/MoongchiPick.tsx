import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import { useNavigate } from "react-router-dom";
import { useHistoryStack } from "../../../utils/useHistoryStack";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1%;
  background-color: white;
`;
const AIPick = styled.div`
  width: 100%;
  height: 170px;
  background-color: #d4d8fb;
  margin-bottom: 30px;
  border-top: 3px solid #b6b7ff;
  border-bottom: 3px solid #b6b7ff;
  display: flex;
  gap: 10px;
  padding: 0px 10px;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;
const RandomWrapper = styled.div`
  width: 100%;
  padding: 12px 0;
  background-color: #eff3ff;
  border-top: 3px solid #e8edff;
  border-bottom: 3px solid #e8edff;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RandomTitle = styled.p`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  padding: 3% 3% 2% 3%;
  margin-top: 10px;
  color: #5444ce;
`;
const RandomItemTitle = styled.p`
  font-size: 18px;
  font-family: DunggeunmisoBold;
  padding: 0 3% 1% 4%;
  color: #383838;
`;
const RandomItems = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0px 10px;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 3px;
  width: 26%;
  flex-shrink: 0;
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #e8edff;
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
  rating?: number;
  likeCount?: number;
  largeCategoryId?: number;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string;
};

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "샤오미 무선 청소기",
    price: 149000,
    imgUrl: "https://via.placeholder.com/150",
    productUrl: "https://example.com/product/1",
    rating: 4.5,
    likeCount: 123,
    largeCategoryId: 1,
    largeCategory: "가전",
    mediumCategory: "청소기",
    smallCategory: "무선청소기",
  },
  {
    id: 2,
    name: "로지텍 무선 마우스",
    price: 39000,
    imgUrl: "https://via.placeholder.com/150",
    productUrl: "https://example.com/product/2",
    rating: 4.8,
    likeCount: 85,
    largeCategoryId: 2,
    largeCategory: "컴퓨터",
    mediumCategory: "입력기기",
    smallCategory: "마우스",
  },
  {
    id: 3,
    name: "아이패드 10세대",
    price: 499000,
    imgUrl: "https://via.placeholder.com/150",
    productUrl: "https://example.com/product/3",
    rating: 4.7,
    likeCount: 300,
    largeCategoryId: 3,
    largeCategory: "전자기기",
    mediumCategory: "태블릿",
    smallCategory: "아이패드",
  },
  {
    id: 4,
    name: "나이키 에어맥스 270",
    price: 129000,
    imgUrl: "https://via.placeholder.com/150",
    productUrl: "https://example.com/product/4",
    rating: 4.2,
    likeCount: 190,
    largeCategoryId: 4,
    largeCategory: "패션",
    mediumCategory: "신발",
    smallCategory: "운동화",
  },
  {
    id: 5,
    name: "스타벅스 1만원 기프트카드",
    price: 10000,
    imgUrl: "https://via.placeholder.com/150",
    productUrl: "https://example.com/product/5",
    rating: 4.9,
    likeCount: 450,
    largeCategoryId: 5,
    largeCategory: "기프티콘",
    mediumCategory: "음료",
    smallCategory: "스타벅스",
  },
];

const MoongchiPick = () => {
  const token = localStorage.getItem("accessToken");
  const [freshItems, setFreshItems] = useState<Product[]>([]);
  const [processItems, setProcessItems] = useState<Product[]>([]);
  const [kitchenItems, setKitchenItems] = useState<Product[]>([]);
  const [livingItems, setLivingItems] = useState<Product[]>([]);
  const [recommendItems, setRecommendItems] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { push } = useHistoryStack();

  useEffect(() => {
    fetchWithAuth("/api/products/recommend", {
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
        setRecommendItems(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  console.log(recommendItems);

  useEffect(() => {
    fetchWithAuth("/api/products/main", {
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
        setFreshItems(result[0]);
        setProcessItems(result[1]);
        setKitchenItems(result[2]);
        setLivingItems(result[3]);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  const handleItemClick = (itemId: number) => {
    push();
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  return (
    <Wrapper>
      <AIPick>
        {dummyProducts?.map((item) => (
          <Item key={item.id} onClick={() => handleItemClick(item.id)}>
            <Img src={item.imgUrl}></Img>
            <ItemName>{item.name}</ItemName>
            <Price>{item.price.toLocaleString()}원</Price>
          </Item>
        ))}
      </AIPick>
      <>
        <RandomTitle>🛒 이런 카테고리 상품들도 눈여겨보세요!</RandomTitle>
        <RandomWrapper>
          <RandomItemTitle>신선식품</RandomItemTitle>
          <RandomItems>
            {freshItems?.map((item) => (
              <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                <Img src={item.imgUrl}></Img>
                <ItemName>{item.name}</ItemName>
                <Price>{item.price.toLocaleString()}원</Price>
              </Item>
            ))}
          </RandomItems>
        </RandomWrapper>
        <RandomWrapper>
          <RandomItemTitle>가공식품</RandomItemTitle>
          <RandomItems>
            {processItems?.map((item) => (
              <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                <Img src={item.imgUrl}></Img>
                <ItemName>{item.name}</ItemName>
                <Price>{item.price.toLocaleString()}원</Price>
              </Item>
            ))}
          </RandomItems>
        </RandomWrapper>
        <RandomWrapper>
          <RandomItemTitle>주방용품</RandomItemTitle>
          <RandomItems>
            {kitchenItems?.map((item) => (
              <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                <Img src={item.imgUrl}></Img>
                <ItemName>{item.name}</ItemName>
                <Price>{item.price.toLocaleString()}원</Price>
              </Item>
            ))}
          </RandomItems>
        </RandomWrapper>
        <RandomWrapper>
          <RandomItemTitle>생활용품</RandomItemTitle>
          <RandomItems>
            {livingItems?.map((item) => (
              <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                <Img src={item.imgUrl}></Img>
                <ItemName>{item.name}</ItemName>
                <Price>{item.price.toLocaleString()}원</Price>
              </Item>
            ))}
          </RandomItems>
        </RandomWrapper>
      </>
    </Wrapper>
  );
};
export default MoongchiPick;
