import styled from "styled-components";
import { Link } from "react-router-dom";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png"

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

// 타입 정의
type ProductState = "OPEN" | "CLOSING_SOON" | "CLOSED" | "COMPLETED";
interface Participant {
  userId: number;
  profilUrl: string;
}
interface ProductItem {
  imgUrl: string;
  title: string;
  totalPrice: number;
  totalUsers: number;
  userCount: number;
  address: string;
  createAt: string;
  productState: ProductState;
  participants: Participant[];
}
export type ProductList = ProductItem[];

export default function GongguListItem(props: ProductItem) {
  return (
    // 링크 수정 필요
    <Link to="gonggu/list">
      <Wrap>
        <Img><img src={props.imgUrl} /></Img>
        <Content>
          <Tag src={props.productState == "CLOSING_SOON" ? red :
            (props.productState == "OPEN" ? blue:
            (props.productState == "CLOSED" ? gray: green)
            )}></Tag>
          <div>{props.title}</div>
          <div>{props.totalPrice}원</div>
          {/* {product.participants.map((participants) => {

          })} */}
          <People>
            <div>사람사람사람</div>
            <div>☆ 3/4</div>
          </People>
          <Details>
            <div>{props.address}</div>
            <div>1초 전</div>
          </Details>
        </Content>
      </Wrap>
    </Link>
  );
}
