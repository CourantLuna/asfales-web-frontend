'use client';

import { CruiseTrip } from '@/components/transport/Cruises/CustomCruiseCard';

// Mock data de cruceros del Caribe y Mediterráneo
export const mockCruises: CruiseTrip[] = [
  {
    id: 'cruise-001',
    cruiseLine: {
      id: 'royal-caribbean',
      name: 'Royal Caribbean',
      logoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop',
      rating: 4.5,
      contact: {
        phone: '+1-800-ROYAL-CARIBBEAN',
        email: 'reservas@royalcaribbean.com',
        website: 'https://www.royalcaribbean.com'
      }
    },
    ship: {
      name: 'Harmony of the Seas',
      model: 'Oasis Class',
      yearBuilt: 2016,
      capacity: 6780,
      decks: 18,
      shipImageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop'
    },
    itinerary: {
      startPort: 'Miami, Florida',
      endPort: 'Miami, Florida',
      departureDate: '2024-08-15T17:00:00Z',
      returnDate: '2024-08-22T08:00:00Z',
      durationNights: 7,
      stops: [
        { port: 'Cozumel', country: 'México', arrivalDateTime: '2024-08-17T08:00:00Z', departureDateTime: '2024-08-17T17:00:00Z' },
        { port: 'Roatán', country: 'Honduras', arrivalDateTime: '2024-08-18T08:00:00Z', departureDateTime: '2024-08-18T17:00:00Z' },
        { port: 'Costa Maya', country: 'México', arrivalDateTime: '2024-08-19T08:00:00Z', departureDateTime: '2024-08-19T16:00:00Z' },
        { port: 'Perfect Day at CocoCay', country: 'Bahamas', arrivalDateTime: '2024-08-20T08:00:00Z', departureDateTime: '2024-08-20T17:00:00Z' }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 899,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Acceso a piscinas'],
        perks: ['WiFi básico gratis']
      },
      {
        type: 'Exterior',
        price: 1199,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Acceso a piscinas', 'Vista al mar'],
        perks: ['WiFi básico gratis', 'Servicio de habitaciones']
      },
      {
        type: 'Balcón',
        price: 1599,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Acceso a piscinas', 'Balcón privado'],
        perks: ['WiFi premium', 'Servicio de habitaciones', 'Prioridad en restaurantes']
      },
      {
        type: 'Suite',
        price: 2899,
        currency: 'USD',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Comidas principales', 'Restaurantes especializados', 'Butler personal', 'Balcón grande'],
        perks: ['WiFi premium', 'Concierge', 'Prioridad en todos los servicios', 'Área VIP']
      }
    ],
    amenities: {
      pools: 4,
      restaurants: 20,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 50
      },
      cancellation: 'Cancelación gratuita hasta 48 horas antes. Después se aplican tarifas.',
      healthAndVaccines: 'Pasaporte vigente requerido. Vacunas según destino.'
    },
    availability: {
      remainingCabins: 89,
      capacityCabins: 2000
    },
    recurring: {
      frequency: 'Semanal',
      nextSailings: ['2024-08-22', '2024-08-29', '2024-09-05']
    },
    isRoundTrip: true,
    updatedAt: '2024-07-15T10:30:00Z'
  },
  {
    id: 'cruise-002',
    cruiseLine: {
      id: 'norwegian',
      name: 'Norwegian Cruise Line',
      logoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop',
      rating: 4.3,
      contact: {
        phone: '+1-866-NCL-CRUISE',
        email: 'info@ncl.com',
        website: 'https://www.ncl.com'
      }
    },
    ship: {
      name: 'Norwegian Epic',
      model: 'Epic Class',
      yearBuilt: 2010,
      capacity: 4100,
      decks: 19,
      shipImageUrl: 'https://images.unsplash.com/photo-1571770095004-6b61b8a9fdc8?w=800&h=600&fit=crop'
    },
    itinerary: {
      startPort: 'Barcelona, España',
      endPort: 'Roma, Italia',
      departureDate: '2024-09-10T18:00:00Z',
      returnDate: '2024-09-20T08:00:00Z',
      durationNights: 10,
      stops: [
        { port: 'Palma de Mallorca', country: 'España', arrivalDateTime: '2024-09-11T08:00:00Z', departureDateTime: '2024-09-11T18:00:00Z' },
        { port: 'Marsella', country: 'Francia', arrivalDateTime: '2024-09-12T08:00:00Z', departureDateTime: '2024-09-12T17:00:00Z' },
        { port: 'Génova', country: 'Italia', arrivalDateTime: '2024-09-13T08:00:00Z', departureDateTime: '2024-09-13T18:00:00Z' },
        { port: 'Nápoles', country: 'Italia', arrivalDateTime: '2024-09-14T08:00:00Z', departureDateTime: '2024-09-14T19:00:00Z' },
        { port: 'Santorini', country: 'Grecia', arrivalDateTime: '2024-09-16T08:00:00Z', departureDateTime: '2024-09-16T18:00:00Z' },
        { port: 'Mykonos', country: 'Grecia', arrivalDateTime: '2024-09-17T08:00:00Z', departureDateTime: '2024-09-17T17:00:00Z' }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 1599,
        currency: 'EUR',
        maxGuests: 3,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento nocturno', 'Acceso a instalaciones'],
        perks: ['Descuento en spa']
      },
      {
        type: 'Exterior',
        price: 1999,
        currency: 'EUR',
        maxGuests: 3,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento nocturno', 'Vista al mar', 'Servicio de camarote'],
        perks: ['Descuento en spa', 'Prioridad en excursiones']
      },
      {
        type: 'Balcón',
        price: 2599,
        currency: 'EUR',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Restaurante especializado', 'Balcón privado', 'Servicio premium'],
        perks: ['WiFi gratuito', 'Descuento en bebidas', 'Check-in prioritario']
      },
      {
        type: 'Suite',
        price: 4299,
        currency: 'EUR',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Todas las comidas', 'Bebidas premium', 'Concierge personal', 'Área VIP'],
        perks: ['Todo incluido', 'Excursiones gratuitas', 'Spa incluido', 'Mayordomo personal']
      }
    ],
    amenities: {
      pools: 3,
      restaurants: 15,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 40
      },
      cancellation: 'Cancelación con reembolso del 75% hasta 30 días antes. Sin reembolso después.',
      healthAndVaccines: 'Pasaporte UE válido. Seguro médico recomendado.'
    },
    availability: {
      remainingCabins: 23,
      capacityCabins: 1500
    },
    isRoundTrip: false,
    updatedAt: '2024-07-14T15:45:00Z'
  },
  {
    id: 'cruise-003',
    cruiseLine: {
      id: 'celebrity',
      name: 'Celebrity Cruises',
      logoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop',
      rating: 4.7,
      contact: {
        phone: '+1-888-CELEBRITY',
        email: 'luxury@celebrity.com',
        website: 'https://www.celebritycruises.com'
      }
    },
    ship: {
      name: 'Celebrity Edge',
      model: 'Edge Class',
      yearBuilt: 2018,
      capacity: 2918,
      decks: 16,
      shipImageUrl: 'https://images.unsplash.com/photo-1566024287286-457247b70310?w=800&h=600&fit=crop'
    },
    itinerary: {
      startPort: 'Fort Lauderdale, Florida',
      endPort: 'Fort Lauderdale, Florida',
      departureDate: '2024-12-14T16:00:00Z',
      returnDate: '2024-12-28T08:00:00Z',
      durationNights: 14,
      stops: [
        { port: 'St. Thomas', country: 'Islas Vírgenes', arrivalDateTime: '2024-12-16T08:00:00Z', departureDateTime: '2024-12-16T17:00:00Z' },
        { port: 'Bridgetown', country: 'Barbados', arrivalDateTime: '2024-12-18T08:00:00Z', departureDateTime: '2024-12-18T18:00:00Z' },
        { port: 'Willemstad', country: 'Curazao', arrivalDateTime: '2024-12-20T08:00:00Z', departureDateTime: '2024-12-20T17:00:00Z' },
        { port: 'Cartagena', country: 'Colombia', arrivalDateTime: '2024-12-22T08:00:00Z', departureDateTime: '2024-12-22T17:00:00Z' },
        { port: 'Puerto Limón', country: 'Costa Rica', arrivalDateTime: '2024-12-24T08:00:00Z', departureDateTime: '2024-12-24T17:00:00Z' },
        { port: 'Ocho Ríos', country: 'Jamaica', arrivalDateTime: '2024-12-26T08:00:00Z', departureDateTime: '2024-12-26T17:00:00Z' }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 2299,
        currency: 'USD',
        maxGuests: 2,
        refundable: false,
        inclusions: ['Comidas gourmet', 'Entretenimiento premium', 'Acceso a todas las instalaciones'],
        perks: ['WiFi surf', 'Crédito a bordo $50']
      },
      {
        type: 'Exterior',
        price: 2899,
        currency: 'USD',
        maxGuests: 3,
        refundable: true,
        inclusions: ['Comidas gourmet', 'Vista panorámica', 'Servicio de camarote premium'],
        perks: ['WiFi surf', 'Crédito a bordo $100', 'Descuento en spa 15%']
      },
      {
        type: 'Balcón',
        price: 3699,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas gourmet', 'Balcón infinito', 'Servicio de mayordomo', 'Minibar premium'],
        perks: ['WiFi premium', 'Crédito a bordo $200', 'Excursión incluida', 'Spa 25% descuento']
      },
      {
        type: 'Suite',
        price: 6999,
        currency: 'USD',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Todo incluido premium', 'Suite con terraza', 'Mayordomo 24/7', 'Restaurantes exclusivos'],
        perks: ['Todo incluido', 'Excursiones ilimitadas', 'Spa gratuito', 'Concierge personal', 'Lavandería gratuita']
      }
    ],
    amenities: {
      pools: 2,
      restaurants: 12,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: true
    },
    policies: {
      baggage: {
        includedKgPerPerson: 60
      },
      cancellation: 'Reembolso completo hasta 75 días antes. Política flexible por emergencias.',
      healthAndVaccines: 'Pasaporte vigente obligatorio. Test COVID según regulaciones del momento.'
    },
    availability: {
      remainingCabins: 156,
      capacityCabins: 1200
    },
    isRoundTrip: true,
    updatedAt: '2024-07-15T09:20:00Z'
  },
  {
    id: 'cruise-004',
    cruiseLine: {
      id: 'msc',
      name: 'MSC Cruises',
      logoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop',
      rating: 4.2,
      contact: {
        phone: '+39-081-496-444',
        email: 'info@msccruises.com',
        website: 'https://www.msccruises.com'
      }
    },
    ship: {
      name: 'MSC Seaside',
      model: 'Seaside Class',
      yearBuilt: 2017,
      capacity: 4140,
      decks: 20,
      shipImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    },
    itinerary: {
      startPort: 'Puerto Cañaveral, Florida',
      endPort: 'Puerto Cañaveral, Florida',
      departureDate: '2024-10-05T17:00:00Z',
      returnDate: '2024-10-12T08:00:00Z',
      durationNights: 7,
      stops: [
        { port: 'Nassau', country: 'Bahamas', arrivalDateTime: '2024-10-06T08:00:00Z', departureDateTime: '2024-10-06T17:00:00Z' },
        { port: 'Ocean Cay MSC Marine Reserve', country: 'Bahamas', arrivalDateTime: '2024-10-07T08:00:00Z', departureDateTime: '2024-10-07T18:00:00Z' },
        { port: 'San Juan', country: 'Puerto Rico', arrivalDateTime: '2024-10-08T08:00:00Z', departureDateTime: '2024-10-08T18:00:00Z' },
        { port: 'St. Maarten', country: 'Sint Maarten', arrivalDateTime: '2024-10-09T08:00:00Z', departureDateTime: '2024-10-09T17:00:00Z' },
        { port: 'Puerto Plata', country: 'República Dominicana', arrivalDateTime: '2024-10-10T08:00:00Z', departureDateTime: '2024-10-10T17:00:00Z' }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 649,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas buffet', 'Entretenimiento básico', 'Acceso a piscinas'],
        perks: ['Descuento en bebidas']
      },
      {
        type: 'Exterior',
        price: 899,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas buffet', 'Vista al mar', 'Entretenimiento'],
        perks: ['Descuento en bebidas', 'WiFi básico']
      },
      {
        type: 'Balcón',
        price: 1199,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas premium', 'Balcón privado', 'Servicio de camarote'],
        perks: ['WiFi incluido', 'Prioridad en restaurantes', 'Late checkout']
      },
      {
        type: 'Suite',
        price: 2199,
        currency: 'USD',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Comidas premium', 'Suite amplia', 'Área VIP', 'Mayordomo'],
        perks: ['Todo incluido bebidas', 'Excursiones con descuento', 'Spa access', 'Priority everything']
      }
    ],
    amenities: {
      pools: 3,
      restaurants: 11,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 45
      },
      cancellation: 'Cancelación hasta 24 horas antes sin penalización. Reembolso según tarifa.',
      healthAndVaccines: 'Documentos de identidad válidos. Protocolos sanitarios vigentes.'
    },
    availability: {
      remainingCabins: 12,
      capacityCabins: 1800
    },
    recurring: {
      frequency: 'Quincenal',
      nextSailings: ['2024-10-19', '2024-11-02', '2024-11-16']
    },
    isRoundTrip: true,
    updatedAt: '2024-07-15T12:15:00Z'
  },
  {
    id: 'cruise-005',
    cruiseLine: {
      id: 'princess',
      name: 'Princess Cruises',
      logoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h-100&fit=crop',
      rating: 4.6,
      contact: {
        phone: '+1-800-PRINCESS',
        email: 'reservations@princess.com',
        website: 'https://www.princess.com'
      }
    },
    ship: {
      name: 'Sky Princess',
      model: 'Royal Class',
      yearBuilt: 2019,
      capacity: 3660,
      decks: 19,
      shipImageUrl: 'https://images.unsplash.com/photo-1578761499019-d4b91a0b4810?w=800&h=600&fit=crop'
    },
    itinerary: {
      startPort: 'Southampton, Reino Unido',
      endPort: 'Southampton, Reino Unido',
      departureDate: '2024-08-25T17:00:00Z',
      returnDate: '2024-09-08T08:00:00Z',
      durationNights: 14,
      stops: [
        { port: 'Bergen', country: 'Noruega', arrivalDateTime: '2024-08-27T08:00:00Z', departureDateTime: '2024-08-27T17:00:00Z' },
        { port: 'Geiranger', country: 'Noruega', arrivalDateTime: '2024-08-28T08:00:00Z', departureDateTime: '2024-08-28T17:00:00Z' },
        { port: 'Trondheim', country: 'Noruega', arrivalDateTime: '2024-08-29T08:00:00Z', departureDateTime: '2024-08-29T17:00:00Z' },
        { port: 'Honningsvag', country: 'Noruega', arrivalDateTime: '2024-08-31T08:00:00Z', departureDateTime: '2024-08-31T17:00:00Z' },
        { port: 'Tromsø', country: 'Noruega', arrivalDateTime: '2024-09-01T08:00:00Z', departureDateTime: '2024-09-01T17:00:00Z' },
        { port: 'Stavanger', country: 'Noruega', arrivalDateTime: '2024-09-04T08:00:00Z', departureDateTime: '2024-09-04T17:00:00Z' }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 1899,
        currency: 'EUR',
        maxGuests: 3,
        refundable: false,
        inclusions: ['Comidas tradicionales', 'Entretenimiento británico', 'Acceso completo al barco'],
        perks: ['Té de la tarde incluido']
      },
      {
        type: 'Exterior',
        price: 2399,
        currency: 'EUR',
        maxGuests: 3,
        refundable: true,
        inclusions: ['Comidas tradicionales', 'Vista panorámica', 'Servicio de camarote'],
        perks: ['Té de la tarde incluido', 'WiFi básico', 'Fotografías profesionales incluidas']
      },
      {
        type: 'Balcón',
        price: 2999,
        currency: 'EUR',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas gourmet', 'Balcón con vista a fiordos', 'Servicio personalizado'],
        perks: ['WiFi premium', 'Excursión de Aurora Boreal incluida', 'Champagne de bienvenida']
      },
      {
        type: 'Suite',
        price: 5499,
        currency: 'EUR',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Todo incluido premium', 'Suite con vista panorámica', 'Mayordomo personal'],
        perks: ['Todas las excursiones incluidas', 'Servicio de lavandería', 'Acceso VIP', 'Transfer aeropuerto']
      }
    ],
    amenities: {
      pools: 2,
      restaurants: 14,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 55
      },
      cancellation: 'Reembolso del 90% hasta 60 días antes. Política de emergencia flexible.',
      healthAndVaccines: 'Pasaporte UE/UK válido. Ropa de abrigo recomendada para fiordos.'
    },
    availability: {
      remainingCabins: 78,
      capacityCabins: 1500
    },
    isRoundTrip: true,
    updatedAt: '2024-07-15T11:30:00Z'
  }
];

// Función para filtrar cruceros por línea de cruceros
export const filterCruisesByCruiseLine = (cruises: CruiseTrip[], cruiseLineId: string) => {
  return cruises.filter(cruise => cruise.cruiseLine.id === cruiseLineId);
};

// Función para filtrar cruceros por duración
export const filterCruisesByDuration = (cruises: CruiseTrip[], minNights: number, maxNights: number) => {
  return cruises.filter(cruise => 
    cruise.itinerary.durationNights >= minNights && 
    cruise.itinerary.durationNights <= maxNights
  );
};

// Función para filtrar cruceros por precio máximo
export const filterCruisesByMaxPrice = (cruises: CruiseTrip[], maxPrice: number, currency: string = 'USD') => {
  return cruises.filter(cruise => {
    const cheapestCabin = cruise.cabinOptions.reduce((cheapest, cabin) => 
      cabin.price < cheapest.price && cabin.currency === currency ? cabin : cheapest
    );
    return cheapestCabin.price <= maxPrice;
  });
};

// Función para ordenar cruceros por precio
export const sortCruisesByPrice = (cruises: CruiseTrip[], ascending = true) => {
  return cruises.sort((a, b) => {
    const priceA = Math.min(...a.cabinOptions.map(cabin => cabin.price));
    const priceB = Math.min(...b.cabinOptions.map(cabin => cabin.price));
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

// Función para ordenar cruceros por rating de línea
export const sortCruisesByRating = (cruises: CruiseTrip[]) => {
  return cruises.sort((a, b) => {
    const ratingA = a.cruiseLine.rating || 0;
    const ratingB = b.cruiseLine.rating || 0;
    return ratingB - ratingA;
  });
};

// Función para obtener cruceros disponibles
export const getAvailableCruises = (cruises: CruiseTrip[]) => {
  return cruises.filter(cruise => cruise.availability.remainingCabins > 0);
};

// Función para obtener cruceros de ida y vuelta
export const getRoundTripCruises = (cruises: CruiseTrip[]) => {
  return cruises.filter(cruise => cruise.isRoundTrip);
};
