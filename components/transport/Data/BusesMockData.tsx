import { StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { Bus } from "lucide-react";

// Función que obtiene los stops desde Google Sheets
async function getTransportStops(): Promise<any[]> {
  try {
    const res = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1qcdbiCekt3GKoaQJGrYbigcL987PNEIklocKq6CuMzA/values/TransportStop!A1:Z?key=AIzaSyDj0h9wnuOB5OyKH4yfgFHB2SG1IKpGrsA"
    );
    const data = await res.json();
    const [header, ...rows] = data.values;

    const stops = rows.map((row: any[]) => {
      const rowObj: Record<string, any> = {};
      header.forEach((key: string, idx: number) => {
        rowObj[key] = row[idx];
      });
      return rowObj;
    });
    console.log("Fetched TransportStops:", stops);
    return stops;
  } catch (error) {
    console.error("Error fetching TransportStops", error);
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
  const stops = await getTransportStops();

  return [
    {
      id: "bus-stations",
      label: "Estaciones de Autobús",
      icon: <Bus className="h-4 w-4" />,
      type: "bus" as const,
      nameLabelField: "city",
      nameValueField: "stopCode",
      nameDescriptionField: "stopName",
      options: stops,
    },
  ];
}
