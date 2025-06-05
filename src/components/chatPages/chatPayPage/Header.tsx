import styled from "styled-components";
import { Link } from "react-router-dom";

import back from "../../../assets/images/common/뒤로가기.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #5849d0;
  padding: 15px;
  border-radius: 0 0 15px 15px;
`;
const BackButton = styled.img.attrs({
  src: back,
  alt: "닫기 아이콘",
})<{ visibility?: string }>`
  visibility: ${(props) => props.visibility || "visible"};
  width: 15px;
  cursor: pointer;
`;
const HeaderText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

export default function Header() {
  return (
    <Wrap>
      <Link to="/">
        <BackButton />
      </Link>
      <HeaderText>1/N 결제 현황</HeaderText>
      <BackButton visibility="hidden" />
    </Wrap>
  );
}
