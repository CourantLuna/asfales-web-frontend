/**
 * Utilidades para manejar parámetros de búsqueda de alojamiento
 */

import { RowData } from "@/components/shared/RenderFields";
import { Lodging } from "@/types/lodging.types";

export interface LodgingSearchParams {
  goingTo?: string;
  travelingFrom?: string;
  from?: string; // Fecha en formato YYYY-MM-DD
  to?: string;   // Fecha en formato YYYY-MM-DD
  adults?: number;
  children?: number;
  rooms?: number;
}

export function mapLodgingToRowData(lodging: Lodging): RowData {
  return {
    title: lodging.lodgingName,
    images: [
      lodging.image1,
      lodging.image2,
      lodging.image3,
      lodging.image4,
    ].filter(Boolean),
    location: lodging.location,
    feature1: lodging.feature1,
    feature2: lodging.feature2,
    descMain: lodging.descMain,
    descSub: lodging.descSub,
    refundable: lodging.refundable,
    reserveNow: lodging.reserveNow,
    beforePrice: { currency: "USD", value: lodging.beforePrice },
    afterPrice: { currency: "USD", value: lodging.priceTotal },
    nightlyPrice: { currency: "USD", value: lodging.nightlyPrice },
    badge1: lodging.badge1,
    badge2: lodging.availableBadge,
    badge2ndColumn: lodging.availableBadge,
    isFavorite: false,
    rating: lodging.rating,
    ratingLabel: lodging.ratingLabel,
    ratingCount: lodging.ratingCount,
  };
}

/**
 * Mapa de códigos de destino a información completa
 */
const destinationMap: Record<string, { name: string; fullName: string; country?: string }> = {
  'MDE': { 
    name: 'Medellín', 
    fullName: 'Medellín (MDE - A. Internacional José María Córdova)', 
    country: 'Colombia' 
  },
  'MIA': { 
    name: 'Miami', 
    fullName: 'Miami (MIA - Aeropuerto Internacional de Miami)', 
    country: 'Estados Unidos' 
  },
  'SJM': { 
    name: 'San Juan de la Maguana', 
    fullName: 'San Juan de la Maguana', 
    country: 'República Dominicana' 
  },
  'MAD': { 
    name: 'Madrid', 
    fullName: 'Madrid (MAD - Aeropuerto Barajas)', 
    country: 'España' 
  },
  'BCN': { 
    name: 'Barcelona', 
    fullName: 'Barcelona (BCN - Aeropuerto El Prat)', 
    country: 'España' 
  },
  'CDG': { 
    name: 'París', 
    fullName: 'París (CDG - Charles de Gaulle)', 
    country: 'Francia' 
  },
  'LHR': { 
    name: 'Londres', 
    fullName: 'Londres (LHR - Heathrow)', 
    country: 'Reino Unido' 
  },
  'ROM': { 
    name: 'Roma', 
    fullName: 'Roma, Italia', 
    country: 'Italia' 
  },
  'NYC': { 
    name: 'Nueva York', 
    fullName: 'Nueva York, EE.UU.', 
    country: 'Estados Unidos' 
  },
  'TYO': { 
    name: 'Tokyo', 
    fullName: 'Tokyo, Japón', 
    country: 'Japón' 
  },
  'BUE': { 
    name: 'Buenos Aires', 
    fullName: 'Buenos Aires, Argentina', 
    country: 'Argentina' 
  },
};

/**
 * Convierte un código de destino a su nombre legible
 */
export function getDestinationName(code?: string): string {
  if (!code) return '';
  
  // Si el código existe en el mapa, devolver el nombre
  if (destinationMap[code.toUpperCase()]) {
    return destinationMap[code.toUpperCase()].name;
  }
  
  // Si no es un código conocido, asumir que es texto libre y devolverlo tal como está
  return code;
}

/**
 * Convierte un código de destino a su nombre completo
 */
export function getDestinationFullName(code?: string): string {
  if (!code) return '';
  
  // Si el código existe en el mapa, devolver el nombre completo
  if (destinationMap[code.toUpperCase()]) {
    return destinationMap[code.toUpperCase()].fullName;
  }
  
  // Si no es un código conocido, asumir que es texto libre y devolverlo tal como está
  return code;
}

/**
 * Parsea los parámetros de URL para búsqueda de alojamiento
 */
export function parseLodgingSearchParams(searchParams: URLSearchParams): LodgingSearchParams {
  return {
    goingTo: searchParams.get('goingTo') || undefined,
    travelingFrom: searchParams.get('travelingFrom') || undefined,
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
    adults: searchParams.get('adults') ? parseInt(searchParams.get('adults')!) : undefined,
    children: searchParams.get('children') ? parseInt(searchParams.get('children')!) : undefined,
    rooms: searchParams.get('rooms') ? parseInt(searchParams.get('rooms')!) : undefined,
  };
}

/**
 * Convierte fechas en formato YYYY-MM-DD a objetos Date
 */
export function parseDateFromString(dateString?: string): Date | undefined {
  if (!dateString) return undefined;
  
  try {
    const date = new Date(dateString + 'T00:00:00');
    return isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

/**
 * Reconstruye la información de habitaciones desde los parámetros
 */
export function reconstructRoomsFromParams(params: LodgingSearchParams) {
  const { adults = 2, children = 0, rooms = 1 } = params;
  
  // Distribución simple: dividir adultos equitativamente entre habitaciones
  const adultsPerRoom = Math.floor(adults / rooms);
  const remainingAdults = adults % rooms;
  
  const reconstructedRooms = [];
  
  for (let i = 0; i < rooms; i++) {
    reconstructedRooms.push({
      id: `room-${i + 1}`,
      adults: adultsPerRoom + (i < remainingAdults ? 1 : 0),
      children: i === 0 ? Array(children).fill(0) : [] // Todos los niños en la primera habitación por simplicidad
    });
  }
  
  return reconstructedRooms;
}

/**
 * Ejemplo de uso en la página de destino:
 * 
 * ```tsx
 * import { parseLodgingSearchParams, parseDateFromString, reconstructRoomsFromParams } from '@/lib/lodging-search-utils';
 * 
 * export default function HotelsAndLodgingPage({ searchParams }: { searchParams: URLSearchParams }) {
 *   const params = parseLodgingSearchParams(searchParams);
 *   const fromDate = parseDateFromString(params.from);
 *   const toDate = parseDateFromString(params.to);
 *   const rooms = reconstructRoomsFromParams(params);
 * 
 *   return (
 *     <div>
 *       <h1>Buscando hoteles</h1>
 *       <p>Destino: {params.goingTo}</p>
 *       <p>Desde: {params.travelingFrom}</p>
 *       <p>Fechas: {fromDate?.toLocaleDateString()} - {toDate?.toLocaleDateString()}</p>
 *       <p>Huéspedes: {params.adults} adultos, {params.children} niños</p>
 *       <p>Habitaciones: {params.rooms}</p>
 *     </div>
 *   );
 * }
 * ```
 */
