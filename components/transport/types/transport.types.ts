export type TransportTrip = {
  id: string;
title?: string;

  // Operador común para todos
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

  // Origen y destino genéricos
  origin: {
    name: string; // ciudad, puerto o aeropuerto
    terminal?: string; // opcional
    countryCode?: string;
    dateTime: string; // ISO
  };

  destination: {
    name: string; // ciudad, puerto o aeropuerto
    terminal?: string;
    countryCode?: string;
    dateTime: string; // ISO
  };

  // Duración
  durationMinutes?: number; // bus/flight
  durationNights?: number;  // cruise
  distanceKm?: number;      // bus
  isDirect?: boolean;
  isRoundTrip?: boolean;

  // Stops opcionales
  stops?: {
    name: string;
    terminal?: string;
    arrivalTime?: string;
    departureTime?: string;
  }[];

  // Precios/cabins
  prices: {
    class?: 'Económica' | 'Premium' | 'VIP' | 'Interior' | 'Exterior' | 'Balcón' | 'Suite';
    price: number;
    currency: 'USD' | 'EUR' | 'DOP' | 'COP';
    refundable: boolean;
    includesMeal?: boolean;
    seatSelectionIncluded?: boolean;
    inclusions?: string[];
    perks?: string[];
  }[];

  // Amenities comunes
  amenities: {
    wifi?: boolean;
    usbPorts?: boolean;
    ac?: boolean;
    onboardToilet?: boolean;
    recliningSeats?: boolean;
    entertainment?: boolean;
    readingLight?: boolean;
    gpsTracking?: boolean;
    emergencyExit?: boolean;
    pools?: number;
    restaurants?: number;
    gym?: boolean;
    casino?: boolean;
    kidsClub?: boolean;
    showsIncluded?: boolean;
    excursionsIncluded?: boolean;
    reading_light?: boolean,
    gps_tracking?: boolean,
    emergency_exit?: boolean,
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
    remainingCabins?: number;
    capacityCabins?: number;
  };

  // Recurring
  recurring?: {
    frequency: string;
    nextDates: string[];
  };

  // Ship info opcional (solo cruise)
  ship?: {
    name: string;
    model?: string;
    yearBuilt?: number;
    capacity?: number;
    decks?: number;
    shipImageUrl?: string;
  };

  // Images / media
  images?: string[];

  // Ratings opcionales
  ratings?: {
    overall?: number;
    comfort?: number;
    punctuality?: number;
    service?: number;
    cleanliness?: number;
    totalReviews?: number;
  };

  updatedAt: string;
};
