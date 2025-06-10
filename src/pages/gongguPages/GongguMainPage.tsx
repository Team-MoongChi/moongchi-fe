import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GongguSearchBar from "../../components/gongguPages/gongguMainPage/GongguSearchBar";
import GongguMenu from "../../components/gongguPages/gongguMainPage/GongguMenu";
import GongguRecommend from "../../components/gongguPages/gongguMainPage/GongguRecommend";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import writeIcon from "../../assets/images/common/공구생성아이콘.png";
import { Text } from "../../components/common/styled-component/Text";
import { Wrap } from "../../components/common/styled-component/Wrap";

import type { GongguItem } from "../../types/gongguPage/gongguItem";

// 공구 리스트
const GongguList = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
  padding-bottom: 10vh;
`;

// 하단 내비바
const NavBar = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
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
  z-index: 1;
  bottom: 5em;
  width: 80px;
  height: 80px;
  cursor: pointer;
  align-self: end;
  margin: 5px 15px;
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

  const [menuClicked, setMenuClicked] = useState(0);

  const [gongguList, setGongguList] = useState<GongguItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllGongguItem = async () => {
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

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/group-boards/categories/${menuClicked}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNzQ5MDkzODk3LCJleHAiOjE3NDk2OTg2OTd9.hjyAym7PrQl_8DTGJY0U-piRN5hPuzDlknIlRv_6xLA",
          },
        }
      );
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
    if (menuClicked == 0) {
      fetchAllGongguItem();
    } else {
      fetchCategory();
    }
  }, [menuClicked]);

  if (loading) return <div>loading 중...</div>;

  return (
    <Wrap $issmall={small} $gap="20px">
      <GongguSearchBar />
      <GongguMenu menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
      <GongguRecommend />

      <GongguList>
        <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
          근처에서 열린 공구
        </Text>
        {gongguList.map((gongguItem, idx) => {
          return <GongguListItem key={idx} {...gongguItem}></GongguListItem>;
        })}
      </GongguList>

      <WriteIcon onClick={writeGonggu} />

      <NavBar $issmall={small}>
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
