import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { Link } from "react-router-dom";

import Header from "../../components/chatPages/allReviewPage/Header";

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
`;
const Button = styled.div`
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;
const ReviewWrap = styled.div`
  padding: 20px;
  background-color: #e8edff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ReviewButton = styled.div`
  width: 20%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-around;
`;

export default function AllReviewPage() {
  const { small } = useDeviceSize();

  return (
    <Wrap isSmall={small}>
      <Header />
      <Body>
        <ReviewWrap>
          <StyledLink to="/chat/review/write">
            <div>유지원</div>
            <ReviewButton>작성하기</ReviewButton>
          </StyledLink>
          <StyledLink to="/chat/review/write">
            <div>홍주이</div>
            <ReviewButton>작성하기</ReviewButton>
          </StyledLink>
          <StyledLink to="/chat/review/write">
            <div>장가은</div>
            <ReviewButton>작성하기</ReviewButton>
          </StyledLink>
        </ReviewWrap>
        <Button>완료</Button>
      </Body>
    </Wrap>
  );
}
