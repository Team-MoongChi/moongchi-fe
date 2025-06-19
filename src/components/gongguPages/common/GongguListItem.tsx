import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import useTimeStamp from "../../../useTimeStamp";
import type { GongguItem } from "../../../types/gongguPages/gongguItem";

import red from "../../../assets/images/gonggu/마감임박.png";
import blue from "../../../assets/images/gonggu/모집중.png";
import gray from "../../../assets/images/gonggu/모집마감.png";
import green from "../../../assets/images/gonggu/공구완료.png";
import person from "../../../assets/images/gonggu/userIcon.png";

const Wrap = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8edff;
  gap: 3%;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  display: flex;
  justify-content: space-between;
`;

export default function GongguListItem(props: GongguItem) {
  const navigate = useNavigate();

  return (
    <Wrap
      onClick={() =>
        navigate(`/gonggu/list/${props.id}`, {
          state: { back: "gonggu" },
        })
      }
    >
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
        <Text fontSize="17px">{props.title}</Text>
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
          <Text fontSize="12px" fontWeight="bold" color="#a7a7a7">
            {props.location}
          </Text>
          <Text fontSize="12px" color="#a7a7a7">
            {useTimeStamp(props.createAt)}
          </Text>
        </Details>
      </Content>
    </Wrap>
  );
}
