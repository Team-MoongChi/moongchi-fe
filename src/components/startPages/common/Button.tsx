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
  position: fixed;
  bottom: 40px;

  &:disabled {
    background-color: #e8edff;
    color: #aeb8db;
  }
`;

type ButtonProps = {
  text: string;
  onClick: () => void;
  disable?: boolean;
};

const Button = ({ text, onClick, disable }: ButtonProps) => {
  return (
    <Box onClick={() => onClick()} disabled={!disable}>
      {text}
    </Box>
  );
};

export default Button;
