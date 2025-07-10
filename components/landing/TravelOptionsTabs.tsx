"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Plane, Bus, Ship, Hotel, Home, Building2,
Mountain as MountainIcon,
  TentTree as TentTreeIcon,
  Footprints as FootprintsIcon,
  Landmark as LandmarkIcon,
  Sun as SunIcon,
  UtensilsCrossed as UtensilsIcon,
  Music2 as MusicIcon,
  Laugh as LaughIcon,
  Mountain,
  Route,
  Clock,
  MapPin,
  Search,
  Filter, } from "lucide-react"

import { DateRange } from "react-day-picker"
import {  PassengerGroup } from "@/components/shared/standard-fields-component/PassengerSelector"
import { StandardTabs, TabItem } from "@/components/shared/standard-fields-component/StandardTabs"

import React from "react"

import TransportsSearchBar from "@/components/transport/TransportsSearchBar";
import LodgingHomeSearchBar from "@/components/lodging-search/LodgingHomeSearchBar";
import ExperiencesSearchBar from "@/components/experiences/ExperiencesSearchBar";
import ItinerariesSearchBar from "@/components/itineraries/ItinerariesSearchBar";
import { FilterOption } from "../ui/quick-filter";
import { Room } from "../shared/standard-fields-component/GuestSelector";
import { StandardSearchDataSource } from "../shared/standard-fields-component/StandardSearchField";
import { 
  searchDataSources,
  defaultDateRange,
  defaultPassengers,
} from "@/lib/data/mock-datavf";
import TravelSearchBarMobile from "../shared/TravelSearchBarMobile";



export default function TravelOptionsTabs({
  activeTab,
  setActiveTab,
  onScrollToResults,
  travelingFrom: externalTravelingFrom,
  setTravelingFrom: externalSetTravelingFrom,
  goingTo: externalGoingTo,
  setGoingTo: externalSetGoingTo,
  searchDataSourcesTravelOptions = searchDataSources
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  onScrollToResults: () => void,
  travelingFrom?: string,
  setTravelingFrom?: (value: string) => void,
  goingTo?: string,
  setGoingTo?: (value: string) => void,
  searchDataSourcesTravelOptions?: any[]
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchButtonLabel, setsearchButtonLabel] = useState("Buscar Opciones de Viaje");

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (pathname.startsWith("/global-") && pathname.endsWith("-search")) {
      router.replace(`/global-${tab}-search`);
    }
  }

  function handleBuscar() {
    if (onScrollToResults) onScrollToResults(); // <--- mueve el scroll
    
    // const y = window.scrollY || window.pageYOffset;
    // alert(`Scroll Y actual: ${y}`);
    router.push(`/global-${activeTab}-search`);
    setsearchButtonLabel("Filtrar Resultados");
  }

  useEffect(() => {
    const match = pathname.match(/^\/global-(.*)-search$/);
    if (match) {
      setActiveTab(match[1]);
      setsearchButtonLabel("Filtrar Resultados");
    } else {
      setActiveTab("transport");
      setsearchButtonLabel("Buscar Opciones de Viaje");
    }
  }, [pathname]);


  // Contenido de cada tab
  const getTransportContent = () => (
    <div className="w-full">
      <TransportsSearchBar 
        showSearchButton={false} 
        useToggleGroupTabsTransportType={true}

      />
    </div>
  );

  const getLodgingContent = () => (
    <LodgingHomeSearchBar showSearchButtonLodging={false} />
  );

  const getExperiencesContent = () => (
    <ExperiencesSearchBar showSearchButton={false} />
  );

  const getItinerariesContent = () => (
    <ItinerariesSearchBar showSearchButton={false} />
  );

  // Definición de los tabs
  const tabItems: TabItem[] = [
    {
      value: "transport",
      label: "Transporte",
      // icon: <Plane className="w-4 h-4" />,
      content: getTransportContent(),
    },
    {
      value: "lodging",
      label: "Alojamientos", 
      // icon: <Hotel className="w-4 h-4" />,
      content: getLodgingContent(),
    },
    {
      value: "experiences",
      label: "Experiencias",
      // icon: <Mountain className="w-4 h-4" />,
      content: getExperiencesContent(),
    },
    {
      value: "itineraries",
      label: "Itinerarios",
      // icon: <Route className="w-4 h-4" />,
      content: getItinerariesContent(),
    },
  ];

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 items-end justify-start flex flex-col gap-2">
      <StandardTabs
        items={tabItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobilePlaceholder="Selecciona una categoría"
        containerClassName="hidden lg:flex"
      />

      <div className="hidden lg:flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
        <Button
          className={
            "bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm"
          }
          variant="default"
          onClick={handleBuscar}
          // disabled={!goingTo || !travelingFrom}
        >
          {searchButtonLabel === "Buscar Opciones de Viaje" ? (
            <Search className="mr-2 h-4 w-4" />
          ) : (
            <Filter className="mr-2 h-4 w-4" />
          )}
          {searchButtonLabel}
        </Button>
      </div>

      <div className="w-full lg:hidden">
      <TravelSearchBarMobile/>
      </div>
    </div>
  );
}
