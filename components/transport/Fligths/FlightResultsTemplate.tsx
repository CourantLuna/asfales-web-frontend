'use client';

import React, { useState, useMemo, useRef, useEffect, useImperativeHandle } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIsMobile } from "../../ui/use-mobile";
import CustomFlightCard from './CustomFlightCard';
import FlightDetailSheet from './FlightDetailSheet';
import { Breadcrumb, useFlightBreadcrumbSteps } from '../../shared/Breadcrumb';
import { Button } from '../../ui/button';
import { Plus, Minus, Plane, Clock, MapPin, DollarSign, Users, Briefcase, Star, Building2, Clock4, Clock7, Clock9, Clock6, Clock5, Clock8, XCircle } from 'lucide-react';
import PaginationCard from '../../shared/PaginationCard';
import { usePagination } from '../../../hooks/usePagination';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '../../shared/SearchWithFilters';
import { RowData } from '../../shared/RenderFields';
import { EventDrivenProgressRef } from '../../shared/EventDrivenProgress';
import { openInNewTab } from '../../../lib/utils/navigation';
import { FilterDefaults, FlightData, FlightResultSet, SelectedFlight } from '@/lib/data/flight-types';
import { convertToFlightCardData, getFlightResultSets, mapFlightsToRowData } from '@/lib/data/flight-utils';
import { getFilterOptionsForFlights, sortOptions } from '@/lib/data/flight-filter-options';
import { flightAds } from '@/lib/data/flight-filter-options';
import { CompareSheet } from '@/components/comparator/CompareSheet';
import { useCompare } from '@/hooks/use-compare';
import { toast } from 'sonner';
import { id } from 'date-fns/locale';

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
  
  // Estados principales - Usar propFlightType directamente en lugar de estado local
  const flightType = propFlightType || 'roundtrip'; // Usar prop directamente
  const [currentStep, setCurrentStep] = useState('choose-departure');
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el sheet de detalles
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFlightForDetails, setSelectedFlightForDetails] = useState<FlightData | null>(null);
  const isMobile = useIsMobile();


  // Hook de paginación
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

  // Constantes de paginación
  const initialVisibleFlights = 3;
  const flightsPerStep = 3;

  // Referencias
  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Para multi-destino
  const multiDestinations = propDestinations || ['Medellín', 'Madrid'];
  
  // Generar steps del breadcrumb
  const breadcrumbSteps = useFlightBreadcrumbSteps(flightType, currentStep, multiDestinations);



  // Efecto para sincronizar cuando cambia propFlightType desde searchParams
  useEffect(() => {
    if (propFlightType) {
      const initialStep = propFlightType === 'multicity' ? 'choose-flight-0' : 'choose-departure';
      setCurrentStep(initialStep);
      setSelectedFlights([]);
      resetPagination();
    }
  }, [propFlightType, resetPagination]);

  // Efecto para ajustar el step cuando cambia el tipo de vuelo
  useEffect(() => {
    if (flightType === 'multicity' && currentStep === 'choose-departure') {
      setCurrentStep('choose-flight-0');
    } else if (flightType !== 'multicity' && currentStep.startsWith('choose-flight-')) {
      setCurrentStep('choose-departure');
    }
  }, [flightType, currentStep]);

  // Configuración del data source para búsqueda de vuelos
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

  // Configuración de filtros para vuelos
  const getFiltersForFlights = useMemo(() => {
    const baseFilters: GenericFilterConfig[] = [
      {
        id: "search",
        type: "search",
        label: "Buscar vuelos",
        placeholder: filterDefaults.search || "Buscar por aerolínea, aeropuerto...",
        dataSources: dataSourcesFlights,
        defaultValue: filterDefaults.search || "",
        showClearButton: true,
        minSearchLength: 2,
        emptyMessage: "No se encontraron vuelos",
        searchPlaceholder: "Escribe para buscar vuelos..."
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
        maxSelections: 5,
        initialVisibleCount: 6,
        showMoreText: "Ver más filtros",
        showLessText: "Ver menos",
        defaultValue: filterDefaults.popularFilters || []
      },
      {
        id: "separator-2",
        type: "separator"
      },
      {
        id: "priceRange",
        type: "range",
        label: "Rango de precio",
        min: 50,
        max: 2000,
        step: 25,
        currency: "USD",
        defaultValue: filterDefaults.priceRange || [50, 2000]
      },
      {
        id: "separator-3",
        type: "separator"
      },
      {
        id: "airlines",
        type: "checkbox",
        label: "Aerolíneas",
        showCounts: true,
        maxSelections: 5,
        initialVisibleCount: 5,
        showMoreText: "Ver más aerolíneas",
        showLessText: "Ver menos",
        defaultValue: filterDefaults.airlines || []
      },
      {
        id: "separator-4",
        type: "separator"
      },
      {
        id: "departureTime",
        type: "toggle" as const,
        label: "Horario de salida",
        type_toggle: "multiple" as const,
        variant: "vertical" as const,
        wrap: true,
        gridCols: "auto" as const,
        containerClassName: "w-full",
        labelClassName: "text-lg font-semibold mb-4",
        toggleGroupClassName: "gap-3",
        toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
        maxSelections: 4,
        defaultValue: filterDefaults.departureTime || []
      },
      {
        id: "separator-5",
        type: "separator"
      },
      {
        id: "stops",
        type: "radio",
        label: "Escalas",
        defaultValue: filterDefaults.stops?.[0] || ""
      },
      {
        id: "separator-6",
        type: "separator"
      },
      {
        id: "duration",
        type: "toggle" as const,
        label: "Duración del vuelo",
        type_toggle: "multiple" as const,
        variant: "vertical" as const,
        wrap: true,
        gridCols: "auto" as const,
        containerClassName: "w-full",
        labelClassName: "text-lg font-semibold mb-4",
        toggleGroupClassName: "gap-3",
        toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
        maxSelections: 4,
        defaultValue: filterDefaults.duration || []
      },
      {
        id: "separator-7",
        type: "separator"
      },
      {
        id: "travelTimeRange",
        type: "range",
        label: "Tiempo total de viaje",
        min: 2,
        max: 24,
        step: 1,
         mode: "single", // Modo single - solo un valor
        unitSuffix: "h", // Usar unitSuffix en lugar de currency para que aparezca como "2h"
        defaultValue: filterDefaults.travelTimeRange || [24, 24]
      },
    

      {
        id: "separator-9",
        type: "separator"
      },
      {
        id: "flightClass",
        type: "radio",
        label: "Clase de vuelo",
        defaultValue: filterDefaults.flightClass || ""
      },
      {
        id: "separator-10",
        type: "separator"
      },
      {
        id: "baggage",
        type: "checkbox",
        label: "Equipaje",
        showCounts: true,
        defaultValue: filterDefaults.baggage || []
      }
    ];

    return baseFilters;
  }, [dataSourcesFlights, filterDefaults]);


  // Dispara la barra de progreso cuando loading cambia
   useEffect(() => {
      if (loading !== false) {
        setTimeout(() => {
          progressRef.current?.start();
        }, 0);
      } else {
        progressRef.current?.finish();
      }
    }, [loading]);

  

  // Datos simulados - diferentes conjuntos según el tipo de viaje
  const flightResultSets: FlightResultSet[] = useMemo(() => {
    return getFlightResultSets(flightType);
  }, [flightType]);

  // Obtener el conjunto de resultados actual
  const currentResultSet = flightResultSets.find(set => set.stepId === currentStep);

  // Simular carga de datos (para demo)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (flightData && flightData.length > 0) {
        setRows(flightData);
      } else {
        // Generar datos simulados de vuelos
        const simulatedFlights = mapFlightsToRowData(currentResultSet?.flights || []);
        setRows(simulatedFlights);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [flightData, flightType, currentResultSet]);

  // Handler para navegación de breadcrumb (solo hacia atrás)
  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
    resetPagination(); // Reset paginación al cambiar step
  };

  // Handler para seleccionar vuelo (avanza automáticamente)
  const handleFlightSelect = (flight: FlightData) => {
    console.log('🔍 DEBUG handleFlightSelect - Inicio:', {
      currentStep,
      currentResultSet: !!currentResultSet,
      breadcrumbSteps,
      flightType
    });

    if (!currentResultSet) {
      console.warn('⚠️ No hay currentResultSet, saliendo');
      return;
    }

    // Agregar/actualizar vuelo seleccionado
    const updatedSelectedFlights = (() => {
      const filtered = selectedFlights.filter(sf => sf.stepId !== currentStep);
      return [...filtered, { stepId: currentStep, flight }];
    })();
    
    setSelectedFlights(updatedSelectedFlights);

    // Verificar si este es el último paso con vuelos (no incluir review-details)
    const flightSteps = breadcrumbSteps.filter(step => step.id !== 'review-details');
    const currentIndex = flightSteps.findIndex(step => step.id === currentStep);
    const isLastFlightStep = currentIndex === flightSteps.length - 1;
    
    console.log('🔍 DEBUG navegación:', {
      flightSteps,
      currentIndex,
      isLastFlightStep,
      updatedSelectedFlights,
      currentStep
    });
    
    if (isLastFlightStep) {
      // Es el último paso con vuelos, abrir página de detalles finales en nueva pestaña
      const currentUrl = window.location.href;
      
      // Calcular información adicional para la URL
      const totalPrice = updatedSelectedFlights.reduce((sum, sf) => sum + sf.flight.price, 0);
      const currency = updatedSelectedFlights[0]?.flight.currency || 'USD';
      
      // Preparar parámetros para la URL
      const queryParams = {
        flights: JSON.stringify(updatedSelectedFlights),
        type: flightType,
        return: currentUrl,
        total: totalPrice,
        currency: currency,
        count: updatedSelectedFlights.length
      };
      
      // Abrir página de detalles finales en nueva pestaña
      console.log('🛫 Abriendo detalles finales en nueva pestaña con vuelos:', updatedSelectedFlights);
      console.log('🛫 Parámetros de navegación:', queryParams);
      openInNewTab('/flights-details', queryParams);
    } else {
      // Avanzar al siguiente paso
      const nextStep = breadcrumbSteps[breadcrumbSteps.findIndex(step => step.id === currentStep) + 1]?.id;
      console.log('➡️ Avanzando al siguiente paso:', nextStep);
      if (nextStep) {
        setCurrentStep(nextStep);
        resetPagination(); // Reset paginación al avanzar step
      }
    }
  };

  // Handler para seleccionar vuelo desde el sheet
  const handleSelectFromSheet = () => {
    if (selectedFlightForDetails) {
      handleFlightSelect(selectedFlightForDetails);
      setIsSheetOpen(false);
      setSelectedFlightForDetails(null);
    }
  };

  // Handler para click en card de SearchWithFilters
  const handleCardClick = (idx: number, row: RowData) => {
    // Convertir RowData de vuelta a FlightData para la selección
    // Buscar el vuelo original para obtener todos los datos
    const originalFlight = currentResultSet?.flights[idx];
    
    const flight: FlightData = originalFlight || {
      id: row.title || `flight-${idx}`,
      airline: row.title || 'Aerolínea',
      departureTime: row.feature1 || '',
      arrivalTime: row.feature2 || '',
      departureAirport: row.location?.split(' → ')[0] || '',
      arrivalAirport: row.location?.split(' → ')[1] || '',
      duration: row.descMain || '',
      stops: row.descSub || '',
      price: row.afterPrice?.value || 0,
      currency: row.afterPrice?.currency || 'USD',
      priceLabel: 'Por pasajero',
      logo: row.images?.[0] || '/placeholder-logo.svg',
      badge: row.badge1 || '',
      travelClass: 'economy' as const,
      travelClassDetails: {
        name: 'Económica',
        description: 'Asiento estándar con servicios básicos'
      },
      baggage: {
        personalItem: { included: true, dimensions: '40cm x 20cm x 25cm' },
        carryOn: { included: false, dimensions: '55cm x 40cm x 20cm', weight: '8kg', price: 144 },
        checkedBag: { included: false, weight: '23kg', price: 116, count: 1 }
      },
      flexibility: {
        refundable: false,
        changeable: false
      }
    };

    handleFlightSelect(flight);
    
    if (onCardClick) {
      onCardClick(idx, row);
    }
  };


  // Handler para ver detalles (abre el sheet para preview) - ahora acepta FlightCardData y convierte
  const handleDetailsClickWrapper = (flightCard: any) => {
    // Buscar el vuelo completo en los datos originales
    const fullFlight = currentResultSet?.flights.find(f => f.id === flightCard.id);
    if (fullFlight) {
      setSelectedFlightForDetails(fullFlight);
      setIsSheetOpen(true);
    }
  };

const compare = useCompare({ max: 2, keyName: "id", rowName: "item" });
const [localCompareMode, setLocalCompareMode] = useState(false);


// 🔥 Resetear todo cuando compareMode se apague
useEffect(() => {
  if (!localCompareMode) {
    compare.reset();      // limpia selected
    resetPagination();    // resetea las páginas
  }
}, [localCompareMode]);


   const onCancelCompare = () => {
    compare.reset();
    resetPagination(); // Resetea la paginación al cerrar la comparación
  }

   useImperativeHandle(ref, () => ({
    reset: () =>onCancelCompare(),
  }));
  
  
const handleCompareChecked = (idx: number, checked: boolean) => {

const originalFlight = currentResultSet?.flights[idx];
const flight = convertToFlightCardData( originalFlight! );


  if (!flight) return;

  if (checked) {
    if (compare.selected.length >= compare.getMax()) {
      toast("Máximo alcanzado", {
        description: `Solo puedes comparar hasta ${compare.getMax()} elementos`,
        duration: 2000,
        icon: <XCircle className="text-red-500 w-6 h-6" />,
        style: {
          backgroundColor: "#FEE2E2",
          color: "#232323",
          fontWeight: 500,
        },
      });
      return;
    }

    compare.add(flight);
  } else {
    compare.remove(flight.id);
  }

  // // Estado externo opcional
  // if (onCompareChange) {
  //   onCompareChange(hotelTitle, checked);
  // } else {
  // }
};


  // Renderizar contenido de vuelos con SearchWithFilters
  const renderFlightContent = () => {
    // Mostrar SearchWithFilters para selección de vuelos
    if (currentResultSet) {
      return (
        <div>
           {compare.selected.length > 0 && (
                  <CompareSheet
                    items={compare.selected}
                    max={compare.getMax()}
                    itemName="vuelos"
                    keyName={compare.keyName}
                    isOpen={compare.isOpen}
                    onToggle={compare.toggle}
                    onRemove={compare.remove}
                    onCancel={compare.reset}
                    onCompare={(comparelist) => console.log("Comparando vuelos", comparelist)}
                    imageSelector={(row) => row.logo}
                  />
                )}

                 <SearchWithFilters
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
           showToggleShowFilters= {true}
          onCardClick={handleCardClick}
          onFiltersChange={onFiltersChange}
          searchPlaceholder="Buscar vuelos por aerolínea, aeropuerto..."
          noResultsMessage="No se encontraron vuelos que coincidan con tu búsqueda"
          clearFiltersText="Limpiar filtros"
          sortByText="Ordenar por"
          resultsCountText={(count) => `${count}+ vuelos encontrados`}
          renderResults={({
            filteredRows,
            compareMode,
            onCardClick: cardClickHandler,
          }) => {
            // Sincronizar estado interno
if (localCompareMode !== compareMode) {
  setLocalCompareMode(compareMode);
}

            const flightsToShow = filteredRows.slice(0, visibleFlights);
          
            return (
              <div className="space-y-4">

                
                {loading ? (
                  // Skeleton loading
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
                    </div>
                  ))
                ) : flightsToShow.length > 0 ? (
                  <>
                    {flightsToShow.map((row, index) => {
                      // Usar el vuelo original para obtener todos los datos
                      const originalFlight = currentResultSet?.flights[index];
                      
                      // Convertir RowData de vuelta a FlightData para mostrar
                      const flight: FlightData = originalFlight || {
                        id: row.title || `flight-${index}`,
                        airline: row.title || "Aerolínea",
                        departureTime: row.feature1 || "",
                        arrivalTime: row.feature2 || "",
                        departureAirport: row.location?.split(" → ")[0] || "",
                        arrivalAirport: row.location?.split(" → ")[1] || "",
                        duration: row.descMain || "",
                        stops: row.descSub || "",
                        price: row.afterPrice?.value || 0,
                        currency: row.afterPrice?.currency || "USD",
                        priceLabel: "Por pasajero",
                        logo: row.images?.[0] || "/placeholder-logo.svg",
                        badge: row.badge1 || "",
                        travelClass: 'economy' as const,
                        travelClassDetails: {
                          name: 'Económica',
                          description: 'Asiento estándar con servicios básicos'
                        },
                        baggage: {
                          personalItem: { included: true, dimensions: '40cm x 20cm x 25cm' },
                          carryOn: { included: false, dimensions: '55cm x 40cm x 20cm', weight: '8kg', price: 144 },
                          checkedBag: { included: false, weight: '23kg', price: 116, count: 1 }
                        },
                        flexibility: {
                          refundable: false,
                          changeable: false
                        }
                      };

                      return (
                        
                       <CustomFlightCard
  key={flight.id}
  flight={convertToFlightCardData(flight)}
  onDetailsClick={handleDetailsClickWrapper}
  onClick={() => cardClickHandler(index, row)}
  showCompareCheckbox={compareMode}
 onCompareChecked={(checked) => {
  handleCompareChecked(index, checked);
   }}

  isCompareChecked={compare.selected.some(i => i.id == flight.id)}
  className="hover:bg-blue-50 transition-colors cursor-pointer"
/>

                      );
                    })}

                    {/* Controles de paginación con componente reutilizable */}
                    {filteredRows.length > 3 && (
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
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No se encontraron vuelos
                    </h3>
                    <p className="text-gray-600">
                      Intenta ajustar tus filtros para encontrar más opciones.
                    </p>
                  </div>
                )}
              </div>
            );
          }}
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
      {  renderFlightContent()}
          </div>
        
  
      {/* Sheet de detalles del vuelo */}
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