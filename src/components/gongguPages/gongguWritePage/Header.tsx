import styled from "styled-components";
import { Link } from "react-router-dom";

import close from "../../../assets/images/gonggu/closeButton.png"

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 15px;
`
const CloseBUtton = styled.img.attrs({
  src: close,
  alt: "닫기 아이콘",
})<{ visibility?: string }>`
  visibility: ${(props) => props.visibility || "visible"};
  width: 30px;
  height: 30px;
  cursor: pointer;
`
const HeaderText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #5849d0;
`

export default function Header() {
    return (
        <Wrap>
            <Link to="/">
              <CloseBUtton />
            </Link>
            <HeaderText>공구 열기</HeaderText>
            <CloseBUtton visibility="hidden" />
        </Wrap>
    );
}
