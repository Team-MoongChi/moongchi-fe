import styled from "styled-components";

import payed from "../../../assets/images/gonggu/payed.png";
import unpayed from "../../../assets/images/gonggu/unpayed.png";

const UserCostWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface TextProps {
  fontSize: string;
  color?: string;
  fontFamily?: string;
}
const Text = styled.div<TextProps>`
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "inherit"};
`;

const UserImg = styled.img`
  width: ${(props) => props.width};
  aspect-ratio: 1/1;
  object-fit: cover;
`;

interface UserCostProps {
  cost: string;
  isPaid: boolean;
  width: string;
}
export default function UserCost(props: UserCostProps) {
  return (
    <UserCostWrap>
      <Text fontSize="18px" fontFamily="DunggeunmisoBold" color="#5849d0">
        {props.cost}원
      </Text>
      {props.isPaid ? (
        <UserImg src={payed} width={props.width}></UserImg>
      ) : (
        <UserImg src={unpayed} width={props.width}></UserImg>
      )}
    </UserCostWrap>
  );
}
