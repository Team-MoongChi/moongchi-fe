import React, { useState, useEffect } from "react";
import styled from "styled-components";
import banner1 from "../../../assets/images/common/banner1.png";
import bannerButtonLeft from "../../../assets/images/common/배너버튼_왼.png";
import bannerButtonRight from "../../../assets/images/common/배너버튼_오.png";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const images = [banner1, banner1, banner1];

const Wrapper = styled.div`
  padding-top: 4%;
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.$index * 100}%);
`;

const SlideItem = styled.img`
  min-width: 100%;
  object-fit: cover;
`;

const NavButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  border: none;
  cursor: pointer;

  ${(props) => (props.$left ? "left: 10px;" : "right: 10px;")}
`;
const BannerButtonImg = styled.img`
  width: 20px;
`;
const Title = styled.div`
  font-size: 20px;
  padding: 3%;
  padding-bottom: 0%;
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;
const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
`;
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 10px;
  gap: 3px;
`;
const Img = styled.img`
  width: 160px;
  height: 120px;
  border: none;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #eff3ff;
`;
const ItemName = styled.div`
  font-size: 15px;
`;
const Price = styled.div`
  font-size: 15px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
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

const Main = () => {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState<Array<Product>>([]);
  const navigate = useNavigate();

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleItemClick = (itemId: number) => {
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // 예: 401, 404, 500 등일 때
          throw new Error(`서버 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setProducts(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper>
      <SliderWrapper>
        <Slide $index={index}>
          {images.map((src, i) => (
            <SlideItem key={i} src={src} alt={`slide-${i}`} />
          ))}
        </Slide>
        <NavButton $left onClick={prevSlide}>
          <BannerButtonImg src={bannerButtonLeft} alt="" />
        </NavButton>
        <NavButton onClick={nextSlide}>
          <BannerButtonImg src={bannerButtonRight} alt="" />
        </NavButton>
      </SliderWrapper>
      <Title>뭉치's PICK!</Title>
      <Items>
        {products.map((product) => (
          <Item key={product.id} onClick={() => handleItemClick(product.id)}>
            <Img src={product.imgUrl}></Img>
            <ItemName>{product.name}</ItemName>
            <Price>{product.price.toLocaleString()}원</Price>
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
};

export default Main;
