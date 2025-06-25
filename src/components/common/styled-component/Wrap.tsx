import styled from "styled-components";

export const Wrap = styled.div<{
  $issmall: boolean;
  $gap?: string;
  $height?: string;
}>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  height: ${(props) => props.$height || undefined};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap};
  background-color: white;
`;
