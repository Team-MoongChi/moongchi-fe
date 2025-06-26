import styled from "styled-components";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import empty from "../../../assets/images/common/빈프로필.png";

const Wrap = styled.div`
  display: flex;
`;
const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #5849d0;
`;

interface Participants {
  userId: number;
  profileUrl: string;
}
interface Props {
  totalUser: number;
  currentUsers: number;
  participants: Participants[];
}

export default function RecPartProfile(props: Props) {
  const totalUser = props.totalUser;
  const currentUsers = props.currentUsers;
  const emptyUser = totalUser - currentUsers;
  const participants = props.participants;

  const emptyProfile = () => {
    const arr = [];
    for (let i = 0; i < emptyUser; i++) {
      arr.push(<Img key={i} src={empty} width="18px" height="18px"></Img>);
    }
    return arr;
  };

  const totalMoreFour = () => {
    const arr = [];
    for (let i = 1; i < 4 - currentUsers; i++) {
      arr.push(<Img key={i - 1} src={empty} width="18px" height="18px"></Img>);
    }
    arr.push(
      <Plus key="5">
        <Text fontSize="10px" color="white">
          +{totalUser - 3}
        </Text>
      </Plus>
    );
    return arr;
  };

  return (
    <Wrap>
      {currentUsers === 4 && totalUser === 4
        ? participants?.map((participant, idx) => {
            return (
              <Img
                key={idx}
                src={participant.profileUrl}
                width="18px"
                height="18px"
                $border="1px solid #5849d0"
                $borderradious="50%"
              ></Img>
            );
          })
        : participants?.slice(0, 3).map((participant, idx) => {
            return (
              <Img
                key={idx}
                src={participant.profileUrl}
                width="18px"
                height="18px"
                $border="1px solid #5849d0"
                $borderradious="50%"
              ></Img>
            );
          })}
      {totalUser > 4 ? totalMoreFour() : emptyProfile()}
    </Wrap>
  );
}
