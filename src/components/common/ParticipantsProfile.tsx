import styled from "styled-components";

import empty from "../../assets/images/common/빈프로필.png";
import { Img } from "./styled-component/Img";
import { Text } from "./styled-component/Text";

const Wrap = styled.div`
  display: flex;
`;
const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #5849d0;
`;

interface Props {
  totalUser: number;
  currentUsers: number;
}

export default function ParticipantsProfile(props: Props) {
  const totalUser = props.totalUser;
  const currentUsers = props.currentUsers;
  const emptyUser = totalUser - currentUsers;
  const participants = [
    "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg",
  ];

  const emptyProfile = () => {
    const arr = [];
    for (let i = 0; i < emptyUser; i++) {
      arr.push(<Img key={i} src={empty} width="20px" height="20px"></Img>);
    }
    return arr;
  };

  const totalMoreFive = () => {
    const arr = [];
    for (let i = 1; i < 5 - currentUsers; i++) {
      arr.push(<Img key={i} src={empty} width="20px" height="20px"></Img>);
    }
    arr.push(
      <Plus>
        <Text fontSize="10px" color="white">
          +{totalUser - 4}
        </Text>
      </Plus>
    );
    return arr;
  };

  return (
    <Wrap>
      {participants.map((url) => {
        return (
          <Img
            src={url}
            width="20px"
            height="20px"
            border="1px solid #5849d0"
            borderRadious="50%"
          ></Img>
        );
      })}
      {totalUser > 5 ? totalMoreFive() : emptyProfile()}
    </Wrap>
  );
}
