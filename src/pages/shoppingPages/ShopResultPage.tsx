import styled from "styled-components";
import Header from "../../components/shoppingPages/ShopResultPage/Header.tsx";
import Main from "../../components/shoppingPages/ShopResultPage/Main.tsx";
import Nav from "../../components/shoppingPages/ShopResultPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  min-height: 80vh;
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

const ShopResultPage = () => {
  const { small } = useDeviceSize();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") ?? "";

  const [result, setResult] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
        userId: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 실패");
        }
        return response.json();
      })
      .then((result) => {
        console.log("POST 성공:", result);
        console.log(result);
        setResult(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper $isSmall={small}>
      <Header keyword={keyword} />
      <Main results={result} />
      <Nav />
    </Wrapper>
  );
};

export default ShopResultPage;
