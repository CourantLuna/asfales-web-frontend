// Tipos e interfaces para componentes de itinerarios

import { RowData } from '@/components/shared/RenderFields';
import { ItineraryPackage } from '@/lib/data/mock-datavf';

// Tipos extendidos para RowData de itinerarios
export interface ItineraryRowData extends RowData {
  id: string;
  title: string;
  descMain: string;
  descSecondary?: string;
  price: string;
  originalData: ItineraryPackage;
}

// Props del componente principal
export interface ItinerariesResultsTemplateProps {
  origin?: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: RowData) => void;
}

// Tipos para configuración de paginación
export interface ItineraryPaginationConfig {
  initialVisibleResults: number;
  resultsPerStep: number;
}

// Tipos para opciones con iconos (reutilizable)
export interface ItineraryOptionWithIcon {
  value: string;
  label: string;
  icon: string; // Nombre del icono como string
  count: number;
  disabled?: boolean;
}

// Configuración de valores por defecto para filtros
export interface ItineraryFilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  destinations?: string[];
  duration?: string[];
  experienceTypes?: string[];
  budget?: string;
  transport?: string[];
}

// Tipos para datos de búsqueda
export interface ItinerarySearchData {
  origin: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  totalItineraries: number;
}
