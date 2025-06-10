import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";
import useDeviceSize from "../../../useDeviceSize";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  padding: 21px;
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
  width: 14px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { small } = useDeviceSize();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Wrapper $isSmall={small}>
      <BackButton onClick={handleBackButton}>
        <BackImg src={backButton} alt="" />
      </BackButton>
      <Title>관심 목록</Title>
      <BackButton style={{ color: "#5849D0" }}>우와</BackButton>
    </Wrapper>
  );
};

export default Header;
