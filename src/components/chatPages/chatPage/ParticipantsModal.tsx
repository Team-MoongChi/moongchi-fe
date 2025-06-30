import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import type { Message } from "../../../types/chatPages/message";

const Modal = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 71px;
  right: 0;
  width: 45%;
  height: auto;
  max-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 20px 0 20px 20px;
  word-break: break-word;
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`;
const Title = styled(Text)`
  align-self: center;
`;
const Participants = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface ModalProps {
  isOpen: boolean;
  messages: Message[];
}

export default function ParticipantsModal(props: ModalProps) {
  return (
    <Modal isOpen={props.isOpen}>
      <Title fontSize="22px" fontFamily="DunggeunmisoBold" color="#5849d0">
        참여 인원
      </Title>
      {props.messages.map((message, idx) => (
        <Participants key={idx}>
          <Img
            src={message.senderProfileUrl || ""}
            width="40px"
            height="40px"
            $border="1px solid #5849d0"
            $borderradious="50%"
          ></Img>
          <Text fontSize="20px">{message.senderNickname}</Text>
        </Participants>
      ))}
    </Modal>
  );
}
