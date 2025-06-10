import styled from "styled-components";
import heartOn from "../../../assets/images/common/누른하트.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7d2fe;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 13%;
  padding: 10px 10px 15px 10px;
  gap: 4%;
  bottom: 0;
`;
const LikeButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #5849d0;
`;
const DetailButton = styled.a`
  width: 30%;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e8edff;
  color: #5849d0;
  font-size: 18px;
  font-family: DunggeunmisoBold;
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
  font-size: 18px;
  font-family: DunggeunmisoBold;
`;
const HeartImg = styled.img`
  width: 43px;
`;

const Nav = ({ link }) => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/gonggu/write");
  };

  return (
    <Wrapper>
      <LikeButton>
        <HeartImg src={heartOn} alt="" />
        <p style={{ fontFamily: "DunggeunmisoBold" }}>15</p>
      </LikeButton>
      <DetailButton href={link}>제품 상세</DetailButton>
      <CreateButton onClick={() => handleButton()}>
        공구방 생성하기
      </CreateButton>
    </Wrapper>
  );
};

export default Nav;
