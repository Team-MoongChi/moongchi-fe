import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 15px 20px 15px;
  background-color: #5849d0;
  position: sticky;
  top: 0;
  gap: 9px;
  border-radius: 0 0 15px 15px;
`;
const Title = styled.p`
  font-size: 28px;
  color: white;
  font-weight: bold;
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
const Search = styled.form`
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
  width: 16px;
`;

const Header = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [keyword2, setKeyword2] = useState<string>("");

  const handleBackButton = () => {
    navigate("/shopping");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword2.trim() !== "") {
      navigate(`/shopping/result?keyword=${encodeURIComponent(keyword2)}`);
      window.location.reload();
    }
  };

  return (
    <Wrapper>
      <Title>검색</Title>
      <Search onSubmit={onSubmit}>
        <BackButton onClick={handleBackButton} type="button">
          <BackImg src={backButton} />
        </BackButton>
        <Insert
          placeholder={keyword}
          onChange={(e) => setKeyword2(e.target.value)}
        />
      </Search>
    </Wrapper>
  );
};

export default Header;
