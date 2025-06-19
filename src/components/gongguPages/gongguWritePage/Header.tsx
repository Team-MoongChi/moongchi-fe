import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Text } from "../../common/styled-component/Text";
import close from "../../../assets/images/gonggu/closeButton.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
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

export default function Header() {
  const { gongguId } = useParams();
  const navigate = useNavigate();
  const isEdit: boolean = gongguId !== undefined;

  return (
    <Wrap>
      <CloseBUtton
        onClick={
          isEdit
            ? () => navigate(`/gonggu/list/${gongguId}`)
            : () => navigate("/")
        }
      />
      <Text fontSize="30px" fontFamily="Dunggeunmisobold" color="#5849d0">
        공구 {isEdit ? "수정하기" : "열기"}
      </Text>
      <CloseBUtton visibility="hidden" />
    </Wrap>
  );
}
