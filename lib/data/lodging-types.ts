// Tipos e interfaces para componentes de alojamiento

import { RowData } from '@/components/shared/RenderFields';

// Tipos para opciones con iconos
export interface OptionWithIcon {
  value: string;
  label: string;
  icon: string; // Nombre del icono en lugar de JSX
  count: number;
  disabled?: boolean;
}

// Tipos de alojamiento disponibles
export type LodgingType = 
  | "hotels-and-resorts" 
  | "hostels-and-guesthouses" 
  | "apartments-and-longstays";

// Configuración de valores por defecto para filtros
export interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  guestRating?: string;
  priceRange?: [number, number];
  amenities?: string[];
  starRating?: string[];
  paymentType?: string[];
  cancellationOptions?: string[];
  propertyType?: string[];
  // Filtros específicos para hostels
  roomType?: string[];
  dormSize?: string[];
  hostelAtmosphere?: string;
  // Filtros específicos para apartments
  stayDuration?: string;
  apartmentSize?: string[];
  includedServices?: string[];
}

// Props del componente principal
export interface LodgingResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  LodgingData?: RowData[];
  LodgingType?: LodgingType;
  onCompareChange?: (compareList: any[]) => void;
  maxItemsInCompare?: number;
}

// Configuración de rango de precios por tipo
export interface PriceRangeConfig {
  min: number;
  max: number;
  step: number;
}

// Calificación de huéspedes
export interface GuestRatingOption {
  value: string;
  label: string;
  count: number;
}

// Configuración de comparación
export interface CompareConfig {
  titleOff: string;
  subtitleOff: string;
  titleOn: string;
  subtitleOn: string;
}
