import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";
import Step from "../../components/startPages/UserDataPage/Step";
import Main from "../../components/startPages/UserDataPage/Main";
import Button from "../../components/startPages/common/Button";
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

const UserDataPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();

  const ButtonHandle = () => {
    navigate("/start/location");
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main />
      <Button text="다음" onClick={ButtonHandle} />
    </Wrapper>
  );
};

export default UserDataPage;
