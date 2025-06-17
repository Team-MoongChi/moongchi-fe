import styled from "styled-components";
import { useState, useEffect } from "react";

import { fetchWithAuth } from "../../../utils/FetchWithAuth";
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
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    fetchWithAuth(`/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`get failed: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setLocation(result.address);
        setLoading(false);
      })
      .catch((error) => {
        console.error("get failed: ", error);
      });
  }, [location]);

  return (
    <Header>
      <HeaderTop>
        <PlaceWrap>
          <Img src={placeMarker} width="clamp(20px, 2vw, 23px)"></Img>
          <Text fontSize="clamp(20px, 2vw, 23px)">
            {loading ? "loading..." : location}
          </Text>
        </PlaceWrap>
        <Img src={alarm} width="clamp(22px, 2vw, 25px)"></Img>
      </HeaderTop>
      <HeaderSearch></HeaderSearch>
    </Header>
  );
}
