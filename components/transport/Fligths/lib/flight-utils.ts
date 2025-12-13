import {FlightResultSet } from './flight-types';
import { TransportStop, TransportTrip } from '../../types/transport.types';
import { fetchFlightsFromSheet } from './FlightsMockData';

// --- Funciones Auxiliares para Formato ---

const formatTime = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: true });
};

const formatDuration = (minutes?: number): string => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h ${m} min`;
};

const getStopDescription = (flight: TransportTrip): string => {
  if (flight.isDirect) return 'Vuelo sin escalas';
  const stopCount = flight.stops?.length || 0;
  return `${stopCount} escala${stopCount > 1 ? 's' : ''}`;
};
// --- Interfaces para los Filtros ---
export interface MultiCitySegment {
  from: string;
  to: string;
  date: string;
}

export interface FlightSearchFilters {
  from?: string | null;
  to?: string | null;
  departureDate?: string | null;
  returnDate?: string | null;
  adults?: string | null;
  flights?: string | null; // El JSON string para multicity
  type?: string | null; // 'oneway', 'roundtrip', 'multicity

}


export const getFlightResultSets = async (
  flightType: 'roundtrip' | 'oneway' | 'multicity',
  filters: FlightSearchFilters
): Promise<FlightResultSet[]> => {
  console.log("🔍 Generando FlightResultSets con filtros:", filters);
  // 1. Obtener TODOS los vuelos del Sheet (Mock Data)
  const allFlights = await fetchFlightsFromSheet();

  /**
   * HELPER MEJORADO: Filtra por Ruta Y Fecha
   * @param originCode Código IATA origen (ej: SDQ)
   * @param destCode Código IATA destino (ej: MIA)
   * @param queryDate Fecha en formato string "YYYY-MM-DD" (opcional)
   */
  const filterByRouteAndDate = (originCode: string, destCode: string, queryDate?: string | null) => {
    return allFlights.filter(f => {
      // 1. Validar Ruta
      const routeMatch = f.origin.stop.cityCode === originCode && 
                         f.destination.stop.cityCode === destCode;
      
      if (!routeMatch) return false;

      // 2. Validar Fecha (Si el usuario seleccionó una fecha)
      if (queryDate) {
        // Extraemos la parte de la fecha (YYYY-MM-DD) del ISO string del vuelo
        // f.origin.dateTime suele ser "2025-05-20T19:07:00" -> split('T')[0] -> "2025-05-20"
        const flightDateOnly = f.origin.dateTime.split('T')[0];
        
        return flightDateOnly === queryDate;
      }

      // Si no hay fecha en el filtro, devolvemos true solo con la ruta (opcional)
      return true;
    });
  };

  switch (flightType) {
    case 'oneway':
      const oneWayOrigin = filters.from || 'SDQ';
      const oneWayDest = filters.to || 'MIA';
      // Pasamos la fecha de salida del filtro
      const oneWayDate = filters.departureDate; 
      
      return [
        {
          stepId: 'choose-departure',
          title: 'Elige tu vuelo de salida',
          subtitle: `${oneWayOrigin} → ${oneWayDest} • ${oneWayDate || 'Cualquier fecha'}`,
          flights: filterByRouteAndDate(oneWayOrigin, oneWayDest, oneWayDate)
        }
      ];

    case 'roundtrip':
      const roundOrigin = filters.from || 'SDQ';
      const roundDest = filters.to || 'MIA';
      const depDate = filters.departureDate;
      const retDate = filters.returnDate;

      return [
        {
          stepId: 'choose-departure',
          title: 'Elige tu vuelo de ida',
          subtitle: `${roundOrigin} → ${roundDest} • ${depDate || ''}`,
          // Filtramos IDA usando departureDate
          flights: filterByRouteAndDate(roundOrigin, roundDest, depDate)
        },
        {
          stepId: 'choose-return',
          title: 'Elige tu vuelo de regreso',
          subtitle: `${roundDest} → ${roundOrigin} • ${retDate || ''}`,
          // Filtramos VUELTA invirtiendo ruta y usando returnDate
          flights: filterByRouteAndDate(roundDest, roundOrigin, retDate)
        }
      ];

    case 'multicity':
      let segments: MultiCitySegment[] = [];
      
      try {
        if (filters.flights) {
          segments = JSON.parse(filters.flights);
        }
      } catch (e) {
        console.error("Error parseando segmentos multicity:", e);
      }

      if (segments.length === 0) return [];

      return segments.map((segment, index) => {
        // En multicity, cada segmento tiene su propia fecha en el objeto JSON
        const flightsForSegment = filterByRouteAndDate(segment.from, segment.to, segment.date);
        
        return {
          stepId: `choose-flight-${index}`,
          title: `Vuelo ${index + 1}: ${segment.from} a ${segment.to}`,
          subtitle: `Fecha: ${segment.date}`,
          flights: flightsForSegment
        };
      });

    default:
      return [];
  }
};
// Función para convertir TransportTrip a RowData para la tabla genérica
export const mapFlightsToRowData = (flights: TransportTrip[]): any[] => {

  function translateStopsFilter(stopsLength: number): string {
  if (stopsLength === 0) {
    return "directo";
  } else if (stopsLength === 1) {
    return "1-parada";
  } else {
    return "2-paradas";
  }
}
  return flights.map((flight, index) => {
    // Tomamos el primer precio disponible como referencia base
    const basePrice = flight.prices?.[0];

    return {
      ...flights[index],
      
      subtitle: flight.title || flight.routeId, // Usamos el título del viaje o ID de ruta
      location: `${flight.origin.stop.stopCode} → ${flight.destination.stop.stopCode}`,
      
      // Formateo de fechas ISO a horas legibles
      feature1: formatTime(flight.origin.dateTime),
      feature2: formatTime(flight.destination.dateTime),
      
      descMain: `${flight.destination.stop.stopName}`,
      descSub: getStopDescription(flight),
      
      // Badges basados en tags de precios si existen, o lógica custom
      badge1: flight.classesAvailable?.[0] || '', 
      
      beforePrice: null,
      afterPrice: {
        value: basePrice?.price || 0,
        currency: basePrice?.currency || 'USD'
      },
      priceLabel: 'Por pasajero', // Texto estático o derivado
      
      images: [flight.operator.logoUrl || '/placeholder-logo.svg'],
      actions: ["Ver detalles", "Seleccionar vuelo"],
      isSponsored: false,
      counterStops: translateStopsFilter(flight.stops?.length || 0),

      savings: null // O calcular si tienes un precio original vs oferta
    };
  });
};




