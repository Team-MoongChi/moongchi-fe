import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import { useCalDay } from "../../../hooks/useTimeStamp";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";

import scoreImg from "../../../assets/images/userScore/리더하트25.png";
import scoreImg2 from "../../../assets/images/userScore/리더하트50.png";
import scoreImg3 from "../../../assets/images/userScore/리더하트75.png";
import scoreImg4 from "../../../assets/images/userScore/리더하트100.png";

import type { GongguPost } from "../../../types/gongguPages/gongguPost";
import TradeSpace from "./TradeSpace";
import GotoShop from "./GotoShop";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  gap: 15px;
  padding-bottom: 15vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 2px solid #e8edff;
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

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
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

  const calDay = useCalDay(props.deadline);

  return (
    <Wrap>
      <Title>
        <Img
          src={
            props.boardStatus === "CLOSING_SOON"
              ? red
              : props.boardStatus === "OPEN"
              ? blue
              : props.boardStatus === "CLOSED"
              ? gray
              : green
          }
          width="70px"
        ></Img>
        <TitleContent>
          <Text fontSize="24px">{props.title}</Text>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold">
            인당 {(props.price / props.totalUser).toLocaleString()}원
          </Text>
        </TitleContent>
        <TitleFooter>
          {props.boardStatus === "OPEN" ||
          props.boardStatus === "CLOSING_SOON" ? (
            <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff4242">
              {calDay} 마감까지 {props.totalUser - props.currentUsers}명
              남았어요!
            </Text>
          ) : (
            <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff4242">
              마감된 공구입니다.
            </Text>
          )}
          <ParticipantsProfile
            totalUser={props.totalUser}
            currentUsers={props.currentUsers}
            participants={props.participants}
          ></ParticipantsProfile>
        </TitleFooter>
        {props.productId ? (
          <GotoShop
            productUrl={`/shopping/item?itemId=${props.productId}`}
            productImage={props.images[0]}
            name={props.productName}
            price={props.productPrice}
          />
        ) : null}
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
            <Text fontSize="20px">{props.participants[0].nickname}</Text>
          </UserProfile>
          <UserScore>
            <Text fontSize="13px" fontFamily="DunggeunmisoBold" color="#ff6f6f">
              {Math.floor(props.participants[0].mannerLeader)}%
            </Text>
            {MannerImg()}
          </UserScore>
        </BodyHeader>

        <ContentWrap>
          {props.content.split("\n").map((sentence, idx) => (
            <Text key={idx} fontSize="16px">
              {sentence}
            </Text>
          ))}
        </ContentWrap>

        <MapWrap>
          <Place>
            <Text fontSize="17px" fontFamily="DunggeunmisoBold">
              거래 장소
            </Text>
            <Text fontSize="16px">{props.location}</Text>
          </Place>
          <TradeSpace location={props.location} />
        </MapWrap>
      </Body>
    </Wrap>
  );
}
