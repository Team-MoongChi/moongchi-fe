import styled from "styled-components";
import home from "../../../assets/images/nav/홈아이콘.png";
import chatting from "../../../assets/images/nav/채팅아이콘.png";
import shopping from "../../../assets/images/nav/쇼핑아이콘_클릭.png";
import mypage from "../../../assets/images/nav/마이페이지아이콘.png";
import useDeviceSize from "../../../useDeviceSize";

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
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: DunggeunmisoBold;
  font-size: 12px;
  color: #c7d2fe;
  gap: 2px;
`;
const Img = styled.img`
  width: 40px;
`;

const Nav = () => {
  const { small } = useDeviceSize();

  return (
    <Wrapper $isSmall={small}>
      <Button>
        <Img src={home} alt="" />홈
      </Button>
      <Button>
        <Img src={chatting} alt="" />
        채팅
      </Button>
      <Button style={{ color: "#5849D0" }}>
        <Img src={shopping} alt="" />
        쇼핑
      </Button>
      <Button>
        <Img src={mypage} alt="" />
        마이페이지
      </Button>
    </Wrapper>
  );
};

export default Nav;
