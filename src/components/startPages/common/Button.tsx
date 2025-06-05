import styled from "styled-components";

const Box = styled.button`
  width: 90%;
  max-width: 400px;
  height: 70px;
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-family: DunggeunmisoBold;
  font-size: 20px;
`;

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return <Box onClick={onClick}>{text}</Box>;
};

export default Button;
