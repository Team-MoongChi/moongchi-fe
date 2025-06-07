import InputBox from "./InputBox";
import InputBoxHalf from "./InputBoxHalf";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  height: 65%;
  margin-top: 20px;
`;

const Main = () => {
  return (
    <Wrapper>
      <InputBox title="이름" />
      <InputBox title="닉네임" />
      <InputBox title="전화번호" />
      <InputBox title="이메일" />
      <InputBoxHalf />
    </Wrapper>
  );
};

export default Main;
