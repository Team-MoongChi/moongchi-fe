import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

export default function ChatPayResult() {
  const navigate = useNavigate();

  const { chatRoomId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const imp_uid = query.get("imp_uid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imp_uid) {
      alert("결제 정보가 없습니다.");
      setLoading(false);
      navigate("/");
      return;
    }
    const verifyPayment = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/chat/rooms/${chatRoomId}/pay`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ impUid: imp_uid }),
          }
        );

        if (response.ok) {
          alert("결제성공");
          navigate(`/chat/${chatRoomId}/pay`);
        } else {
          alert("결제 검증 실패");
        }
      } catch (e) {
        alert("서버 오류로 결제를 검증하지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [imp_uid, chatRoomId]);

  useEffect(() => {
    console.log("impUid", imp_uid);
  }, [imp_uid]);

  if (loading) return <div>결제 검증 중...</div>;
}
