import styled from "styled-components";

import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.div`
  display: flex;
  gap: 5px;
`;
const InputField = styled.input.attrs<{
  type?: React.HTMLInputAutoCompleteAttribute;
  value?: string;
  disabled?: boolean;
  inputMode?: string;
}>((props) => ({
  type: props.type || "text",
  value: props.value,
  disabled: props.disabled ? true : false,
  inputMode: props.inputMode || "text",
}))`
  display: block;
  width: 100%;
  height: 45px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #5849d0;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
const DateInput = styled.input.attrs<{
  type: React.HTMLInputAutoCompleteAttribute;
  value?: string;
}>((props) => ({
  type: props.type || "text",
  value: props.value,
  disabled: props.disabled ? true : false,
  inputMode: props.inputMode || "text",
}))`
  display: block;
  width: 0;
  min-width: 100%;
  height: 45px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #5849d0;
  padding: 15px;
  &:focus {
    outline: none;
  }

  appearance: none;
  -webkit-appearance: none;
  -webkit-date-and-time-value {
    text-align: left;
  }
`;

interface InputProps {
  title: string;
  name: string;
  type?: React.HTMLInputAutoCompleteAttribute;
  inputmode?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  disabled?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <Wrap>
      <Title>
        <Text fontSize="16px" fontFamily="DunggeunmisoBold">
          {props.title}
        </Text>
        <Text fontSize="16px" fontFamily="DunggeunmisoBold" color="#ff4242">
          *
        </Text>
      </Title>
      {props.type === "date" ? (
        <DateInput
          name={props.name}
          type="date"
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
        <InputField
          name={props.name}
          type={props.type}
          inputMode={props.inputmode}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
      )}
    </Wrap>
  );
}
