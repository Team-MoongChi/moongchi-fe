import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useDeviceSize from "../../hooks/useDeviceSize";
import GongguSearchBar from "../../components/gongguPages/gongguMainPage/GongguSearchBar";
import GongguMenu from "../../components/gongguPages/gongguMainPage/GongguMenu";
import GongguRecommend from "../../components/gongguPages/gongguMainPage/GongguRecommend";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import Nav from "../../components/common/Nav";
import { Text } from "../../components/common/styled-component/Text";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import type { GongguItem } from "../../types/gongguPages/gongguItem";
import writeIcon from "../../assets/images/common/공구생성아이콘.png";
import GongguEmpty from "../../components/gongguPages/gongguMainPage/GongguEmpty";

const Body = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  margin-top: 20px;
  gap: 20px;
`;
const GongguList = styled.div`
  display: flex;
  padding-bottom: 15vh;
  flex-direction: column;
  gap: 10px;
`;
const WriteIcon = styled.img.attrs({
  src: writeIcon,
  alt: "글쓰기 아이콘",
})`
  position: fixed;
  z-index: 1;
  bottom: 6em;
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

  const { small } = useDeviceSize();

  const [menuClicked, setMenuClicked] = useState<number>(0);
  const [gongguList, setGongguList] = useState<GongguItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllGongguItem = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);

    try {
      const response = await fetchWithAuth("/api/group-boards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      console.error("list get failed: ", error);
      setLoading(false);
      throw error;
    }
  };

  const fetchCategory = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);

    try {
      const response = await fetchWithAuth(
        `/api/group-boards/categories/${menuClicked}`,
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
      const data: GongguItem[] = await response.json();
      console.log(data);
      setGongguList(data);
      setLoading(false);
    } catch (error) {
      console.error("category get failed: ", error);
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
    <Wrap $issmall={small}>
      <GongguSearchBar />
      <Body>
        <GongguMenu menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
        <GongguRecommend />

        <GongguList>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
            근처에서 열린 공구
          </Text>
          {gongguList.length === 0 ? (
            <GongguEmpty height="50vh" />
          ) : (
            gongguList.map((gongguItem, idx) => {
              return (
                <GongguListItem key={idx} {...gongguItem}></GongguListItem>
              );
            })
          )}
        </GongguList>
      </Body>
      <WriteIcon onClick={writeGonggu} />
      <Nav />
    </Wrap>
  );
}
