import useDeviceSize from "../../useDeviceSize";
import styled from "styled-components";
import Step from "../../components/startPages/UserDataPage/Step";
import Main from "../../components/startPages/UserDataPage/Main";
import Button from "../../components/startPages/common/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div<{ $isSmall: boolean }>`
  background-color: white;
  width: ${(props) => (props.$isSmall ? "100%" : "50%")};
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserDataPage = () => {
  const { small } = useDeviceSize();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const profileUrl = ["/pink.png", "/yellow.png", "/mint.png", "/blue.png"];
  const randomProfile =
    profileUrl[Math.floor(Math.random() * profileUrl.length)];

  const [buttonCheck, setButtonCheck] = useState<boolean>(false);

  useEffect(() => {
    if (nickname && birth && gender && phone.length == 13) {
      setButtonCheck(true);
    } else {
      setButtonCheck(false);
    }
  }, [nickname, birth, gender, phone]);

  console.log(buttonCheck);

  const ButtonHandle = () => {
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // withCredentials: true 역할
      body: JSON.stringify({
        nickname,
        phone,
        birth,
        gender,
        profileUrl: randomProfile,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답 실패");
        }

        return response.json();
      })
      .then((result) => {
        console.log("POST 성공!");
        const accessToken = result.accessToken; // 토큰 꺼내기

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken); // 로컬스토리지에 저장
        }
        navigate("/location");
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  useEffect(() => {
    // 1) /api/auth/users에서 사용자 정보 받아오기
    fetch("http://localhost:8080/api/users/basic", {
      method: "GET",
      credentials: "include", // withCredentials: true 역할
    })
      .then((res) => {
        if (!res.ok) throw new Error("사용자 정보 요청 실패");
        return res.json();
      })
      .then((data) => {
        const { email, name } = data;
        setUserData(data);
        if (email && name) {
          // 2) 받은 정보로 회원가입 API 호출
          return fetch("http://localhost:8080/api/users", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name }),
          });
        } else {
          throw new Error("회원정보를 불러오지 못했습니다.");
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error("회원가입 요청 실패");
        return res.json();
      })
      .then((data) => {
        const accessToken = data.accessToken;
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
        }
      })
      .catch((err) => {
        console.error("회원가입 과정 중 오류 발생:", err);
      });
  }, []);

  const handleGenderChange = (value: string) => {
    if (value === "여성") setGender("FEMALE");
    else if (value === "남성") setGender("MALE");
    else setGender(value);
  };

  return (
    <Wrapper $isSmall={small}>
      <Step />
      <Main
        userData={userData}
        nickname={nickname}
        setNickname={setNickname}
        phone={phone}
        setPhone={setPhone}
        birth={birth}
        setBirth={setBirth}
        gender={gender}
        setGender={handleGenderChange}
      />
      <Button text="다음" onClick={ButtonHandle} disable={buttonCheck} />
    </Wrapper>
  );
};

export default UserDataPage;
