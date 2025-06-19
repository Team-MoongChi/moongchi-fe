import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

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
`;

interface FooterProp {
  editable: boolean | undefined;
  chatRoomId: number | undefined;
  likeCount: number | undefined;
}

export default function Footer(props: FooterProp) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const itemId = Number(gongguId);
  const navigate = useNavigate();

  const [clickCnt, setClickCnt] = useState<number>(props.likeCount || 0);
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

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
    const token = localStorage.getItem("access_token");
    console.log(token);

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
        console.log("찜 성공");
        setIsLike(true);
        setClickCnt((prev) => prev + 1);
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("찜 실패");
      throw error;
    }
  };

  const likeDelete = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

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
        console.log("찜 취소 완료");
        setIsLike(false);
        setClickCnt((prev) => prev - 1);
      }
    } catch (error) {
      console.log("delete failed: ", error);
      alert("찜 취소 실패");
      throw error;
    }
  };

  const gotoChat = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

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
        alert("공구방 참여 성공");
        navigate(`/chat/list/${props.chatRoomId}`);
      }
    } catch (error) {
      console.error("post failed: ", error);
      alert("공구방 참여 실패");
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
      {props.editable ? (
        <Button onClick={() => navigate(`/chat/list/${props.chatRoomId}`)}>
          채팅방 바로 가기
        </Button>
      ) : (
        <Button onClick={gotoChat}>공구 참여하기</Button>
      )}
    </Wrap>
  );
}
