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
const AIWrapper = styled.div`
  width: 100%;
  padding: 12px 0;
  background-color: #d4d8fb;
  border-top: 3px solid #b6b7ff;
  border-bottom: 3px solid #b6b7ff;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      <AIWrapper>
        <AIPick>
          {recommendItems?.map((item) => (
            <Item key={item.id} onClick={() => handleItemClick(item.id)}>
              <Img src={item.imgUrl}></Img>
              <ItemName>{item.name}</ItemName>
              <Price>{item.price.toLocaleString()}원</Price>
            </Item>
          ))}
        </AIPick>
      </AIWrapper>

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
