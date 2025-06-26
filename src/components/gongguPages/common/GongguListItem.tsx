import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useHistoryStack } from "../../../utils/useHistoryStack";
import useTimeStamp from "../../../hooks/useTimeStamp";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import type { GongguItem } from "../../../types/gongguPages/gongguItem";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";
import person from "../../../assets/images/gonggu/userIcon.png";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
  gap: 3%;
  cursor: pointer;
`;
const Content = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
`;
const Title = styled(Text)`
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Participants = styled.div`
  display: flex;
  align-items: center;
  gap: 5%;
`;
const ParticipantsCnt = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Location = styled(Text)`
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Time = styled(Text)`
  max-width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function GongguListItem(props: GongguItem) {
  const navigate = useNavigate();
  const { push } = useHistoryStack();

  const handleClick = () => {
    push();
    navigate(`/gonggu/list/${props.id}`);
  };

  return (
    <Wrap onClick={handleClick}>
      <Img
        src={props.image}
        width="140px"
        height="140px"
        $border="2px solid #e8edff"
        $borderradious="10px"
      ></Img>
      <Content>
        <Img
          src={
            props.boardStatus == "CLOSING_SOON"
              ? red
              : props.boardStatus == "OPEN"
              ? blue
              : props.boardStatus == "CLOSED"
              ? gray
              : green
          }
          width="70px"
        ></Img>
        <Title fontSize="17px">{props.title}</Title>
        <Text fontSize="14px" fontFamily="DunggeunmisoBold">
          {props.price.toLocaleString()}원
        </Text>
        <Participants>
          <ParticipantsProfile
            totalUser={props.totalUsers}
            currentUsers={props.currentUsers}
            participants={props.participants}
          ></ParticipantsProfile>
          <ParticipantsCnt>
            <Img src={person} width="13px" height="13px"></Img>
            <Text fontSize="12px" color="#a7a7a7">
              {props.currentUsers}/{props.totalUsers}
            </Text>
          </ParticipantsCnt>
        </Participants>
        <Details>
          <Location fontSize="12px" fontWeight="bold" color="#a7a7a7">
            {props.location}
          </Location>
          <Time fontSize="12px" color="#a7a7a7">
            {useTimeStamp(props.createAt)}
          </Time>
        </Details>
      </Content>
    </Wrap>
  );
}
