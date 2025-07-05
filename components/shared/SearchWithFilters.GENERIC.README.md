# SearchWithFilters - Componente Genérico de Filtros

Este componente ha sido refactorizado para ser completamente genérico y reutilizable, permitiendo configurar cualquier número y tipo de filtros mediante props de configuración.

## API Genérica

### Props Principales

#### `filters: GenericFilterConfig[]`
Array de configuraciones de filtros que define qué filtros mostrar y cómo comportarse.

#### `filterOptions: { [filterId: string]: GenericFilterOption[] }`
Mapeo de ID de filtro a sus opciones correspondientes.

### Ejemplo de Uso Básico

```tsx
import SearchWithFilters from "./SearchWithFilters";

const MyComponent = () => {
  const filters = [
    {
      id: "search",
      type: "search",
      label: "Buscar",
      placeholder: "Buscar productos...",
      showClearButton: true,
      minSearchLength: 2
    },
    {
      id: "category",
      type: "checkbox",
      label: "Categorías",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 3,
      showMoreText: "Ver más categorías",
      showLessText: "Ver menos"
    },
    {
      id: "price-range",
      type: "range",
      label: "Precio",
      min: 0,
      max: 1000,
      currency: "$",
      step: 10
    },
    {
      id: "rating",
      type: "radio",
      label: "Calificación",
      variant: "vertical",
      helperText: "Filtra por calificación mínima"
    },
    {
      id: "features",
      type: "toggle",
      label: "Características",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: 2,
      maxSelections: 3
    },
    {
      id: "separator-1",
      type: "separator",
      className: "bg-muted"
    },
    {
      id: "custom-section",
      type: "custom",
      content: <div>Contenido personalizado</div>
    }
  ];

  const filterOptions = {
    "category": [
      { value: "electronics", label: "Electrónicos", count: 45 },
      { value: "clothing", label: "Ropa", count: 32 },
      { value: "books", label: "Libros", count: 28 }
    ],
    "rating": [
      { value: "4.5", label: "4.5+ estrellas", count: 12 },
      { value: "4.0", label: "4.0+ estrellas", count: 28 },
      { value: "3.5", label: "3.5+ estrellas", count: 45 }
    ],
    "features": [
      { 
        value: "wifi", 
        label: "WiFi gratuito", 
        icon: <WifiIcon />, 
        count: 89 
      },
      { 
        value: "parking", 
        label: "Estacionamiento", 
        icon: <CarIcon />, 
        count: 67 
      }
    ]
  };

  return (
    <SearchWithFilters
      rows={data}
      filters={filters}
      filterOptions={filterOptions}
      sortOptions={sortOptions}
      enableCompareMode={true}
      renderResults={({ filteredRows, compareMode, onCardClick }) => (
        <MyResultsComponent 
          rows={filteredRows}
          compareMode={compareMode}
          onCardClick={onCardClick}
        />
      )}
      onFiltersChange={(filters) => console.log("Filters changed:", filters)}
    />
  );
};
```

## Tipos de Filtros Disponibles

### 1. Search (`type: "search"`)
```tsx
{
  id: "search",
  type: "search",
  label: "Buscar",
  placeholder: "Buscar...",
  showClearButton: true,
  minSearchLength: 2,
  dataSources: dataSourcesArray,
  onSelect: (option, sourceType) => void,
  emptyMessage: "No se encontraron resultados",
  searchPlaceholder: "Buscar...",
  disabled: false
}
```

### 2. Checkbox (`type: "checkbox"`)
```tsx
{
  id: "categories",
  type: "checkbox",
  label: "Categorías",
  showCounts: true,
  maxSelections: 10,
  initialVisibleCount: 5,
  showMoreText: "Ver más",
  showLessText: "Ver menos"
}
```

### 3. Radio (`type: "radio"`)
```tsx
{
  id: "rating",
  type: "radio",
  label: "Calificación",
  variant: "vertical", // "vertical" | "horizontal"
  helperText: "Texto de ayuda"
}
```

### 4. Range (`type: "range"`)
```tsx
{
  id: "price",
  type: "range",
  label: "Precio",
  min: 0,
  max: 1000,
  step: 10,
  currency: "$"
}
```

### 5. Toggle (`type: "toggle"`)
```tsx
{
  id: "amenities",
  type: "toggle",
  label: "Amenidades",
  type_toggle: "multiple", // "single" | "multiple"
  variant: "vertical", // "vertical" | "horizontal"
  wrap: true,
  gridCols: "auto", // "auto" | 1 | 2 | 3 | 4 | 5 | 6
  containerClassName: "w-full",
  labelClassName: "text-lg font-semibold mb-4",
  toggleGroupClassName: "gap-3",
  toggleItemClassName: "border-2 hover:border-primary/50",
  maxSelections: 10
}
```

### 6. Custom (`type: "custom"`)
```tsx
{
  id: "custom-section",
  type: "custom",
  content: <div>Contenido personalizado JSX</div>,
  containerClassName: "p-4"
}
```

### 7. Separator (`type: "separator"`)
```tsx
{
  id: "separator-1",
  type: "separator",
  className: "bg-muted"
}
```

## Configuración de Opciones

### GenericFilterOption
```tsx
interface GenericFilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

### Ejemplo de filterOptions
```tsx
const filterOptions = {
  "categories": [
    { value: "electronics", label: "Electrónicos", count: 45 },
    { value: "clothing", label: "Ropa", count: 32, disabled: true },
    { value: "books", label: "Libros", count: 28 }
  ],
  "amenities": [
    { 
      value: "wifi", 
      label: "WiFi gratuito", 
      icon: <WifiIcon className="w-4 h-4" />, 
      count: 89 
    },
    { 
      value: "parking", 
      label: "Estacionamiento", 
      icon: <CarIcon className="w-4 h-4" />, 
      count: 67 
    }
  ]
};
```

## Modo de Comparación

El modo de comparación se maneja como una prop separada, no como un filtro:

```tsx
<SearchWithFilters
  enableCompareMode={true}
  compareConfig={{
    titleOff: "Comparar elementos",
    subtitleOff: "Obtén una vista lado a lado de hasta 5 elementos",
    titleOn: "Comparando elementos",
    subtitleOn: "Selecciona elementos para comparar lado a lado"
  }}
  // ... otras props
/>
```

## Callbacks y Eventos

### onFiltersChange
```tsx
onFiltersChange={(filters) => {
  console.log("Estado actual de filtros:", filters);
  // filters incluye todos los estados de filtros por ID
  // Ejemplo: { search: "texto", categories: ["electronics"], price: [0, 500] }
}}
```

### onCardClick
```tsx
onCardClick={(idx, row) => {
  console.log("Click en elemento:", idx, row);
}}
```

## Compatibilidad con API Legacy

El componente mantiene compatibilidad con la API anterior para migración gradual:

```tsx
// API Legacy (aún funciona)
<SearchWithFilters
  rows={rows}
  guestRatingOptions={guestRatingOptions}
  starRatingOptions={starRatingOptions}
  // ... otras props legacy
/>

// API Nueva (recomendada)
<SearchWithFilters
  rows={rows}
  filters={filters}
  filterOptions={filterOptions}
  // ... otras props
/>
```

## Migración de Legacy a Nueva API

### Paso 1: Identificar filtros actuales
```tsx
// Legacy
guestRatingOptions={guestRatingOptions}
starRatingOptions={starRatingOptions}
amenitiesOptions={amenitiesOptions}
```

### Paso 2: Crear configuración de filtros
```tsx
const filters = [
  {
    id: "guest-rating",
    type: "radio",
    label: "Calificación de huéspedes",
    variant: "vertical"
  },
  {
    id: "star-rating",
    type: "checkbox",
    label: "Calificación por estrellas",
    showCounts: true,
    maxSelections: 5
  },
  {
    id: "amenities",
    type: "toggle",
    label: "Amenidades",
    type_toggle: "multiple",
    variant: "vertical",
    wrap: true,
    gridCols: "auto"
  }
];
```

### Paso 3: Crear mapping de opciones
```tsx
const filterOptions = {
  "guest-rating": guestRatingOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count
  })),
  "star-rating": starRatingOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count
  })),
  "amenities": amenitiesOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count,
    icon: opt.icon,
    disabled: opt.disabled
  }))
};
```

### Paso 4: Actualizar el componente
```tsx
// Antes
<SearchWithFilters
  guestRatingOptions={guestRatingOptions}
  starRatingOptions={starRatingOptions}
  amenitiesOptions={amenitiesOptions}
  // ...
/>

// Después
<SearchWithFilters
  filters={filters}
  filterOptions={filterOptions}
  // ...
/>
```

## Ejemplos Avanzados

### Filtro con contenido personalizado
```tsx
{
  id: "custom-promo",
  type: "custom",
  content: (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-2">Ofertas Especiales</h3>
      <p className="text-sm text-blue-700 mb-3">
        Descuentos exclusivos disponibles
      </p>
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Ver Ofertas
      </button>
    </div>
  )
}
```

### Filtro de toggle con iconos
```tsx
{
  id: "amenities",
  type: "toggle",
  label: "Amenidades",
  type_toggle: "multiple",
  variant: "vertical",
  wrap: true,
  gridCols: 2,
  toggleItemClassName: "border-2 hover:border-primary/50 transition-colors"
}

// Con opciones que incluyen iconos
"amenities": [
  { 
    value: "wifi", 
    label: "WiFi", 
    icon: <Wifi className="w-full h-full" />, 
    count: 89 
  },
  { 
    value: "pool", 
    label: "Piscina", 
    icon: <Waves className="w-full h-full" />, 
    count: 67 
  }
]
```

### Filtro de rango con moneda personalizada
```tsx
{
  id: "price-eur",
  type: "range",
  label: "Precio en Euros",
  min: 0,
  max: 500,
  step: 5,
  currency: "€"
}
```

Esta nueva API genérica permite crear interfaces de filtros completamente personalizables y reutilizables, manteniendo la compatibilidad con código existente durante la migración.
