import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import useDeviceSize from "../../../hooks/useDeviceSize";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import back from "../../../assets/images/common/뒤로가기.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
`;
const ImgNone = styled(Img)`
  visibility: hidden;
`;

interface MainProps {
  title: string | undefined;
  route: string | number;
  $fontSize?: string;
}

export default function ChatHeader(props: MainProps) {
  const navigate = useNavigate();
  const { small } = useDeviceSize();

  return (
    <Wrapper>
      <Img src={back} width="16px" onClick={() => navigate("/chat/list")} />
      <Text
        fontSize={small ? "5.5vmin" : "3vmin"}
        fontWeight="800"
        color="white"
      >
        {props.title}
      </Text>
      <ImgNone src={back} width="16px" />
    </Wrapper>
  );
}
