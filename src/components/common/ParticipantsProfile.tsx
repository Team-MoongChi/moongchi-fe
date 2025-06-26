import styled from "styled-components";

import { Img } from "./styled-component/Img";
import { Text } from "./styled-component/Text";
import empty from "../../assets/images/common/빈프로필.png";

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

interface Participant {
  userId: number;
  nickname: string;
  profileUrl: string;
  mannerLeader: number;
  role: "LEADER" | "MEMBER";
}
interface Props {
  totalUser: number;
  currentUsers: number;
  participants: Participant[];
}

export default function ParticipantsProfile(props: Props) {
  const totalUser = props.totalUser;
  const currentUsers = props.currentUsers;
  const emptyUser = totalUser - currentUsers;
  const participants = props.participants;

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
      arr.push(<Img key={i - 1} src={empty} width="20px" height="20px"></Img>);
    }
    arr.push(
      <Plus key="5">
        <Text fontSize="10px" color="white">
          +{totalUser - 4}
        </Text>
      </Plus>
    );
    return arr;
  };

  return (
    <Wrap>
      {currentUsers === 5 && totalUser === 5
        ? participants?.map((participant, idx) => {
            return (
              <Img
                key={idx}
                src={participant.profileUrl}
                width="20px"
                height="20px"
                $border="1px solid #5849d0"
                $borderradious="50%"
              ></Img>
            );
          })
        : participants?.slice(0, 4).map((participant, idx) => {
            return (
              <Img
                key={idx}
                src={participant.profileUrl}
                width="20px"
                height="20px"
                $border="1px solid #5849d0"
                $borderradious="50%"
              ></Img>
            );
          })}
      {totalUser > 5 ? totalMoreFive() : emptyProfile()}
    </Wrap>
  );
}
