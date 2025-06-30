import styled from "styled-components";
import { useEffect, useLayoutEffect, type RefObject } from "react"; // useCallback 추가
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
  newMessages: Message[];
  endRef: RefObject<HTMLDivElement | null>;
  isMounted: boolean;
}

export default function Chatconnect({
  chatRoomId,
  chatRoomStatus,
  participantId,
  tradeCompleted,
  address,
  role,
  initialMessages,
  newMessages,
  endRef,
  isMounted,
}: ChatConnectProps) {
  const prevMessages = initialMessages;

  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    endRef.current?.scrollIntoView({ behavior });
  };

  // 최초 마운트 시 스크롤
  useLayoutEffect(() => {
    if (isMounted) {
      scrollToBottom("auto");
    }
  }, [isMounted]);

  // 새 메세지 수신 시 스크롤
  useEffect(() => {
    if (newMessages.length > 0) {
      scrollToBottom("smooth");
    }
  }, [newMessages]);

  const system = (type: string, isLeader: boolean, sendAt: string) => {
    switch (type) {
      case "RECRUITING":
        return <Recruiting sendAt={sendAt} />;
      case "RECRUITED":
        return <Recruited chatRoomId={chatRoomId} sendAt={sendAt} />;
      case "PAYING":
        return (
          <Paying
            chatRoomId={chatRoomId}
            chatRoomStatus={chatRoomStatus}
            isLeader={isLeader}
            sendAt={sendAt}
          />
        );
      case "PURCHASED":
        return isLeader ? (
          <Purchased
            chatRoomId={chatRoomId}
            address={address}
            sendAt={sendAt}
            isLeader={isLeader}
          />
        ) : (
          <>
            <Purchased
              chatRoomId={chatRoomId}
              address={address}
              sendAt={sendAt}
              isLeader={isLeader}
            />
            <PurchasedFollower
              chatRoomId={chatRoomId}
              chatRoomStatus={chatRoomStatus}
              tradeCompleted={tradeCompleted}
              sendAt={sendAt}
            />
          </>
        );
      case "COMPLETED":
        return <Completed chatRoomId={chatRoomId} sendAt={sendAt} />;
      default:
        return;
    }
  };

  const timeFormat = (iso: string): string => {
    const pastMilliseconds = new Date(iso).getTime();
    const time = new Date(pastMilliseconds).toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      second: undefined,
    });
    return time;
  };

  return (
    <>
      {/* 채팅 메시지 리스트 */}
      {prevMessages.map((m, idx) => {
        const isMe = m.participantId === participantId;
        const isSystem = m.messageType === "SYSTEM";
        const isEnter = m.messageType === "ENTER";
        console.log(
          "이전메세지 사용자 정보",
          m.senderNickname,
          m.senderProfileUrl
        );

        const profileUrl = m.senderProfileUrl || "";
        const nickname = m.senderNickname || "알 수 없음";

        // 시간
        let displayTime = true;
        const curSendAt = timeFormat(m.sendAt || "");
        if (idx !== prevMessages.length - 1) {
          const nextSender = prevMessages[idx + 1].participantId;
          if (nextSender === m.participantId) {
            const nextSendAt = timeFormat(prevMessages[idx + 1].sendAt || "");

            if (nextSendAt === curSendAt) {
              displayTime = false;
            }
          }
        }

        // 프로필 & 닉네임
        let displayProfile = false;
        if (idx !== 0) {
          const prevSender = prevMessages[idx - 1].participantId;
          const prevSendat = timeFormat(prevMessages[idx - 1].sendAt || "");
          if (prevSender !== m.participantId || prevSendat !== curSendAt) {
            displayProfile = true;
          }
        }

        return isSystem ? (
          system(m.chatStatus, role === "LEADER", timeFormat(m.sendAt || ""))
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
            sendAt={curSendAt}
            displayProfile={displayProfile}
            displayTime={displayTime}
          >
            {m.message}
          </SpeechBubble>
        );
      })}
      {newMessages
        ? newMessages.map((m, idx) => {
            const isMe = m.participantId === participantId;
            const isSystem = m.messageType === "SYSTEM";
            const isEnter = m.messageType === "ENTER";
            console.log(
              "새 메세지 사용자 정보",
              m.senderNickname,
              m.senderProfileUrl
            );

            const profileUrl = m.senderProfileUrl || "";
            const nickname = m.senderNickname || "알 수 없음";

            // 시간
            let displayTime = true;
            const curSendAt = timeFormat(m.sendAt || "");
            if (idx !== newMessages.length - 1) {
              const nextSender = newMessages[idx + 1].participantId;
              if (nextSender === m.participantId) {
                const nextSendAt = timeFormat(
                  newMessages[idx + 1].sendAt || ""
                );

                if (nextSendAt === curSendAt) {
                  displayTime = false;
                }
              }
            }

            // 프로필 & 닉네임
            let displayProfile = false;
            if (idx !== 0) {
              const prevSender = newMessages[idx - 1].participantId;
              const prevSendat = timeFormat(newMessages[idx - 1].sendAt || "");
              if (prevSender !== m.participantId || prevSendat !== curSendAt) {
                displayProfile = true;
              }
            }

            return isSystem ? (
              system(
                m.chatStatus,
                role === "LEADER",
                timeFormat(m.sendAt || "")
              )
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
                sendAt={curSendAt}
                displayProfile={displayProfile}
                displayTime={displayTime}
              >
                {m.message}
              </SpeechBubble>
            );
          })
        : null}
      <div ref={endRef} />
    </>
  );
}
