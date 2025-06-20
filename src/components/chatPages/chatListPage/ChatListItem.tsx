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
  height: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
`;
const GongguImg = styled(Img)<{ $isSmall: boolean }>`
  aspect-ratio: 1/1;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 100%;
`;
const TitleAndMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  justify-content: space-around;
`;
const TimeAndUnread = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 100%;
  justify-content: space-around;
`;
const UnRead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6c6c;
  border-radius: 20px;
  /* aspect-ratio: 1/1; */
  /* max-width: 25px; */
  min-width: 25px;
  max-height: 25px;
  padding: 5px;
`;
const UnReadCnt = styled(Text)`
  max-height: 25px;
`;
const TCWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const OverText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Message = styled(Text)`
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
          // height={small ? "20%" : "15%"}
          $border="1px solid #e8edff"
          $borderradious="10px"
        />
        <Content>
          <TitleAndMessage>
            <TCWrap>
              <OverText fontSize="clamp(18px, 2vw, 25px)" fontWeight="bold">
                {props.title}
              </OverText>
              <Text fontSize="clamp(16px, 2vw, 23px)" color="#a1a1a1">
                {props.participantCount}
              </Text>
            </TCWrap>
            <Message fontSize="clamp(16px, 2vw, 20px)" color="gray">
              {props.lastMessage}
            </Message>
          </TitleAndMessage>
          <TimeAndUnread>
            <Text fontSize="clamp(14px, 2vw, 18px)" color="#a1a1a1">
              {useChatTime(props.lastMessageTime)}
            </Text>
            <UnRead>
              {props.unreadCount === 0 ? null : (
                <UnReadCnt fontSize="clamp(14px, 2vw, 18px)" color="white">
                  {props.unreadCount}
                </UnReadCnt>
              )}
            </UnRead>
          </TimeAndUnread>
        </Content>
      </Wrap>
    </StyledLink>
  );
}
