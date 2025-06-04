import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3%;
  background-color: #5849d0;
  position: sticky;
  top: 0;
  gap: 10px;
  border-radius: 0 0 15px 15px;
`;
const Title = styled.p`
  font-size: 22px;
  color: white;
  font-family: DunggeunmisoBold;
`;
const Insert = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 46px;
  padding: 0px 20px 0px 20px;
  border-radius: 50px;
  background-color: white;
  gap: 20px;
  border: none;
  font-size: 18px;

  &:focus {
    outline: none;
  }
`;
const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const BackButton = styled.button`
  color: white;
`;
const BackImg = styled.img`
  width: 14px;
`;

const Header = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Title>검색</Title>
      <Search>
        <BackButton onClick={handleBackButton}>
          <BackImg src={backButton} />
        </BackButton>
        <Insert type="text" placeholder={keyword} />
      </Search>
    </Wrapper>
  );
};

export default Header;
