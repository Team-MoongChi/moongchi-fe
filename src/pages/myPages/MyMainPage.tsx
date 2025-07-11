import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import Header from "../../components/myPages/MyMainPage/Header";
import Nav from "../../components/common/Nav";
import Profile from "../../components/myPages/MyMainPage/Profile";
import Menu from "../../components/myPages/MyMainPage/Menu";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100dvh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Line = styled.div`
  width: 91%;
  height: 1px;
  background-color: #e8edff;
  margin: 10px;
`;

const MyMainPage = () => {
  const { small } = useDeviceSize();

  return (
    <Wrapper $isSmall={small}>
      <Header />
      <Profile />
      <Line />
      <Menu />
      <Nav />
    </Wrapper>
  );
};

export default MyMainPage;
