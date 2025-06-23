import styled from "styled-components";
import Marker from "../../../assets/images/common/위치마커.png";
import { Map, MapMarker, useKakaoLoader, Circle } from "react-kakao-maps-sdk";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3%;
  width: 100%;
  height: 65%;
  margin-top: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 70%;
  height: 20%;
  max-width: 370px;
  background-color: #e8edff;
  border-radius: 15px;
  padding: 15px;
`;
const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 80%;
`;
const Title = styled.p`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;
const Location = styled.p``;

type MainProps = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  center: { lat: number; lng: number };
  setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  position: { lat: number; lng: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
};

const Main = ({
  address,
  setAddress,
  center,
  setCenter,
  position,
  setPosition,
}: MainProps) => {
  // const [address, setAddress] = useState("");

  const [loading] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAOMAP_KEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  // 지도 중심
  // const [center, setCenter] = useState<{ lat: number; lng: number }>({
  //   lat: 33.450701,
  //   lng: 126.570667,
  // });

  // // 현재 위치
  // const [position, setPosition] = useState<{ lat: number; lng: number }>({
  //   lat: 33.450701,
  //   lng: 126.570667,
  // });

  useEffect(() => {
    if (!loading) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCenter({ lat, lng });
        setPosition({ lat, lng });
      });
    }
  }, [loading]);

  useEffect(() => {
    if (loading && position) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const roadAddr = result[0].road_address?.address_name;
        const jibunAddr = result[0].address?.address_name;

        setAddress(roadAddr || jibunAddr || "주소를 찾을 수 없어요");
      }
    });
  }, [loading, position]);

  return (
    <Wrapper>
      <MapWrapper>
        <Map
          style={{
            width: "100%",
            height: "70%",
            zIndex: "0",
          }}
          id="map"
          center={center}
          level={5}
        >
          <MapMarker
            image={{
              src: Marker,
              size: { width: 34, height: 48 },
            }}
            position={position}
          />
          <Circle
            center={position} // 원 중심 좌표
            radius={750} // 반경 (미터 단위)
            strokeWeight={0} // 테두리 두께
            fillColor={"#5849D0"} // 원 안쪽 색
            fillOpacity={0.15} // 원 안쪽 투명도
          />
        </Map>
        <Info>
          <Title>현재 위치</Title>
          <Location>{address}</Location>
        </Info>
      </MapWrapper>
    </Wrapper>
  );
};

export default Main;
