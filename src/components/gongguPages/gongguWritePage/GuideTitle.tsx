import styled from "styled-components";

import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 30px 0 40px 0;
`;

interface GuideProps {
  name: string;
  quantity: string;
}

export default function GuideTitle(props: GuideProps) {
  return (
    <Wrap>
      <Text fontSize="18px" fontFamily="DunggeunmisoBold" color="#626262">
        제목은 자동으로 생성됩니다.
      </Text>
      <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
        {props.name === "" ? "상품명" : props.name}{" "}
        {props.quantity === "" ? "+ 총 수량 +" : props.quantity} 공구합니다.
      </Text>
    </Wrap>
  );
}
