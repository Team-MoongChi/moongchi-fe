import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";

const Wrap = styled.div`
  padding: 0 5%;
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
const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
`;
// 입력 필드
interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}
const InputField = styled.input.attrs<InputProps>((props) => ({
  type: props.type || "text",
  required: props.required || true,
}))<{ width?: string }>`
  width: ${(props) => props.width || "100%"};
  border-radius: 8px;
  border: 1px solid #5849d0;
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
  gap: 5px;
`;
const CategoryItem = styled.div`
  border: 1px solid #5849d0;
  border-radius: 35px;
  padding: 10px;
  cursor: pointer;
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;
`;

const Button = styled.div`
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #5849d0;
  border-radius: 15px;
  padding: 15px;
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
  productImages: string[];
};

export default function Content() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    totalUsers: 0,
    quantity: "",
    price: 0,
    location: "",
    content: "",
    deadLine: "",
    categoryId: 0,
    productImages: [],
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const clickHandler = (num: number) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: num,
    }));
  };

  useEffect(() => {
    console.log("formData 변경:", formData);
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
    <Wrap>
      <Form>
        <InputWrap>
          <Label htmlFor="name">제목</Label>
          <InputField id="name" name="name" onChange={changeHandler} />
        </InputWrap>
        <CountWrap>
          <InputWrap>
            <Label htmlFor="totalUsers">총원</Label>
            <InputField
              id="totalUsers"
              name="totalUsers"
              type="number"
              onChange={changeHandler}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="quantity">총 수량</Label>
            <InputField
              id="quantity"
              name="quantity"
              onChange={changeHandler}
            />
          </InputWrap>
        </CountWrap>

        <InputWrap>
          <Label htmlFor="price">총 가격</Label>
          <InputField id="price" name="price" onChange={changeHandler} />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="location">장소</Label>
          <InputField id="location" name="location" onChange={changeHandler} />
        </InputWrap>
        <InputWrap>
          <Label htmlFor="deadLine">모집 마감 날짜</Label>
          <InputField
            id="deadLine"
            name="deadLine"
            type="date"
            onChange={changeHandler}
          />
        </InputWrap>

        <CategoryWrap>
          <div>카테고리</div>
          <Category>
            <CategoryItem onClick={() => clickHandler(1)}>
              신선식품
            </CategoryItem>
            <CategoryItem onClick={() => clickHandler(2)}>
              가공식품
            </CategoryItem>
            <CategoryItem onClick={() => clickHandler(3)}>
              생활용품
            </CategoryItem>
            <CategoryItem onClick={() => clickHandler(4)}>
              주방용품
            </CategoryItem>
          </Category>
        </CategoryWrap>

        <InputWrap>
          <Label htmlFor="content">상세 설명</Label>
          <InputField
            id="content"
            name="content"
            type="textarea"
            required={false}
            onChange={changeHandler}
          />
        </InputWrap>

        <Button onClick={submitHandler}>작성 완료</Button>
      </Form>
    </Wrap>
  );
}
