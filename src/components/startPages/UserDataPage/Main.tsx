import InputBox from "./InputBox";
import InputBoxHalf from "./InputBoxHalf";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

interface User {
  name: string;
  email: string;
}

interface MainProps {
  userData: User;
  nickname: string;
  setNickname: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  birth: string;
  setBirth: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
}

const Main = ({
  userData,
  nickname,
  setNickname,
  phone,
  setPhone,
  setBirth,
  setGender,
}: MainProps) => {
  return (
    <Wrapper>
      <InputBox title="이름" data={userData.name} />
      <InputBox
        title="닉네임 (5자 이내)"
        data={nickname}
        onChange={setNickname}
        maxLength={5}
      />
      <InputBox title="전화번호" data={phone} onChange={setPhone} />
      <InputBox title="이메일" data={userData.email} />
      <InputBoxHalf onChange1={setBirth} onChange2={setGender} />
    </Wrapper>
  );
};

export default Main;
