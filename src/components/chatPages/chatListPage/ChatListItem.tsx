import styled from "styled-components";

import { Link } from "react-router-dom";

const Wrap = styled.div`
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e8edff;
`
const Img = styled.div`
    width: 70px;
    background-color: aliceblue;
    border-radius: 10px;
    aspect-ratio: 1/1;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1;
`
const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`
const TCWrap = styled.div`
    display: flex;
    gap: 5px;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
`
const PeopleCnt = styled.div`
    font-size: 16px;
    color: #a1a1a1;
`
const Time = styled.div`
    font-size: 14px;
    color: #a1a1a1;
`
const Message = styled.div`
    font-size: 16px;
    color: gray;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

export default function ChatListItem() {
    return (
        <StyledLink to="/chat/pay">
            <Wrap>
                <Img />
                <Content>
                    <ContentHeader>
                        <TCWrap>
                            <Title>방울토마토 공구방</Title>
                            <PeopleCnt>4</PeopleCnt>
                        </TCWrap> 
                        <Time>오후 05:30</Time>
                    </ContentHeader>
                    <Message>하하웃자님이 입장하셨습니다.</Message>
                </Content>
            </Wrap>
        </StyledLink>
    );
}