import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

export type OverlayType = "badge" | "favorite"
export type OverlayAlign = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export type OverlayBadge = {
  type: "badge"
  bgcolor: string
  field: string            // El nombre del campo de overlayValues a mostrar
  align?: OverlayAlign
  textColor?: string
}
export type OverlayFavorite = {
  type: "favorite"
  bgcolor: string
  align?: OverlayAlign
  actionFavorite: (index: number) => void
}

export type OverlayCarrusel = OverlayBadge | OverlayFavorite

export type OverlayValue = Record<string, any>

export type ImageCarouselProps = {
  images: string[]
  overlayCarrusel?: OverlayCarrusel | OverlayCarrusel[]
  overlayValues?: OverlayValue         // <-- SOLO UN OBJETO
  heightClass?: string
  className?: string
}

function getAlignClass(align: OverlayAlign = "top-left") {
  const alignments: Record<OverlayAlign, string> = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  }
  return alignments[align] || alignments["top-left"]
}

function OverlayDisplay({
  overlays,
  value,
  index,
}: {
  overlays: OverlayCarrusel[]
  value: OverlayValue
  index: number
}) {
  return (
    <>
      {overlays.map((overlay, idx) => {
        if (overlay.type === "badge") {
          // No renderizar el badge si no hay valor válido
          const badgeValue = value?.[overlay.field];
          if (!badgeValue || badgeValue === "" || badgeValue === null || badgeValue === undefined) {
            return null;
          }
          
          return (
            <span
              key={idx}
              className={`absolute z-10 pointer-events-auto ${overlay.bgcolor??"bg-blue-600"} ${overlay.textColor ?? "text-white"} text-xs font-bold px-3 py-1 rounded-full shadow ${getAlignClass(overlay.align)}`}
            >
              {badgeValue}
            </span>
          )
        }
        if (overlay.type === "favorite") {
          return (
            <button
              key={idx}
              type="button"
              onClick={e => {
        e.stopPropagation(); // Detiene el click global del card
        overlay.actionFavorite(index);
      }}
      aria-label="Guardar en favoritos"
      tabIndex={0}
      className={`absolute z-10 pointer-events-auto ${overlay.bgcolor??"bg-white"} flex items-center justify-center rounded-full p-2 group transition ${getAlignClass(overlay.align)}`}
    >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill={value?.isFavorite ? "red" : "none"}
                className={`transition-all ${value?.isFavorite ? "text-red-500" : "text-red-400"} group-hover:fill-red-500`}
              >
                <path
                  d="M12 21s-5.05-4.438-7.07-6.594C2.269 12.053 2 10.78 2 9.5 2 6.42 4.42 4 7.5 4c1.74 0 3.41.81 4.5 2.09C13.09 4.81 14.76 4 16.5 4 19.58 4 22 6.42 22 9.5c0 1.28-.269 2.553-2.93 4.906C17.05 16.562 12 21 12 21z"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
            </button>
          )
        }
        return null
      })}
    </>
  )
}

export function ImageCarouselv2({
  images,
  overlayCarrusel,
  overlayValues,
  heightClass = "h-full",
  className = "",
}: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }
    api.on("select", onSelect)
    setCurrent(api.selectedScrollSnap())
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const overlays: OverlayCarrusel[] = overlayCarrusel
    ? Array.isArray(overlayCarrusel)
      ? overlayCarrusel
      : [overlayCarrusel]
    : []

  // overlayValues ahora es un solo objeto (no un array)
  const overlayValue = overlayValues || {};
  const showControls = images.length > 1;

  return (
    <div className={`w-full ${heightClass} ${className} relative`}>
      <Carousel className="relative h-full w-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {images.map((imgUrl, idx) => (
            <CarouselItem key={idx} className="h-full">
              <div className="p-0 h-full">
                <Card className="h-full">
                  <CardContent className={`relative flex items-center justify-center h-full ${heightClass}`}>
                    <Image
                      src={imgUrl}
                      fill
                      alt={`Imagen ${idx + 1}`}
                      className={`w-full h-full transition-transform duration-300 group-hover:scale-110 ${heightClass}`}
                      style={{ objectFit: "cover" }}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && <CarouselPrevious className="left-2" />}
        {showControls && <CarouselNext className="right-2" />}
      </Carousel>
      {overlays.length > 0 && (
        <OverlayDisplay overlays={overlays} value={overlayValue} index={current} />
      )}
    </div>
  )
}
