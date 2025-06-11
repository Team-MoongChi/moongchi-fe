import React from "react";
import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/chatPages/chatPayPage/Header";
import UserProfile from "../../components/chatPages/common/UserProfile";
import UserCost from "../../components/chatPages/chatPayPage/UserCost";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 5%;
`;

const Button = styled.div`
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  margin: 0 5%;
`;

const TotalCost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const PayWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e8edff;
  border-radius: 15px;
  padding: 10%;
  gap: 40px;
`;
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TextProps {
  fontSize: string;
  color?: string;
  fontFamily?: string;
}
const Text = styled.div<TextProps>`
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "inherit"};
`;

export default function ChatPayPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatRoom = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    console.log(chatRoomId);

    try {
      const response = await fetchWithAuth(
        `http://localhost:8080/api/chat/rooms/${chatRoomId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small} $gap="30px">
      <Header />
      <Body>
        <Text fontSize="22px">결제 현황이에요.</Text>
        <TotalCost>
          <Text fontSize="14px" color="#767676">
            모인 금액
          </Text>
          <Text fontSize="32px" color="#5849d0" fontFamily="DunggeunmisoBold">
            총{" "}
            {chatRoom?.participants
              .reduce((acc, cur) => acc + cur.perPersonPrice, 0)
              .toLocaleString()}
            원
          </Text>
        </TotalCost>

        <PayWrap>
          <UserWrap>
            {chatRoom?.participants.map((participant, idx) => {
              return (
                <React.Fragment key={idx}>
                  <UserProfile
                    src={participant.profileUrl}
                    width="clamp(40px, 2vw, 40px)"
                    name={participant.nickname}
                  />
                  <UserCost
                    cost={participant.perPersonPrice.toLocaleString()}
                    isPayed={participant.payStatement === "PAID"}
                    width="clamp(40px, 2vw, 40px)"
                  />
                </React.Fragment>
              );
            })}
          </UserWrap>
        </PayWrap>
      </Body>
      <Button>결제하기</Button>
    </Wrap>
  );
}
