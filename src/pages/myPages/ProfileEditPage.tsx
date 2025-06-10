import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import InputBox from "../../components/myPages/ProfileEditPage/InputBox";
import Button from "../../components/myPages/ProfileEditPage/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImg = styled.button`
  margin-top: 120px;

  img {
    width: 160px;
    height: 160px;
    border: 5px solid #c7d2fe;
    border-radius: 100px;
  }
`;
const Main = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProfileEditPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  const handleClick = () => {
    navigate("/mypage");
  };

  return (
    <Wrapper $isSmall={small}>
      <Header title="프로필 수정" />
      <Main>
        <ProfileImg>
          <img src="/mint.png" />
        </ProfileImg>
        <InputBox title="닉네임" data={nickname} onChange={setNickname} />
      </Main>
      <Button text="완료" onClick={handleClick} disable={true} />
    </Wrapper>
  );
};

export default ProfileEditPage;
