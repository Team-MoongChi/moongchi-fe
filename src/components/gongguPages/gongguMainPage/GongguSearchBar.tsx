import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import placeMarker from "../../../assets/images/common/위치아이콘.png";
import alarm from "../../../assets/images/common/알람아이콘.png";

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  padding: 15px 15px 20px 15px;
  gap: 13px;
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
const HeaderSearch = styled.input`
  border-radius: 25px;
  border: none;
  padding: 15px;
  font-size: clamp(18px, 2vw, 20px);
  &:focus {
    outline: none;
  }
`;

export default function GongguSearchBar() {
  return (
    <Header>
      <HeaderTop>
        <PlaceWrap>
          <Img src={placeMarker} width="clamp(20px, 2vw, 23px)"></Img>
          <Text fontSize="clamp(20px, 2vw, 23px)">사랑시 행복동</Text>
        </PlaceWrap>
        <Img src={alarm} width="clamp(22px, 2vw, 25px)"></Img>
      </HeaderTop>
      <HeaderSearch></HeaderSearch>
    </Header>
  );
}
