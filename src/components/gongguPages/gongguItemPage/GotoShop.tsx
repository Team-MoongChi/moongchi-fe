import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";

import arrow from "../../../assets/images/gonggu/backarrow.png";
import { useNavigate } from "react-router-dom";
import useDeviceSize from "../../../useDeviceSize";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8edff;
  border-radius: 8px;
  padding: 3% 4%;
  cursor: pointer;
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProductText = styled.div<{ $isSmall: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: ${(props) => (props.$isSmall ? "50vw" : "30vw")};
`;
const Title = styled(Text)`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface GotoShopProps {
  productUrl: string;
  productImage: string;
  name: string | undefined;
  price: number | undefined;
}

export default function GotoShop(props: GotoShopProps) {
  const navigate = useNavigate();
  const { small } = useDeviceSize();

  return (
    <Wrap onClick={() => navigate(props.productUrl)}>
      <ProductInfo>
        <Img
          src={props.productImage}
          $borderradious="8px"
          width="65px"
          height="65px"
        />
        <ProductText $isSmall={small}>
          <Title fontSize="20px">{props.name}</Title>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold">
            {props.price?.toLocaleString()}원
          </Text>
        </ProductText>
      </ProductInfo>
      <Img src={arrow} height="35px"></Img>
    </Wrap>
  );
}
