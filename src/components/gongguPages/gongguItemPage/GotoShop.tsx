import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";

import arrow from "../../../assets/images/gonggu/backarrow.png";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8edff;
  border-radius: 8px;
  padding: 3% 4%;
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface GotoShopProps {
  // productUrl: string;
  productUrl?: string;
}

export default function GotoShop(props: GotoShopProps) {
  const navigate = useNavigate();

  return (
    <Wrap
      onClick={() => {
        if (props.productUrl) navigate(props.productUrl);
      }}
    >
      <ProductInfo>
        <Img
          src="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
          $borderradious="8px"
          width="65px"
          height="65px"
        />
        <ProductText>
          <Text fontSize="20px">상품 이름</Text>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold">
            20,000원
          </Text>
        </ProductText>
      </ProductInfo>
      <Img src={arrow} height="35px"></Img>
    </Wrap>
  );
}
