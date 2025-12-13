import { StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { Anchor, Bus, Plane } from "lucide-react";

export async function getTransportsMockASFALESData(sheetFullName: string): Promise<any[]> {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1qcdbiCekt3GKoaQJGrYbigcL987PNEIklocKq6CuMzA/values/${sheetFullName}!A1:Z?key=AIzaSyDj0h9wnuOB5OyKH4yfgFHB2SG1IKpGrsA`
    );
    const data = await res.json();
    const [header, ...rows] = data.values;

    const objtData = rows.map((row: any[]) => {
      const rowObj: Record<string, any> = {};
      header.forEach((key: string, idx: number) => {
        rowObj[key] = row[idx];
      });
      return rowObj;
    });

    return objtData;
  } catch (error) {
    return [];
  }
}
// Función que obtiene los stops desde Google Sheets
export async function getTransportStops(TransportStopsType: "Buses" | "Flights"| "Cruises"): Promise<any[]> {
  const SheetName = TransportStopsType || "Buses";
  try {
    const stops = await getTransportsMockASFALESData(`TransportStop-${SheetName}`);
    console.log(`Fetched TransportStops de tipo: ${SheetName}`, stops);
    return stops;
  } catch (error) {
    console.log(`Error fetching TransportStops de tipo: ${SheetName}`, error);
    // Devuelve stops por defecto si falla
    return [
      { stopCode: "SDQ-TER", city: "Santo Domingo", stopName: "Terminal de Autobuses de Santo Domingo" },
      { stopCode: "STI-TER", city: "Santiago", stopName: "Terminal de Autobuses de Santiago" },
      { stopCode: "AZU-TER", city: "Azua", stopName: "Terminal de Autobuses de Azua" },
      { stopCode: "BAV-TER", city: "Bavaro", stopName: "Terminal de Autobuses de Bavaro" },
      { stopCode: "PUJ-TER", city: "Punta Cana", stopName: "Terminal de Autobuses de Punta Cana" },
    ];
  }
}


// Función exportable que devuelve StandardSearchDataSource[]
export async function getBusesDataSources(): Promise<StandardSearchDataSource[]> {
  const stops = await getTransportStops("Buses");

  return [
    {
      id: "bus-stations",
      label: "Estaciones de Autobús",
      icon: <Bus className="h-4 w-4" />,
      type: "bus" as const,
      nameLabelField: "city",
      nameValueField: "cityCode",
      nameDescriptionField: "stopName",
      options: stops,
    },
  ];
}


// Función exportable que devuelve StandardSearchDataSource[]
export async function getFlightsDataSources(): Promise<StandardSearchDataSource[]> {
  const stops = await getTransportStops("Flights");

  return [
    {
     id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "city",
    nameValueField: "cityCode",
   nameDescriptionField: "descLabel", 
      options: stops.map((stop) => ({
        ...stop,
        descLabel: `${stop.city} - ${stop.stopName}`
      })),
    },
  ];
}

// Función exportable que devuelve StandardSearchDataSource[]
export async function getCruisesDataSources(): Promise<StandardSearchDataSource[]> {
  const stops = await getTransportStops("Cruises");

  return [
    {
    id: "cruise-ports",
    label: "Puertos de Cruceros",
    icon: <Anchor className="h-4 w-4" />,
    type: "cruise" as const,
    nameLabelField: "city",
    nameValueField: "cityCode",
    nameDescriptionField: "stopName",
    options: stops,
    },
  ];
}


