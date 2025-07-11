'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import CustomFlightCard from './CustomFlightCard';
import { Breadcrumb, useFlightBreadcrumbSteps } from '../shared/Breadcrumb';
import { Button } from '../ui/button';
import { Plus, Minus, Plane, Clock, MapPin, DollarSign, Users, Briefcase, Star, Building2, Clock4, Clock7, Clock9, Clock6, Clock5, Clock8 } from 'lucide-react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '../shared/SearchWithFilters';
import { CustomSelectOption } from '../shared/CustomSelect';
import { CheckboxOption } from '../shared/standard-fields-component/CheckboxFilter';
import { RowData } from '../shared/RenderFields';
import { AdItem } from '../shared/Ads';
import EventDrivenProgress, { EventDrivenProgressRef } from '../shared/EventDrivenProgress';

// Interfaces
interface FlightData {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: string;
  price: number;
  currency: string;
  priceLabel?: string;
  logo?: string;
  badge?: string;
  savings?: string;
}

interface FlightResultSet {
  stepId: string;
  title: string;
  subtitle: string;
  flights: FlightData[];
}

interface SelectedFlight {
  stepId: string;
  flight: FlightData;
}

// Configuración de valores por defecto para filtros
interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  airlines?: string[];
  departureTime?: string[];
  stops?: string[];
  duration?: string[];
  airports?: string[];
  flightClass?: string;
  baggage?: string[];
  travelTimeRange?: [number, number]; // Rango de tiempo total de viaje en horas
  layoverTimeRange?: [number, number]; // Rango de tiempo de escala en horas
}

interface FlightResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  flightData?: RowData[];
  flightType?: 'round-trip' | 'one-way' | 'multi-destination';
  destinations?: string[];
}

// Datos de ejemplo para anuncios de vuelos
const flightAds: AdItem[] = [
  {
    id: "cheap-flights",
    src: "https://tpc.googlesyndication.com/simgad/7006773931942455307?",
    alt: "Vuelos Baratos - Reserva Ahora",
    href: "https://cheapflights.com/ofertas-especiales",
    title: "Vuelos nacionales e internacionales desde $99",
    height: 600,
    width: 160,
  },
  {
    id: "last-minute",
    src: "https://tpc.googlesyndication.com/simgad/12562425310683427121?",
    alt: "Ofertas de Último Minuto",
    href: "https://lastminute.com/vuelos",
    title: "Ofertas de último minuto - Hasta 60% OFF",
    height: 600,
    width: 160,
  },
  {
    id: "premium-airlines",
    src: "https://tpc.googlesyndication.com/simgad/8989349070575090120?",
    alt: "Aerolíneas Premium",
    href: "https://premium-airlines.com/business-class",
    title: "Vuela en Business Class por menos",
    height: 600,
    width: 160,
  }
];

// Opciones de filtros constantes (fuera del componente)
const popularFiltersOptions: CheckboxOption[] = [
  { value: "non-stop", label: "Vuelos sin escalas", count: 145 },
  { value: "flexible-dates", label: "Fechas flexibles", count: 89 },
  { value: "baggage-included", label: "Equipaje incluido", count: 203 },
  { value: "morning-departure", label: "Salida matutina", count: 167 },
  { value: "evening-departure", label: "Salida nocturna", count: 134 },
  { value: "refundable", label: "Reembolsable", count: 78 },
  { value: "same-airline", label: "Misma aerolínea", count: 156 },
  { value: "short-layover", label: "Escala corta", count: 98 },
];

const airlinesOptions: CheckboxOption[] = [
  { value: "arajet", label: "Arajet", count: 45 },
  { value: "copa", label: "Copa Airlines", count: 38 },
  { value: "avianca", label: "Avianca", count: 52 },
  { value: "latam", label: "LATAM", count: 41 },
  { value: "jetblue", label: "JetBlue", count: 29 },
  { value: "spirit", label: "Spirit", count: 33 },
  { value: "american", label: "American Airlines", count: 28 },
  { value: "delta", label: "Delta", count: 24 },
  { value: "iberia", label: "Iberia", count: 18 },
  { value: "air-europa", label: "Air Europa", count: 15 },
];

const departureTimeOptions = [
  { value: "early-morning", label: "Madrugada (00:00 - 06:00)", icon: <Clock4 className="w-full h-full" />, count: 42 },
  { value: "morning", label: "Mañana (06:00 - 12:00)", icon: <Clock9 className="w-full h-full" />, count: 89 },
  { value: "afternoon", label: "Tarde (12:00 - 18:00)", icon: <Clock5 className="w-full h-full" />, count: 76 },
  { value: "evening", label: "Noche (18:00 - 24:00)", icon: <Clock8 className="w-full h-full" />, count: 65 },
];

const stopsOptions: CheckboxOption[] = [
  { value: "non-stop", label: "Sin escalas", count: 98 },
  { value: "1-stop", label: "1 escala", count: 145 },
  { value: "2-stops", label: "2+ escalas", count: 29 },
];

const durationOptions = [
  { value: "short", label: "Corto (menos de 4h)", icon: <Plane className="w-full h-full" />, count: 67 },
  { value: "medium", label: "Medio (4h - 8h)", icon: <Plane className="w-full h-full" />, count: 123 },
  { value: "long", label: "Largo (8h - 12h)", icon: <Plane className="w-full h-full" />, count: 89 },
  { value: "very-long", label: "Muy largo (más de 12h)", icon: <Plane className="w-full h-full" />, count: 43 },
];

const flightClassOptions: CheckboxOption[] = [
  { value: "economy", label: "Económica", count: 245 },
  { value: "premium-economy", label: "Económica Premium", count: 89 },
  { value: "business", label: "Business", count: 34 },
  { value: "first", label: "Primera Clase", count: 12 },
];

const baggageOptions: CheckboxOption[] = [
  { value: "carry-on-included", label: "Equipaje de mano incluido", count: 198 },
  { value: "checked-bag-included", label: "Maleta facturada incluida", count: 87 },
  { value: "extra-baggage", label: "Equipaje adicional disponible", count: 156 },
];

// Opciones de ordenamiento
const sortOptions: CustomSelectOption[] = [
  { key: "recommended", label: "Recomendado" },
  { key: "price_low", label: "Precio: menor a mayor" },
  { key: "price_high", label: "Precio: mayor a menor" },
  { key: "duration_short", label: "Duración: más corto" },
  { key: "departure_early", label: "Salida: más temprano" },
  { key: "departure_late", label: "Salida: más tarde" },
  { key: "airline", label: "Aerolínea A-Z" },
];

const FlightResultsTemplate: React.FC<FlightResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  flightData,
  flightType: propFlightType,
  destinations: propDestinations
}) => {
  // Estados principales
  const [flightType, setFlightType] = useState<'round-trip' | 'one-way' | 'multi-destination'>(propFlightType || 'round-trip');
  const [currentStep, setCurrentStep] = useState('choose-departure');
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para paginación
  const [visibleFlights, setVisibleFlights] = useState(3);
  const initialVisibleFlights = 3;
  const flightsPerStep = 3;

  // Referencias
  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Para multi-destino
  const multiDestinations = propDestinations || ['Medellín', 'Madrid'];
  
  // Generar steps del breadcrumb
  const breadcrumbSteps = useFlightBreadcrumbSteps(flightType, currentStep, multiDestinations);

  // Efecto para ajustar el step cuando cambia el tipo de vuelo
  useEffect(() => {
    if (flightType === 'multi-destination' && currentStep === 'choose-departure') {
      setCurrentStep('choose-flight-0');
    } else if (flightType !== 'multi-destination' && currentStep.startsWith('choose-flight-')) {
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

  // Opciones de filtros
  const getFilterOptionsForFlights = useMemo(() => ({
    popularFilters: popularFiltersOptions,
    airlines: airlinesOptions,
    departureTime: departureTimeOptions,
    stops: stopsOptions,
    duration: durationOptions,
    flightClass: flightClassOptions,
    baggage: baggageOptions
  }), []);

  // Dispara la barra de progreso cuando loading cambia
  useEffect(() => {
    if (loading && progressRef.current) {
      progressRef.current.start();
    }
  }, [loading]);

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
  }, [flightData, flightType]);

  // Handler para cambios en flightData
  useEffect(() => {
    if (flightData && flightData.length > 0) {
      setRows(flightData);
      setLoading(false);
    }
  }, [flightData]);

  // Datos simulados - diferentes conjuntos según el tipo de viaje
  const flightResultSets: FlightResultSet[] = useMemo(() => {
    const baseFlights = [
      {
        id: "dep-1",
        airline: "Arajet",
        departureTime: "7:07 p. m.",
        arrivalTime: "8:42 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "2 h 35 min",
        stops: "Vuelo sin escalas",
        price: 325,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-2",
        airline: "Copa",
        departureTime: "5:23 a. m.",
        arrivalTime: "5:00 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "12 h 37 min",
        stops: "1 escala",
        price: 265,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Ahorra en paquete"
      },
      {
        id: "dep-3",
        airline: "Avianca",
        departureTime: "9:15 a. m.",
        arrivalTime: "2:30 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "5 h 15 min",
        stops: "1 escala",
        price: 380,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-4",
        airline: "LATAM",
        departureTime: "11:45 a. m.",
        arrivalTime: "4:20 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "4 h 35 min",
        stops: "Vuelo sin escalas",
        price: 450,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-5",
        airline: "JetBlue",
        departureTime: "3:30 p. m.",
        arrivalTime: "10:45 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "7 h 15 min",
        stops: "1 escala",
        price: 290,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-6",
        airline: "Spirit",
        departureTime: "6:00 p. m.",
        arrivalTime: "11:25 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "5 h 25 min",
        stops: "Vuelo sin escalas",
        price: 199,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      }
    ];

    const returnFlights = [
      {
        id: "ret-1",
        airline: "LATAM",
        departureTime: "10:15 a. m.",
        arrivalTime: "6:30 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "8 h 15 min",
        stops: "1 escala",
        price: 380,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-2",
        airline: "Avianca",
        departureTime: "2:45 p. m.",
        arrivalTime: "8:20 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 35 min",
        stops: "Vuelo sin escalas",
        price: 420,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-3",
        airline: "Copa",
        departureTime: "6:30 a. m.",
        arrivalTime: "2:15 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "7 h 45 min",
        stops: "1 escala",
        price: 340,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-4",
        airline: "Arajet",
        departureTime: "11:20 a. m.",
        arrivalTime: "4:55 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 35 min",
        stops: "Vuelo sin escalas",
        price: 395,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-5",
        airline: "JetBlue",
        departureTime: "4:10 p. m.",
        arrivalTime: "10:45 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "6 h 35 min",
        stops: "1 escala",
        price: 320,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-6",
        airline: "Spirit",
        departureTime: "8:45 p. m.",
        arrivalTime: "2:30 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 45 min",
        stops: "Vuelo sin escalas",
        price: 250,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      }
    ];

    const madridFlights = [
      {
        id: "mad-1",
        airline: "Iberia",
        departureTime: "11:30 a. m.",
        arrivalTime: "6:45 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "11 h 15 min",
        stops: "1 escala",
        price: 850,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-2",
        airline: "Air Europa",
        departureTime: "6:20 p. m.",
        arrivalTime: "2:10 p. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "13 h 50 min",
        stops: "1 escala",
        price: 780,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-3",
        airline: "LATAM",
        departureTime: "9:15 a. m.",
        arrivalTime: "4:30 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "12 h 15 min",
        stops: "1 escala",
        price: 920,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-4",
        airline: "Avianca",
        departureTime: "3:45 p. m.",
        arrivalTime: "11:20 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "14 h 35 min",
        stops: "2 escalas",
        price: 750,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-5",
        airline: "Copa",
        departureTime: "7:00 a. m.",
        arrivalTime: "1:45 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "15 h 45 min",
        stops: "2 escalas",
        price: 680,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      },
      {
        id: "mad-6",
        airline: "Turkish Airlines",
        departureTime: "10:30 p. m.",
        arrivalTime: "8:15 p. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "16 h 45 min",
        stops: "2 escalas",
        price: 890,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      }
    ];

    switch (flightType) {
      case 'one-way':
        return [
          {
            stepId: 'choose-departure',
            title: 'Elige tu vuelo de salida',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          }
        ];

      case 'round-trip':
        return [
          {
            stepId: 'choose-departure',
            title: 'Elige tu vuelo a Medellín',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          },
          {
            stepId: 'choose-return',
            title: 'Elige tu vuelo de regreso',
            subtitle: 'Medellín (MDE) → Santo Domingo (SDQ)',
            flights: returnFlights
          }
        ];

      case 'multi-destination':
        return [
          {
            stepId: 'choose-flight-0',
            title: 'Elige tu vuelo a Medellín',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          },
          {
            stepId: 'choose-flight-1',
            title: 'Elige tu vuelo a Madrid',
            subtitle: 'Medellín (MDE) → Madrid (MAD)',
            flights: madridFlights
          }
        ];

      default:
        return [];
    }
  }, [flightType]);

  // Obtener el conjunto de resultados actual
  const currentResultSet = flightResultSets.find(set => set.stepId === currentStep);

  // Actualizar rows cuando cambie currentResultSet
  useEffect(() => {
    if (currentResultSet && !flightData) {
      const flightRows = mapFlightsToRowData(currentResultSet.flights);
      setRows(flightRows);
      setLoading(false);
    }
  }, [currentResultSet, flightData]);

  // Handler para navegación de breadcrumb (solo hacia atrás)
  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
    setVisibleFlights(initialVisibleFlights); // Reset paginación al cambiar step
  };

  // Handler para seleccionar vuelo (avanza automáticamente)
  const handleFlightSelect = (flight: FlightData) => {
    if (!currentResultSet) return;

    // Agregar/actualizar vuelo seleccionado
    setSelectedFlights(prev => {
      const filtered = prev.filter(sf => sf.stepId !== currentStep);
      return [...filtered, { stepId: currentStep, flight }];
    });

    // Avanzar al siguiente paso automáticamente
    const currentIndex = breadcrumbSteps.findIndex(step => step.isActive);
    if (currentIndex < breadcrumbSteps.length - 1) {
      setCurrentStep(breadcrumbSteps[currentIndex + 1].id);
      setVisibleFlights(initialVisibleFlights); // Reset paginación al avanzar step
    }
  };

  // Handler para ver detalles (no avanza)
  const handleDetailsClick = (flight: FlightData) => {
    console.log('Ver detalles del vuelo:', flight);
  };

  // Handler para cambiar tipo de vuelo
  const handleFlightTypeChange = (type: 'round-trip' | 'one-way' | 'multi-destination') => {
    setFlightType(type);
    // Ajustar el step inicial según el tipo
    const initialStep = type === 'multi-destination' ? 'choose-flight-0' : 'choose-departure';
    setCurrentStep(initialStep);
    setSelectedFlights([]);
    setVisibleFlights(initialVisibleFlights); // Reset paginación
  };

  // Handlers para paginación
  const handleShowMore = () => {
    if (currentResultSet) {
      setVisibleFlights(prev => Math.min(prev + flightsPerStep, currentResultSet.flights.length));
    }
  };

  const handleShowLess = () => {
    setVisibleFlights(initialVisibleFlights);
  };

  // Handler para click en card de SearchWithFilters
  const handleCardClick = (idx: number, row: RowData) => {
    // Convertir RowData de vuelta a FlightData para la selección
    const flight: FlightData = {
      id: row.title || `flight-${idx}`,
      airline: row.descMain || 'Aerolínea',
      departureTime: row.feature1 || '',
      arrivalTime: row.feature2 || '',
      departureAirport: row.location || '',
      arrivalAirport: '',
      duration: '',
      stops: row.descSub || '',
      price: row.afterPrice?.value || 0,
      currency: row.afterPrice?.currency || 'USD',
      priceLabel: 'Por pasajero',
      logo: row.images?.[0] || '/placeholder-logo.svg',
      badge: row.badge1 || ''
    };

    handleFlightSelect(flight);
    
    if (onCardClick) {
      onCardClick(idx, row);
    }
  };

  // Función para mapear FlightData a RowData
  const mapFlightsToRowData = (flights: FlightData[]): RowData[] => {
    return flights.map((flight, index) => ({
      title: flight.airline,
      images: [flight.logo || '/placeholder-logo.svg'],
      location: `${flight.departureAirport} → ${flight.arrivalAirport}`,
      feature1: flight.departureTime,
      feature2: flight.arrivalTime,
      descMain: flight.duration,
      descSub: flight.stops,
      beforePrice: flight.price > 300 ? { currency: flight.currency, value: flight.price + 50 } : undefined,
      afterPrice: { currency: flight.currency, value: flight.price },
      badge1: flight.badge || '',
      badge2: flight.savings || '',
      isFavorite: false,
      rating: Math.random() > 0.5 ? (8.5 + Math.random() * 1.5) : undefined,
      ratingLabel: Math.random() > 0.5 ? 'Excelente' : undefined,
      ratingCount: Math.random() > 0.5 ? Math.floor(Math.random() * 500 + 100) : undefined,
    }));
  };

  // Renderizar contenido de vuelos con SearchWithFilters o resumen
  const renderFlightContent = () => {
    // Si estamos en el paso de revisión, mostrar vuelos seleccionados
    if (currentStep === 'review-details') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              🎉 ¡Resumen de tu viaje!
            </h2>
            <div className="space-y-4">
              {selectedFlights.map((selected, index) => {
                const stepInfo = breadcrumbSteps.find(step => step.id === selected.stepId);
                return (
                  <div key={selected.stepId} className="bg-white rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {stepInfo?.label || `Vuelo ${index + 1}`}
                    </h3>
                    <CustomFlightCard
                      flight={selected.flight}
                      onDetailsClick={handleDetailsClick}
                      className="bg-gray-50"
                    />
                  </div>
                );
              })}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total estimado:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${selectedFlights.reduce((total, sf) => total + sf.flight.price, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Mostrar SearchWithFilters para selección de vuelos
    if (currentResultSet) {
      return (
        <SearchWithFilters
          rows={rows}
          filters={getFiltersForFlights}
          filterOptions={getFilterOptionsForFlights}
          sortOptions={sortOptions}
          ads={flightAds}
          adsDirection="col"
          showAds={true}
          enableCompareMode={false}
          onCardClick={handleCardClick}
          onFiltersChange={onFiltersChange}
          searchPlaceholder="Buscar vuelos por aerolínea, aeropuerto..."
          noResultsMessage="No se encontraron vuelos que coincidan con tu búsqueda"
          clearFiltersText="Limpiar filtros"
          sortByText="Ordenar por"
          resultsCountText={(count) => `${count}+ vuelos encontrados`}
          renderResults={({ filteredRows, compareMode, onCardClick: cardClickHandler }) => (
            <div className="space-y-4">
              {filteredRows.slice(0, visibleFlights).map((row, index) => {
                // Convertir RowData de vuelta a FlightData para mostrar
                const flight: FlightData = {
                  id: row.title || `flight-${index}`,
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
                  badge: row.badge1 || ''
                };

                return (
                  <CustomFlightCard
                    key={flight.id}
                    flight={flight}
                    onDetailsClick={handleDetailsClick}
                    onClick={() => cardClickHandler(index, row)}
                    className="hover:bg-blue-50 transition-colors cursor-pointer"
                  />
                );
              })}

              {/* Controles de paginación */}
              {filteredRows.length > visibleFlights && (
                <div className="flex flex-col items-center space-y-3 py-6">
                  <div className="text-sm text-gray-600 text-center">
                    Mostrando {visibleFlights} de {filteredRows.length} vuelos
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      onClick={handleShowMore}
                      variant="outline"
                      className="w-full md:w-80 flex items-center space-x-2 px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>
                        Mostrar más vuelos ({Math.min(flightsPerStep, filteredRows.length - visibleFlights)} más)
                      </span>
                    </Button>

                    {visibleFlights > initialVisibleFlights && (
                      <Button
                        onClick={handleShowLess}
                        variant="ghost"
                        className="w-full md:w-80 text-gray-600 hover:text-gray-800 flex items-center space-x-2 px-6 py-2 border-2"
                      >
                        <Minus className="h-4 w-4" />
                        <span>Mostrar menos vuelos</span>
                      </Button>
                    )}
                  </div>

                  {filteredRows.length > initialVisibleFlights && (
                    <div className="w-full max-w-xs">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(visibleFlights / filteredRows.length) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {Math.round((visibleFlights / filteredRows.length) * 100)}% cargado
                      </div>
                    </div>
                  )}
                </div>
              )}

              {visibleFlights >= filteredRows.length && filteredRows.length > initialVisibleFlights && (
                <div className="text-center py-4">
                  <p className="text-gray-600 text-sm">
                    ✈️ Has visto todos los vuelos disponibles
                  </p>
                </div>
              )}
            </div>
          )}
        />
      );
    }

    return (
      <div className="text-center py-12 text-gray-500">
        No hay resultados para mostrar
      </div>
    );
  };

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <div className="container py-6 max-w-7xl">
        <div className="text-center py-12">
          <EventDrivenProgress ref={progressRef} />
          <p className="text-gray-600 mt-4">Buscando los mejores vuelos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container py-6 max-w-7xl ${className || ''}`}>
      {/* Controles de demo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo: Tipos de vuelo</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleFlightTypeChange('one-way')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'one-way'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Vuelo sencillo
          </button>
          <button
            onClick={() => handleFlightTypeChange('round-trip')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'round-trip'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Vuelo redondo
          </button>
          <button
            onClick={() => handleFlightTypeChange('multi-destination')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'multi-destination'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Multi-destino
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb
        steps={breadcrumbSteps}
        onStepClick={handleBreadcrumbClick}
        allowBackNavigation={true}
        allowForwardNavigation={false}
        className="w-full mb-4"
      />

      {/* Título y subtítulo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {currentResultSet?.title || breadcrumbSteps.find(step => step.isActive)?.label || 'Resumen del viaje'}
        </h1>
        {currentResultSet && (
          <p className="text-gray-600">
            {currentResultSet.subtitle} • {currentResultSet.flights.length} vuelos encontrados
          </p>
        )}
        {currentStep === 'review-details' && (
          <p className="text-gray-600">
            Revisa y confirma tu selección de {selectedFlights.length} vuelo{selectedFlights.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Contenido principal */}
      {renderFlightContent()}
    </div>
  );
};

export default FlightResultsTemplate;