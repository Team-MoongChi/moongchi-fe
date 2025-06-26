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
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text.slice(i, i + 1));
        i += 1;
        goToBottom();
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
