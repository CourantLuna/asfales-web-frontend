"use client";

import React, { useState } from "react";
import { CheckboxFilter, CheckboxOption } from "../shared/standard-fields-component/CheckboxFilter";

/**
 * Ejemplo básico de CheckboxFilter
 */
export function BasicCheckboxFilterExample() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [outputString, setOutputString] = useState<string>("");

  const amenitiesOptions: CheckboxOption[] = [
    { value: "wifi", label: "WiFi gratuito" },
    { value: "parking", label: "Estacionamiento" },
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
    { value: "spa", label: "Spa" },
    { value: "restaurant", label: "Restaurante" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Servicios del Hotel</h3>
      
      <CheckboxFilter
        label="Servicios disponibles"
        options={amenitiesOptions}
        selectedValues={selectedAmenities}
        onChange={setSelectedAmenities}
        onOutputStringChange={setOutputString}
      />

      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm">
          <strong>Seleccionados:</strong> {selectedAmenities.length} servicios
        </p>
        <p className="text-sm mt-1">
          <strong>Output String:</strong> {outputString || "(vacío)"}
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo con contadores y límite máximo
 */
export function CheckboxFilterWithCountsExample() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [outputString, setOutputString] = useState<string>("");

  const locationOptions: CheckboxOption[] = [
    { value: "centro", label: "Centro de la ciudad", count: 120 },
    { value: "playa", label: "Cerca de la playa", count: 85 },
    { value: "aeropuerto", label: "Cerca del aeropuerto", count: 45 },
    { value: "montaña", label: "Zona montañosa", count: 32 },
    { value: "historico", label: "Distrito histórico", count: 67 },
    { value: "comercial", label: "Zona comercial", count: 98 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Ubicación (máx. 3)</h3>
      
      <CheckboxFilter
        label="Zonas de interés"
        options={locationOptions}
        selectedValues={selectedLocations}
        onChange={setSelectedLocations}
        onOutputStringChange={setOutputString}
        maxSelections={3}
        showCounts={true}
      />

      <div className="mt-4 p-3 bg-blue-50 rounded">
        <p className="text-sm">
          <strong>Hoteles encontrados:</strong> {
            locationOptions
              .filter(loc => selectedLocations.includes(loc.value))
              .reduce((sum, loc) => sum + (loc.count || 0), 0)
          }
        </p>
        <p className="text-sm mt-1">
          <strong>Filtro:</strong> {outputString || "Todas las zonas"}
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo para calificaciones
 */
export function RatingCheckboxFilterExample() {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [outputString, setOutputString] = useState<string>("");

  const ratingOptions: CheckboxOption[] = [
    { value: "5", label: "⭐⭐⭐⭐⭐ (5 estrellas)", count: 28 },
    { value: "4", label: "⭐⭐⭐⭐ (4 estrellas)", count: 156 },
    { value: "3", label: "⭐⭐⭐ (3 estrellas)", count: 89 },
    { value: "2", label: "⭐⭐ (2 estrellas)", count: 34 },
    { value: "1", label: "⭐ (1 estrella)", count: 12 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Calificación</h3>
      
      <CheckboxFilter
        label="Calificaciones mínimas"
        options={ratingOptions}
        selectedValues={selectedRatings}
        onChange={setSelectedRatings}
        onOutputStringChange={setOutputString}
        showCounts={true}
      />

      <div className="mt-4 p-3 bg-yellow-50 rounded">
        <p className="text-sm">
          <strong>Filtro activo:</strong> {outputString || "Todas las calificaciones"}
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo con opciones deshabilitadas
 */
export function DisabledOptionsExample() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const featureOptions: CheckboxOption[] = [
    { value: "breakfast", label: "Desayuno incluido" },
    { value: "cancellation", label: "Cancelación gratuita" },
    { value: "pets", label: "Se admiten mascotas", disabled: true },
    { value: "smoking", label: "Permite fumar", disabled: true },
    { value: "accessible", label: "Accesible para sillas de ruedas" },
    { value: "business", label: "Centro de negocios" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Características Especiales</h3>
      
      <CheckboxFilter
        label="Servicios adicionales"
        options={featureOptions}
        selectedValues={selectedFeatures}
        onChange={setSelectedFeatures}
      />

      <div className="mt-4 text-xs text-gray-600">
        <p>Algunas opciones están deshabilitadas temporalmente</p>
      </div>
    </div>
  );
}

/**
 * Ejemplo integrado con FilterChips individuales
 */
export function CheckboxFilterWithIndividualChipsExample() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [amenitiesChips, setAmenitiesChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);
  
  const amenitiesOptions: CheckboxOption[] = [
    { value: "wifi", label: "WiFi" },
    { value: "parking", label: "Estacionamiento" },
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
  ];

  // Convertir chips a FilterChip format
  const filterChips = amenitiesChips.map(chip => ({
    id: chip.id,
    label: "", // Sin prefijo
    value: chip.label,
    onRemove: chip.onRemove,
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Chips Individuales</h3>
      
      <CheckboxFilter
        label="Servicios del hotel"
        options={amenitiesOptions}
        selectedValues={selectedAmenities}
        onChange={setSelectedAmenities}
        onIndividualChipsChange={setAmenitiesChips}
      />

      {/* Mostrar FilterChips individuales */}
      {filterChips.length > 0 && (
        <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/20">
          <p className="text-xs font-medium text-primary mb-2">Filtros activos:</p>
          <div className="flex flex-wrap gap-2">
            {filterChips.map(chip => (
              <div key={chip.id} className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded text-sm">
                <span>{chip.value}</span>
                <button
                  onClick={chip.onRemove}
                  className="text-xs text-primary hover:text-primary/80 ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Ejemplo con muchas opciones y funcionalidad "Ver más/menos"
 */
export function ShowMoreLessCheckboxFilterExample() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [outputString, setOutputString] = useState<string>("");

  const countryOptions: CheckboxOption[] = [
    { value: "argentina", label: "Argentina", count: 245 },
    { value: "brasil", label: "Brasil", count: 189 },
    { value: "chile", label: "Chile", count: 156 },
    { value: "colombia", label: "Colombia", count: 134 },
    { value: "peru", label: "Perú", count: 98 },
    { value: "ecuador", label: "Ecuador", count: 87 },
    { value: "uruguay", label: "Uruguay", count: 76 },
    { value: "bolivia", label: "Bolivia", count: 65 },
    { value: "paraguay", label: "Paraguay", count: 54 },
    { value: "venezuela", label: "Venezuela", count: 43 },
    { value: "guyana", label: "Guyana", count: 32 },
    { value: "suriname", label: "Suriname", count: 21 },
    { value: "guyanafrancesa", label: "Guyana Francesa", count: 18 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Destinos en Sudamérica</h3>
      
      <CheckboxFilter
        label="Países disponibles"
        options={countryOptions}
        selectedValues={selectedCountries}
        onChange={setSelectedCountries}
        onOutputStringChange={setOutputString}
        showCounts={true}
        initialVisibleCount={4}
        showMoreText="Ver más países"
        showLessText="Ver menos países"
      />

      <div className="mt-4 p-3 bg-green-50 rounded">
        <p className="text-sm">
          <strong>Países seleccionados:</strong> {selectedCountries.length}
        </p>
        <p className="text-sm mt-1">
          <strong>Resumen:</strong> {outputString || "Todos los países"}
        </p>
      </div>
    </div>
  );
}

/**
 * Componente que muestra todos los ejemplos
 */
export function CheckboxFilterExamples() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CheckboxFilter Examples</h1>
        <p className="text-gray-600">Ejemplos de uso del componente CheckboxFilter</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BasicCheckboxFilterExample />
        <CheckboxFilterWithCountsExample />
        <RatingCheckboxFilterExample />
        <DisabledOptionsExample />
        <CheckboxFilterWithIndividualChipsExample />
        <ShowMoreLessCheckboxFilterExample />
      </div>
    </div>
  );
}
