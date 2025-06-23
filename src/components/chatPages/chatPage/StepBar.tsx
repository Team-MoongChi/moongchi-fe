import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5849d0;
  border-radius: 15px;
  height: 26px;
  padding: 0 10px;
  z-index: 1;
`;
const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9f0ff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  z-index: 1;
`;
const Line = styled.div`
  border-bottom: 1px solid #e9f0ff;
  height: 13px;
  width: 100%;
  position: absolute;
`;

interface StepBarProps {
  status: string;
}

export default function StepBar(props: StepBarProps) {
  const statusList = ["모집중", "모집완료", "구매중", "구매완료", "공구완료"];

  const findIdx = (): number => {
    for (let i = 0; i < statusList.length; i++) {
      if (props.status === statusList[i]) {
        return i;
      }
    }
    return -1;
  };

  const stepper = () => {
    const idx = findIdx();
    const stepbar = [];

    for (let i = 0; i < idx; i++) {
      stepbar.push(
        <Step key={i}>
          <Text fontSize="14px" color="#95ade0">
            {i + 1}
          </Text>
        </Step>
      );
    }
    stepbar.push(
      <State key={idx}>
        <Text fontSize="14px" fontFamily="DunggeunmisoBold" color="white">
          {props.status}
        </Text>
      </State>
    );
    for (let i = idx + 1; i < statusList.length; i++) {
      stepbar.push(
        <Step key={i}>
          <Text fontSize="14px" color="#95ade0">
            {i + 1}
          </Text>
        </Step>
      );
    }

    return stepbar;
  };

  return (
    <Wrap>
      {stepper()}
      <Line />
    </Wrap>
  );
}
