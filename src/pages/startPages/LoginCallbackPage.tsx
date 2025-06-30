import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://api.moong-chi.com/api/auth/token",
          {
            method: "POST",
            credentials: "include", // 쿠키 포함
            headers: {
              "Content-Type": "application/json",
            },
            // body가 없으면 생략 가능
          }
        );

        if (!response.ok) {
          throw new Error("토큰 요청 실패");
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          navigate("/"); // 홈 또는 원하는 페이지로 이동
        }
      } catch (error) {
        console.error("토큰 요청 실패:", error);
      }
    };

    fetchToken();
  }, []);

  return null;
};

export default LoginCallbackPage;
