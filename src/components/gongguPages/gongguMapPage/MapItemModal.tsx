import styled from "styled-components";
import { useState, useEffect } from "react";
import type { GongguMapItem } from "../../../types/gongguPages/gongguMapItem";
import { useMap } from "react-kakao-maps-sdk";
import GongguListItem from "../common/GongguListItem";

const Wrap = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  max-height: 50%;
  padding: 6% 0;
  background-color: white;
  border-radius: 30px 30px 0 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px -3px 8px;
  transition: transform 0.5s ease;
  transform: translateY(${(props) => (props.$isVisible ? "0%" : "100%")});
  z-index: 1;
`;

const Body = styled.div`
  height: auto;
  padding: 0 5%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ModalProps {
  markerClicked: number;
  setMarkerClicked: (value: number) => void;
  menuClicked: number;
  mapItemList: GongguMapItem[];
  mapItem: GongguMapItem;
}

export default function MapItemModal(props: ModalProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isMarkerOpen, setIsMarkerOpen] = useState<boolean>(false);

  const [selectedMarkerItem, setSelectedMarkerItem] = useState<GongguMapItem>({
    id: 0,
    title: "",
    price: 0,
    location: "",
    boardStatus: "OPEN",
    totalUsers: 0,
    currentUsers: 0,
    createAt: "",
    image: "",
    largeCategoryId: 0,
    latitude: 0,
    longitude: 0,
    participants: [],
  });

  const map = useMap();
  useEffect(() => {
    const handleClickMap = () => {
      props.setMarkerClicked(-1);
      if (isCategoryOpen) {
        // 카테고리 모달 -> 지도 클릭한 경우 : 카테고리, 마커 둘다 안보이게
        console.log("카테고리 모달 -> 지도 클릭");
        setIsCategoryOpen(false);
        setIsMarkerOpen(false);
        return;
      }
      if (isMarkerOpen) {
        // 마커 모달 -> 지도 클릭한 경우 : 카테고리만 보이게
        console.log("마커 모달 -> 지도 클릭");

        setIsMarkerOpen(false);
        setTimeout(() => {
          setIsCategoryOpen(true);
        }, 500);
        return;
      }
    };

    kakao.maps.event.addListener(map, "click", handleClickMap);
    return () => kakao.maps.event.removeListener(map, "click", handleClickMap);
  }, [map]);

  useEffect(() => {
    console.log("마커 선택 변경: ", props.markerClicked);

    // 마커가 선택된 경우
    if (props.markerClicked !== -1) {
      // 카테고리 모달 -> 마커 선택
      if (isCategoryOpen) {
        setIsCategoryOpen(false);
        setTimeout(() => {
          setSelectedMarkerItem(props.mapItem);
          setIsMarkerOpen(true);
        }, 500);
        return;
      }
      // 마커 모달 -> 마커 선택
      if (isMarkerOpen) {
        setIsMarkerOpen(false);
        setTimeout(() => {
          setSelectedMarkerItem(props.mapItem);
          setIsMarkerOpen(true);
        }, 500);
        return;
      }
      // 아무것도 안 떠있을 때 -> 마커 선택
      setSelectedMarkerItem(props.mapItem);
      setIsMarkerOpen(true);
    }
  }, [props.markerClicked]);

  useEffect(() => {
    console.log("카테고리 선택 변경: ", props.menuClicked);
    props.setMarkerClicked(-1);

    // 마커 모달 -> 카테고리 선택
    if (isMarkerOpen) {
      setIsMarkerOpen(false);
      setTimeout(() => {
        // setSelectedCategoryItem(props.mapItemList);
        setIsCategoryOpen(true);
      }, 500);
      return;
    }
    // 카테고리 모달 -> 카테고리 선택
    if (isCategoryOpen) {
      setIsCategoryOpen(false);
      setTimeout(() => {
        setIsCategoryOpen(true);
      }, 1000);
      return;
    }
    // 아무것도 안 떠있을 때 -> 카테고리 선택
    // setSelectedCategoryItem(props.mapItemList);
    setIsCategoryOpen(true);
  }, [props.menuClicked]);

  useEffect(() => {
    console.log("isMarkerOpen", isMarkerOpen);
  }, [isMarkerOpen]);
  useEffect(() => {
    console.log("isCategoryOpen", isCategoryOpen);
  }, [isCategoryOpen]);

  return props.markerClicked === -1 ? (
    <Wrap $isVisible={isCategoryOpen}>
      <Body>
        {props.mapItemList.map((item, idx) => (
          <GongguListItem key={idx} {...item} />
        ))}
      </Body>
    </Wrap>
  ) : (
    <Wrap $isVisible={isMarkerOpen}>
      <Body>
        {selectedMarkerItem && <GongguListItem {...selectedMarkerItem} />}
      </Body>
    </Wrap>
  );
}
