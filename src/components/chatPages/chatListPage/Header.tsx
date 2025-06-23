import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: #5849d0;
  padding: 30px;
  border-radius: 0 0 15px 15px;
  position: sticky;
  top: 0;
`;
const HeaderText = styled.div`
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

export default function Header() {
  return (
    <Wrap>
      <HeaderText>나의 채팅 목록</HeaderText>
    </Wrap>
  );
}
