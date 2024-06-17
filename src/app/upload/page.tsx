"use client";

import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Image,
  Loader2,
  MousePointerSquareDashed,
} from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  const onDropAccepted = () => {};

  const onDropRejected = () => {};

  const isUploading = false;

  return (
    <section className="container flex flex-1 flex-col gap-8 py-10">
      <ul className="flex flex-wrap gap-4 [&>*]:flex-[1_1_200px]">
        <li className="rounded-lg bg-muted p-4 text-center">
          <div className="text-lg">Step 1: Upload image</div>
          <div className="text-sm text-muted-foreground">
            Choose an image for your case
          </div>
        </li>
        <li className="rounded-lg bg-muted p-4 text-center opacity-50">
          <div className="text-lg">Step 2: Customize design</div>
          <div className="text-sm text-muted-foreground">
            Make the case yours
          </div>
        </li>
        <li className="rounded-lg bg-muted p-4 text-center opacity-50">
          <div className="text-lg">Step 3: Summary</div>
          <div className="text-sm text-muted-foreground">
            Review your final design
          </div>
        </li>
      </ul>

      <div className="flex h-full w-full flex-1">
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-muted transition hover:bg-muted/50 sm:p-10"
            >
              <input {...getInputProps()} className="" />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6" />
              ) : isUploading || isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Image className="h-6 w-6" />
              )}
              <div className="mx-auto mt-4 min-w-[200px] text-center">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className="" />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center gap-3">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>Drop file to upload</p>
                ) : (
                  <p>
                    Drag and drop an image here, or click to select an image
                  </p>
                )}

                {isPending ? null : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    PNG, JPG, JPEG <br /> File size limit: 5MB
                  </p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </section>
  );
}
