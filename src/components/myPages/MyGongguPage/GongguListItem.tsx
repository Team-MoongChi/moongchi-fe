import styled from "styled-components";
import { Link } from "react-router-dom";

import type { GongguItem } from "../../../types/gongguPage/gongguItem";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";

const Wrap = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
  gap: 10px;
`;

const Img = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 140px;
  border-radius: 6px;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

// /api/group-boards/{groupBoardId}

export default function GongguListItem(props: GongguItem) {
  return (
    // 링크 수정 필요
    <Link to={`/gonggu/list/${props.id}`}>
      <Wrap>
        <Img src={props.groupProduct.images}></Img>
        <Content>
          <Tag
            src={
              props.boardStatus == "CLOSING_SOON"
                ? red
                : props.boardStatus == "OPEN"
                ? blue
                : props.boardStatus == "CLOSED"
                ? gray
                : green
            }
          ></Tag>
          <div>{props.title}</div>
          <div>{props.groupProduct.price}원</div>
          {/* {product.participants.map((participants) => {

          })} */}
          <People>
            <div>사람사람사람</div>
            <div>☆ 3/4</div>
          </People>
          <Details>
            <div>{props.location}</div>
          </Details>
        </Content>
      </Wrap>
    </Link>
  );
}
