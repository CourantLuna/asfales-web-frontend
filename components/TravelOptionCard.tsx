export interface TravelOptionCardProps {
  images: string[];
  isAd?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  title: string;
  subtitle?: string; // Ej: zona, ciudad, marca
  amenities?: React.ReactNode[]; // iconos o etiquetas
  description?: string;
  highlight?: string; // frase destacada
  rating?: { score: number; label: string; reviews: number };
  price?: { current: number; old?: number; label?: string };
  discountLabel?: string;
  promoLabel?: string;
  action?: React.ReactNode; // Botón personalizado (Reservar, Detalle, etc)
  children?: React.ReactNode; // Por si quieres slot custom
}

import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function TravelOptionCard({
  images,
  isAd,
  isFavorite,
  onToggleFavorite,
  title,
  subtitle,
  amenities,
  description,
  highlight,
  rating,
  price,
  discountLabel,
  promoLabel,
  action,
  children,
}: TravelOptionCardProps) {
  const [idx, setIdx] = React.useState(0);

  return (
    <div className="flex w-full max-w-2xl bg-white border rounded-2xl shadow-sm overflow-hidden">
      {/* Images */}
      <div className="relative w-[220px] h-[180px] flex-shrink-0">
        <img
          src={images[idx]}
          alt={title}
          className="object-cover w-full h-full rounded-l-2xl"
        />
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
              onClick={() => setIdx((idx - 1 + images.length) % images.length)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
              onClick={() => setIdx((idx + 1) % images.length)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
        {/* Badge Ad */}
        {isAd && (
          <Badge className="absolute bottom-2 left-2 bg-slate-100 text-slate-600 border">
            Ad
          </Badge>
        )}
        {/* Favorite */}
        {typeof isFavorite !== "undefined" && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleFavorite}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{title}</span>
          {promoLabel && (
            <Badge className="bg-green-600 text-white ml-2">{promoLabel}</Badge>
          )}
        </div>
        {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div className="flex items-center gap-2 text-xs mt-0.5">
            {amenities.map((a, i) => (
              <span key={i}>{a}</span>
            ))}
          </div>
        )}
        {highlight && (
          <div className="mt-1 font-semibold text-[13px]">{highlight}</div>
        )}
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-green-100 text-green-800 font-semibold text-sm px-2 py-0 rounded">
              {rating.score}
            </Badge>
            <span className="font-semibold text-sm text-green-700">{rating.label}</span>
            <span className="text-xs text-muted-foreground">{rating.reviews} reviews</span>
          </div>
        )}
        {/* Price/Discount */}
        {(price || discountLabel) && (
          <div className="flex items-center gap-3 mt-auto">
            {discountLabel && (
              <Badge className="bg-green-100 text-green-700 border-green-300">{discountLabel}</Badge>
            )}
            {price?.old && (
              <span className="text-xs line-through text-muted-foreground">${price.old}</span>
            )}
            {price && (
              <span className="text-xl font-bold text-primary">
                ${price.current}{" "}
                {price.label && <span className="font-normal text-xs">{price.label}</span>}
              </span>
            )}
          </div>
        )}
        {/* Action or children */}
        {action ? <div className="mt-2">{action}</div> : children}
      </div>
    </div>
  );
}

