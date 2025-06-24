import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  max-width: 500px;
  justify-content: space-between;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 49%;
`;
const Title = styled.div<{ $isfocused: boolean }>`
  color: ${(props) => (props.$isfocused ? "#5849d0" : "#afb1b6")};
  ${(props) => props.$isfocused && "font-family: DunggeunmisoBold"};
  font-size: 14px;
`;
const Input = styled.input`
  width: 0;
  min-width: 100%;
  height: 50px;
  min-height: 50px;
  border: 1px solid #afb1b6;
  border-radius: 10px;
  font-size: 20px;
  padding: 12px;

  &:focus {
    border: 2px solid #5849d0;
    background-color: #e8edff;
    outline: none;
  }
  &::placeholder {
    color: #afb1b6;
  }
`;

interface MainProps {
  onChange1?: (value: string) => void;
  onChange2?: (value: string) => void;
}

const InputBoxHalf = ({ onChange1, onChange2 }: MainProps) => {
  const [isFocusedB, setIsFocusedB] = useState<boolean>(false);
  const [isFocusedG, setIsFocusedG] = useState<boolean>(false);

  return (
    <Wrapper>
      <InputWrapper>
        <Title $isfocused={isFocusedB}>생일</Title>
        <Input
          type="date"
          onFocus={() => setIsFocusedB(true)}
          onBlur={() => setIsFocusedB(false)}
          style={{ color: "#afb1b6" }}
          onChange={(e) => onChange1?.(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Title $isfocused={isFocusedG}>성별</Title>
        <Input
          type="text"
          onFocus={() => setIsFocusedG(true)}
          onBlur={() => setIsFocusedG(false)}
          placeholder="남성 or 여성"
          onChange={(e) => onChange2?.(e.target.value)}
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default InputBoxHalf;
