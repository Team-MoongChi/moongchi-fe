import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useKakaoMap from "../../../hooks/useKakaoMap";
import marker from "../../../assets/images/common/위치마커.png";

interface TradeSpaceProps {
  location: string;
}

export default function TradeSpace(props: TradeSpaceProps) {
  const [loading] = useKakaoMap();

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    if (loading) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(props.location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };

        setCenter(coords);
      }
    });
  }, [loading]);

  return (
    <Map
      center={center}
      draggable={false}
      level={3}
      style={{
        width: "100%",
        height: "200px",
        border: "1px solid #dbdbdb",
        borderRadius: "15px",
      }}
    >
      <MapMarker
        position={center}
        image={{
          src: marker,
          size: { width: 34, height: 48 },
        }}
      ></MapMarker>
    </Map>
  );
}
