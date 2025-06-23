import styled from "styled-components";
import Header from "../../components/common/Header.tsx";
import Main from "../../components/shoppingPages/ShopChatbotPage/Main.tsx";
import Nav from "../../components/shoppingPages/ShopChatbotPage/Nav.tsx";
import useDeviceSize from "../../useDeviceSize.tsx";
import { useEffect, useState, useRef } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth.tsx";

//isSmall에 $ 붙이는 이유: styled-components에서 $가 붙은 props는 DOM에 넘기지 않음
//styled 내부에서만 쓸 값이면 꼭 $ 붙이기
const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  margin: auto;
  position: relative;
  min-height: 100vh;
`;

type Chat = {
  status: number; //0이면 AI, 1이면 유저
  text: string;
  imgUrls?: string[];
  productIds?: number[];
};

type User = {
  name: string;
  birth: string;
  gender: string;
};

type Item = {
  category_name: string;
  img_url: string;
  name: string;
  price: number;
  product_id: number;
  product_url: string;
};

const ShopChatbotPage = () => {
  const { small } = useDeviceSize();
  const [chattings, setChattings] = useState<Chat[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") ?? "";
  const keywordInserted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    birth: "",
    gender: "",
  });

  const sendToAI = (text: string, user: User) => {
    setLoading(true);

    const loadingChat: Chat = {
      status: 0,
      text: "",
    };
    setChattings((prev) => [...prev, loadingChat]);

    fetch("http://api-victus.registry-hj.site:8080/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        user_profile: user,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const products = result.recommended_products || []; // 혹시 없을 수도 있으니 기본값 줘

        const imgUrls = products.map((item: Item) => item.img_url);
        const productIds = products.map((item: Item) => item.product_id);
        const newChatAI: Chat = {
          status: 0,
          text: result.bot_response,
          imgUrls,
          productIds,
        };
        setChattings((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((c) => c.text === "");
          if (idx !== -1) updated[idx] = newChatAI;
          return updated;
        });
      })
      .catch((err) => console.error("AI 응답 실패:", err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (keyword.trim() === "" || keywordInserted.current) return;

    keywordInserted.current = true;

    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // 예: 401, 404, 500 등일 때
          throw new Error(`서버 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const userInfo = {
          name: result.name,
          birth: result.birth,
          gender: result.gender,
        };
        setUser(userInfo);

        const newChat: Chat = {
          status: 1,
          text: keyword.trim(),
        };
        setChattings((prev: Chat[]) => [...prev, newChat]);
        sendToAI(keyword.trim(), userInfo);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
        keywordInserted.current = false;
      });
  }, []);

  console.log(chattings);

  return (
    <Wrapper $isSmall={small}>
      <Header title="AI 뭉치" route="/shopping" />
      <Main chattings={chattings} loading={loading} />
      <Nav setChattings={setChattings} user={user} sendToAI={sendToAI} />
    </Wrapper>
  );
};

export default ShopChatbotPage;
