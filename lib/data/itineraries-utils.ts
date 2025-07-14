// Funciones utilitarias para itinerarios

import { ItineraryPackage } from '@/lib/data/mock-datavf';
import { ItineraryRowData, ItinerarySearchData } from './itineraries-types';
import { GenericFilterConfig } from '@/components/shared/SearchWithFilters';
import { filterLimits, searchConfig, priceRangeConfig } from './itineraries-config';

// Función para mapear ItineraryPackage a ItineraryRowData
export const mapItinerariesToRowData = (itineraries: ItineraryPackage[]): ItineraryRowData[] => {
  return itineraries.map((itinerary) => ({
    id: itinerary.id,
    title: itinerary.title,
    descMain: `${itinerary.cities.join(', ')} • ${itinerary.duration} • ${itinerary.price}`,
    descSecondary: `⭐ ${itinerary.rating} (${itinerary.reviewCount} reseñas) • ${itinerary.experienceCount} experiencias`,
    price: itinerary.price,
    originalData: itinerary
  }));
};

// Función para formatear rango de fechas
export const formatDateRange = (start?: Date, end?: Date): string => {
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

// Función para formatear nombre de ciudades
export const formatCityName = (city: string): string => {
  // Esta función puede expandirse para manejar casos especiales
  return city;
};

// Función para crear datos de búsqueda
export const createSearchData = (
  origin: string,
  destination: string,
  startDate?: Date,
  endDate?: Date,
  totalItineraries: number = 0
): ItinerarySearchData => ({
  origin,
  destination,
  startDate,
  endDate,
  totalItineraries
});

// Función para generar configuración de filtros dinámicos
export const getFiltersForItineraries = (dataSourcesItineraries: any[]): GenericFilterConfig[] => [
  {
    id: "search",
    type: "search",
    label: "Buscar itinerarios",
    placeholder: searchConfig.placeholder,
    dataSources: dataSourcesItineraries,
    defaultValue: "",
    showClearButton: true,
    minSearchLength: searchConfig.minSearchLength,
    emptyMessage: searchConfig.emptyMessage,
    searchPlaceholder: searchConfig.searchPlaceholder
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
    maxSelections: filterLimits.popularFilters.maxSelections,
    initialVisibleCount: filterLimits.popularFilters.initialVisibleCount,
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
    min: priceRangeConfig.min,
    max: priceRangeConfig.max,
    step: priceRangeConfig.step,
    currency: priceRangeConfig.currency,
    defaultValue: [priceRangeConfig.min, priceRangeConfig.max]
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
    maxSelections: filterLimits.destinations.maxSelections,
    initialVisibleCount: filterLimits.destinations.initialVisibleCount,
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
    maxSelections: filterLimits.duration.maxSelections,
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
    maxSelections: filterLimits.experienceTypes.maxSelections,
    initialVisibleCount: filterLimits.experienceTypes.initialVisibleCount,
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
];

// Función para crear data sources de búsqueda
export const createDataSourcesItineraries = (rows: ItineraryRowData[]) => [
  {
    id: "itineraries",
    label: "Itinerarios",
    icon: "MapPin", // String en lugar de JSX
    type: "custom" as const,
    nameLabelField: "title",
    nameValueField: "title",
    nameDescriptionField: "descMain",
    options: rows
  }
];

// Función para validar disponibilidad de itinerario
export const checkItineraryAvailability = (itinerary: ItineraryPackage): {
  isAvailable: boolean;
  urgencyLevel: 'none' | 'low' | 'medium' | 'high';
  message?: string;
} => {
  if (itinerary.availableSpots <= 0) {
    return {
      isAvailable: false,
      urgencyLevel: 'high',
      message: 'Agotado'
    };
  }
  
  if (itinerary.availableSpots <= 2) {
    return {
      isAvailable: true,
      urgencyLevel: 'high',
      message: `¡Solo ${itinerary.availableSpots} cupos!`
    };
  }
  
  if (itinerary.availableSpots <= 5) {
    return {
      isAvailable: true,
      urgencyLevel: 'medium',
      message: `${itinerary.availableSpots} cupos disponibles`
    };
  }
  
  return {
    isAvailable: true,
    urgencyLevel: 'none'
  };
};

// Función para calcular descuentos y ofertas
export const calculateItineraryOffers = (itinerary: ItineraryPackage) => {
  const offers = [];
  
  if (itinerary.discount && itinerary.discount > 0) {
    offers.push({
      type: 'discount',
      value: itinerary.discount,
      text: `-${itinerary.discount}%`
    });
  }
  
  // Agregar más lógica de ofertas según sea necesario
  return offers;
};
