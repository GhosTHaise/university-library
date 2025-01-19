"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

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

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload