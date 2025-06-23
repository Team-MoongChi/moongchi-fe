import styled from "styled-components";
import moongchi from "../../../assets/images/moongchies/AI뭉치.png";
import loadingM from "../../../assets/images/moongchies/로딩중.gif";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 20px;
  justify-content: start;
`;
const AIMoongchi = styled.img`
  width: 32px;
  height: 32px;
`;
const Chat = styled.div`
  width: 55%;
  padding: 20px;
  background-color: #e8edff;
  border-radius: 15px;
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

type Props = {
  text: string;
  loading: boolean;
  Key: number;
  length: number;
};

const AIChat = ({ text, loading, Key, length }: Props) => {
  console.log("키와", Key, "길이", length);

  return (
    <Wrapper>
      <AIMoongchi src={moongchi} />
      <Chat>
        {loading && Key + 1 === length ? (
          <Loading>
            <img src={loadingM} alt="" />
            <p>답변을 생성하고 있어요!</p>
          </Loading>
        ) : (
          <>
            {text.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </>
        )}
      </Chat>
    </Wrapper>
  );
};

export default AIChat;
