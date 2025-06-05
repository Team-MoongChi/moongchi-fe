import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/chatPages/chatListPage/Header";
import ChatListItem from "../../components/chatPages/chatListPage/ChatListItem";
import type { ChatRoom } from "../../types/chatListPage/chatRoom";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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

  const [chatList, setChatList] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/chat/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNzQ5MDkzODk3LCJleHAiOjE3NDk2OTg2OTd9.hjyAym7PrQl_8DTGJY0U-piRN5hPuzDlknIlRv_6xLA",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatRoom[] = await response.json();
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
    <Wrap isSmall={small}>
      <Header />

      <ChatList>
        {chatList.map((chatRoom) => {
          return <ChatListItem {...chatRoom}></ChatListItem>;
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
