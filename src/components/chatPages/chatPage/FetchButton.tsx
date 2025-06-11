import styled from "styled-components";
import { Text } from "../../common/styled-component/Text";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  display: inline-block;
  width: 30%;
  align-self: center;
  background-color: #5849d0;
  border-radius: 20px;
  padding: 20px 0;
  text-align: center;
`;

interface ButtonProps {
  content: string;
  link?: string;
  onClick?: () => void;
}

export default function FetchButton(props: ButtonProps) {
  return (
    <Wrap onClick={props.onClick}>
      {props.link ? (
        <Link to={props.link}>
          <Text fontSize="15px" fontFamily="DunggeunmisoBold" color="white">
            {props.content}
          </Text>
        </Link>
      ) : (
        <Text fontSize="15px" fontFamily="DunggeunmisoBold" color="white">
          {props.content}
        </Text>
      )}
    </Wrap>
  );
}
