import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

type Props = {
  text: string;
  speed: number;
  goToBottom: () => void;
};

const TypingMarkdown = ({ text, speed, goToBottom }: Props) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed(""); // 초기화

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => {
          const next = prev + text[i]; // 정확히 i번째 문자 하나만 추가
          return next;
        });
        i += 1;

        // goToBottom도 여기서
        if (i % 5 === 0 || i === text.length) {
          goToBottom();
        }
      } else {
        clearInterval(interval);
      }
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
      {displayed}
    </Markdown>
  );
};

export default TypingMarkdown;
