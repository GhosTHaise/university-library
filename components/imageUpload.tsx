"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authentificator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`,)

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature }
  } catch (error: any) {
    throw new Error(`Authentification request failed : ${error.message}`)
  }
}
const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{filePath : string} | null>();

  const onError = () => {}
  const onSuccess = () => {}

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authentificator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="tes-upload.png"
      />

      <button onClick={(e) => {
        e.preventDefault();
        if(ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click()
        }
      }} title="-" className="upload-btn">
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload"
          className="object-contain"
        />

        <p className="text-base text-light-100">
          Upload a File
        </p>

        {
          file && <p className="upload-filename">{file.filePath}</p>
        }
      </button>

      {
        file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        )
      }
    </ImageKitProvider>
  )
}

export default ImageUpload