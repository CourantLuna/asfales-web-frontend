# ResultFilters Component

El componente `ResultFilters` es un componente reutilizable que permite renderizar dinámicamente una lista de filtros basándose en una configuración de objetos. Es especialmente útil para páginas de búsqueda donde se necesitan múltiples tipos de filtros.

## Características

- **Renderizado dinámico**: Renderiza filtros basándose en la configuración proporcionada
- **Múltiples tipos de filtros**: Soporta búsqueda, checkbox, radio, rango, toggle y separadores
- **Configuración flexible**: Cada filtro puede tener sus propias propiedades y callbacks
- **TypeScript**: Completamente tipado con interfaces específicas para cada tipo de filtro

## Tipos de Filtros Soportados

### 1. SearchFilter (`type: 'search'`)
Campo de búsqueda con autocompletado y selección.

```typescript
{
  id: "property-search",
  type: "search",
  label: "Buscar por nombre de propiedad",
  placeholder: "Buscar alojamiento...",
  value: searchValue,
  onValueChange: handleSearchChange,
  dataSources: dataSourcesLodging,
  onSelect: handleLodgingSelect,
  showClearButton: true,
  minSearchLength: 2,
  disabled: false,
  emptyMessage: "No se encontraron propiedades",
  searchPlaceholder: "Escribir para buscar propiedades..."
}
```

### 2. SeparatorFilter (`type: 'separator'`)
Separador visual entre filtros.

```typescript
{
  id: "separator-1",
  type: "separator",
  className: "bg-muted"
}
```

### 3. CheckboxFilterConfig (`type: 'checkbox'`)
Filtro con múltiples opciones de checkbox.

```typescript
{
  id: "popular-filters",
  type: "checkbox",
  label: "Filtros populares",
  options: popularFiltersOptions,
  selectedValues: selectedPopularFilters,
  onChange: handlePopularFiltersChange,
  onOutputStringChange: handlePopularFiltersOutputStringChange,
  onIndividualChipsChange: handlePopularFiltersChipsChange,
  showCounts: true,
  maxSelections: 10,
  initialVisibleCount: 5,
  showMoreText: "Ver más filtros",
  showLessText: "Ver menos"
}
```

### 4. RadioFilterConfig (`type: 'radio'`)
Filtro con opciones de radio button (selección única).

```typescript
{
  id: "guest-rating",
  type: "radio",
  label: "Calificación de huéspedes",
  options: guestRatingOptions,
  value: selectedGuestRating,
  onValueChange: handleGuestRatingChange,
  variant: "vertical",
  helperText: "Filtra por calificación promedio"
}
```

### 5. RangeFilterConfig (`type: 'range'`)
Filtro de rango numérico (slider).

```typescript
{
  id: "price-range",
  type: "range",
  label: "Precio por noche",
  min: 0,
  max: 1000,
  value: priceRange,
  onChange: (newRange) => {
    setPriceRange(newRange);
    console.log("Filtrar por precio:", newRange);
  },
  onOutputStringChange: setPriceFilterString,
  currency: "$",
  step: 10
}
```

### 6. ToggleFilterConfig (`type: 'toggle'`)
Filtro con opciones de toggle/switch.

```typescript
{
  id: "amenities",
  type: "toggle",
  label: "Amenities",
  options: amenitiesOptions,
  value: selectedAmenities,
  onValueChange: handleStandardToggleChange,
  type_toggle: "multiple",
  variant: "vertical",
  wrap: true,
  gridCols: "auto",
  containerClassName: "w-full",
  labelClassName: "text-lg font-semibold mb-4",
  toggleGroupClassName: "gap-3",
  toggleItemClassName: "border-2 hover:border-primary/50 transition-colors"
}
```

## Uso

### Importación
```typescript
import ResultFilters, { FilterConfig } from "@/components/shared/ResultFilters";
```

### Configuración
```typescript
const filtersConfig: FilterConfig[] = React.useMemo(() => [
  // ...configuración de filtros
], [
  // ...dependencias
]);
```

### Renderizado
```jsx
<ResultFilters 
  filters={filtersConfig} 
  className="w-full lg:w-60 flex-shrink-0 mt-1" 
/>
```

## Ejemplo Completo

Ver el archivo `ResultFilters.example.tsx` para un ejemplo completo de implementación.

## Beneficios

1. **Reutilización**: Un solo componente para múltiples tipos de filtros
2. **Mantenibilidad**: Fácil agregar, quitar o modificar filtros
3. **Consistencia**: Todos los filtros siguen el mismo patrón de renderizado
4. **Flexibilidad**: Cada filtro puede tener sus propias propiedades específicas
5. **TypeScript**: Tipado fuerte previene errores en tiempo de compilación

## Extensibilidad

Para agregar un nuevo tipo de filtro:

1. Definir la interfaz del filtro extendiendo `BaseFilter`
2. Agregar el tipo al union `FilterConfig`
3. Implementar el caso en el switch de `renderFilter`

```typescript
// 1. Definir interfaz
interface CustomFilter extends BaseFilter {
  type: 'custom';
  customProp: string;
}

// 2. Agregar al union
export type FilterConfig = 
  | SearchFilter 
  | SeparatorFilter 
  | CheckboxFilterConfig 
  | RadioFilterConfig 
  | RangeFilterConfig 
  | ToggleFilterConfig
  | CustomFilter; // Nuevo tipo

// 3. Implementar en renderFilter
case 'custom':
  return <CustomComponent key={filter.id} {...filter} />;
```
