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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  HeartHandshake,
  Edit,
  Delete,
  Edit2,
} from "lucide-react";
import { Suspense } from "react";
import { ItineraryTransport } from "@/lib/data/itineraries-data";
import { tr } from "date-fns/locale";

type Participant = {
  id: string;
  name: string;
  avatarUrl?: string;
  userName?: string
};

type ItinerarySharedCardProps = {
  id: string;
  title: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  price: string;
  creator: Participant;
  creatorBio?: string; // opcional para mostrar en perfil
  colaborators?: Participant[];
  showwRowColaborators?: boolean;
  participants: Participant[];
  maxParticipants?: number; // máximo de participantes permitido  
  cities?: string[]; // ejemplo: ["Roma", "Florencia", "Venecia"]
  lodgingCount: number; // total de alojamientos
  experienceCount: number; // excursiones, tours,
  transport?: ItineraryTransport[];
  currentUserRole?: "creator" | "collaborator" | "participant"; // rol del usuario actual
  showDeleteBtn?: boolean; // si se muestra el botón de eliminar
  transportSummary?: {
    mode: "flight" | "bus" | "cruise";
    count: number;
  }[];
  isPriceEstimated?: boolean
  ownerBadge?: boolean; // si se debe mostrar badge de propietario
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
    creatorBio,
    participants,
    cities,
    lodgingCount,
    experienceCount,
    transportSummary,
    isPriceEstimated = false,
    maxParticipants,
    colaborators,
    showwRowColaborators = false,
    ownerBadge = false,
    transport = [],
    showDeleteBtn = true,
    currentUserRole = "participant", // por defecto es participante
  } = props;

 

  return (
    <Suspense
      fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
    >
      <TooltipProvider>
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
                  {transport && transport.length > 0 ? (
                    (() => {
                      // Count transport types
                      const counts = {
                        flight: 0,
                        bus: 0,
                        cruise: 0
                      };
                      
                      // Count each type
                      transport.forEach(t => {
                        if (t.type === "flight") counts.flight++;
                        if (t.type === "bus") counts.bus++;
                        if (t.type === "cruise") counts.cruise++;
                      });
                      
                      // Display counts with icons
                      return (
                        <div className="flex gap-2">
                          {counts.flight > 0 && (
                            <span className="flex items-center gap-1">
                              <Plane className="w-4 h-4 text-amber-300" />
                              {counts.flight}
                            </span>
                          )}
                          {counts.bus > 0 && (
                            <span className="flex items-center gap-1">
                              <BusFront className="w-4 h-4 text-yellow-300" />
                              {counts.bus}
                            </span>
                          )}
                          {counts.cruise > 0 && (
                            <span className="flex items-center gap-1">
                              <Ship className="w-4 h-4 text-blue-300" />
                              {counts.cruise}
                            </span>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    null
                  )}

                  {/* {transportSummary?.map(({ mode, count }) => (
                    <div
                      key={mode}
                      className="flex flex-row items-center gap-1"
                    >
                      {mode === "flight" && (
                        <Plane className="w-4 h-4 text-amber-300" />
                      )}
                      {mode === "bus" && (
                        <BusFront className="w-4 h-4 text-yellow-300" />
                      )}
                      {mode === "cruise" && (
                        <Ship className="w-4 h-4 text-blue-300" />
                      )}
                      <span className="text-white/90">{count}</span>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>

          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center flex-row justify-between w-full gap-2 text-xs text-muted-foreground pb-1">
             <div className="flex items-center gap-0.5">
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
                  {experienceCount} experiencia
                  {experienceCount !== 1 ? "s" : ""} incluidas
                </span>
              )}
             </div>
              {ownerBadge && (
                <Badge className="bg-emerald-500 text-white text-xs">
                  Propietario
                </Badge>)}
              
            </div>

            <Separator />


           {!ownerBadge && (
             <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={creator.avatarUrl} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm leading-tight">
                <div className="flex items-center">
                  <Link
                    href={`/perfil/${creator.userName}`}
                    className="font-medium text-lg hover:underline"
                  >
                    @{creator.userName}
                  </Link>

                  {/* Ícono con badge superpuesto */}
                  {colaborators && colaborators.length > 0 && !showwRowColaborators && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative inline-flex items-center justify-center ml-2 cursor-help">
                          <div className="bg-emerald-500/50 inline-flex items-center justify-center rounded-full p-1.5">
                            <HeartHandshake className="w-5 h-5 text-white" />
                          </div>

                          {/* Badge superpuesto */}
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                            {colaborators.length > 99
                              ? "99+"
                              : colaborators.length}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="max-w-xs p-3 bg-white border shadow-lg"
                      >
                        <div className="space-y-2">
                          <p className="font-semibold text-sm text-gray-900">
                            Colaboradores del viaje
                          </p>
                          <div className="space-y-0">
                            {colaborators.map((collaborator, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <Link
                                  href={`/profile/${collaborator.userName}`}
                                  className="text-sm text-gray-700 hover:underline"
                                >
                                  @{collaborator.userName}
                                </Link>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Estos usuarios están colaborando en el itinerario
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}

                 
                </div>

                    <p className="text-xs text-muted-foreground">
                  {creatorBio || "Agente de viajes en Medellin"}
                </p>
                  
              
              </div>
            </div>
           )}

            <div className="flex items-center justify-between ">
               {showwRowColaborators && colaborators && colaborators.length > 0 && ( 
                    <div className="flex items-center justify-between gap-2">
              <Badge className="flex -space-x-2 items-center relative bg-emerald-500/50">
                <HeartHandshake className="w-6 h-6 text-white mr-2" />
                {colaborators?.slice(0, 4).map((p) => (
                  <Avatar key={p.id} className="h-6 w-6 border z-0">
                    <AvatarImage src={p.avatarUrl} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                 {colaborators.length > 4 && (
                  <div className="absolute -top-2 -right-3 z-10 items-start flex">
                    <Badge
                    
                      className="bg-emerald-700  text-[10px] px-1.5"
                    >
                      +{colaborators.length - 4} 
                    </Badge>
                  </div>
                )}
              </Badge>
            </div>
                  )}

             { !showwRowColaborators && (
               <div className="flex -space-x-2 items-start relative">
                {participants.slice(0, 4).map((p) => (
                  <Avatar key={p.id} className="h-7 w-7 border z-0">
                    <AvatarImage src={p.avatarUrl} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {participants.length > 4 && (
                  <div className="absolute -top-1 -right-4 z-10 items-start flex">
                    <Badge
                      variant="secondary"
                      className=" h-5 text-[10px] px-1.5"
                    >
                      +{participants.length - 4} 
                    </Badge>
                  </div>
                )}
              </div>
             )}

              <span className="flex items-center text-muted-foreground text-sm ml-auto">
                <Users className="h-4 w-4 mr-1 " />
                {participants.length}
                {maxParticipants ? `/${maxParticipants}` : ""}
              </span>
            </div>

            
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <div className="flex flex-col justify-end">
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold text-primary text-base flex-shrink-0">
                  {price}
                </span>
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
              <span className="text-xs text-muted-foreground">Por persona</span>
            </div>

            <div className="flex items-end gap-2 justify-end flex-row ml-auto">
              { currentUserRole === "participant" && (
                <Link href={`/viajes/${id}`}>
              <Button >Unirme</Button>
            </Link>
              )}
              { currentUserRole === "collaborator" && (
                <Link href={`/viajes/${id}/editar`}>
                  <Button className=""><Edit2 className="w-8 h-8" /> Editar</Button>
                </Link>
              )}
              { currentUserRole === "creator" && (
                <>
                 {showDeleteBtn ? (
                   <Link  href={`/viajes/${id}/eliminar`}>
                  <Button variant={"destructive"}> <Delete size={32} />Eliminar</Button>
                </Link>
                ) : null}
                
                 <Link href={`/viajes/${id}/editar`}>
                  <Button variant={"secondary"}><Edit2 size={32} /> Editar</Button>
                </Link>
                </>
              )}

            
           
            </div>
          </CardFooter>
        </Card>
      </TooltipProvider>
    </Suspense>
  );
}