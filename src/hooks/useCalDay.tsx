import { useState, useEffect } from "react";

export default function useCalDay(timestamp: string): string {
  const [timeState, setTimeState] = useState<string>("");

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
