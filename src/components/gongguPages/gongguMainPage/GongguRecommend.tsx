import styled from "styled-components";

const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;
const RecTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const RecList = styled.div`
  width: 100%;
  height: 180px;
  background-color: #e8edff;
  border-radius: 6px;
`;

export default function GongguRecommend() {
    return (
      <Recommend>
        <RecTitle>뭉치's PICK</RecTitle>
        <RecList></RecList>
      </Recommend>
    );
}