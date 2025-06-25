import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import { useNavigate, useParams } from "react-router-dom";

import useDeviceSize from "../../../hooks/useDeviceSize";
import { useHistoryStack } from "../../../utils/useHistoryStack";
import arrow from "../../../assets/images/gonggu/backarrow.png";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #e8edff;
  border-radius: 8px;
  padding: 3% 4%;
  cursor: pointer;
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  gap: 10px;
`;
const ProductText = styled.div<{ $isSmall: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: ${(props) => (props.$isSmall ? "50vw" : "30vw")};
`;
const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface GotoGongguProps {
  productUrl: string;
  productImage: string;
  name: string | undefined;
  price: number | undefined;
}

export default function GotoGonggu(props: GotoGongguProps) {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const { push } = useHistoryStack();

  const handleClick = () => {
    push(); // 현재 경로 저장
    navigate(`/gonggu/list/${chatRoomId}`);
  };
  const { small } = useDeviceSize();

  return (
    <Wrap onClick={handleClick}>
      <ProductInfo>
        <Img
          src={props.productImage}
          $borderradious="8px"
          width="60px"
          height="60px"
        />
        <ProductText $isSmall={small}>
          <Title fontSize="20px">{props.name}</Title>
          <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
            {props.price?.toLocaleString()}원
          </Text>
        </ProductText>
      </ProductInfo>
      <Img src={arrow} height="30px"></Img>
    </Wrap>
  );
}
