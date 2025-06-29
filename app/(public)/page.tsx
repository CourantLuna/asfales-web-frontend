"use client"

import LandingSections from "@/components/landing/LandingSections";
import CustomCard from "@/components/shared/CustomCard";
import {  ImageCarouselv2, OverlayCarrusel, OverlayValue } from "@/components/shared/ImageCarouselv2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DemoCustomTable from "./DemoCustomTable";

interface HomePageProps {
  children?: React.ReactNode;
}


const imagesSrc = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",

];

const overlays: OverlayCarrusel[] = [
  {
    type: "badge",
    bgcolor: "bg-green-100",
    field: "price",
    align: "top-left",
    textColor: "text-black",
  },
  {
    type: "favorite",
    bgcolor: "bg-white",
    align: "top-right",
    actionFavorite: (idx) => alert("Favorito en " + idx),
  },
  {
    type: "badge",
    bgcolor: "bg-secondary",
    align: "bottom-right",
    field: "oferta",
  },
];

const overlayValues: OverlayValue = 
  { price: "$100", isFavorite: true, oferta: "Oferta" };

export default function Page({ children }: HomePageProps) {
  return (

  <div className="">

<DemoCustomTable />

<CustomCard
  cardWidth="w-1/3"
  orientationCard="vertical"
  images={imagesSrc}
  title="Viaja con Asfales"
  description="Comparador inteligente de viajes y experiencias."
  overlayCarrusel={overlays}
  overlayValues={overlayValues}
  content={
    <ul className="list-disc ml-4 text-sm space-y-1">
      <li>Busca vuelos, trenes, buses y ferris</li>
      <li>Itinerarios inteligentes con IA</li>
      <li>Alertas de precios y Plan B ante cancelaciones</li>
    </ul>
  }
  footer={<span className="text-xs text-muted-foreground">Equipo #3 - IDS352-1 INTEC</span>}
/>



  <LandingSections></LandingSections>


  </div>

);
}
