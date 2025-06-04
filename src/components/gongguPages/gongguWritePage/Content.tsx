import styled from "styled-components";

import ImageUpload from "./ImageUpload";

const Wrap = styled.div`
    padding: 0 5%;
`
const Form = styled.form.attrs({
    action: "api/group-boards",
    method: "post",
})`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const Label = styled.label`
    font-weight: bold;
    font-size: 15px;
`
// const CloseBUtton = styled.img.attrs({
//   src: close,
//   alt: "닫기 아이콘",
// })<{ visibility?: string }>`
//   visibility: ${(props) => props.visibility || "visible"};
//   width: 30px;
//   height: 30px;
//   cursor: pointer;
// `
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
`

const CategoryWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 15px;
`
const Category = styled.div`
    display: flex;
    gap: 5px;
`
const CategoryItem = styled.div`
    border: 1px solid #5849d0;
    border-radius: 35px;
    padding: 10px;
    cursor: pointer;
`

const CountWrap = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    gap: 10px;
`

export default function Content() {
    return (
        <Wrap>
            <Form>
                <InputWrap>
                    <Label htmlFor="title">제목</Label>
                    <InputField id="title" />
                </InputWrap>
                <CountWrap>
                    <InputWrap>
                        <Label htmlFor="people">총원</Label>
                        <InputField id="people" type="number" />
                    </InputWrap>
                    <InputWrap>
                        <Label htmlFor="people">총 수량</Label>
                        <InputField id="people" />
                    </InputWrap>
                </CountWrap>
                
                <InputWrap>
                    <Label htmlFor="totalPrice">총 가격</Label>
                    <InputField id="totalPrice" />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="place">장소</Label>
                    <InputField id="place" />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="deadline">모집 마감 날짜</Label>
                    <InputField id="deadline" type="date" />
                </InputWrap>

                <CategoryWrap>
                    카테고리
                    <Category>
                        <CategoryItem>신선식품</CategoryItem>
                        <CategoryItem>가공식품</CategoryItem>
                        <CategoryItem>생활용품</CategoryItem>
                        <CategoryItem>주방용품</CategoryItem>
                    </Category>
                </CategoryWrap>

                <InputWrap>
                    <Label htmlFor="explain">상세 설명</Label>
                    <textarea id="explain" />
                </InputWrap>

                <input type="submit"></input>
            </Form>
        </Wrap>
    );
}