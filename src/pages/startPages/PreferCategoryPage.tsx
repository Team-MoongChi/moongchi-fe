import Step from "../../components/startPages/PreferCategoryPage/Step";
import Main from "../../components/startPages/PreferCategoryPage/Main";
import Button from "../../components/startPages/common/Button";
import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  min-height: 100dvh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const PreferCategoryPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("option1");
  const token = localStorage.getItem("accessToken");

  const buttonHandle = () => {
    fetchWithAuth("/api/users/interest-category", {
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
