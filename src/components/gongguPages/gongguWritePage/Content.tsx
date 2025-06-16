import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SubmitButton from "./SubmitButton";
import CategoryButton from "./CategoryButton";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

import Input from "./Input";
import GuideTitle from "./GuideTitle";
import ImageUpload from "./ImageUpload";
import SetLocation from "./SetLocation";

const Wrap = styled.div`
  padding: 0 5%;
  padding-bottom: 15vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const CountWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const Div = styled.div`
  display: flex;
  gap: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 20vh;
  border: 1px solid #5849d0;
  border-radius: 8px;
  resize: none;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
// 카테고리
const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
`;
const Category = styled.div`
  display: flex;
  gap: 7px;
`;

type FormData = {
  name: string;
  totalUsers: number;
  quantity: string;
  price: number;
  location: string;
  content: string;
  deadLine: string;
  categoryId: number;
  images: string[];
};

export default function Content() {
  const navigate = useNavigate();

  const location = useLocation();
  const message = location.state?.message;
  const name = location.state?.name;
  const categoryId = location.state?.categoryId;
  const imgUrl = location.state?.imgUrl;
  console.log(message, name, categoryId, imgUrl);

  const isShop: boolean = message === "shop";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    totalUsers: 0,
    quantity: "",
    price: 0,
    location: "",
    content: "",
    deadLine: "",
    categoryId: 0,
    images: [],
  });
  const [isAll, setIsAll] = useState<boolean>(false);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const clickHandler = (num: number) => {
    if (isShop) return;

    setFormData((prev) => ({
      ...prev,
      categoryId: num,
    }));
  };

  const urlHandler = (url: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: url,
    }));
  };

  useEffect(() => {
    console.log("formData 변경:", formData);

    const initialFormData: FormData = {
      name: "",
      totalUsers: 0,
      quantity: "",
      price: 0,
      location: "",
      content: "",
      deadLine: "",
      categoryId: 0,
      images: [],
    };
    const allInput: boolean =
      formData.name !== initialFormData.name &&
      Number(formData.totalUsers) !== initialFormData.totalUsers &&
      formData.quantity !== initialFormData.quantity &&
      Number(formData.price) !== initialFormData.price &&
      formData.location !== initialFormData.location &&
      formData.deadLine !== initialFormData.deadLine &&
      formData.categoryId !== initialFormData.categoryId &&
      formData.images.length !== 0;

    const allInputShop: boolean =
      Number(formData.totalUsers) !== initialFormData.totalUsers &&
      formData.quantity !== initialFormData.quantity &&
      Number(formData.price) !== initialFormData.price &&
      formData.location !== initialFormData.location &&
      formData.deadLine !== initialFormData.deadLine;

    if (isShop) {
      setIsAll(allInputShop);
    } else {
      setIsAll(allInput);
    }

    console.log("isAll: ", isAll);
  }, [formData]);

  const submitHandler = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth("/api/group-boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("글쓰기 성공");
        console.log(formData);
        navigate("/");
      }
    } catch (error) {
      console.error("post failed: ", error);
      alert("글쓰기 실패");
      throw error;
    }
  };

  return (
    <>
      <Wrap>
        {isShop ? (
          <Img
            src={imgUrl}
            width="60px"
            height="60px"
            $border="1px solid #5949d0"
            $borderradious="6px"
          />
        ) : (
          <ImageUpload urlPost={urlHandler} />
        )}
        <GuideTitle name={formData.name} quantity={formData.quantity} />
        <Form>
          <CountWrap>
            <Input
              title="상품명"
              name="name"
              placeholder="ex) 딸기"
              onChange={changeHandler}
              value={isShop ? name : undefined}
              disabled={isShop ? true : false}
            />
            <Input
              title="총원"
              name="totalUsers"
              placeholder="ex) 3"
              onChange={changeHandler}
            />
            <Input
              title="총 수량"
              name="quantity"
              placeholder="ex) 6kg"
              onChange={changeHandler}
            />
          </CountWrap>
          <InputWrap>
            <Input
              title="총 가격"
              name="price"
              placeholder="숫자만 입력해주세요."
              onChange={changeHandler}
            />
            <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
              예상 1/N 가격 :{" "}
              {formData.price > 0 && formData.totalUsers > 0
                ? (formData.price / formData.totalUsers).toLocaleString()
                : "-"}
              원
            </Text>
          </InputWrap>
          <Input title="장소" name="location" onChange={changeHandler} />
          <InputWrap>
            <Div>
              <Text fontSize="16px" fontFamily="DunggeunmisoBold">
                장소
              </Text>
              <Text
                fontSize="16px"
                fontFamily="DunggeunmisoBold"
                color="#ff4242"
              >
                *
              </Text>
            </Div>
            <SetLocation />
          </InputWrap>
          <Input
            title="모집 마감 날짜"
            name="deadLine"
            type="date"
            onChange={changeHandler}
          />
          <CategoryWrap>
            <Div>
              <Text fontSize="16px" fontFamily="DunggeunmisoBold">
                카테고리
              </Text>
              <Text
                fontSize="16px"
                fontFamily="DunggeunmisoBold"
                color="#ff4242"
              >
                *
              </Text>
            </Div>
            <Category>
              <CategoryButton
                category="신선식품"
                onClick={() => clickHandler(1)}
                clicked={isShop ? categoryId === 1 : formData.categoryId === 1}
              />
              <CategoryButton
                category="가공식품"
                onClick={() => clickHandler(2)}
                clicked={isShop ? categoryId === 2 : formData.categoryId === 2}
              />
              <CategoryButton
                category="생활용품"
                onClick={() => clickHandler(3)}
                clicked={isShop ? categoryId === 3 : formData.categoryId === 3}
              />
              <CategoryButton
                category="주방용품"
                onClick={() => clickHandler(4)}
                clicked={isShop ? categoryId === 4 : formData.categoryId === 4}
              />
            </Category>
          </CategoryWrap>
          <InputWrap>
            <Text fontSize="16px" fontFamily="DunggeunmisoBold">
              상세 내용
            </Text>
            <TextArea
              id="content"
              name="content"
              placeholder="추가 설명을 입력해주세요."
              onChange={changeHandler}
            />
          </InputWrap>
        </Form>
      </Wrap>
      <SubmitButton
        onClick={!isAll ? undefined : submitHandler}
        disabled={!isAll}
      ></SubmitButton>
    </>
  );
}
