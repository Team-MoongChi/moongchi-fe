import styled from "styled-components";
import { Link } from "react-router-dom";
import useDeviceSize from "../../../useDeviceSize";

import back from "../../../assets/images/common/뒤로가기.png";
import edit from "../../../assets/images/gonggu/공구수정아이콘.png";
import share from "../../../assets/images/gonggu/공구공유아이콘.png";

const Wrap = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  background-image: linear-gradient(
    to bottom,
    rgba(115, 115, 115, 0.4) 0%,
    rgba(126, 126, 126, 0.3) 20%,
    rgba(172, 172, 172, 0.2) 50%,
    rgba(209, 209, 209, 0.1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: 20px;
  z-index: 1;
`;
const BackButton = styled.img.attrs({
  src: back,
  alt: "뒤로가기 아이콘",
})`
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
const EditButton = styled.img.attrs({
  src: edit,
  alt: "수정 아이콘",
})`
  height: 35px;
  cursor: pointer;
`;
const ShareButton = styled.img.attrs({
  src: share,
  alt: "공유 아이콘",
})`
  height: 35px;
  cursor: pointer;
`;

export default function Header() {
  const { small } = useDeviceSize();

  return (
    <Wrap $issmall={small}>
      <StyledLink to="/">
        <BackButton />
      </StyledLink>
      <Right>
        <EditButton />
        <ShareButton />
      </Right>
    </Wrap>
  );
}
