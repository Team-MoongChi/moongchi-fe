import Step from "../../components/startPages/PreferCategoryPage/Step";
import Main from "../../components/startPages/PreferCategoryPage/Main";
import Button from "../../components/startPages/common/Button";
import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PreferCategoryPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("option1");
  const token = localStorage.getItem("access_token");

  const buttonHandle = () => {
    fetchWithAuth("http://localhost:8080/api/users/interest-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // withCredentials: true 역할
      body: JSON.stringify({
        interestCategory: selected,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      console.log("선호 카테고리 입력 성공!");
      navigate("/");
    });
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main selected={selected} setSelected={setSelected} />
      <Button text="완료" onClick={buttonHandle} disable={true} />
    </Wrapper>
  );
};

export default PreferCategoryPage;
