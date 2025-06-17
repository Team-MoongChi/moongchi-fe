import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 20px;
`;

const Chat = styled.div`
  width: 55%;
  padding: 20px;
  background-color: #c7d2fe;
  border-radius: 15px;
`;

const IChat = ({ text }: { text: string }) => {
  return (
    <Wrapper>
      <Chat>{text}</Chat>
    </Wrapper>
  );
};

export default IChat;
