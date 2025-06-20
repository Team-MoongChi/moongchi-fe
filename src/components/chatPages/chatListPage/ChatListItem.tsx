import styled from "styled-components";
import { Link } from "react-router-dom";

import useChatTime from "../../../hooks/useChatTime";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import type { ChatRoomList } from "../../../types/chatPages/chatRoomList";
import useDeviceSize from "../../../hooks/useDeviceSize";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
`;
const GongguImg = styled(Img)<{ $isSmall: boolean }>`
  aspect-ratio: 1/1;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
`;
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TCWrap = styled.div`
  width: 60%;
  display: flex;
  gap: 5px;
`;

const OverText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Message = styled(Text)`
  width: 80%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function ChatListItem(props: ChatRoomList) {
  const { small } = useDeviceSize();

  return (
    <StyledLink to={`/chat/list/${props.id}`}>
      <Wrap>
        <GongguImg
          $isSmall={small}
          src={props.imgUrl}
          width={small ? "20%" : "15%"}
          height={small ? "20%" : "15%"}
          $border="1px solid #e8edff"
          $borderradious="10px"
        />
        <Content>
          <ContentHeader>
            <TCWrap>
              <OverText fontSize="clamp(18px, 2vw, 25px)" fontWeight="bold">
                {props.title}
              </OverText>
              <Text fontSize="clamp(16px, 2vw, 23px)" color="#a1a1a1">
                {props.participantCount}
              </Text>
            </TCWrap>
            <Text fontSize="clamp(14px, 2vw, 18px)" color="#a1a1a1">
              {useChatTime(props.lastMessageTime)}
            </Text>
          </ContentHeader>
          <Message fontSize="clamp(16px, 2vw, 20px)" color="gray">
            {props.lastMessage}
          </Message>
        </Content>
      </Wrap>
    </StyledLink>
  );
}
