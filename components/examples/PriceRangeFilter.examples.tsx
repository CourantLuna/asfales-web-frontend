"use client";

import React, { useState } from "react";
import { PriceRangeFilter, usePriceRangeOutputString } from "../shared/standard-fields-component/PriceRangeFilter";

/**
 * Ejemplo con output string dinámico
 */
export function DynamicOutputStringExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [outputString, setOutputString] = useState<string>("");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Output String Dinámico</h3>
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        onOutputStringChange={setOutputString}
        label="Filtro de precio"
        currency="$"
      />
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm">
          <strong>Rango:</strong> ${priceRange[0]} - ${priceRange[1]}
        </p>
        <p className="text-sm mt-1">
          <strong>Output String:</strong> {outputString || "(vacío - valores por defecto)"}
        </p>
      </div>
      <div className="mt-3 text-xs text-gray-600">
        <p><strong>Lógica:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Si ambos están en min/max: string vacío</li>
          <li>Si min=0 y max&lt;max: "menor a $max"</li>
          <li>Si min&gt;0 y max=max: "mayor a $min"</li>
          <li>Si ambos customizados: "$min a $max"</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Ejemplo usando el hook usePriceRangeOutputString
 */
export function OutputStringHookExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
  const getOutputString = usePriceRangeOutputString(
    priceRange[0], 
    priceRange[1], 
    0, 
    1000, 
    "$"
  );

  const currentOutputString = getOutputString();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Usando Hook usePriceRangeOutputString</h3>
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        label="Precio con hook"
        currency="$"
      />
      <div className="mt-4 p-3 bg-purple-50 rounded">
        <p className="text-sm">
          <strong>Hook Output:</strong> {currentOutputString || "(vacío)"}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Este string se puede usar para mostrar filtros activos, breadcrumbs, etc.
        </p>
      </div>
    </div>
  );
}
/**
 * Ejemplo básico de filtro de precio
 */
export function BasicPriceFilterExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Filtro de Precio Básico</h3>
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        label="Precio por noche"
        currency="$"
      />
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm">
          <strong>Rango seleccionado:</strong> ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo con formato personalizado para valores grandes
 */
export function CustomFormatPriceFilterExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 800000]);

  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Filtro de Precio - Propiedades de Lujo</h3>
      <PriceRangeFilter
        min={50000}
        max={2000000}
        value={priceRange}
        onChange={setPriceRange}
        label="Precio de venta"
        currency="$"
        formatValue={formatPrice}
        step={10000}
      />
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm">
          <strong>Rango seleccionado:</strong> {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo sin inputs manuales
 */
export function SliderOnlyPriceFilterExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([25, 150]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Solo Slider</h3>
      <PriceRangeFilter
        min={0}
        max={200}
        value={priceRange}
        onChange={setPriceRange}
        label="Presupuesto diario"
        currency="€"
        showInputs={false}
      />
      <div className="mt-4 p-3 bg-blue-50 rounded">
        <p className="text-sm">
          <strong>Presupuesto:</strong> €{priceRange[0]} - €{priceRange[1]} por día
        </p>
      </div>
    </div>
  );
}

/**
 * Ejemplo para filtro de alojamientos
 */
export function LodgingPriceFilterExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([30, 300]);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    // Aquí podrías hacer la llamada a la API para filtrar
    console.log("Filtrando alojamientos con precio:", newRange);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Filtro de Alojamientos</h3>
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={handlePriceChange}
        label="Precio por noche"
        currency="$"
        step={5}
      />
      <div className="mt-4 space-y-2">
        <div className="p-3 bg-green-50 rounded">
          <p className="text-sm">
            <strong>Hoteles encontrados:</strong> {Math.floor(Math.random() * 50) + 10}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-sm">
            <strong>Precio promedio:</strong> ${Math.floor((priceRange[0] + priceRange[1]) / 2)}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente que muestra todos los ejemplos
 */
export function PriceRangeFilterExamples() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PriceRangeFilter Examples</h1>
        <p className="text-gray-600">Ejemplos de uso del componente PriceRangeFilter</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DynamicOutputStringExample />
        <OutputStringHookExample />
        <BasicPriceFilterExample />
        <CustomFormatPriceFilterExample />
        <SliderOnlyPriceFilterExample />
        <LodgingPriceFilterExample />
      </div>
    </div>
  );
}
