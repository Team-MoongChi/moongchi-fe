import { useState, useEffect } from "react";

export default function useChatTime(timestamp: string): string {
  const [timeState, setTimeState] = useState<string>("");

  const updateChatTime = () => {
    const targetDate = new Date(timestamp);
    const now = new Date();

    // 오늘 날짜 가져오기 (시간 0시 0분 0초)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 어제 날짜 가져오기 (시간 0시 0분 0초)
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 비교할 날짜 가져오기 (시간 0시 0분 0초)
    const target = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );

    if (target.getTime() === today.getTime()) {
      // 오늘
      const pastMilliseconds = new Date(timestamp).getTime();
      const time = new Date(pastMilliseconds).toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "2-digit",
        second: undefined,
      });
      setTimeState(time);
    } else if (target.getTime() === yesterday.getTime()) {
      // 어제
      setTimeState("어제");
    } else {
      const date = timestamp.split("T")[0];
      setTimeState(date);
    }
  };

  useEffect(() => {
    updateChatTime();
  }, [timestamp]);

  return timeState;
}
