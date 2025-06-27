"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AspectRatio = "1:1" | "2:1" | "1:2" | "16:9" | "4:3";
type Fit = "cover" | "contain" | "fill" | "none" | "scale-down";

const aspectClasses: Record<AspectRatio, string> = {
  "1:1": "aspect-square",
  "2:1": "aspect-[2/1]",
  "1:2": "aspect-[1/2]",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
};

export function ImageCarousel({
  images,
  aspectRatio = "1:1",
  className = "",
  fit = "cover",
}: {
  images: string[];
  aspectRatio?: AspectRatio;
  className?: string;
  fit?: Fit;
}) {
  const showControls = images.length > 1;

  return (
    <Carousel className={cn("w-full max-w-xs", className)}>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-lg",
                aspectClasses[aspectRatio]
              )}
            >
              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                fill
                className={cn(
                  "w-full h-full",
                  `object-${fit}`
                )}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showControls && <CarouselPrevious className="left-1" />}
      {showControls && <CarouselNext className="right-1" />}
    </Carousel>
  );
}
