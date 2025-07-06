/**
 * Utilidades para manejar parámetros de búsqueda de alojamiento
 */

export interface LodgingSearchParams {
  goingTo?: string;
  travelingFrom?: string;
  from?: string; // Fecha en formato YYYY-MM-DD
  to?: string;   // Fecha en formato YYYY-MM-DD
  adults?: number;
  children?: number;
  rooms?: number;
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
