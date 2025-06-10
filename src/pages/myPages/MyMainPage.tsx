import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/myPages/MyMainPage/Header";
import Nav from "../../components/myPages/MyMainPage/Nav";
import Profile from "../../components/myPages/MyMainPage/Profile";
import Menu from "../../components/myPages/MyMainPage/Menu";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Line = styled.div`
  width: 95%;
  height: 1px;
  background-color: #e8edff;
  margin: 3%;
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
