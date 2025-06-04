import React, { useState, useEffect } from "react";
import styled from "styled-components";
import banner1 from "../../../assets/images/common/banner1.png";
import bannerButtonLeft from "../../../assets/images/common/배너버튼_왼.png";
import bannerButtonRight from "../../../assets/images/common/배너버튼_오.png";

const images = [banner1, banner1, banner1];

const Wrapper = styled.div`
  padding-top: 4%;
  width: 100%;
  padding-bottom: 0;
  background-color: white;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.index * 100}%);
`;

const SlideItem = styled.img`
  min-width: 100%;
  object-fit: cover;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  border: none;
  cursor: pointer;

  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}
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
  align-items: center;
  flex-wrap: wrap;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 3%;
  gap: 3px;
`;
const Img = styled.img`
  width: 200px;
  height: 140px;
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
const B1 = styled.img`
  object-fit: cover;
  width: 100%;
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

const products: Product[] = [
  {
    id: 1,
    name: "망고 1kg",
    price: 12000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250514_70/1747218008296jBDI8_JPEG/1772088215457593_1264953615.jpg?type=m510",
    productUrl: "https://example.com/mango",
    rating: 4.8,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "열대과일",
  },
  {
    id: 2,
    name: "파인애플 1개",
    price: 8500,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250529_189/1748527411833FB1J2_JPEG/82660252942318203_218302057.jpg?type=m510",
    productUrl: "https://example.com/pineapple",
    rating: 4.5,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "열대과일",
  },
  {
    id: 3,
    name: "블루베리 300g",
    price: 10000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250429_169/1745907950503nmg95_JPEG/21860392719796336_2035400738.jpg?type=m510",
    productUrl: "https://example.com/blueberry",
    rating: 4.6,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "베리류",
  },
  {
    id: 4,
    name: "딸기 500g",
    price: 15000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20221223_104/1671793738699k9nkM_JPEG/72929634412054637_1664728638.jpg?type=m510",
    productUrl: "https://example.com/strawberry",
    rating: 4.7,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "베리류",
  },
  {
    id: 5,
    name: "감자칩 150g",
    price: 2500,
    imgUrl:
      "https://shop-phinf.pstatic.net/20241016_254/1729033751558JH0CH_JPEG/5521059676441733_112057183.jpg?type=m510",
    productUrl: "https://example.com/chips",
    rating: 4.3,
    largeCategory: "식품",
    mediumCategory: "간식",
    smallCategory: null,
  },
  {
    id: 6,
    name: "초콜릿 바",
    price: 3000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20220408_273/1649380049208aMeQl_JPEG/56844745160287136_862583190.jpg?type=m510",
    productUrl: "https://example.com/chocolate",
    rating: 4.5,
    largeCategory: "식품",
    mediumCategory: "간식",
    smallCategory: null,
  },
  {
    id: 7,
    name: "Galaxy S21",
    price: 900000,
    imgUrl: "https://sitem.ssgcdn.com/83/42/94/item/1000587944283_i1_1200.jpg",
    productUrl: "https://example.com/galaxy_s21",
    rating: 4.7,
    largeCategory: "전자제품",
    mediumCategory: "휴대폰",
    smallCategory: "스마트폰",
  },
  {
    id: 8,
    name: "iPhone 13",
    price: 1100000,
    imgUrl:
      "https://shopping-phinf.pstatic.net/main_5364688/53646882589.20250319151833.jpg?type=f640",
    productUrl: "https://example.com/iphone_13",
    rating: 4.8,
    largeCategory: "전자제품",
    mediumCategory: "휴대폰",
    smallCategory: "스마트폰",
  },
  {
    id: 9,
    name: "LG 냉장고",
    price: 1500000,
    imgUrl:
      "https://shopping-phinf.pstatic.net/main_5362501/53625011556.20250318114739.jpg?type=f640",
    productUrl: "https://example.com/lg_fridge",
    rating: 4.5,
    largeCategory: "전자제품",
    mediumCategory: "가전",
    smallCategory: "냉장고",
  },
  {
    id: 10,
    name: "Samsung 냉장고",
    price: 1400000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250325_175/1742866211516nxIsu_JPEG/1266361458228436_1680944666.jpg?type=m510",
    productUrl: "https://example.com/samsung_fridge",
    rating: 4.6,
    largeCategory: "전자제품",
    mediumCategory: "가전",
    smallCategory: "냉장고",
  },
];

const Main = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <SliderWrapper>
        <Slide index={index}>
          {images.map((src, i) => (
            <SlideItem key={i} src={src} alt={`slide-${i}`} />
          ))}
        </Slide>
        <NavButton left onClick={prevSlide}>
          <BannerButtonImg src={bannerButtonLeft} alt="" />
        </NavButton>
        <NavButton onClick={nextSlide}>
          <BannerButtonImg src={bannerButtonRight} alt="" />
        </NavButton>
      </SliderWrapper>
      <Title>뭉치's PICK!</Title>
      <Items>
        {products.map((product) => (
          <Item key={product.id}>
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
