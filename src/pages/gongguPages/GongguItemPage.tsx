import useDeviceSize from "../../hooks/useDeviceSize";
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

  const isShop: boolean = gongguItem?.productName ? true : false;

  const fetchGongguItem = async () => {
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
      console.log("공구 아이템 상세 GET 요청");
    } catch (error) {
      console.error("공구 상세 get failed: ", error);
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
      <Header
        editable={gongguItem?.editable}
        isShop={isShop ? "shop" : undefined}
        imgUrl={gongguItem?.images[0]}
        title={gongguItem?.title}
        content={gongguItem?.content}
        totalUser={gongguItem?.totalUser}
        currentUsers={gongguItem?.currentUsers}
        boardStatus={gongguItem?.boardStatus}
      />
      <ImageSlide images={gongguItem?.images} />
      {gongguItem ? <Content {...gongguItem}></Content> : null}
      <Footer
        editable={gongguItem?.editable}
        chatRoomId={gongguItem?.chatRoomId}
        likeCount={gongguItem?.likeCount}
        join={gongguItem?.join}
      />
    </Wrap>
  );
}
