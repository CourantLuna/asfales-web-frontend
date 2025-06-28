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

export type AspectRatio =
  | "1:1"
  | "2:1"
  | "1:2"
  | "16:9"
  | "4:3"
  | "filled";
export type Fit = "cover" | "contain" | "fill" | "none" | "scale-down";

const aspectClasses: Record<Exclude<AspectRatio, "filled">, string> = {
  "1:1": "aspect-square",
  "2:1": "aspect-[2/1]",
  "1:2": "aspect-[1/2]",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
};

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: AspectRatio;
  fit?: Fit;
  /** Altura en CSS (ej: "300px", "50vh", "20rem") solo para aspectRatio="filled" */
  height?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  aspectRatio = "1:1",
  fit = "cover",
  height,
  className,
}: ImageCarouselProps) {
  const showControls = images.length > 1;

  return (
    <Carousel className={cn("w-full h-full", className)}>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-lg",
                aspectRatio !== "filled" && aspectClasses[aspectRatio],
                aspectRatio === "filled" && "h-full min-h-0 min-w-0"
              )}
              style={
                aspectRatio === "filled"
                  ? height
                    ? { height, width: "100%" }
                    : { height: "", width: "100%" }
                  : undefined
              }
            >
              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                fill
                className={cn("w-full h-full", `object-${fit}`)}
                sizes="100vw"
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
