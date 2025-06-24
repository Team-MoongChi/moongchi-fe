import styled from "styled-components";
import RHeart25 from "../../../assets/images/userScore/리더하트25.png";
import RHeart50 from "../../../assets/images/userScore/리더하트50.png";
import RHeart75 from "../../../assets/images/userScore/리더하트75.png";
import RHeart100 from "../../../assets/images/userScore/리더하트100.png";
import FHeart25 from "../../../assets/images/userScore/팔로워하트25.png";
import FHeart50 from "../../../assets/images/userScore/팔로워하트50.png";
import FHeart75 from "../../../assets/images/userScore/팔로워하트75.png";
import FHeart100 from "../../../assets/images/userScore/팔로워하트100.png";
import loadingImg from "../../../assets/images/moongchies/로딩중.gif";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  width: 90%;
  height: 60%;
  min-height: 180px;
  max-height: 220px;
  background-color: #e8edff;
  border-radius: 0px 20px 20px 20px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const Img = styled.img`
  width: 30%;
  max-width: 100px;
  background-color: white;
  border-radius: 50px;
  object-fit: cover;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Nickname = styled.p`
  font-size: clamp(18px, 2vw, 20px);
  font-family: DunggeunmisoBold;
  color: #5849d0;
  padding-bottom: 10px;
`;
const ReaderGage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(13px, 2vw, 16px);

  p {
    color: #ff6f6f;
  }
`;
const FollowerGage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(13px, 2vw, 16px);

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
  gap: 2%;
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22%;
  height: 30px;
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-family: DunggeunmisoBold;
  font-size: 0.7em;
`;
const NotReview = styled.div`
  color: #8c8cd9;
  font-size: 18px;
  background-color: #eff3ff;
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = styled.img`
  width: 200px;
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

// const review = [
//   "친절해요",
//   "설명과 같아요",
//   "또 거래하고 싶어요",
//   "믿을 수 있어요",
// ];

const Profile = ({ readerId }: { readerId: number }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등
    // setLoading(true);

    fetch(`https://api.moong-chi.com/api/users/${readerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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
        setLoading(false);
        setReviews(result.reviewKeywordDto.keywords);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  const ReaderHeart = (gage: number) => {
    if (gage < 26) {
      return RHeart25;
    } else if (gage < 51) {
      return RHeart50;
    } else if (gage < 76) {
      return RHeart75;
    } else if (gage < 101) {
      return RHeart100;
    }
  };

  const FollowerHeart = (gage: number) => {
    if (gage < 26) {
      return FHeart25;
    } else if (gage < 51) {
      return FHeart50;
    } else if (gage < 76) {
      return FHeart75;
    } else if (gage < 101) {
      return FHeart100;
    }
  };

  const keywordChange = (original: string) => {
    switch (original) {
      case "친절해요":
        return "친절해요";
      case "약속 시간을 지켰어요":
        return "시간준수";
      case "채팅 응답이 빨라요":
        return "빠른응답";
      case "설명과 같아요":
        return "설명일치";
      case "믿을 수 있어요":
        return "신뢰해요";
      case "가격∙수량이 확실해요":
        return "물건확실";
      case "또 거래하고 싶어요":
        return "매우만족";
      default:
        return original; // 해당되지 않으면 원문 반환
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingWrapper>
          <Loading src={loadingImg} />
        </LoadingWrapper>
      ) : (
        <>
          <InfoWrapper>
            <Img src={userData?.profileUrl} />
            <Info>
              <Nickname>{userData?.nickname}</Nickname>
              <ReaderGage>
                <HeartImg src={ReaderHeart(userData?.mannerLeader || 0)} />
                <p>리더 게이지</p>
                <p
                  style={{
                    paddingLeft: "15px",
                    fontFamily: "DunggeunmisoBold",
                  }}
                >
                  {userData?.mannerLeader}%
                </p>
              </ReaderGage>
              <FollowerGage>
                <HeartImg
                  src={FollowerHeart(userData?.mannerParticipant || 0)}
                />
                <p>팔로워 게이지</p>
                <p style={{ fontFamily: "DunggeunmisoBold" }}>
                  {userData?.mannerParticipant}%
                </p>
              </FollowerGage>
            </Info>
          </InfoWrapper>
          <Tags>
            {reviews?.length !== 0 ? (
              reviews?.map((review: string, index) => (
                <Tag key={index}>#{keywordChange(review)}</Tag>
              ))
            ) : (
              <NotReview>아직 리뷰가 없어요!</NotReview>
            )}
          </Tags>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
