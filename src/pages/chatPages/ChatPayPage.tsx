import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PayHeader from "../../components/chatPages/chatPayPage/PayHeader";
import UserProfile from "../../components/chatPages/common/UserProfile";
import UserCost from "../../components/chatPages/chatPayPage/UserCost";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import type { ChatRoomItem } from "../../types/chatPages/chatRoomItem";
import loadingM from "../../assets/images/moongchies/로딩중.gif";
import EmptyPage from "../EmptyPage";

declare global {
  interface Window {
    IMP: any;
  }
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 60dvh;
  padding: 0 5%;
`;

const Button = styled.button`
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  margin: 0 5%;

  &:disabled {
    background-color: #e8edff;
    color: #aeb8db;
  }
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
  padding: 8%;
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

interface User {
  email: string;
  name: string;
  phone: string;
  address: string;
}

export default function ChatPayPage() {
  const { small } = useDeviceSize();
  const { chatRoomId } = useParams();

  const [chatRoom, setChatRoom] = useState<ChatRoomItem>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<number>();

  const fetchChatRoom = async () => {
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
    fetchWithAuth(`/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`get failed: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setUser(result);
        setUserLoading(false);
      })
      .catch((error) => {
        console.error("get failed: ", error);
      });
  }, []);

  const disabled = () => {
    if (!chatRoom) return true;

    if (chatRoom.status === "모집완료") {
      const isPaid = chatRoom.participants.some(
        (participant) => participant.me && participant.payStatement === "PAID"
      );
      return isPaid ? true : false;
    } else {
      return true;
    }
  };
  const join = () => {
    if (!loading && !userLoading && chatRoom !== null) {
      const isJoined = chatRoom?.participants.find(
        (participant) => participant.me === true
      );
      if (!isJoined) return false;
      else return true;
    }
    return false;
  };

  const onClickPayment = async () => {
    const { IMP } = window;
    IMP.init("imp23204826");

    const merchant_uid = `mid_${new Date().getTime()}`;

    IMP.request_pay(
      {
        pg: "html5_inicis", //결제 회사 ex) kakaopay
        pay_method: "card",
        merchant_uid,
        name: "주문명: 단체공구 결제",
        amount: chatRoom?.participants[0].perPersonPrice,
        buyer_email: user?.email, //구매자 이메일
        buyer_name: user?.name, //구매자 이름
        buyer_tel: user?.phone, //구매자 전화번호
        buyer_addr: user?.address, //구매자 주소
        buyer_postcode: "00000",
      },
      async (rsp: any) => {
        if (rsp.success) {
          //웹 버전일 때 (콜백x)
          const { imp_uid } = rsp;

          try {
            const response = await fetchWithAuth(
              `/api/chat/rooms/${chatRoomId}/pay`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ impUid: imp_uid }),
              }
            );

            if (response.ok) {
              window.location.href = `/chat/${chatRoomId}/pay`;
            } else {
              alert("결제 검증 실패");
            }
          } catch (e) {
            console.error("결제 에러", e);
            alert("결제 처리 중 오류 발생");
          } finally {
            setLoading(false);
          }
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  useEffect(() => {
    fetchChatRoom();
  }, []);

  // 링크를 이용한 이동 막기
  const Lock = () => {
    if (loading || userLoading || chatRoom === null) return null;

    if (errorStatus === 404) {
      return <EmptyPage error="404 NOT FOUND!" item="결제 페이지를" />;
    } else if (
      join() &&
      (chatRoom?.status === "모집중" || chatRoom?.status === "마감임박")
    )
      return <EmptyPage error="아직 모집 중입니다." item="결제 페이지를" />;
    else if (!join()) {
      return <EmptyPage error="잘못된 접근입니다." item="결제 페이지를" />;
    }
    return null;
  };

  return (
    <>
      {Lock()}
      <Wrap $issmall={small} $height="100dvh" $gap="30px">
        <PayHeader />
        {loading && userLoading ? (
          <Loading>
            <img src={loadingM} alt="" />
            <p>결제현황을 불러오고 있어요 '◡'</p>
          </Loading>
        ) : (
          <>
            <Body>
              <Text fontSize="22px">결제 현황이에요.</Text>
              <TotalCost>
                <Text fontSize="16px" color="#767676">
                  모인 금액
                </Text>
                <Text
                  fontSize="30px"
                  color="#5849d0"
                  fontFamily="DunggeunmisoBold"
                >
                  총{" "}
                  {chatRoom?.participants
                    .reduce((acc, cur) => acc + cur.perPersonPrice, 0)
                    .toLocaleString()}
                  원
                </Text>
              </TotalCost>

              <PayWrap>
                {chatRoom?.participants.map((participant, idx) => {
                  return (
                    <UserWrap key={idx}>
                      <UserProfile
                        src={participant.profileUrl}
                        width="clamp(38px, 2vw, 38px)"
                        name={participant.nickname}
                        isLeader={participant.role === "LEADER"}
                      />
                      <UserCost
                        cost={participant.perPersonPrice.toLocaleString()}
                        isPaid={participant.payStatement === "PAID"}
                        width="clamp(38px, 2vw, 38px)"
                      />
                    </UserWrap>
                  );
                })}
              </PayWrap>
            </Body>
            <Button
              type="button"
              onClick={onClickPayment}
              disabled={disabled()}
            >
              {disabled() ? "결제 완료" : "결제하기"}
            </Button>
          </>
        )}
      </Wrap>
    </>
  );
}
