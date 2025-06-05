import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { Link } from "react-router-dom";

import Header from "../../components/chatPages/chatPayPage/Header";
import UserProfile from "../../components/chatPages/common/UserProfile";
import UserCost from "../../components/chatPages/chatPayPage/UserCost";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  height: 100%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TotalCost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const PayWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e8edff;
  border-radius: 15px;
  padding: 10%;
  gap: 40px;
`;
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TextProps {
  fontSize: string;
  color?: string;
  fontFamily?: string;
}
const Text = styled.div<TextProps>`
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "inherit"};
`;

export default function ChatPayPage() {
  const { small } = useDeviceSize();

  return (
    <Wrap isSmall={small}>
      <Header />
      <Body>
        <Text fontSize="22px">결제 현황이에요.</Text>
        <TotalCost>
          <Text fontSize="14px" color="#767676">
            모인 금액
          </Text>
          <Text fontSize="32px" color="#5849d0" fontFamily="DunggeunmisoBold">
            총 10,000원
          </Text>
        </TotalCost>

        <PayWrap>
          <UserWrap>
            <UserProfile
              src={
                "https://blog.kakaocdn.net/dn/ccZFOS/btsBiw3BPSU/4PxS7JJKh2D80opSgQq3fk/img.jpg"
              }
              width="clamp(40px, 2vw, 40px)"
              name="손하은"
            />
            <UserCost
              cost={5000}
              isPayed={true}
              width="clamp(40px, 2vw, 40px)"
            ></UserCost>
          </UserWrap>
          <UserWrap>
            <UserProfile
              src={
                "https://blog.kakaocdn.net/dn/ccZFOS/btsBiw3BPSU/4PxS7JJKh2D80opSgQq3fk/img.jpg"
              }
              width="clamp(40px, 2vw, 40px)"
              name="손하은"
            />
            <UserCost
              cost={5000}
              isPayed={true}
              width="clamp(40px, 2vw, 40px)"
            ></UserCost>
          </UserWrap>
          <UserWrap>
            <UserProfile
              src={
                "https://blog.kakaocdn.net/dn/ccZFOS/btsBiw3BPSU/4PxS7JJKh2D80opSgQq3fk/img.jpg"
              }
              width="40px"
              name="손하은"
            />
            <UserCost cost={5000} isPayed={false} width="40px"></UserCost>
          </UserWrap>
        </PayWrap>

        <StyledLink to="/chat/review">
          <Button>결제하기</Button>
        </StyledLink>
      </Body>
    </Wrap>
  );
}
