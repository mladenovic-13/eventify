"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";
import Image from "next/image";

interface RenderGalleryImagesProps {
  eventId: string;
}

export const RenderGalleryImages = ({ eventId }: RenderGalleryImagesProps) => {
  const { onOpen } = useModal();

  const { data: images } = api.event.getImages.useQuery({ eventId });

  console.log({ images });

  if (!images) return <div>Loading...</div>;

  return (
    <>
      {images.map((image, idx) => (
        <div
          // id={`gallery-image-${idx}`}
          key={image.id}
          onClick={() =>
            onOpen("event-gallery", {
              gallery: {
                images: images,
                currentImage: idx,
              },
            })
          }
        >
          <AspectRatio
            ratio={4 / 3}
            className="transition md:cursor-pointer md:duration-300 md:hover:brightness-110"
          >
            <Image
              src={image.url}
              alt={`Gallery Image ${image.id}`}
              width={460}
              height={345}
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
      ))}
    </>
  );
};
