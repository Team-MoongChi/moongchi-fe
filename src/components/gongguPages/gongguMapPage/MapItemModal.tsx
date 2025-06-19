import styled from "styled-components";
import { useRef, useState, useEffect, type RefObject } from "react";
import { useMap } from "react-kakao-maps-sdk";
import type { GongguMapItem } from "../../../types/gongguPages/gongguMapItem";
import GongguListItem from "../common/GongguListItem";

const Wrap = styled.div<{ visible: boolean }>`
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
  transition: transform 1s ease;
  transform: translateY(${(props) => (props.visible ? "0%" : "100%")});
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
  anyMarkerClicked: boolean;
  markerRef: RefObject<kakao.maps.Marker>;
}

export default function MapItemModal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isMarkerOpen, setIsMarkerOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("마커 선택 변경: ", props.markerClicked);

    // // 마커가 선택된 경우
    // if (props.markerClicked !== -1) {
    //   // setIsMarkerOpen(false);
    //   if (isCategoryOpen) {
    //     setIsCategoryOpen(false);
    //   }
    //   setIsMarkerOpen(true);
    // }
    // if (props.markerClicked === -1) {
    //   // 마커가 선택되어있지 않은 경우. 그러니까 -1로 바뀐 경우.
    //   setIsCategoryOpen(false);
    // }
  }, [props.markerClicked]);

  useEffect(() => {
    console.log("카테고리 선택 변경: ", props.menuClicked);

    // if (!isCategoryOpen) {
    //   if (isMarkerOpen) {
    //     setIsMarkerOpen(false);
    //   }
    //   setIsCategoryOpen(true);
    // }
  }, [props.menuClicked]);

  useEffect(() => {
    console.log("isMarkerOpen", isMarkerOpen);
    console.log("isCategoryOpen", isCategoryOpen);
  }, [props.markerClicked, isCategoryOpen, isMarkerOpen]);

  // const map = useMap();
  // const [anyMarkerClicked, setAnyMarkerClicked] = useState<boolean>(false);
  // useEffect(() => {
  //   const clickHandler = () => {
  //     setAnyMarkerClicked(true);
  //   };
  //   const clickHandler2 = () => {
  //     setAnyMarkerClicked(false);
  //   };

  //   kakao.maps.event.addListener(props.markerRef, "click", clickHandler);
  //   if (map) {
  //     kakao.maps.event.addListener(map, "click2", clickHandler2);
  //   }

  //   console.log("마커 클릭/언클릭", anyMarkerClicked);

  //   return () => {
  //     kakao.maps.event.removeListener(props.markerRef, "click", clickHandler);
  //     if (map) {
  //       kakao.maps.event.removeListener(map, "click", clickHandler2);
  //     }
  //   };
  // }, [props.markerRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if (!props.anyMarkerClicked) {
          props.setMarkerClicked(-1);
        }
        if (isCategoryOpen) {
          setIsCategoryOpen(false);
        }
        if (isMarkerOpen) {
          setIsMarkerOpen(false);
        }
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef]);

  return (
    <Wrap
      ref={modalRef}
      visible={props.markerClicked === -1 ? isCategoryOpen : isMarkerOpen}
    >
      <Body>
        {props.markerClicked === -1 ? (
          props.mapItemList.map((item, idx) => (
            <GongguListItem key={idx} {...item} />
          ))
        ) : (
          <GongguListItem {...props.mapItem} />
        )}
      </Body>
    </Wrap>
  );
}
