import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5849d0;
  gap: 10px;
`;
const BarWrapper = styled.div`
  width: 90%;
  display: flex;
`;
const Bar = styled.div<{ color: string }>`
  width: 33%;
  border-top: 4px solid ${(props) => props.color};
  font-family: DunggeunmisoBold;
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #5849d0;
  padding-top: 6px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Title = styled.p`
  font-size: 28px;
  font-family: DunggeunmisoBold;
`;

const Step = () => {
  return (
    <Wrapper>
      <BarWrapper>
        <Bar color="#E8EDFF"></Bar>
        <Bar color="#E8EDFF"></Bar>
        <Bar color="#5849d0">Step 3</Bar>
      </BarWrapper>
      <p style={{ color: "black", fontSize: "18px" }}>
        사용자 맞춤 상품을 추천해 드려요!
      </p>
      <Title>관심있는 상품 카테고리는</Title>
      <Title>무엇인가요?</Title>
    </Wrapper>
  );
};
export default Step;
