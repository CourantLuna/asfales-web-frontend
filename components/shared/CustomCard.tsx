"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ImageCarouselv2, type OverlayCarrusel, type OverlayValue } from "./ImageCarouselv2";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

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
  // 🎉 Los nuevos props para overlays:
  overlayCarrusel?: OverlayCarrusel | OverlayCarrusel[];
  overlayValues?: OverlayValue;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void; // <---
      showCompareCheckbox?: boolean;                // ¿Mostrar el checkbox?
  compareChecked?: boolean;                     // Estado de checked
  onCompareCheckedChange?: (checked: boolean) => void; // Handler al cambiar
  compareLabel?: string;                        // Label a mostrar ("Compare" por defecto)

};

export default function CustomCard({
  title,
  description="",
  content,
  footer,
  images,
  cardWidth,
  cardHeight = "h-full",
  carouselHeight = "h-[220px]",
  carouselWidth = "w-1/2",
  className = "",
  orientationCard = "vertical",
  // 👇 Nuevo:
  overlayCarrusel,
  overlayValues,
  onClick,
  showCompareCheckbox = true,
  compareChecked = false,
  onCompareCheckedChange,
  compareLabel = "Comparar",
}: CustomCardProps) {

    // --- Estado interno sólo si no vienen controlados ---
  const [internalChecked, setInternalChecked] = React.useState(false);

  // Usar el valor controlado si viene, sino el interno
  const isControlled = typeof compareChecked === "boolean" && !!onCompareCheckedChange;
  const checkedValue = isControlled ? compareChecked : internalChecked;

  // Handler para cambio
  const handleCheckedChange = (checked: boolean) => {
    if (isControlled) {
      onCompareCheckedChange?.(checked);
    } else {
      setInternalChecked(checked);
    }
  };
  return (
    
    <div className="flex h-full w-full">
      <Card 
  onClick={onClick} // <--- AQUÍ
  className={`  relative
  ${cardWidth || ""}
  ${orientationCard === "horizontal" ? cardHeight || "" : cardHeight || ""}
  flex rounded-2xl shadow-xl overflow-hidden bg-background
  ${orientationCard === "horizontal" ? "flex-row" : "flex-col"}
  ${className}
   transition-shadow 
  shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.015] cursor-pointer group
`}>


{showCompareCheckbox && (
          <div
            className="absolute z-30 top-[42%] right-2 md:top-3 md:right-4 flex items-center gap-1 bg-white/80 rounded-md px-2 py-1"
            onClick={e => e.stopPropagation()}
          >
            <Checkbox
              checked={checkedValue}
              onCheckedChange={handleCheckedChange}
              id={`compare-checkbox`}
            />
            <label htmlFor="compare-checkbox" className="text-sm select-none">
              {compareLabel || "Compare"}
            </label>
          </div>
        )}


      {images && images.length > 0 && (
        <div className={` ${orientationCard === "horizontal" ? `${carouselWidth}` : "w-full"}`}>
          <ImageCarouselv2
            images={images}
            overlayCarrusel={overlayCarrusel}
            overlayValues={overlayValues}
            heightClass={`${orientationCard === "vertical" ? `${carouselHeight}` : `h-full`}`}
          />
        </div>
      )}
      <div className="flex flex-col w-full h-full">
        <CardHeader className="py-3 px-6">
          <CardTitle className="text-xl font-bold pr-[90px]">{title}</CardTitle>
          {description.length>0? <CardDescription className="text-sm">{description}</CardDescription> : null}
        </CardHeader>
        {content && <CardContent>{content}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    </Card>
    </div>
  );
}
