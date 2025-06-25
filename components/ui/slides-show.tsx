"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import clsx from "clsx"

export interface Slide {
  image: string
  title?: string
  description?: string
}

export interface SlidesShowProps {
  slides: Slide[]
  interval?: number // ms (default: 4000)
  aspectRatio?: "16:9" | "4:3" | "1:1" | "filled"
  className?: string
}

export default function SlidesShow({
  slides,
  interval = 4000,
  aspectRatio = "4:3",
  className = "",
}: SlidesShowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [slides.length, interval])

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl",
        aspectRatio !== "filled" && "w-full",
        aspectRatio === "16:9" && "aspect-[16/9]",
        aspectRatio === "4:3" && "aspect-[4/3]",
        aspectRatio === "1:1" && "aspect-square",
        aspectRatio === "filled" && "w-full h-full",
        className
      )}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
          />

          {/* Gradiente oscuro que se intensifica hacia abajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

          {(slide.title || slide.description) && (
            <div className="absolute bottom-6 left-2 text-white drop-shadow-lg z-20 p-4 w-[calc(100%-1rem)] text-center">
              {slide.title && (
                <h3 className="text-3xl font-semibold">{slide.title}</h3>
              )}
              {slide.description && (
                <p className="text-sm text-white/90">{slide.description}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-[4px] w-8 rounded-full bg-muted transition-all",
              i === index && "bg-primary"
            )}
          />
        ))}
      </div>
    </div>
  )
}
