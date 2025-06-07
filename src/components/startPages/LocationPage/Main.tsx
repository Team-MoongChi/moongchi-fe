import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3%;
  width: 100%;
  height: 65%;
  margin-top: 20px;
`;
const Map = styled.div`
  width: 100%;
  height: 70%;
  max-width: 600px;
  background-color: #b2dfaf;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 70%;
  height: 20%;
  max-width: 370px;
  background-color: #e8edff;
  border-radius: 15px;
  padding: 15px;
`;
const Title = styled.p`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;
const Location = styled.p``;

const Main = () => {
  return (
    <Wrapper>
      <Map />
      <Info>
        <Title>현재 위치</Title>
        <Location>서울 중구 중림동 397</Location>
      </Info>
    </Wrapper>
  );
};

export default Main;
