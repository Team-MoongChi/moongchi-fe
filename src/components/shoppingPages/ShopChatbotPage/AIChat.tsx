import styled from "styled-components";
import moongchi from "../../../assets/images/moongchies/AI뭉치.png";

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

const AIChat = ({ text }: { text: string }) => {
  return (
    <Wrapper>
      <AIMoongchi src={moongchi} />
      <Chat>{text}</Chat>
    </Wrapper>
  );
};

export default AIChat;
