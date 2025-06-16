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
}>((props) => ({
  type: props.type || "text",
  value: props.value,
  disabled: props.disabled ? true : false,
}))<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "inherit"};
  border-radius: 8px;
  border: 1px solid #5849d0;
  padding: 15px;
  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface InputProps {
  title: string;
  name: string;
  type?: React.HTMLInputAutoCompleteAttribute;
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
      {props.type === "number" ? (
        <InputField
          name={props.name}
          type="number"
          min={0}
          onChange={props.onChange}
        />
      ) : (
        <InputField
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
      )}
    </Wrap>
  );
}
