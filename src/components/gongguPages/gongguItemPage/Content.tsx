import styled from "styled-components";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";

import userImg from "../../../assets/images/moongchies/노란뭉치.png";
import scoreImg from "../../../assets/images/userScore/리더하트50.png";

import type { GongguItem } from "../../../types/gongguPage/gongguItem";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  gap: 10px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding-bottom: 3%;
  border-bottom: 2px solid #e8edff;
`;
const Tag = styled.img`
  src: ${(props) => props.src};
  width: 80px;
`;
const TitleFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserImg = styled.img`
  src: ${(props) => props.src};
  width: 40px;
  background-color: #5849d0;
  border-radius: 50%;
`;
const UserName = styled.div`
  font-size: 20px;
`;
const UserScore = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ScoreText = styled.div`
  font-size: 13px;
  font-weight: bold;
`;
const ScoreImg = styled.img`
  src: ${(props) => props.src};
  width: 30px;
`;

const BodyContent = styled.div`
  font-size: 15px;
`;

const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Place = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  &:nth-child(1) {
    font-weight: bold;
  }
`;
const Map = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  background-color: #d0d0d0;
`;

export default function Content(props: Partial<GongguItem>) {
  return (
    // 링크 수정 필요
    <Wrap>
      <Title>
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
        <div>인 당 {props.groupProduct?.price}원</div>
        <TitleFooter>
          <div>
            {props.deadline} 마감까지{" "}
            {(props.totalUsers ?? 0) - (props.currentUsers ?? 0)}명 남았어요!
          </div>
          <div>사람사람사람</div>
        </TitleFooter>
        {/* {product.participants.map((participants) => {

          })} */}
      </Title>
      <Body>
        <BodyHeader>
          <UserProfile>
            <UserImg src={userImg}></UserImg>
            <UserName>유지원</UserName>
          </UserProfile>
          <UserScore>
            <ScoreText>50%</ScoreText>
            <ScoreImg src={scoreImg}></ScoreImg>
          </UserScore>
        </BodyHeader>
        <BodyContent>{props.content}</BodyContent>

        <MapWrap>
          <Place>
            <div>거래 장소</div>
            <div>{props.location}</div>
          </Place>
          <Map></Map>
        </MapWrap>
      </Body>
    </Wrap>
  );
}
