import styled from "styled-components";
import { useState } from "react";

import { Img } from "../../common/styled-component/Img";
import left from "../../../assets/images/gonggu/angle-square-left.png";
import right from "../../../assets/images/gonggu/angle-square-right.png";

const Wrap = styled.div`
  position: relative;
  display: flex;
`;
const SlideShow = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  background-color: aliceblue;
  overflow: hidden;
`;
const Image = styled.img.attrs<{
  src: string;
}>((props) => ({
  src: props.src,
}))<{ $curSlide: number }>`
  width: 100%;
  object-fit: cover;
  flex-shrink: 0;
  transform: translateX(${(props) => `${props.$curSlide * -100}%`});
  transition: all 0.4s ease-in-out;
`;
const LeftButton = styled(Img)`
  position: absolute;
  top: 50%;
  left: 5px;
  z-index: 1;
  cursor: pointer;
`;
const RightButton = styled(Img)`
  position: absolute;
  top: 50%;
  right: 5px;
  z-index: 1;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  background-image: linear-gradient(
    to top,
    rgba(115, 115, 115, 0.4) 0%,
    rgba(126, 126, 126, 0.3) 20%,
    rgba(172, 172, 172, 0.2) 50%,
    rgba(209, 209, 209, 0.1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: 20px;
  position: absolute;
  height: 10%;
`;

interface ImageSlideProps {
  images: string[] | undefined;
}

export default function ImageSlide(props: ImageSlideProps) {
  // const imgList = ["이미지1", "이미지2", "이미지3"];
  const imgList = props.images;
  const [curSlide, setCurSlide] = useState<number>(0);
  const FIRST_SLIDE_INDEX = 0;
  const LAST_SLIDE_INDEX = imgList ? imgList.length - 1 : 0;

  const moveToSlide = (value: string) => {
    if (value === "next") {
      setCurSlide((prev) => prev + 1);
    }
    if (value === "prev") {
      setCurSlide((prev) => prev - 1);
    }
  };

  return (
    <Wrap>
      {curSlide === FIRST_SLIDE_INDEX ? null : (
        <LeftButton
          src={left}
          width="50px"
          height="50px"
          onClick={() => moveToSlide("prev")}
        />
      )}
      <SlideShow>
        {imgList?.map((img, idx) => (
          <Image src={img} key={idx} $curSlide={curSlide}></Image>
        ))}
      </SlideShow>
      {curSlide === LAST_SLIDE_INDEX ? null : (
        <RightButton
          src={right}
          width="50px"
          height="50px"
          onClick={() => moveToSlide("next")}
        />
      )}
      <Bottom></Bottom>
    </Wrap>
  );
}
