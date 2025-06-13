import styled from "styled-components";
import MenuButton from "./MenuButton";

import moongchi from "../../../assets/images/moongchies/AI뭉치_테두리.png";
import all from "../../../assets/images/gonggu/allClicked.png";
import fresh from "../../../assets/images/gonggu/신선식품.png";
import processed from "../../../assets/images/gonggu/가공식품.png";
import dailyLife from "../../../assets/images/gonggu/생활용품.png";
import kitchen from "../../../assets/images/gonggu/주방용품.png";

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  gap: 2px;
`;

interface MenuProps {
  menuClicked: number;
  setMenuClicked: (value: number) => void;
}

export default function GongguMenu(props: MenuProps) {
  const menuClicked = props.menuClicked;
  const setMenuClicked = props.setMenuClicked;
  const menuOrder = [-1, 0, 1, 25, 43, 58];

  const clickMenu = (number: number) => {
    setMenuClicked(number);
  };

  return (
    <Menu>
      <MenuButton
        src={moongchi}
        text="뭉치's PICK!"
        onClick={() => clickMenu(menuOrder[0])}
        clicked={menuClicked === menuOrder[0]}
      ></MenuButton>
      <MenuButton
        src={all}
        text="전체"
        onClick={() => clickMenu(menuOrder[1])}
        clicked={menuClicked === menuOrder[1]}
      ></MenuButton>
      <MenuButton
        src={fresh}
        text="신선식품"
        onClick={() => clickMenu(menuOrder[2])}
        clicked={menuClicked === menuOrder[2]}
      ></MenuButton>
      <MenuButton
        src={processed}
        text="가공식품"
        onClick={() => clickMenu(menuOrder[3])}
        clicked={menuClicked === menuOrder[3]}
      ></MenuButton>
      <MenuButton
        src={dailyLife}
        text="생활용품"
        onClick={() => clickMenu(menuOrder[4])}
        clicked={menuClicked === menuOrder[4]}
      ></MenuButton>
      <MenuButton
        src={kitchen}
        text="주방용품"
        onClick={() => clickMenu(menuOrder[5])}
        clicked={menuClicked === menuOrder[5]}
      ></MenuButton>
    </Menu>
  );
}
