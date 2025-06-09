import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 21px;
  position: absolute;
  z-index: 1;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  position: fixed;
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

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <BackButton onClick={handleBackButton}>
        <BackImg src={backButton} alt="" />
      </BackButton>
      <Title>내가 올린 공구</Title>
      <BackButton style={{ color: "#5849D0" }}>우와</BackButton>
    </Wrapper>
  );
};

export default Header;
