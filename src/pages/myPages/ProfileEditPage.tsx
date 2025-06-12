import styled from "styled-components";
import useDeviceSize from "../../useDeviceSize";
import Header from "../../components/common/Header";
import InputBox from "../../components/myPages/ProfileEditPage/InputBox";
import Button from "../../components/myPages/ProfileEditPage/Button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/FetchWithAuth";
import noProfile from "../../assets/images/common/사진없을때.png";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImg = styled.button`
  margin-top: 50px;

  img {
    width: 160px;
    height: 160px;
    border: 5px solid #c7d2fe;
    border-radius: 100px;
    object-fit: cover;
  }
`;
const Main = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProfileEditPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const token = localStorage.getItem("accessToken");
    fetchWithAuth("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // withCredentials: true 역할
      body: JSON.stringify({
        nickname,
        profileUrl: img,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 실패");
        }
        return response.json();
      })
      .then((result) => {
        console.log("POST 성공!", result);
        navigate("/mypage");
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");
    formData.append("cloud_name", "dogetp9bc");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dogetp9bc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImg(data.secure_url); // 이미지 URL 저장 (백엔드에 보낼 수 있음)
  };

  const handleClickInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 또는 sessionStorage, context 등

    fetchWithAuth("http://localhost:8080/api/users", {
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
        setNickname(result.nickname);
        setImg(result.profileUrl);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);

  return (
    <Wrapper $isSmall={small}>
      <Header title="프로필 수정" route="/mypage" />
      <Main>
        <ProfileImg onClick={handleClickInput}>
          <img src={img || noProfile} />
        </ProfileImg>
        <InputBox
          title="닉네임 (5자 이내)"
          data={nickname}
          onChange={setNickname}
          maxLength={5}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Main>
      <Button text="완료" onClick={handleClick} disable={true} />
    </Wrapper>
  );
};

export default ProfileEditPage;
