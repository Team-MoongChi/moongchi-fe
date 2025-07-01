import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useMap } from "react-kakao-maps-sdk";
import { Text } from "../../common/styled-component/Text";
import type { GongguLocation } from "../../../types/gongguPages/gongguLocation";

const Wrap = styled.div<{ $isEqual: boolean }>`
  background-color: ${(props) => (props.$isEqual ? "#5849d0" : "white")};
  display: flex;
  justify-content: center;
  margin: 5%;
  align-items: center;
  border-radius: 50px;
  padding: 3% 5%;
  border: 1px solid #dddddd;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

interface TargetProps {
  curCenter: { lat: number; lng: number };
  position: GongguLocation[];
  menuClicked: number;
}

export default function Target(props: TargetProps) {
  const [isEqual, setIsEqual] = useState<boolean>(false);
  // 한 눈에 보기 시 지도 중심
  const [allCenter, setAllCenter] = useState<{ lat: number; lng: number }>();

  const map = useMap();
  // 좌표 배열
  const [points, setPoints] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    const position: { lat: number; lng: number }[] = props.position.map(
      (item) => ({
        lat: item.latitude,
        lng: item.longitude,
      })
    );
    setPoints(position);
  }, [props.position]);

  const bounds = useMemo(() => {
    if (points.length === 0) return null;

    const bounds = new kakao.maps.LatLngBounds();

    points.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [points]);

  const ReSettingMapBounds = () => {
    if (!map) {
      return;
    } else if (!bounds) {
      alert("등록된 공구가 없습니다.");
      return;
    }

    map.setBounds(bounds);
    // 한눈에 보기 시 지도 중심 구하기
    const latlng = map.getCenter();
    setAllCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
  };

  useEffect(() => {
    if (allCenter !== undefined) {
      if (
        allCenter.lat === props.curCenter.lat &&
        allCenter.lng === props.curCenter.lng
      ) {
        setIsEqual(true);
      } else {
        setIsEqual(false);
      }
    }
  }, [allCenter, props.curCenter]);

  useEffect(() => {
    setIsEqual(false);
  }, [props.menuClicked]);

  return (
    <Wrap $isEqual={isEqual} onClick={ReSettingMapBounds}>
      <Text
        fontSize="20px"
        fontFamily="DunggeunmisoBold"
        color={isEqual ? "white" : "#5849d0"}
      >
        한눈에 보기
      </Text>
    </Wrap>
  );
}
