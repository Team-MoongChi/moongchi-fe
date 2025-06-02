import styled from "styled-components";

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

export default function GongguSearchBar() {
    return (
      <Header>
        <HeaderTop>
          <div>☆ 사랑시 행복동</div>
          <div>♤</div>
        </HeaderTop>
        <HeaderSearch></HeaderSearch>
      </Header>
    );
}