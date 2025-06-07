import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  color: #5849d0;
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
        <Bar color="#5849d0">Step 2</Bar>
        <Bar color="#E8EDFF"></Bar>
      </BarWrapper>
      <Title>주소 설정</Title>
    </Wrapper>
  );
};
export default Step;
