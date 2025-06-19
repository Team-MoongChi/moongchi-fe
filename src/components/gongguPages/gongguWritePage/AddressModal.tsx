import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import type { FormData } from "./Content";
import type { CSSProperties } from "styled-components";
import { useEffect } from "react";

const BlurContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1;
  overflow: hidden;
`;

const style: CSSProperties = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "75vh",
  borderRadius: "20px",
  backgroundColor: "white",
  zIndex: "2",
  padding: "10px 20px",
};

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const AddressModal = ({ setIsOpen, setFormData }: Props) => {
  const completeHandler = (data) => {
    const { roadAddress } = data;
    setFormData((prev) => ({
      ...prev,
      location: roadAddress,
    }));
  };
  const closeHandler = (state: string) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = "hidden";

    return () => {
      // 모달 닫힐 때 원래대로
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <BlurContainer onClick={() => setIsOpen(false)} />
      <DaumPostcode
        style={style}
        onComplete={completeHandler}
        onClose={closeHandler}
      />
    </>
  );
};

export default AddressModal;
