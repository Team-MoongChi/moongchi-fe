import Step from "../../components/startPages/PreferCategoryPage/Step";
import Main from "../../components/startPages/PreferCategoryPage/Main";
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

const PreferCategoryPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();

  const buttonHandle = () => {
    navigate("/");
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main />
      <Button text="완료" onClick={buttonHandle} />
    </Wrapper>
  );
};

export default PreferCategoryPage;
