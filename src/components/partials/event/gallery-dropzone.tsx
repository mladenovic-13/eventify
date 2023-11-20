"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { getGalleryImagePath } from "@/lib/get-path";
import { convertToMB } from "@/lib/utils";
import { api } from "@/trpc/react";
import axios, { AxiosError } from "axios";
import { ImageIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { type SyntheticEvent, useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

interface GalleryDropzoneProps {
  eventId: string;
}

export const GalleryDropzone = ({ eventId }: GalleryDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm();
  const { onClose } = useModal();
  const { toast } = useToast();
  const { data: session } = useSession();

  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getPresignedUrl.useMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,

    maxSize: 10 * 1000 * 1000,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    onDropAccepted: (_files, _event) => {
      const newFiles = _files.filter(
        (item) => !files.find((_item) => _item.name === item.name),
      );
      setFiles((prev) => [...prev, ...newFiles]);
    },
  });

  const onSubmit = useCallback(async () => {
    if (files.length > 0 && session && session.user) {
      let progress = 0;
      const step = 100 / files.length;

      for (const file of files) {
        try {
          const presignedUrl = await fetchPresignedUrls({
            key: getGalleryImagePath(session.user.id, eventId, file.name),
          });

          console.log({ name: file.name, url: presignedUrl });

          await axios.put(presignedUrl, file.slice(), {
            headers: { "Content-Type": file.type },
          });

          progress = progress + step;

          const progressEvent = new CustomEvent("uploadProgress", {
            detail: progress,
          });

          document.dispatchEvent(progressEvent);
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log("Failed to upload: ", file.name);
          }
          console.log("Failed to create presigned url for: ", file.name);

          toast({
            variant: "destructive",
            title: "Upload failed",
            description: "Youre upload failed. Please try again",
          });
        }
      }

      onClose();
      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded and indexed successfully.`,
      });
    }
    setFiles([]);
  }, [eventId, fetchPresignedUrls, files, session, onClose, toast]);

  const handleRemove = (e: SyntheticEvent, name: string) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {!form.formState.isSubmitting && (
        <div
          {...getRootProps()}
          className="flex min-h-[300px] w-full flex-col items-center justify-center gap-5 rounded-lg border border-dashed py-3 text-center"
        >
          <input {...getInputProps()} />
          {files.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="h-fit w-fit rounded-full bg-primary/40 p-5">
                <UploadCloudIcon className="h-16 w-16 text-primary-foreground" />
              </div>
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <p className="text-sm">
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                  </p>
                  <p className="text-sm text-zinc-500 ">
                    Only *.jpg and *.png images will be accepted. <br /> Files
                    over 10MB are ignored.
                  </p>
                </>
              )}
            </div>
          )}
          {files.length > 0 && (
            <div className="w-full">
              <ScrollArea className="h-60 w-full">
                <ul className="flex w-full flex-col gap-1.5 p-4">
                  {files.map((file) => (
                    <li
                      onClick={(e) => e.stopPropagation()}
                      key={file.name}
                      className="flex w-full items-center justify-between rounded-md border border-border px-3 py-1.5"
                    >
                      <span className="flex items-center gap-3">
                        <ImageIcon className="mr-1.5 h-5 w-5 text-zinc-700" />
                        <span className="text-sm font-semibold text-zinc-600">
                          {file.name.split(".")[0]}
                        </span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-500">
                          {convertToMB(file.size)} MB
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => handleRemove(e, file.name)}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-sm text-zinc-500"
              >
                Add more images
              </Button>
            </div>
          )}
        </div>
      )}

      {form.formState.isSubmitting && (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed">
          <UploadProgress max={files.length} />{" "}
        </div>
      )}

      {!form.formState.isSubmitting && (
        <Button disabled={!files.length || form.formState.isSubmitting}>
          Upload
        </Button>
      )}
    </form>
  );
};

const UploadProgress = ({ max }: { max?: number }) => {
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (e: CustomEvent<number>) => {
      setProgress(e.detail);
      e.detail === max ? setCount(0) : setCount((prev) => prev + 1);
    };

    document.addEventListener("uploadProgress", handler as EventListener);

    return () =>
      document.removeEventListener("uploadProgress", handler as EventListener);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {max !== 0 && (
        <p className="mx-auto p-1.5 text-center text-sm text-zinc-500">
          {count} / {max} images
        </p>
      )}
      <Progress value={progress} />
      <p className="mt-3 max-w-sm text-center text-sm text-zinc-500">
        Uploading/Indexing images, this can take up to few minuts. Please wait
        and <b>do not close this modal</b>!
      </p>
    </div>
  );
};
