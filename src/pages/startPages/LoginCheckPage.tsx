import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCheckPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1) /api/auth/users에서 사용자 정보 받아오기
    fetch("http://localhost:8080/api/users/basic", {
      method: "GET",
      credentials: "include", // withCredentials: true 역할
    })
      .then((res) => {
        if (!res.ok) throw new Error("사용자 정보 요청 실패");
        return res.json();
      })
      .then((data) => {
        const { email, name } = data;
        if (email && name) {
          // 2) 받은 정보로 회원가입 API 호출
          return fetch("http://localhost:8080/api/users", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name }),
          });
        } else {
          throw new Error("회원정보를 불러오지 못했습니다.");
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error("회원가입 요청 실패");
        return res.json();
      })
      .then((data) => {
        const accessToken = data.accessToken;
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
          navigate("/location");
        }
      })
      .catch((err) => {
        console.error("회원가입 과정 중 오류 발생:", err);
      });
  }, [navigate]);

  return null; // 혹은 로딩 중 표시하는 컴포넌트 넣어도 됨
};

export default LoginCheckPage;
