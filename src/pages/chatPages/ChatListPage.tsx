import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/chatPages/chatListPage/Header";
import ChatListItem from "../../components/chatPages/chatListPage/ChatListItem";
import { Wrap } from "../../components/common/styled-component/Wrap";
import type { ChatRoomList } from "../../types/chatPages/chatRoomList";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #e8edff;
  padding: 30px;
`;

export default function ChatListPage() {
  const navigate = useNavigate();
  const writeGonggu2 = () => {
    navigate("/gonggu/write", { state: { message: "shop" } });
  };

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

      <NavBar>
        {/* 나중에 onclick 삭제하기 */}
        <div onClick={writeGonggu2}>홈</div>
        <div
          onClick={() => {
            navigate("/chat/list");
          }}
        >
          채팅
        </div>
        <div>쇼핑</div>
        <div>마이페이지</div>
      </NavBar>
    </Wrap>
  );
}
