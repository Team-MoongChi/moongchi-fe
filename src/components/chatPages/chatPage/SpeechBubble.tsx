import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isMe ? "row-reverse" : "row")};
  gap: 5px;
  width: 100%;
`;
const ProfileImg = styled(Img)<{ $isMe: boolean; $isVisible: boolean }>`
  display: ${(props) => (props.$isMe ? "none" : "inherit")};
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
`;
const NameAndBubble = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${(props) => (props.$isMe ? "end" : "start")};
  gap: 5px;
`;
const Name = styled(Text)<{ $isMe: boolean; $isVisible: boolean }>`
  display: ${(props) =>
    props.$isMe ? "none" : props.$isVisible ? "inline" : "none"};
`;
const BubbleAndTime = styled.div<{ $isMe: boolean }>`
  flex-direction: ${(props) => (props.$isMe ? "row-reverse" : "row")};
  display: flex;
  align-items: end;
  gap: 1px;
`;
const Bubble = styled.div<{ $isMe: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.$isMe ? "#c7d2fe" : "#e9f0ff")};
  border-radius: 20px;
  padding: 15px;
  max-width: 80%;
  word-break: break-word;
`;
const Time = styled(Text)<{ $isVisible: boolean }>`
  padding: 3px;
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
`;

interface SpeechBubbleProps {
  profileUrl: string | undefined;
  nickname?: string | undefined;
  isMe: boolean;
  children: React.ReactNode;
  sendAt: string;
  displayProfile: boolean;
  displayTime: boolean;
}

export default function SpeechBubble(props: SpeechBubbleProps) {
  return (
    <Wrap $isMe={props.isMe}>
      <ProfileImg
        src={props.profileUrl ? props.profileUrl : ""}
        width="40px"
        height="40px"
        $isMe={props.isMe}
        $isVisible={props.displayProfile}
        $borderradious="50%"
      />
      <NameAndBubble $isMe={props.isMe}>
        <Name
          $isMe={props.isMe}
          $isVisible={props.displayProfile}
          fontSize="15px"
        >
          {props.nickname}
        </Name>
        <BubbleAndTime $isMe={props.isMe}>
          <Bubble $isMe={props.isMe}>{props.children}</Bubble>
          <Time fontSize="10px" color="#747474" $isVisible={props.displayTime}>
            {props.sendAt}
          </Time>
        </BubbleAndTime>
      </NameAndBubble>
    </Wrap>
  );
}
