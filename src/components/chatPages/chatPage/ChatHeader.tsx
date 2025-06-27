import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import useDeviceSize from "../../../hooks/useDeviceSize";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import ParticipantsModal from "./ParticipantsModal";
import back from "../../../assets/images/common/뒤로가기.png";
import participants from "../../../assets/images/gonggu/participants.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 71px;
  padding: 20px;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
`;
const Button = styled(Img)<{ $marginRight?: string }>`
  cursor: pointer;
  margin-right: ${(props) => props.$marginRight || 0};
`;
const Title = styled(Text)`
  width: 70%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover::after {
    content: attr(data-fulltext);
    position: absolute;
    top: 56px; /* 아래로 툴팁 표시 */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    max-width: 80%;
    white-space: normal;
  }
`;

interface MainProps {
  title: string | undefined;
  route: string | number;
  $fontSize?: string;
  participantMap: Map<number, { nickname: string; profileUrl: string }>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ChatHeader(props: MainProps) {
  const navigate = useNavigate();
  const { small } = useDeviceSize();

  return (
    <Wrapper>
      <Button
        $marginRight="12px"
        src={back}
        width="16px"
        onClick={() => navigate("/chat/list")}
      />
      <Title
        fontSize={small ? "28px" : "3vmin"}
        fontWeight="800"
        color="white"
        data-fulltext={props.title}
      >
        {props.title}
      </Title>
      <Button
        src={participants}
        width="28px"
        onClick={() => props.setIsOpen(!props.isOpen)}
      />
      <ParticipantsModal
        isOpen={props.isOpen}
        participantsMap={props.participantMap}
      ></ParticipantsModal>
    </Wrapper>
  );
}
