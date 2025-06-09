import styled from "styled-components";
import RHeart25 from "../../../assets/images/userScore/리더하트25.png";
import RHeart50 from "../../../assets/images/userScore/리더하트50.png";
import RHeart75 from "../../../assets/images/userScore/리더하트75.png";
import RHeart100 from "../../../assets/images/userScore/리더하트100.png";
import FHeart25 from "../../../assets/images/userScore/팔로워하트25.png";
import FHeart50 from "../../../assets/images/userScore/팔로워하트50.png";
import FHeart75 from "../../../assets/images/userScore/팔로워하트75.png";
import FHeart100 from "../../../assets/images/userScore/팔로워하트100.png";

const Wrapper = styled.div`
  width: 90%;
  height: 28%;
  background-color: #e8edff;
  margin-top: 90px;
  border-radius: 20px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15%;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 33px;
`;
const Img = styled.img`
  width: 93px;
  height: 93px;
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

const Profile = () => {
  return (
    <Wrapper>
      <InfoWrapper>
        <Img src="/pink.png" />
        <Info>
          <Nickname>춤추는 후라이팬</Nickname>
          <ReaderGage>
            <HeartImg src={RHeart50} />
            <p>리더 게이지</p>
            <p style={{ paddingLeft: "15px", fontFamily: "DunggeunmisoBold" }}>
              50%
            </p>
          </ReaderGage>
          <FollowerGage>
            <HeartImg src={FHeart75} />
            <p>팔로워 게이지</p>
            <p style={{ fontFamily: "DunggeunmisoBold" }}>75%</p>
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
