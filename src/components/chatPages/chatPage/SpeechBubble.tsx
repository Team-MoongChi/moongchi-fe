import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isMe ? "row-reverse" : "row")};
  gap: 5px;
  width: 100%;
`;
const ProfileImg = styled(Img)<{ $display?: string }>`
  display: ${(props) => props.$display || "inherit"};
`;
const NameAndBubble = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${(props) => (props.$isMe ? "end" : "start")};
  gap: 5px;
`;
const Name = styled(Text)<{ $isMe: boolean }>`
  display: ${(props) => (props.$isMe ? "none" : "inline")};
`;
const Bubble = styled.div<{ $isMe: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.$isMe ? "#c7d2fe" : "#e9f0ff")};
  border-radius: 20px;
  padding: 15px;
  max-width: 80%;
  word-break: break-word;
`;

interface SpeechBubbleProps {
  profileUrl: string | undefined;
  nickname?: string | undefined;
  isMe: boolean;
  children: React.ReactNode;
}

export default function SpeechBubble(props: SpeechBubbleProps) {
  return (
    <Wrap $isMe={props.isMe}>
      <ProfileImg
        src={props.profileUrl ? props.profileUrl : ""}
        width="40px"
        height="40px"
      />
      <NameAndBubble $isMe={props.isMe}>
        <Name $isMe={props.isMe} fontSize="15px">
          {props.nickname}
        </Name>
        <Bubble $isMe={props.isMe}>{props.children}</Bubble>
      </NameAndBubble>
    </Wrap>
  );
}
