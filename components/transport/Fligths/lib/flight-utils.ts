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
  return flights.map((flight, index) => {
    // Tomamos el primer precio disponible como referencia base
    const basePrice = flight.prices?.[0];

    return {
      id: flight.id,
      title: flight.operator.name,
      subtitle: flight.title || flight.routeId, // Usamos el título del viaje o ID de ruta
      location: `${flight.origin.stop.stopCode} → ${flight.destination.stop.stopCode}`,
      
      // Formateo de fechas ISO a horas legibles
      feature1: formatTime(flight.origin.dateTime),
      feature2: formatTime(flight.destination.dateTime),
      
      descMain: formatDuration(flight.durationMinutes),
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
      savings: null // O calcular si tienes un precio original vs oferta
    };
  });
};



// 1. Definimos la interfaz de la data "cruda" (Raw) tal como viene de la tabla/CSV
export interface RawFlightProvider {
  id: string;
  title: string;
  routeCode: string;
  operatorId: string;
  operatorName: string;
  operatorLogoUrl: string;
  operatorRating: string | number; // Puede venir como string "4.5"
  operatorPhone?: string;
  operatorEmail?: string;
  operatorWebsite?: string;
  origin: string; // JSON String
  dateTime_origin: string;
  destination: string; // JSON String
  dateTime_destination: string;
  stops: string; // JSON String
  durationMinutes: number;
  durationNights: number;
  distanceKm: number;
  isDirect: boolean | string; // "TRUE" o true
  isRoundTrip: boolean | string;
  prices: string; // JSON String
  classesAvailable: string; // JSON String
  amenities: string; // JSON String
  policies: string; // JSON String
  availability: string; // JSON String
  seatMap?: string; // JSON String
  recurring?: string; // JSON String
  images: string; // JSON String
  ratings?: string; // JSON String
  updatedAt: string;
  transportType?: string;
}

// Helper para parsear JSON de forma segura y silenciosa
const safeParse = <T>(input: string | any): T => {
  // 1. Si no hay input (es null, undefined o string vacío ""), retorna objeto vacío
  if (!input) return {} as T;

  // 2. Si ya es un objeto, devuélvelo tal cual
  if (typeof input === 'object') return input as T;

  try {
    // 3. Intenta parsear
    return JSON.parse(input) as T;
  } catch (e) {
    // 4. Si falla (JSON inválido), retorna objeto vacío silenciosamente (sin console.error)
    return {} as T;
  }
};

// Helper para convertir booleans que pueden venir como string "TRUE"/"FALSE"
const parseBoolean = (val: boolean | string): boolean => {
  if (typeof val === 'boolean') return val;
  return val?.toString().toUpperCase() === 'TRUE';
};

// 2. Función de Transformación Principal
export const transformFlightData = (rawData: RawFlightProvider[]): TransportTrip[] => {
  return rawData.map((row) => {
    
    // Parseamos los JSONs complejos
    const originStop = safeParse<TransportStop>(row.origin);
    const destinationStop = safeParse<TransportStop>(row.destination);
    
    // Parseamos arrays y objetos de configuración
    const parsedStops = safeParse<TransportTrip['stops']>(row.stops) || [];
    const parsedPrices = safeParse<TransportTrip['prices']>(row.prices) || [];
    const parsedClasses = safeParse<string[]>(row.classesAvailable) || [];
    const parsedAmenities = safeParse<TransportTrip['amenities']>(row.amenities) || {};
    const parsedPolicies = safeParse<TransportTrip['policies']>(row.policies) || {};
    const parsedAvailability = safeParse<TransportTrip['availability']>(row.availability) || { seatsAvailable: 0, totalCapacity: 0 };
    const parsedImages = safeParse<string[]>(row.images) || [];
    const parsedRecurring = row.recurring ? safeParse<TransportTrip['recurring']>(row.recurring) : undefined;
    const parsedSeatMap = row.seatMap ? safeParse<TransportTrip['seatMap']>(row.seatMap) : undefined;
    
    // Parse ratings (si viene como JSON string extra, o usamos el rating simple del operador)
    // Nota: Tu tabla tiene 'operatorRating' y un campo 'ratings' JSON.
    // Aquí priorizamos el JSON si existe, si no, construimos uno básico con el operatorRating.
    let finalRatings = row.ratings ? safeParse<TransportTrip['ratings']>(row.ratings) : undefined;
    if (!finalRatings && row.operatorRating) {
        finalRatings = { overall: Number(row.operatorRating) };
    }

    return {
      id: row.id,
      title: row.title,
      routeId: row.routeCode,

      // Mapeo del Operador
      operator: {
        id: row.operatorId,
        name: row.operatorName,
        logoUrl: row.operatorLogoUrl,
        rating: Number(row.operatorRating),
        contact: {
          phone: row.operatorPhone,
          email: row.operatorEmail,
          website: row.operatorWebsite,
        },
      },

      // Origen (Estructura { stop, dateTime })
      origin: {
        stop: originStop,
        dateTime: row.dateTime_origin,
      },

      // Destino (Estructura { stop, dateTime })
      destination: {
        stop: destinationStop,
        dateTime: row.dateTime_destination,
      },

      // Paradas intermedias
      stops: parsedStops,

      // Datos del viaje
      durationMinutes: Number(row.durationMinutes),
      durationNights: Number(row.durationNights),
      distanceKm: Number(row.distanceKm),
      isDirect: parseBoolean(row.isDirect),
      isRoundTrip: parseBoolean(row.isRoundTrip),

      // Precios y Clases
      prices: parsedPrices,
      classesAvailable: parsedClasses,

      // Detalles y Políticas
      amenities: parsedAmenities,
      policies: parsedPolicies,
      availability: parsedAvailability,
      
      // Opcionales
      seatMap: parsedSeatMap,
      recurring: parsedRecurring,
      images: parsedImages,
      ratings: finalRatings,

      updatedAt: row.updatedAt,
      
      // Nota: 'ship' no está en la data cruda de vuelos, se queda undefined.
    };
  });
};