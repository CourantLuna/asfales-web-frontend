"use client";

import React, { useRef, useState } from "react";
import {
  ImageButtonSheet,
  ImageButtonSheetItem,
} from "@/components/shared/standard-fields-component/ImageButtonSheet";
import FlightsSearchBar from "@/components/transport/Fligths/FlightsSearchBar";
import LodgingHomeSearchBar from "@/components/lodging-search/LodgingHomeSearchBar";
import BusesSearchBar from "@/components/transport/Buses/BusesSearchBar";
import ItinerariesSearchBar from "@/components/itineraries/ItinerariesSearchBar";
import ExperiencesSearchBar from "@/components/experiences/ExperiencesSearchBar";
import CruisesSearchBar from "@/components/transport/Cruises/CruisesSearchBar";
import { MobileLodgingResultsTemplate } from "@/components/lodging-search/MobileLodgingResultsTemplate";
import { defaultPassengers } from "@/lib/data/mock-datavf";
import MobileFlightResultsTemplate from "../transport/Fligths/Mobile/MobileFlightResultsTemplate";
import MobileCruiseResultsTemplate from "../transport/Cruises/mobile/MobileCruiseResultsTemplate";
import MobileBusResultsTemplate from "../transport/Buses/mobile/MobileBusResultsTemplate";
import MobileExperiencesResultsTemplate from "../experiences/mobile/MobileExperiencesResultsTemplate";
import MobileItinerariesResultsTemplate from "../itineraries/mobile/MobileItinerariesResultsTemplate";

interface TravelSearchBarMobileProps {
  /**
   * Acción para el botón de búsqueda de vuelos
   */
  onFlightsSearch?: () => void;

  /**
   * Acción para el botón de búsqueda de alojamiento
   */
  onLodgingSearch?: () => void;

  /**
   * Acción para el botón de búsqueda de buses
   */
  onBusSearch?: () => void;

  /**
   * Acción para el botón de búsqueda de itinerarios
   */
  onItinerariesSearch?: () => void;

  /**
   * Acción para el botón de búsqueda de experiencias
   */
  onExperiencesSearch?: () => void;

  /**
   * Acción para el botón de búsqueda de cruceros
   */
  onCruisesSearch?: () => void;

  /**
   * Clase CSS para el contenedor principal
   */
  className?: string;
}
function onFlightsSearch()
{
console.log("Búsqueda de vuelos ejecutada x2")
}
export default function TravelSearchBarMobile({
  onFlightsSearch = () => console.log("Búsqueda de vuelos ejecutada"),
  onLodgingSearch = () => console.log("Búsqueda de alojamiento ejecutada"),
  onBusSearch = () => console.log("Búsqueda de buses ejecutada"),
  onItinerariesSearch = () => console.log("Búsqueda de itinerarios ejecutada"),
  onExperiencesSearch = () => console.log("Búsqueda de experiencias ejecutada"),
  onCruisesSearch = () => console.log("Búsqueda de cruceros ejecutada"),
  className,
}: TravelSearchBarMobileProps) {
  const [showLodgingResults, setShowLodgingResults] = useState(false);
  const [showFlightResults, setShowFlightResults] = useState(false);
  const [showCruiseResults, setShowCruiseResults] = useState(false);
  const [showBusResults, setShowBusResults] = useState(false);
  const [showItinerariesResults, setShowItinerariesResults] = useState(false);
  const [showExperiencesResults, setShowExperiencesResults] = useState(false);


  const [selectedLodgingType, setSelectedLodgingType] =
    useState<string>("hotels-and-resorts");
    const searchBarRef = useRef<any>(null);

  //   const handleExternalSearch = () => {
  //   if (searchBarRef.current) {
  //     //quiero que aca pues se añada a la ruta //transports
  //     searchBarRef.current.executeSearch(); // 🔥 Llama al handleSearch del hijo
  //   }
  // };
  // Configuración de los items para ImageButtonSheet
  const sheetItems: ImageButtonSheetItem[] = [
    // 1. Vuelos
    {
      label: "Vuelos",
      src: "/menu-icons/plane-icon.svg",
      size: 64,
      sheetContent: <FlightsSearchBar showSearchButton={false} ref={searchBarRef} />,
      sheetTitle: "Búsqueda de Vuelos",
      btnLabel: "Buscar Vuelos",
      btnAction: () => {
        onFlightsSearch();
        setShowFlightResults(true);
      },
      key: "flights",
    },

    // 2. Alojamiento - Actualizado
    {
      label: "Alojamiento",
      src: "/menu-icons/lodging-icon.svg",
      size: 64,
      sheetContent: (
        <LodgingHomeSearchBar
          showSearchButtonLodging={false}
          onLodgingTypeChange={setSelectedLodgingType}
        />
      ),
      sheetTitle: "Búsqueda de Alojamiento",
      btnLabel: "Buscar Alojamiento",
      btnAction: () => {
        onLodgingSearch();
        setShowLodgingResults(true);
      },
      key: "lodging",
    },

    // 3. Buses
    {
      label: "Buses",
      src: "/menu-icons/bus-icon.svg",
      size: 64,
      sheetContent: <BusesSearchBar showSearchButton={false} />,
      sheetTitle: "Búsqueda de Buses",
      btnLabel: "Buscar Buses",
       btnAction: () => {
        onBusSearch();
        setShowBusResults(true);
      },
      key: "buses",
    },

    // 4. Itinerarios
    {
      label: "Itinerarios",
      src: "/menu-icons/itineraries-icon.svg",
      size: 64,
      sheetContent: <ItinerariesSearchBar showSearchButton={false} />,
      sheetTitle: "Búsqueda de Itinerarios",
      btnLabel: "Buscar Itinerarios",
      btnAction: () => {
        onItinerariesSearch();
        setShowItinerariesResults(true);
      },
      key: "itineraries",
    },

    // 5. Experiencias
    {
      label: "Experiencias",
      src: "/menu-icons/activities-icon.svg",
      size: 64,
      sheetContent: <ExperiencesSearchBar showSearchButton={false} />,
      sheetTitle: "Búsqueda de Experiencias",
      btnLabel: "Buscar Experiencias",
      btnAction: () => {
        onExperiencesSearch();
        setShowExperiencesResults(true);

      },
      key: "experiences",
    },

    // 6. Cruceros
    {
      label: "Cruceros",
      src: "/menu-icons/cruise-icon.svg",
      size: 64,
      sheetContent: <CruisesSearchBar showSearchButton={false} />,
      sheetTitle: "Búsqueda de Cruceros",
      btnLabel: "Buscar Cruceros",
       btnAction: () => {
        onCruisesSearch();
        setShowCruiseResults(true);
      },
      key: "cruises",
    },
  ];

  return (
    <>
      <div className={className}>
        <ImageButtonSheet
          items={sheetItems}
          labelClassName="text-lg mx-auto mb-4"
          label="¿Qué deseas buscar?"
          containerClassName="w-full"
          gridColsClassName="grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6"
          buttonsContainerClassName="w-full justify-center gap-6"
          buttonClassName="w-full flex items-center justify-center"
          buttonLabelClassName="text-xs font-medium mt-1"
        />
      </div>

      <MobileLodgingResultsTemplate
        LodgingType={selectedLodgingType}
        open={showLodgingResults}
        onOpenChange={setShowLodgingResults}
      />
      
      <MobileFlightResultsTemplate  
      open={showFlightResults}
      onOpenChange={setShowFlightResults} />

      <MobileCruiseResultsTemplate
      open={showCruiseResults}
      onOpenChange={setShowCruiseResults} />

      <MobileBusResultsTemplate
      open={showBusResults}
      onOpenChange={setShowBusResults} />

      <MobileExperiencesResultsTemplate
      open={showExperiencesResults}
      onOpenChange={setShowExperiencesResults} />
      
      <MobileItinerariesResultsTemplate
      open={showItinerariesResults}
      onOpenChange={setShowItinerariesResults} />


    </>
  );
}
