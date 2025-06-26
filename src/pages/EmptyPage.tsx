import styled from "styled-components";

import useDeviceSize from "../hooks/useDeviceSize";
import { Wrap } from "../components/common/styled-component/Wrap";
import { Img } from "../components/common/styled-component/Img";
import { Text } from "../components/common/styled-component/Text";
import crying from "../assets/images/moongchies/우는노란뭉치.png";

const EmptyWrap = styled(Wrap)`
  justify-content: center;
  align-items: center;
  background-color: #e8edff;
`;
const Header = styled(Text)`
  padding-bottom: 5%;
`;
const Highlight = styled.span`
  font-size: 24px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;

interface EmptyPageProps {
  error: string;
  item: string;
}

export default function EmptyPage(props: EmptyPageProps) {
  const { small } = useDeviceSize();

  return (
    <EmptyWrap $issmall={small} $height="100dvh" $gap="30px">
      <Header
        fontSize="clamp(35px, 2vw, 45px)"
        fontFamily="DunggeunmisoBold"
        color="#5849d0"
      >
        {props.error}
      </Header>
      <Img src={crying} width="35%" />
      <Text fontSize="24px">
        <Highlight>{props.item}</Highlight> 불러올 수 없어요.
      </Text>
    </EmptyWrap>
  );
}
