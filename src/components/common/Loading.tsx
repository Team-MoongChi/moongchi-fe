import loadingMoongchi from "../../assets/images/moongchies/로딩중.gif";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-family: DunggeunmisoBold;
    color: #5849d0;
    font-size: 20px;
  }
`;
const Img = styled.img`
  width: 60%;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Img src={loadingMoongchi}></Img>
      <p>로딩중...</p>
    </Wrapper>
  );
};

export default Loading;
