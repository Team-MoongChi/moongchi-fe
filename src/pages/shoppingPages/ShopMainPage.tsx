import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopMainPage/Header.tsx";
import Main from "../../components/shoppingPages/ShopMainPage/Main.tsx";
import Nav from "../../components/shoppingPages/ShopMainPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useNavigate } from "react-router-dom";

//isSmall에 $ 붙이는 이유: styled-components에서 $가 붙은 props는 DOM에 넘기지 않음
//styled 내부에서만 쓸 값이면 꼭 $ 붙이기
const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  min-height: 70vh;
`;

const ShopMainPage = () => {
  const { small, large } = useDeviceSize();
  const navigate = useNavigate();

  return (
    <Wrapper $isSmall={small}>
      <Header />
      <Main />
      <Nav />
    </Wrapper>
  );
};

export default ShopMainPage;
