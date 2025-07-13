"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  Plane,
  MapPin,
  Hotel,
  Mountain,
  BusFront,
  Ship,
  Building2,
} from "lucide-react";
import { Suspense } from "react";

type Participant = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type ItinerarySharedCardProps = {
  id: string;
  title: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  price: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
  participants: Participant[];
  cities?: string[]; // ejemplo: ["Roma", "Florencia", "Venecia"]
  lodgingCount: number; // total de alojamientos
  experienceCount: number; // excursiones, tours,
  transportSummary?: {
    mode: "flight" | "bus" | "cruise";
    count: number;
  }[];
  isPriceEstimated?: boolean
};

export function ItinerarySharedCard(props: ItinerarySharedCardProps) {
  const {
    id,
    title,
    coverImage,
    startDate,
    endDate,
    price,
    creator,
    participants,
    cities,
    lodgingCount,
    experienceCount,
    transportSummary,
    isPriceEstimated = false,
  } = props;

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
  <Card className="w-full rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.015] bg-white cursor-pointer group">
          {/* Imagen más grande con overlay */}
      <div className="relative h-64 w-full overflow-hidden">

        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"

          style={{ backgroundImage: `url(${coverImage})` }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Contenido overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
          {/* Título */}
          <CardTitle className="text-lg text-white font-bold line-clamp-2">
            {title}
          </CardTitle>
          
          {/* Ciudades */}
          <p className="text-sm text-white/90 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {cities && cities.length > 0
              ? cities.length > 3
                ? `${cities.slice(0, 3).join(", ")} y más...`
                : cities.join(", ")
              : "Sin ciudades especificadas"}
          </p>
          
          {/* Fechas y transportes */}
          <div className="flex items-center justify-between text-sm text-white/90">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>
                {startDate} – {endDate}
              </span>
            </div>
            <div className="flex flex-row gap-2 text-sm">
              {transportSummary?.map(({ mode, count }) => (
                <div key={mode} className="flex flex-row items-center gap-1">
                  {mode === "flight" && (
                    <Plane className="w-4 h-4 text-amber-300" />
                  )}
                  {mode === "bus" && (
                    <BusFront className="w-4 h-4 text-yellow-300" />
                  )}
                  {mode === "cruise" && (
                    <Ship className="w-4 h-4 text-blue-300" />
                  )}
                  <span className="text-white/90">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center flex-row justify-start w-full gap-2 text-xs text-muted-foreground pb-1">
          {lodgingCount > 0 && (
            <span className="flex items-center gap-1 ">
              {lodgingCount} alojamiento{lodgingCount !== 1 ? "s" : ""}
            </span>
          )}
          {experienceCount > 0 && lodgingCount > 0 && (
            <span className="text-muted-foreground">•</span>
          )}
          {experienceCount > 0 && (
            <span className="flex items-center gap-1 ">
              {experienceCount} experiencia{experienceCount !== 1 ? "s" : ""} incluidas
            </span>
          )}
        </div>

        <Separator />

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={creator.avatarUrl} />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-sm leading-tight">
            <Link
              href={`/perfil/${creator.username}`}
              className="font-medium hover:underline"
            >
              @{creator.username}
            </Link>
            <p className="text-xs text-muted-foreground">Agente de viajes por toda España</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div className="flex -space-x-2 items-start relative">
            {participants.slice(0, 4).map((p) => (
              <Avatar key={p.id} className="h-7 w-7 border z-0">
                <AvatarImage src={p.avatarUrl} />
                <AvatarFallback>{p.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {participants.length > 4 && (
              <div className="z-10 relative">
                <Badge
                  variant="secondary"
                  className="h-5 text-[10px] px-2 py-0.5"
                >
                  +{participants.length - 4} más
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col justify-end">
          <div className="flex flex-row items-center gap-1">
            <span className="font-semibold text-primary text-base flex-shrink-0">{price}</span>
            {props.isPriceEstimated && (
              <Badge
                variant="outline"
                className="text-[10px] border-dashed border-2 border-red-600 text-red-600 px-2 py-0.5"
                title="Precio aproximado según estimaciones"
              >
                estimado
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            Por persona
          </span>
        </div>

        <Link href={`/viajes/${id}`}>
          <Button size="sm">Unirme</Button>
        </Link>
      </CardFooter>
    </Card>
    </Suspense>
  );
}