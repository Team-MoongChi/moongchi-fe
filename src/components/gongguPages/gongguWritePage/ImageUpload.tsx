import styled from "styled-components";
import { useState } from "react";

const ImgInput = styled.input.attrs({
    type: "file",
    accept: "image/jpg, image/jpeg, image/png",
    multiple: true,
})`
    
`;

type ImageItem = {
    file: File;
    url: string;
}

export default function ImageUpload() {
    const [imgList, setImgList] = useState<ImageItem[]>([]);
    const storeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files;
        if(!image) return;

        let curList = [...imgList];

        for (let i = 0; i < image.length; i++) {
            curList.push({file: image[i], url: URL.createObjectURL(image[i])});
        }

        setImgList(curList);
    };

    return(
        <>
            <ImgInput />
        </>
    );
}