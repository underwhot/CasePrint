"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Image,
  Loader2,
  MousePointerSquareDashed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/design?id=${configId}`);
      });
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please upload a PNG or JPEG image.",
      variant: "destructive",
    });
  };

  return (
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
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-muted p-4 transition hover:bg-muted/50 sm:p-10"
        >
          <input {...getInputProps()} />
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
                <Progress value={uploadProgress} />
              </div>
            ) : isPending ? (
              <div className="flex flex-col items-center gap-3">
                <p>Redirecting, please wait...</p>
              </div>
            ) : isDragOver ? (
              <p>Drop file to upload</p>
            ) : (
              <p>Drag and drop or click to select an image</p>
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
  );
}
