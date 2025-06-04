import styled from "styled-components";

import placeMarker from "../../../assets/images/common/위치아이콘.png";

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
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
const PlaceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Img = styled.img.attrs<{ src: string }>((props) => ({
  src: props.src,
}))`
  width: clamp(15px, 2vw, 20px);
  height: clamp(15px, 2vw, 20px);
  object-fit: cover;
`;
const Place = styled.div`
  font-size: clamp(15px, 2vw, 20px);
  font-weight: bold;
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
        <PlaceWrap>
          <Img src={placeMarker}></Img>
          <Place>사랑시 행복동</Place>
        </PlaceWrap>
        <div>♤</div>
      </HeaderTop>
      <HeaderSearch></HeaderSearch>
    </Header>
  );
}
