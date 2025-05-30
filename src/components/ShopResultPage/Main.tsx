import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6%;
  flex-wrap: wrap;
  padding: 3% 0% 3% 0%;
  width: 100%;
  background-color: white;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0 0 3% 0;
  gap: 3px;
`;
const Img = styled.div`
  width: 170px;
  height: 120px;
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
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
      <Item>
        <Img />
        <ItemName>트랄랄레오 트랄랄라</ItemName>
        <Price>10,000원</Price>
      </Item>
    </Wrapper>
  );
};

export default Main;
