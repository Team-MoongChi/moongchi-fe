import styled from "styled-components";
import MenuButton from "./MenuButton";

import all from "../../../assets/images/gonggu/allClicked.png";
import fresh from "../../../assets/images/gonggu/신선식품.png";
import processed from "../../../assets/images/gonggu/가공식품.png";
import dailyLife from "../../../assets/images/gonggu/생활용품.png";
import kitchen from "../../../assets/images/gonggu/주방용품.png";

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface MenuProps {
  menuClicked: number;
  setMenuClicked: (value: number) => void;
}

export default function GongguMenu(props: MenuProps) {
  const menuClicked = props.menuClicked;
  const setMenuClicked = props.setMenuClicked;
  const menuOrder = [0, 1, 2, 3, 4];

  const clickMenu = (number: number) => {
    setMenuClicked(number);
  };

  return (
    <Menu>
      <MenuButton
        src={all}
        text="전체"
        onClick={() => clickMenu(0)}
        clicked={menuClicked === menuOrder[0]}
      ></MenuButton>
      <MenuButton
        src={fresh}
        text="신선식품"
        onClick={() => clickMenu(1)}
        clicked={menuClicked === menuOrder[1]}
      ></MenuButton>
      <MenuButton
        src={processed}
        text="가공식품"
        onClick={() => clickMenu(2)}
        clicked={menuClicked === menuOrder[2]}
      ></MenuButton>
      <MenuButton
        src={kitchen}
        text="주방용품"
        onClick={() => clickMenu(3)}
        clicked={menuClicked === menuOrder[3]}
      ></MenuButton>
      <MenuButton
        src={dailyLife}
        text="생활용품"
        onClick={() => clickMenu(4)}
        clicked={menuClicked === menuOrder[4]}
      ></MenuButton>
    </Menu>
  );
}
