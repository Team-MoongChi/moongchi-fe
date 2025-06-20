import styled from "styled-components";
import { useState, useEffect } from "react";

import useDeviceSize from "../../hooks/useDeviceSize";
import Header from "../../components/chatPages/chatListPage/Header";
import ChatListItem from "../../components/chatPages/chatListPage/ChatListItem";
import Nav from "../../components/common/Nav";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import type { ChatRoomList } from "../../types/chatPages/chatRoomList";

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;

export default function ChatListPage() {
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
      console.log(data);
      setChatList(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small} $gap="15px">
      <Header />

      <ChatList>
        {chatList.map((chatRoom, idx) => {
          return <ChatListItem key={idx} {...chatRoom}></ChatListItem>;
        })}
      </ChatList>

      <Nav />
    </Wrap>
  );
}
