import styled from "styled-components";

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

export default function Recruiting() {
  return (
    <SpeechBubble profileUrl={ai} isMe={false}>
      <Wrap>
        <Text fontSize="16px">안녕하세요!</Text>

        <Text fontSize="16px">
          공구 완료 시점까지 여러분과 함께 할 <Highlight>뭉치</Highlight>예요.
        </Text>

        <Text fontSize="16px">
          <Highlight>뭉치면 산다!</Highlight>
        </Text>
        <Text fontSize="16px">공구 인원이 모두 모이면 알려줄게요.</Text>
      </Wrap>
    </SpeechBubble>
  );
}
