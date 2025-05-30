import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 89%;
  padding-bottom: 30px;
  overflow-y: auto;
`;
const Img = styled.img`
  width: 100%;
  height: 42%;
  background-color: lightgray;
  object-fit: cover;
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 20px 10px 20px;
`;
const ItemName = styled.div`
  font-size: 20px;
`;
const Price = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
const GongguList = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5%;
  width: 100%;
  height: 30%;
  margin-top: 50px;
  padding: 18px;
`;

const Gonggu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff3ff;
  width: 100%;
  height: 100px;
  padding: 15px;
  border-radius: 10px;
`;
const User = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70%;
  gap: 3%;
`;
const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 200px;
  object-fit: cover;
`;
const UserName = styled.div`
  font-size: 16px;
`;
const JoinButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 23%;
  height: 50px;
  border-radius: 15px;
  background-color: #5849d0;
  color: white;
  font-size: 16px;
`;
const GongguP = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #5849d0;
`;

type Product = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  productUrl: string;
  rating: number;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string | null;
};

const product: Product = {
  id: 1,
  name: "망고 1kg",
  price: 12000,
  imgUrl:
    "https://shop-phinf.pstatic.net/20250514_70/1747218008296jBDI8_JPEG/1772088215457593_1264953615.jpg?type=m510",
  productUrl: "https://example.com/mango",
  rating: 4.8,
  largeCategory: "식품",
  mediumCategory: "과일",
  smallCategory: "열대과일",
};

type Participant = {
  userId: number;
  profileUrl: string;
};

type User = {
  nickname: string;
  profileUrl: string;
};

type Gonggu = {
  user: User;
  participants: Participant[];
  deadline: string;
};

const gonggus: Gonggu[] = [
  {
    user: {
      nickname: "조용한 후라이팬",
      profileUrl:
        "https://shop-phinf.pstatic.net/20220610_16/1654835622697SY1vP_JPEG/55971402389646143_1225557300.jpg?type=m510",
    },
    participants: [
      {
        userId: 1,
        profileUrl: "http:// ..",
      },
      {
        userId: 2,
        profileUrl: "http:// ..",
      },
    ],
    deadline: "2025-06-01",
  },
  {
    user: {
      nickname: "춤추는 앞치마",
      profileUrl:
        "https://shopping-phinf.pstatic.net/main_4412185/44121858715.20241213100329.jpg?type=f640",
    },
    participants: [
      {
        userId: 1,
        profileUrl: "http:// ..",
      },
      {
        userId: 2,
        profileUrl: "http:// ..",
      },
    ],
    deadline: "2025-06-01",
  },
  {
    user: {
      nickname: "심심한 도마",
      profileUrl:
        "https://shop-phinf.pstatic.net/20250422_230/1745317670642oHSDd_JPEG/21270112859955742_1437399076.jpg?type=m510",
    },
    participants: [
      {
        userId: 1,
        profileUrl: "http:// ..",
      },
      {
        userId: 2,
        profileUrl: "http:// ..",
      },
    ],
    deadline: "2025-06-01",
  },
];

const Main = () => {
  return (
    <Wrapper>
      <Img src={product.imgUrl}></Img>
      <Info>
        <ItemName>{product.name}</ItemName>
        <Price>{product.price.toLocaleString()}원</Price>
      </Info>
      <GongguList>
        <GongguP>공구 참여하러 가기</GongguP>
        {gonggus.map((gonggu, index) => (
          <Gonggu key={index}>
            <User>
              <Profile src={gonggu.user.profileUrl}></Profile>
              <UserName>{gonggu.user.nickname}</UserName>
            </User>
            <JoinButton>
              <p>참여</p>
              <p style={{ fontSize: "10px", color: "pink" }}>
                {gonggu.deadline}
              </p>
            </JoinButton>
          </Gonggu>
        ))}
      </GongguList>
    </Wrapper>
  );
};

export default Main;
