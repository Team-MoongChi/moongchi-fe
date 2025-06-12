import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { Wrap } from "../../components/common/styled-component/Wrap";
import Header from "../../components/common/Header";
import FetchButton from "../../components/chatPages/chatPage/FetchButton";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";

const Body = styled.div`
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// /api/chat/rooms/{chatRoomId}

export default function ChatPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatRoom = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    console.log(chatRoomId);

    try {
      const response = await fetchWithAuth(`/api/chat/rooms/${chatRoomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatRoomItem = await response.json();
      console.log(data);
      setChatRoom(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      setLoading(false);
      throw error;
    }
  };

  const fetchTrade = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth(
        `/api/chat/rooms/${chatRoomId}/trade-complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("거래 완료!");
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("거래 완료 실패");
      throw error;
    }
  };

  useEffect(() => {
    fetchChatRoom();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small} $gap="15px">
      <Header title={chatRoom?.title} />
      <Body>
        <FetchButton
          content="결제 현황"
          link={`/chat/${chatRoomId}/pay`}
        ></FetchButton>
        <FetchButton content="거래 완료" onClick={fetchTrade}></FetchButton>
        <FetchButton
          content="리뷰 작성"
          link={`/chat/${chatRoomId}/review`}
        ></FetchButton>
      </Body>
    </Wrap>
  );
}
