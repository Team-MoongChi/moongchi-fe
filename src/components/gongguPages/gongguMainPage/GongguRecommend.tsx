import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;
const RecList = styled.div`
  width: 100%;
  height: 180px;
  background-color: #e8edff;
  border-radius: 6px;
`;

export default function GongguRecommend() {
  return (
    <Wrap>
      <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
        뭉치's PICK
      </Text>
      <RecList></RecList>
    </Wrap>
  );
}
