import styled from "styled-components";
import AIChat from "./AIChat";
import IChat from "./IChat";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 20px;
`;
const Blank = styled.div`
  width: 100%;
  height: 80px;
`;

type Chat = {
  status: number; //0이면 AI, 1이면 유저
  text: string;
  imgUrls?: string[];
  productIds?: number[];
};

const Main = ({
  chattings,
  loading,
}: {
  chattings: Chat[];
  loading: boolean;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chattings]);

  return (
    <Wrapper>
      {chattings?.map((chat, index) =>
        chat.status === 0 ? (
          <AIChat
            chat={chat}
            key={index}
            Key={index}
            loading={loading}
            length={chattings.length}
          />
        ) : (
          <IChat text={chat.text} key={index} />
        )
      )}
      <Blank ref={bottomRef} />
    </Wrapper>
  );
};

export default Main;
