// asfales-web-frontend/components/transport/Fligths/lib/FlightsMockData.tsx
import { getTransportsMockASFALESData } from "../../Data/StopsMockData";
import { TransportTrip, TransportStop } from "../../types/transport.types";
import { transformFlightData } from "./flight-utils";


export async function fetchFlightsFromSheet(): Promise<TransportTrip[]> {
  try {
    // 1. Llamamos a la función genérica con el nombre de la hoja
    const rawData = await getTransportsMockASFALESData("FlightProviders");

    if (!rawData || rawData.length === 0) return [];

    // console.log("Fetched raw flight data:", rawData);
    // console.log("Flight data convertido:", );

    return transformFlightData(rawData);

  } catch (error) {
    console.error("Error fetching flights from Google Sheets:", error);
    return [];
  }
}
