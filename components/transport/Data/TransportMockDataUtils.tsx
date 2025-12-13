import { el } from "date-fns/locale";
import { TransportStop, TransportTrip } from "../types/transport.types";

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

// Helper to safely parse JSON strings with fallback to undefined
const safeParse = <T,>(jsonString: string | undefined): T | undefined => {
    if (!jsonString) return undefined;
    try {
        return JSON.parse(jsonString) as T;
    } catch (error) {
        console.warn(`Failed to parse JSON: ${jsonString}`, error);
        return undefined;
    }
};

// Helper para convertir booleans que pueden venir como string "TRUE"/"FALSE"
const parseBoolean = (val: boolean | string): boolean => {
  if (typeof val === 'boolean') return val;
  return val?.toString().toUpperCase() === 'TRUE';
};

// 2. Función de Transformación Principal
export const transformToTransportTrip = (rawData: RawFlightProvider[]): TransportTrip[] => {
  const transformData = rawData.map((row) => {
    
    // Parseamos los JSONs críticos
    const originStop = safeParse<TransportStop>(row.origin);
    const destinationStop = safeParse<TransportStop>(row.destination);
    
    // VALIDACIÓN CRÍTICA: Si no hay origen o destino válido, este registro está corrupto.
    // Retornamos null para filtrarlo después.
    if (!originStop || !destinationStop) {
        console.warn(`Skipping Trip ID ${row.id}: Invalid Origin or Destination JSON data.`);
        return null; 
    }

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
    
    // Parse ratings
    let finalRatings = row.ratings ? safeParse<TransportTrip['ratings']>(row.ratings) : undefined;
    if (!finalRatings && row.operatorRating) {
        finalRatings = { overall: Number(row.operatorRating) };
    }

    // Construimos el objeto. TypeScript ahora sabe que originStop y destinationStop NO son undefined
    const trip: TransportTrip = {
      id: row.id,
      title: row.title,
      // Nota: Asumiendo que tu interfaz TransportTrip tiene routeId. Si es optional, ok.
      routeId: row.routeCode, 

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

      origin: {
        stop: originStop,
        dateTime: row.dateTime_origin,
      },

      destination: {
        stop: destinationStop,
        dateTime: row.dateTime_destination,
      },

      stops: parsedStops,

      durationMinutes: Number(row.durationMinutes),
      durationNights: Number(row.durationNights),
      distanceKm: Number(row.distanceKm),
      isDirect: parseBoolean(row.isDirect),
      isRoundTrip: parseBoolean(row.isRoundTrip),

      prices: parsedPrices,
      classesAvailable: parsedClasses,

      amenities: parsedAmenities,
      policies: parsedPolicies,
      availability: parsedAvailability,
      
      seatMap: parsedSeatMap,
      recurring: parsedRecurring,
      images: parsedImages,
      ratings: finalRatings,

      updatedAt: row.updatedAt,
    };

    return trip;
  });

  // 3. Filtrar los nulos (registros corruptos) y asegurar el tipo de retorno
  const validTrips = transformData.filter((item): item is TransportTrip => item !== null);

  if (validTrips.length === 0) {
    console.warn("No valid transport data was transformed.");
    return [];
  } else {
    console.log(`Successfully transformed ${validTrips.length} records.`);
    return validTrips;
  }
};



