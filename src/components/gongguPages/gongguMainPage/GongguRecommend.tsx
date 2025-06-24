import styled from "styled-components";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import RecPartProfile from "./RecPartProfile";
import { useEffect, useState } from "react";

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
`;
const Title = styled(Text)`
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  // const dummy = [
  //   {
  //     userId: 3,
  //     nickname: "하은",
  //     profileUrl:
  //       "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg",
  //     mannerLeader: 53,
  //     role: "LEADER",
  //   },
  //   {
  //     userId: 4,
  //     nickname: "재은",
  //     profileUrl:
  //       "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg",
  //     mannerLeader: 53,
  //     role: "MEMBER",
  //   },
  // ];
  const [loading, setLoading] = useState<boolean>(false);
  const [recommend, setRecommend] = useState<RecommendItem[]>([]);

  const fetchRecommend = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);

    try {
      const response = await fetchWithAuth("/api/group-boards", {
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

  if (loading) return <div>loading...</div>;
  return (
    <Wrap>
      <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
        뭉치's PICK
      </Text>
      <RecList>
        <ScrollArea>
          {recommend.map((item, idx) => (
            <RecItem key={idx}>
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
      </RecList>
    </Wrap>
  );
}
