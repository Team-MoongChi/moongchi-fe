import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import placeMarker from "../../../assets/images/common/위치아이콘.png";
import alarm from "../../../assets/images/common/알람아이콘.png";
import search from "../../../assets/images/common/검색아이콘.png";
import back from "../../../assets/images/common/뒤로가기.png";

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
  cursor: pointer;
`;
const SearchWrap = styled.form`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: white;
  padding: 0 5%;
  flex: 1;
  min-width: 0;
`;
const HeaderSearch = styled.input`
  flex: 1;
  min-width: 0;
  border-radius: 25px;
  border: none;
  padding: 15px;
  font-size: clamp(18px, 2vw, 20px);
  &:focus {
    outline: none;
  }
`;

const SearchResultWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const GotoBack = styled(Img)`
  cursor: pointer;
`;
const GotoHome = styled(Text)`
  cursor: pointer;
`;

export default function GongguSearchBar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const isResult: boolean = keyword !== null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/gonggu/search?keyword=${encodeURIComponent(searchKeyword)}`);
      if (isResult) {
        window.location.reload();
      }
    }
  };

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
        <PlaceWrap
          onClick={
            loading
              ? undefined
              : () =>
                  navigate("/gonggu/map", { state: { userLocation: location } })
          }
        >
          <Img src={placeMarker} width="clamp(20px, 2vw, 23px)" />
          <Text fontSize="clamp(20px, 2vw, 23px)">
            {loading ? "loading..." : location}
          </Text>
        </PlaceWrap>
        <Img src={alarm} width="clamp(22px, 2vw, 25px)" />
      </HeaderTop>
      {isResult ? (
        <SearchResultWrap>
          <GotoBack
            src={back}
            width="clamp(15px, 2vw, 20px)"
            height="clamp(30px, 2vw, 40px)"
            onClick={() => navigate(-1)}
          />
          <SearchWrap onSubmit={onSubmit}>
            <Img
              src={search}
              width="clamp(25px, 2vw, 30px)"
              height="clamp(25px, 2vw, 30px)"
            ></Img>
            <HeaderSearch
              placeholder={keyword ? keyword : undefined}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></HeaderSearch>
          </SearchWrap>
          <GotoHome fontSize="20px" color="white" onClick={() => navigate("/")}>
            닫기
          </GotoHome>
        </SearchResultWrap>
      ) : (
        <SearchWrap onSubmit={onSubmit}>
          <Img
            src={search}
            width="clamp(25px, 2vw, 30px)"
            height="clamp(25px, 2vw, 30px)"
          ></Img>
          <HeaderSearch
            onChange={(e) => setSearchKeyword(e.target.value)}
          ></HeaderSearch>
        </SearchWrap>
      )}
    </Header>
  );
}
