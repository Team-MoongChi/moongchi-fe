import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { Text } from "../../components/common/styled-component/Text";
import { fetchWithAuth } from "../../utils/FetchWithAuth";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 5%;
`;
const Button = styled.div`
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;
const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;
const Tag = styled.div<{ $backgroundcolor: string }>`
  background-color: ${(props) => props.$backgroundcolor};
  border-radius: 15px;
  padding: 3% 5%;
`;

type Review = {
  star: number;
  keywords: string[];
  review: string;
};

export default function OneReviewPage() {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const { chatRoomId, targetParticipantId } = useParams();
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("nickname");

  const keywordsList = [
    "친절해요",
    "약속 시간을 지켰어요",
    "응답이 빨라요",
    "설명과 같아요",
    "믿을 수 있어요",
    "가격, 수량이 동일해요",
    "또 거래하고 싶어요",
  ];

  const [isClicked, setIsClicked] = useState<boolean[]>(Array(7).fill(false));
  const [review, setReview] = useState<Review>({
    star: 0,
    keywords: [],
    review: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickHandler = (index: number, sentence: string) => {
    setIsClicked((prev) =>
      prev.map((clicked, idx) =>
        idx === index && clicked === true
          ? false
          : idx === index && clicked === false
          ? true
          : clicked
      )
    );

    setReview((prev) => {
      const hasSentence = prev.keywords.includes(sentence);

      return {
        ...prev,
        keywords: hasSentence
          ? prev.keywords.filter((s) => s !== sentence)
          : [...prev.keywords, sentence],
      };
    });
  };

  useEffect(() => {
    console.log("review 변경:", review);
  }, [review]);

  {
    /* /api/chat/rooms/{chatRoomId}/reviews/{targetParticipantId} */
  }
  const submitReview = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    const response = await fetchWithAuth(
      `/api/chat/rooms/${chatRoomId}/reviews/${targetParticipantId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    );
    if (response.ok) {
      alert("리뷰 작성 완료!");
      console.log(review);
      navigate(`/chat/${chatRoomId}/review`);
    }
  };

  console.log(isClicked);

  return (
    <Wrap $issmall={small} $gap="20px">
      <Header title="리뷰 작성" />
      <Body>
        <div>{nickname}님과의 공구는</div>
        <input
          name="star"
          type="number"
          required
          onChange={changeHandler}
          min="0.5"
          max="5"
          step="0.5"
        ></input>
        <TagWrap>
          {keywordsList.map((keyword, idx) => (
            <Tag
              key={idx}
              $backgroundcolor={isClicked[idx] ? "#5849d0" : "#e8edff"}
              onClick={() => clickHandler(idx, keyword)}
            >
              <Text
                fontSize="15px"
                fontWeight={isClicked[idx] ? "bold" : "inherit"}
                // fontFamily={isClicked[idx] ? "DunggeunmisoBold" : "inherit"}
                color={isClicked[idx] ? "white" : "#5849d0"}
              >
                {keyword}
              </Text>
            </Tag>
          ))}
        </TagWrap>
        <input
          name="review"
          type="textarea"
          placeholder="리뷰를 작성해주세요"
          onChange={changeHandler}
        ></input>
        <Button onClick={submitReview}>작성 완료</Button>
      </Body>
    </Wrap>
  );
}
