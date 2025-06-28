"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ImageCarouselv2 } from "./ImageCarouselv2";
type CustomCardProps = {
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  images?: string[];
  carouselHeight?: string; // Ej: "h-[220px]" o "h-60"
  carouselWidth?: string; // Ej: "w-[220px]" o "w-60"
  className?: string;
  cardWidth?: string;
  cardHeight?: string;
  orientationCard?: "horizontal" | "vertical";
};

export default function CustomCard({
  title,
  description,
  content,
  footer,
  images,
  cardWidth,
  cardHeight="h-full",
  carouselHeight = "h-[220px]",
  carouselWidth = "w-1/3",
  className = "",
  orientationCard = "vertical", 
}: CustomCardProps) {
  return (
    <Card className={` ${cardWidth}  ${orientationCard === "horizontal"? `${carouselHeight} flex-row`: `${cardHeight} flex-col`}  flex rounded-2xl shadow-xl overflow-hidden border bg-background ${className}`}>
      {images && images.length > 0 && (
        <div className={` ${orientationCard === "horizontal"? `${carouselWidth}`: "w-full"}`}>
          <ImageCarouselv2
            heightClass={carouselHeight}
            images={images}
            
          />
        </div>
      )}
      <div>
        <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    </Card>
  );
}
