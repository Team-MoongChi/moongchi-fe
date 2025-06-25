import styled, { keyframes, css } from "styled-components";
import searchIcon from "../../../assets/images/common/검색아이콘.png";
import AiOn from "../../../assets/images/moongchies/AI뭉치_ON.png";
import AiOff from "../../../assets/images/moongchies/AI뭉치_OFF.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const wave = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  padding: 15px 15px 18px 15px;
  position: sticky;
  top: 0;
  gap: 9px;
  z-index: 100;
`;
const Title = styled.p`
  font-size: 28px;
  color: white;
  font-weight: bold;
`;
const Insert = styled.form<{ $aiState: number }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 550px;
  height: 48px;
  padding: 0 15px;
  border-radius: 50px;
  gap: 5px;
  ::placeholder {
    color: #8c97a7;
  }

  background: ${(props) =>
    props.$aiState
      ? "linear-gradient(270deg, #ffffff, #ffffff, #E8EDFF, #dde3ff, #e8f4ff, #f2f5ff, #ffffff, #ffffff)"
      : "white"};
  background-size: 800% 800%;

  ${(props) =>
    props.$aiState &&
    css`
      animation: ${wave} 4s linear infinite;
    `}
`;
const SearchIcon = styled.img`
  width: 20px;
`;
const Search = styled.input<{ $aiState: number }>`
  width: 82%;
  height: 40px;
  border: none;
  font-size: 18px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;
const AiButton = styled.button`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;
const Ai = styled.img<{ $aiState: number }>`
  width: 38px;
  aspect-ratio: 38/45;
  margin-top: 2px;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.8); // 눌렀을 때 살짝 작아짐
  }
  ${(props) =>
    props.$aiState == 1 &&
    css`
      animation: ${shake} 0.4s ease;
    `}
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
          placeholder={aiState ? "AI 뭉치와 상품에 대해 대화해 보세요!" : ""}
        ></Search>
        <AiButton onClick={() => aiOnOff()} type="button">
          <Ai src={aiState === 1 ? AiOn : AiOff} $aiState={aiState} />
        </AiButton>
      </Insert>
    </Wrapper>
  );
};

export default Header;
