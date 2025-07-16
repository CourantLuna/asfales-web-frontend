'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { ItinerarySharedCard } from './ItinerarySharedCard';
import { colombiaItineraries, formatCityName, type ItineraryPackage } from '@/lib/data/mock-datavf';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import { 
  MapPin, 
  Calendar, 
  Clock,
  Star,
  Users,
  DollarSign,
  Plane,
  Hotel,
  Mountain,
  Camera,
  UtensilsCrossed,
  Music2,
  Ship,
  Bus,
  Route
} from 'lucide-react';
import SearchWithFilters, { GenericFilterConfig } from '@/components/shared/SearchWithFilters';
import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { RowData } from '@/components/shared/RenderFields';
import { CustomSelectOption } from '@/components/shared/CustomSelect';
import { ItinerariesResultsTemplateProps, ItineraryRowData } from '@/lib/data/itineraries-types';
import { budgetOptions, destinationsOptions, durationOptions, experienceTypesOptions, getFilterOptionsForItineraries, popularFiltersOptions, sortOptions, transportOptions } from '@/lib/data/itineraries-filter-options';
import { createDataSourcesItineraries, getFiltersForItineraries, mapItinerariesToRowData } from '@/lib/data/itineraries-utils';



export function ItinerariesResultsTemplate({
  origin = "Santo Domingo",
  destination = "Colombia",
  startDate,
  endDate,
  className = "",
  onFiltersChange,
  onCardClick,
}: ItinerariesResultsTemplateProps) {

  // Estados para filtros y paginación
  const [rows, setRows] = useState<ItineraryRowData[]>([]);
  const [loading, setLoading] = useState(false);

    // Constantes de paginación
  const initialVisibleResults = 6;
  const resultsPerStep = 3;

  // Hook de paginación - usando filteredRowsLength dinámico
  const {
    visibleItems: visibleResults,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: initialVisibleResults,
    itemsPerStep: resultsPerStep,
    totalItems: rows.length
  });



  // Configuración del data source para búsqueda
  const dataSourcesItineraries = useMemo(() => createDataSourcesItineraries(rows), [rows]);

  // Configuración de filtros
  const getFiltersForItinerariesLocal = useMemo((): GenericFilterConfig[] => {
    return getFiltersForItineraries(dataSourcesItineraries)
  }
  , [dataSourcesItineraries]);

  
  // Actualizar rows cuando cambien los itinerarios filtrados
  useEffect(() => {
    const mappedData = mapItinerariesToRowData(colombiaItineraries);
    setRows(mappedData);
  }, []);

  // Handler para cambios en filtros
  const handleFiltersChange = (filters: Record<string, any>) => {
    // resetPagination();
    
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  // Handler para click en card
  const handleCardClick = (idx: number, row: RowData) => {
    const itineraryRow = row as ItineraryRowData;
    console.log('🎯 Itinerario seleccionado:', itineraryRow.originalData.title);
    if (onCardClick) {
      onCardClick(idx, itineraryRow);
    }
  };

 
  const formatDateRange = (start?: Date, end?: Date) => {
    if (!start || !end) return "Fechas flexibles";
    
    const startStr = start.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
    const endStr = end.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
    
    return `${startStr} - ${endStr}`;
  };

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className={`space-y-6 ${className}`}>
      {/* Header con información de búsqueda */}
      {/* <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Itinerarios de {formatCityName(origin)} a {formatCityName(destination)}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{formatCityName(origin)} → {formatCityName(destination)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDateRange(startDate, endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                <span>{colombiaItineraries.length} itinerarios encontrados</span>
              </div>
            </div>
          </div>
          
         
      </div> */}

      {/* SearchWithFilters */}
      <SearchWithFilters
        rows={rows}
        filters={getFiltersForItinerariesLocal}
        filterOptions={getFilterOptionsForItineraries()}
        sortOptions={sortOptions}
        onFiltersChange={handleFiltersChange}
        onCardClick={handleCardClick}
        showToggleShowFilters={true}
        renderResults={({ filteredRows, compareMode, onCardClick: onCardClickFromRender }) => {
        

          return (
            <div className="space-y-6">
              {/* Grid de resultados - usando slice directamente en filteredRows */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {filteredRows.slice(0, visibleResults).map((row, index) => {
                  const itineraryRow = row as ItineraryRowData;
                  const itinerary = itineraryRow.originalData;
                  
                  return (
                    <div key={itinerary.id} className="relative">
                      <ItinerarySharedCard
                        id={itinerary.id}
                        title={itinerary.title}
                        coverImage={itinerary.coverImage}
                        startDate={itinerary.startDate}
                        endDate={itinerary.endDate}
                        price={itinerary.price}
                        creator={itinerary.creator}
                        participants={itinerary.participants}
                        maxParticipants={itinerary.maxParticipants}
                        cities={itinerary.cities}
                        lodgingCount={itinerary.lodgingCount}
                        experienceCount={itinerary.experienceCount}
                        transportSummary={itinerary.transportSummary}
                        isPriceEstimated={itinerary.isPriceEstimated}
                      />
                      
                      {/* Badges adicionales */}
                      <div className="absolute top-3 left-3 space-y-1 gap-2">
                        {itinerary.discount && (
                          <Badge className="bg-red-500 text-white text-xs">
                            -{itinerary.discount}%
                          </Badge>
                        )}
                        {itinerary.availableSpots <= 2 && (
                          <Badge variant="destructive" className="text-xs">
                            ¡Solo {itinerary.availableSpots} cupos!
                          </Badge>
                        )}
                      </div>

                      {/* Rating y duración overlay */}
                      <div className="absolute top-3 right-3 flex gap-2 items-center">
                        <Badge className="bg-black/70 text-white text-xs backdrop-blur-sm h-full">
                          <Star className="w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {itinerary.rating}
                        </Badge>
                        <Badge variant="secondary" className="text-xs h-full">
                          <Clock className="w-3 mr-1" />
                          {itinerary.duration}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Componente de paginación reutilizable */}
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleResults}
                initialVisibleItems={initialVisibleResults}
                itemsPerStep={resultsPerStep}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="itinerarios"
                showMoreText="Mostrar más itinerarios"
                showLessText="Mostrar menos itinerarios"
                allItemsMessage="🗺️ Has visto todos los itinerarios disponibles"
                className=""
                showProgressBar={true}
                progressColor="bg-primary"
              />

              {/* Mensaje si no hay resultados */}
              {filteredRows.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No se encontraron itinerarios</h3>
                  <p className="text-muted-foreground">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                </div>
              )}
            </div>
          );
        }}
        searchPlaceholder="Buscar itinerarios por destino, actividad..."
        noResultsMessage="No se encontraron itinerarios que coincidan con tus criterios"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar itinerarios por"
        resultsCountText={(count) => `${count} itinerarios encontrados`}
      />

      {/* Footer con información adicional */}
      <div className="bg-muted/50 rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          ¿No encuentras lo que buscas?{' '}
          <Button variant="link" className="p-0 h-auto text-sm">
            Solicita un itinerario personalizado
          </Button>
        </p>
      </div>
    </div>
</Suspense>
  );
}