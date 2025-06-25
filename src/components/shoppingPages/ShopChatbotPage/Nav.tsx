import styled from "styled-components";
import useDeviceSize from "../../../hooks/useDeviceSize";
import sendImg from "../../../assets/images/common/채팅전송아이콘.png";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7d2fe;
  position: fixed;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 90px;
  padding: 10px 7px 15px 7px;
  gap: 15%;
  bottom: 0;
`;
const InputWrapper = styled.div`
  width: 90%;
  height: 48px;
  background-color: white;
  border: 3px solid #e8edff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Input = styled.input`
  width: 85%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  padding-left: 10px;
`;
const SendButton = styled.button`
  padding-right: 10px;
`;
const SendImg = styled.img`
  width: 31px;
`;

type Chat = {
  status: number;
  text: string;
};
type User = {
  name: string;
  birth: string;
  gender: string;
};

const Nav = ({
  setChattings,
  user,
  sendToAI,
}: {
  setChattings: Dispatch<SetStateAction<Chat[]>>;
  user: User;
  sendToAI: (text: string, user: User) => void;
}) => {
  const { small } = useDeviceSize();
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (inputText.trim() === "") return;

    const newChat: Chat = {
      status: 1,
      text: inputText.trim(),
    };

    setChattings((prev: Chat[]) => [...prev, newChat]);

    sendToAI(inputText.trim(), user);
    setInputText("");
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <Wrapper $isSmall={small}>
      <InputWrapper>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleEnter}
        />
        <SendButton onClick={() => handleAdd()}>
          <SendImg src={sendImg} />
        </SendButton>
      </InputWrapper>
    </Wrapper>
  );
};

export default Nav;
