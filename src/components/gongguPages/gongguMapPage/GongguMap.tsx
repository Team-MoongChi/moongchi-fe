import { useEffect, useState } from "react";
import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";

import useKakaoMap from "../../../useKakaoMap";
import Target from "./Target";
import type { GongguLocation } from "../../../types/gongguPages/gongguLocation";

import fresh from "../../../assets/images/map/신선식품.png";
import processed from "../../../assets/images/map/가공식품.png";
import kitchen from "../../../assets/images/map/주방용품.png";
import dailyLife from "../../../assets/images/map/생활용품.png";
import clickedFresh from "../../../assets/images/map/신선식품_클릭.png";
import clickedProcessed from "../../../assets/images/map/가공식품_클릭.png";
import clickedKitchen from "../../../assets/images/map/주방용품_클릭.png";
import clickedDailyLife from "../../../assets/images/map/생활용품_클릭.png";
import type { GongguMapItem } from "../../../types/gongguPages/gongguMapItem";

interface GongguMapProps {
  mapItemList: GongguMapItem[];
  location: string;
  positionInfo: GongguLocation[];
  isClicked: number;
  setIsClicked: (value: number) => void;
  menuClicked: number;
}

export default function GongguMap(props: GongguMapProps) {
  const [loading] = useKakaoMap();

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [changedCenter, setChangedCenter] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [mapItem, setMapItem] = useState<GongguMapItem>();

  useEffect(() => {
    if (loading) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(props.location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };

        setCenter(coords);
        setChangedCenter(coords);
      }
    });
  }, [loading]);

  const selectMarker = (id: number): string => {
    if (id === 1) {
      return fresh;
    } else if (id === 2) {
      return processed;
    } else if (id === 3) {
      return kitchen;
    } else if (id === 4) {
      return dailyLife;
    } else return "";
  };
  const selectClickedMarker = (id: number): string => {
    if (id === 1) {
      return clickedFresh;
    } else if (id === 2) {
      return clickedProcessed;
    } else if (id === 3) {
      return clickedKitchen;
    } else if (id === 4) {
      return clickedDailyLife;
    } else return "";
  };

  const markerClickHandler = (id: number) => {
    props.setIsClicked(id);

    props.mapItemList.map((item) => {
      if (item.id === id) {
        setMapItem(item);
      }
    });
  };

  useEffect(() => {
    console.log("mapItem", mapItem);
  }, [mapItem]);

  return (
    <Map
      center={center}
      isPanto={true}
      level={3}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      onCenterChanged={(map) => {
        const latlng = map.getCenter();
        setChangedCenter({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
      }}
    >
      {props.positionInfo.map((item) => (
        <MapMarker
          key={item.id}
          position={{ lat: item.latitude, lng: item.longitude }}
          image={{
            src:
              props.isClicked === item.id
                ? selectClickedMarker(item.categoryId)
                : selectMarker(item.categoryId),
            size:
              props.isClicked === item.id
                ? selectClickedMarker(item.categoryId) === clickedKitchen
                  ? { width: 95, height: 80 }
                  : { width: 80, height: 80 }
                : selectMarker(item.categoryId) === kitchen
                ? { width: 60, height: 50 }
                : { width: 60, height: 60 },
          }}
          onClick={() => markerClickHandler(item.id)}
        ></MapMarker>
      ))}
      <Circle center={center} radius={750}></Circle>
      <Target
        curCenter={changedCenter}
        position={props.positionInfo}
        menuClicked={props.menuClicked}
      />
    </Map>
  );
}
