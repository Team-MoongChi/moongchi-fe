import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Client } from "@stomp/stompjs";
import { Outlet, useParams } from "react-router-dom";
import { StompHeaders, type Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import type { ChatRoomItem } from "../../../types/chatPages/chatRoomItem";
import type { Message } from "../../../types/chatPages/message";

interface SocketConnectProps {
  setChatRoomId: (value: number | null) => void;
}

export default function SocketConnect(props: SocketConnectProps) {
  const { chatRoomId } = useParams();
  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [participantMap, setParticipantMap] = useState(
    new Map<number, { nickname: string; profileUrl: string }>()
  );
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [errorStatus, setErrorStatus] = useState<number>();

  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [prevMessages, setPrevMessages] = useState<Message[]>([]);

  const fetchChatRoom = async (value: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) setToken(token);

    try {
      const response = await fetchWithAuth(
        value === ""
          ? `/api/chat/rooms/${chatRoomId}`
          : `/api/chat/rooms/${chatRoomId}?before=${value}&size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setErrorStatus(response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatRoomItem = await response.json();
      setLoading(false);

      if (data.messages.length < 10) {
        setHasMore(false);
      }
      if (value === "") {
        setPrevMessages(data.messages);
        setChatRoom(data);
        setIsInitial(false);
      } else {
        setPrevMessages((prev) => [...data.messages, ...prev]);
      }
    } catch (error) {
      console.error("get failed: ", error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (isInitial) {
      fetchChatRoom("");
    }
  }, [isInitial]);

  const myParticipant = useMemo(() => {
    return chatRoom?.participants.find((participant) => participant.me) || null;
  }, [chatRoom]);

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

  const [connected, setConnected] = useState<boolean>(false);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<any>(null);

  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  ); //타입 수정
  const reconnectInterval = useRef(1000); // 초기 재연결 간격 (1초)
  const maxReconnectInterval = 30000; // 최대 재연결 간격 (30초)
  const maxReconnectAttempts = 10; // 최대 재연결 시도 횟수
  const shouldAttemptReconnect = useRef(true); // 재연결 시도 여부 플래그

  const connectSocket = useCallback(() => {
    if (!chatRoomId || !myParticipant?.participantId || !token) {
      return;
    }

    // 이미 연결 중이거나 연결 시도 중인 클라이언트가 있다면 정리
    // (activate() 호출 후 즉시 connected 상태가 되지 않을 수 있으므로, ref로 관리)
    if (stompClientRef.current && stompClientRef.current.active) {
      return;
    }
    // 이전 클라이언트 인스턴스 정리
    if (stompClientRef.current) {
      stompClientRef.current.deactivate(); // 현재 활성화되어있지 않더라도 안전하게 호출
      stompClientRef.current = null;
    }

    try {
      const client = new Client({
        webSocketFactory: () => {
          const socket = new SockJS(`https://api.moong-chi.com/ws/chat`, null, {
            transports: ["websocket", "xhr-streaming", "xhr-polling"],
          });
          return socket;
        },
        connectHeaders: {
          Authorization: `Bearer ${token}`,
          chatRoomId: String(chatRoomId),
        } as StompHeaders,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,

        onConnect: () => {
          setConnected(true);
          stompClientRef.current = client; // 연결 성공 시 ref에 저장
          reconnectAttemptsRef.current = 0; // 성공 시 시도 횟수 초기화
          reconnectInterval.current = 1000; // 성공 시 재연결 간격 초기화

          const subscription = client.subscribe(
            `/topic/chatroom.${chatRoomId}`,
            (msg: Frame) => {
              try {
                const newMsg: Message = JSON.parse(msg.body);
                if (
                  newMsg.messageType === "ENTER" &&
                  newMsg.participantId &&
                  setParticipantMap
                ) {
                  setParticipantMap((prev) => {
                    const updated = new Map(prev);
                    updated.set(newMsg.participantId!, {
                      nickname: newMsg.senderNickname || "알 수 없음",
                      profileUrl:
                        newMsg.senderProfileUrl ||
                        "/images/default-profile.png",
                    });
                    return updated;
                  });
                }

                setNewMessages((prev) => {
                  if (
                    newMsg.messageType === "ENTER" ||
                    newMsg.messageType === "SYSTEM"
                  )
                    return [...prev, newMsg];
                  if (!newMsg.id || prev.some((m) => m.id === newMsg.id)) {
                    return prev; // 중복 메시지 방지
                  }
                  return [...prev, newMsg];
                });
              } catch (parseError) {
                console.error("메시지 파싱 오류:", parseError, msg.body);
              }
            }
          );
          subscriptionRef.current = subscription;
        },
        onStompError: (frame: Frame) => {
          console.error("❌ STOMP 에러 발생: ", frame);
          setConnected(false);
          console.error("Error headers:", frame.headers);
          console.error("Error body:", frame.body);
          alert("STOMP 연결 중 오류가 발생했습니다. 콘솔을 확인하세요.");
          // STOMP 에러 발생 시에도 재연결 시도
          if (shouldAttemptReconnect.current) {
            scheduleReconnect();
          }
        },
        onWebSocketError: (event: Event) => {
          console.error("❌ WebSocket 에러 발생: ", event);
          setConnected(false);
          // WebSocket 에러 발생 시에도 재연결 시도
          if (shouldAttemptReconnect.current) {
            scheduleReconnect();
          }
        },
        onWebSocketClose: (event: CloseEvent) => {
          console.warn("⚡️ WebSocket 연결이 닫혔습니다: ", event);
          setConnected(false);
          if (event.code === 1000) {
            props.setChatRoomId(Number(chatRoomId));
          }
          // 정상 종료 (1000)가 아니면 재연결 시도
          if (event.code !== 1000 && shouldAttemptReconnect.current) {
            scheduleReconnect();
          }
        },
        onDisconnect: () => {
          setConnected(false);
          // onDisconnect는 명시적인 연결 해제 또는 서버 측에서 연결 끊김 시 발생
          // 여기서도 재연결을 시도할지 결정 (예: 사용자 요청에 의한 disconnect는 재연결 안 함)
          if (shouldAttemptReconnect.current) {
            scheduleReconnect();
          }
        },
      });

      client.activate(); // 연결 시도
      stompClientRef.current = client; // activate 후 ref에 저장
    } catch (error) {
      console.error("STOMP 연결 초기화 중 오류:", error);
      setConnected(false);
      if (shouldAttemptReconnect.current) {
        scheduleReconnect();
      }
    }
  }, [chatRoomId, myParticipant?.participantId, token]); // useCallback 의존성

  // 재연결 시도를 스케줄링하는 함수
  const scheduleReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current); // 이전 타이머가 있다면 취소
      }
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttemptsRef.current++;
        connectSocket(); // 재귀적으로 연결 시도
        // 지수 백오프: 다음 재연결 간격 늘리기
        reconnectInterval.current = Math.min(
          reconnectInterval.current * 2,
          maxReconnectInterval
        );
      }, reconnectInterval.current);
    } else {
      console.error("최대 재연결 시도 횟수 도달. 재연결을 포기합니다.");
      // 사용자에게 연결 실패 알림 또는 UI 변경
      setConnected(false); // 연결 안 된 상태로 확정
      shouldAttemptReconnect.current = false; // 더 이상 재연결 시도 안 함
      alert("채팅 연결에 실패했습니다. 페이지를 새로고침 해 주세요.");
    }
  }, [connectSocket]); // connectSocket이 변경될 때만 재생성

  // 컴포넌트 마운트 시 최초 연결 시도
  useEffect(() => {
    shouldAttemptReconnect.current = true; // 재연결 플래그 초기화
    connectSocket();

    return () => {
      shouldAttemptReconnect.current = false; // 컴포넌트 언마운트 시 재연결 중지 플래그
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current); // 보류 중인 재연결 타이머 취소
      }
      if (stompClientRef.current) {
        // 1000은 정상 종료 코드. 서버는 이 코드를 받으면 다시 연결 시도하지 않음.
        stompClientRef.current.deactivate();
      }
      stompClientRef.current = null;
      subscriptionRef.current = null;
      setConnected(false);
    };
  }, [
    chatRoomId,
    myParticipant?.participantId,
    token,
    connectSocket,
    scheduleReconnect,
  ]); // connectSocket, scheduleReconnect도 의존성으로 추가

  return (
    <Outlet
      context={{
        chatRoom: chatRoom,
        myParticipant: myParticipant,
        participantMap: participantMap,
        newMessages: newMessages,
        prevMessages: prevMessages,
        stompClientRef: stompClientRef,
        connected: connected,
        loading: loading,
        errorStatus: errorStatus,
        hasMore: hasMore,
        isInitial: isInitial,
        fetchChatRoom: fetchChatRoom,
      }}
    />
  );
}
