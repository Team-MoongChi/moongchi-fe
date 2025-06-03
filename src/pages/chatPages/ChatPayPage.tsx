import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { Link } from "react-router-dom";

const Wrap = styled.div<{ isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.isSmall ? "100%" : "50%")};
  /* height: 100%; */
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.div`
    background-color: #5849d0;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    padding: 20px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
`

export default function ChatPayPage() {
    const {small, large} = useDeviceSize();

    return (
        <Wrap isSmall={small}>
            <StyledLink to="/chat/review">
                <Button>결제하기</Button>
            </StyledLink>
        </Wrap>
        
    );
}