import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/FetchWithAuth";
import useDeviceSize from "../../../hooks/useDeviceSize";
import type { FormData } from "./Content";

const Footer = styled.div<{ $isSmall: boolean }>`
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  display: flex;
  align-items: center;
  padding: 0 5%;
  background-color: white;
  border-top: 1px solid #e8edff;
  position: fixed;
  bottom: 0;
  height: 90px;
`;
const Button = styled.button.attrs<{
  disabled?: boolean;
}>((props) => ({
  type: "button",
  disabled: props.disabled ? true : false,
}))`
  flex: 1;
  background-color: #5849d0;
  border-radius: 15px;
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;

  &:disabled {
    background-color: #e8edff;
    color: #aeb8db;
  }
`;

type SubmitButtonProps = {
  formData: FormData;
  disabled: boolean;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { small } = useDeviceSize();
  const { gongguId } = useParams();
  const navigate = useNavigate();
  const isEdit: boolean = gongguId !== undefined;

  const submitHandler = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth("/api/group-boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.formData),
      });
      if (response.ok) {
        alert("작성 완료!");
        console.log(props.formData);
        navigate("/");
      }
    } catch (error) {
      console.error("post failed: ", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  const editFetch = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    try {
      const response = await fetchWithAuth(`/api/group-boards/${gongguId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.formData),
      });
      if (response.ok) {
        alert("수정 완료!");
        navigate(`/gonggu/list/${gongguId}`);
      }
    } catch (error) {
      console.log("post failed: ", error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  return (
    <Footer $isSmall={small}>
      <Button
        onClick={isEdit ? editFetch : submitHandler}
        disabled={props.disabled}
      >
        {isEdit ? "수정" : "작성"} 완료
      </Button>
    </Footer>
  );
}
