"use client";

import React, { useState } from "react";
import { FilterChips, FilterChip } from "./FilterChips";

/**
 * Ejemplo básico de FilterChips
 */
export function BasicFilterChipsExample() {
  const [filters, setFilters] = useState<FilterChip[]>([
    {
      id: "price",
      label: "Precio",
      value: "mayor a $100",
      onRemove: () => removeFilter("price"),
    },
    {
      id: "location",
      label: "Ubicación",
      value: "Centro de la ciudad",
      onRemove: () => removeFilter("location"),
    },
    {
      id: "rating",
      label: "Calificación",
      value: "4+ estrellas",
      onRemove: () => removeFilter("rating"),
    },
  ]);

  const removeFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Filtros Activos - Ejemplo Básico</h3>
      
      <FilterChips
        filters={filters}
        onClearAll={clearAllFilters}
        showClearAll={true}
      />

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <p><strong>Filtros activos:</strong> {filters.length}</p>
        <p><strong>IDs:</strong> {filters.map(f => f.id).join(", ") || "ninguno"}</p>
      </div>
    </div>
  );
}

/**
 * Ejemplo con diferentes variantes
 */
export function VariantFilterChipsExample() {
  const [filters, setFilters] = useState<FilterChip[]>([
    {
      id: "price",
      label: "Precio",
      value: "$50 a $200",
      variant: "default",
      onRemove: () => removeFilter("price"),
    },
    {
      id: "amenities",
      label: "Servicios",
      value: "WiFi, Piscina",
      variant: "secondary",
      onRemove: () => removeFilter("amenities"),
    },
    {
      id: "urgent",
      label: "Urgente",
      value: "Disponible hoy",
      variant: "destructive",
      onRemove: () => removeFilter("urgent"),
    },
    {
      id: "verified",
      label: "Verificado",
      value: "Propietario verificado",
      variant: "outline",
      removable: false, // No se puede remover
      onRemove: () => {}, // No hace nada
    },
  ]);

  const removeFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setFilters(prev => prev.filter(f => !f.removable)); // Solo remueve los removibles
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Diferentes Variantes</h3>
      
      <FilterChips
        filters={filters}
        onClearAll={clearAllFilters}
        clearAllText="Limpiar filtros"
      />

      <div className="mt-4 text-xs text-gray-600">
        <p>• Default: Precio</p>
        <p>• Secondary: Servicios</p>
        <p>• Destructive: Urgente</p>
        <p>• Outline (no removible): Verificado</p>
      </div>
    </div>
  );
}

/**
 * Ejemplo para búsqueda de alojamientos
 */
export function LodgingFilterChipsExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
  const [selectedLocation, setSelectedLocation] = useState("Madrid Centro");
  const [selectedRating, setSelectedRating] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState(["WiFi", "Piscina"]);

  // Generar filtros basados en el estado
  const generateFilters = (): FilterChip[] => {
    const filters: FilterChip[] = [];

    // Filtro de precio
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      let priceValue = "";
      if (priceRange[0] === 0) {
        priceValue = `menor a $${priceRange[1]}`;
      } else if (priceRange[1] === 1000) {
        priceValue = `mayor a $${priceRange[0]}`;
      } else {
        priceValue = `$${priceRange[0]} a $${priceRange[1]}`;
      }

      filters.push({
        id: "price",
        label: "Precio",
        value: priceValue,
        onRemove: () => setPriceRange([0, 1000]),
      });
    }

    // Filtro de ubicación
    if (selectedLocation) {
      filters.push({
        id: "location",
        label: "Ubicación",
        value: selectedLocation,
        onRemove: () => setSelectedLocation(""),
      });
    }

    // Filtro de calificación
    if (selectedRating > 0) {
      filters.push({
        id: "rating",
        label: "Calificación",
        value: `${selectedRating}+ estrellas`,
        onRemove: () => setSelectedRating(0),
      });
    }

    // Filtro de servicios
    if (selectedAmenities.length > 0) {
      filters.push({
        id: "amenities",
        label: "Servicios",
        value: selectedAmenities.join(", "),
        onRemove: () => setSelectedAmenities([]),
      });
    }

    return filters;
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedLocation("");
    setSelectedRating(0);
    setSelectedAmenities([]);
  };

  const filters = generateFilters();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Filtros de Alojamiento</h3>
      
      {/* Controles de filtro simulados */}
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setPriceRange([150, 400])}
            className="px-3 py-1 bg-blue-100 rounded text-blue-700 hover:bg-blue-200"
          >
            Precio: $150-$400
          </button>
          <button
            onClick={() => setSelectedLocation("Barcelona")}
            className="px-3 py-1 bg-green-100 rounded text-green-700 hover:bg-green-200"
          >
            Barcelona
          </button>
          <button
            onClick={() => setSelectedRating(5)}
            className="px-3 py-1 bg-yellow-100 rounded text-yellow-700 hover:bg-yellow-200"
          >
            5 estrellas
          </button>
          <button
            onClick={() => setSelectedAmenities(["WiFi", "Gimnasio", "Spa"])}
            className="px-3 py-1 bg-purple-100 rounded text-purple-700 hover:bg-purple-200"
          >
            + Servicios
          </button>
        </div>
      </div>

      {/* Filtros activos */}
      <FilterChips
        filters={filters}
        onClearAll={clearAllFilters}
        showEmptyText={true}
        emptyText="No hay filtros aplicados"
      />

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <p><strong>Resultados encontrados:</strong> {Math.max(0, 50 - filters.length * 10)}</p>
      </div>
    </div>
  );
}

/**
 * Componente que muestra todos los ejemplos
 */
export function FilterChipsExamples() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FilterChips Examples</h1>
        <p className="text-gray-600">Ejemplos de uso del componente FilterChips</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BasicFilterChipsExample />
        <VariantFilterChipsExample />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <LodgingFilterChipsExample />
      </div>
    </div>
  );
}
