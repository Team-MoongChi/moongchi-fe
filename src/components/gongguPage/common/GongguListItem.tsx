import styled from "styled-components";

import { useState } from "react";
import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";

const Wrap = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
  gap: 10px;
`;

const Img = styled.div`
  width: 140px;
  background-color: aliceblue;
  border-radius: 6px;
  aspect-ratio: 1/1;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Tag = styled.img`
  src: ${(props) => props.src};
  width: 80px;
`;

const People = styled.div`
  display: flex;
  gap: 20%;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function GongguListItem() {
  const [gongguState, setGongguState] = useState<number>(1);

  return (
    <Wrap>
      <Img>사진</Img>
      <Content>
        <Tag src={gongguState == 1 ? red : blue}></Tag>
        <div>제목</div>
        <div>0원</div>
        <People>
          <div>사람사람사람</div>
          <div>☆ 3/4</div>
        </People>
        <Details>
          <div>장가은 집 근처</div>
          <div>1초 전</div>
        </Details>
      </Content>
    </Wrap>
  );
}
