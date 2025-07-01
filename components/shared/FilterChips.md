# FilterChips

Un componente reutilizable para mostrar y gestionar múltiples filtros activos de manera visual y organizada. Perfecto para interfaces de búsqueda y filtrado.

## Características

- ✅ **Múltiples Filtros** - Maneja varios filtros activos simultáneamente
- ✅ **Botones de Remover** - Cada filtro puede ser removido individualmente
- ✅ **Limpiar Todo** - Botón opcional para remover todos los filtros
- ✅ **Variantes Visuales** - Diferentes estilos de badges (default, secondary, destructive, outline)
- ✅ **Filtros No Removibles** - Soporte para filtros permanentes o informativos
- ✅ **TypeScript** - Completamente tipado
- ✅ **Accesible** - Labels y controles accesibles
- ✅ **Responsive** - Se adapta automáticamente al espacio disponible

## Uso Básico

```tsx
import { FilterChips, FilterChip } from "@/components/shared/FilterChips";

function MySearchComponent() {
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([
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
    }
  ]);

  const removeFilter = (filterId: string) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <FilterChips
      filters={activeFilters}
      onClearAll={clearAllFilters}
    />
  );
}
```

## Props

### FilterChipsProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `filters` | `FilterChip[]` | - | Array de filtros activos |
| `onClearAll?` | `() => void` | - | Función para limpiar todos los filtros |
| `clearAllText?` | `string` | `"Limpiar todo"` | Texto del botón "Limpiar todo" |
| `showClearAll?` | `boolean` | `true` | Mostrar botón "Limpiar todo" |
| `className?` | `string` | - | Clases adicionales para el contenedor |
| `emptyText?` | `string` | `"No hay filtros activos"` | Texto cuando no hay filtros |
| `showEmptyText?` | `boolean` | `false` | Mostrar texto cuando no hay filtros |

### FilterChip Interface

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `id` | `string` | Identificador único del filtro |
| `label` | `string` | Etiqueta del filtro (ej: "Precio", "Ubicación") |
| `value` | `string` | Valor del filtro (ej: "mayor a $100") |
| `onRemove` | `() => void` | Función para remover el filtro |
| `variant?` | `"default" \| "secondary" \| "destructive" \| "outline"` | Variante visual del badge |
| `removable?` | `boolean` | Si el filtro puede ser removido (default: true) |

## Ejemplos

### Filtros de Búsqueda de Alojamientos

```tsx
function LodgingFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);

  const generateFilters = (): FilterChip[] => {
    const filters: FilterChip[] = [];

    // Filtro de precio dinámico
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
    if (location) {
      filters.push({
        id: "location",
        label: "Ubicación",
        value: location,
        onRemove: () => setLocation(""),
      });
    }

    // Filtro de calificación
    if (rating > 0) {
      filters.push({
        id: "rating",
        label: "Calificación",
        value: `${rating}+ estrellas`,
        onRemove: () => setRating(0),
      });
    }

    return filters;
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setLocation("");
    setRating(0);
  };

  return (
    <FilterChips
      filters={generateFilters()}
      onClearAll={clearAllFilters}
      clearAllText="Limpiar filtros"
    />
  );
}
```

### Diferentes Variantes

```tsx
const filters: FilterChip[] = [
  {
    id: "price",
    label: "Precio",
    value: "$50 a $200",
    variant: "default",
    onRemove: removePriceFilter,
  },
  {
    id: "featured",
    label: "Destacado",
    value: "Oferta especial",
    variant: "destructive",
    onRemove: removeFeaturedFilter,
  },
  {
    id: "verified",
    label: "Verificado",
    value: "Propietario verificado",
    variant: "outline",
    removable: false, // No se puede remover
    onRemove: () => {},
  }
];
```

### Sin Filtros - Estado Vacío

```tsx
<FilterChips
  filters={[]}
  showEmptyText={true}
  emptyText="No hay filtros aplicados"
/>
```

### Personalizado sin "Limpiar Todo"

```tsx
<FilterChips
  filters={activeFilters}
  showClearAll={false}
/>
```

## Integración con Otros Componentes

### Con PriceRangeFilter

```tsx
function SearchWithFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [priceOutputString, setPriceOutputString] = useState("");

  const activeFilters: FilterChip[] = priceOutputString ? [{
    id: "price",
    label: "Precio",
    value: priceOutputString,
    onRemove: () => setPriceRange([0, 1000]),
  }] : [];

  return (
    <div className="space-y-4">
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        onOutputStringChange={setPriceOutputString}
      />
      
      <FilterChips
        filters={activeFilters}
        onClearAll={() => setPriceRange([0, 1000])}
      />
    </div>
  );
}
```

## Casos de Uso

- **E-commerce**: Filtros de categoría, precio, marca, calificación
- **Búsqueda de alojamientos**: Precio, ubicación, servicios, calificación
- **Búsqueda de empleos**: Salario, ubicación, tipo de trabajo, experiencia
- **Dashboards**: Filtros de fecha, categoría, estado
- **Gestión de contenido**: Tags, categorías, estado de publicación

## Accesibilidad

- Botones de remover tienen `aria-label` descriptivos
- Navegación por teclado completa
- Contraste de colores apropiado
- Soporte para lectores de pantalla

## Estilo y Personalización

El componente usa las variantes de Badge de shadcn/ui y puede ser personalizado através de:

- `className`: Para el contenedor principal
- `variant`: Para el estilo de cada filtro individual
- CSS variables del tema para colores globales
