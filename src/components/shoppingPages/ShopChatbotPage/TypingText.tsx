import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

type Props = {
  text: string;
  speed: number;
  goToBottom: () => void;
};

const TypingMarkdown = ({ text, speed, goToBottom }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0); // 텍스트 바뀌면 인덱스 초기화
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= text.length) clearInterval(interval);
        return next;
      });
      goToBottom();
    }, speed);

    return () => clearInterval(interval);
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
