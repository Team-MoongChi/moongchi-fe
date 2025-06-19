import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";

const Button = styled.div<{ $backgroundColor: string }>`
  background-color: ${(props) => props.$backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 20%;
  min-width: 90px;
  margin: 0 2% 5% 2%;
  padding: 15px 0;
  cursor: pointer;
`;
const Menu = styled(Text)`
  flex-shrink: 0;
`;

interface MenuProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  clicked: boolean;
}

export default function MapMenuButton(props: MenuProps) {
  return (
    <Button
      $backgroundColor={props.clicked ? "#5849d0" : "#e8edff"}
      onClick={props.onClick}
    >
      <Menu
        fontSize="clamp(16px, 2vw, 20px)"
        fontFamily={props.clicked ? "DunggeunmisoBold" : "inherit"}
        color={props.clicked ? "white" : "#5849d0"}
      >
        {props.text}
      </Menu>
    </Button>
  );
}
