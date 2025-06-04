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
  height: 100%;
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

type Product = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string | null;
};

const products: Product[] = [
  {
    id: 1,
    name: "망고 1kg",
    price: 12000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250514_70/1747218008296jBDI8_JPEG/1772088215457593_1264953615.jpg?type=m510",
    productUrl: "https://example.com/mango",
    rating: 4.8,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "열대과일",
  },
  {
    id: 2,
    name: "파인애플 1개",
    price: 8500,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250529_189/1748527411833FB1J2_JPEG/82660252942318203_218302057.jpg?type=m510",
    productUrl: "https://example.com/pineapple",
    rating: 4.5,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "열대과일",
  },
  {
    id: 3,
    name: "블루베리 300g",
    price: 10000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250429_169/1745907950503nmg95_JPEG/21860392719796336_2035400738.jpg?type=m510",
    productUrl: "https://example.com/blueberry",
    rating: 4.6,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "베리류",
  },
  {
    id: 4,
    name: "딸기 500g",
    price: 15000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20221223_104/1671793738699k9nkM_JPEG/72929634412054637_1664728638.jpg?type=m510",
    productUrl: "https://example.com/strawberry",
    rating: 4.7,
    largeCategory: "식품",
    mediumCategory: "과일",
    smallCategory: "베리류",
  },
  {
    id: 5,
    name: "감자칩 150g",
    price: 2500,
    imgUrl:
      "https://shop-phinf.pstatic.net/20241016_254/1729033751558JH0CH_JPEG/5521059676441733_112057183.jpg?type=m510",
    productUrl: "https://example.com/chips",
    rating: 4.3,
    largeCategory: "식품",
    mediumCategory: "간식",
    smallCategory: null,
  },
  {
    id: 6,
    name: "초콜릿 바",
    price: 3000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20220408_273/1649380049208aMeQl_JPEG/56844745160287136_862583190.jpg?type=m510",
    productUrl: "https://example.com/chocolate",
    rating: 4.5,
    largeCategory: "식품",
    mediumCategory: "간식",
    smallCategory: null,
  },
  {
    id: 7,
    name: "Galaxy S21",
    price: 900000,
    imgUrl: "https://sitem.ssgcdn.com/83/42/94/item/1000587944283_i1_1200.jpg",
    productUrl: "https://example.com/galaxy_s21",
    rating: 4.7,
    largeCategory: "전자제품",
    mediumCategory: "휴대폰",
    smallCategory: "스마트폰",
  },
  {
    id: 8,
    name: "iPhone 13",
    price: 1100000,
    imgUrl:
      "https://shopping-phinf.pstatic.net/main_5364688/53646882589.20250319151833.jpg?type=f640",
    productUrl: "https://example.com/iphone_13",
    rating: 4.8,
    largeCategory: "전자제품",
    mediumCategory: "휴대폰",
    smallCategory: "스마트폰",
  },
  {
    id: 9,
    name: "LG 냉장고",
    price: 1500000,
    imgUrl:
      "https://shopping-phinf.pstatic.net/main_5362501/53625011556.20250318114739.jpg?type=f640",
    productUrl: "https://example.com/lg_fridge",
    rating: 4.5,
    largeCategory: "전자제품",
    mediumCategory: "가전",
    smallCategory: "냉장고",
  },
  {
    id: 10,
    name: "Samsung 냉장고",
    price: 1400000,
    imgUrl:
      "https://shop-phinf.pstatic.net/20250325_175/1742866211516nxIsu_JPEG/1266361458228436_1680944666.jpg?type=m510",
    productUrl: "https://example.com/samsung_fridge",
    rating: 4.6,
    largeCategory: "전자제품",
    mediumCategory: "가전",
    smallCategory: "냉장고",
  },
];

const Main = ({ results }) => {
  const navigate = useNavigate();

  const itemInfo = (itemId: number) => {
    navigate(`/shopping/item?itemId=${itemId}`);
  };

  return (
    <Wrapper>
      {results.map((result) => (
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
