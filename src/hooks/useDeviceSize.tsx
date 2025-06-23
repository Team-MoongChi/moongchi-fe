import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
  const small: boolean = useMediaQuery({ query: "(max-width: 768px)" });
  const large: boolean = useMediaQuery({ query: "(min-width: 769px)" });

  return { small, large };
}
