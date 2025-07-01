"use client";

import React, { useState } from "react";
import { StandardToggleGroup } from "./StandardToggleGroup";
import { Plane, Bus, Ship, Hotel, Home, Building2 } from "lucide-react";

/**
 * Ejemplo de uso del StandardToggleGroup
 */
export default function StandardToggleGroupExample() {
  // Estado para selección múltiple
  const [transportTypes, setTransportTypes] = useState<string[]>(["air"]);
  
  // Estado para selección única
  const [lodgingType, setLodgingType] = useState<string>("hotel");

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">StandardToggleGroup Examples</h2>
      
      {/* Ejemplo 1: Selección múltiple */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Múltiple Selección - Tipos de Transporte</h3>
        <StandardToggleGroup
          label="Selecciona los tipos de transporte"
          type="multiple"
          value={transportTypes}
          onValueChange={(value) => setTransportTypes(Array.isArray(value) ? value : [value])}
          options={[
            {
              value: "air",
              label: "Aéreo",
              icon: <Plane className="h-4 w-4 text-secondary" />
            },
            {
              value: "land",
              label: "Terrestre",
              icon: <Bus className="h-4 w-4" />
            },
            {
              value: "sea",
              label: "Marítimo",
              icon: <Ship className="h-4 w-4" />
            }
          ]}
          required
          helperText="Puedes seleccionar múltiples opciones"
        />
        <p className="mt-2 text-sm text-gray-600">
          Seleccionados: {transportTypes.join(", ")}
        </p>
      </div>

      {/* Ejemplo 2: Selección única */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Selección Única - Tipo de Alojamiento</h3>
        <StandardToggleGroup
          label="Selecciona un tipo de alojamiento"
          type="single"
          value={lodgingType}
          onValueChange={(value) => setLodgingType(typeof value === "string" ? value : "")}
          options={[
            {
              value: "hotel",
              label: "Hotel",
              icon: <Hotel className="h-4 w-4 text-muted-foreground" />
            },
            {
              value: "house",
              label: "Casa",
              icon: <Home className="h-4 w-4 text-muted-foreground" />
            },
            {
              value: "apartment",
              label: "Apartamento",
              icon: <Building2 className="h-4 w-4 text-muted-foreground" />
            }
          ]}
          helperText="Solo puedes seleccionar una opción"
        />
        <p className="mt-2 text-sm text-gray-600">
          Seleccionado: {lodgingType}
        </p>
      </div>

      {/* Ejemplo 3: Con error */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Con Estado de Error</h3>
        <StandardToggleGroup
          label="Selección con error"
          type="multiple"
          value={[]}
          options={[
            { value: "option1", label: "Opción 1" },
            { value: "option2", label: "Opción 2" },
            { value: "option3", label: "Opción 3" }
          ]}
          error="Debes seleccionar al menos una opción"
          required
        />
      </div>

      {/* Ejemplo 4: Deshabilitado */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Deshabilitado</h3>
        <StandardToggleGroup
          label="Grupo deshabilitado"
          type="multiple"
          value={["option1"]}
          disabled
          options={[
            { value: "option1", label: "Opción 1" },
            { value: "option2", label: "Opción 2" },
            { value: "option3", label: "Opción 3" }
          ]}
          helperText="Este grupo está deshabilitado"
        />
      </div>
    </div>
  );
}
