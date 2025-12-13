// asfales-web-frontend/components/transport/Fligths/lib/FlightsMockData.tsx
import { getTransportsMockASFALESData } from "../../Data/StopsMockData";
import { transformToTransportTrip } from "../../Data/TransportMockDataUtils";
import { TransportTrip } from "../../types/transport.types";

export interface CruiseSearchFilters {
  to?: string | null;
  departureDate?: string | null;
  maxNights?: string | null;
  minNights?: string | null;
}

export async function fetchCruisesFromSheet(): Promise<TransportTrip[]> {
  try {
    const rawData = await getTransportsMockASFALESData("CruiseProviders"); // O "Cruises" según tu sheet

    if (!rawData || rawData.length === 0) return [];

    const transformData = transformToTransportTrip(rawData);
    // console.log("Cruise data convertido:", transformData.length);
    return transformData;

  } catch (error) {
    console.error("Error fetching flights from Google Sheets:", error);
    return [];
  }
}

export const getCruiseResultSets = async (
  filters: CruiseSearchFilters
): Promise<TransportTrip[]> => { // Cambiado any[] a TransportTrip[] para mejor tipado
  console.log("🔍 Generando FlightResultSets con filtros:", filters);
  
  // 1. Obtener TODOS los cruceros
  const allCruises = await fetchCruisesFromSheet();

  const filterByRouteAndDuration = (
    destCode: string | null, 
    queryDate: string | null,
    minNights: number, 
    maxNights: number | null 
  ) => { 
    return allCruises.filter(f => {
      
      // --- 1. FILTRO DE RUTA (Solo si destCode existe) ---
      if (destCode) {
        // Normalizamos a mayúsculas para evitar errores
        const search = destCode.toUpperCase();

        const matchDest = f.destination.stop.cityCode?.toUpperCase() === search;
        const matchOrigin = f.origin.stop.stopCode?.toUpperCase() === search;
        const matchStops = f.stops?.some((s) => s.stop.cityCode?.toUpperCase() === search);

        // Si NO coincide con nada, descartamos el crucero (return false)
        if (!matchDest && !matchOrigin && !matchStops) {
            return false;
        }
      }
      // Si destCode es null, ignoramos este bloque y el crucero sigue vivo.

      // --- 2. FILTRO DE FECHA (Solo si queryDate existe) ---
      if (queryDate) {
        // Extraemos fecha YYYY-MM-DD
        const flightDateOnly = f.origin.dateTime.split('T')[0];
        
        // Si la fecha NO coincide, descartamos
        if (flightDateOnly !== queryDate) {
            return false;
        }
      }
      // Si queryDate es null, ignoramos este bloque.

      // --- 3. FILTRO DE DURACIÓN (Noches) ---
      const tripNights = f.durationNights || 0;

      // Filtro Mínimo
      if (tripNights < minNights) return false;

      // Filtro Máximo (solo si maxNights tiene valor)
      if (maxNights !== null && tripNights > maxNights) return false;

      // --- 4. APROBADO ---
      // Si llegó hasta aquí, pasó todos los filtros activos
      return true;
    });
  };

  // 3. Preparar variables de filtro
  const Destination = filters.to || null;
  const DepartureDate = filters.departureDate || null;
  const minNights = filters.minNights ? parseInt(filters.minNights) : 0;
  const maxNights = filters.maxNights ? parseInt(filters.maxNights) : null;
      
  // 4. Ejecutar y retornar
  const results = filterByRouteAndDuration(Destination, DepartureDate, minNights, maxNights);
  
  console.log(`✅ ${results.length} cruceros encontrados.`);
  
  return results;
};