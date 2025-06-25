import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useHistoryStack } from "../../../utils/useHistoryStack";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import RecPartProfile from "./RecPartProfile";
import { useEffect, useState } from "react";
import loadingM from "../../../assets/images/moongchies/로딩중.gif";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RecList = styled.div`
  width: 100%;
  height: auto;
  background-color: #e8edff;
  border-radius: 6px;
  padding: 20px;
`;
const ScrollArea = styled.div`
  display: flex;
  gap: 10px;

  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const RecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Title = styled(Text)`
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  img {
    width: 200px;
  }
  p {
    color: #5849d0;
    font-family: DunggeunmisoBold;
  }
`;

interface Participant {
  userId: number;
  profileUrl: string;
}
interface RecommendItem {
  id: number;
  title: string;
  boardStatus: "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
  image: string;
  totalUsers: number;
  currentUsers: number;
  participants: Participant[];
}

export default function GongguRecommend() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recommend, setRecommend] = useState<RecommendItem[]>([]);

  const navigate = useNavigate();
  const { push } = useHistoryStack();

  const fetchRecommend = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);

    try {
      const response = await fetchWithAuth("/api/group-boards/recommend", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: RecommendItem[] = await response.json();
      console.log(data);
      setRecommend(data);
      setLoading(false);
    } catch (error) {
      console.error("recommend get failed: ", error);
      setLoading(false);
      throw error;
    }
  };
  useEffect(() => {
    fetchRecommend();
  }, []);

  const handleClick = (id: number) => {
    push(); // 현재 경로 저장
    navigate(`/gonggu/list/${id}`);
  };

  return (
    <Wrap>
      <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
        AI 뭉치's PICK
      </Text>
      <RecList>
        {loading ? (
          <LoadingWrapper>
            <img src={loadingM} alt="" />
            <p>추천 공구를 불러오고 있어요!</p>
          </LoadingWrapper>
        ) : (
          <ScrollArea>
            {recommend.map((item, idx) => (
              <RecItem key={idx} onClick={() => handleClick(item.id)}>
                <Img
                  src={item.image}
                  width="100px"
                  height="100px"
                  $borderradious="8px"
                ></Img>
                <Title fontSize="15px">{item.title}</Title>
                <RecPartProfile
                  totalUser={item.totalUsers}
                  currentUsers={item.currentUsers}
                  participants={item.participants}
                />
                <Text fontSize="10px">
                  ({item.currentUsers}/{item.totalUsers})
                </Text>
              </RecItem>
            ))}
          </ScrollArea>
        )}
      </RecList>
    </Wrap>
  );
}
