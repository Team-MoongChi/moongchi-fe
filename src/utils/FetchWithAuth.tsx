// src/utils/fetchWithAuth.ts
export const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit,
  retry = true
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = new Headers(init?.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const baseURL = "http://localhost:8080";
  try {
    const res = await fetch(`${baseURL}${input}`, {
      ...init,
      headers,
      credentials: "include",
    });

    if (res.status === 401 && retry) {
      // accessToken 만료 → 재발급 시도
      const reissueRes = await fetch("/api/auth/reissue", {
        method: "POST",
        credentials: "include", // 쿠키로 refreshToken 전송
      });

      if (reissueRes.ok) {
        const data = await reissueRes.json();
        const newToken = data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // 재시도
        const retryHeaders = new Headers(init?.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newToken}`);

        return fetch(input, {
          ...init,
          headers: retryHeaders,
          credentials: "include",
        });
      } else {
        // 재발급 실패 → 로그인 페이지로 리다이렉트
        localStorage.removeItem("accessToken");
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
          window.location.href = "/start";
        } else {
          window.location.href = "/start";
          alert("로그인을 진행해주세요.");
        }

        throw new Error("Token reissue failed");
      }
    }

    return res;
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    throw error;
  }
};
