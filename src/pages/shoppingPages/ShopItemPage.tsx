import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopItemPage/Header.tsx";
import Nav from "../../components/shoppingPages/ShopItemPage/Nav.tsx";
import Main from "../../components/shoppingPages/ShopItemPage/Main.tsx";
import useDeviceSize from "../../hooks/useDeviceSize.tsx";
import { useState, useEffect, useRef } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth.tsx";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100dvh;
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
  const itemId = queryParams.get("itemId");
  const itemRef = useRef(false);

  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    if (!itemId) return;
    if (itemRef.current) return; // 이미 호출했으면 종료

    itemRef.current = true; // 호출했음 표시
    const token = localStorage.getItem("accessToken");
    fetchWithAuth(`/api/products/${itemId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
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
      <Nav
        link={item?.productUrl}
        itemId={item?.id}
        imgUrl={item?.imgUrl}
        name={item?.name}
        category={item?.largeCategory}
        price={item?.price}
        likeCount={item?.likeCount}
      />
    </Wrapper>
  );
};

export default ShopItemPage;
