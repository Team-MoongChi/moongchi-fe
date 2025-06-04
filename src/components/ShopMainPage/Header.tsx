import styled from "styled-components";
import searchIcon from "../../assets/images/common/검색아이콘.png";
import AiOn from "../../assets/images/moongchies/AI뭉치_ON.png";
import AiOff from "../../assets/images/moongchies/AI뭉치_OFF.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3%;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  position: sticky;
  top: 0;
  gap: 10px;
`;
const Title = styled.p`
  font-size: 22px;
  color: white;
  font-family: DunggeunmisoBold;
`;
const Insert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 0px 8px 0px 8px;
  border-radius: 50px;
  background-color: white;
  gap: 20px;
`;
const SearchIcon = styled.img`
  width: 20px;
`;
const Search = styled.input`
  width: 75%;
  height: 40px;
  border: none;
  font-size: 18px;

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
  return (
    <Wrapper>
      <Title>쇼핑</Title>
      <Insert>
        <SearchIcon src={searchIcon} />
        <Search></Search>
        <AiButton>
          <Ai src={AiOn} />
        </AiButton>
      </Insert>
    </Wrapper>
  );
};

export default Header;
