import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import clickedHeart from "../../../assets/images/common/누른하트.png";
import unclickedHeart from "../../../assets/images/common/안누른하트.png";

const Wrap = styled.div<{ $isSmall: boolean }>`
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-between;
  gap: 3vw;
  align-items: center;
  padding: 0 5%;
  background-color: white;
  border-top: 1px solid #e8edff;
  position: fixed;
  bottom: 0;
  height: 90px;
  z-index: 1;
`;

const HeartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  flex: 1;
  background-color: #5849d0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px 0;
  border-radius: 15px;
`;

interface FooterProp {
  editable: boolean | undefined;
  chatRoomId: number | undefined;
  likeCount: number | undefined;
}

export default function Footer(props: FooterProp) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState<boolean>(false);
  const [clickCnt, setClickCnt] = useState<number>(props.likeCount || 0);

  const GotoChat = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth(
        `/api/group-boards/${gongguId}/join`,
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
    <Wrap $isSmall={small}>
      <HeartWrap>
        <Img src={unclickedHeart} width="45px" height="45px"></Img>
        <Text fontSize="15px" fontFamily="DunggeunmisoBold" color="#5849d0">
          {clickCnt}
        </Text>
      </HeartWrap>
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
