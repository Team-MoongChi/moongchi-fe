import styled from "styled-components";

interface StyleProps {
  $border: string;
  color: string;
  $backgroundColor: string;
  $fontWeight: string;
}
const CategoryItem = styled.div<StyleProps>`
  border: ${(props) => props.$border};
  color: ${(props) => props.color};
  background-color: ${(props) => props.$backgroundColor};
  font-weight: ${(props) => props.$fontWeight};
  flex: 1;
  box-sizing: border-box;
  border-radius: 35px;
  text-align: center;
  padding: 13px 0;
  cursor: pointer;
`;

interface CategoryProps {
  category: string;
  onClick: () => void;
  clicked: boolean;
}
export default function CategoryButton(props: CategoryProps) {
  return (
    <CategoryItem
      $border={props.clicked ? "none" : "1px solid #5849d0"}
      color={props.clicked ? "white" : "#5849d0"}
      $backgroundColor={props.clicked ? "#5849d0" : "white"}
      $fontWeight={props.clicked ? "bold" : "inherit"}
      onClick={props.onClick}
    >
      {props.category}
    </CategoryItem>
  );
}
