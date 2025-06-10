import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";

const Wrap = styled.div<{ $issmall: boolean }>`
  width: ${(props) => (props.$issmall ? "100%" : "50%")};
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 2% 5%;
  border-top: 1px solid #c7d2fe;
  background-color: white;
`;
const Button = styled.div`
  background-color: #5849d0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px 50px;
  border-radius: 15px;
`;

export default function Footer() {
  const { small } = useDeviceSize();

  return (
    <Wrap $issmall={small}>
      <Button>공구 함께하기</Button>
    </Wrap>
  );
}
