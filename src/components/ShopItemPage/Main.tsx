import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 87%;
  padding-bottom: 30px;
  overflow-y: auto;
`;
const Img = styled.div`
  width: 100%;
  height: 42%;
  background-color: lightgray;
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
`;
const ItemName = styled.div`
  font-size: 20px;
`;
const Price = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
const GongguList = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5%;
  width: 100%;
  height: 30%;
  margin-top: 50px;
  padding: 18px;
`;

const Gonggu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff3ff;
  width: 100%;
  height: 100px;
  padding: 15px;
  border-radius: 10px;
`;
const User = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70%;
  gap: 3%;
`;
const Profile = styled.div`
  width: 50px;
  height: 50px;
  background-color: #5849d0;
  border-radius: 200px;
`;
const UserName = styled.div`
  font-size: 16px;
`;
const JoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 50px;
  border-radius: 15px;
  background-color: #5849d0;
  color: white;
`;
const GongguP = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #5849d0;
`;

const Main = () => {
  return (
    <Wrapper>
      <Img></Img>
      <Info>
        <ItemName>상품 이름 상품 이름 입니다.</ItemName>
        <Price>53,000원</Price>
      </Info>
      <GongguList>
        <GongguP>공구 참여하러 가기</GongguP>
        <Gonggu>
          <User>
            <Profile></Profile>
            <UserName>조용한 후라이팬</UserName>
          </User>

          <JoinButton>참여</JoinButton>
        </Gonggu>
        <Gonggu>
          <User>
            <Profile></Profile>
            <UserName>조용한 후라이팬</UserName>
          </User>

          <JoinButton>참여</JoinButton>
        </Gonggu>
        <Gonggu>
          <User>
            <Profile></Profile>
            <UserName>조용한 후라이팬</UserName>
          </User>

          <JoinButton>참여</JoinButton>
        </Gonggu>
      </GongguList>
    </Wrapper>
  );
};

export default Main;
