import TravelOptionsTabs from "@/components/landing/TravelOptionsTabs";
import { Progress } from "@/components/ui/progress";
import * as React from "react"
import EventDrivenProgress,{ EventDrivenProgressRef } from "@/components/shared/EventDrivenProgress";
import { useEffect, useRef, useState } from "react";


export default function TravelOptionsSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {


 const progressRef = useRef<EventDrivenProgressRef>(null);

  const handleStartLoading = () => {
    progressRef.current?.start();
  };

  const handleFinishLoading = () => {
    progressRef.current?.finish();
  };

  useEffect(() => {
    // Inicia el progreso después de 2 segundos
    const startTimer = setTimeout(() => {
      progressRef.current?.start();
      console.log("Progreso iniciado");
    }, 2000);

    // Finaliza el progreso después de 8 segundos
    const finishTimer = setTimeout(() => {
      progressRef.current?.finish();
      console.log("Progreso finalizado");
    }, 10000);

    // Limpieza de los timers cuando el componente se desmonta
    return () => {
      clearTimeout(startTimer);
      clearTimeout(finishTimer);
    };
  }, []);


  return (
<section className="relative w-full flex justify-center py-4">
      {/* Fondo SVG decorativo */}
      <div className="absolute z-[0] top-0 right-0 left-0 h-[90px] md:h-[110px]">
        <svg
           width="150%"
          height="150%"
          viewBox="0 0 1366 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M1366 98.1416H944.737C937.226 96.1686 930.661 91.3237 926.584 84.4805L897.799 36.165C892.388 27.0835 882.598 21.5195 872.026 21.5195H856V21.5H0V0.200195C0.64623 0.0690155 1.31506 1.39473e-08 2 0H1366V98.1416Z"
            fill="#0057A3"
          />
        </svg>
      </div>

      {/* Tabs interactivos */}
      <div className="w-full px-4 mt-[300px] lg:mt-[220px] md:px-8 flex flex-col items-center text-center">
       <TravelOptionsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

  <div className="max-w-7xl w-full p-2">
          <EventDrivenProgress ref={progressRef} />
  </div>
</div>

    </section>
  )
}
