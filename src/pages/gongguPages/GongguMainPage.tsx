import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GongguSearchBar from "../../components/gongguPages/gongguMainPage/GongguSearchBar";
import GongguMenu from "../../components/gongguPages/gongguMainPage/GongguMenu";
import GongguRecommend from "../../components/gongguPages/gongguMainPage/GongguRecommend";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import writeIcon from "../../assets/images/common/공구생성아이콘.png";

import type { ProductList } from "../../components/gongguPages/common/GongguListItem";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 공구 리스트
const GongguList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
  padding-bottom: 10vh;
`;
const GongguTitle = styled.div`
  font-family: Hakgyoansim-Bold;
  font-size: 20px;
  color: #5849d0;
`;

// 하단 내비바
const NavBar = styled.div<{ isSmall: boolean }>`
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #e8edff;
  padding: 30px;
`;

// 글쓰기아이콘
const WriteIcon = styled.img.attrs({
  src: writeIcon,
  alt: "글쓰기 아이콘",
})`
  position: fixed;
  bottom: 6em;
  right: 1em;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

// dummyData
const dummyProducts: ProductList = [
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "제주 감귤",
    totalPrice: 30000,
    totalUsers: 6,
    userCount: 3,
    address: "서울시 강남구",
    createAt: "2025-05-27T12:00:00",
    productState: "OPEN",
    participants: [
      { userId: 1, profilUrl: "https://via.placeholder.com/32" },
      { userId: 2, profilUrl: "https://via.placeholder.com/32" },
      { userId: 3, profilUrl: "https://via.placeholder.com/32" },
    ],
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "강원도 찰옥수수",
    totalPrice: 20000,
    totalUsers: 4,
    userCount: 2,
    address: "서울시 마포구",
    createAt: "2025-05-28T09:30:00",
    productState: "CLOSING_SOON",
    participants: [
      { userId: 4, profilUrl: "https://via.placeholder.com/32" },
      { userId: 5, profilUrl: "https://via.placeholder.com/32" },
    ],
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "청도 복숭아",
    totalPrice: 25000,
    totalUsers: 5,
    userCount: 5,
    address: "서울시 성동구",
    createAt: "2025-05-29T15:00:00",
    productState: "CLOSED",
    participants: [
      { userId: 6, profilUrl: "https://via.placeholder.com/32" },
      { userId: 7, profilUrl: "https://via.placeholder.com/32" },
      { userId: 8, profilUrl: "https://via.placeholder.com/32" },
      { userId: 9, profilUrl: "https://via.placeholder.com/32" },
      { userId: 10, profilUrl: "https://via.placeholder.com/32" },
    ],
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "청도 복숭아",
    totalPrice: 25000,
    totalUsers: 5,
    userCount: 5,
    address: "서울시 성동구",
    createAt: "2025-05-29T15:00:00",
    productState: "COMPLETED",
    participants: [
      { userId: 6, profilUrl: "https://via.placeholder.com/32" },
      { userId: 7, profilUrl: "https://via.placeholder.com/32" },
      { userId: 8, profilUrl: "https://via.placeholder.com/32" },
      { userId: 9, profilUrl: "https://via.placeholder.com/32" },
      { userId: 10, profilUrl: "https://via.placeholder.com/32" },
    ],
  },
];

export default function GongguMainPage() {
  const navigate = useNavigate();
  const writeGonggu = () => {
    navigate("/gonggu/write", { state: { message: "user" } });
  };
  const writeGonggu2 = () => {
    navigate("/gonggu/write", { state: { message: "shop" } });
  };
  const { small, large } = useDeviceSize();

  return (
    <Wrap isSmall={small}>
      <GongguSearchBar />
      <GongguMenu />
      <GongguRecommend />
      <GongguList>
        <GongguTitle>근처에서 열린 공구</GongguTitle>
        {dummyProducts.map((dummyProduct) => {
          return <GongguListItem {...dummyProduct}></GongguListItem>;
        })}
      </GongguList>

      <WriteIcon onClick={writeGonggu} />
      <NavBar isSmall={small}>
        {/* 나중에 onclick 삭제하기 */}
        <div onClick={writeGonggu2}>홈</div>
        <div
          onClick={() => {
            navigate("/chat/list");
          }}
        >
          채팅
        </div>
        <div>쇼핑</div>
        <div>마이페이지</div>
      </NavBar>
    </Wrap>
  );
}
