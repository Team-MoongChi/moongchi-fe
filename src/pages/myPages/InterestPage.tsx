import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import Header from "../../components/common/Header";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import pink from "../../assets/images/moongchies/빨간뭉치.png";
import mint from "../../assets/images/moongchies/초록뭉치.png";
import { useNavigate } from "react-router-dom";
import { useHistoryStack } from "../../utils/useHistoryStack";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  min-height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Main1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;
const Main2 = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 90px;
`;
const ImgNothing = styled.img`
  width: 170px;
`;
const PNothing = styled.p`
  font-size: 21px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;
const NWrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
const Toggle = styled.div<{ $isSmall: boolean }>`
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
`;
const GongguB = styled.button<{ $state: boolean }>`
  background-color: ${(props) => (props.$state ? "#5849D0" : "#E8EDFF")};
  width: 50%;
  font-size: 20px;
  ${(props) => props.$state && "font-family: DunggeunmisoBold;"}
  color: ${(props) => (props.$state ? "white" : "#5849D0")};
  transition: background-color 0.3s ease;
`;
const ItemB = styled.button<{ $state: boolean }>`
  background-color: ${(props) => (props.$state ? "#E8EDFF" : "#5849D0")};
  width: 50%;
  font-size: 20px;
  ${(props) => !props.$state && "font-family: DunggeunmisoBold;"}
  color: ${(props) => (props.$state ? "#5849D0" : "white")};
  transition: background-color 0.3s ease;
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
  border: 2px solid #eff3ff;
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

type BoardStatus = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Participant {
  userId: number;
  nickname: string;
  profileUrl: string;
  mannerLeader: number;
  role: "LEADER" | "MEMBER";
}
export interface GongguItem {
  id: number;
  title: string;
  price: number;
  location: string;
  boardStatus: BoardStatus;
  totalUsers: number;
  currentUsers: number;
  createAt: string;
  image: string;
  participants: Participant[];
}

interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCatogry?: string;
  mediumCategory?: string;
  smallCategory?: string;
}

const InterestPage = () => {
  const { small } = useDeviceSize();
  const [gonggus, setGonggus] = useState<Array<GongguItem>>([]);
  const [items, setItems] = useState<Array<ShoppingItem>>([]);
  const [state, setState] = useState<boolean>(true);
  const navigate = useNavigate();
  const { push } = useHistoryStack();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth(`/api/${state ? "group-boards" : "products"}/like`, {
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
        if (state) {
          setGonggus(result);
        } else {
          setItems(result);
        }
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [state]);

  const ClickButton = (value: boolean) => {
    setState(value);
    console.log(value);
  };

  const itemInfo = (itemId: number) => {
    push();
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  return (
    <Wrapper $isSmall={small}>
      <Header title="관심 목록" route="/mypage" />

      {(state ? gonggus.length : items.length) !== 0 ? (
        <>
          {state ? (
            <Main1>
              {gonggus?.map((gonggu) => (
                <GongguListItem {...gonggu} key={gonggu.id} />
              ))}
            </Main1>
          ) : (
            <Main2>
              <Items>
                {items?.map((item) => (
                  <Item key={item.id} onClick={() => itemInfo(item.id)}>
                    <Img src={item.imgUrl}></Img>
                    <ItemName>{item.name}</ItemName>
                    <Price>{item.price.toLocaleString()}원</Price>
                  </Item>
                ))}
              </Items>
            </Main2>
          )}
        </>
      ) : (
        <>
          <NWrapper>
            <ImgNothing src={state ? pink : mint}></ImgNothing>
            <PNothing>하트 누른 {state ? "공구" : "상품"}를</PNothing>
            <PNothing>여기서 확인할 수 있어요!</PNothing>
          </NWrapper>
        </>
      )}
      <Toggle $isSmall={small}>
        <GongguB $state={state} onClick={() => ClickButton(true)}>
          공구
        </GongguB>
        <ItemB $state={state} onClick={() => ClickButton(false)}>
          쇼핑 상품
        </ItemB>
      </Toggle>
    </Wrapper>
  );
};

export default InterestPage;
