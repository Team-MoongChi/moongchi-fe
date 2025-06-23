import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import back from "../../../assets/images/common/뒤로가기.png";
import search from "../../../assets/images/gonggu/search_white.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 15px;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  z-index: 1001;
`;
const Icon = styled(Img)`
  cursor: pointer;
`;

export default function MapHeader() {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Icon
        src={back}
        width="15px"
        height="30px"
        onClick={() => navigate("/")}
      ></Icon>
      <Text fontSize="30px" fontFamily="Dunggeunmisobold" color="white">
        내 근처
      </Text>
      <Icon src={search} width="30px" height="30px" />
    </Wrap>
  );
}
