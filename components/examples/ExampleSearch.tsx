"use client";
import React, { useState } from "react";
import SearchWithFilters from "../shared/SearchWithFilters";
import { RowData } from "../shared/RenderFields";
import { CustomSelectOption } from "../shared/CustomSelect";
import { CheckboxOption } from "../shared/CheckboxFilter";
import { Star, Shield, Wifi, Car, Coffee, Book } from "lucide-react";

// Ejemplo de uso del SearchWithFilters con la nueva API
export default function ExampleSearch() {
  // Datos de ejemplo
  const [rows] = useState<RowData[]>([
    {
      title: "Producto Premium",
      images: ["/placeholder.jpg"],
      descMain: "Descripción del producto premium",
      descSub: "Características adicionales",
      afterPrice: { currency: "USD", value: 299 },
      rating: 4.8,
      ratingLabel: "Excelente",
      ratingCount: 120,
      isFavorite: false
    },
    {
      title: "Producto Básico",
      images: ["/placeholder.jpg"],
      descMain: "Descripción del producto básico",
      descSub: "Características estándar",
      afterPrice: { currency: "USD", value: 99 },
      rating: 4.2,
      ratingLabel: "Bueno",
      ratingCount: 85,
      isFavorite: false
    }
  ]);

  // Opciones de ejemplo
  const categoryOptions: CheckboxOption[] = [
    { value: "electronics", label: "Electrónicos", count: 45 },
    { value: "clothing", label: "Ropa", count: 32 },
    { value: "books", label: "Libros", count: 28 },
    { value: "home", label: "Hogar", count: 19 }
  ];

  const qualityOptions = [
    { value: "premium", label: "Premium", count: 12 },
    { value: "standard", label: "Estándar", count: 25 },
    { value: "basic", label: "Básico", count: 18 }
  ];

  const featureOptions = [
    {
      value: "warranty",
      label: "Garantía",
      icon: <Shield className="w-full h-full" />,
      count: 42
    },
    {
      value: "fast-delivery",
      label: "Envío rápido",
      icon: <Car className="w-full h-full" />,
      count: 38
    },
    {
      value: "premium-support",
      label: "Soporte premium",
      icon: <Coffee className="w-full h-full" />,
      count: 24
    }
  ];

  const ratingOptions: CheckboxOption[] = [
    { value: "5-stars", label: "5 estrellas", count: 8 },
    { value: "4-stars", label: "4+ estrellas", count: 24 },
    { value: "3-stars", label: "3+ estrellas", count: 45 }
  ];

  const sortOptions: CustomSelectOption[] = [
    { key: "relevance", label: "Relevancia" },
    { key: "price_asc", label: "Precio: menor a mayor" },
    { key: "price_desc", label: "Precio: mayor a menor" },
    { key: "rating", label: "Mejor calificados" },
    { key: "newest", label: "Más recientes" }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Ejemplo de Búsqueda de Productos</h1>
      
      <SearchWithFilters
        rows={rows}
        // Usando las opciones específicas en lugar de la configuración genérica
        popularFiltersOptions={categoryOptions}
        guestRatingOptions={qualityOptions}
        starRatingOptions={ratingOptions}
        amenitiesOptions={featureOptions}
        sortOptions={sortOptions}
        dataSources={[]}
        priceRange={{ min: 0, max: 1000, step: 25 }}
        currency="$"
        enableCompareMode={true}
        compareConfig={{
          titleOff: "Comparar productos",
          subtitleOff: "Obtén una vista lado a lado de hasta 5 productos",
          titleOn: "Comparando productos",
          subtitleOn: "Selecciona productos para comparar lado a lado"
        }}
        searchPlaceholder="Buscar productos..."
        noResultsMessage="No se encontraron productos"
        clearFiltersText="Limpiar filtros"
        sortByText="Ordenar por"
        howItWorksText="¿Cómo funciona nuestro orden?"
        resultsCountText={(count) => `${count}+ productos`}
        renderResults={({ filteredRows, compareMode, onCardClick }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRows.map((row, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onCardClick(idx, row)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{row.title}</h3>
                  {compareMode && (
                    <input
                      type="checkbox"
                      className="ml-2"
                      onChange={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{row.descMain}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{row.rating}</span>
                    <span className="text-xs text-gray-500">({row.ratingCount})</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {row.afterPrice?.currency} {row.afterPrice?.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        onCardClick={(idx, row) => alert(`¡Click en producto #${idx}: ${row.title}!`)}
        onFiltersChange={(filters) => console.log("Filters changed:", filters)}
      />
    </div>
  );
}
