import styled from "styled-components";
import { useEffect, useState } from "react";

import FetchButton from "../FetchButton";
import SpeechBubble from "../SpeechBubble";
import { fetchWithAuth } from "../../../../utils/FetchWithAuth";
import { Text } from "../../../common/styled-component/Text";
import ai from "../../../../assets/images/moongchies/AI뭉치.png";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Highlight = styled.span`
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;

interface PurchasedFollowerProps {
  chatRoomId: number;
  chatRoomStatus: string;
  tradeCompleted: boolean;
  sendAt: string;
}

export default function PurchasedFollower(props: PurchasedFollowerProps) {
  const [completed, setCompleted] = useState<boolean>(false);

  const fetchTrade = async () => {
    try {
      const response = await fetchWithAuth(
        `/api/chat/rooms/${props.chatRoomId}/trade-complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("거래 완료!");
        setCompleted(true);
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("거래 완료 실패");
      throw error;
    }
  };

  useEffect(() => {
    if (props.tradeCompleted === true) {
      setCompleted(true);
    }
  }, [props.tradeCompleted]);

  const completedAlert = () => {
    alert("이미 거래 완료 처리 되었습니다.");
  };

  return (
    <SpeechBubble
      profileUrl={ai}
      isMe={false}
      displayProfile={false}
      displayTime={true}
      sendAt={props.sendAt}
    >
      <Wrap>
        <Text fontSize="16px">
          물건을 받으면 <Highlight>거래 완료</Highlight> 버튼을 눌러주세요.
        </Text>
        <Text fontSize="11px" color="#707070">
          고생한 리더의 빠른 정산을 위해 꼭! 버튼을 눌러주세요!
        </Text>
        <FetchButton
          content="거래 완료"
          onClick={completed ? completedAlert : fetchTrade}
        ></FetchButton>
      </Wrap>
    </SpeechBubble>
  );
}
