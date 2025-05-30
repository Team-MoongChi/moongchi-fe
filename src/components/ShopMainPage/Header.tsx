import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3%;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  position: sticky;
  top: 0;
  gap: 10px;
`;
const Title = styled.p`
  font-size: 22px;
  color: white;
  font-weight: 800;
`;
const Insert = styled.input`
  width: 90%;
  padding: 2%;
  border: none;
  border-radius: 50px;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>쇼핑</Title>
      <Insert type="text" />
    </Wrapper>
  );
};

export default Header;
