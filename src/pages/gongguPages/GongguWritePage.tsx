import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useLocation } from "react-router-dom";

import Header from "../../components/gongguPages/gongguWritePage/Header";
import Content from "../../components/gongguPages/gongguWritePage/Content";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  /* height: 100%; */
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function GongguWritePage() {
  const location = useLocation();
  const message = location.state?.message;
  const { small } = useDeviceSize();

  return (
    <Wrap isSmall={small}>
      <Header />
      <Content />
    </Wrap>
  );
}
