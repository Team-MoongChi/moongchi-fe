import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopItemPage/Header.tsx";
import Nav from "../../components/shoppingPages/ShopItemPage/Nav.tsx";
import Main from "../../components/shoppingPages/ShopItemPage/Main.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useState, useEffect } from "react";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
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

const ShopItemPage = () => {
  const { small, large } = useDeviceSize();

  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get("itemId") ?? "";

  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${itemId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setItem(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper $isSmall={small}>
      <Header />
      <Main item={item} />
      <Nav link={item?.productUrl} />
    </Wrapper>
  );
};

export default ShopItemPage;
