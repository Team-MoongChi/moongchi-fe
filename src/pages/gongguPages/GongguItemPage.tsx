import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useEffect, useState } from "react";

import Header from "../../components/gongguPages/gongguItemPage/Header";
import ImageSlide from "../../components/gongguPages/gongguItemPage/ImageSlide";
import Footer from "../../components/gongguPages/gongguItemPage/Footer";
import Content from "../../components/gongguPages/gongguItemPage/Content";

import type { GongguItem } from "../../types/gongguPage/gongguItem";
import { useParams } from "react-router-dom";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function GongguItemPage() {
  const { small } = useDeviceSize();

  const [gongguItem, setGongguItem] = useState<GongguItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const { gongguId } = useParams();

  const fetchGongguItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/group-boards/${gongguId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNzQ5MDQzNjI2LCJleHAiOjE3NDk2NDg0MjZ9.8EpX-Wg_rkeTzPCKgDclgHjommxD-z6Kxu8Y6etLKc8",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GongguItem = await response.json();
      console.log(data);
      setGongguItem(data);
      setLoading(false);
    } catch (error) {
      console.error("get failed: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchGongguItem();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Wrap isSmall={small}>
      <Header />
      <ImageSlide />
      <Content {...gongguItem}></Content>
      <Footer />
    </Wrap>
  );
}
