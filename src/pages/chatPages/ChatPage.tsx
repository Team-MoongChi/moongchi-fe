import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { Wrap } from "../../components/common/styled-component/Wrap";
import ChatHeader from "../../components/chatPages/chatPage/ChatHeader";
import GoToGonggu from "../../components/chatPages/chatPage/GoToGonggu";
import StepBar from "../../components/chatPages/chatPage/StepBar";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";
import Chatconnect from "../../components/chatPages/chatPage/ChatConnect";
import type { Message } from "../../types/chatPages/message";
import ChatSocket from "../../components/chatPages/chatPage/systemMsg/ChatSocket";

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

export default function ChatPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tokens, setTokens] = useState<string>("");
  const [participantMap, setParticipantMap] = useState(
    new Map<number, { nickname: string; profileUrl: string }>()
  );
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  const fetchChatRoom = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) setTokens(token);

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

  useEffect(() => {
    fetchChatRoom();
  }, []);

  const myParticipant = useMemo(() => {
    return chatRoom?.participants.find((participant) => participant.me) || null;
  }, [chatRoom]);

  useEffect(() => {
    console.log(myParticipant);
  }, [myParticipant]);

  useEffect(() => {
    if (chatRoom?.participants) {
      const newMap = new Map();
      chatRoom.participants.forEach((p) => {
        newMap.set(p.participantId, {
          nickname: p.nickname,
          profileUrl: p.profileUrl || "/images/default-profile.png",
        });
      });
      setParticipantMap(newMap);
    }
  }, [chatRoom]);

  if (loading) return <div>loading...</div>;
  if (!chatRoom || !myParticipant)
    return <div>채팅방 정보를 불러올 수 없습니다.</div>;

  return (
    <Wrap $issmall={small}>
      <FixedWrap>
        <ChatHeader
          title={chatRoom?.title}
          $fontSize={small ? "5.5vmin" : "3vmin"}
          route="/chat/list"
        />
        <PaddingWrap>
          <GoToGonggu
            productUrl={`/gonggu/list/${chatRoom?.groupBoardId}`}
            productImage={chatRoom?.imgUrl ? chatRoom.imgUrl : ""}
            name={chatRoom?.title}
            price={chatRoom?.price}
          />
          <StepBar status={chatRoom?.status ? chatRoom.status : ""} />
        </PaddingWrap>
      </FixedWrap>

      <Body>
        <Chatconnect
          chatRoomId={Number(chatRoomId)}
          chatRoomStatus={chatRoom.status}
          participantId={myParticipant.participantId}
          tradeCompleted={myParticipant.tradeCompleted}
          address={chatRoom.location}
          role={myParticipant.role}
          initialMessages={chatRoom.messages}
          participantMap={participantMap}
          newMessages={newMessages ? newMessages : []}
        />
      </Body>
      <ChatSocket
        chatRoomId={Number(chatRoomId)}
        participantId={myParticipant.participantId}
        token={tokens}
        newMessages={newMessages}
        setNewMessages={setNewMessages}
        setParticipantMap={setParticipantMap}
      />
    </Wrap>
  );
}
