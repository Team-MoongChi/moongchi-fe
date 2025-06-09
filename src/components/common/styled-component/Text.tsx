import styled from "styled-components";

interface TextProps {
  fontSize: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
}

export const Text = styled.div<TextProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  font-family: ${(props) => props.fontFamily};
  color: ${(props) => props.color};
`;
