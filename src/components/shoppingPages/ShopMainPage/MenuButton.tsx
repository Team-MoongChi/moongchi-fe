import styled from "styled-components";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding-top: 15px;
  cursor: pointer;
`;
const Button = styled.div<{ $backgroundcolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundcolor};
  border-radius: 6px;
  aspect-ratio: 1/1;
  padding: clamp(5px, 2vw, 15px);
  transition: background-color 0.3s ease;
`;

interface MenuProps {
  src: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  clicked: boolean;
}

export default function MenuButton(props: MenuProps) {
  return (
    <Wrap onClick={props.onClick}>
      <Button $backgroundcolor={props.clicked ? "#5849d0" : "#e8edff"}>
        <Img src={props.src} width="clamp(40px, 2vw, 50px)"></Img>
      </Button>
      <Text
        fontSize="clamp(11px, 2vw, 15px)"
        fontFamily="DunggeunmisoBold"
        color={props.clicked ? "#5849d0" : "#e8edff"}
      >
        {props.text}
      </Text>
    </Wrap>
  );
}
