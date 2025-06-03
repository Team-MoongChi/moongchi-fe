import styled from "styled-components";
import useDeviceSize from "../../../useDeviceSize";

const Wrap = styled.div<{ isSmall: boolean }>`
    width: ${(props) => (props.isSmall ? "100%" : "50%")};
    position: fixed;
    bottom: 0;
    display: flex;
    padding: 2% 5%;
    border-top: 1px solid #C7D2FE;
    background-color: white;
`
const Button = styled.div`
    background-color: #5849d0;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding: 20px 50px;
    border-radius: 15px;
`

export default function Footer() {
    const { small, large } = useDeviceSize();

    return (
        <Wrap isSmall={small}>
            <Button>공구 함께하기</Button>
        </Wrap>
    );
}