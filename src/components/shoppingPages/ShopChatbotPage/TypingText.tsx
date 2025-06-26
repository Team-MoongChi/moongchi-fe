import { useEffect, useState, useRef } from "react";
import Markdown from "markdown-to-jsx";

type Props = {
  text: string;
  speed: number;
  goToBottom: () => void;
};

const TypingMarkdown = ({ text, speed, goToBottom }: Props) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0); // 글자 인덱스 초기화

    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 이전 인터벌 정리
    }

    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        // 일정 주기로 goToBottom 호출
        if (next % 5 === 0 || next === text.length) {
          goToBottom();
        }

        return next;
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  return (
    <Markdown
      style={{
        lineHeight: "1.5",
        textAlign: "start",
        wordBreak: "keep-all",
        whiteSpace: "pre-wrap",
      }}
    >
      {text.slice(0, index)}
    </Markdown>
  );
};

export default TypingMarkdown;
