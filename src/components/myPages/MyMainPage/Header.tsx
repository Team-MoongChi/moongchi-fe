import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 22px;
  position: absolute;
  z-index: 1;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
`;
const Title = styled.p`
  font-size: 28px;
  color: white;
  font-weight: 800;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>마이페이지</Title>
    </Wrapper>
  );
};

export default Header;
