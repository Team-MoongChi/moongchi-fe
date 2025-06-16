import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import emptyBox from "../../../assets/images/gonggu/emptyBox.png";

const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #e8edff;
  border-radius: 6px;
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2vh;
  gap: 1vh;
`;
const Div = styled.div<{ $paddingbottom?: string }>`
  padding-bottom: ${(props) => props.$paddingbottom};
  display: flex;
`;

export default function GongguEmpty() {
  return (
    <EmptyList>
      <Div $paddingbottom="2vh">
        <Text fontSize="50px" fontFamily="DunggeunmisoBold" color="#5849d0">
          텅~
        </Text>
      </Div>
      <Img src={emptyBox} width="clamp(180px, 3vw, 180px)" />
      <TextWrap>
        <Div>
          <Text fontSize="20px">근처에서 열린 공구가&nbsp;</Text>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
            없어요.
          </Text>
        </Div>
        <Div>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold">
            제일 먼저&nbsp;
          </Text>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
            공구를 열어보세요!
          </Text>
        </Div>
      </TextWrap>
    </EmptyList>
  );
}
