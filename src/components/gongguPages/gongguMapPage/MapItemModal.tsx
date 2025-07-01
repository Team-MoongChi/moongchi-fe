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
  padding: 5% 0 2% 0;
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
  // true: 모달 오픈, false: 모달 클로즈
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // true: 카테고리, false: 마커
  const [isCategory, setIsCategory] = useState<boolean>(true);

  const [localMapItemList, setLocalMapItemList] = useState(props.mapItemList);
  const [localMapItem, setLocalMapItem] = useState(props.mapItem);

  useEffect(() => {
    if (isOpen) {
      setLocalMapItemList(props.mapItemList);
      setTimeout(() => setLocalMapItem(props.mapItem), 500);
    }
  }, [isOpen, props.mapItemList, props.mapItem]);

  const map = useMap();

  // 카테고리 / 마커의 클릭 상태 구분
  useEffect(() => {
    if (props.markerClicked === -1) {
      setTimeout(() => setIsCategory(true), 500);
    } else {
      if (!isOpen) {
        setIsCategory(false);
        return;
      }
      setTimeout(() => setIsCategory(false), 500);
    }
  }, [props.markerClicked, props.menuClicked]);

  // 지도에 onClick 이벤트 추가
  useEffect(() => {
    const handleClickMap = () => {
      if (!isCategory) {
        props.setMarkerClicked(-1);
      } else {
        setIsOpen(false);
        props.setMarkerClicked(-1);
      }
    };

    kakao.maps.event.addListener(map, "click", handleClickMap);
    return () => kakao.maps.event.removeListener(map, "click", handleClickMap);
  }, [map]);

  useEffect(() => {
    // 모달창 내려가있을 때
    if (!isOpen) {
      if (!isCategory && props.markerClicked === -1) {
        setIsOpen(false);
        return;
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 500);
    }
  }, [props.markerClicked, props.menuClicked]);

  // 카테고리와 마커 간의 이동은 잘 됨
  // 카테고리-카테고리 & 마커-마커 간의 이동 시 데이터 업데이트..? 500초씩 늦게 하는 거 필요
  if (props.mapItemList.length === 0) {
    return null;
  } else {
    return (
      <Wrap $isVisible={isOpen}>
        <Body>
          {/* 카테고리일 때 카테고리 목록, 마커일 때 해당 아이템 렌더링 */}
          {isCategory ? (
            localMapItemList.map((item, idx) => (
              <GongguListItem key={idx} {...item} />
            ))
          ) : (
            <GongguListItem {...localMapItem} />
          )}
        </Body>
      </Wrap>
    );
  }
}
