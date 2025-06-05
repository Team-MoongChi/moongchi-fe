import styled from "styled-components";

const UserPayWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: ${(props) => props.width};
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

interface TextProps {
  fontSize: string;
  color?: string;
  fontFamily?: string;
}
const Text = styled.div<TextProps>`
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "inherit"};
`;

interface UserProfileProps {
  src: string;
  width: string;
  name: string;
}
export default function UserProfile(props: UserProfileProps) {
  return (
    <UserPayWrap>
      <UserImg src={props.src} width={props.width}></UserImg>
      <Text fontSize="20px">{props.name}</Text>
    </UserPayWrap>
  );
}
