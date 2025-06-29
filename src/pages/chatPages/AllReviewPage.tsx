import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../components/common/Header";
import UserProfile from "../../components/chatPages/common/UserProfile";
import EmptyPage from "../EmptyPage";
import ReviewButton from "../../components/chatPages/allReviewPage/ReviewButton";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { Text } from "../../components/common/styled-component/Text";
import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import loadingM from "../../assets/images/moongchies/로딩중.gif";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 60dvh;
  padding: 0 5%;
`;
const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  cursor: pointer;
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
const Loading = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
  }
  p {
    font-family: DunggeunmisoBold;
    color: #5849d0;
  }
`;

export default function AllReviewPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();
  const navigate = useNavigate();

  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<number>();

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
        if (response.status === 404) {
          setErrorStatus(404);
        }
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
    fetchUserInfo();
  }, []);

  const join = () => {
    if (!loading && chatRoom !== null) {
      const isJoined = chatRoom?.participants.find(
        (participant) => participant.me === true
      );
      if (!isJoined) return false;
      else return true;
    }
    return false;
  };

  // 링크를 이용한 이동 막기
  const Lock = () => {
    if (loading || chatRoom === null) return null;

    if (errorStatus === 404) {
      return <EmptyPage error="404 NOT FOUND!" item="리뷰 페이지를" />;
    } else if (join() && chatRoom?.status !== "공구완료")
      return (
        <EmptyPage
          error="아직 공구가 완료되지 않았습니다."
          item="리뷰 페이지를"
        />
      );
    else if (!join()) {
      return <EmptyPage error="잘못된 접근입니다." item="리뷰 페이지를" />;
    }
    return null;
  };

  return (
    <>
      {Lock()}
      <Wrap $issmall={small} $height="100dvh" $gap="20px">
        <Header title="리뷰 작성" route={`/chat/${chatRoomId}`} />
        {loading ? (
          <Loading>
            <img src={loadingM} alt="" />
            <p>결제현황을 불러오고 있어요 '◡'</p>
          </Loading>
        ) : (
          <>
            <Body>
              <Text fontSize="22px">공동 구매는 어떠셨나요?</Text>
              <ReviewInfo>
                <Text fontSize="16px" color="#767676">
                  리더 또는 팔로워에게
                </Text>
                <Text
                  fontSize="28px"
                  color="#5849d0"
                  fontFamily="DunggeunmisoBold"
                >
                  리뷰를 작성해 주세요.
                </Text>
              </ReviewInfo>

              <ReviewWrap>
                {chatRoom?.participants.map((participant, idx) => {
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
                          cursor="default"
                        ></ReviewButton>
                      ) : participant.reviewed ? (
                        <ReviewButton
                          backgroundColor="#c7d2fe"
                          content="작성완료"
                          reviewed={true}
                          cursor="default"
                        ></ReviewButton>
                      ) : (
                        <ReviewButton
                          backgroundColor="#5849d0"
                          content="작성하기"
                          reviewed={false}
                          cursor="pointer"
                          chatRoomId={chatRoomId}
                          targetParticipantId={participant.participantId}
                          nickname={participant.nickname}
                        ></ReviewButton>
                      )}
                    </UserWrap>
                  );
                })}
              </ReviewWrap>
            </Body>
            <Button onClick={() => navigate(`/chat/${chatRoomId}`)}>
              완료
            </Button>
          </>
        )}
      </Wrap>
    </>
  );
}
