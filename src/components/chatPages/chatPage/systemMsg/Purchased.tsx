import styled from "styled-components";

import FetchButton from "../FetchButton";
import { Text } from "../../../common/styled-component/Text";
import SpeechBubble from "../SpeechBubble";
import ai from "../../../../assets/images/moongchies/AI뭉치.png";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Highlight = styled.span`
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;
const Hr = styled.hr`
  height: 1px;
  border: none;
  background-color: #b6c8ef;
  margin: 5px 0;
`;

interface PurchasedProps {
  chatRoomId: number;
  address: string;
}

export default function Purchased(props: PurchasedProps) {
  return (
    <SpeechBubble profileUrl={ai} isMe={false}>
      <Wrap>
        <Text fontSize="16px">
          <Highlight>구매가 완료되었어요!</Highlight>
        </Text>
        <Text fontSize="16px">리더가 원하는 장소는 다음과 같아요.</Text>
        <Hr />
        <Text fontSize="16px">
          <Highlight>장소: </Highlight>
          {props.address}
        </Text>
        <Hr />
        <Text fontSize="16px">
          채팅에서 <Highlight>장소와 시간</Highlight>에 대해 결정해 주세요.
        </Text>
      </Wrap>
    </SpeechBubble>
  );
}
