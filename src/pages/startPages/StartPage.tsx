import useDeviceSize from "../../useDeviceSive.tsx";
import styled from "styled-components";
import SlideInfo from "../../components/startPages/startPage/SlideInfo.tsx";
import Button from "../../components/startPages/common/Button.tsx";
import { useNavigate } from "react-router-dom";

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

const StartPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();

  const buttonHandle = () => {
    navigate("/login");
  };

  return (
    <Wrapper $isSmall={small}>
      <SlideInfo />
      <Button text="시작하기" onClick={() => buttonHandle()} />
    </Wrapper>
  );
};

export default StartPage;
