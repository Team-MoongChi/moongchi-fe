import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { fetchWithAuth } from "../../utils/FetchWithAuth";
import useDeviceSize from "../../useDeviceSize";
import MapHeader from "../../components/gongguPages/gongguMapPage/MapHeader";
import MapMenu from "../../components/gongguPages/gongguMapPage/MapMenu";
import GongguMap from "../../components/gongguPages/gongguMapPage/GongguMap";
import type { GongguMapItem } from "../../types/gongguPages/gongguMapItem";
import type { GongguLocation } from "../../types/gongguPages/gongguLocation";

const Wrap = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fafafa;
`;
const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function GongguMapPage() {
  const { small } = useDeviceSize();
  // 상태 끌어올리기
  const [menuClicked, setMenuClicked] = useState<number>(0);
  const [markerClicked, setMarkerClicked] = useState<number>(-1);

  // 사용자 주소 받아오기
  const location = useLocation();
  const userLocation = location.state.userLocation;
  console.log(userLocation);

  const [loading, setLoading] = useState<boolean>(false);
  const [mapList, setMapList] = useState<GongguMapItem[]>([]);
  const [position, setPositon] = useState<GongguLocation[]>([]);

  // 전체 조회
  const fetchAllMapItem = async () => {
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

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small}>
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
