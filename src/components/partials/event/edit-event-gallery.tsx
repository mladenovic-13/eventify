"use client";

import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type Image as ImageProps } from "@prisma/client";
import { api } from "@/trpc/react";
import { OpenModalButton } from "@/components/buttons/open-modal-button";

interface EditEventGalleryProps {
  eventId: string;
}

export const EditEventGallery = ({ eventId }: EditEventGalleryProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);

  const [page, setPage] = useState<number>(0);

  const { data: imagesCount } = api.event.getImagesCount.useQuery(
    { eventId },
    { staleTime: Infinity },
  );

  const { data, fetchNextPage, hasNextPage } =
    api.event.getImages.useInfiniteQuery(
      {
        eventId,
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  useEffect(() => {
    if (!data) return;
    const tmpImages: ImageProps[] = [];

    data?.pages.forEach((page) => {
      page.images.forEach((image) => tmpImages.push(image));
    });

    setImages(tmpImages);
  }, [data]);

  useEffect(() => {
    setSelectedImages(() =>
      images.filter((image) => selected.includes(image.key)),
    );
  }, [images, selected]);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-zinc-500">
          {selected.length} of {imagesCount} selected
        </p>
        <OpenModalButton
          modalType="delete-event-images"
          modalData={{ galleryImages: selectedImages }}
          variant="destructive"
          disabled={selected.length === 0}
        >
          Delete
        </OpenModalButton>
      </div>
      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5"></div>
      <ToggleGroup.Root
        type="multiple"
        orientation="horizontal"
        value={selected}
        onValueChange={setSelected}
        className="grid grid-cols-3 gap-1 md:grid-cols-5 "
      >
        {data?.pages[page]?.images.map((image) => (
          <ToggleGroup.Item
            key={image.id}
            value={image.key}
            className="relative rounded-lg p-0.5 data-[state=on]:ring-2"
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                alt={image.name}
                src={image.url}
                width={200}
                height={200}
                className="h-full rounded-lg object-cover"
              />
            </AspectRatio>

            <div
              className={cn(
                "absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                selected.includes(image.key) && "bg-primary shadow-white",
              )}
            >
              <CheckIcon
                className={cn(
                  "hidden text-primary-foreground",
                  selected.includes(image.key) && "block",
                )}
              />
            </div>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      {data && imagesCount && imagesCount !== 0 && (
        <div className="flex items-center justify-center gap-5">
          <Button
            size="icon"
            variant="secondary"
            // onClick={handleFetchPreviousPage}
            disabled
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleFetchPreviousPage}
            disabled={page === 0}
          >
            <ChevronLeftIcon />
          </Button>
          <p className="text-zinc-500">
            Page {page + 1} of {Math.round(imagesCount / 20) + 1}
          </p>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleFetchNextPage}
            disabled={!hasNextPage && page === data.pages.length - 1}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            // onClick={handleFetchPreviousPage}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
};
