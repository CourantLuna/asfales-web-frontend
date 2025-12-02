// File: asfales-web-frontend/components/lodging-search/LodgingResultsTemplate.tsx

"use client";
import { Lodging } from "@/types/lodging.types";
import { RowData } from "../shared/RenderFields";
import LodgingCardList from "./LodgingCard";
import { fetchLodgings } from "@/services/lodging.service";
import { useEffect, useRef, useState } from "react";
import EventDrivenProgress, {
  EventDrivenProgressRef,
} from "@/components/shared/EventDrivenProgress";
import React from "react";
import { CustomSelectOption } from "../shared/CustomSelect";
import { AirVent, Bath, Bus, Car, Dices, Dumbbell, MapPin, Mountain, Phone, Utensils, WashingMachine, Waves, Wifi, Building2, LandPlot } from "lucide-react";
import { CheckboxOption } from  "../shared/standard-fields-component/CheckboxFilter";
import SearchWithFilters from "../shared/SearchWithFilters";
import { AdItem } from "../shared/Ads";
import { LodgingResultsTemplateProps } from "@/lib/data/lodging-types";
import { createDataSourcesLodging } from "@/lib/data/lodging-config";
import { getFilterOptionsForLodgingType, getFiltersForLodgingType, getPriceRangeForType } from "@/lib/data/lodging-utils";
import { lodgingAds, sortOptions } from "@/lib/data/lodging-filter-options";
import { get } from 'http';
import { list } from "postcss";


export default function LodgingResultsTemplate({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  LodgingData,
  LodgingType, // Por defecto es "hotels"
}: LodgingResultsTemplateProps) {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);
const listRef:any = useRef();

  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Configuración del data source para búsqueda de propiedades
  const dataSourcesLodging = React.useMemo(() => {
   return createDataSourcesLodging(rows)
}, [rows]);

  // Filtros específicos por tipo de lodging
  const getFiltersForLodgingTypeLocal = React.useMemo(() => {
    return getFiltersForLodgingType(LodgingType || "hotels-and-resorts", filterDefaults, dataSourcesLodging);
  }, [dataSourcesLodging, filterDefaults, LodgingType]);

  // Actualizar el precio rango según el tipo
  const getPriceRangeForTypeLocal = React.useMemo(() => {
    return getPriceRangeForType(LodgingType || "hotels-and-resorts"); 
  }, [LodgingType]);

  // Aplicar configuración de precio dinámico a los filtros
  const filters = React.useMemo(() => {
    return getFiltersForLodgingTypeLocal.map(filter => {
      if (filter.id === "price-range") {
        const priceConfig = getPriceRangeForTypeLocal;
        return { ...filter, ...priceConfig };
      }
      return filter;
    });
  }, [getFiltersForLodgingTypeLocal, getPriceRangeForTypeLocal]);

  // Opciones específicas por tipo de lodging
  const getFilterOptionsForLodgingTypeLocal = React.useMemo(() => {

     return getFilterOptionsForLodgingType(LodgingType || "hotels-and-resorts")
  }, [LodgingType]);


  function getCompareItems (items: string[]) {
    console.log("Obteniendo items de comparación...", items);

  }

// Dispara la barra de progreso siempre que loading sea distinto de false
  useEffect(() => {
    if (loading !== false) {
      setTimeout(() => {
        progressRef.current?.start();
      }, 0);
    } else {
      progressRef.current?.finish();
    }
  }, [loading]);



// Efecto separado para manejar cambios en LodgingData
useEffect(() => {
  if (LodgingData && LodgingData.length > 0) {
    setLoading(true);
    setTimeout(() => {     
      setRows(LodgingData);
      setLoading(false);
    }, 1000);
  }
}, [LodgingData]);


  if (loading)
    return <EventDrivenProgress ref={progressRef} className="w-full my-4 px-0 md:px-0" />;

  return (
    <div className={className}>
      <SearchWithFilters
        rows={rows}
        // Nueva API genérica - usando filtros dinámicos
        filters={filters}
        filterOptions={getFilterOptionsForLodgingTypeLocal}
        showToggleShowFilters={true}
        // Configuración
        sortOptions={sortOptions}
        enableCompareMode={true}
        compareConfig={{
          titleOff: "Comparar propiedades",
          subtitleOff: "Obtén una vista lado a lado de hasta 5 propiedades",
          titleOn: "Comparando propiedades",
          subtitleOn: "Selecciona propiedades para comparar lado a lado"
        }}
        ads={lodgingAds} // Anuncios de ejemplo
        adsGap={4} // Espacio entre anuncios (space-y-4 para col)
        adsDirection="col" // Dirección columna: width=full, height=individual
        showAds={true} // Mostrar anuncios
        adsContainerClassName="hidden xl:block flex-shrink-0 w-[12%]" // Clase para el contenedor de anuncios

        // Textos personalizables
        searchPlaceholder="Buscar alojamiento..."
        noResultsMessage="No se encontraron propiedades"
        clearFiltersText="Limpiar filtros"
        sortByText="Ordenar por"
        howItWorksText="¿Cómo funciona nuestro orden?"
        resultsCountText={(count) => `${count}+ alojamientos`}
        renderResults={({ filteredRows, compareMode, onCardClick: internalOnCardClick }) => (
          console.log("filteredRows", ) ,
        
listRef.current && listRef.current.reset(),

          <LodgingCardList
            ref={listRef}
            onCardClick={onCardClick || internalOnCardClick}
            rows={filteredRows}
            showCompareCheckbox={compareMode}
            initialVisibleCards={6}
            cardsPerStep={6}
            showMoreLabel="Mostrar más alojamientos"
            showLessLabel="Mostrar menos"
            enableShowLess={true}
            
          />
        )}
        onCardClick={onCardClick || ((idx, row) => alert(`¡Click en card #${idx}: ${row.title} ubicado en ${row.location}!`))}
        onFiltersChange={onFiltersChange || ((filters) => console.log("Filters changed:", filters))}



      />
    </div>
  );
}
