import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RecList = styled.div`
  width: 100%;
  height: 180px;
  background-color: #e8edff;
  border-radius: 6px;
`;

export default function GongguRecommend() {
  const navigate = useNavigate();
  const writeGonggu2 = () => {
    navigate("/gonggu/write", {
      state: {
        message: "shop",
        imgUrl:
          "https://sitem.ssgcdn.com/80/96/87/item/1000039879680_i1_332.jpg",
        name: "딸기 2박스",
        categoryId: 2,
      },
    });
  };

  return (
    <Wrap onClick={writeGonggu2}>
      <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
        뭉치's PICK
      </Text>
      <RecList></RecList>
    </Wrap>
  );
}
