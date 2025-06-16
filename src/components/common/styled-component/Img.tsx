import styled from "styled-components";

interface ImgProps {
  src: string;
  width?: string;
  height?: string;
  $border?: string;
  $borderradious?: string;
  $flexShrink?: number;
}

export const Img = styled.img.attrs<ImgProps>((props) => ({
  src: props.src,
}))<ImgProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$borderradious};
  flex-shrink: ${(props) => props.$flexShrink};
  object-fit: cover;
  box-sizing: border-box;
`;
