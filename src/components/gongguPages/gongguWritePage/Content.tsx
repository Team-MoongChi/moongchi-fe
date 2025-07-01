import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import SubmitButton from "./SubmitButton";
import CategoryButton from "./CategoryButton";
import Input from "./Input";
import GuideTitle from "./GuideTitle";
import ImageUpload from "./ImageUpload";
import SetLocation from "./SetLocation";
import AddressModal from "./AddressModal";
import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";

const Wrap = styled.div`
  padding: 0 5%;
  padding-bottom: 15vh;
  background-color: white;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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
const Highlight = styled.span`
  font-size: 13px;
  color: #acacac;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 15vh;
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

export type FormData = {
  name: string;
  totalUser: number;
  quantity: string;
  price: number;
  location: string;
  content: string;
  deadline: string;
  categoryId?: number;
  productId?: number;
  images?: string[];
};

export default function Content() {
  // 상품 -> 공구 열기 때 필요한 데이터
  const location = useLocation();
  const message = location.state?.message;
  const productId = location.state?.productId;
  const name = location.state?.name;
  const categoryId = location.state?.categoryId;
  const imgUrl = location.state?.imgUrl;
  const price = location.state?.price;

  const isShop: boolean = message === "shop";
  const { gongguId } = useParams();
  const isEdit: boolean = gongguId !== undefined;
  const isShopAndEdit: boolean = isShop && isEdit;

  const [formData, setFormData] = useState<FormData>({
    name: isShop ? name : "",
    totalUser: 0,
    quantity: "",
    price: 0,
    location: "",
    content: "",
    deadline: "",
    categoryId: undefined,
    productId: isShop ? productId : undefined,
    images: [],
  });
  const [contentCnt, setContentCnt] = useState<number>(0);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [originUrlList, setOriginUrlList] = useState<string[]>([]);
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  // 수정 시 원래 있던 사진 originUrlList에 저장
  useEffect(() => {
    if (isEdit && formData.images && originUrlList.length === 0) {
      setOriginUrlList(formData.images);
    }
  }, [formData.images, isEdit]);

  // 입력 값 변경 시 formData에 반영
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "content") {
      setContentCnt(value.length);
    }
  };
  const clickHandler = (num: number) => {
    if (isShop || isShopAndEdit) return;

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
    setImgLoading(false);
  };

  // 수정 시 원래 데이터 가져오기
  useEffect(() => {
    if (isEdit) {
      fetchWithAuth(`/api/group-boards/${gongguId}/edit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`get failed: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          setFormData(result);
        })
        .catch((error) => {
          console.error("요청 실패:", error);
        });
    }
  }, [isEdit, gongguId]);

  // 수정 및 작성 완료 버튼 disabled 조건 검사
  useEffect(() => {
    const initialFormData: FormData = {
      name: isShop ? name : "",
      totalUser: 0,
      quantity: "",
      price: 0,
      location: "",
      content: "",
      deadline: "",
      categoryId: undefined,
      productId: isShop ? productId : undefined,
      images: undefined,
    };
    const allInput: boolean =
      formData.name !== initialFormData.name &&
      Number(formData.totalUser) !== initialFormData.totalUser &&
      formData.quantity !== initialFormData.quantity &&
      Number(formData.price) !== initialFormData.price &&
      formData.location !== initialFormData.location &&
      formData.deadline !== initialFormData.deadline &&
      formData.categoryId !== initialFormData.categoryId &&
      formData.images?.length !== 0;

    const allInputShop: boolean =
      Number(formData.totalUser) !== initialFormData.totalUser &&
      formData.quantity !== initialFormData.quantity &&
      Number(formData.price) !== initialFormData.price &&
      formData.location !== initialFormData.location &&
      formData.deadline !== initialFormData.deadline;

    if (isShop) {
      setIsAll(allInputShop);
    } else {
      setIsAll(allInput);
    }
  }, [formData, contentCnt]);

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
          <ImageUpload
            urlPost={urlHandler}
            originUrlList={isEdit ? originUrlList : []}
            imgLoading={false}
            setImgLoading={setImgLoading}
          />
        )}
        <GuideTitle name={formData.name} quantity={formData.quantity} />
        <Form>
          <CountWrap>
            <Input
              title="상품명"
              name="name"
              placeholder="ex) 딸기"
              onChange={changeHandler}
              value={
                isShop ? formData.name : isEdit ? formData.name : undefined
              }
            />
            <Input
              title="총원"
              name="totalUser"
              inputmode="numeric"
              placeholder="ex) 3"
              value={isEdit ? String(formData.totalUser) : undefined}
              onChange={changeHandler}
            />
            <Input
              title="총 수량"
              name="quantity"
              placeholder={isShop ? "ex) 3세트" : "ex) 6kg"}
              value={isEdit ? formData.quantity : undefined}
              onChange={changeHandler}
            />
          </CountWrap>
          <InputWrap>
            <Input
              title="총 가격"
              name="price"
              inputmode="numeric"
              placeholder={
                isShop ? `단위 당 가격: ${price}` : "숫자만 입력해주세요."
              }
              value={isEdit ? String(formData.price) : undefined}
              onChange={changeHandler}
            />
            <Text fontSize="20px" fontFamily="DunggeunmisoBold" color="#5849d0">
              예상 1/N 가격 :{" "}
              {formData.price > 0 && formData.totalUser > 0
                ? (formData.price / formData.totalUser).toLocaleString()
                : "-"}
              원
            </Text>
          </InputWrap>
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
            <SetLocation setIsOpen={setIsOpen} location={formData.location} />
          </InputWrap>
          {isOpen && (
            <AddressModal setIsOpen={setIsOpen} setFormData={setFormData} />
          )}
          <Input
            title="모집 마감 날짜"
            name="deadline"
            type="date"
            value={isEdit ? formData.deadline : undefined}
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
                clicked={
                  isShopAndEdit
                    ? formData.categoryId === 1
                    : isShop
                    ? categoryId === 1
                    : formData.categoryId === 1
                }
              />
              <CategoryButton
                category="가공식품"
                onClick={() => clickHandler(2)}
                clicked={
                  isShopAndEdit
                    ? formData.categoryId === 2
                    : isShop
                    ? categoryId === 2
                    : formData.categoryId === 2
                }
              />
              <CategoryButton
                category="생활용품"
                onClick={() => clickHandler(4)}
                clicked={
                  isShopAndEdit
                    ? formData.categoryId === 4
                    : isShop
                    ? categoryId === 4
                    : formData.categoryId === 4
                }
              />
              <CategoryButton
                category="주방용품"
                onClick={() => clickHandler(3)}
                clicked={
                  isShopAndEdit
                    ? formData.categoryId === 3
                    : isShop
                    ? categoryId === 3
                    : formData.categoryId === 3
                }
              />
            </Category>
          </CategoryWrap>
          <InputWrap>
            <Text fontSize="16px" fontFamily="DunggeunmisoBold">
              상세 내용 <Highlight>({contentCnt}/255)</Highlight>
            </Text>
            <TextArea
              id="content"
              name="content"
              placeholder="추가 설명을 입력해주세요."
              maxLength={255}
              value={isEdit ? formData.content : undefined}
              onChange={changeHandler}
            />
          </InputWrap>
        </Form>
      </Wrap>
      <SubmitButton
        formData={formData}
        disabled={!isAll || imgLoading}
      ></SubmitButton>
    </>
  );
}
