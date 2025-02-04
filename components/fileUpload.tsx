"use client";

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authentificator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`, { mode: "no-cors" })

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

interface ImageUploadProps {
  onFileChange: (filePath: string) => void;
  type: "image" | "video";
  placeholder: string;
  folder: string;
  accept: string;
  variant: 'dark' | 'light';
}

const ImageUpload = ({ onFileChange, type, placeholder, folder, accept, variant }: ImageUploadProps) => {
  const { toast } = useToast()
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>();
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-slate-500'
  }

  const onError = (error: any) => {
    console.log(error);

    toast({
      title: `${type} uploaded failed`,
      description: `Your ${type} could not be uploaded. Please tye again.`,
      variant: "destructive"
    })
  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    })
  }

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > (20 * 1024 * 1024)) {
        toast({
          title: 'File size too large',
          description: "Please upload a file that is less than 20Mb in size",
          variant: 'destructive'
        });

        return false
      }
    } else if (type === 'video') {
      if (file.size > (20 * 1024 * 1024)) {
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: 'File size too large',
            description: "Please upload a file that is less than 20Mb in size",
            variant: 'destructive'
          });

          return false
        }
      }
    }

    return true
  }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authentificator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button onClick={(e) => {
        e.preventDefault();
        if (ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click()
        }
      }}
        title="-"
        className={cn("upload-btn", styles.button)}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload"
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>
          {placeholder}
        </p>

        {
          file && <p className={cn("upload-filename line-clamp-1", styles.text)}>{file.filePath.length < 50 ? file.filePath : `.../${file.filePath.slice(-35)}`}</p>
        }
      </button>

      {
        progress > 0 && progress === 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div
              className="progress"
              style={{
                width: `${progress}%`
              }}
            >
              {progress}%
            </div>
          </div>
        )
      }

      {
        file && (
          type === 'image' ? (
            <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
          ) : (
            <IKVideo 
              path={file.filePath}
              controls={true}
              className="h-96 w-full rounded-xl"
            />
          )
        )
      }
    </ImageKitProvider>
  )
}

export default ImageUpload