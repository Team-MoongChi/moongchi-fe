import { useState, useEffect } from "react";

export default function useTimeStamp(timestamp: string): string {
  const [timeState, setTimeState] = useState("");

  const updateTimeStamp = () => {
    const timeAgo = Math.floor(
      (new Date().getTime() - new Date(timestamp).getTime()) / 1000
    );

    if (timeAgo < 60) {
      setTimeState(`${timeAgo}초 전`);
    } else if (timeAgo < 60 * 60) {
      const minutes = Math.floor(timeAgo / 60);
      setTimeState(`${minutes}분 전`);
    } else if (timeAgo < 60 * 60 * 24) {
      const hours = Math.floor(timeAgo / (60 * 60));
      setTimeState(`${hours}시간 전`);
    } else if (timeAgo < 60 * 60 * 24 * 7) {
      const days = Math.floor(timeAgo / (60 * 60 * 24));
      setTimeState(`${days}일 전`);
    } else if (timeAgo < 60 * 60 * 24 * 7 * 30) {
      const months = Math.floor(timeAgo / (60 * 60 * 24 * 7));
      setTimeState(`${months}개월 전`);
    } else {
      const years = Math.floor(timeAgo / (60 * 60 * 24 * 7 * 30));
      setTimeState(`${years}년 전`);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeState;
}

export function useCalDay(timestamp: string): string {
  const [timeState, setTimeState] = useState("");

  const updateTimeStamp = () => {
    const timeLeft = Math.floor(
      (new Date(timestamp).getTime() - new Date().getTime()) / 1000
    );

    const days = Math.floor(timeLeft / (60 * 60 * 24));
    setTimeState(`D-${days}`);
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeState;
}
