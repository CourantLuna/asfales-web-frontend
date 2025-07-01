"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Eye, Plus } from "lucide-react";

const itineraries = [
  {
    title: "Escapada Cultural en Ciudad de México",
    tags: ["CDMX", "Museos", "Chapultepec"],
    price: "$620 USD",
    duration: "3 días / 2 noches",
    dates: "12–14 ago 2025",
    participants: ["MA", "JG", "ED", "NP"],
    image: "/itinerarios/cdmx-1.jpg",
    airline: "Aeroméxico",
    hotel: "Hotel Histórico Central",
  },
  {
    title: "Bogotá Gastronómica (4 días)",
    tags: ["Bogotá", "Usaquén", "Comida local"],
    price: "$710 USD",
    duration: "4 días / 3 noches",
    dates: "19–22 sep 2025",
    participants: ["CP", "RS", "VL"],
    image: "/itinerarios/bogota-1.jpg",
    airline: "Avianca",
    hotel: "Hilton Bogotá",
  },
  {
    title: "Buenos Aires Exprés",
    tags: ["Buenos Aires", "Recoleta", "Tango"],
    price: "$530 USD",
    duration: "2 días / 1 noche",
    dates: "Por confirmar",
    participants: ["MJ", "LF"],
    image: "/itinerarios/baires-1.jpg",
    airline: "Aerolíneas Argentinas",
    hotel: "CasaSur Recoleta Hotel",
  },
];

export default function ExploreItineraries() {
  return (
    <section className="w-full">
     <div className="max-w-7xl mx-auto px-4 py-12">
       <div className="text-start mb-10">
        <h2 className="text-3xl font-bold">Ideas de Itinerarios Populares</h2>
        <p className="text-muted-foreground mt-2">
          Inspírate con planes colaborativos y experiencias compartidas por
          otros viajeros
        </p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {itineraries.map((item, i) => (
            <CarouselItem key={i} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden h-full flex flex-col">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover h-40 w-full"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag, j) => (
                      <Badge key={j} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    {item.duration} · {item.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📅 {item.dates}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✈️ {item.airline} · 🏨 {item.hotel}
                  </p>
                  <div className="flex items-center gap-2">
                    {item.participants.slice(0, 2).map((p, j) => (
                      <Avatar key={j} className="w-6 h-6">
                        <AvatarFallback>{p}</AvatarFallback>
                      </Avatar>
                    ))}
                    {item.participants.length > 2 && (
                      <Badge variant="outline">
                        +{item.participants.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-10 flex justify-end">
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}>
          <Eye className="w-4 h-4 mr-2" />
          Ver itinerarios compartidos
        </Button>
      </div>
     </div>
    </section>
  );
}
