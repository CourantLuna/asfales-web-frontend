"use client";

import React from 'react';
import LodgingResultsWithFilters from '../lodging-search/LodgingResultsTemplate';

/**
 * Componente padre ejemplo que demuestra cómo configurar 
 * los valores por defecto de los filtros en LodgingResultsWithFilters
 */
export default function LodgingResultsExample() {
  // Configuración de filtros por defecto - personalizable según tus necesidades
  const filterDefaults = {
    // Búsqueda por defecto
    search: "Hotel",
    
    // Filtros populares seleccionados por defecto
    popularFilters: ["pet-friendly", "pool", "wifi"],
    
    // Calificación de huéspedes por defecto (radio button)
    guestRating: "very-good", // "wonderful", "very-good", "good"
    
    // Rango de precio por defecto [min, max]
    priceRange: [75, 400] as [number, number],
    
    // Amenities seleccionados por defecto
    amenities: ["wifi", "pool", "gym"],
    
    // Calificación por estrellas por defecto
    starRating: ["4-stars", "5-stars"],
    
    // Tipo de pago por defecto
    paymentType: ["reserve-now-pay-later"],
    
    // Opciones de cancelación por defecto
    cancellationOptions: ["fully-refundable"],
    
    // Tipos de propiedad por defecto
    propertyType: ["hotel", "apartment", "aparthotel"]
  };

  // Manejo de cambios en filtros
  const handleFiltersChange = (filters: Record<string, any>) => {
    console.log("🔍 Filtros actualizados:", filters);
    // Aquí puedes hacer lo que necesites con los filtros actualizados
    // Por ejemplo: hacer una nueva búsqueda, actualizar URL, etc.
  };

  // Manejo de clicks en cards
  const handleCardClick = (idx: number, row: any) => {
    console.log(`🏨 Click en alojamiento #${idx}:`, row.title);
    // Aquí puedes manejar la navegación o abrir modal de detalles
    // Por ejemplo: router.push(`/lodging/${row.id}`)
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Búsqueda de Alojamientos
        </h1>
        <p className="text-gray-600">
          Encuentra el alojamiento perfecto con filtros preconfigurados
        </p>
      </div>

      <LodgingResultsWithFilters
        filterDefaults={filterDefaults}
        onFiltersChange={handleFiltersChange}
        onCardClick={handleCardClick}
        className="w-full"
      />
    </div>
  );
}

/**
 * EJEMPLOS DE CONFIGURACIONES ADICIONALES:
 */

// Configuración para usuarios premium (filtros más refinados)
export const premiumFilterDefaults = {
  popularFilters: ["spa", "fitness-center", "business-center"],
  guestRating: "wonderful",
  priceRange: [200, 800] as [number, number],
  amenities: ["spa", "gym", "restaurant", "ocean-view"],
  starRating: ["5-stars"],
  paymentType: ["reserve-now-pay-later"],
  cancellationOptions: ["fully-refundable"],
  propertyType: ["hotel", "aparthotel"]
};

// Configuración para viajeros de negocios
export const businessFilterDefaults = {
  popularFilters: ["business-center", "fitness-center"],
  guestRating: "very-good",
  priceRange: [100, 500] as [number, number],
  amenities: ["wifi", "gym", "restaurant"],
  starRating: ["3-stars", "4-stars", "5-stars"],
  paymentType: ["reserve-now-pay-later"],
  cancellationOptions: ["fully-refundable"],
  propertyType: ["hotel", "aparthotel"]
};

// Configuración para familias
export const familyFilterDefaults = {
  popularFilters: ["family-friendly", "pool"],
  guestRating: "good",
  priceRange: [50, 300] as [number, number],
  amenities: ["pool", "wifi", "kitchen"],
  starRating: ["3-stars", "4-stars"],
  propertyType: ["apartment", "private-vacation-home", "hotel"]
};

// Configuración para viajeros con mascotas
export const petFriendlyFilterDefaults = {
  popularFilters: ["pet-friendly"],
  guestRating: "very-good",
  priceRange: [75, 400] as [number, number],
  amenities: ["pet-friendly", "outdoor-space"],
  propertyType: ["private-vacation-home", "apartment", "hotel"]
};
