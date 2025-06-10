import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/myPages/LocationPage/Header";
import Main from "../../components/myPages/LocationPage/Main";
import Button from "../../components/myPages/LocationPage/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImg = styled.button`
  margin-top: 120px;

  img {
    width: 160px;
    height: 160px;
    border: 5px solid #c7d2fe;
    border-radius: 100px;
  }
`;

const LocationPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mypage");
  };

  return (
    <Wrapper $isSmall={small}>
      <Header />
      <Main />
      <Button text="완료" onClick={handleClick} disable={true} />
    </Wrapper>
  );
};

export default LocationPage;
