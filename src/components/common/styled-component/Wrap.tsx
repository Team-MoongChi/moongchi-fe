import styled from "styled-components";

export const Wrap = styled.div<{ $issmall: boolean; $gap?: string }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap};
  background-color: white;
`;
