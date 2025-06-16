import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";

const Footer = styled.div<{ $isSmall: boolean }>`
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  display: flex;
  align-items: center;
  padding: 0 5%;
  background-color: white;
  border-top: 1px solid #e8edff;
  position: fixed;
  bottom: 0;
  height: 90px;
`;
const Button = styled.button.attrs<{
  disabled?: boolean;
}>((props) => ({
  type: "button",
  disabled: props.disabled ? true : false,
}))`
  flex: 1;
  background-color: #5849d0;
  border-radius: 15px;
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;

  &:disabled {
    background-color: #e8edff;
    color: #aeb8db;
  }
`;

type SubmitButtonProps = {
  onClick?: () => void;
  disabled: boolean;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { small } = useDeviceSize();
  return (
    <Footer $isSmall={small}>
      <Button onClick={props.onClick} disabled={props.disabled}>
        작성 완료
      </Button>
    </Footer>
  );
}
