"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRef, useState } from "react";
import Hero from "@/components/landing/sections/Hero";
import TravelOptionsSection from "@/components/landing/sections/TravelOptionsSection";
import SearchBoxOverlay from "@/components/landing/sections/SearchBoxOverlay";
import { Clock, Plane, MapPin, Building2 } from "lucide-react";


interface LandingPageProps {
  children?: React.ReactNode;
}

export default function LandingSkeleton({ children }: LandingPageProps) {
  const [searchValues, setSearchValues] = useState<{ origin: string; destination: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("transport");
  
  // Estados compartidos para origen y destino - inicializar con valores deterministas
  const [travelingFrom, setTravelingFrom] = useState<string>("sdo");
  const [goingTo, setGoingTo] = useState<string>("mad");
  
  // Funciones wrapper para logging
  const handleTravelingFromChange = (value: string) => {
    console.log('🔄 travelingFrom changed to:', value);
    setTravelingFrom(value);
  };
  
  const handleGoingToChange = (value: string) => {
    console.log('🔄 goingTo changed to:', value);
    setGoingTo(value);
  };
  
  // Fuentes de datos compartidas
  const searchDataSources = [
    {
      id: "recent",
      label: "Búsquedas recientes", 
      icon: <Clock className="h-4 w-4" />,
      type: "recent" as const,
      nameLabelField: "destination",
      nameValueField: "searchId", 
      nameDescriptionField: "period",
      options: [
        { 
          destination: "Medellín (MDE - A. Internacional José...)", 
          searchId: "med1", 
          period: "3 de julio–6 de julio"
        },
        { 
          destination: "Miami (MIA - Aeropuerto Internacional...)", 
          searchId: "mia1", 
          period: "1 de julio–30 de agosto • 60 noches • 2..."
        },
        { 
          destination: "San Juan de la Maguana", 
          searchId: "sj1", 
          period: "2 de junio–3 de junio • 1 noche • 2..."
        },
      ]
    },
    {
      id: "airports",
      label: "Aeropuertos",
      icon: <Plane className="h-4 w-4" />,
      type: "airport" as const,
      nameLabelField: "name",
      nameValueField: "code",
      nameDescriptionField: "city",
      options: [
        { name: "Madrid (MAD - Aeropuerto Barajas)", code: "mad", city: "Capital de España" },
        { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "bcn", city: "Ciudad mediterránea" },
        { name: "París (CDG - Charles de Gaulle)", code: "par", city: "Ciudad de la luz" },
        { name: "Londres (LHR - Heathrow)", code: "lon", city: "Capital británica" },
        { name: "Santo Domingo (SDO - Aeropuerto Internacional de las Americas)", code: "sdo", city: "Santo Domingo" },
      ]
    },
    {
      id: "cities",
      label: "Ciudades",
      icon: <MapPin className="h-4 w-4" />,
      type: "city" as const,
      nameLabelField: "cityName",
      nameValueField: "cityCode",
      nameDescriptionField: "description",
      options: [
        { cityName: "Roma, Italia", cityCode: "rom", description: "Ciudad eterna" },
        { cityName: "Nueva York, EE.UU.", cityCode: "nyc", description: "La gran manzana" },
        { cityName: "Tokyo, Japón", cityCode: "tyo", description: "Metrópolis moderna" },
        { cityName: "Buenos Aires, Argentina", cityCode: "bue", description: "París de Sudamérica" },
      ]
    },
    {
      id: "hotels",
      label: "Hoteles",
      icon: <Building2 className="h-4 w-4" />,
      type: "hotel" as const,
      nameLabelField: "hotelName",
      nameValueField: "hotelId",
      nameDescriptionField: "location",
      options: [
        { hotelName: "Hotel Ritz Madrid", hotelId: "ritz-mad", location: "Lujo en el centro de Madrid" },
        { hotelName: "Hotel Majestic Barcelona", hotelId: "maj-bcn", location: "Elegancia en Passeig de Gràcia" },
      ]
    }
  ];

  function scrollToResults() {
    smoothScrollTo(resultsRef.current?.offsetTop ?? 0, 1000);
  }

  function smoothScrollTo(targetY: number, duration = 800) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percent, 3); // easeOutCubic
      window.scrollTo(0, startY + diff * ease);
      if (progress < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const handleSearch = (origin: string, destination: string) => {
    console.log('🔍 LandingSkeleton.handleSearch called with:', { origin, destination });
    setSearchValues({ origin, destination });
    handleTravelingFromChange(origin);
    handleGoingToChange(destination);
    console.log('🔍 State updated:', { travelingFrom: origin, goingTo: destination });
    smoothScrollTo(resultsRef.current?.offsetTop ?? 0, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      {/* Imagen de fondo + overlay */}
      <div className="absolute w-full bg-[url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')] bg-cover bg-center pointer-events-none">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        <SearchBoxOverlay 
          onSearch={handleSearch}
          dataSources={searchDataSources}
          originValue={travelingFrom}
          onOriginValueChange={handleTravelingFromChange}
          destinationValue={goingTo}
          onDestinationValueChange={handleGoingToChange}
          activeTab={activeTab}
          onScrollToResults={scrollToResults}
        />
      </div>

      <div className="relative min-h-svh">
        <Hero />

        <div ref={resultsRef}>
          <TravelOptionsSection
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onScrollToResults={scrollToResults}
            // Props para sincronización de campos
            travelingFrom={travelingFrom}
            setTravelingFrom={handleTravelingFromChange}
            goingTo={goingTo}
            setGoingTo={handleGoingToChange}
            searchDataSources={searchDataSources}
          />

          {children}
        </div>
      </div>
    </div>
  );
}
