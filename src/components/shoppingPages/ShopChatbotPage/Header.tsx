import styled from "styled-components";
import backButton from "../../../assets/images/common/뒤로가기.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: sticky;
  z-index: 1;
  background-color: #5849d0;
  border-radius: 0 0 15px 15px;
  top: 0;
`;
const Title = styled.p<{ $fontSize?: string }>`
  font-size: ${(props) => props.$fontSize || "28px"};
  color: white;
  font-weight: 800;
  text-align: center;
`;
const BackButton = styled.button`
  color: white;
`;
const BackImg = styled.img`
  width: 16px;
`;

interface MainProps {
  title?: string | undefined;
  route?: string | number;
  $fontSize?: string;
}

const Header = (props: MainProps) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    if (typeof props.route === "string") {
      sessionStorage.removeItem("chat-sessionId");
      sessionStorage.removeItem("chat-chatCount");
      sessionStorage.removeItem("chat-chattings");
      navigate(props.route); // 경로 이동
    } else {
      navigate(-1); // 숫자면 뒤로가기
    }
  };

  return (
    <Wrapper>
      <BackButton onClick={handleBackButton}>
        <BackImg src={backButton} alt="" />
      </BackButton>
      <Title $fontSize={props.$fontSize}>{props.title}</Title>
      <BackButton style={{ color: "#5849D0" }}>우와</BackButton>
    </Wrapper>
  );
};

export default Header;
