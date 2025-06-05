import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import type { ChatRoom } from "../../../types/chatListPage/chatRoom";

const Wrap = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
`;
const Img = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 70px;
  border-radius: 10px;
  aspect-ratio: 1/1;
  object-fit: cover;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1;
`;
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TCWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const PeopleCnt = styled.div`
  font-size: 16px;
  color: #a1a1a1;
`;
const Time = styled.div`
  font-size: 14px;
  color: #a1a1a1;
`;
const Message = styled.div`
  font-size: 16px;
  color: gray;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function ChatListItem(props: ChatRoom) {
  return (
    <StyledLink to={`/chat/pay/${props.id}`}>
      <Wrap>
        <Img src={props.imgUrl} />
        <Content>
          <ContentHeader>
            <TCWrap>
              <Title>{props.title}</Title>
              <PeopleCnt>{props.participantCount}</PeopleCnt>
            </TCWrap>
            <Time>{props.lastMessageTime}</Time>
          </ContentHeader>
          <Message>{props.lastMessage}</Message>
        </Content>
      </Wrap>
    </StyledLink>
  );
}
