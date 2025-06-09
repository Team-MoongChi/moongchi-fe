import styled from "styled-components";
import { useState } from "react";
import freshItem from "../../../assets/images/map/신선식품.png";
import processedItem from "../../../assets/images/map/가공식품.png";
import lifeItem from "../../../assets/images/map/생활용품.png";
import kitchenItem from "../../../assets/images/map/주방용품.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  margin: 4% 0px 0px 0px;
  height: 55.4%;
`;
const WrapperSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CustomRadio = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ checked: boolean }>`
  width: 160px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ checked }) => (checked ? "border: 4px solid #5849d0" : "")};
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? "#E8EDFF" : "#EFEFEF")};
  transition: 0.2s;

  img {
    width: 90px;
  }

  p {
    font-size: 18px;
    margin: 0;
    color: ${({ checked }) => (checked ? "#5849d0" : "#333")};
    ${({ checked }) => checked && "font-family: DunggeunmisoBold"}
  }
`;

interface MainProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Main = ({ selected, setSelected }: MainProps) => {
  return (
    <Wrapper>
      <WrapperSub>
        <CustomRadio
          type="radio"
          id="option1"
          name="radio"
          value="option1"
          checked={selected === "option1"}
          onChange={() => setSelected("option1")}
        />
        <RadioLabel htmlFor="option1" checked={selected === "option1"}>
          <img src={freshItem} alt="옵션1" />
          <p>신선식품</p>
        </RadioLabel>
        <CustomRadio
          type="radio"
          id="option2"
          name="radio"
          value="option2"
          checked={selected === "option2"}
          onChange={() => setSelected("option2")}
        />
        <RadioLabel htmlFor="option2" checked={selected === "option2"}>
          <img src={processedItem} alt="옵션2" />
          <p>가공식품</p>
        </RadioLabel>
      </WrapperSub>
      <WrapperSub>
        <CustomRadio
          type="radio"
          id="option3"
          name="radio"
          value="option3"
          checked={selected === "option3"}
          onChange={() => setSelected("option3")}
        />
        <RadioLabel htmlFor="option3" checked={selected === "option3"}>
          <img src={lifeItem} alt="옵션3" />
          <p>생활용품</p>
        </RadioLabel>
        <CustomRadio
          type="radio"
          id="option4"
          name="radio"
          value="option4"
          checked={selected === "option4"}
          onChange={() => setSelected("option4")}
        />
        <RadioLabel htmlFor="option4" checked={selected === "option4"}>
          <img src={kitchenItem} alt="옵션4" style={{ width: "110px" }} />
          <p>주방용품</p>
        </RadioLabel>
      </WrapperSub>
    </Wrapper>
  );
};

export default Main;
