import Step from "../../components/startPages/LocationPage/Step";
import Main from "../../components/startPages/LocationPage/Main";
import Button from "../../components/startPages/common/Button";
import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
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

const LocationPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();

  const buttonHandle = () => {
    navigate("/start/prefer");
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main />
      <Button text="다음" onClick={buttonHandle} />
    </Wrapper>
  );
};

export default LocationPage;
