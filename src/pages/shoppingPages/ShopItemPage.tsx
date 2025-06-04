import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopItemPage/Header.tsx";
import Nav from "../../components/shoppingPages/ShopItemPage/Nav.tsx";
import Main from "../../components/shoppingPages/ShopItemPage/Main.tsx";
import useDeviceSize from "../../useDeviceSive.tsx";

const Wrapper = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
`;

const ShopItemPage = () => {
  const { small, large } = useDeviceSize();

  return (
    <Wrapper isSmall={small}>
      <Header />
      <Main />
      <Nav />
    </Wrapper>
  );
};

export default ShopItemPage;
