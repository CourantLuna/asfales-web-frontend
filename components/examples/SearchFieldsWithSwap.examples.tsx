"use client";

import React, { useState } from "react";
import { SearchFieldsWithSwap } from "../shared/SearchFieldsWithSwap";
import { Clock, MapPin, Plane, Building2 } from "lucide-react";

// Datos de ejemplo para las fuentes de búsqueda
const sampleDataSources = [
  {
    id: "recent",
    label: "Búsquedas recientes", 
    icon: <Clock className="h-4 w-4" />,
    type: "recent" as const,
    nameLabelField: "destination",
    nameValueField: "searchId",
    nameDescriptionField: "period",
    options: [
      { 
        destination: "Medellín (MDE - A. Internacional José...)", 
        searchId: "med1", 
        period: "3 de julio–6 de julio"
      },
      { 
        destination: "Miami (MIA - Aeropuerto Internacional...)", 
        searchId: "mia1", 
        period: "1 de julio–30 de agosto • 60 noches • 2..."
      },
      { 
        destination: "San Juan de la Maguana", 
        searchId: "sj1", 
        period: "2 de junio–3 de junio • 1 noche • 2..."
      },
    ]
  },
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "name",
    nameValueField: "code",
    nameDescriptionField: "city",
    options: [
      { name: "Madrid (MAD - Aeropuerto Barajas)", code: "mad", city: "Capital de España" },
      { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "bcn", city: "Ciudad mediterránea" },
      { name: "París (CDG - Charles de Gaulle)", code: "par", city: "Ciudad de la luz" },
    ]
  },
  {
    id: "cities",
    label: "Ciudades",
    icon: <MapPin className="h-4 w-4" />,
    type: "city" as const,
    nameLabelField: "cityName",
    nameValueField: "cityCode",
    nameDescriptionField: "description",
    options: [
      { cityName: "Roma, Italia", cityCode: "rom", description: "Ciudad eterna" },
      { cityName: "Nueva York, EE.UU.", cityCode: "nyc", description: "La gran manzana" },
      { cityName: "Tokyo, Japón", cityCode: "tyo", description: "Metrópolis moderna" },
    ]
  }
];

/**
 * Ejemplo básico de uso del componente SearchFieldsWithSwap
 */
export function BasicSearchFieldsExample() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    console.log("Buscando viajes de", origin, "a", destination);
    alert(`Buscando viajes de "${origin}" a "${destination}"`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Ejemplo Básico</h3>
      <SearchFieldsWithSwap
        originValue={origin}
        onOriginValueChange={setOrigin}
        destinationValue={destination}
        onDestinationValueChange={setDestination}
        dataSources={sampleDataSources}
        onSearch={handleSearch}
        onOriginSelect={(option, sourceType) => {
          console.log("Origen seleccionado:", option, "Tipo:", sourceType);
        }}
        onDestinationSelect={(option, sourceType) => {
          console.log("Destino seleccionado:", option, "Tipo:", sourceType);
        }}
      />
    </div>
  );
}

/**
 * Ejemplo con personalización de colores y textos
 */
export function CustomizedSearchFieldsExample() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Ejemplo Personalizado</h3>
      <SearchFieldsWithSwap
        originLabel="Desde"
        originPlaceholder="Ciudad de origen"
        destinationLabel="Hacia"
        destinationPlaceholder="Ciudad de destino"
        originValue={origin}
        onOriginValueChange={setOrigin}
        destinationValue={destination}
        onDestinationValueChange={setDestination}
        dataSources={sampleDataSources}
        searchButtonText="Buscar Vuelos"
        swapButtonColor="#10B981"
        gap="lg"
        onSearch={() => console.log("Búsqueda personalizada")}
      />
    </div>
  );
}

/**
 * Ejemplo con manejo personalizado del intercambio
 */
export function CustomSwapSearchFieldsExample() {
  const [origin, setOrigin] = useState("Madrid");
  const [destination, setDestination] = useState("Barcelona");

  const customSwapHandler = () => {
    console.log("Intercambiando con lógica personalizada...");
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    // Aquí podrías agregar lógica adicional como analytics, validaciones, etc.
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Ejemplo con Intercambio Personalizado</h3>
      <SearchFieldsWithSwap
        originValue={origin}
        onOriginValueChange={setOrigin}
        destinationValue={destination}
        onDestinationValueChange={setDestination}
        dataSources={sampleDataSources}
        customSwapHandler={customSwapHandler}
        swapButtonColor="#3B82F6"
        searchButtonText="Explorar Rutas"
      />
    </div>
  );
}

/**
 * Ejemplo sin botón de búsqueda
 */
export function CompactSearchFieldsExample() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Ejemplo Compacto (Sin Botón de Búsqueda)</h3>
      <SearchFieldsWithSwap
        originValue={origin}
        onOriginValueChange={setOrigin}
        destinationValue={destination}
        onDestinationValueChange={setDestination}
        dataSources={sampleDataSources}
        showSearchButton={false}
        gap="sm"
        swapButtonColor="#059669"
      />
    </div>
  );
}

/**
 * Componente que muestra todos los ejemplos
 */
export function SearchFieldsWithSwapExamples() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SearchFieldsWithSwap Examples</h1>
        <p className="text-gray-600">Ejemplos de uso del componente SearchFieldsWithSwap</p>
      </div>
      
      <BasicSearchFieldsExample />
      <CustomizedSearchFieldsExample />
      <CustomSwapSearchFieldsExample />
      <CompactSearchFieldsExample />
    </div>
  );
}
