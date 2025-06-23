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

interface PurchasedProps {
  chatRoomId: number;
}

export default function Completed(props: PurchasedProps) {
  return (
    <SpeechBubble profileUrl={ai} isMe={false}>
      <Wrap>
        <Text fontSize="16px">
          <Highlight>공구가 완료</Highlight>되었습니다.
        </Text>
        <Text fontSize="16px">
          공구 팀원들에게 <Highlight>리뷰</Highlight>를 남겨주세요!
        </Text>
        <FetchButton
          content="리뷰 작성"
          link={`/chat/${props.chatRoomId}/review`}
        ></FetchButton>
      </Wrap>
    </SpeechBubble>
  );
}
