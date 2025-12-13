'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '@/components/shared/SearchWithFilters';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import CustomCruiseCard from './CustomCruiseCard';
import { Ship, Clock } from 'lucide-react';
import { TransportTrip } from '../types/transport.types';

// IMPORTANTE: Ajusta esta ruta a donde guardaste el archivo del paso anterior
import { getCruiseResultSets, CruiseSearchFilters } from '../Cruises/lib/CruisesMockData'; 
import { useSearchParams } from 'next/navigation';

interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  cruiseLines?: string[];
  departureTime?: string[];
  duration?: string[];
  amenities?: string[];
  cabinTypes?: string[];
  destinations?: string[];
}

interface CruisesResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  cruiseData?: TransportTrip[]; // Ajustado el tipo para evitar any[]
  onCabinSelect?: (cruiseId: string, cabinType: string) => void;
}

const CruisesResultsTemplate: React.FC<CruisesResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  cruiseData, // Si vienen datos pre-cargados (SSR)
  onCabinSelect
}) => {
  const [rows, setRows] = useState<any[]>(cruiseData || []);
  const [loading, setLoading] = useState(!cruiseData);

  const searchParams = useSearchParams();
  
  const params = {
    to: searchParams.get("to"),
    departureDate: searchParams.get("departureDate"),
    showresults: searchParams.get("showresults"),
    transportType: searchParams.get("transportType"),
    maxNights: searchParams.get("maxNights"),
    minNights: searchParams.get("minNights"),
  };

  // 1. Cargar datos reales desde Google Sheets usando getCruiseResultSets
  useEffect(() => {

    async function loadData() {
      setLoading(true);
      try {
        // Llamamos sin filtros para traer todo el dataset y dejar que SearchWithFilters filtre en cliente
        // O podrías pasar filterDefaults aquí si quisieras filtrado en servidor.
        const filters: CruiseSearchFilters = {
          to: params.to,
          departureDate: params.departureDate,
          minNights: params.minNights,
          maxNights: params.maxNights
        }; 
        console.log("🚢 Loading cruise data in CruiseResultsTemplate with filters:", filters);
        let data = await getCruiseResultSets(filters);
        data = data.map(cruise => ({
          ...cruise,
          // Añadimos un label legible para duración en noches
          durationNightsLabel: translateDurationNights(cruise.durationNights),
          amenitiesBoolean: Object.fromEntries(Object.entries(cruise.amenities || {}).map(([key, value]) => [key, Boolean(value)])),
          departureDateMonth: cruise.origin?.dateTime ? new Date(cruise.origin.dateTime).toISOString().slice(5,7) : undefined
        }));
        
         
          setRows(data);
          console.log('🚢 Cruise rows set for SearchWithFilters:', data);
        
      } catch (error) {
        console.error("Error loading cruise data:", error);
      } finally {
         setLoading(false);
      }
    }

    loadData();

  }, [cruiseData, params.to, params.departureDate, params.minNights, params.maxNights]);

  // Hook de paginación
  const {
    visibleItems: visibleCruises,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: 3,
    itemsPerStep: 3,
    totalItems: rows.length
  });

  // Configuración del data source para búsqueda (Search Bar)
  const dataSourcesCruises = useMemo(() => [
    {
      id: "cruises",
      label: "Cruceros",
      icon: <Ship className="h-4 w-4" />,
      type: "custom" as const,
      nameLabelField: "title",
      nameValueField: "id", // Usamos ID para selección única
      nameDescriptionField: "descLabel",
      // Mapeamos los rows para crear una descripción útil en el buscador
      options: rows.map((cruise) => ({
        ...cruise,
        descLabel: `${cruise.operator.name} - ${cruise.destination.stop.city}`
      })),
    }
  ], [rows]);

  // Configuración de filtros (UI)
  const filtersConfig: GenericFilterConfig[] = useMemo(() => [
    {
      id: "search",
      type: "search",
      label: "Buscar cruceros",
      placeholder: filterDefaults.search || "Buscar por destino, naviera...",
      dataSources: dataSourcesCruises,
      defaultValue: filterDefaults.search || "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron cruceros",
      searchPlaceholder: "Escribe para buscar cruceros..."
    },
    { id: "separator-1", type: "separator" },
    // {
    //   id: "popularFilters",
    //   type: "checkbox",
    //   label: "Filtros populares",
    //   showCounts: true,
    //   maxSelections: 5,
    //   initialVisibleCount: 6,
    //   showMoreText: "Ver más filtros",
    //   showLessText: "Ver menos",
    //   defaultValue: filterDefaults.popularFilters || []
    // },
    // { id: "separator-2", type: "separator" },
    {
      id: "priceRange",
      type: "range",
      label: "Rango de precio",
      min: 0, // Ajustado a valores reales de tu data
      max: 2000,
      step: 1,
      currency: "USD",
      defaultValue: filterDefaults.priceRange || [0, 2000],
      keyname: "prices.0.price" // Mapeo al primer precio disponible
    },
    { id: "separator-3", type: "separator" },
    {
      id: "cruiseLines", // Esto mapeará internamente contra operator.name o id
      type: "checkbox",
      label: "Navieras",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más navieras",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.cruiseLines || [],
      keyname: "operator.id"
    },
    { id: "separator-4", type: "separator" },
    {
      id: "duration",
      type: "toggle",
      label: "Duración del crucero",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 4,
      defaultValue: filterDefaults.duration || [],
      keyname: "durationNightsLabel"
    },
    { id: "separator-5", type: "separator" },
    {
      id: "destinations", // Esto mapeará contra destination.stop.city
      type: "checkbox",
      label: "Destinos",
      showCounts: true,
      maxSelections: 8,
      initialVisibleCount: 6,
      showMoreText: "Ver más destinos",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.destinations || [],
      keyname: "destination.stop.city"
    },
    { id: "separator-6", type: "separator" },
    {
      id: "amenities", // Esto mapeará contra keys de amenities: { pools: true, etc }
      type: "checkbox",
      label: "Amenidades",
      showCounts: true,
      maxSelections: 8,
      initialVisibleCount: 6,
      showMoreText: "Ver más amenidades",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.amenities || [],
      keyname: "amenitiesBoolean"
    },
    { id: "separator-7", type: "separator" },
    {
      id: "cabinTypes", // Esto mapeará contra prices[].class
      type: "radio",
      label: "Tipo de cabina preferida",
      defaultValue: filterDefaults.cabinTypes?.[0] || "",
      keyname: "classesAvailable",
    },
    { id: "separator-8", type: "separator" },
    {
      id: "departureTime", // Mapeo contra origin.dateTime
      type: "toggle",
      label: "Mes de salida",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 6,
      defaultValue: filterDefaults.departureTime || [],
      keyname: "departureDateMonth"

    }
  ], [dataSourcesCruises, filterDefaults]);

  // Opciones de filtros (Valores estáticos para UI, SearchWithFilters calculará los counts reales)
  const filterOptions: { [filterId: string]: GenericFilterOption[] } = useMemo(() => ({
    // popularFilters: [
    //   { value: 'balcon', label: 'Cabina con balcón', count: 0 },
    //   { value: 'todo-incluido', label: 'Todo incluido', count: 0 },
    //   { value: 'reembolsable', label: 'Reembolsable', count: 0 },
    //   { value: 'kids-free', label: 'Niños gratis', count: 0 }
    // ],
    cruiseLines: [
      { value: 'royal-caribbean', label: 'Royal Caribbean', count: 0 },
      { value: 'norwegian', label: 'Norwegian', count: 0 },
      { value: 'celebrity', label: 'Celebrity Cruises', count: 0 },
      { value: 'princess', label: 'Princess Cruises', count: 0 },
      { value: 'carnival', label: 'Carnival', count: 0 },
      { value: 'msc-cruises', label: 'MSC Cruises', count: 0 },
      { value: 'costa-cruises', label: 'Costa Cruceros', count: 0 },
      { value: 'disney', label: 'Disney Cruise Line', count: 0 },
      { value: 'virgin-voyages', label: 'Virgin Voyages', count: 0 },
      { value: 'cunard', label: 'Cunard Line', count: 0 }
    ],
    duration: [
      { value: 'corto', label: '3-5 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'medio', label: '6-8 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'largo', label: '9-14 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'muy-largo', label: '15+ noches', icon: <Clock className="w-4 h-4" /> }
    ],
    destinations: [
      // Estos valores deben coincidir con tus datos (cityCode o nombre ciudad)
      { value: 'Miami', label: 'Miami', count: 0 },
      { value: 'Barcelona', label: 'Barcelona', count: 0 },
      { value: 'Copenhague', label: 'Copenhague', count: 0 },
      { value: 'La Romana', label: 'La Romana', count: 0 },
      { value: 'Vancouver', label: 'Vancouver', count: 0 },
      { value: 'San Juan', label: 'San Juan', count: 0 },
      { value: 'Venecia', label: 'Venecia', count: 0 },
      { value: 'Dubai', label: 'Dubai', count: 0 },
    ],
    amenities: [
      { value: 'pools', label: 'Piscinas', count: 0 },
      { value: 'restaurants', label: 'Multi-Restaurantes', count: 0 },
      { value: 'gym', label: 'Gimnasio', count: 0 },
      { value: 'casino', label: 'Casino', count: 0 },
      { value: 'kidsClub', label: 'Club de niños', count: 0 },
      { value: 'showsIncluded', label: 'Shows incluidos', count: 0 },
      { value: 'wifi', label: 'WiFi incluido', count: 0 }
    ],
    cabinTypes: [
      { value: 'Interior', label: 'Interior', count: 0 },
      { value: 'Exterior', label: 'Exterior', count: 0 },
      { value: 'Balcón', label: 'Balcón', count: 0 },
      { value: 'Suite', label: 'Suite', count: 0 }
    ],
    departureTime: [
      { value: '01', label: 'Enero', icon: <Clock className="w-4 h-4" /> },
      { value: '02', label: 'Febrero', icon: <Clock className="w-4 h-4" /> },
      { value: '03', label: 'Marzo', icon: <Clock className="w-4 h-4" /> },
      { value: '04', label: 'Abril', icon: <Clock className="w-4 h-4" /> },
      { value: '05', label: 'Mayo', icon: <Clock className="w-4 h-4" /> },
      { value: '06', label: 'Junio', icon: <Clock className="w-4 h-4" /> },
      { value: '07', label: 'Julio', icon: <Clock className="w-4 h-4" /> },
      { value: '08', label: 'Agosto', icon: <Clock className="w-4 h-4" /> },
      { value: '09', label: 'Septiembre', icon: <Clock className="w-4 h-4" /> },
      { value: '10', label: 'Octubre', icon: <Clock className="w-4 h-4" /> },
      { value: '11', label: 'Noviembre', icon: <Clock className="w-4 h-4" /> },
      { value: '12', label: 'Diciembre', icon: <Clock className="w-4 h-4" /> },
    ]
  }), []);

  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'price-asc', label: 'Precio: menor a mayor' },
    { key: 'price-desc', label: 'Precio: mayor a menor' },
    { key: 'duration-asc', label: 'Duración: menor a mayor' },
    { key: 'departure-asc', label: 'Fecha de salida' },
  ];

  // Handler para click en tarjeta
  const handleCardClick = (idx: number, row: any) => {
    console.log('Crucero seleccionado:', row);
    onCardClick?.(idx, row);
  };

  // Renderizar resultados de cruceros
  const renderCruiseResults = ({ filteredRows }: any) => {
    const cruisesToShow = filteredRows.slice(0, visibleCruises);
    
    return (
      <div className="space-y-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-white rounded-xl shadow-md border border-gray-100 h-64 w-full p-4">
               <div className="bg-gray-200 h-full w-full rounded-lg"></div>
            </div>
          ))
        ) : cruisesToShow.length > 0 ? (
          <>
            {cruisesToShow.map((row: any, index: number) => (
              <CustomCruiseCard
                key={row.id}
                cruise={row as TransportTrip}
                onCabinSelect={onCabinSelect}
                onClick={() => handleCardClick(index, row)}
              />
            ))}
            
            {/* Componente de paginación */}
            {filteredRows.length > 3 && (
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleCruises}
                initialVisibleItems={3}
                itemsPerStep={3}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="cruceros"
                showMoreText="Ver más cruceros"
                showLessText="Ver menos cruceros"
                allItemsMessage="Has visto todos los cruceros disponibles"
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron cruceros
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros para encontrar más opciones.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
   <Suspense fallback={<div className="text-center py-12">Cargando cruceros...</div>}>
     <div className={className}>
      <SearchWithFilters
        rows={rows}
        filters={filtersConfig}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        renderResults={renderCruiseResults}
        onCardClick={handleCardClick}
        onFiltersChange={onFiltersChange}
        searchPlaceholder="Buscar cruceros por destino, naviera..."
        noResultsMessage="No se encontraron cruceros que coincidan con tu búsqueda"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar por"
        resultsCountText={(count) => `${count}+ cruceros disponibles`}
        showToggleShowFilters={true}
      />
    </div>
    </Suspense>
  );
};

export default CruisesResultsTemplate;

function translateDurationNights(durationNights: number | undefined): any {
  if (!durationNights || durationNights <= 0) return "Duración no especificada";

  if (durationNights >= 3 && durationNights <= 5) {
    return "corto"; // 3-5 noches
  } else if (durationNights >= 6 && durationNights <= 8) {
    return "medio"; // 6-8 noches
  } else if (durationNights >= 9 && durationNights <= 14) {
    return "largo"; // 9-14 noches
  } else if (durationNights >= 15) {
    return "muy-largo"; // 15+ noches
  }
}
