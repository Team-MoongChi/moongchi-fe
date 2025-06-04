import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";

import Header from "../../components/gongguPages/gongguItemPage/Header";
import ImageSlide from "../../components/gongguPages/gongguItemPage/ImageSlide";
import Footer from "../../components/gongguPages/gongguItemPage/Footer";
import Content from "../../components/gongguPages/gongguItemPage/Content";

import type { ProductItem } from "../../components/gongguPages/gongguItemPage/Content";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const dummyProduct: ProductItem = {
  title: "공구 제목",
  content: "같이 사주세요 제발",
  author: "홍길동",
  authorProfile: "https://example.com/profile/hong.jpg",
  Price: 15000,
  totalUsers: 4,
  userCount: 3,
  address: "서울특별시 마포구 어딘가 123",
  deadline: "2025-06-01",
  place: "홍대입구역 3번 출구 앞",
  productState: "CLOSING_SOON",
  participants: [
    { userId: 1, profilUrl: "https://example.com/profile/user1.jpg" },
    { userId: 2, profilUrl: "https://example.com/profile/user2.jpg" },
    { userId: 3, profilUrl: "https://example.com/profile/user3.jpg" },
    { userId: 4, profilUrl: "https://example.com/profile/user4.jpg" },
    { userId: 5, profilUrl: "https://example.com/profile/user5.jpg" },
    { userId: 6, profilUrl: "https://example.com/profile/user6.jpg" },
  ],
};

export default function GongguItemPage() {
    const { small, large } = useDeviceSize();

    return (
        <Wrap isSmall={small}>
            <Header />
            <ImageSlide />
            <Content {...dummyProduct}></Content>
            <Footer />
        </Wrap>
    );
}