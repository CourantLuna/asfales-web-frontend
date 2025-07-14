// Interfaces y tipos para vuelos
export interface FlightData {
  id: string;
  airline: string;
  flightNumber?: string;
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
  // Clase de viaje
  travelClass: 'economy' | 'premium-economy' | 'business' | 'first';
  travelClassDetails: {
    name: string;
    description: string;
    seatType?: string;
    amenities?: string[];
  };
  // Equipaje
  baggage: {
    personalItem: {
      included: boolean;
      dimensions: string;
      weight?: string;
    };
    carryOn: {
      included: boolean;
      dimensions: string;
      weight: string;
      price?: number;
    };
    checkedBag: {
      included: boolean;
      dimensions?: string;
      weight: string;
      price?: number;
      count?: number;
    };
  };
  // Flexibilidad
  flexibility: {
    refundable: boolean;
    refundPolicy?: string;
    changeable: boolean;
    changePolicy?: string;
    changeFee?: number;
  };
  // Servicios adicionales
  services?: {
    wifi: boolean;
    meals: boolean;
    entertainment: boolean;
    powerOutlets: boolean;
  };
}

export interface FlightResultSet {
  stepId: string;
  title: string;
  subtitle: string;
  flights: FlightData[];
}

export interface SelectedFlight {
  stepId: string;
  flight: FlightData;
}

// Configuración de valores por defecto para filtros
export interface FilterDefaults {
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

export interface FlightResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  flightData?: any[]; // RowData[]
  flightType?: 'roundtrip' | 'oneway' | 'multicity';
  destinations?: string[];
  showResults?: boolean; // Prop para controlar visibilidad de resultados
}
