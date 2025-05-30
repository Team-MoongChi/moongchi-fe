import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";

import GongguListItem from "../../components/gongguPage/common/GongguListItem";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  /* height: 100%; */
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 헤더 - 검색바
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  padding: 15px 15px 20px 15px;
  gap: 10px;
`;
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`;
const HeaderSearch = styled.input`
  border-radius: 25px;
  border: none;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;

// 메뉴
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;
const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  font-size: 12px;
`;
const MenuButton = styled.div`
  background-color: #5849d0;
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 1/1;
`;

// 뭉치 추천 공구
const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;
const RecTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const RecList = styled.div`
  width: 100%;
  height: 180px;
  background-color: #e8edff;
  border-radius: 6px;
`;

// 공구 리스트
const GongguList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 10px;
`;
const GongguTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

// 하단 내비바
const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #e8edff;
  padding: 30px;
`;

export default function GongguMainPage() {
  const { small, large } = useDeviceSize();

  return (
    <Wrap isSmall={small}>
      <Header>
        <HeaderTop>
          <div>☆ 사랑시 행복동</div>
          <div>♤</div>
        </HeaderTop>
        <HeaderSearch></HeaderSearch>
      </Header>

      <Menu>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>전체</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>신선식품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>가공식품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>생활용품</div>
        </MenuItem>
        <MenuItem>
          <MenuButton></MenuButton>
          <div>주방용품</div>
        </MenuItem>
      </Menu>

      <Recommend>
        <RecTitle>뭉치's PICK</RecTitle>
        <RecList></RecList>
      </Recommend>

      <GongguList>
        <GongguTitle>근처에서 열린 공구</GongguTitle>
        <GongguListItem></GongguListItem>
        <GongguListItem></GongguListItem>
        <GongguListItem></GongguListItem>
        <GongguListItem></GongguListItem>
      </GongguList>

      <NavBar>
        <div>홈</div>
        <div>채팅</div>
        <div>쇼핑</div>
        <div>마이페이지</div>
      </NavBar>
    </Wrap>
  );
}
