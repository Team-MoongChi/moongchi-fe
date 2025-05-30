import styled from "styled-components";
import Header from "../../components/ShopResultPage/Header.tsx";
import Main from "../../components/ShopResultPage/Main.tsx";
import Nav from "../../components/ShopResultPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSive.tsx";

const Wrapper = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
`;

const ShopResultPage = () => {
  const { small, large } = useDeviceSize();

  return (
    <Wrapper isSmall={small}>
      <Header />
      <Main />
      <Nav />
    </Wrapper>
  );
};

export default ShopResultPage;
