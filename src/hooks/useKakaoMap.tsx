import { useKakaoLoader } from "react-kakao-maps-sdk";

export default function useKakaoMap() {
  return useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAOMAP_API_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
}
