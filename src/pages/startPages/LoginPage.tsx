import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import moongchiBox from "../../assets/images/start/뭉치박스.png";
import kakao from "../../assets/images/common/카카오.png";
import naver from "../../assets/images/common/네이버.png";
import google from "../../assets/images/common/구글.png";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MoongBox = styled.img`
  width: 60%;
  max-width: 330px;
  margin-top: 110px;
  margin-bottom: 150px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const LoginButton = styled.button<{ color: string }>`
  width: 90%;
  max-width: 400px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 15px;
  color: white;
  font-family: DunggeunmisoBold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
const Img = styled.img`
  width: 20px;
`;

const LoginPage = () => {
  const { small } = useDeviceSize();

  return (
    <Wrapper $isSmall={small}>
      <MoongBox src={moongchiBox} />
      <Buttons>
        <LoginButton color="#FFEB3B">
          <Img src={kakao} />
          카카오로 시작하기
        </LoginButton>
        <LoginButton color="#03C75A">
          <Img src={naver} />
          네이버로 시작하기
        </LoginButton>
        <LoginButton color="#4285F4">
          <Img src={google} />
          구글로 시작하기
        </LoginButton>
      </Buttons>
    </Wrapper>
  );
};

export default LoginPage;
