import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";

import Header from "../../components/chatPages/AllReviewPage/Header";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  /* height: 100%; */
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 5%;
`
const Button = styled.div`
    background-color: #5849d0;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    padding: 20px;
`
const TagWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`
const Tag = styled.div`
    flex-basis: 40%;
    background-color: #E8EDFF;
    border-radius: 15px;
    padding: 10px 0;
    color: #5849d0;
    text-align: center;
`


export default function OneReviewPage() {
    const { small, large } = useDeviceSize();

    return (
        <Wrap isSmall={ small }>
            <Header />
            <Body>
                <div>홍주이님과의 공구는</div>
                <input type="text" required></input>
                <TagWrap>
                    <Tag>친절해요</Tag>
                    <Tag>약속 시간을 지켰어요</Tag>
                    <Tag>채팅 응답이 빨라요</Tag>
                    <Tag>설명과 같아요</Tag>
                    <Tag>믿을 수 있어요</Tag>
                    <Tag>가격, 수량이 확실해요</Tag>
                    <Tag>또 거래하고 싶어요</Tag>
                </TagWrap>
                <input type="textarea" placeholder="리뷰를 작성해주세요"></input>
                <Button>작성 완료</Button>
            </Body>
        </Wrap>
    );
}