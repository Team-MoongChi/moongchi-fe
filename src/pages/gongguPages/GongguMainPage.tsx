import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GongguSearchBar from "../../components/gongguPages/gongguMainPage/GongguSearchBar";
import GongguMenu from "../../components/gongguPages/gongguMainPage/GongguMenu";
import GongguRecommend from "../../components/gongguPages/gongguMainPage/GongguRecommend";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import writeIcon from "../../assets/images/common/공구생성아이콘.png";

import type { ProductList } from "../../components/gongguPages/common/GongguListItem";
import type { GongguItem } from "../../types/gongguPage/gongguItem";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 공구 리스트
const GongguList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
  padding-bottom: 10vh;
`;
const GongguTitle = styled.div`
  font-family: DunggeunmisoBold;
  font-size: 20px;
  color: #5849d0;
`;

// 하단 내비바
const NavBar = styled.div<{ isSmall: boolean }>`
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #e8edff;
  padding: 30px;
`;

// 글쓰기아이콘
const WriteIcon = styled.img.attrs({
  src: writeIcon,
  alt: "글쓰기 아이콘",
})`
  position: fixed;
  bottom: 6em;
  right: 1em;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

export default function GongguMainPage() {
  const navigate = useNavigate();
  const writeGonggu = () => {
    navigate("/gonggu/write", { state: { message: "user" } });
  };
  const writeGonggu2 = () => {
    navigate("/gonggu/write", { state: { message: "shop" } });
  };
  const { small } = useDeviceSize();

  const [gongguList, setGongguList] = useState<GongguItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGongguItem = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/group-boards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNzQ5MDkzODk3LCJleHAiOjE3NDk2OTg2OTd9.hjyAym7PrQl_8DTGJY0U-piRN5hPuzDlknIlRv_6xLA",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GongguItem[] = await response.json();
      console.log(data);
      setGongguList(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchGongguItem();
  }, []);

  if (loading) return <div>loading 중...</div>;

  return (
    <Wrap isSmall={small}>
      <GongguSearchBar />
      <GongguMenu />
      <GongguRecommend />
      <GongguList>
        <GongguTitle>근처에서 열린 공구</GongguTitle>
        {gongguList.map((gongguItem) => {
          return <GongguListItem {...gongguItem}></GongguListItem>;
        })}
      </GongguList>

      <WriteIcon onClick={writeGonggu} />
      <NavBar isSmall={small}>
        {/* 나중에 onclick 삭제하기 */}
        <div onClick={writeGonggu2}>홈</div>
        <div
          onClick={() => {
            navigate("/chat/list");
          }}
        >
          채팅
        </div>
        <div>쇼핑</div>
        <div>마이페이지</div>
      </NavBar>
    </Wrap>
  );
}
