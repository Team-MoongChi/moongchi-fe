import styled from "styled-components";
import moongchi from "../../../assets/images/moongchies/AI뭉치.png";
import loadingM from "../../../assets/images/moongchies/로딩중.gif";
import TypingMarkdown from "./TypingText";
import { useHistoryStack } from "../../../utils/useHistoryStack";
import { useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const WrapperC = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: start;
  gap: 5px;
  margin-top: 17px;
`;
const AIMoongchi = styled.img`
  width: 32px;
  height: 32px;
`;
const Chat = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 30px;
  padding-top: 15px;
  background-color: #e8edff;
  border-radius: 15px;
`;
const Imgs = styled.div`
  width: 80%;
  max-width: 400px;
  display: flex;
  gap: 5px;
`;
const Img = styled.button`
  width: 33%;
  aspect-ratio: 1 / 1;
  border: 5px solid #e8edff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const Loading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 170px;
  }
  p {
    color: #5849d0;
    padding-bottom: 15px;
    font-weight: 700;
  }
`;

type Chat = {
  status: number; //0이면 AI, 1이면 유저
  text: string;
  imgUrls?: string[];
  productIds?: number[];
};

type Props = {
  chat: Chat;
  loading: boolean;
  Key: number;
  goToBottom: () => void;
  backSave: () => void;
  restoredChat: Chat[] | null;
};

const AIChat = ({
  chat,
  loading,
  Key,
  goToBottom,
  backSave,
  restoredChat,
}: Props) => {
  const { push } = useHistoryStack();
  const navigate = useNavigate();

  const handleClickImg = (index: number) => {
    const productId = chat.productIds?.[index];
    if (!productId) return; // 없으면 아무것도 안 함

    backSave();
    push();
    navigate(`/shopping/item?itemId=${productId}`);
  };

  return (
    <Wrapper>
      <AIMoongchi src={moongchi} />
      <WrapperC>
        <Chat>
          {loading && Key + 1 === length ? (
            <Loading>
              <img src={loadingM} alt="" />
              <p>답변을 생성하고 있어요!</p>
            </Loading>
          ) : (
            <>
              {restoredChat && "chat" in restoredChat ? (
                <Markdown
                  style={{
                    textAlign: "start",
                    lineHeight: "1.6",
                    wordBreak: "keep-all",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {chat.text}
                </Markdown>
              ) : (
                <TypingMarkdown
                  text={chat.text}
                  speed={20}
                  goToBottom={goToBottom}
                />
              )}
            </>
          )}
        </Chat>
        <Imgs>
          {chat.imgUrls?.map((imgUrl, index) => (
            <Img key={index} onClick={() => handleClickImg(index)}>
              <img src={imgUrl} alt="" />
            </Img>
          ))}
        </Imgs>
      </WrapperC>
    </Wrapper>
  );
};

export default AIChat;
