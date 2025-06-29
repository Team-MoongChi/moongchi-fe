import styled from "styled-components";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
import { useInView } from "react-intersection-observer";

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
  prevMessages: Message[];
  stompClientRef: React.RefObject<Client | null>;
  connected: boolean;
  loading: boolean;
  errorStatus: number;
  isInitial: boolean;
  hasMore: boolean;
  fetchChatRoom: (value: string) => void;
}

export default function ChatPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();
  const [ref, inView] = useInView();

  const context = useOutletContext() as OutletContext;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);

  useEffect(() => {
    if (inView && context.hasMore && isMounted) {
      if (bodyRef.current) {
        prevScrollHeightRef.current = bodyRef.current.scrollHeight;
      }
      const time = context.prevMessages[0].sendAt;
      context.fetchChatRoom(time || "");
    }
  }, [inView, context.hasMore, isMounted]);

  useLayoutEffect(() => {
    if (bodyRef.current && prevScrollHeightRef.current > 0) {
      bodyRef.current.scrollTop =
        bodyRef.current.scrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }
  }, [context.prevMessages]);

  useEffect(() => {
    if (!context.loading && context.prevMessages.length > 0 && !isMounted) {
      setIsMounted(true);
    }
  }, [context.loading, context.prevMessages]);

  if (context.errorStatus === 404)
    return <EmptyPage error="404 NOT FOUND!" item="채팅방을" />;
  if (context.myParticipant === null && !context.loading)
    return <EmptyPage error="잘못된 접근입니다." item="채팅방을" />;

  const modalHandle = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Wrap $issmall={small} $height="100dvh">
      {context.loading && !isMounted ? (
        <Loading>
          <img src={loadingM} alt="" />
          <p>게시글을 불러오고 있어요 '◡'</p>
        </Loading>
      ) : (
        <>
          <FixedWrap onClick={modalHandle}>
            <ChatHeader
              title={context.chatRoom.title}
              $fontSize={small ? "5.5vmin" : "3vmin"}
              route="/chat/list"
              participantMap={context.participantMap}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
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

          <Body ref={bodyRef} onClick={modalHandle}>
            <div ref={ref}></div>
            <Chatconnect
              chatRoomId={Number(chatRoomId)}
              chatRoomStatus={context.chatRoom.status}
              participantId={context.myParticipant.participantId}
              tradeCompleted={context.myParticipant.tradeCompleted}
              address={context.chatRoom.location}
              role={context.myParticipant.role}
              initialMessages={context.prevMessages}
              participantMap={context.participantMap}
              newMessages={context.newMessages}
              isMounted={isMounted}
              endRef={endRef}
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
