'use client';

import { BusTrip } from '@/components/transport/Buses/CustomBusCard';

// Mock data de viajes en bus
export const mockBusTrips: BusTrip[] = [
  {
    id: 'bus-001',
    routeCode: 'SDQ-STI',
    operator: {
      id: 'caribe-tours',
      name: 'Caribe Tours',
      logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=50&h=50&fit=crop',
      rating: 4.5,
      contact: {
        phone: '+1-809-221-4422',
        email: 'reservas@caribetours.com.do',
        website: 'www.caribetours.com.do'
      }
    },
    origin: {
      city: 'Santo Domingo',
      terminal: 'Terminal Caribe Tours - Av. 27 de Febrero',
      countryCode: 'DO',
      departureDateTime: '2024-08-16T08:00:00Z'
    },
    destination: {
      city: 'Santiago',
      terminal: 'Terminal Santiago - Av. Juan Pablo Duarte',
      countryCode: 'DO',
      arrivalDateTime: '2024-08-16T10:30:00Z'
    },
    durationMinutes: 150,
    distanceKm: 155,
    stops: [
      {
        city: 'Bonao',
        terminal: 'Parada Bonao Centro',
        arrivalTime: '2024-08-16T09:15:00Z',
        departureTime: '2024-08-16T09:25:00Z'
      }
    ],
    prices: [
      {
        class: 'Económica',
        price: 280,
        currency: 'DOP',
        refundable: false,
        includesMeal: false,
        seatSelectionIncluded: false
      },
      {
        class: 'Premium',
        price: 350,
        currency: 'DOP',
        refundable: true,
        includesMeal: true,
        seatSelectionIncluded: true
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: true,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: {
        includedKg: 25,
        carryOnKg: 8,
        extraKgPrice: 15
      },
      cancellation: 'Cancelación gratuita hasta 2 horas antes de la salida',
      changes: 'Cambios permitidos hasta 4 horas antes con cargo de RD$50',
      minors: 'Menores de 12 años deben viajar acompañados de un adulto',
      pets: 'No se permiten mascotas a bordo excepto animales de servicio'
    },
    availability: {
      seatsAvailable: 12,
      totalCapacity: 45
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    ratings: {
      overall: 4.5,
      comfort: 4.3,
      punctuality: 4.7,
      service: 4.4,
      cleanliness: 4.6,
      totalReviews: 1247
    },
    isDirect: false,
    recurring: {
      frequency: 'Cada 2 horas',
      nextDates: ['2024-08-16T10:00:00Z', '2024-08-16T12:00:00Z', '2024-08-16T14:00:00Z']
    },
    updatedAt: '2024-07-15T10:30:00Z'
  },
  {
    id: 'bus-002',
    routeCode: 'BOG-MED',
    operator: {
      id: 'flota-magdalena',
      name: 'Flota Magdalena',
      logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=50&h=50&fit=crop',
      rating: 4.7,
      contact: {
        phone: '+57-1-423-3600',
        email: 'info@flotamagdalena.com',
        website: 'www.flotamagdalena.com'
      }
    },
    origin: {
      city: 'Bogotá',
      terminal: 'Terminal de Transporte - Módulo 1',
      countryCode: 'CO',
      departureDateTime: '2024-08-20T14:00:00Z'
    },
    destination: {
      city: 'Medellín',
      terminal: 'Terminal del Norte',
      countryCode: 'CO',
      arrivalDateTime: '2024-08-20T22:30:00Z'
    },
    durationMinutes: 510,
    distanceKm: 415,
    stops: [
      {
        city: 'La Dorada',
        terminal: 'Terminal La Dorada',
        arrivalTime: '2024-08-20T17:45:00Z',
        departureTime: '2024-08-20T18:00:00Z'
      },
      {
        city: 'Puerto Triunfo',
        terminal: 'Estación de Servicio Terpel',
        arrivalTime: '2024-08-20T19:30:00Z',
        departureTime: '2024-08-20T19:45:00Z'
      }
    ],
    prices: [
      {
        class: 'Económica',
        price: 45000,
        currency: 'COP',
        refundable: false,
        includesMeal: false,
        seatSelectionIncluded: false
      },
      {
        class: 'Premium',
        price: 65000,
        currency: 'COP',
        refundable: true,
        includesMeal: true,
        seatSelectionIncluded: true
      },
      {
        class: 'VIP',
        price: 85000,
        currency: 'COP',
        refundable: true,
        includesMeal: true,
        seatSelectionIncluded: true
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: true,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: {
        includedKg: 20,
        carryOnKg: 10,
        extraKgPrice: 3000
      },
      cancellation: 'Cancelación con penalización del 20% hasta 6 horas antes',
      changes: 'Cambios permitidos hasta 2 horas antes con cargo de $8.000',
      minors: 'Menores de edad requieren autorización notariada para viajar solos',
      pets: 'Mascotas pequeñas permitidas en transportador (máx. 8kg)'
    },
    availability: {
      seatsAvailable: 3,
      totalCapacity: 42
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=300&fit=crop'
    ],
    ratings: {
      overall: 4.7,
      comfort: 4.8,
      punctuality: 4.6,
      service: 4.7,
      cleanliness: 4.8,
      totalReviews: 2156
    },
    isDirect: false,
    recurring: {
      frequency: 'Cada 4 horas',
      nextDates: ['2024-08-20T18:00:00Z', '2024-08-20T22:00:00Z', '2024-08-21T02:00:00Z']
    },
    updatedAt: '2024-07-14T16:45:00Z'
  },
  {
    id: 'bus-003',
    routeCode: 'MAD-BCN',
    operator: {
      id: 'alsa',
      name: 'ALSA',
      logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=50&h=50&fit=crop',
      rating: 4.3,
      contact: {
        phone: '+34-902-42-22-42',
        email: 'info@alsa.es',
        website: 'www.alsa.es'
      }
    },
    origin: {
      city: 'Madrid',
      terminal: 'Estación Sur de Autobuses',
      countryCode: 'ES',
      departureDateTime: '2024-09-05T15:30:00Z'
    },
    destination: {
      city: 'Barcelona',
      terminal: 'Estació del Nord',
      countryCode: 'ES',
      arrivalDateTime: '2024-09-05T23:15:00Z'
    },
    durationMinutes: 465,
    distanceKm: 620,
    stops: [
      {
        city: 'Zaragoza',
        terminal: 'Estación de Autobuses de Zaragoza',
        arrivalTime: '2024-09-05T19:00:00Z',
        departureTime: '2024-09-05T19:15:00Z'
      },
      {
        city: 'Lleida',
        terminal: 'Estación de Autobuses',
        arrivalTime: '2024-09-05T21:30:00Z',
        departureTime: '2024-09-05T21:45:00Z'
      }
    ],
    prices: [
      {
        class: 'Económica',
        price: 35,
        currency: 'EUR',
        refundable: false,
        includesMeal: false,
        seatSelectionIncluded: false
      },
      {
        class: 'Premium',
        price: 55,
        currency: 'EUR',
        refundable: true,
        includesMeal: true,
        seatSelectionIncluded: true
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: false
    },
    policies: {
      baggage: {
        includedKg: 20,
        carryOnKg: 5,
        extraKgPrice: 10
      },
      cancellation: 'Cancelación gratuita hasta 15 minutos antes de la salida',
      changes: 'Cambios gratuitos hasta 15 minutos antes'
    },
    availability: {
      seatsAvailable: 28,
      totalCapacity: 55
    },
    isDirect: false,
    recurring: {
      frequency: 'Cada 3 horas',
      nextDates: ['2024-09-05T18:30:00Z', '2024-09-05T21:30:00Z', '2024-09-06T00:30:00Z']
    },
    updatedAt: '2024-07-13T11:20:00Z'
  },
  {
    id: 'bus-004',
    routeCode: 'NYC-WAS',
    operator: {
      id: 'megabus',
      name: 'Megabus',
      logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=50&h=50&fit=crop',
      rating: 4.1,
      contact: {
        phone: '+1-877-462-6342',
        email: 'customer.services@megabus.com',
        website: 'www.megabus.com'
      }
    },
    origin: {
      city: 'New York City',
      terminal: 'Port Authority Bus Terminal',
      countryCode: 'US',
      departureDateTime: '2024-08-25T09:00:00Z'
    },
    destination: {
      city: 'Washington DC',
      terminal: 'Union Station',
      countryCode: 'US',
      arrivalDateTime: '2024-08-25T13:30:00Z'
    },
    durationMinutes: 270,
    distanceKm: 365,
    stops: [
      {
        city: 'Philadelphia',
        terminal: '30th Street Station',
        arrivalTime: '2024-08-25T11:15:00Z',
        departureTime: '2024-08-25T11:30:00Z'
      },
      {
        city: 'Baltimore',
        terminal: 'White Marsh Park & Ride',
        arrivalTime: '2024-08-25T12:45:00Z',
        departureTime: '2024-08-25T13:00:00Z'
      }
    ],
    prices: [
      {
        class: 'Económica',
        price: 25,
        currency: 'USD',
        refundable: false,
        includesMeal: false,
        seatSelectionIncluded: false
      },
      {
        class: 'Premium',
        price: 45,
        currency: 'USD',
        refundable: true,
        includesMeal: false,
        seatSelectionIncluded: true
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: false,
      entertainment: false
    },
    policies: {
      baggage: {
        includedKg: 23,
        carryOnKg: 7,
        extraKgPrice: 20
      },
      cancellation: 'Cancelación con cargo según tarifa hasta 2 horas antes',
      changes: 'Cambios permitidos con cargo de $5'
    },
    availability: {
      seatsAvailable: 18,
      totalCapacity: 81
    },
    isDirect: false,
    updatedAt: '2024-07-12T08:15:00Z'
  },
  {
    id: 'bus-005',
    routeCode: 'MIA-ORL',
    operator: {
      id: 'greyhound',
      name: 'Greyhound Lines',
      logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=50&h=50&fit=crop',
      rating: 3.9,
      contact: {
        phone: '+1-800-231-2222',
        email: 'customer.relations@greyhound.com',
        website: 'www.greyhound.com'
      }
    },
    origin: {
      city: 'Miami',
      terminal: 'Miami Greyhound Station - NW 27th St',
      countryCode: 'US',
      departureDateTime: '2024-08-18T16:45:00Z'
    },
    destination: {
      city: 'Orlando',
      terminal: 'Orlando Greyhound Station - John Young Pkwy',
      countryCode: 'US',
      arrivalDateTime: '2024-08-18T21:15:00Z'
    },
    durationMinutes: 270,
    distanceKm: 380,
    stops: [],
    prices: [
      {
        class: 'Económica',
        price: 35,
        currency: 'USD',
        refundable: false,
        includesMeal: false,
        seatSelectionIncluded: false
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: false
    },
    policies: {
      baggage: {
        includedKg: 23,
        carryOnKg: 7,
        extraKgPrice: 20
      },
      cancellation: 'Cancelación con penalización según tipo de boleto',
      changes: 'Cambios sujetos a disponibilidad y cargo adicional'
    },
    availability: {
      seatsAvailable: 42,
      totalCapacity: 55
    },
    isDirect: true,
    recurring: {
      frequency: 'Cada 6 horas',
      nextDates: ['2024-08-18T22:45:00Z', '2024-08-19T04:45:00Z', '2024-08-19T10:45:00Z']
    },
    updatedAt: '2024-07-11T14:20:00Z'
  }
];

// Función para filtrar viajes por operador
export const filterTripsByOperator = (trips: BusTrip[], operatorId: string) => {
  return trips.filter(trip => trip.operator.id === operatorId);
};

// Función para filtrar viajes disponibles
export const getAvailableTrips = (trips: BusTrip[]) => {
  return trips.filter(trip => trip.availability.seatsAvailable > 0);
};

// Función para filtrar viajes directos
export const getDirectTrips = (trips: BusTrip[]) => {
  return trips.filter(trip => trip.isDirect);
};

// Función para ordenar viajes por precio
export const sortTripsByPrice = (trips: BusTrip[], ascending = true) => {
  return trips.sort((a, b) => {
    const priceA = Math.min(...a.prices.map(price => price.price));
    const priceB = Math.min(...b.prices.map(price => price.price));
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

// Función para ordenar por duración
export const sortTripsByDuration = (trips: BusTrip[], ascending = true) => {
  return trips.sort((a, b) => {
    return ascending 
      ? a.durationMinutes - b.durationMinutes 
      : b.durationMinutes - a.durationMinutes;
  });
};

// Función para obtener viajes por región/país
export const getTripsByCountry = (trips: BusTrip[], countryCode: string) => {
  return trips.filter(trip => 
    trip.origin.countryCode === countryCode || 
    trip.destination.countryCode === countryCode
  );
};

// Función para buscar viajes por ciudad
export const searchTripsByCity = (trips: BusTrip[], query: string) => {
  const searchQuery = query.toLowerCase();
  return trips.filter(trip => 
    trip.origin.city.toLowerCase().includes(searchQuery) ||
    trip.destination.city.toLowerCase().includes(searchQuery) ||
    trip.stops.some(stop => stop.city.toLowerCase().includes(searchQuery))
  );
};
