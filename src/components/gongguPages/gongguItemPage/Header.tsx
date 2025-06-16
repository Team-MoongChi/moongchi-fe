import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useDeviceSize from "../../../useDeviceSize";
import back from "../../../assets/images/common/뒤로가기.png";
import edit from "../../../assets/images/gonggu/공구수정아이콘.png";
import share from "../../../assets/images/gonggu/공구공유아이콘.png";
import del from "../../../assets/images/gonggu/공구삭제아이콘.png";

const Wrap = styled.div<{
  $issmall: boolean;
  $scroll: number;
}>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.$scroll >= 300 ? "#5849d0" : "rgba(255, 255, 255, 0)"};
  background-image: ${(props) =>
    props.$scroll >= 300
      ? "none"
      : "linear-gradient(to bottom,rgba(115, 115, 115, 0.4) 0%,rgba(126, 126, 126, 0.3) 20%,rgba(172, 172, 172, 0.2) 50%,rgba(209, 209, 209, 0.1) 80%,rgba(255, 255, 255, 0) 100%)"};
  border-radius: ${(props) => (props.$scroll >= 300 ? "0 0 15px 15px" : "0")};
  padding: 20px;
  z-index: 2;
`;
const IconButton = styled.img.attrs<{ src: string }>((props) => ({
  src: props.src,
}))`
  height: 35px;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  height: 35px;
`;
const Right = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

interface HeaderProps {
  editable: boolean | undefined;
}

export default function Header(props: HeaderProps) {
  const { small } = useDeviceSize();

  const [scroll, setScroll] = useState<number>(0);
  const onScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <Wrap $issmall={small} $scroll={scroll}>
      <StyledLink to="/">
        <IconButton src={back} />
      </StyledLink>
      <Right>
        <IconButton src={share} />
        {props.editable ? <IconButton src={edit} /> : null}
        {props.editable ? <IconButton src={del} /> : null}
      </Right>
    </Wrap>
  );
}
