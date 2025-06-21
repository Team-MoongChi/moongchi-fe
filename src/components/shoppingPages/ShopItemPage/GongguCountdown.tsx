import { useEffect, useState } from "react";

function GongguCountdown({ deadline }: { deadline: string }) {
  const calculateTimeLeft = () => {
    const end = new Date(deadline);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "00:00:00";

    const totalSec = Math.floor(diff / 1000);
    const hours = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSec % 60).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return <span>{time}</span>;
}

export default GongguCountdown;
