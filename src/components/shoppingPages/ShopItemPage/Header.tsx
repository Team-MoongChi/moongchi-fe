import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";
import useDeviceSize from "../../../hooks/useDeviceSize";
import { useHistoryStack } from "../../../utils/useHistoryStack";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  padding: 20px;
  position: fixed;
  z-index: 1;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  top: 0;
`;
const Title = styled.p`
  font-size: 28px;
  color: white;
  font-weight: 800;
`;
const BackButton = styled.button`
  color: white;
`;
const BackImg = styled.img`
  width: 16px;
`;

interface MainProps {
  title: string;
  route: string | number;
}

const Header = (props: MainProps) => {
  const navigate = useNavigate();
  const { small } = useDeviceSize();
  const { pop } = useHistoryStack();

  const handleBackButton = () => {
    const backPath = pop() || "/";
    navigate(backPath);
  };

  return (
    <Wrapper $isSmall={small}>
      <BackButton onClick={handleBackButton}>
        <BackImg src={backButton} alt="" />
      </BackButton>
      <Title>{props.title}</Title>
      <BackButton style={{ color: "#5849D0" }}>우와</BackButton>
    </Wrapper>
  );
};

export default Header;
