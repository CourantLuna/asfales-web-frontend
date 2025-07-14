import { CompareConfig } from './lodging-types';

// Configuración del data source para búsqueda de propiedades
export const createDataSourcesLodging = (rows: any[]) => [
  {
    id: "hotels",
    label: "Hoteles",
    icon: "Building2", // Nombre del icono en lugar de JSX
    type: "hotel" as const,
    nameLabelField: "title",
    nameValueField: "title", 
    nameDescriptionField: "descMain",
    options: rows
  }
];

// Configuración de comparación por defecto
export const defaultCompareConfig: CompareConfig = {
  titleOff: "Comparar propiedades",
  subtitleOff: "Obtén una vista lado a lado de hasta 5 propiedades",
  titleOn: "Comparando propiedades", 
  subtitleOn: "Selecciona propiedades para comparar lado a lado"
};

// Textos por defecto para el componente
export const defaultTexts = {
  searchPlaceholder: "Buscar alojamiento...",
  noResultsMessage: "No se encontraron propiedades",
  clearFiltersText: "Limpiar filtros",
  sortByText: "Ordenar por",
  howItWorksText: "¿Cómo funciona nuestro orden?",
  resultsCountText: (count: number) => `${count}+ alojamientos`,
  showMoreLabel: "Mostrar más alojamientos",
  showLessLabel: "Mostrar menos"
};

// Configuración de cards por defecto
export const defaultCardConfig = {
  initialVisibleCards: 6,
  cardsPerStep: 6,
  enableShowLess: true
};

// Configuración de anuncios por defecto
export const defaultAdsConfig = {
  adsGap: 4,
  adsDirection: "col" as const,
  showAds: true,
  adsContainerClassName: "hidden xl:block flex-shrink-0 w-[12%]"
};
