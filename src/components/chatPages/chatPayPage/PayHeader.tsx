import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { Img } from "../../common/styled-component/Img";
import back from "../../../assets/images/common/뒤로가기.png";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #5849d0;
  padding: 15px;
  border-radius: 0 0 15px 15px;
`;
const BackButton = styled(Img)<{ visibility?: string }>`
  visibility: ${(props) => props.visibility || "visible"};
  cursor: pointer;
`;
const HeaderText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

export default function PayHeader() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();

  return (
    <Wrap>
      <BackButton
        src={back}
        width="15px"
        onClick={() => navigate(`/chat/list/${chatRoomId}`)}
      />
      <HeaderText>1/N 결제 현황</HeaderText>
      <BackButton src={back} width="15px" visibility="hidden" />
    </Wrap>
  );
}
