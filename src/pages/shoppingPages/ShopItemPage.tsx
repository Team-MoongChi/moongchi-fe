import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopItemPage/Header.tsx";
import Nav from "../../components/shoppingPages/ShopItemPage/Nav.tsx";
import Main from "../../components/shoppingPages/ShopItemPage/Main.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth.tsx";

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
  smallCategory: string;
  likeCount: number;
};

const ShopItemPage = () => {
  const { small } = useDeviceSize();

  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get("itemId") ?? "";

  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetchWithAuth(`/api/products/${itemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setItem(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [itemId]);

  return (
    <Wrapper $isSmall={small}>
      <Header title="상품" route={-1} />
      {item && <Main item={item} />}
      <Nav link={item?.productUrl} itemId={item?.id} />
    </Wrapper>
  );
};

export default ShopItemPage;
