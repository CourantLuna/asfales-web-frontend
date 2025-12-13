'use client';

import React, { useState, useMemo, useRef, useEffect, useImperativeHandle } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIsMobile } from "../../ui/use-mobile";
import CustomFlightCard from './CustomFlightCard';
import FlightDetailSheet from './FlightDetailSheet'; // Asumo que este componente también se actualizará para recibir TransportTrip
import { Breadcrumb, useFlightBreadcrumbSteps } from '../../shared/Breadcrumb';
import { Plane, XCircle } from 'lucide-react';
import PaginationCard from '../../shared/PaginationCard';
import { usePagination } from '../../../hooks/usePagination';
import SearchWithFilters, { GenericFilterConfig } from '../../shared/SearchWithFilters';
import { RowData } from '../../shared/RenderFields';
import { EventDrivenProgressRef } from '../../shared/EventDrivenProgress';
import { openInNewTab } from '../../../lib/utils/navigation';
import { FilterDefaults, FlightResultSet } from '@/components/transport/Fligths/lib/flight-types'; // Mantengo FilterDefaults si es genérico
import { TransportTrip } from '../types/transport.types'; // IMPORTANTE: Tu nuevo tipo
import { getFlightResultSets, mapFlightsToRowData } from './lib/flight-utils'; // Tus nuevas utils
import { getFilterOptionsForFlights, sortOptions } from '@/components/transport/Fligths/lib/flight-filter-options';
import { flightAds } from '@/components/transport/Fligths/lib/flight-filter-options';
import { CompareSheet } from '@/components/comparator/CompareSheet';
import { useCompare } from '@/hooks/use-compare';
import { toast } from 'sonner';

// Definición local de SelectedFlight adaptada a TransportTrip
export interface SelectedFlight {
  stepId: string;
  flight: TransportTrip;
}

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
  
  // Estados para el sheet de detalles - Tipado con TransportTrip
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
    type: searchParams.get("type"), // 'roundtrip', 'oneway', 'multicity'
    flights: searchParams.get("flights"), // El JSON string para multicity
  }), [searchParams]);

   flightType = (propFlightType || searchFilters.type || 'roundtrip') as 'roundtrip' | 'oneway' | 'multicity';


   // 1. Parsear segmentos Multi-destino para el Breadcrumb
  const multicitySegments = useMemo(() => {
    if (flightType === 'multicity' && searchFilters.flights) {
      try {
        return JSON.parse(searchFilters.flights);
      } catch (e) {
        console.error("Error parsing multicity segments", e);
        return [];
      }
    }
    // Si viene por props (fallback)
    if (flightType === 'multicity' && propDestinations) {
        return propDestinations.map(dest => ({ to: dest }));
    }
    return [];
  }, [flightType, searchFilters.flights, propDestinations]);

  // 2. Usar el Hook con la data dinámica
  const breadcrumbSteps = useFlightBreadcrumbSteps(
    flightType, 
    currentStep, 
    {
      origin: searchFilters.from || "Origen",     // Ej: "SDQ" o "Santo Domingo"
      destination: searchFilters.to || "Destino", // Ej: "MDE" o "Medellín"
      multicitySegments: multicitySegments
    }
  );
// DEBUG visual en consola
  useEffect(() => {
    console.group("🔍 DEBUG - Flight Filters");
    console.table(searchFilters);
    if(flightType === 'multicity' && searchFilters.flights) {
        try {
            console.log("Parsed Multicity Segments:", JSON.parse(searchFilters.flights));
        } catch(e) { console.error("Invalid flights JSON"); }
    }
    console.groupEnd();
  }, [searchFilters, flightType]);

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

  const initialVisibleFlights = 3;
  const flightsPerStep = 3;
  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Efectos de inicialización
// Efecto para ajustar el step inicial
  useEffect(() => {
    // Si es multicity, el paso inicial es 'choose-flight-0'
    if (flightType === 'multicity') {
        setCurrentStep('choose-flight-0');
    } else {
        setCurrentStep('choose-departure');
    }
    // Reseteamos selecciones al cambiar tipo
    setSelectedFlights([]);
    resetPagination();
  }, [flightType, resetPagination]);

  // Configuración del data source
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

  // Configuración de filtros (Mantenido igual, asumiendo compatibilidad)
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
      {
        id: "priceRange",
        type: "range",
        label: "Rango de precio",
        min: 0,
        max: 2000,
        step: 1,
        currency: "USD",
        defaultValue: filterDefaults.priceRange || [0, 2000],
        keyname: "prices.0.price"

      },
      {
        id: "airlines",
        type: "checkbox",
        label: "Aerolíneas",
        showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más operadores",
      showLessText: "Ver menos",
        defaultValue: filterDefaults.airlines || [],
        keyname: "operator.id",

      },
      {
        id: "stops",
        type: "radio",
        label: "Escalas",
        defaultValue: filterDefaults.stops?.[0] || "",
        keyname: "counterStops"
      },
      {
        id: "flightClass",
        type: "radio",
        label: "Clase de vuelo",
        defaultValue: filterDefaults.flightClass || "",
        keyname: "classesAvailable"
      }
    ];
    return baseFilters;
  }, [dataSourcesFlights, filterDefaults]);

  // Barra de progreso
  useEffect(() => {
    if (loading !== false) {
      setTimeout(() => {
        progressRef.current?.start();
      }, 0);
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
        // Pasamos flightType y searchFilters (que ahora contiene 'flights')
        const results = await getFlightResultSets(flightType, searchFilters);
        console.log("✈️ Loaded flight result sets:", results);
        
        if (mounted) {
          setFlightResultSets(results);
          
          // Lógica para encontrar los datos del paso actual
          const currentSet = results.find(set => set.stepId === currentStep);
          
          if (currentSet) {
            const rowData = mapFlightsToRowData(currentSet.flights);
            setRows(rowData);
          } else {
            // Si el paso actual no existe en los resultados (ej: cambio de tipo), intentar ir al primero
            if (results.length > 0) {
                const firstSet = results[0];
                setCurrentStep(firstSet.stepId); // Autocorrección de paso
                setRows(mapFlightsToRowData(firstSet.flights));
            } else {
                setRows([]);
            }
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

  // Handlers
  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
    resetPagination();
  };

  // Handler para seleccionar vuelo (avanza automáticamente)
  const handleFlightSelect = (flight: TransportTrip) => {
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

    // Lógica para determinar si es el último paso
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
      const totalPrice = updatedSelectedFlights.reduce((sum, sf) => sum + sf.flight.prices[0].price, 0);
      const currency = updatedSelectedFlights[0]?.flight.prices[0].currency || 'USD';
      
      // Preparar parámetros para la URL
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

  const handleSelectFromSheet = () => {
    if (selectedFlightForDetails) {
      handleFlightSelect(selectedFlightForDetails);
      setIsSheetOpen(false);
      setSelectedFlightForDetails(null);
    }
  };

  const handleCardClick = (idx: number, row: RowData) => {
    // IMPORTANTE: Ya no reconstruimos manualmente el objeto desde RowData.
    // Buscamos el original en el ResultSet usando el índice, que es mucho más seguro
    // dado que TransportTrip tiene estructuras anidadas complejas.
    const originalFlight = currentResultSet?.flights[idx];

    if (originalFlight) {
        handleFlightSelect(originalFlight);
        if (onCardClick) {
             onCardClick(idx, row);
        }
    } else {
        console.error("No se encontró el vuelo original para el índice:", idx);
    }
  };

  const handleDetailsClickWrapper = (flightCardData: any) => {
    // flightCardData viene de convertToFlightCardData, tiene el ID.
    // Buscamos el objeto completo TransportTrip.
    const fullFlight = currentResultSet?.flights.find(f => f.id === flightCardData.id);
    if (fullFlight) {
      setSelectedFlightForDetails(fullFlight);
      setIsSheetOpen(true);
    }
  };

  // Comparador
  const compare = useCompare({ max: 2, keyName: "id", rowName: "item" });
  const [localCompareMode, setLocalCompareMode] = useState(false);

  useEffect(() => {
    if (!localCompareMode) {
      compare.reset();
      resetPagination();
    }
  }, [localCompareMode]);

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

    // Convertimos a formato CardData para el comparador visual
    const flightCardData = originalFlight;

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
      compare.add(flightCardData);
    } else {
      compare.remove(flightCardData.id);
    }
  };

  // Renderizado
  const renderFlightContent = () => {
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
                imageSelector={(row) => row.operator?.logoUrl}
              />
            )}

            <SearchWithFilters
              rows={rows}
              filters={getFiltersForFlights}
              filterOptions={getFilterOptionsForFlights()} // Asegurar que estas opciones coincidan con los filtros nuevos
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
              renderResults={({
                filteredRows,
                compareMode,
                onCardClick: cardClickHandler,
              }) => {
                if (localCompareMode !== compareMode) {
                  setLocalCompareMode(compareMode);
                }

                const flightsToShow = filteredRows.slice(0, visibleFlights);
              
                return (
                  <div className="space-y-4">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
                        </div>
                      ))
                    ) : flightsToShow.length > 0 ? (
                      <>
                        {flightsToShow.map((row, index) => {
                          // Obtenemos el objeto TransportTrip original
                          const originalFlight = currentResultSet?.flights[index];
                          // console.log("✈️ Renderizando vuelo:", originalFlight);
                          
                          if (!originalFlight) return null; // Safety check

                          return (
                            <CustomFlightCard
                              key={originalFlight.id}
                              // Convertimos TransportTrip -> FlightCardData para el componente visual
                              flight={originalFlight}
                              onDetailsClick={handleDetailsClickWrapper}
                              onClick={() => cardClickHandler(index, row)}
                              showCompareCheckbox={compareMode}
                              onCompareChecked={(checked) => {
                                handleCompareChecked(index, checked);
                              }}
                              isCompareChecked={compare.selected.some(i => i.id == originalFlight.id)}
                              className="hover:bg-blue-50 transition-colors cursor-pointer"
                            />
                          );
                        })}

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
        {renderFlightContent()}
      </div>
        
      {/* Sheet de detalles */}
      <FlightDetailSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        flight={selectedFlightForDetails} // Ahora pasa TransportTrip | null
        onSelectFlight={handleSelectFromSheet}
      />
    </div>
  );
};

export default FlightResultsTemplate;