import styled from "styled-components";
import heartOn from "../../../assets/images/common/누른하트.png";
import heartOff from "../../../assets/images/common/안누른하트.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7d2fe;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 85px;
  padding: 10px 10px 15px 10px;
  gap: 4%;
  bottom: 0;
`;
const LikeButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #5849d0;
`;
const DetailButton = styled.a`
  width: 30%;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e8edff;
  color: #5849d0;
  font-size: 18px;
  font-family: DunggeunmisoBold;
`;
const CreateButton = styled.button`
  width: 50%;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5849d0;
  color: white;
  font-size: 18px;
  font-family: DunggeunmisoBold;
`;
const HeartImg = styled.img`
  width: 43px;
`;

interface Props {
  link: string | undefined;
  itemId: number | undefined;
  imgUrl: string | undefined;
  name: string | undefined;
  category: string | undefined;
  price: number | undefined;
  likeCount: number | undefined;
}

interface LikeItem {
  id: number;
  imgUrl: string;
  largeCategory: string;
  mediumCategory: string;
  name: string;
  price: number;
  productUrl: string;
  rating: number;
  smallCategory: string;
}

const Nav = ({
  link,
  itemId,
  imgUrl,
  name,
  category,
  likeCount,
  price,
}: Props) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeC, setLikeC] = useState<number | undefined>(likeCount);

  const handleButton = () => {
    let categoryId = 0;
    if (category === "신선식품") {
      categoryId = 1;
    } else if (category === "가공식품") {
      categoryId = 2;
    } else if (category === "주방용품") {
      categoryId = 3;
    } else if (category === "생활용품") {
      categoryId = 4;
    }

    navigate("/gonggu/write", {
      state: {
        message: "shop",
        productId: itemId,
        imgUrl: imgUrl,
        name: name,
        categoryId: categoryId,
        price: price,
      },
    });
  };

  useEffect(() => {
    if (!itemId) return;
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context

    fetchWithAuth(`/api/products/like`, {
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
        console.log(result);
        setIsLike(result.some((item: LikeItem) => item.id === itemId));
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [itemId]);

  const handleLike = () => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth(`/api/products/${itemId}/like`, {
      method: "POST",
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
        setIsLike(true);
        if (likeC) setLikeC(likeC + 1);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  const handleUnlike = () => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth(`/api/products/${itemId}/like`, {
      method: "DELETE",
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
        setIsLike(false);
        if (likeC) setLikeC(likeC - 1);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  return (
    <Wrapper>
      <LikeButton onClick={() => (isLike ? handleUnlike() : handleLike())}>
        <HeartImg src={isLike ? heartOn : heartOff} alt="" />
        <p style={{ fontFamily: "DunggeunmisoBold" }}>{likeCount}</p>
      </LikeButton>
      <DetailButton href={link}>제품 상세</DetailButton>
      <CreateButton onClick={() => handleButton()}>
        공구방 생성하기
      </CreateButton>
    </Wrapper>
  );
};

export default Nav;
