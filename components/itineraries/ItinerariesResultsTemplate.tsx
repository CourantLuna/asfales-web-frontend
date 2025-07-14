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

// Tipos para RowData de itinerarios
export interface ItineraryRowData extends RowData {
  id: string;
  title: string;
  descMain: string;
  descSecondary?: string;
  price: string;
  originalData: ItineraryPackage;
}

interface ItinerariesResultsTemplateProps {
  origin?: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: RowData) => void;
}

export function ItinerariesResultsTemplate({
  origin = "Santo Domingo",
  destination = "Colombia",
  startDate,
  endDate,
  className = "",
  onFiltersChange,
  onCardClick
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



  // Opciones de filtros mock
  const popularFiltersOptions: CheckboxOption[] = [
    { value: "best-rated", label: "Mejor valorados (4.8+)", count: 8 },
    { value: "cultural", label: "Experiencias culturales", count: 12 },
    { value: "adventure", label: "Aventura y deportes", count: 6 },
    { value: "budget-friendly", label: "Económicos (<$1,500)", count: 9 },
    { value: "small-group", label: "Grupos pequeños", count: 14 },
    { value: "guided", label: "Con guía especializado", count: 18 },
    { value: "food-included", label: "Gastronomía incluida", count: 15 },
    { value: "short-duration", label: "Corta duración (<12 días)", count: 11 }
  ];

  const destinationsOptions: CheckboxOption[] = [
    { value: "bogota", label: "Bogotá", count: 8 },
    { value: "medellin", label: "Medellín", count: 6 },
    { value: "cartagena", label: "Cartagena", count: 7 },
    { value: "cali", label: "Cali", count: 3 },
    { value: "santa-marta", label: "Santa Marta", count: 4 },
    { value: "san-gil", label: "San Gil", count: 2 },
    { value: "armenia", label: "Armenia", count: 3 },
    { value: "leticia", label: "Leticia", count: 1 },
    { value: "pasto", label: "Pasto", count: 1 },
    { value: "valledupar", label: "Valledupar", count: 1 }
  ];

  const durationOptions: CheckboxOption[] = [
    { value: "short", label: "Corto (7-10 días)", count: 8 },
    { value: "medium", label: "Medio (11-15 días)", count: 9 },
    { value: "long", label: "Largo (16-20 días)", count: 2 },
    { value: "extended", label: "Extendido (21+ días)", count: 1 }
  ];

  const experienceTypesOptions: CheckboxOption[] = [
    { value: "cultural", label: "Cultural", count: 12 },
    { value: "adventure", label: "Aventura", count: 8 },
    { value: "nature", label: "Naturaleza", count: 10 },
    { value: "beach", label: "Playa", count: 6 },
    { value: "gastronomy", label: "Gastronomía", count: 15 },
    { value: "wellness", label: "Bienestar", count: 4 },
    { value: "photography", label: "Fotografía", count: 7 },
    { value: "music", label: "Música", count: 3 }
  ];

  const budgetOptions: CheckboxOption[] = [
    { value: "budget", label: "Económico (<$1,200)", count: 4 },
    { value: "mid-range", label: "Medio ($1,200-$1,800)", count: 11 },
    { value: "premium", label: "Premium ($1,800-$2,500)", count: 4 },
    { value: "luxury", label: "Lujo ($2,500+)", count: 1 }
  ];

  const transportOptions: CheckboxOption[] = [
    { value: "flight", label: "Vuelos incluidos", count: 19 },
    { value: "bus", label: "Transporte terrestre", count: 16 },
    { value: "cruise", label: "Cruceros", count: 4 },
    { value: "private", label: "Transporte privado", count: 8 }
  ];

  // Opciones de ordenamiento
  const sortOptions: CustomSelectOption[] = [
    { key: "recommended", label: "Recomendados" },
    { key: "price-low", label: "Precio: menor a mayor" },
    { key: "price-high", label: "Precio: mayor a menor" },
    { key: "duration-short", label: "Duración: más corto" },
    { key: "duration-long", label: "Duración: más largo" },
    { key: "rating", label: "Mejor valorados" },
    { key: "newest", label: "Más recientes" }
  ];

  // Configuración del data source para búsqueda
  const dataSourcesItineraries = useMemo(() => [
    {
      id: "itineraries",
      label: "Itinerarios",
      icon: <MapPin className="h-4 w-4" />,
      type: "custom" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: rows
    }
  ], [rows]);

  // Configuración de filtros
  const getFiltersForItineraries = useMemo((): GenericFilterConfig[] => [
    {
      id: "search",
      type: "search",
      label: "Buscar itinerarios",
      placeholder: "Buscar por destino, actividad, guía...",
      dataSources: dataSourcesItineraries,
      defaultValue: "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron itinerarios",
      searchPlaceholder: "Escribe para buscar itinerarios..."
    },
    {
      id: "separator-1",
      type: "separator"
    },
    {
      id: "popularFilters",
      type: "checkbox",
      label: "Filtros populares",
      showCounts: true,
      maxSelections: 4,
      initialVisibleCount: 6,
      showMoreText: "Ver más filtros",
      showLessText: "Ver menos",
      defaultValue: []
    },
    {
      id: "separator-2",
      type: "separator"
    },
    {
      id: "priceRange",
      type: "range",
      label: "Rango de precio",
      min: 500,
      max: 5000,
      step: 100,
      currency: "USD",
      defaultValue: [500, 5000]
    },
    {
      id: "separator-3",
      type: "separator"
    },
    {
      id: "destinations",
      type: "checkbox",
      label: "Destinos",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más destinos",
      showLessText: "Ver menos",
      defaultValue: []
    },
    {
      id: "separator-4",
      type: "separator"
    },
    {
      id: "duration",
      type: "toggle",
      label: "Duración del viaje",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 3,
      defaultValue: []
    },
    {
      id: "separator-5",
      type: "separator"
    },
    {
      id: "experienceTypes",
      type: "checkbox",
      label: "Tipo de experiencias",
      showCounts: true,
      maxSelections: 4,
      initialVisibleCount: 4,
      showMoreText: "Ver más tipos",
      showLessText: "Ver menos",
      defaultValue: []
    },
    {
      id: "separator-6",
      type: "separator"
    },
    {
      id: "budget",
      type: "radio",
      label: "Categoría de presupuesto",
      defaultValue: ""
    },
    {
      id: "separator-7",
      type: "separator"
    },
    {
      id: "transport",
      type: "checkbox",
      label: "Transporte incluido",
      showCounts: true,
      defaultValue: []
    }
  ], [dataSourcesItineraries]);

  // Opciones de filtros
  const getFilterOptionsForItineraries = useMemo(() => ({
    popularFilters: popularFiltersOptions,
    destinations: destinationsOptions,
    duration: durationOptions.map(opt => ({
      value: opt.value,
      label: opt.label,
      count: opt.count,
      icon: <Clock className="w-full h-full" />
    })),
    experienceTypes: experienceTypesOptions,
    budget: budgetOptions.map(opt => ({
      value: opt.value,
      label: opt.label,
      count: opt.count
    })),
    transport: transportOptions
  }), []);

  // Función para mapear ItineraryPackage a ItineraryRowData
  const mapItinerariesToRowData = (itineraries: ItineraryPackage[]): ItineraryRowData[] => {
    return itineraries.map((itinerary) => ({
      id: itinerary.id,
      title: itinerary.title,
      descMain: `${itinerary.cities.join(', ')} • ${itinerary.duration} • ${itinerary.price}`,
      descSecondary: `⭐ ${itinerary.rating} (${itinerary.reviewCount} reseñas) • ${itinerary.experienceCount} experiencias`,
      price: itinerary.price,
      originalData: itinerary
    }));
  };

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
      <div className="bg-white rounded-xl p-6 shadow-sm border">
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
          
         
      </div>

      {/* SearchWithFilters */}
      <SearchWithFilters
        rows={rows}
        filters={getFiltersForItineraries}
        filterOptions={getFilterOptionsForItineraries}
        sortOptions={sortOptions}
        onFiltersChange={handleFiltersChange}
        onCardClick={handleCardClick}
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