import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

export default function ChatPayResult() {
  const navigate = useNavigate();

  const { chatRoomId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const impUid = query.get("imp_uid");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!impUid) {
      setMessage("결제 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/chat/rooms/${chatRoomId}/pay`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ impUid: impUid }),
          }
        );

        if (response.ok) {
          setMessage("결제 성공!");
          alert("결제성공");
          navigate(`/chat/${chatRoomId}/pay`);
        } else {
          setMessage("결제 검증 실패");
        }
      } catch (e) {
        setMessage("서버 오류로 결제를 검증하지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [impUid, chatRoomId]);

  if (loading) return <div>결제 검증 중...</div>;
  return <div>{message}</div>;
}
