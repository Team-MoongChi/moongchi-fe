import styled from "styled-components";
import home from "../../assets/images/nav/홈아이콘.png";
import chatting from "../../assets/images/nav/채팅아이콘.png";
import shopping from "../../assets/images/nav/쇼핑아이콘.png";
import mypage from "../../assets/images/nav/마이페이지아이콘.png";
import homeClick from "../../assets/images/nav/홈아이콘_클릭.png";
import chattingClick from "../../assets/images/nav/채팅아이콘_클릭.png";
import shoppingClick from "../../assets/images/nav/쇼핑아이콘_클릭.png";
import mypageClick from "../../assets/images/nav/마이페이지아이콘_클릭.png";
import useDeviceSize from "../../useDeviceSize";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff3ff;
  position: fixed;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 90px;
  padding: 10px 7px 15px 7px;
  gap: 15%;
  bottom: 0;
`;
const Button = styled.button<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: DunggeunmisoBold;
  font-size: 12px;
  color: ${({ $active }) => ($active ? "#5849D0" : "#c7d2fe")};
  gap: 2px;
`;
const Img = styled.img`
  width: 40px;
`;

const Nav = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isShopping = pathname.startsWith("/shopping");
  const isChat = pathname.startsWith("/chat");
  const isHome = pathname === "/";
  const isMypage = pathname.startsWith("/mypage");

  const handleButton = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <Wrapper $isSmall={small}>
      <Button onClick={() => handleButton("")} $active={isHome}>
        <Img src={isHome ? homeClick : home} alt="" />홈
      </Button>
      <Button onClick={() => handleButton("chat/list")} $active={isChat}>
        <Img src={isChat ? chattingClick : chatting} alt="" />
        채팅
      </Button>
      <Button onClick={() => handleButton("shopping")} $active={isShopping}>
        <Img src={isShopping ? shoppingClick : shopping} alt="" />
        쇼핑
      </Button>
      <Button onClick={() => handleButton("mypage")} $active={isMypage}>
        <Img src={isMypage ? mypageClick : mypage} alt="" />
        마이페이지
      </Button>
    </Wrapper>
  );
};

export default Nav;
