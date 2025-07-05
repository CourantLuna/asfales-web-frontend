# PriceRangeFilter

Un componente de filtro de precio con slider de rango interactivo y moderno. Permite a los usuarios seleccionar un rango de precios usando sliders o inputs manuales.

## Características

- ✅ **Slider Dual Interactive** - Dos thumbs para mínimo y máximo
- ✅ **Inputs Manuales** - Edición directa de valores (opcional)
- ✅ **Formato Personalizable** - Soporte para diferentes monedas y formatos
- ✅ **Output String Dinámico** - Genera automáticamente texto descriptivo del filtro
- ✅ **Hook Reutilizable** - `usePriceRangeOutputString` para usar la lógica en otros componentes
- ✅ **Responsive** - Se adapta a diferentes tamaños de pantalla
- ✅ **Drag & Drop** - Interfaz intuitiva con drag para ajustar valores
- ✅ **TypeScript** - Completamente tipado
- ✅ **Accessible** - Labels y controles accesibles

## Uso Básico

```tsx
import { PriceRangeFilter } from "@/components/shared/PriceRangeFilter";

function MyComponent() {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 300]);

  return (
    <PriceRangeFilter
      min={0}
      max={1000}
      value={priceRange}
      onChange={setPriceRange}
      label="Precio por noche"
      currency="$"
    />
  );
}
```

## Props

### Requeridas

| Prop | Tipo | Descripción |
|------|------|-------------|
| `min` | `number` | Valor mínimo del rango |
| `max` | `number` | Valor máximo del rango |
| `value` | `[number, number]` | Valor actual del rango [mínimo, máximo] |
| `onChange` | `(value: [number, number]) => void` | Función que se ejecuta cuando cambia el rango |

### Opcionales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `step` | `number` | `1` | Incremento del slider |
| `label` | `string` | `"Precio"` | Etiqueta del componente |
| `currency` | `string` | `"$"` | Símbolo de moneda |
| `formatValue` | `(value: number) => string` | - | Función personalizada para formatear valores |
| `disabled` | `boolean` | `false` | Desactivar el componente |
| `showInputs` | `boolean` | `true` | Mostrar inputs manuales |
| `containerClassName` | `string` | - | Clases adicionales para el contenedor |
| `onOutputStringChange` | `(outputString: string) => void` | - | Callback cuando cambia el string de salida |

## Lógica del Output String

El componente genera automáticamente un string descriptivo basado en los valores seleccionados:

- **Valores por defecto** (min=0, max=max): String vacío `""`
- **Solo límite superior** (min=0, max<max): `"menor a $500"`
- **Solo límite inferior** (min>0, max=max): `"mayor a $100"`
- **Rango customizado** (min>0, max<max): `"$100 a $500"`

## Hook: usePriceRangeOutputString

```typescript
import { usePriceRangeOutputString } from "@/components/shared/PriceRangeFilter";

const getOutputString = usePriceRangeOutputString(
  minValue,    // valor mínimo actual
  maxValue,    // valor máximo actual
  min,         // valor mínimo posible
  max,         // valor máximo posible
  currency,    // símbolo de moneda (opcional)
  formatValue  // función de formato (opcional)
);

const outputString = getOutputString(); // obtiene el string actual
```

## Ejemplos

### Ejemplo Básico
```tsx
<PriceRangeFilter
  min={0}
  max={500}
  value={[50, 200]}
  onChange={setPriceRange}
  label="Precio por noche"
  currency="$"
/>
```

### Ejemplo con Formato Personalizado
```tsx
const formatPrice = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

<PriceRangeFilter
  min={0}
  max={2000000}
  value={[100000, 800000]}
  onChange={setPriceRange}
  label="Precio de venta"
  formatValue={formatPrice}
  step={10000}
/>
```

### Ejemplo Solo Slider
```tsx
<PriceRangeFilter
  min={0}
  max={200}
  value={[25, 150]}
  onChange={setPriceRange}
  label="Presupuesto diario"
  currency="€"
  showInputs={false}
/>
```

### Ejemplo con Callback Avanzado
```tsx
const handlePriceChange = (newRange: [number, number]) => {
  setPriceRange(newRange);
  
  // Filtrar resultados en tiempo real
  const filteredResults = data.filter(item => 
    item.price >= newRange[0] && item.price <= newRange[1]
  );
  setFilteredData(filteredResults);
  
  // Analytics
  analytics.track('price_filter_changed', {
    min: newRange[0],
    max: newRange[1]
  });
};

<PriceRangeFilter
  min={0}
  max={1000}
  value={priceRange}
  onChange={handlePriceChange}
/>
```

### Ejemplo con Output String Dinámico
```tsx
function FilterComponent() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filterText, setFilterText] = useState<string>("");

  return (
    <div>
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        onOutputStringChange={setFilterText}
        label="Filtro de precio"
        currency="$"
      />
      
      {filterText && (
        <div className="mt-2 px-3 py-1 bg-blue-100 rounded-full text-sm">
          Precio: {filterText}
        </div>
      )}
    </div>
  );
}
```

### Ejemplo usando el Hook
```tsx
import { usePriceRangeOutputString } from "@/components/shared/PriceRangeFilter";

function ActiveFiltersDisplay({ priceRange }: { priceRange: [number, number] }) {
  const getOutputString = usePriceRangeOutputString(
    priceRange[0], 
    priceRange[1], 
    0, 
    1000, 
    "$"
  );
  
  const filterText = getOutputString();
  
  if (!filterText) return null;
  
  return (
    <div className="filter-tag">
      Precio: {filterText}
    </div>
  );
}
```

## Funcionalidades Avanzadas

### Formato Automático de Valores Grandes
El componente detecta automáticamente valores grandes y los formatea:
- `1000` → `$1K+`
- `1500` → `$2K+` 
- `1000000` → `$1.0M+`

### Interacción del Usuario
- **Click en la pista**: Mueve el thumb más cercano al punto clickeado
- **Drag de thumbs**: Arrastra para ajustar valores con precisión
- **Inputs manuales**: Permite edición directa con validación
- **Teclado**: Soporte completo para navegación por teclado

### Validación Automática
- Los valores se mantienen dentro del rango `min`-`max`
- El valor mínimo nunca puede superar el máximo
- El valor máximo nunca puede ser menor que el mínimo
- Los valores se redondean según el `step` especificado

## Casos de Uso

### Filtros de Búsqueda
```tsx
// En páginas de búsqueda de productos, hoteles, etc.
<PriceRangeFilter
  min={0}
  max={1000}
  value={priceFilter}
  onChange={setPriceFilter}
  label="Precio por noche"
/>
```

### Configuración de Presupuesto
```tsx
// Para configurar presupuestos en aplicaciones financieras
<PriceRangeFilter
  min={0}
  max={10000}
  value={budget}
  onChange={setBudget}
  label="Presupuesto mensual"
  step={100}
/>
```

### Filtros de Rango de Precios
```tsx
// Para e-commerce con rangos de precio dinámicos
<PriceRangeFilter
  min={minPrice}
  max={maxPrice}
  value={selectedRange}
  onChange={handlePriceFilter}
  formatValue={(val) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(val)}
/>
```

## Estilos

El componente usa Tailwind CSS y es completamente personalizable:

- **Track**: `bg-muted` para el fondo, `bg-primary` para el rango activo
- **Thumbs**: Círculos blancos con borde `border-primary`
- **Estados**: Hover, focus y drag con transiciones suaves
- **Responsive**: Se adapta automáticamente a diferentes pantallas

## Dependencias

- `@/components/ui/label`
- `@/components/ui/input`
- `@/lib/utils`
- `lucide-react` (opcional, para iconos adicionales)

## Archivos Relacionados

- `PriceRangeFilter.tsx` - Componente principal
- `PriceRangeFilter.examples.tsx` - Ejemplos de uso
- Implementado en `LodgingSearch.tsx` - Caso de uso real
