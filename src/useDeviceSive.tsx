import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
  const small: boolean = useMediaQuery({ query: "(max-width: 767px)" });
  const large: boolean = useMediaQuery({ query: "(min-width: 768px)" });

  return { small, large };
}
