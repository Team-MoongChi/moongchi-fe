import styled from "styled-components";

import FetchButton from "../FetchButton";
import SpeechBubble from "../SpeechBubble";
import { fetchWithAuth } from "../../../../utils/FetchWithAuth";
import { Text } from "../../../common/styled-component/Text";
import ai from "../../../../assets/images/moongchies/AI뭉치.png";
import { useEffect, useState } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Highlight = styled.span`
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;

interface PayingProps {
  chatRoomId: number;
  chatRoomStatus: string;
  isLeader: boolean;
}

export default function Paying(props: PayingProps) {
  const [paid, setPaid] = useState<boolean>(false);

  const fetchPurchase = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    try {
      const response = await fetchWithAuth(
        `/api/chat/rooms/${props.chatRoomId}/purchase-complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("구매 완료!");
        setPaid(true);
      }
    } catch (error) {
      console.log("patch failed: ", error);
      alert("구매 완료 실패");
      throw error;
    }
  };

  useEffect(() => {
    if (props.chatRoomStatus === "구매완료") {
      setPaid(true);
    }
    console.log("채팅방 상태", props.chatRoomStatus);
  }, [props.chatRoomStatus]);

  const paidAlert = () => {
    alert("이미 구매 완료 처리 되었습니다.");
  };

  return (
    <SpeechBubble profileUrl={ai} isMe={false}>
      {props.isLeader ? (
        <Wrap>
          <Text fontSize="16px">결제가 모두 완료되었어요.</Text>
          <Text fontSize="16px">
            리더님, 물품을 구매 후 <Highlight>구매 완료</Highlight>를
            눌러주세요!
          </Text>
          <FetchButton
            content="구매 완료"
            onClick={paid ? paidAlert : fetchPurchase}
          ></FetchButton>
        </Wrap>
      ) : (
        <Wrap>
          <Text fontSize="16px">
            <Highlight>리더가 구매를 진행 중</Highlight>입니다.
          </Text>
          <Text fontSize="16px">구매가 완료되면 다시 알려드릴게요!</Text>
        </Wrap>
      )}
    </SpeechBubble>
  );
}
