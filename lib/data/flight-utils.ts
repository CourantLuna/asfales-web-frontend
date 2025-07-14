import { FlightData, FlightResultSet } from './flight-types';
import { baseFlights, returnFlights, madridFlights } from './flight-mock-data';

// Función para generar los conjuntos de resultados de vuelos según el tipo
export const getFlightResultSets = (flightType: 'roundtrip' | 'oneway' | 'multicity'): FlightResultSet[] => {
  switch (flightType) {
    case 'oneway':
      return [
        {
          stepId: 'choose-departure',
          title: 'Elige tu vuelo de salida',
          subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
          flights: baseFlights
        }
      ];

    case 'roundtrip':
      return [
        {
          stepId: 'choose-departure',
          title: 'Elige tu vuelo a Medellín',
          subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
          flights: baseFlights
        },
        {
          stepId: 'choose-return',
          title: 'Elige tu vuelo de regreso',
          subtitle: 'Medellín (MDE) → Santo Domingo (SDQ)',
          flights: returnFlights
        }
      ];

    case 'multicity':
      return [
        {
          stepId: 'choose-flight-0',
          title: 'Elige tu vuelo a Medellín',
          subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
          flights: baseFlights
        },
        {
          stepId: 'choose-flight-1',
          title: 'Elige tu vuelo a Madrid',
          subtitle: 'Medellín (MDE) → Madrid (MAD)',
          flights: madridFlights
        }
      ];

    default:
      return [];
  }
};

// Función para convertir FlightData a RowData para la tabla
export const mapFlightsToRowData = (flights: FlightData[]): any[] => {
  return flights.map((flight, index) => ({
    id: `flight-${index}`,
    title: flight.airline,
    subtitle: flight.flightNumber,
    location: `${flight.departureAirport} → ${flight.arrivalAirport}`,
    feature1: flight.departureTime,
    feature2: flight.arrivalTime,
    descMain: flight.duration,
    descSub: flight.stops,
    badge1: flight.badge || '',
    beforePrice: null,
    afterPrice: {
      value: flight.price,
      currency: flight.currency
    },
    priceLabel: flight.priceLabel || 'Por pasajero',
    images: [flight.logo || '/placeholder-logo.svg'],
    actions: ["Ver detalles", "Seleccionar vuelo"],
    isSponsored: false,
    savings: flight.savings || null
  }));
};

export const convertToFlightCardData = (flight: FlightData): any => {
    return {
      id: flight.id,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      duration: flight.duration,
      stops: flight.stops,
      price: flight.price,
      currency: flight.currency,
      priceLabel: flight.priceLabel,
      logo: flight.logo,
      badge: flight.badge,
      savings: flight.savings
    };
  };
