import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: absolute;
  z-index: 1;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
`;
const Title = styled.p`
  font-size: 22px;
  color: white;
  font-weight: 800;
`;
const BackButton = styled.button`
  color: white;
`;

const Header = () => {
  return (
    <Wrapper>
      <BackButton>뒤로</BackButton>
      <Title>상품</Title>
      <BackButton style={{ color: "#5849D0" }}>우와</BackButton>
    </Wrapper>
  );
};

export default Header;
