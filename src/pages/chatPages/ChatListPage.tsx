import styled from "styled-components";
import { useState, useEffect } from "react";

import useDeviceSize from "../../hooks/useDeviceSize";
import Header from "../../components/chatPages/chatListPage/Header";
import ChatListItem from "../../components/chatPages/chatListPage/ChatListItem";
import Nav from "../../components/common/Nav";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import type { ChatRoomList } from "../../types/chatPages/chatRoomList";
import loadingM from "../../assets/images/moongchies/로딩중.gif";

const PageWrap = styled(Wrap)`
  height: 100dvh;
`;
const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
  padding-bottom: 13vh;
  background-color: white;
`;
const Loading = styled.div`
  width: 100%;
  height: 70%;
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

interface ChatListProps {
  chatRoomId: number | null;
  setChatRoomId: (value: number | null) => void;
}

export default function ChatListPage(props: ChatListProps) {
  const { chatRoomId, setChatRoomId } = props;
  const { small } = useDeviceSize();

  const [chatList, setChatList] = useState<ChatRoomList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatList = async () => {
    try {
      const response = await fetchWithAuth("/api/chat/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatRoomList[] = await response.json();
      setChatList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("get failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    if (chatRoomId !== null && chatRoomId > 0) {
      setChatList((prev) =>
        prev.map((chat) =>
          chat.id === chatRoomId ? { ...chat, unreadCount: 0 } : chat
        )
      );
      setChatRoomId(null);
    }
  }, [chatRoomId, setChatRoomId]);

  useEffect(() => {
    console.log("chatRoomId", chatRoomId);
  }, [chatRoomId]);
  useEffect(() => {
    console.log("chatRoomList", chatList);
  }, [chatList]);

  return (
    <PageWrap $issmall={small} $gap="15px">
      <Header />
      {loading ? (
        <Loading>
          <img src={loadingM} alt="" />
          <p>채팅들을 불러오고 있어요 '◡'</p>
        </Loading>
      ) : (
        <ChatList>
          {chatList.map((chatRoom, idx) => {
            return <ChatListItem key={idx} {...chatRoom}></ChatListItem>;
          })}
        </ChatList>
      )}
      <Nav />
    </PageWrap>
  );
}
