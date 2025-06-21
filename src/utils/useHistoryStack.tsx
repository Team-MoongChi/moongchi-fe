// hooks/useHistoryStack.ts
import { useLocation } from "react-router-dom";

const HISTORY_KEY = "historyStack";
const MAX_HISTORY_LENGTH = 10;

export function useHistoryStack() {
  const location = useLocation();

  const getCurrentPath = () =>
    location.pathname + location.search + location.hash;

  const getStack = (): string[] => {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    // console.log("스택", raw);
    return raw ? JSON.parse(raw) : [];
  };

  const push = (path?: string) => {
    const stack = getStack();
    const fullPath = path || getCurrentPath();

    // 현재 페이지가 중복으로 들어가는 걸 방지
    if (stack[stack.length - 1] !== fullPath) {
      stack.push(fullPath);

      // 스택 길이 제한
      if (stack.length > MAX_HISTORY_LENGTH) {
        stack.shift(); // 제일 앞에꺼 제거
      }

      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(stack));
    }
  };

  const pop = (): string | null => {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return null;

    const stack = JSON.parse(raw);
    const prev = stack.pop(); // 마지막 하나 꺼내기
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(stack));

    return prev ?? null;
  };

  const clear = () => {
    sessionStorage.removeItem(HISTORY_KEY);
  };

  return { push, pop, clear };
}
