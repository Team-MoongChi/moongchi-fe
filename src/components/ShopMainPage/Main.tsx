import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 7%;
  width: 100%;
  padding-bottom: 20%;
  background-color: white;
`;
const Banner = styled.div`
  width: 100%;
  padding: 25%;
  background-color: #eff3ff;
`;
const Title = styled.div`
  font-size: 18px;
  padding: 3%;
  padding-bottom: 1%;
`;
const Items = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 3%;
  gap: 3px;
`;
const Img = styled.div`
  width: 200px;
  height: 140px;
  background-color: #eff3ff;
  border-radius: 10px;
`;
const ItemName = styled.div`
  font-size: 16px;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const Main = () => {
  return (
    <Wrapper>
      <Banner></Banner>
      <Title>뭉치's PICK</Title>
      <Items>
        <Item>
          <Img></Img>
          <ItemName>리릴리 라릴라</ItemName>
          <Price>10,000원</Price>
        </Item>
        <Item>
          <Img></Img>
          <ItemName>리릴리 라릴라</ItemName>
          <Price>10,000원</Price>
        </Item>
        <Item>
          <Img></Img>
          <ItemName>리릴리 라릴라</ItemName>
          <Price>10,000원</Price>
        </Item>
        <Item>
          <Img></Img>
          <ItemName>리릴리 라릴라</ItemName>
          <Price>10,000원</Price>
        </Item>
      </Items>
    </Wrapper>
  );
};

export default Main;
