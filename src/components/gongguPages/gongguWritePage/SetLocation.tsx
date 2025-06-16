import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import arrow from "../../../assets/images/gonggu/backarrow.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #5849d0;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
`;

export default function SetLocation() {
  const navigate = useNavigate();
  return (
    <Wrap onClick={() => navigate("/gonggu/write/map")}>
      <Text fontSize="14px">위치 추가</Text>
      <Img src={arrow} width="20px" height="20px"></Img>
    </Wrap>
  );
}
