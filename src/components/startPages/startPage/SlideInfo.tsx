import styled from "styled-components";
import { useState, useEffect } from "react";
import logo from "../../../assets/images/start/로그인_로고2.gif";
import info1 from "../../../assets/images/start/안내1_2.gif";
import info2 from "../../../assets/images/start/안내2_2.gif";
import info3 from "../../../assets/images/start/안내3_2.gif";

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 70px;
  margin-bottom: 6px;
  height: 73%;
`;

const Slide = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.$index * 100}%);
`;

const SlideItem = styled.img`
  min-width: 100%;
  object-fit: cover;
`;
const Steps = styled.button`
  display: flex;
  justify-content: center;
  gap: 11px;
`;
const Step = styled.div<{ $num: number; $index: number }>`
  background-color: ${(props) =>
    props.$num === props.$index ? "#5849D0" : "#e8edff"};
  width: 13px;
  height: 13px;
  border-radius: 50px;
`;

const images: Array<string> = [logo, info1, info2, info3];

const SlideInfo = () => {
  const [index, setIndex] = useState<number>(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 3초마다 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderWrapper>
      <Slide $index={index}>
        {images.map((src, i) => (
          <SlideItem key={i} src={src} alt={`slide-${i}`} />
        ))}
      </Slide>
      <Steps>
        <Step $num={0} $index={index} onClick={() => setIndex(0)} />
        <Step $num={1} $index={index} onClick={() => setIndex(1)} />
        <Step $num={2} $index={index} onClick={() => setIndex(2)} />
        <Step $num={3} $index={index} onClick={() => setIndex(3)} />
      </Steps>
    </SliderWrapper>
  );
};

export default SlideInfo;
