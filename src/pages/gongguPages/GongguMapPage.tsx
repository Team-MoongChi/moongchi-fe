import styled from "styled-components";
import close from "../../assets/images/gonggu/closeButton.png";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px;
`;
const CloseBUtton = styled.img.attrs({
  src: close,
  alt: "닫기 아이콘",
})<{ visibility?: string }>`
  visibility: ${(props) => props.visibility || "visible"};
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export default function GongguMapPage() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <CloseBUtton onClick={() => navigate("/gonggu/write")} />
    </Wrap>
  );
}
