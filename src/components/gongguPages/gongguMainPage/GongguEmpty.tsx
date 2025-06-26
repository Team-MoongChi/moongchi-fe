import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import emptyBox from "../../../assets/images/gonggu/emptyBox.png";

const EmptyList = styled.div<{ $height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.$height};
  background-color: #e8edff;
  border-radius: 6px;
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2vh;
  gap: 1vh;
`;
const TopText = styled(Text)`
  padding-bottom: 2vh;
`;
const Highlight = styled.span`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;

interface GongguEmptyProps {
  height: string;
}
export default function GongguEmpty(props: GongguEmptyProps) {
  return (
    <EmptyList $height={props.height}>
      <TopText fontSize="50px" fontFamily="DunggeunmisoBold" color="#5849d0">
        텅~
      </TopText>
      <Img src={emptyBox} width="clamp(180px, 3vw, 180px)" />
      <TextWrap>
        <Text fontSize="20px">
          근처에서 열린 공구가 <Highlight>없어요.</Highlight>
        </Text>
        <Text fontSize="20px" fontFamily="DunggeunmisoBold">
          제일 먼저 <Highlight>공구를 열어보세요!</Highlight>
        </Text>
      </TextWrap>
    </EmptyList>
  );
}
