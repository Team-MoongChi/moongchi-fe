import styled from "styled-components";
import searchIcon from "../../../assets/images/common/검색아이콘.png";
import AiOn from "../../../assets/images/moongchies/AI뭉치_ON.png";
import AiOff from "../../../assets/images/moongchies/AI뭉치_OFF.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3%;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  padding: 15px 15px 20px 15px;
  position: sticky;
  top: 0;
  gap: 10px;
  z-index: 100;
`;
const Title = styled.p`
  font-size: 24px;
  color: white;
  font-family: DunggeunmisoBold;
`;
const Insert = styled.form<{ $aiState: number }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 550px;
  height: 48px;
  padding: 0px 15px 0px 15px;
  border-radius: 50px;
  background-color: ${(props) => (props.$aiState ? "#EFF3FF" : "white")};
  gap: 5px;
`;
const SearchIcon = styled.img`
  width: 20px;
`;
const Search = styled.input<{ $aiState: number }>`
  width: 82%;
  height: 40px;
  border: none;
  font-size: 18px;
  background-color: ${(props) => (props.$aiState ? "#EFF3FF" : "white")};

  &:focus {
    outline: none;
  }
`;
const AiButton = styled.button`
  display: flex;
  flex-direction: column;
  color: #c7d2fe;
  font-size: 12px;
`;
const Ai = styled.img`
  width: 20px;
  margin-top: 4px;
`;

const Header = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();
  const [aiState, setAiState] = useState<number>(1); //1: ON, 0: OFF

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(aiState);
    if (keyword.trim() !== "") {
      if (aiState === 1) {
        navigate(`/shopping/chatbot?keyword=${encodeURIComponent(keyword)}`);
      } else {
        navigate(`/shopping/result?keyword=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const aiOnOff = () => {
    if (aiState === 0) {
      setAiState(1);
    } else {
      setAiState(0);
    }
  };

  return (
    <Wrapper>
      <Title>쇼핑</Title>
      <Insert onSubmit={onSubmit} $aiState={aiState}>
        <SearchIcon src={searchIcon} />
        <Search
          onChange={(e) => setKeyword(e.target.value)}
          $aiState={aiState}
        ></Search>
        <AiButton onClick={() => aiOnOff()} type="button">
          <Ai src={aiState === 1 ? AiOn : AiOff} />
        </AiButton>
      </Insert>
    </Wrapper>
  );
};

export default Header;
