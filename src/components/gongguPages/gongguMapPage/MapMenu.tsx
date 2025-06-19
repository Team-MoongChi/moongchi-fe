import styled from "styled-components";
import MapMenuButton from "./MapMenuButton";

const Menu = styled.div`
  display: flex;
  box-sizing: border-box;
  border-radius: 10px;
  margin: 3% 5%;
  overflow: scroll;
  width: 90%;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }

  position: absolute;
  z-index: 2;
`;

interface MenuProps {
  menuClicked: number;
  setMenuClicked: (value: number) => void;
  setMarkerClicked: (value: number) => void;
}

export default function MapMenu(props: MenuProps) {
  const menuClicked = props.menuClicked;
  const setMenuClicked = props.setMenuClicked;
  const menuOrder = [0, 1, 2, 3, 4];

  const clickMenu = (number: number) => {
    setMenuClicked(number);
    props.setMarkerClicked(-1); // 마커 클릭 초기화
  };

  return (
    <Menu>
      <MapMenuButton
        text="전체"
        onClick={() => clickMenu(0)}
        clicked={menuClicked === menuOrder[0]}
      ></MapMenuButton>
      <MapMenuButton
        text="신선식품"
        onClick={() => clickMenu(1)}
        clicked={menuClicked === menuOrder[1]}
      ></MapMenuButton>
      <MapMenuButton
        text="가공식품"
        onClick={() => clickMenu(2)}
        clicked={menuClicked === menuOrder[2]}
      ></MapMenuButton>
      <MapMenuButton
        text="주방용품"
        onClick={() => clickMenu(3)}
        clicked={menuClicked === menuOrder[3]}
      ></MapMenuButton>
      <MapMenuButton
        text="생활용품"
        onClick={() => clickMenu(4)}
        clicked={menuClicked === menuOrder[4]}
      ></MapMenuButton>
    </Menu>
  );
}
