import styled from "styled-components";
import Header from "../../components/ShopItemPage/Header";
import Nav from "../../components/ShopItemPage/Nav";
import Main from "../../components/ShopItemPage/Main";
import useDeviceSize from "../../useDeviceSive.tsx";

const Wrapper = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
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
