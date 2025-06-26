import { useState, useEffect } from "react";

export default function useCalDay(timestamp: string): string {
  const [timeState, setTimeState] = useState<string>("");

  const updateTimeStamp = () => {
    const targetDate = new Date(timestamp);
    const now = new Date();

    // 오늘 날짜 가져오기 (시간 0시 0분 0초)
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    // 비교할 날짜 가져오기 (시간 0시 0분 0초)
    const target = Date.UTC(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );
    console.log(today, target);

    const days = Math.floor((target - today) / (1000 * 60 * 60 * 24));
    if (days === 0) {
      setTimeState(`D-DAY`);
    } else {
      setTimeState(`D-${days}`);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeState;
}
