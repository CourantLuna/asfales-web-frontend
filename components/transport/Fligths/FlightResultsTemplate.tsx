'use client';

import React, { useState, useMemo, useRef, useEffect, useImperativeHandle } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIsMobile } from "../../ui/use-mobile";
import CustomFlightCard from './CustomFlightCard';
import FlightDetailSheet from './FlightDetailSheet';
import { Breadcrumb, useFlightBreadcrumbSteps } from '../../shared/Breadcrumb';
import { Plane, XCircle } from 'lucide-react';
import PaginationCard from '../../shared/PaginationCard';
import { usePagination } from '../../../hooks/usePagination';
import SearchWithFilters, { GenericFilterConfig } from '../../shared/SearchWithFilters';
import { RowData } from '../../shared/RenderFields';
import { EventDrivenProgressRef } from '../../shared/EventDrivenProgress';
import { openInNewTab } from '../../../lib/utils/navigation';
import { FilterDefaults, FlightResultSet } from '@/components/transport/Fligths/lib/flight-types';
import { TransportTrip } from '../types/transport.types';
import { getFlightResultSets, mapFlightsToRowData } from './lib/flight-utils';
import { getFilterOptionsForFlights, sortOptions } from '@/components/transport/Fligths/lib/flight-filter-options';
import { flightAds } from '@/components/transport/Fligths/lib/flight-filter-options';
import { CompareSheet } from '@/components/comparator/CompareSheet';
import { useCompare } from '@/hooks/use-compare';
import { toast } from 'sonner';
import { Column } from "@/components/shared/CustomTable";
import { formatDate } from 'date-fns';

// Definición local de SelectedFlight adaptada a TransportTrip
export interface SelectedFlight {
  stepId: string;
  flight: TransportTrip;
}

// --- CONFIGURACIÓN DE COLUMNAS DE COMPARACIÓN ---
const flightComparisonColumns: Column[] = [
  // 1. Aerolínea (Nombre)
  { 
    field: "operator.name", 
    header: "Aerolínea", 
    type: "text", 
    className: "font-bold text-sm" 
  },
        { header: "Calificación", 
          field: "ratings.overall", 
          type: "badge", variant:"secondary", className: "text-primary font-semibold",
          prefixText: "Calificación: "
        },

    // 2. Fotos (Nota: Si el array images está vacío en tu JSON, esto saldrá vacío. 
  // Podrías usar 'operator.logoUrl' con un tipo 'image' si tu CustomTable lo soporta)
  { 
    field: "operator.logoUrl", 
    header: "Fotos", 
    type: "images", 
    height: "h-[120px]" 
  },
  // 2. Horarios y Ruta (Usando structure para combinar campos)
  
  { header:"Salida en:", field: "origin.stop.cityCode", type: "text", className: "bg-blue-100 text-blue-800 mr-1", prefixText: "Desde " },
      {  header:"Llegada en:",field: "destination.stop.cityCode", type: "text", className: "bg-blue-100 text-blue-800", prefixText: "Hasta " },
      {  header:"Salida en:",field: "origin.dateTime", type: "datetime", className: "text-xs font-semibold", prefixText:"Salida en: " },
      {  header:"Llegada en:",field: "destination.dateTime", type: "datetime", className: "text-xs font-semibold ", prefixText:"Llegada en: "  },


  // 3. Duración
  { 
    field: "durationH", 
    header: "Duración (horas)", 
    type: "badge", // Renderiza como badge
    className: "text-primary font-semibold",
    prefixText: "Duración: " 
  },
    // 5. Amenidades (Usando el array transformado 'amenitiesList')
  {
    header: "Servicios",
    type: "benefits", 
    field: "amenitiesList" 
  },
  // 4. Precio
  { 
    field: "prices.0.price", 
    header: "Precio", 
    type: "currency", 
    className: "font-bold text-lg text-primary" ,
    prefixText: "Costo: $",
    sufixText: " USD"

  },
  {
  header: "Escalas",
  field: "stops", // Apunta al array de paradas
  type: "TransportStops",
  className: "min-w-[200px]" // Recomendado darle un poco de ancho
}

];

// Helper para transformar TransportTrip a datos compatibles con la tabla
const prepareFlightForComparison = (flight: TransportTrip) => {
    const amenitiesList = [];
    
    if (flight.amenities) {
        if (flight.amenities.wifi) amenitiesList.push({ label: "WiFi", included: true });
        if (flight.amenities.ac) amenitiesList.push({ label: "Aire Acond.", included: true });
        if (flight.amenities.entertainment) amenitiesList.push({ label: "Entretenimiento", included: true });
        if (flight.amenities.recliningSeats) amenitiesList.push({ label: "Asientos Reclinables", included: true });
        if (flight.amenities.usb) amenitiesList.push({ label: "USB", included: true });
        if (flight.amenities.onboardToilet) amenitiesList.push({ label: "Baño", included: true });
        

    }
    if(flight.policies?.baggage?.carryOnKg)
      {
        if (flight.policies.baggage.carryOnKg > 0) amenitiesList.push({ label: "Equipaje de Mano", included: true });

      }
      if(flight.policies?.baggage?.includedKg)
      {
        if (flight.policies.baggage.includedKg > 0) amenitiesList.push({ label: "Equipaje de Bodega", included: true });

      }

    if (amenitiesList.length === 0) {
        amenitiesList.push({ label: "Estándar", included: true });
    }

    return {
        ...flight,
        amenitiesList: amenitiesList,
        logoUrlFlat: flight.operator.logoUrl,
        durationHours: flight.durationMinutes? (flight.durationMinutes/60).toFixed(1): 0,
// ✅ NUEVO CÁLCULO: Diferencia real entre fechas (Destino - Origen)
    durationH: (() => {
        const start = new Date(flight.origin.dateTime).getTime();
        const end = new Date(flight.destination.dateTime).getTime();
        const diffInHours = (end - start) / (1000 * 60 * 60); // ms -> horas
        return diffInHours.toFixed(1) + " h"; // Ej: "2.5 h"
    })()    };
};

// --- SUBCOMPONENTE CORREGIDO (Evita ciclo infinito) ---
interface FlightListRenderProps {
  loading: boolean;
  filteredRows: RowData[];
  visibleFlights: number;
  compareMode: boolean;
  onCompareModeChange: (mode: boolean) => void;
  renderCard: (row: RowData, index: number, isCompareChecked: boolean) => React.ReactNode;
  Pagination: React.ReactNode;
}

const FlightListRender: React.FC<FlightListRenderProps> = ({
  loading,
  filteredRows,
  visibleFlights,
  compareMode,
  onCompareModeChange,
  renderCard,
  Pagination
}) => {
  
  // Usamos useRef para mantener la referencia de la función y evitar re-ejecutar el efecto
  const onCompareModeChangeRef = useRef(onCompareModeChange);

  useEffect(() => {
    onCompareModeChangeRef.current = onCompareModeChange;
  });

  useEffect(() => {
    onCompareModeChangeRef.current(compareMode);
  }, [compareMode]); 

  const flightsToShow = filteredRows.slice(0, visibleFlights);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (flightsToShow.length === 0) {
    return (
      <div className="text-center py-12">
        <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron vuelos</h3>
        <p className="text-gray-600">Intenta ajustar tus filtros para encontrar más opciones.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flightsToShow.map((row, index) => {
        return renderCard(row, index, compareMode);
      })}
      {filteredRows.length > 3 && Pagination}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

interface FlightResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  flightData?: RowData[];
  flightType?: 'roundtrip' | 'oneway' | 'multicity';
  destinations?: string[];
  ref?: any;
}

const FlightResultsTemplate: React.FC<FlightResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  flightData,
  flightType: propFlightType,
  destinations: propDestinations,
  ref,
}) => {
  
  // Estados principales
  let flightType = propFlightType || 'roundtrip';
  const [currentStep, setCurrentStep] = useState('choose-departure');
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([]);
  const [flightResultSets, setFlightResultSets] = useState<FlightResultSet[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el sheet de detalles
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFlightForDetails, setSelectedFlightForDetails] = useState<TransportTrip | null>(null);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  
  const searchFilters = useMemo(() => ({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    departureDate: searchParams.get("departureDate"),
    returnDate: searchParams.get("returnDate"),
    adults: searchParams.get("adults"),
    children: searchParams.get("children"),
    type: searchParams.get("type"), 
    flights: searchParams.get("flights"), 
  }), [searchParams]);

  flightType = (propFlightType || searchFilters.type || 'roundtrip') as 'roundtrip' | 'oneway' | 'multicity';

  const multicitySegments = useMemo(() => {
    if (flightType === 'multicity' && searchFilters.flights) {
      try { return JSON.parse(searchFilters.flights); } 
      catch (e) { console.error("Error parsing multicity segments", e); return []; }
    }
    if (flightType === 'multicity' && propDestinations) {
        return propDestinations.map(dest => ({ to: dest }));
    }
    return [];
  }, [flightType, searchFilters.flights, propDestinations]);

  const breadcrumbSteps = useFlightBreadcrumbSteps(
    flightType, 
    currentStep, 
    {
      origin: searchFilters.from || "Origen",
      destination: searchFilters.to || "Destino",
      multicitySegments: multicitySegments
    }
  );

  // Pagination hook
  const {
    visibleItems: visibleFlights,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: 3,
    itemsPerStep: 3,
    totalItems: rows.length
  });

  const initialVisibleFlights = 3;
  const flightsPerStep = 3;
  const progressRef = useRef<EventDrivenProgressRef>(null);

  useEffect(() => {
    if (flightType === 'multicity') {
        setCurrentStep('choose-flight-0');
    } else {
        setCurrentStep('choose-departure');
    }
    setSelectedFlights([]);
    resetPagination();
  }, [flightType, resetPagination]);

  const dataSourcesFlights = useMemo(() => [
    {
      id: "flights",
      label: "Vuelos",
      icon: <Plane className="h-4 w-4" />,
      type: "custom" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: rows
    }
  ], [rows]);

  const getFiltersForFlights = useMemo(() => {
    const baseFilters: GenericFilterConfig[] = [
      {
        id: "search",
        type: "search",
        label: "Buscar vuelos",
        placeholder: filterDefaults.search || "Buscar...",
        dataSources: dataSourcesFlights,
        defaultValue: filterDefaults.search || "",
        showClearButton: true,
        minSearchLength: 2,
        emptyMessage: "No se encontraron vuelos",
        searchPlaceholder: "Escribe para buscar vuelos..."
      },
       { id: "separator-1", type: "separator" },
      {
        id: "priceRange",
        type: "range",
        label: "Rango de precio",
        min: 0, max: 2000, step: 1, currency: "USD",
        defaultValue: filterDefaults.priceRange || [0, 2000],
        keyname: "prices.0.price"
      },
      {
        id: "airlines",
        type: "checkbox",
        label: "Aerolíneas",
        showCounts: true, maxSelections: 5, initialVisibleCount: 5,
        showMoreText: "Ver más", showLessText: "Ver menos",
        defaultValue: filterDefaults.airlines || [],
        keyname: "operator.id",
      },
      {
        id: "stops", type: "radio", label: "Escalas",
        defaultValue: filterDefaults.stops?.[0] || "", keyname: "counterStops"
      },
      {
        id: "flightClass", type: "radio", label: "Clase de vuelo",
        defaultValue: filterDefaults.flightClass || "", keyname: "classesAvailable"
      }
    ];
    return baseFilters;
  }, [dataSourcesFlights, filterDefaults]);

  useEffect(() => {
    if (loading !== false) {
      setTimeout(() => { progressRef.current?.start(); }, 0);
    } else {
      progressRef.current?.finish();
    }
  }, [loading]);

  const currentResultSet = flightResultSets.find(set => set.stepId === currentStep);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const results = await getFlightResultSets(flightType, searchFilters);
        if (mounted) {
          setFlightResultSets(results);
          const currentSet = results.find(set => set.stepId === currentStep);
          if (currentSet) {
            setRows(mapFlightsToRowData(currentSet.flights));
          } else {
            if (results.length > 0) {
                const firstSet = results[0];
                setCurrentStep(firstSet.stepId);
                setRows(mapFlightsToRowData(firstSet.flights));
            } else { setRows([]); }
          }
        }
      } catch (error) {
        console.error("Error loading flights:", error);
        toast.error("Error cargando vuelos");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [flightType, currentStep, searchFilters]);

  // --- Handlers ---

  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
    resetPagination();
  };

  const handleFlightSelect = (flight: TransportTrip) => {
    if (!currentResultSet) return;

    const updatedSelectedFlights = (() => {
      const filtered = selectedFlights.filter(sf => sf.stepId !== currentStep);
      return [...filtered, { stepId: currentStep, flight }];
    })();
    
    setSelectedFlights(updatedSelectedFlights);

    const flightSteps = breadcrumbSteps.filter(step => step.id !== 'review-details');
    const currentIndex = flightSteps.findIndex(step => step.id === currentStep);
    const isLastFlightStep = currentIndex === flightSteps.length - 1;
    
    if (isLastFlightStep) {
      const currentUrl = window.location.href;
      const totalPrice = updatedSelectedFlights.reduce((sum, sf) => sum + sf.flight.prices[0].price, 0);
      const currency = updatedSelectedFlights[0]?.flight.prices[0].currency || 'USD';
      
      const queryParams = {
        flights: JSON.stringify(updatedSelectedFlights),
        type: flightType,
        return: currentUrl,
        total: totalPrice,
        currency: currency,
        count: updatedSelectedFlights.length,
        adults: searchFilters.adults || '1',
        children: searchFilters.children || '0',
      };
      openInNewTab('/flights-details', queryParams);
    } else {
      const nextStep = breadcrumbSteps[breadcrumbSteps.findIndex(step => step.id === currentStep) + 1]?.id;
      if (nextStep) {
        setCurrentStep(nextStep);
        resetPagination();
      }
    }
  };

  const handleSelectFromSheet = () => {
    if (selectedFlightForDetails) {
      handleFlightSelect(selectedFlightForDetails);
      setIsSheetOpen(false);
      setSelectedFlightForDetails(null);
    }
  };

  const handleCardClick = (idx: number, row: RowData) => {
    const originalFlight = currentResultSet?.flights[idx];
    if (originalFlight) {
        handleFlightSelect(originalFlight);
        if (onCardClick) onCardClick(idx, row);
    } else {
        console.error("No se encontró el vuelo original para el índice:", idx);
    }
  };

  const handleDetailsClickWrapper = (flightCardData: any) => {
    const fullFlight = currentResultSet?.flights.find(f => f.id === flightCardData.id);
    if (fullFlight) {
      setSelectedFlightForDetails(fullFlight);
      setIsSheetOpen(true);
    }
  };

  // --- COMPARACIÓN ---
  // IMPORTANTE: Quitamos 'rowName' para que sea plano
  const compare = useCompare({ max: 2, keyName: "id", rowName: 'item' });

  const handleCompareModeChange = (isCompareMode: boolean) => {
    if (!isCompareMode) {
      compare.reset();
      resetPagination();
    }
  };

  const onCancelCompare = () => {
    compare.reset();
    resetPagination();
  }

  useImperativeHandle(ref, () => ({
    reset: () => onCancelCompare(),
  }));

  const handleCompareChecked = (idx: number, checked: boolean) => {
    const originalFlight = currentResultSet?.flights[idx];
    if (!originalFlight) return;

    // TRANSFORMACIÓN: Preparamos los datos
    const comparisonData = prepareFlightForComparison(originalFlight);

    if (checked) {
      if (compare.selected.length >= compare.getMax()) {
        toast("Máximo alcanzado", {
          description: `Solo puedes comparar hasta ${compare.getMax()} elementos`,
          duration: 2000,
          icon: <XCircle className="text-red-500 w-6 h-6" />,
          style: { backgroundColor: "#FEE2E2", color: "#232323", fontWeight: 500 },
        });
        return;
      }
      // AGREGAR DIRECTO (SIN WRAPPER)
      compare.add(comparisonData); 
    } else {
      compare.remove(originalFlight.id); 
    }
  };

  // --- RENDER ---
  const renderFlightContent = () => {
    if (currentResultSet) {
      return (
        <div>
           {compare.selected.length > 0 && (
              <CompareSheet
                columns={flightComparisonColumns}
                items={compare.selected}
                max={compare.getMax()}
                itemName="vuelos"
                keyName={compare.keyName}
                isOpen={compare.isOpen}
                onToggle={compare.toggle}
                onRemove={compare.remove}
                onCancel={compare.reset}
                onCompare={(comparelist) => console.log("Comparando vuelos", comparelist)}
                // Selector de imagen para el preview pequeño del sheet
                imageSelector={(row) => row.operator?.logoUrl}
              />
            )}

            <SearchWithFilters
              key={"FlightResultsPage"}
              rows={rows}
              filters={getFiltersForFlights}
              filterOptions={getFilterOptionsForFlights()}
              sortOptions={sortOptions}
              ads={flightAds}
              adsDirection={isMobile ? "row" : "col"}
              showAds={true}
              enableCompareMode={true}
              compareConfig={{
                titleOff: "Comparar vuelos",
                subtitleOff: "Selecciona vuelos para comparar lado a lado",
                titleOn: "Comparando vuelos",
                subtitleOn: "Selecciona vuelos para comparar lado a lado",
              }}
              showToggleShowFilters={true}
              onCardClick={handleCardClick}
              onFiltersChange={onFiltersChange}
              searchPlaceholder="Buscar vuelos por aerolínea, aeropuerto..."
              noResultsMessage="No se encontraron vuelos que coincidan con tu búsqueda"
              
              renderResults={({ filteredRows, compareMode, onCardClick: cardClickHandler }) => (
                <FlightListRender
                  loading={loading}
                  filteredRows={filteredRows}
                  visibleFlights={visibleFlights}
                  compareMode={compareMode}
                  onCompareModeChange={handleCompareModeChange}
                  renderCard={(row, index, mode) => {
                    const originalFlight = currentResultSet?.flights[index];
                    if (!originalFlight) return null;

                    return (
                      <CustomFlightCard
                        key={originalFlight.id}
                        flight={originalFlight}
                        onDetailsClick={handleDetailsClickWrapper}
                        onClick={() => cardClickHandler(index, row)}
                        showCompareCheckbox={mode}
                        onCompareChecked={(checked) => handleCompareChecked(index, checked)}
                        isCompareChecked={compare.selected.some(i => i.id == originalFlight.id)}
                        className="hover:bg-blue-50 transition-colors cursor-pointer"
                      />
                    );
                  }}
                  Pagination={
                    <PaginationCard
                      totalItems={filteredRows.length}
                      visibleItems={visibleFlights}
                      initialVisibleItems={initialVisibleFlights}
                      itemsPerStep={flightsPerStep}
                      onShowMore={handleShowMore}
                      onShowLess={handleShowLess}
                      itemLabel="vuelos"
                      showMoreText="Mostrar más vuelos"
                      showLessText="Mostrar menos vuelos"
                      allItemsMessage="✈️ Has visto todos los vuelos disponibles"
                      className="mt-8"
                      showProgressBar={true}
                      progressColor="bg-primary"
                    />
                  }
                />
              )}
            />
        </div>
      );
    }

    return (
      <div className="text-center py-12 text-gray-500">
        No hay resultados para mostrar
      </div>
    );
  };

  return (
    <div className={`container py-6 max-w-7xl ${className || ''}`}>
      <div>
        <Breadcrumb
          steps={breadcrumbSteps}
          onStepClick={handleBreadcrumbClick}
          allowBackNavigation={true}
          allowForwardNavigation={false}
          className="w-full mb-4"
        />
        {renderFlightContent()}
      </div>
        
      <FlightDetailSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        flight={selectedFlightForDetails}
        onSelectFlight={handleSelectFromSheet}
      />
    </div>
  );
};

export default FlightResultsTemplate;