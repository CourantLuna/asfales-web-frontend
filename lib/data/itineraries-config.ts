// Configuraciones y constantes para itinerarios

import { ItineraryPaginationConfig, ItineraryFilterDefaults } from './itineraries-types';

// Configuración de paginación por defecto
export const defaultPaginationConfig: ItineraryPaginationConfig = {
  initialVisibleResults: 6,
  resultsPerStep: 3
};

// Configuración de filtros por defecto
export const defaultFilterDefaults: ItineraryFilterDefaults = {
  search: "",
  popularFilters: [],
  priceRange: [500, 5000],
  destinations: [],
  duration: [],
  experienceTypes: [],
  budget: "",
  transport: []
};

// Configuración de rango de precios
export const priceRangeConfig = {
  min: 500,
  max: 5000,
  step: 100,
  currency: "USD"
};

// Configuración de límites para filtros
export const filterLimits = {
  popularFilters: {
    maxSelections: 4,
    initialVisibleCount: 6
  },
  destinations: {
    maxSelections: 5,
    initialVisibleCount: 5
  },
  duration: {
    maxSelections: 3,
    initialVisibleCount: 4
  },
  experienceTypes: {
    maxSelections: 4,
    initialVisibleCount: 4
  },
  transport: {
    maxSelections: 4,
    initialVisibleCount: 4
  }
};

// Configuración de búsqueda
export const searchConfig = {
  minSearchLength: 2,
  placeholder: "Buscar por destino, actividad, guía...",
  emptyMessage: "No se encontraron itinerarios",
  searchPlaceholder: "Escribe para buscar itinerarios..."
};

// Textos de la interfaz
export const uiTexts = {
  title: "Itinerarios",
  searchPlaceholder: "Buscar itinerarios por destino, actividad...",
  noResultsMessage: "No se encontraron itinerarios que coincidan con tus criterios",
  clearFiltersText: "Limpiar todos los filtros",
  sortByText: "Ordenar itinerarios por",
  resultsCountText: (count: number) => `${count} itinerarios encontrados`,
  showMoreText: "Mostrar más itinerarios",
  showLessText: "Mostrar menos itinerarios",
  allItemsMessage: "🗺️ Has visto todos los itinerarios disponibles",
  customItineraryText: "¿No encuentras lo que buscas?",
  customItineraryButton: "Solicita un itinerario personalizado"
};

// Configuración de fechas por defecto
export const getDefaultDateRange = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const twoWeeksLater = new Date(nextMonth.getTime() + (14 * 24 * 60 * 60 * 1000));
  
  return {
    startDate: nextMonth,
    endDate: twoWeeksLater
  };
};

// Configuración de ciudades por defecto
export const defaultLocations = {
  origin: "Santo Domingo",
  destination: "Colombia"
};
