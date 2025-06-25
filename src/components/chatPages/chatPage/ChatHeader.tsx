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
const BackButton = styled(Img)`
  cursor: pointer;
`;
const Title = styled(Text)`
  width: 70%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover::after {
    content: attr(data-fulltext);
    position: absolute;
    top: 56px; /* 아래로 툴팁 표시 */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    max-width: 80%;
    white-space: normal;
  }
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
      <BackButton
        src={back}
        width="16px"
        onClick={() => navigate("/chat/list")}
      />
      <Title
        fontSize={small ? "28px" : "3vmin"}
        fontWeight="800"
        color="white"
        data-fulltext={props.title}
      >
        {props.title}
      </Title>
      <ImgNone src={back} width="16px" />
    </Wrapper>
  );
}
