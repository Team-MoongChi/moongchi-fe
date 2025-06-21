import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useHistoryStack } from "../../../utils/useHistoryStack";

const Wrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  padding-bottom: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Items = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px 10px 0px 10px;
`;
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 10px;
  gap: 3px;
  width: 50%;
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/0.65;
  border: none;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #eff3ff;
  background-color: white;
`;
const ItemName = styled.div`
  width: 100%;
  font-size: 15px;
  padding-left: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
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
  results: Result[];
}

const Main = ({ results = [] }: MainProps) => {
  const navigate = useNavigate();
  const { push } = useHistoryStack();

  const itemInfo = (itemId: number) => {
    push();
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  return (
    <Wrapper>
      <Items>
        {results?.map((result) => (
          <Item key={result.id} onClick={() => itemInfo(result.id)}>
            <Img src={result.imgUrl}></Img>
            <ItemName>{result.name}</ItemName>
            <Price>{result.price.toLocaleString()}원</Price>
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
};

export default Main;
