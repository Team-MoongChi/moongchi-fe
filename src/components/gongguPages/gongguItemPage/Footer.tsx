import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const Wrap = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 2% 5%;
  border-top: 1px solid #c7d2fe;
  background-color: white;
`;
const Button = styled.div`
  background-color: #5849d0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px 50px;
  border-radius: 15px;
`;

interface FooterProp {
  editable: boolean | undefined;
  chatRoomId: number | undefined;
}

export default function Footer(props: FooterProp) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const navigate = useNavigate();

  const GotoChat = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth(
        `http://localhost:8080/api/group-boards/${gongguId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("공구방 참여 성공");
        navigate(`/chat/list/${props.chatRoomId}`);
      }
    } catch (error) {
      console.error("post failed: ", error);
      alert("공구방 참여 실패");
      throw error;
    }
  };

  return (
    <Wrap $issmall={small}>
      {props.editable ? (
        <Button onClick={() => navigate(`/chat/list/${props.chatRoomId}`)}>
          채팅방 바로 가기
        </Button>
      ) : (
        <Button onClick={GotoChat}>공구 참여하기</Button>
      )}
    </Wrap>
  );
}
