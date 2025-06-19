import styled from "styled-components";
import MenuButton from "./MenuButton";
import moongchi from "../../../assets/images/moongchies/AI뭉치_테두리.png";
import fresh from "../../../assets/images/gonggu/신선식품.png";
import processed from "../../../assets/images/gonggu/가공식품.png";
import dailyLife from "../../../assets/images/gonggu/생활용품.png";
import kitchen from "../../../assets/images/gonggu/주방용품.png";

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 2%;
  gap: 5%;
`;

type Product = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string | null;
};

interface MenuProps {
  menuClicked: number;
  setMenuClicked: (value: number) => void;
  setHasMore: (value: boolean) => void;
  setProducts: (value: Product[]) => void;
}

export default function GongguMenu(props: MenuProps) {
  const menuClicked = props.menuClicked;
  const setMenuClicked = props.setMenuClicked;
  const setHasMore = props.setHasMore;
  const setProducts = props.setProducts;
  const menuOrder = [-0, 1, 2, 3, 4];

  const clickMenu = (number: number) => {
    setMenuClicked(number);
    setHasMore(true);
    setProducts([]);
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
        src={fresh}
        text="신선식품"
        onClick={() => clickMenu(menuOrder[1])}
        clicked={menuClicked === menuOrder[1]}
      ></MenuButton>
      <MenuButton
        src={processed}
        text="가공식품"
        onClick={() => clickMenu(menuOrder[2])}
        clicked={menuClicked === menuOrder[2]}
      ></MenuButton>
      <MenuButton
        src={kitchen}
        text="주방용품"
        onClick={() => clickMenu(menuOrder[3])}
        clicked={menuClicked === menuOrder[3]}
      ></MenuButton>
      <MenuButton
        src={dailyLife}
        text="생활용품"
        onClick={() => clickMenu(menuOrder[4])}
        clicked={menuClicked === menuOrder[4]}
      ></MenuButton>
    </Menu>
  );
}
