import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import Button from "../../components/myPages/LocationPage/Button";
import { useState, useEffect } from "react";
import Marker from "../../assets/images/common/위치마커.png";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker, useKakaoLoader, Circle } from "react-kakao-maps-sdk";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 75%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 77%;
  height: 12%;
  max-width: 600px;
  background-color: #e8edff;
  border-radius: 15px;
  padding: 15px;
`;
const Title = styled.p`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;
const Location = styled.p``;

const LocationPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAOMAP_KEY,
    libraries: ["services", "clusterer", "drawing"],
  });

  // 지도 중심
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 현재 위치
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

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

  const handleClick = () => {
    const token = localStorage.getItem("access_token");
    fetchWithAuth("/api/users/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // withCredentials: true 역할
      body: JSON.stringify({
        address,
        latitude: position.lat,
        longitude: position.lng,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      console.log("POST 성공!", response);
      navigate("/mypage");
    });
  };

  return (
    <Wrapper $isSmall={small}>
      <Header title="주소 설정" route="/mypage" />
      <MapWrapper>
        <Map
          style={{
            width: "100%",
            height: "50%",
            zIndex: "0",
            marginTop: "50px",
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
            radius={500} // 반경 (미터 단위)
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
      <Button text="완료" onClick={handleClick} disable={true} />
    </Wrapper>
  );
};

export default LocationPage;
