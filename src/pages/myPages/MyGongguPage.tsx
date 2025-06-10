import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import GongguListItem from "../../components/gongguPages/common/GongguListItem";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  min-height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Main = styled.div`
  width: 100%;
  margin-top: 82px;
`;

const example = {
  id: 1,
  boardStatus: "OPEN",
  title: "나는 사과",
  location: "나는 집",
  groupProduct: {
    price: 10000,
    images: "/mint.png",
  },
};

const MyGongguPage = () => {
  const { small } = useDeviceSize();
  return (
    <Wrapper $isSmall={small}>
      <Header title="내가 올린 공구" />
      <Main>
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
        <GongguListItem {...example} />
      </Main>
    </Wrapper>
  );
};

export default MyGongguPage;
