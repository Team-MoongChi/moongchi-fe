import styled from "styled-components";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import type { Message } from "../../../../types/chatPages/message";
import useDeviceSize from "../../../../hooks/useDeviceSize";
import { Img } from "../../../common/styled-component/Img";
import sendChat from "../../../../assets/images/common/채팅전송아이콘.png";

const InputWrap = styled.div<{ $isSmall: boolean }>`
  display: flex;
  background-color: #5849d0;
  position: sticky;
  bottom: 0;
  width: 100%;
`;
const ButtonAndInput = styled.div`
  display: flex;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  margin: 20px 5%;
  padding: 0 5%;
  width: 100%;
`;
const Input = styled.input`
  border: none;
  width: 90%;
  padding: 15px;
  font-size: clamp(18px, 2vw, 20px);
  &:focus {
    outline: none;
  }
`;

interface ChatSocketProps {
  chatRoomId: number;
  newMessages: Message[];
  connected: boolean;
  stompClientRef: React.RefObject<Client | null>;
}

export default function ChatInput({
  chatRoomId,
  newMessages,
  connected,
  stompClientRef,
}: ChatSocketProps) {
  const { small } = useDeviceSize();

  const [input, setInput] = useState("");

  const sendMsg = () => {
    if (!input.trim() || !connected || !stompClientRef.current) {
      console.warn("메시지를 보낼 수 없음: 연결되지 않았거나 입력이 비어있음.");
      return;
    }

    stompClientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({
        chatRoomId: Number(chatRoomId),
        message: input.trim(),
        messageType: "TEXT",
      }),
    });
    setInput("");
  };

  useEffect(() => {
    console.log("newMessage", newMessages);
  }, [newMessages]);

  return (
    <InputWrap $isSmall={small}>
      <ButtonAndInput>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMsg()}
          placeholder={connected ? "메시지 입력" : "연결 중..."}
          disabled={!connected} // 연결되지 않았을 때 메시지 입력 비활성화
        />
        <button onClick={sendMsg} disabled={!connected}>
          <Img src={sendChat} width="30px" />
        </button>
      </ButtonAndInput>
    </InputWrap>
  );
}
