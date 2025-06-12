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

interface InputBoxProps {
  title: string;
  data: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const InputBox = ({ title, data, onChange, maxLength }: InputBoxProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formatPhoneNumber = (value: string) => {
    // 숫자만 남기기
    const onlyNums = value.replace(/\D/g, "");

    if (onlyNums.length < 4) {
      return onlyNums;
    } else if (onlyNums.length < 8) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    } else {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <Wrapper>
      <Title $isfocused={isFocused}>{title}</Title>
      <Input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={data}
        disabled={title === "이름" || title === "이메일" ? true : false}
        onChange={
          title === "전화번호"
            ? handlePhoneChange
            : (e) => onChange?.(e.target.value)
        }
        value={data || ""}
        maxLength={maxLength}
      />
    </Wrapper>
  );
};

export default InputBox;
