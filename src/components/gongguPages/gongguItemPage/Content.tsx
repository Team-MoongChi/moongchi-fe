import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";

import scoreImg from "../../../assets/images/userScore/리더하트50.png";

import type { GongguPost } from "../../../types/gongguPage/gongguPost";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  gap: 15px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 2px solid #e8edff;
`;
const Tag = styled.img`
  src: ${(props) => props.src};
  width: 80px;
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TitleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Place = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Map = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  background-color: #d0d0d0;
`;

export default function Content(props: GongguPost) {
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
        <TitleContent>
          <Text fontSize="24px">{props.title}</Text>
          <Text fontSize="19px" fontFamily="DunggeunmisoBold">
            인당 {props.price}원
          </Text>
        </TitleContent>
        <TitleFooter>
          <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff4242">
            {props.deadline} 마감까지 {props.totalUsers - props.currentUsers}명
            남았어요!
          </Text>
          <ParticipantsProfile
            totalUser={props.totalUsers}
            currentUsers={props.currentUsers}
          ></ParticipantsProfile>
        </TitleFooter>
      </Title>
      <Body>
        <BodyHeader>
          <UserProfile>
            <Img
              src={props.participants.profileUrl}
              width="40px"
              height="40px"
              borderRadious="50%"
              border="1px solid"
            ></Img>
            <Text fontSize="20px">유지원</Text>
          </UserProfile>
          <UserScore>
            <ScoreText>50%</ScoreText>
            <ScoreImg src={scoreImg}></ScoreImg>
          </UserScore>
        </BodyHeader>

        <Text fontSize="15px">{props.content}</Text>

        <MapWrap>
          <Place>
            <Text fontSize="16px" fontFamily="DunggeunmisoBold">
              거래 장소
            </Text>
            <Text fontSize="16px">{props.location}</Text>
          </Place>
          <Map></Map>
        </MapWrap>
      </Body>
    </Wrap>
  );
}
