import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import useDeviceSize from "../../hooks/useDeviceSize";
import Header from "../../components/common/Header";
import { Wrap } from "../../components/common/styled-component/Wrap";
import { Text } from "../../components/common/styled-component/Text";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import StarRating from "../../components/chatPages/oneReviewPage/StarRating";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: auto;
  padding: 20px 5%;
`;
const Highlight = styled.span`
  color: #5849d0;
  font-family: DunggeunmisoBold;
`;
const Button = styled.button`
  background-color: #5849d0;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 20px;
  margin: 0 5%;

  &:disabled {
    background-color: #e8edff;
    color: #aeb8db;
    cursor: default;
  }
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
const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 15vh;
  background-color: #e8edff;
  border: none;
  border-radius: 8px;
  resize: none;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
const Cnt = styled(Text)`
  align-self: end;
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

  const [star, setStar] = useState<number>(0);

  const keywordsList = [
    "친절해요",
    "약속 시간을 지켰어요",
    "채팅 응답이 빨라요",
    "설명과 같아요",
    "믿을 수 있어요",
    "가격∙수량이 동일해요",
    "또 거래하고 싶어요",
  ];

  const [isClicked, setIsClicked] = useState<boolean[]>(Array(7).fill(false));
  const [review, setReview] = useState<Review>({
    star: 0,
    keywords: [],
    review: "",
  });
  const [textCnt, setTextCnt] = useState<number>(0);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "review") {
      setTextCnt(value.length);
    }
  };

  const starHandler = (rating: number) => {
    setStar(rating);
    setReview((prev) => ({
      ...prev,
      star: rating,
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

  const submitReview = async () => {
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
      navigate(`/chat/${chatRoomId}/review`);
    }
  };

  return (
    <Wrap $issmall={small} $height="100dvh" $gap="20px">
      <Header title="리뷰 작성" route={`/chat/${chatRoomId}/review`} />
      <Body>
        <Text fontSize="24px">
          <Highlight>{nickname}</Highlight>님과의 공구는
        </Text>
        <StarRating rating={star} onChange={starHandler} />
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
                color={isClicked[idx] ? "white" : "#5849d0"}
              >
                {keyword}
              </Text>
            </Tag>
          ))}
        </TagWrap>
        <ReviewWrap>
          <Cnt fontSize="13px" color="#acacac">
            ({textCnt}/255)
          </Cnt>
          <TextArea
            name="review"
            placeholder="리뷰를 작성해주세요"
            maxLength={255}
            onChange={changeHandler}
          ></TextArea>
        </ReviewWrap>
      </Body>
      <Button type="button" onClick={submitReview} disabled={star === 0}>
        작성 완료
      </Button>
    </Wrap>
  );
}
