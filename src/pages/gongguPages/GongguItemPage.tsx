import useDeviceSize from "../../useDeviceSize";
import { useEffect, useState } from "react";

import Header from "../../components/gongguPages/gongguItemPage/Header";
import ImageSlide from "../../components/gongguPages/gongguItemPage/ImageSlide";
import Footer from "../../components/gongguPages/gongguItemPage/Footer";
import Content from "../../components/gongguPages/gongguItemPage/Content";
import { Wrap } from "../../components/common/styled-component/Wrap";

import { useParams } from "react-router-dom";
import type { GongguPost } from "../../types/gongguPages/gongguPost";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

export default function GongguItemPage() {
  const { small } = useDeviceSize();

  const [gongguItem, setGongguItem] = useState<GongguPost>();
  const [loading, setLoading] = useState<boolean>(true);

  const { gongguId } = useParams();

  const fetchGongguItem = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth(`/api/group-boards/${gongguId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GongguPost = await response.json();
      console.log(data);
      setGongguItem(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchGongguItem();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Wrap $issmall={small} $gap="15px">
      <Header />
      <ImageSlide />
      {gongguItem ? <Content {...gongguItem}></Content> : null}
      <Footer
        editable={gongguItem?.editable}
        chatRoomId={gongguItem?.chatRoomId}
      />
      ;
    </Wrap>
  );
}
