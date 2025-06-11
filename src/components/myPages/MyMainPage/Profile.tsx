import styled from "styled-components";
import RHeart25 from "../../../assets/images/userScore/리더하트25.png";
import RHeart50 from "../../../assets/images/userScore/리더하트50.png";
import RHeart75 from "../../../assets/images/userScore/리더하트75.png";
import RHeart100 from "../../../assets/images/userScore/리더하트100.png";
import FHeart25 from "../../../assets/images/userScore/팔로워하트25.png";
import FHeart50 from "../../../assets/images/userScore/팔로워하트50.png";
import FHeart75 from "../../../assets/images/userScore/팔로워하트75.png";
import FHeart100 from "../../../assets/images/userScore/팔로워하트100.png";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const Wrapper = styled.div`
  width: 90%;
  height: 28%;
  max-height: 220px;
  background-color: #e8edff;
  margin-top: 90px;
  border-radius: 20px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 33px;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50px;
  object-fit: cover;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Nickname = styled.p`
  font-size: 20px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
  padding-bottom: 10px;
`;
const ReaderGage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    color: #ff6f6f;
  }
`;
const FollowerGage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    color: #3d84ff;
  }
`;
const HeartImg = styled.img`
  width: 30px;
`;
const Tags = styled.div`
  display: flex;
  justify-content: center;
  gap: 4%;
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  background-color: #5849d0;
  border-radius: 20px;
  color: white;
  font-family: DunggeunmisoBold;
  font-size: 13px;
`;

type UserData = {
  email: string;
  id: number;
  latitude: number;
  longitude: number;
  mannerLeader: number;
  mannerParticipant: number;
  nickname: string;
  profileUrl: string;
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // 예: 401, 404, 500 등일 때
          throw new Error(`서버 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setUserData(result);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper>
      <InfoWrapper>
        <Img src={userData?.profileUrl} />
        <Info>
          <Nickname>{userData?.nickname}</Nickname>
          <ReaderGage>
            <HeartImg src={RHeart50} />
            <p>리더 게이지</p>
            <p style={{ paddingLeft: "15px", fontFamily: "DunggeunmisoBold" }}>
              {userData?.mannerLeader}%
            </p>
          </ReaderGage>
          <FollowerGage>
            <HeartImg src={FHeart75} />
            <p>팔로워 게이지</p>
            <p style={{ fontFamily: "DunggeunmisoBold" }}>
              {userData?.mannerParticipant}%
            </p>
          </FollowerGage>
        </Info>
      </InfoWrapper>
      <Tags>
        <Tag># 예의</Tag>
        <Tag># 친절</Tag>
        <Tag># 신속</Tag>
        <Tag># 집앞</Tag>
      </Tags>
    </Wrapper>
  );
};

export default Profile;
