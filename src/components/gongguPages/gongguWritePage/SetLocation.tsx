import styled from "styled-components";

import { Text } from "../../common/styled-component/Text";
import { Img } from "../../common/styled-component/Img";
import arrow from "../../../assets/images/gonggu/backarrow.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #5849d0;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
`;

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
};

export default function SetLocation({ setIsOpen, location }: Props) {
  return (
    <Wrap onClick={() => setIsOpen(true)}>
      <Text fontSize="14px">{location ? location : "위치 추가"}</Text>
      <Img src={arrow} width="20px" height="20px"></Img>
    </Wrap>
  );
}
