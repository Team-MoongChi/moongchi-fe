import styled from "styled-components";
import { useEffect, useRef } from "react"; // useCallback 추가
import type { Message } from "../../../types/chatPages/message";

import Recruiting from "./systemMsg/Recruiting";
import Recruited from "./systemMsg/Recruited";
import Paying from "./systemMsg/Paying";
import Purchased from "./systemMsg/Purchased";
import PurchasedFollower from "./systemMsg/PurchasedFollower";
import Completed from "./systemMsg/Completed";
import SpeechBubble from "./SpeechBubble";
import { Text } from "../../common/styled-component/Text";

const Enter = styled.div`
  background-color: #e9f0ff;
  border-radius: 20px;
  padding: 5px 25px;
  width: fit-content;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

interface ChatConnectProps {
  chatRoomId: number;
  chatRoomStatus: string;
  groupBoardId?: number | string;
  participantId: number;
  tradeCompleted: boolean;
  address: string;
  role: "LEADER" | "MEMBER";
  initialMessages: Message[];
  participantMap: Map<number, { nickname: string; profileUrl: string }>;
  newMessages: Message[];
}

export default function Chatconnect({
  chatRoomId,
  chatRoomStatus,
  participantId,
  tradeCompleted,
  address,
  role,
  initialMessages,
  participantMap,
  newMessages,
}: ChatConnectProps) {
  const prevMessages = initialMessages;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("prevMessages:", prevMessages);
  }, [prevMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [prevMessages, newMessages]);

  const system = (type: string, isLeader: boolean) => {
    switch (type) {
      case "RECRUITING":
        return <Recruiting />;
      case "RECRUITED":
        return <Recruited chatRoomId={chatRoomId} />;
      case "PAYING":
        return (
          <Paying
            chatRoomId={chatRoomId}
            chatRoomStatus={chatRoomStatus}
            isLeader={isLeader}
          />
        );
      case "PURCHASED":
        return isLeader ? (
          <Purchased chatRoomId={chatRoomId} address={address} />
        ) : (
          <>
            <Purchased chatRoomId={chatRoomId} address={address} />
            <PurchasedFollower
              chatRoomId={chatRoomId}
              chatRoomStatus={chatRoomStatus}
              tradeCompleted={tradeCompleted}
            />
          </>
        );
      case "COMPLETED":
        return <Completed chatRoomId={chatRoomId} />;
      default:
        return;
    }
  };

  return (
    <>
      {/* 채팅 메시지 리스트 */}
      {prevMessages.map((m) => {
        const isMe = m.participantId === participantId;
        const isSystem = m.messageType === "SYSTEM";
        const isEnter = m.messageType === "ENTER";
        const senderInfo = participantMap.get(m.participantId!) || {
          nickname: "알 수 없음",
          profileUrl: "/images/default-profile.png",
        };

        return isSystem ? (
          system(m.chatStatus, role === "LEADER")
        ) : isEnter ? (
          <Enter>
            <Text fontSize="14px" color="#637aab">
              {m.message}
            </Text>
          </Enter>
        ) : (
          <SpeechBubble
            profileUrl={senderInfo.profileUrl}
            nickname={senderInfo.nickname}
            isMe={isMe}
          >
            {m.message}
          </SpeechBubble>
        );
      })}
      {newMessages
        ? newMessages.map((m) => {
            const isMe = m.participantId === participantId;
            const isSystem = m.messageType === "SYSTEM";
            const isEnter = m.messageType === "ENTER";
            const profileUrl = m.senderProfileUrl;
            const nickname = m.senderNickname;

            return isSystem ? (
              system(m.chatStatus, role === "LEADER")
            ) : isEnter ? (
              <Enter>
                <Text fontSize="14px" color="#637aab">
                  {m.message}
                </Text>
              </Enter>
            ) : (
              <SpeechBubble
                profileUrl={profileUrl}
                nickname={nickname}
                isMe={isMe}
              >
                {m.message}
              </SpeechBubble>
            );
          })
        : null}
      <div ref={messagesEndRef} />
    </>
  );
}
