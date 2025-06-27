import styled from "styled-components";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import useDeviceSize from "../../hooks/useDeviceSize";
import { Wrap } from "../../components/common/styled-component/Wrap";
import ChatHeader from "../../components/chatPages/chatPage/ChatHeader";
import GoToGonggu from "../../components/chatPages/chatPage/GoToGonggu";
import StepBar from "../../components/chatPages/chatPage/StepBar";
import Chatconnect from "../../components/chatPages/chatPage/ChatConnect";
import ChatInput from "../../components/chatPages/chatPage/systemMsg/ChatInput";
import type {
  ChatRoomItem,
  Participant,
} from "../../types/chatPages/chatRoomItem";
import type { Message } from "../../types/chatPages/message";
import loadingM from "../../assets/images/moongchies/로딩중.gif";
import EmptyPage from "../EmptyPage";

const Body = styled.div`
  width: 100%;
  padding: 0 5%;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: white;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const FixedWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 15px;
  position: sticky;
  top: 0;
  width: 100%;
`;
const PaddingWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5% 15px 5%;
  gap: 15px;
`;
const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
  }
  p {
    font-family: DunggeunmisoBold;
    color: #5849d0;
  }
`;

interface OutletContext {
  chatRoom: ChatRoomItem;
  myParticipant: Participant;
  participantMap: Map<number, { nickname: string; profileUrl: string }>;
  newMessages: Message[];
  stompClientRef: React.RefObject<Client | null>;
  connected: boolean;
  loading: boolean;
  errorStatus: number;
}

export default function ChatPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const context = useOutletContext() as OutletContext;

  if (context.errorStatus === 404)
    return <EmptyPage error="404 NOT FOUND!" item="채팅방을" />;
  if (context.myParticipant === null && !context.loading)
    return <EmptyPage error="잘못된 접근입니다." item="채팅방을" />;

  return (
    <Wrap $issmall={small} $height="100dvh">
      {context.loading ? (
        <Loading>
          <img src={loadingM} alt="" />
          <p>게시글을 불러오고 있어요 '◡'</p>
        </Loading>
      ) : (
        <>
          <FixedWrap>
            <ChatHeader
              title={context.chatRoom.title}
              $fontSize={small ? "5.5vmin" : "3vmin"}
              route="/chat/list"
            />
            <PaddingWrap>
              <GoToGonggu
                productUrl={`/gonggu/list/${context.chatRoom.groupBoardId}`}
                productImage={context.chatRoom.imgUrl}
                name={context.chatRoom.title}
                price={context.chatRoom.price}
              />
              <StepBar
                status={context.chatRoom.status ? context.chatRoom.status : ""}
                newMessages={context.newMessages}
              />
            </PaddingWrap>
          </FixedWrap>

          <Body>
            <Chatconnect
              chatRoomId={Number(chatRoomId)}
              chatRoomStatus={context.chatRoom.status}
              participantId={context.myParticipant.participantId}
              tradeCompleted={context.myParticipant.tradeCompleted}
              address={context.chatRoom.location}
              role={context.myParticipant.role}
              initialMessages={context.chatRoom.messages}
              participantMap={context.participantMap}
              newMessages={context.newMessages}
            />
          </Body>
          <ChatInput
            chatRoomId={Number(chatRoomId)}
            newMessages={context.newMessages}
            connected={context.connected}
            stompClientRef={context.stompClientRef}
          />
        </>
      )}

      <Outlet />
    </Wrap>
  );
}
