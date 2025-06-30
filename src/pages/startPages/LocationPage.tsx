import Step from "../../components/startPages/LocationPage/Step";
import Main from "../../components/startPages/LocationPage/Main";
import Button from "../../components/startPages/common/Button";
import styled from "styled-components";
import useDeviceSize from "../../hooks/useDeviceSize";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100dvh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const LocationPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 현재 위치
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 33.450701,
    lng: 126.570667,
  });

  const buttonHandle = () => {
    const token = localStorage.getItem("accessToken");
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
      navigate("/prefer");
    });
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main
        address={address}
        setAddress={setAddress}
        center={center}
        setCenter={setCenter}
        position={position}
        setPosition={setPosition}
      />
      <Button text="다음" onClick={buttonHandle} disable={true} />
    </Wrapper>
  );
};

export default LocationPage;
