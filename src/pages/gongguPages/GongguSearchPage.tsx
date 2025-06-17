import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useDeviceSize from "../../useDeviceSize";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import GongguSearchBar from "../../components/gongguPages/gongguMainPage/GongguSearchBar";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";
import { Wrap } from "../../components/common/styled-component/Wrap";
import type { GongguItem } from "../../types/gongguPages/gongguItem";
import GongguEmpty from "../../components/gongguPages/gongguMainPage/GongguEmpty";

const Body = styled.div`
  padding: 3% 5%;
  background-color: white;
`;

export default function GongguSearchPage() {
  const { small } = useDeviceSize();

  const [result, setResult] = useState<GongguItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  console.log(keyword);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    fetchWithAuth(`/api/group-boards/search?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 실패");
        }
        return response.json();
      })
      .then((result) => {
        console.log("result:", result);
        setResult(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("get failed:", error);
      });
  }, [keyword]);

  if (loading) return <div>loading...</div>;
  return (
    <Wrap $issmall={small}>
      <GongguSearchBar />
      <Body>
        {result.length === 0 ? (
          <GongguEmpty height="80vh" />
        ) : (
          result.map((item, idx) => <GongguListItem key={idx} {...item} />)
        )}
      </Body>
    </Wrap>
  );
}
