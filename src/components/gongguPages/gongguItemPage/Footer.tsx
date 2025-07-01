import styled from "styled-components";
import useDeviceSize from "../../../hooks/useDeviceSize";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import boxMoongchi from "../../../assets/images/start/뭉치박스.gif";

import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import clickedHeart from "../../../assets/images/common/누른하트.png";
import unclickedHeart from "../../../assets/images/common/안누른하트.png";
import type { GongguItem } from "../../../types/gongguPages/gongguItem";

const Wrap = styled.div<{ $isSmall: boolean }>`
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-between;
  gap: 3vw;
  align-items: center;
  padding: 0 5%;
  background-color: white;
  border-top: 1px solid #e8edff;
  position: fixed;
  bottom: 0;
  height: 90px;
  z-index: 1;
`;

const HeartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Heart = styled(Img)`
  cursor: pointer;
`;
const Button = styled.div`
  flex: 1;
  background-color: #5849d0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px 0;
  border-radius: 15px;
  cursor: pointer;
`;
const DisabledButton = styled.div`
  flex: 1;
  background-color: #e8edff;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px 0;
  border-radius: 15px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5); // 반투명 검정
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;

  overflow: hidden;
  touch-action: none;
  overscroll-behavior: none;
`;

const ModalWrapper = styled.div<{ $isSmall: boolean }>`
  background: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;
const ChatButton = styled.button`
  width: 60%;
  min-width: 330px;
  margin-top: 20px;
  padding: 20px;
  background-color: #5849d0;
  font-size: 20px;
  color: white;
  border-radius: 15px;
  font-family: DunggeunmisoBold;
`;

interface FooterProp {
  boardStatus: string | undefined;
  editable: boolean | undefined;
  chatRoomId: number | undefined;
  likeCount: number | undefined;
  join: boolean | undefined;
}

export default function Footer(props: FooterProp) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const itemId = Number(gongguId);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [clickCnt, setClickCnt] = useState<number>(props.likeCount || 0);
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    fetchWithAuth(`/api/group-boards/like`, {
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
        setIsLike(result.some((item: GongguItem) => item.id == itemId));
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [gongguId]);

  const likeAdd = async () => {
    try {
      const response = await fetchWithAuth(
        `/api/group-boards/${gongguId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setIsLike(true);
        setClickCnt((prev) => prev + 1);
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("찜 실패. 다시 시도해주세요.");
      throw error;
    }
  };

  const likeDelete = async () => {
    try {
      const response = await fetchWithAuth(
        `/api/group-boards/${gongguId}/like`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setIsLike(false);
        setClickCnt((prev) => prev - 1);
      }
    } catch (error) {
      console.log("delete failed: ", error);
      alert("찜 취소 실패. 다시 시도해주세요.");
      throw error;
    }
  };

  const gotoChat = async () => {
    try {
      const response = await fetchWithAuth(
        `/api/group-boards/${gongguId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        navigate(`/chat/${props.chatRoomId}`);
      }
    } catch (error) {
      console.error("post failed: ", error);
      alert("공구방 참여에 실패했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  return (
    <Wrap $isSmall={small}>
      <HeartWrap>
        <Heart
          src={isLike ? clickedHeart : unclickedHeart}
          width="45px"
          height="45px"
          onClick={isLike ? likeDelete : likeAdd}
        ></Heart>
        <Text fontSize="15px" fontFamily="DunggeunmisoBold" color="#5849d0">
          {clickCnt}
        </Text>
      </HeartWrap>
      {props.join ? (
        <Button onClick={() => navigate(`/chat/${props.chatRoomId}`)}>
          채팅방 바로 가기
        </Button>
      ) : props.boardStatus === "CLOSED" ||
        props.boardStatus === "COMPLETED" ? (
        <DisabledButton>참여할 수 없는 공구입니다.</DisabledButton>
      ) : (
        <Button onClick={() => setIsOpen(!isOpen)}>공구 참여하기</Button>
      )}
      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <ModalWrapper onClick={(e) => e.stopPropagation()} $isSmall={small}>
            <img src={boxMoongchi} style={{ width: "200px" }} />
            <p
              style={{
                fontFamily: "DunggeunmisoBold",
                fontSize: "24px",
                color: "#5849D0",
              }}
            >
              채팅방에 입장합니다!
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <p style={{ marginTop: "10px" }}>
                채팅방에 입장하면, 참여가 확정되어 나갈 수 없어요!
              </p>
              <p>참여자들과 함께 공구에 대한 대화를 나눠 보세요.</p>
            </div>

            <ChatButton onClick={gotoChat}>확인</ChatButton>
          </ModalWrapper>
        </Overlay>
      )}
    </Wrap>
  );
}
