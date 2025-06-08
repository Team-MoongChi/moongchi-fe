import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 80%;
  max-width: 500px;
`;
const Title = styled.div<{ $isfocused: boolean }>`
  color: ${(props) => (props.$isfocused ? "#5849d0" : "#afb1b6")};
  ${(props) => props.$isfocused && "font-family: DunggeunmisoBold"};
  font-size: 14px;
  transition: 0.1s;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #afb1b6;
  border-radius: 10px;
  font-size: 20px;
  padding: 12px;

  &:focus {
    border: 2px solid #5849d0;
    background-color: #e8edff;
    outline: none;
    transition: 0.1s;
  }
`;

const InputBox = ({ title }: { title: string }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Wrapper>
      <Title $isfocused={isFocused}>{title}</Title>
      <Input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Wrapper>
  );
};

export default InputBox;
