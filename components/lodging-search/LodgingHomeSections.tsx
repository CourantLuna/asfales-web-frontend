'use client';

import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import CustomCard from "@/components/shared/CustomCard";

interface ILodgingHomeSectionsProps {}

export default function LodgingHomeSections() {
  const handleCardClick = (cardType: string) => {
    console.log(`Clicked on ${cardType} card`);
  };

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className="w-full py-8 h-[auto]">
      <h2 className="text-2xl font-bold mb-6">Ideas para tu próximo viaje</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Card Principal - Más grande - 70% en lg */}
        <div className="w-full lg:w-[65%] flex">
          <CustomCard
            cardWidth="w-full"
            carouselWidth='w-full'
            carouselHeight='h-[300px]'
            cardHeight='h-[300px]'
            title=""
            description=""
            images={[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            ]}
            orientationCard="vertical"
            className="rounded-xl"
            showCompareCheckbox={false}
            onClick={() => handleCardClick("cancelacion-gratis")}
            // Para el overlay personalizado, necesitaremos crear un custom overlay
            content={
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    Cancelación gratis en la mayoría de los hoteles
                  </h3>
                  <p className="text-sm opacity-90">
                    Porque la flexibilidad es importante.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Cards Laterales - 30% en lg */}
        <div className="w-full lg:w-[35%] flex flex-col space-y-6">
          {/* Ad Card 1 */}
          <CustomCard
            title="Crea recuerdos en Maryland"
            description="Este verano, disfruta de actividades divertidas para toda la familia."
            images={[
              "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ]}
                        carouselWidth='w-1/3'
                cardWidth='w-full'
            orientationCard="horizontal"
            className="rounded-xl"
            showCompareCheckbox={false}
            onClick={() => handleCardClick("maryland")}
            overlayCarrusel={{
              type: "badge",
              bgcolor: "bg-blue-600",
              field: "badge",
              align: "top-left",
              textColor: "text-white"
            }}
            overlayValues={{
              badge: "Anuncio"
            }}
            content={
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Info clicked");
                  }}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            }
          />

          {/* Ad Card 2 */}
          <CustomCard
            title="Cuando vuelvas a viajar, estaremos para servirte."
            description="Ideas e inspiración para viajar"
            images={[
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            ]}
                        carouselWidth='w-1/3'
            cardWidth='w-full'
            orientationCard="horizontal"
            className="rounded-xl"
            showCompareCheckbox={false}
            onClick={() => handleCardClick("inspiracion")}
          />
        </div>

   <div className="align-center">

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossOrigin="anonymous"></script>
<ins className="adsbygoogle"
style={{ display: 'block', width: '100%', height: '90px' }}
data-ad-client="ca-pub-1234567890123456"
data-ad-slot="1234567890"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

      </div>


      </div>
    </div>
    
    </Suspense>
  );
}

