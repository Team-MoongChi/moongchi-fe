import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopMainPage/Header.tsx";
import Main from "../../components/shoppingPages/ShopMainPage/Main.tsx";
import Nav from "../../components/shoppingPages/ShopMainPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSive.tsx";

const Wrapper = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
`;

const ShopMainPage = () => {
  const { small, large } = useDeviceSize();

  return (
    <Wrapper isSmall={small}>
      <Header />
      <Main />
      <Nav />
    </Wrapper>
  );
};

export default ShopMainPage;
