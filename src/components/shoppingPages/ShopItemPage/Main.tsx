import styled from "styled-components";
import { useEffect, useState } from "react";
import ParticipantsProfile from "../../common/ParticipantsProfile";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import sadYellow from "../../../assets/images/moongchies/우는노란뭉치.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100%;
  overflow-y: auto;
`;
const Img = styled.img`
  width: 100%;
  height: 42%;
  background-color: lightgray;
  object-fit: cover;
  margin-top: 50px;
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 20px 10px 20px;
`;
const ItemName = styled.div`
  font-size: 24px;
`;
const Price = styled.div`
  font-size: 24px;
  font-family: DunggeunmisoBold;
  color: #5849d0;
`;
const GongguList = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5%;
  width: 100%;
  padding: 7px 18px 18px 18px;
`;

const Gonggu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff3ff;
  width: 100%;
  height: 80px;
  padding: 15px;
  border-radius: 10px;
`;
const User = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 50%;
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
  max-width: 100px;
  height: 43px;
  border-radius: 15px;
  background-color: #5849d0;
  color: white;
  font-size: 16px;
  line-height: 1;
  gap: 2px;
  margin-left: 5px;
`;
const GongguP = styled.div`
  font-size: 14px;
  color: #5849d0;
  padding-bottom: 5px;
  padding-left: 3px;
`;
const Participant = styled.img`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50px;
  background-color: #c7d2fe;
  object-fit: cover;
`;
const NoGonggu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 100%;
  height: 33%;
  background-color: #e8edff;
  margin-top: 10px;

  img {
    width: 100px;
    margin-bottom: 8px;
  }
  p {
    font-family: DunggeunmisoBold;
    color: #5849d0;
  }
`;

type User = {
  nickname: string;
  profileUrl: string;
};

interface MainProps {
  item: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    productUrl: string;
    rating: number;
    largeCategory: string;
    mediumCategory: string;
    smallCategory: string;
  };
}

interface Participant {
  userId: number;
  role?: string;
  mannerLeader?: number;
  nickname?: number;
  profileUrl: string;
}

interface Gonggu {
  id: number;
  deadline: string;
  totalUser: number;
  currentUsers: number;
  participants: Participant[];
}

const Main = ({ item }: MainProps) => {
  const [gonggus, setGonggus] = useState<Array<Gonggu>>([]);
  const navigate = useNavigate();

  const handleButton = (gongguId: number) => {
    navigate(`/gonggu/list/${gongguId}`, { state: { back: "shop" } });
  };

  useEffect(() => {
    if (!item) return;
    const token = localStorage.getItem("accessToken");
    fetchWithAuth(`/api/products/${item.id}/group-boards`, {
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
        console.log("공구리스트", result);
        setGonggus(result ?? []);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [item]);

  return (
    <Wrapper>
      {item !== null && (
        <>
          <Img src={item.imgUrl}></Img>
          <Info>
            <ItemName>{item.name}</ItemName>
            <Price>{item.price.toLocaleString()}원</Price>
          </Info>
          {gonggus.length !== 0 ? (
            <GongguList>
              <GongguP>공구 참여하러 가기</GongguP>
              {gonggus.map((gonggu) => (
                <Gonggu key={gonggu.id}>
                  <User>
                    <Profile src={gonggu.participants[0].profileUrl}></Profile>
                    <UserName>{gonggu.participants[0].nickname}</UserName>
                  </User>
                  <ParticipantsProfile {...gonggu} />
                  <JoinButton onClick={() => handleButton(gonggu.id)}>
                    <p style={{ fontFamily: "DunggeunmisoBold" }}>참여</p>
                    <p style={{ fontSize: "10px", color: "pink" }}>
                      {gonggu.deadline}
                    </p>
                  </JoinButton>
                </Gonggu>
              ))}
            </GongguList>
          ) : (
            <NoGonggu>
              <img src={sadYellow} alt="" />
              <p>진행 중인 공구가 없어요.</p>
              <p>아래 버튼을 통해 직접 진행해 보세요!</p>
            </NoGonggu>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Main;
