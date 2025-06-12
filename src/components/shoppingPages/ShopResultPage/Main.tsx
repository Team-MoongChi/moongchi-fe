import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 6%;
  flex-wrap: wrap;
  padding: 3% 0% 100px 0%;
  width: 100%;
  background-color: white;
  min-height: 80vh;
`;
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0 0 3% 0;
  gap: 3px;
`;
const Img = styled.img`
  width: 170px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #eff3ff;
`;
const ItemName = styled.div`
  font-size: 15px;
`;
const Price = styled.div`
  font-size: 15px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;

interface Result {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCatogry?: string;
  mediumCategory?: string;
  smallCategory?: string;
}

interface MainProps {
  results?: Result[];
}

const Main = ({ results = [] }: MainProps) => {
  const navigate = useNavigate();

  const itemInfo = (itemId: number) => {
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  return (
    <Wrapper>
      {results?.map((result) => (
        <Item key={result.id} onClick={() => itemInfo(result.id)}>
          <Img src={result.imgUrl}></Img>
          <ItemName>{result.name}</ItemName>
          <Price>{result.price.toLocaleString()}원</Price>
        </Item>
      ))}
    </Wrapper>
  );
};

export default Main;
