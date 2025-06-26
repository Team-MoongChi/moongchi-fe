import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const { Kakao } = window;

import useDeviceSize from "../../../hooks/useDeviceSize";
import back from "../../../assets/images/common/뒤로가기.png";
import edit from "../../../assets/images/gonggu/공구수정아이콘.png";
import share from "../../../assets/images/gonggu/공구공유아이콘.png";
import del from "../../../assets/images/gonggu/공구삭제아이콘.png";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import { useHistoryStack } from "../../../utils/useHistoryStack";

const Wrap = styled.div<{
  $issmall: boolean;
  $scroll: number;
}>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.$scroll >= 300 ? "#5849d0" : "rgba(255, 255, 255, 0)"};
  background-image: ${(props) =>
    props.$scroll >= 300
      ? "none"
      : "linear-gradient(to bottom,rgba(115, 115, 115, 0.4) 0%,rgba(126, 126, 126, 0.3) 20%,rgba(172, 172, 172, 0.2) 50%,rgba(209, 209, 209, 0.1) 80%,rgba(255, 255, 255, 0) 100%)"};
  border-radius: ${(props) => (props.$scroll >= 300 ? "0 0 15px 15px" : "0")};
  padding: 20px;
  z-index: 2;
`;
const IconButton = styled.img.attrs<{ src: string }>((props) => ({
  src: props.src,
}))`
  height: 35px;
  cursor: pointer;
`;
const Right = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

interface HeaderProps {
  editable: boolean | undefined;
  isShop: string | undefined;
  imgUrl: string | undefined;
  title: string | undefined;
  content: string | undefined;
  totalUser: number | undefined;
  currentUsers: number | undefined;
  boardStatus: string | undefined;
}

export default function Header(props: HeaderProps) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const navigate = useNavigate();
  const resultUrl = window.location.href;
  const { pop } = useHistoryStack();

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init(import.meta.env.VITE_KAKAOMAP_KEY);
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    console.log(resultUrl);
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: props.title,
        description: props.content,
        imageUrl: props.imgUrl,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "공구하러 가기",
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
      ],
    });
  };

  const [scroll, setScroll] = useState<number>(0);
  const onScroll = () => {
    setScroll(window.scrollY);
  };

  const deleteFetch = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    try {
      const response = await fetchWithAuth(`/api/group-boards/${gongguId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("글 삭제 성공!");
        navigate("/");
        console.log("글 삭제 요청");
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("글 삭제에 실패했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  const handleBackButton = () => {
    const backPath = pop() || "/";
    navigate(backPath);
  };
  const handelDeleteButton = () => {
    if (
      props.totalUser === props.currentUsers &&
      props.boardStatus === "CLOSED"
    ) {
      alert("공구가 아직 진행 중입니다. 글을 삭제할 수 없습니다.");
    } else {
      deleteFetch();
    }
  };
  const handelEditButton = () => {
    if (
      props.totalUser === props.currentUsers &&
      props.boardStatus === "CLOSED"
    ) {
      alert("공구가 아직 진행중입니다. 글을 수정할 수 없습니다.");
    } else {
      navigate(`/gonggu/edit/${gongguId}`, {
        state: {
          message: props.isShop,
          imgUrl: props.imgUrl,
        },
      });
    }
  };

  return (
    <Wrap $issmall={small} $scroll={scroll}>
      <IconButton src={back} onClick={handleBackButton} />
      <Right>
        <IconButton src={share} onClick={shareKakao} />
        {props.editable ? (
          <IconButton src={edit} onClick={handelEditButton} />
        ) : null}
        {props.editable ? (
          <IconButton src={del} onClick={handelDeleteButton} />
        ) : null}
      </Right>
    </Wrap>
  );
}
