import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff3ff;
  position: sticky;
  width: 100%;
  height: 11%;
  padding: 5%;
  padding-bottom: 8%;
  gap: 18%;
  bottom: 0;
`;

const Nav = () => {
  return (
    <Wrapper>
      <button>홈</button>
      <button>채팅</button>
      <button>쇼핑</button>
      <button>마이페이지</button>
    </Wrapper>
  );
};

export default Nav;
