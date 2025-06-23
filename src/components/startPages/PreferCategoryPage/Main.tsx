import styled from "styled-components";
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
  margin: 4% 0px 3.5% 0px;
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
          id="신선식품"
          name="radio"
          value="신선식품"
          checked={selected === "신선식품"}
          onChange={() => setSelected("신선식품")}
        />
        <RadioLabel htmlFor="신선식품" checked={selected === "신선식품"}>
          <img src={freshItem} alt="신선식품" />
          <p>신선식품</p>
        </RadioLabel>
        <CustomRadio
          type="radio"
          id="가공식품"
          name="radio"
          value="가공식품"
          checked={selected === "가공식품"}
          onChange={() => setSelected("가공식품")}
        />
        <RadioLabel htmlFor="가공식품" checked={selected === "가공식품"}>
          <img src={processedItem} alt="가공식품" />
          <p>가공식품</p>
        </RadioLabel>
      </WrapperSub>
      <WrapperSub>
        <CustomRadio
          type="radio"
          id="생활용품"
          name="radio"
          value="생활용품"
          checked={selected === "생활용품"}
          onChange={() => setSelected("생활용품")}
        />
        <RadioLabel htmlFor="생활용품" checked={selected === "생활용품"}>
          <img src={lifeItem} alt="생활용품" />
          <p>생활용품</p>
        </RadioLabel>
        <CustomRadio
          type="radio"
          id="주방용품"
          name="radio"
          value="주방용품"
          checked={selected === "주방용품"}
          onChange={() => setSelected("주방용품")}
        />
        <RadioLabel htmlFor="주방용품" checked={selected === "주방용품"}>
          <img src={kitchenItem} alt="주방용품" style={{ width: "110px" }} />
          <p>주방용품</p>
        </RadioLabel>
      </WrapperSub>
    </Wrapper>
  );
};

export default Main;
