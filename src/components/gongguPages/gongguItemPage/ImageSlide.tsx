import styled from "styled-components";

const Wrap = styled.div`
    background-color: #e7e7e7;
    width: 100%;
    height: 350px;
    position: relative;
`
const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  background-image: linear-gradient(to top, rgba(115, 115, 115, 0.4) 0%, rgba(126, 126, 126, 0.3) 20%,
                                    rgba(172, 172, 172, 0.2) 50%, rgba(209, 209, 209, 0.1) 80%, rgba(255, 255, 255, 0) 100%);
  padding: 20px;
  position: absolute;
  height: 10%;
`

export default function ImageSlide() {
    return (
        <Wrap>
            <Bottom></Bottom>
        </Wrap>
    );
}