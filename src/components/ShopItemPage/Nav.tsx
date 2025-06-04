import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7d2fe;
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 4%;
  gap: 5%;
  height: 11%;
`;
const LikeButton = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DetailButton = styled.button`
  width: 30%;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e8edff;
  color: #5849d0;
  font-weight: 800;
`;
const CreateButton = styled.button`
  width: 50%;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5849d0;
  color: white;
  font-weight: 800;
`;

const Nav = () => {
  return (
    <Wrapper>
      <LikeButton>
        <p>♥</p>
        <p>15</p>
      </LikeButton>
      <DetailButton>제품 상세</DetailButton>
      <CreateButton>공구방 생성하기</CreateButton>
    </Wrapper>
  );
};

export default Nav;
