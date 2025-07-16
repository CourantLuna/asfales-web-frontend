"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
import { set } from "date-fns";



export default function TravelOptionsTabs({
  activeTab,
  setActiveTab,
  onScrollToResults,

  searchDataSourcesTravelOptions = searchDataSources
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  onScrollToResults: () => void,
  searchDataSourcesTravelOptions?: any[]
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (pathname.startsWith("/global-") && pathname.endsWith("-search")) {
      // Mantener los parámetros actuales al cambiar la ruta
      const currentParams = searchParams.toString();
      const newPath = `/global-${tab}-search`;
      const fullUrl = currentParams ? `${newPath}?${currentParams}` : newPath;
      router.replace(fullUrl);
    }
  }

    const updateUrlWithType = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Construir los parámetros de la URL de forma segura
    // Agregar parámetro para mostrar resultados
    params.set("transportType", "flights");
    params.set("lodgingType  ", "hotels-and-resorts");

    
    // Actualizar la URL manteniendo otros parámetros existentes
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const match = pathname.match(/^\/global-(.*)-search$/);
    if (match) {
      setActiveTab(match[1]);
      if (onScrollToResults) onScrollToResults(); // <--- mueve el scroll
    } else {
      setActiveTab("transport");

    }
  }, [pathname]);


  // Contenido de cada tab
  const getTransportContent = () => (
    <div className="w-full">
      <TransportsSearchBar 
        useToggleGroupTabsTransportType={true}
      />
    </div>
  );

  const getLodgingContent = () => (
    <LodgingHomeSearchBar basePath="/global-lodging-search"  />
  );

  const getExperiencesContent = () => (
    <ExperiencesSearchBar basePathUrl="/global-experiences-search" />
  );

  const getItinerariesContent = () => (
    <ItinerariesSearchBar basePathUrl="/global-itineraries-search" />
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

      <div className="w-full md:hidden">
      <TravelSearchBarMobile/>
      </div>
    </div>
  );
}
