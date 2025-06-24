import styled from "styled-components";
import { useState, useEffect } from "react";

import { fetchWithAuth } from "../../utils/FetchWithAuth";
import useDeviceSize from "../../hooks/useDeviceSize";
import MapHeader from "../../components/gongguPages/gongguMapPage/MapHeader";
import MapMenu from "../../components/gongguPages/gongguMapPage/MapMenu";
import GongguMap from "../../components/gongguPages/gongguMapPage/GongguMap";
import loadingM from "../../assets/images/moongchies/로딩중.gif";
import type { GongguMapItem } from "../../types/gongguPages/gongguMapItem";
import type { GongguLocation } from "../../types/gongguPages/gongguLocation";

const Wrap = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: #fafafa;
`;
const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(255, 255, 255, 0.5); // 반투명 검정
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  overflow: hidden;
  touch-action: none;
  overscroll-behavior: none;

  img {
    width: 200px;
  }
  p {
    color: #5849d0;
    font-family: DunggeunmisoBold;
  }
`;

export default function GongguMapPage() {
  const { small } = useDeviceSize();
  // 상태 끌어올리기
  const [menuClicked, setMenuClicked] = useState<number>(0);
  const [markerClicked, setMarkerClicked] = useState<number>(-1);

  // 사용자 주소 받아오기
  const userLocation = sessionStorage.getItem("GONGGU_MAP_STATE");
  console.log(userLocation);

  const [loading, setLoading] = useState<boolean>(false);
  const [mapList, setMapList] = useState<GongguMapItem[]>([]);
  const [position, setPositon] = useState<GongguLocation[]>([]);

  // 전체 조회
  const fetchAllMapItem = async () => {
    setLoading(true);
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
      const data: GongguMapItem[] = await response.json();
      const dataLocation: GongguLocation[] = data.map((item) => ({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        categoryId: item.largeCategoryId,
      }));
      setMapList(data);
      setPositon(dataLocation);
      setLoading(false);
    } catch (error) {
      console.error("list get failed: ", error);
      setLoading(false);
      throw error;
    }
  };
  // 카테고리별 조회
  const fetchCategory = async () => {
    setLoading(true);
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
      const data: GongguMapItem[] = await response.json();
      const dataLocation: GongguLocation[] = data.map((item) => ({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        categoryId: item.largeCategoryId,
      }));
      setMapList(data);
      setPositon(dataLocation);
      setLoading(false);
    } catch (error) {
      console.error("category get failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    if (menuClicked == 0) {
      fetchAllMapItem();
    } else {
      fetchCategory();
    }
  }, [menuClicked]);

  useEffect(() => {
    console.log("mapList", mapList);
    console.log("position", position);
  }, [mapList, position]);

  // if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small}>
      {loading && (
        <Overlay>
          <img src={loadingM} />
          <p>로딩중...</p>
        </Overlay>
      )}
      <MapHeader />
      <Body>
        <MapMenu
          menuClicked={menuClicked}
          setMenuClicked={setMenuClicked}
          setMarkerClicked={setMarkerClicked}
        />
        <GongguMap
          mapItemList={mapList}
          location={userLocation}
          positionInfo={position}
          isClicked={markerClicked}
          setIsClicked={setMarkerClicked}
          menuClicked={menuClicked}
        />
      </Body>
    </Wrap>
  );
}
