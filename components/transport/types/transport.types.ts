export interface TransportTrip {
  id: string;
  title?: string;

  // Operador
  operator: {
    id: string;
    name: string;
    logoUrl?: string;
    rating?: number;
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
    };
  };

  // Relación opcional con rutas
  routeId?: string;

  // Origen / destino usan TransportStop
  origin: {
    stop: TransportStop;
    dateTime: string; // ISO
  };

  destination: {
    stop: TransportStop;
    dateTime: string; // ISO
  };

  // Paradas intermedias completas
  stops?: {
    stop: TransportStop;
    arrivalTime?: string;
    departureTime?: string;
  }[];

  // Duración
  durationMinutes?: number;
  durationNights?: number; // Para cruceros
  distanceKm?: number;
  isDirect?: boolean;
  isRoundTrip?: boolean;

  // Precios / Cabinas
  prices: {
    class?: 
      | 'Económica'
      | 'Premium'
      | 'VIP'
      | 'Interior'
      | 'Exterior'
      | 'Balcón'
      | 'Suite';

    price: number;
    currency: 'USD' | 'EUR' | 'DOP' | 'COP';
    refundable: boolean;
    includesMeal?: boolean;
    seatSelectionIncluded?: boolean;
    inclusions?: string[];
    perks?: string[];
  }[];

  // Nuevo campo auto-generado para filtros de clase
  classesAvailable?: string[];

  // Amenities comunes
  amenities: {
    wifi?: boolean;
    usb?: boolean;
    ac?: boolean;
    onboardToilet?: boolean;
    recliningSeats?: boolean;
    entertainment?: boolean;
    readingLight?: boolean;
    gpsTracking?: boolean;
    emergencyExit?: boolean;
    gps_tracking?: boolean;

    // Crucero
    pools?: number;
    restaurants?: number;
    gym?: boolean;
    casino?: boolean;
    kidsClub?: boolean;
    showsIncluded?: boolean;
    excursionsIncluded?: boolean;
  };

  // Políticas generales
  policies?: {
    baggage?: {
      includedKg?: number;
      carryOnKg?: number;
      extraKgPrice?: number;
    };
    cancellation?: string;
    changes?: string;
    minors?: string;
    pets?: string;
    healthAndVaccines?: string;
    luggage?: string;
  };

  // Disponibilidad
  availability: {
    seatsAvailable: number;
    totalCapacity: number;

    // Solo crucero
    remainingCabins?: number;
    capacityCabins?: number;
  };

  // Seat map (vuelos + buses)
  seatMap?: {
    id: string;
    row: number;
    column: string;
    status: 'available' | 'occupied' | 'selected' | 'disabled';
    class?: 'economy' | 'premium' | 'business' | 'first';
    price?: number;
    features?: string[];
  }[];

  // Programación recurrente
  recurring?: {
    frequency: string;
    nextDates: string[];
  };

  // Información de crucero opcional
  ship?: {
    name: string;
    model?: string;
    yearBuilt?: number;
    capacity?: number;
    decks?: number;
    shipImageUrl?: string;
  };

  // Imágenes
  images?: string[];

  // Ratings detallados
  ratings?: {
    overall?: number;
    comfort?: number;
    punctuality?: number;
    service?: number;
    cleanliness?: number;
    totalReviews?: number;
  };

  updatedAt: string;
}


export interface TransportStop {
  stopId: string;         // ID único global
  stopCode: string;       // Código estilo aeropuerto (DOM-NOR, SDQ-TER, BCN-NOR)
  stopName: string;       // Nombre del terminal
  city: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  isMajorHub?: boolean;
}

export interface TransportRoute {
  routeId: string;
  operatorId: string;

  stops: {
    stop: TransportStop;
    arrivalTime?: string;      // usado para buses y cruceros
    departureTime?: string;
  }[];

  totalDistanceKm?: number;
  typicalDurationMinutes?: number;
}





