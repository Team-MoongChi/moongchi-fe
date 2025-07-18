import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div<{ $backgroundcolor: string; $cursor: string }>`
  display: flex;
  width: 30%;
  justify-content: center;
  background-color: ${(props) => props.$backgroundcolor};
  padding: 13px 0;
  border-radius: 10px;
  cursor: ${(props) => props.$cursor};
`;

interface ButtonProps {
  backgroundColor: string;
  content: string;
  reviewed: boolean;
  chatRoomId?: string | undefined;
  targetParticipantId?: number;
  nickname?: string;
  cursor: string;
}

export default function ReviewButton(props: ButtonProps) {
  const navigate = useNavigate();
  const gotoReview = () => {
    if (!props.reviewed) {
      navigate(
        `/chat/${props.chatRoomId}/review/${props.targetParticipantId}?nickname=${props.nickname}`
      );
    }
  };

  return (
    <Wrap
      $backgroundcolor={props.backgroundColor}
      onClick={gotoReview}
      $cursor={props.cursor}
    >
      <Text fontSize="15px" fontFamily="DunggeunmisoBold" color="white">
        {props.content}
      </Text>
    </Wrap>
  );
}
