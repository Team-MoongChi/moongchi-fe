import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const Wrapper = styled.div`
  width: 90%;
  height: 40%;
  background-color: #e8edff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  width: 95%;
  height: 20%;
  border-bottom: 1px solid white;
  cursor: pointer;

  p {
    font-family: DunggeunmisoBold;
    font-size: 20px;
    padding-left: 8px;
    color: #5849d0;
  }
`;

const Menu = () => {
  const navigate = useNavigate();

  const handleButton = (link: string) => {
    navigate(link);
  };
  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    fetchWithAuth("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // withCredentials: true 역할
    }).then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      alert("로그아웃 되었습니다.");
      localStorage.removeItem("accessToken");
      navigate("/start");
    });
  };

  return (
    <Wrapper>
      <Button
        onClick={() => {
          handleButton("/mypage/edit");
        }}
      >
        <p>프로필 수정</p>
      </Button>
      <Button
        onClick={() => {
          handleButton("/mypage/location");
        }}
      >
        <p>주소 설정</p>
      </Button>
      <Button
        onClick={() => {
          handleButton("/mypage/myGonggu");
        }}
      >
        <p>내가 올린 공구</p>
      </Button>
      <Button
        onClick={() => {
          handleButton("/mypage/interest");
        }}
      >
        <p>관심 목록</p>
      </Button>
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        <p style={{ color: "#ED5959" }}>로그아웃</p>
      </Button>
    </Wrapper>
  );
};

export default Menu;
