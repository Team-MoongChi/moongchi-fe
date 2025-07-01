import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

export default function ChatPayResult() {
  const navigate = useNavigate();

  const { chatRoomId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const imp_uid = query.get("imp_uid");

  useEffect(() => {
    if (!imp_uid) {
      alert("결제 정보가 없습니다.");
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
          alert("결제 성공!");
          navigate(`/chat/${chatRoomId}/pay`);
        } else {
          alert("결제 검증 실패. 다시 시도해주세요.");
          navigate(`/chat/${chatRoomId}/pay`);
        }
      } catch (e) {
        alert("서버 오류로 결제를 검증하지 못했습니다.");
      }
    };

    verifyPayment();
  }, [imp_uid, chatRoomId]);
}
