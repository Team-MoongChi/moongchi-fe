import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useNavigate } from "react-router-dom";

import Header from "../../components/chatPages/chatListPage/Header";
import ChatListItem from "../../components/chatPages/chatListPage/ChatListItem";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChatList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5%;
    gap: 10px;
`

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #e8edff;
  padding: 30px;
`;

export default function ChatListPage() {
    const navigate = useNavigate();
    const writeGonggu2 = () => {
        navigate('/gonggu/write', { state: { message: "shop" } });
    };
    
    const { small, large } = useDeviceSize();

    return (
        <Wrap isSmall={small}>
            <Header />

            <ChatList>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
                <ChatListItem></ChatListItem>
            </ChatList>

            <NavBar>
                {/* 나중에 onclick 삭제하기 */}
                <div onClick={writeGonggu2}>홈</div>
                <div onClick={() => {navigate('/chat/list')}}>채팅</div>
                <div>쇼핑</div>
                <div>마이페이지</div>
            </NavBar>
        </Wrap>
    );
}