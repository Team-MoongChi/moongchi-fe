import useDeviceSize from "../../useDeviceSize";
import { useLocation } from "react-router-dom";

import Header from "../../components/gongguPages/gongguWritePage/Header";
import Content from "../../components/gongguPages/gongguWritePage/Content";
import { Wrap } from "../../components/common/styled-component/Wrap";

export default function GongguWritePage() {
  const location = useLocation();
  const message = location.state?.message;
  const { small } = useDeviceSize();

  return (
    <Wrap $issmall={small} $gap="15px">
      <Header />
      <Content />
    </Wrap>
  );
}
