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

interface RecruitedProps {
  chatRoomId: number;
}

export default function Recruited(props: RecruitedProps) {
  return (
    <SpeechBubble profileUrl={ai} isMe={false}>
      <Wrap>
        <Text fontSize="16px">모집이 완료되었어요!</Text>
        <Text fontSize="16px">
          구매를 위해 <Highlight>결제를 진행</Highlight>해 주세요.
        </Text>
        <FetchButton
          content="결제 현황"
          link={`/chat/${props.chatRoomId}/pay`}
        ></FetchButton>
      </Wrap>
    </SpeechBubble>
  );
}
