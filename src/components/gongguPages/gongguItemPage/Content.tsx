import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import useCalDay from "../../../hooks/useCalDay";

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

import Profile from "../../gongguPages/gongguItemPage/Profile";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  gap: 15px;
  padding-bottom: 15vh;
  justify-content: center;
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
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
const Title = styled(Text)`
  line-height: 1.2;
`;
const Highlight = styled.span`
  font-size: 15px;
  font-family: inherit;
  color: #5849d0;
`;
const TitleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
`;
const UserScore = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin-bottom: 40px;
  margin-top: 15px;
`;
const Sentence = styled(Text)`
  line-height: 1.2;
  width: 100%;
  overflow-wrap: break-word;
`;

const MapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Place = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Location = styled(Text)`
  max-width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ProfileWrapper = styled.div<{ $isOpen: boolean; $height: number }>`
  max-width: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: ${({ $isOpen, $height }) => ($isOpen ? `${$height}px` : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-20px)"};
  transition: all 0.5s ease;
  margin-top: 5px;
  padding-left: 30px;
`;

export default function Content(props: GongguPost) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const calDay = useCalDay(props.deadline);

  return (
    <Wrap>
      <Header>
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
          width="90px"
        ></Img>
        <TitleContent>
          <Title fontSize="24px">{props.title}</Title>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold">
            {props.price.toLocaleString()}원{" "}
            <Highlight>
              (인당 {(props.price / props.totalUser).toLocaleString()}원)
            </Highlight>
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
      </Header>
      <Body>
        <BodyHeader>
          <UserProfile onClick={() => setIsOpen(!isOpen)}>
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
        {isOpen && (
          <ProfileWrapper $isOpen={isOpen} $height={height}>
            <div ref={contentRef} style={{ width: "100%" }}>
              <Profile readerId={props.participants[0].userId} />
            </div>
          </ProfileWrapper>
        )}
        <ContentWrap>
          {props.content.split("\n").map((sentence, idx) => (
            <Sentence key={idx} fontSize="16px">
              {sentence}
            </Sentence>
          ))}
        </ContentWrap>

        <MapWrap>
          <Place>
            <Text fontSize="17px" fontFamily="DunggeunmisoBold">
              거래 장소
            </Text>
            <Location fontSize="16px">{props.location}</Location>
          </Place>
          <TradeSpace location={props.location} />
        </MapWrap>
      </Body>
    </Wrap>
  );
}
