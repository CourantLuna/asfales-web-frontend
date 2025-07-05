"use client";
import React from "react";
import { Star, Wifi, Car, Utensils, Building2 } from "lucide-react";
import SearchWithFilters from "../shared/SearchWithFilters";
import { RowData } from "../shared/RenderFields";
import { CustomSelectOption } from "../shared/CustomSelect";

// Datos de ejemplo
const sampleData: RowData[] = [
  {
    title: "Hotel Ejemplo 1",
    descMain: "Un hotel moderno con excelentes amenidades",
    descSub: "Ubicado en el centro de la ciudad",
    beforePrice: { currency: "USD", value: 120 },
    afterPrice: { currency: "USD", value: 100 },
    nightlyPrice: { currency: "USD", value: 100 },
    rating: 4.5,
    ratingLabel: "Excelente",
    ratingCount: 234,
    images: ["/placeholder.jpg"],
    feature1: "WiFi gratuito",
    feature2: "Desayuno incluido",
    refundable: true,
    reserveNow: false,
    badge1: "Mejor precio",
    badge2: "Disponible",
    badge2ndColumn: "Promoción",
    isFavorite: false,
  },
  {
    title: "Hotel Ejemplo 2",
    descMain: "Resort de lujo frente al mar",
    descSub: "Con spa y múltiples restaurantes",
    beforePrice: { currency: "USD", value: 250 },
    afterPrice: { currency: "USD", value: 200 },
    nightlyPrice: { currency: "USD", value: 200 },
    rating: 4.8,
    ratingLabel: "Excepcional",
    ratingCount: 156,
    images: ["/placeholder.jpg"],
    feature1: "Vista al mar",
    feature2: "Spa incluido",
    refundable: true,
    reserveNow: true,
    badge1: "Oferta especial",
    badge2: "Disponible",
    badge2ndColumn: "Última habitación",
    isFavorite: true,
  },
];

// Opciones de ordenamiento
const sortOptions: CustomSelectOption[] = [
  { key: "recomendado", label: "Recomendado" },
  { key: "precio_menor", label: "Precio: menor a mayor" },
  { key: "precio_mayor", label: "Precio: mayor a menor" },
  { key: "mejor_valorado", label: "Mejor valorados" },
];

export default function GenericSearchExample() {
  // Configuración de data sources
  const dataSources = React.useMemo(() => [
    {
      id: "hotels",
      label: "Hoteles",
      icon: <Building2 className="h-4 w-4" />,
      type: "hotel" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: sampleData
    }
  ], []);

  // Configuración genérica de filtros
  const filters = React.useMemo(() => [
    {
      id: "search",
      type: "search" as const,
      label: "Buscar",
      placeholder: "Buscar hoteles...",
      showClearButton: true,
      minSearchLength: 2,
      dataSources: dataSources
    },
    { id: "separator-1", type: "separator" as const, className: "bg-muted" },
    {
      id: "price-range",
      type: "range" as const,
      label: "Precio por noche",
      min: 0,
      max: 500,
      currency: "$",
      step: 10
    },
    { id: "separator-2", type: "separator" as const },
    {
      id: "rating",
      type: "radio" as const,
      label: "Calificación",
      variant: "vertical" as const,
      helperText: "Filtra por calificación mínima"
    },
    { id: "separator-3", type: "separator" as const },
    {
      id: "amenities",
      type: "toggle" as const,
      label: "Amenidades",
      type_toggle: "multiple" as const,
      variant: "vertical" as const,
      wrap: true,
      gridCols: 2 as const,
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 5
    },
    { id: "separator-4", type: "separator" as const },
    {
      id: "features",
      type: "checkbox" as const,
      label: "Características",
      showCounts: true,
      maxSelections: 3,
      initialVisibleCount: 3,
      showMoreText: "Ver más características",
      showLessText: "Ver menos"
    },
    { id: "separator-5", type: "separator" as const },
    {
      id: "location",
      type: "checkbox" as const,
      label: "Ubicación",
      showCounts: true,
      maxSelections: 2,
      initialVisibleCount: 2
    },
    { id: "separator-6", type: "separator" as const },
    {
      id: "custom-section",
      type: "custom" as const,
      content: (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Sección personalizada</h3>
          <p className="text-sm text-blue-700">
            Este es un ejemplo de contenido personalizado que puedes agregar a los filtros.
          </p>
        </div>
      )
    }
  ], [dataSources]);

  // Configuración de opciones para cada filtro
  const filterOptions = React.useMemo(() => ({
    "rating": [
      { value: "4.5", label: "4.5+ estrellas", count: 12 },
      { value: "4.0", label: "4.0+ estrellas", count: 28 },
      { value: "3.5", label: "3.5+ estrellas", count: 45 },
      { value: "3.0", label: "3.0+ estrellas", count: 67 }
    ],
    "amenities": [
      {
        value: "wifi",
        label: "WiFi gratuito",
        icon: <Wifi className="w-full h-full" />,
        count: 89
      },
      {
        value: "parking",
        label: "Estacionamiento",
        icon: <Car className="w-full h-full" />,
        count: 67
      },
      {
        value: "restaurant",
        label: "Restaurante",
        icon: <Utensils className="w-full h-full" />,
        count: 45
      },
      {
        value: "spa",
        label: "Spa",
        icon: <Star className="w-full h-full" />,
        count: 23
      }
    ],
    "features": [
      { value: "pool", label: "Piscina", count: 34 },
      { value: "gym", label: "Gimnasio", count: 28 },
      { value: "breakfast", label: "Desayuno incluido", count: 56 },
      { value: "pets", label: "Se admiten mascotas", count: 12 },
      { value: "business", label: "Centro de negocios", count: 23 }
    ],
    "location": [
      { value: "downtown", label: "Centro de la ciudad", count: 45 },
      { value: "beach", label: "Cerca de la playa", count: 23 },
      { value: "airport", label: "Cerca del aeropuerto", count: 18 }
    ]
  }), []);

  // Componente simple para mostrar resultados
  const renderResults = ({ filteredRows, compareMode, onCardClick }: {
    filteredRows: RowData[];
    compareMode: boolean;
    onCardClick: (idx: number, row: RowData) => void;
  }) => (
    <div className="space-y-4">
      {filteredRows.map((row: RowData, idx: number) => (
        <div
          key={idx}
          className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onCardClick(idx, row)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{row.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{row.descMain}</p>
              <p className="text-gray-500 text-xs mt-1">{row.descSub}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{row.rating}</span>
                <span className="ml-2 text-xs text-gray-500">({row.ratingCount} reseñas)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {row.afterPrice?.currency}{row.afterPrice?.value}
              </div>
              <div className="text-sm text-gray-500">por noche</div>
            </div>
          </div>
          {compareMode && (
            <div className="mt-3 pt-3 border-t">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Comparar esta opción</span>
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ejemplo de SearchWithFilters Genérico</h1>
      
      <SearchWithFilters
        rows={sampleData}
        // Nueva API genérica
        filters={filters}
        filterOptions={filterOptions}
        // Configuración
        sortOptions={sortOptions}
        enableCompareMode={true}
        compareConfig={{
          titleOff: "Comparar hoteles",
          subtitleOff: "Obtén una vista lado a lado de hasta 5 hoteles",
          titleOn: "Comparando hoteles",
          subtitleOn: "Selecciona hoteles para comparar lado a lado"
        }}
        // Textos personalizables
        searchPlaceholder="Buscar hoteles..."
        noResultsMessage="No se encontraron hoteles"
        clearFiltersText="Limpiar filtros"
        sortByText="Ordenar por"
        howItWorksText="¿Cómo funciona nuestro orden?"
        resultsCountText={(count) => `${count}+ hoteles encontrados`}
        renderResults={renderResults}
        onCardClick={(idx, row) => alert(`¡Click en hotel #${idx}: ${row.title}!`)}
        onFiltersChange={(filters) => console.log("Filters changed:", filters)}
      />
    </div>
  );
}
