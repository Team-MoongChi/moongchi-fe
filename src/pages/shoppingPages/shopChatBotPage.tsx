import styled from "styled-components";
import Header from "../../components/common/Header.tsx";
import Main from "../../components/shoppingPages/ShopChatbotPage/main.tsx";
import Nav from "../../components/shoppingPages/ShopChatbotPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useEffect, useState, useRef } from "react";

//isSmall에 $ 붙이는 이유: styled-components에서 $가 붙은 props는 DOM에 넘기지 않음
//styled 내부에서만 쓸 값이면 꼭 $ 붙이기
const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  min-height: 100vh;
`;

type Chat = {
  status: number; //0이면 AI, 1이면 유저
  text: string;
};

const ShopChatBotPage = () => {
  const { small } = useDeviceSize();
  const [chattings, setChattings] = useState<Chat[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") ?? "";
  const keywordInserted = useRef(false);

  useEffect(() => {
    if (keyword.trim() === "" || keywordInserted.current) return;

    const newChat: Chat = {
      status: 1,
      text: keyword.trim(),
    };

    setChattings((prev: Chat[]) => [...prev, newChat]);
    keywordInserted.current = true;
  }, [keyword]);

  console.log(chattings);

  return (
    <Wrapper $isSmall={small}>
      <Header title="AI 뭉치" route="/shopping" />
      <Main chattings={chattings} />
      <Nav setChattings={setChattings} />
    </Wrapper>
  );
};

export default ShopChatBotPage;
