import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import blue from "../../assets/images/moongchies/연보라뭉치.png";

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
const Main = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ImgNothing = styled.img`
  width: 200px;
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

const MyGongguPage = () => {
  const { small } = useDeviceSize();
  const [gonggus, setGonggus] = useState<Array<GongguItem>>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("/api/group-boards/me", {
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
        setGonggus(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper $isSmall={small}>
      <Header title="내가 올린 공구" route="/mypage" />
      {gonggus.length !== 0 ? (
        <Main>
          {gonggus?.map((gonggu) => (
            <GongguListItem {...gonggu} key={gonggu.id} />
          ))}
        </Main>
      ) : (
        <Main>
          <NWrapper>
            <ImgNothing src={blue}></ImgNothing>
            <PNothing>공구를 생성하면</PNothing>
            <PNothing>여기서 확인할 수 있어요.</PNothing>
          </NWrapper>
        </Main>
      )}
    </Wrapper>
  );
};

export default MyGongguPage;
