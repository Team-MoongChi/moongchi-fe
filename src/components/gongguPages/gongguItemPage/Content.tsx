import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import { useCalDay } from "../../../useTimeStamp";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";

import scoreImg from "../../../assets/images/userScore/리더하트25.png";
import scoreImg2 from "../../../assets/images/userScore/리더하트50.png";
import scoreImg3 from "../../../assets/images/userScore/리더하트75.png";
import scoreImg4 from "../../../assets/images/userScore/리더하트100.png";

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
  const MannerImg = () => {
    const score = Math.floor(props.participants[0].mannerLeader);

    if (score <= 25) {
      return <Img src={scoreImg} width="30px" height="30px"></Img>;
    } else if (score <= 50) {
      return <Img src={scoreImg2} width="30px" height="30px"></Img>;
    } else if (score <= 75) {
      return <Img src={scoreImg3} width="30px" height="30px"></Img>;
    } else {
      return <Img src={scoreImg4} width="30px" height="30px"></Img>;
    }
  };

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
            인당 {(props.price / props.totalUsers).toLocaleString()}원
          </Text>
        </TitleContent>
        <TitleFooter>
          <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff4242">
            {useCalDay(props.deadline)} 마감까지{" "}
            {props.totalUsers - props.currentUsers}명 남았어요!
          </Text>
          <ParticipantsProfile
            totalUser={props.totalUsers}
            currentUsers={props.currentUsers}
            participants={props.participants}
          ></ParticipantsProfile>
        </TitleFooter>
      </Title>
      <Body>
        <BodyHeader>
          <UserProfile>
            <Img
              src={props.participants[0].profileUrl}
              width="40px"
              height="40px"
              $borderradious="50%"
            ></Img>
            <Text fontSize="20px">손하은</Text>
          </UserProfile>
          <UserScore>
            <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff6f6f">
              {Math.floor(props.participants[0].mannerLeader)}%
            </Text>
            {MannerImg()}
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
