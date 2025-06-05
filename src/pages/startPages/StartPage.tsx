import useDeviceSize from "../../useDeviceSive.tsx";
import styled from "styled-components";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
`;
const SliderWrapper = styled.div``;
const Button = styled.div``;

const StartPage = () => {
  const { small } = useDeviceSize();

  return (
    <Wrapper $isSmall={small}>
      <SliderWrapper></SliderWrapper>
      <Button></Button>
    </Wrapper>
  );
};

export default StartPage;
