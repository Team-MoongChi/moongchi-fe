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
        const currentChar = text[i]; // i번째 문자를 먼저 저장
        setDisplayed((prev) => prev + currentChar);
        i += 1;
      } else {
        clearInterval(interval);
        goToBottom();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, goToBottom]);

  return (
    <Markdown
      style={{
        lineHeight: "1.5",
        textAlign: "start",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      }}
    >
      {displayed}
    </Markdown>
  );
};

export default TypingMarkdown;
