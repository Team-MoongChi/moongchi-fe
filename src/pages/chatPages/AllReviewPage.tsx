import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/common/Header";
import UserProfile from "../../components/chatPages/common/UserProfile";
import { Wrap } from "../../components/common/styled-component/Wrap";
import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import ReviewButton from "../../components/chatPages/allReviewPage/ReviewButton";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;
const ReviewWrap = styled.div`
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
  align-items: center;
`;

export default function AllReviewPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const [userInfo, setUserInfo] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

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
      setUserInfo(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small} $gap="20px">
      <Header title="리뷰 작성" />
      <Body>
        <ReviewWrap>
          {userInfo?.participants.map((participant, idx) => {
            return (
              <UserWrap key={idx}>
                <UserProfile
                  src={participant.profileUrl}
                  width="clamp(40px, 2vw, 40px)"
                  name={participant.nickname}
                  isLeader={participant.role === "LEADER"}
                />
                {participant.me ? (
                  <ReviewButton
                    backgroundColor="#c7d2fe"
                    content="본인"
                    reviewed={true}
                  ></ReviewButton>
                ) : participant.reviewed ? (
                  <ReviewButton
                    backgroundColor="#c7d2fe"
                    content="작성완료"
                    reviewed={true}
                  ></ReviewButton>
                ) : (
                  <ReviewButton
                    backgroundColor="#5849d0"
                    content="작성하기"
                    reviewed={false}
                    chatRoomId={chatRoomId}
                    targetParticipantId={participant.participantId}
                    nickname={participant.nickname}
                  ></ReviewButton>
                )}
              </UserWrap>
            );
          })}
        </ReviewWrap>
        <Button>완료</Button>
      </Body>
    </Wrap>
  );
}
