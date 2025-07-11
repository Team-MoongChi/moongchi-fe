import styled from "styled-components";
import { useState, useRef } from "react";

import { Img } from "../../common/styled-component/Img";
import { Text } from "../../common/styled-component/Text";
import camera from "../../../assets/images/gonggu/camera.png";

const ImgInput = styled.input.attrs({
  type: "file",
  accept: "image/jpg, image/jpeg, image/png",
  multiple: true,
})`
  display: none;
`;

const ImagesWrap = styled.div`
  display: flex;
  overflow: scroll;
  max-width: 100%;
  gap: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  width: 60px;
  height: 60px;
  border: 1px solid #5849d0;
  border-radius: 6px;
  cursor: pointer;
`;

type ImageItem = {
  file?: File;
  url: string;
};

interface UploadProps {
  urlPost: (url: string[]) => void;
  originUrlList: string[] | undefined;
  imgLoading: boolean;
  setImgLoading: (value: boolean) => void;
}

export default function ImageUpload(props: UploadProps) {
  const [imgList, setImgList] = useState<ImageItem[]>([]);
  // const imgUrlList: string[] = [];
  const imgUrlListRef = useRef<string[]>([]);

  // cloudinary 이미지 url 가져오기
  const uploadCloudinary = async () => {
    const files = imgInputRef.current?.files;

    if (!files || files.length === 0) return;

    for (let i = 0; i < files?.length; i++) {
      const formData = new FormData();
      const file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "gonggu");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtiwjovjs/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      imgUrlListRef.current.push(data.secure_url);
    }
  };

  // onChange Handler
  const storeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (!image) return;

    const selectedFiles = Array.from(image);
    const currentImgCnt = (props.originUrlList?.length || 0) + imgList.length;
    if (currentImgCnt + selectedFiles.length > 5) {
      alert("사진은 최대 5개까지 올릴 수 있습니다.");
      return;
    }

    props.setImgLoading(true);
    const curList = [...imgList];
    for (let i = 0; i < image.length; i++) {
      curList.push({ file: image[i], url: URL.createObjectURL(image[i]) });
    }
    setImgList(curList);

    await uploadCloudinary();
    props.urlPost([...(props.originUrlList ?? []), ...imgUrlListRef.current]);
  };

  // 이미지 업로드 버튼 custom
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const imgUploadHandler = () => {
    imgInputRef.current?.click();
  };
  return (
    <>
      <ImagesWrap>
        <UploadButton onClick={imgUploadHandler}>
          <Img src={camera} width="35px" height="35px" />
          <Text fontSize="10px" color="#5849d0">
            {props.originUrlList
              ? props.originUrlList.length + imgList.length
              : imgList.length}
            /5
          </Text>
        </UploadButton>
        {props.originUrlList?.map((img, idx) => (
          <Img
            key={idx}
            src={img}
            width="60px"
            height="60px"
            $border="1px solid #d8dadc"
            $borderradious="6px"
            $flexShrink={0}
          />
        ))}
        {imgList.map((img, idx) => (
          <Img
            key={idx + 10}
            src={img.url}
            width="60px"
            height="60px"
            $border="1px solid #d8dadc"
            $borderradious="6px"
            $flexShrink={0}
          />
        ))}
      </ImagesWrap>

      <ImgInput ref={imgInputRef} onChange={(e) => storeImages(e)} />
    </>
  );
}
