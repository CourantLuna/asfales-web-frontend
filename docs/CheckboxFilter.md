# CheckboxFilter

Un componente de filtro con checkboxes múltiples que permite a los usuarios seleccionar varias opciones de una lista. Perfecto para filtros de características, servicios, categorías, etc.

## Características

- ✅ **Selección múltiple** - Los usuarios pueden seleccionar varias opciones
- ✅ **Output string dinámico** - Genera automáticamente texto descriptivo 
- ✅ **Límite de selecciones** - Control opcional del máximo de elementos
- ✅ **Contadores** - Muestra cantidad de resultados por opción
- ✅ **Opciones deshabilitadas** - Soporte para opciones no disponibles
- ✅ **Botón limpiar** - Resetea todas las selecciones fácilmente
- ✅ **Ver más/menos** - Colapsa listas largas con expansión controlada
- ✅ **Integración con FilterChips** - Compatible con el sistema de chips
- ✅ **Chips individuales** - Emite un chip por cada selección individual
- ✅ **TypeScript** - Completamente tipado
- ✅ **Accesible** - Labels y navegación por teclado

## Uso Básico

```tsx
import { CheckboxFilter, CheckboxOption } from "@/components/shared/CheckboxFilter";

function MyFilterComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [outputString, setOutputString] = useState<string>("");

  const options: CheckboxOption[] = [
    { value: "wifi", label: "WiFi gratuito" },
    { value: "parking", label: "Estacionamiento" },
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
  ];

  return (
    <CheckboxFilter
      label="Servicios del hotel"
      options={options}
      selectedValues={selectedValues}
      onChange={setSelectedValues}
      onOutputStringChange={setOutputString}
    />
  );
}
```

## Props

### CheckboxFilterProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | - | Etiqueta principal del filtro |
| `options` | `CheckboxOption[]` | - | Array de opciones disponibles |
| `selectedValues` | `string[]` | - | Valores seleccionados actuales |
| `onChange` | `(selectedValues: string[]) => void` | - | Función cuando cambian las selecciones |
| `onOutputStringChange?` | `(outputString: string) => void` | - | Función cuando cambia el output string |
| `onIndividualChipsChange?` | `(chips: Array<{id: string, label: string, onRemove: () => void}>) => void` | - | Función para integración con chips individuales |
| `maxSelections?` | `number` | - | Máximo número de selecciones permitidas |
| `initialVisibleCount?` | `number` | `3` | Número inicial de opciones visibles antes del "Ver más" |
| `showMoreText?` | `string` | `"Ver más"` | Texto del botón para expandir opciones |
| `showLessText?` | `string` | `"Ver menos"` | Texto del botón para contraer opciones |
| `disabled?` | `boolean` | `false` | Desactivar todo el componente |
| `className?` | `string` | - | Clases adicionales para el contenedor |
| `emptyText?` | `string` | `"Ninguna opción seleccionada"` | Texto cuando no hay selecciones |
| `showCounts?` | `boolean` | `false` | Mostrar contadores en las opciones |

### CheckboxOption Interface

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `value` | `string` | Valor único del checkbox |
| `label` | `string` | Texto que se muestra al usuario |
| `disabled?` | `boolean` | Si el checkbox está deshabilitado |
| `count?` | `number` | Información adicional o contador |

## Lógica del Output String

El componente genera automáticamente un string descriptivo basado en las selecciones:

- **0 selecciones**: String vacío `""`
- **1 selección**: `"WiFi"`
- **2 selecciones**: `"WiFi y Piscina"`
- **3 selecciones**: `"WiFi, Piscina y Gimnasio"`
- **4+ selecciones**: `"WiFi, Piscina y 2 más"`

## Ejemplos de Uso

### Servicios de Hotel

```tsx
const amenitiesOptions: CheckboxOption[] = [
  { value: "wifi", label: "WiFi gratuito", count: 145 },
  { value: "parking", label: "Estacionamiento", count: 98 },
  { value: "pool", label: "Piscina", count: 67 },
  { value: "gym", label: "Gimnasio", count: 43 },
];

<CheckboxFilter
  label="Servicios disponibles"
  options={amenitiesOptions}
  selectedValues={selectedAmenities}
  onChange={setSelectedAmenities}
  onOutputStringChange={setAmenitiesOutput}
  showCounts={true}
  maxSelections={5}
/>
```

### Filtro de Ubicación

```tsx
const locationOptions: CheckboxOption[] = [
  { value: "centro", label: "Centro de la ciudad", count: 120 },
  { value: "playa", label: "Cerca de la playa", count: 85 },
  { value: "aeropuerto", label: "Cerca del aeropuerto", count: 45 },
];

<CheckboxFilter
  label="Zonas de interés"
  options={locationOptions}
  selectedValues={selectedLocations}
  onChange={setSelectedLocations}
  maxSelections={3}
  showCounts={true}
/>
```

### Calificaciones

```tsx
const ratingOptions: CheckboxOption[] = [
  { value: "5", label: "⭐⭐⭐⭐⭐ (5 estrellas)", count: 28 },
  { value: "4", label: "⭐⭐⭐⭐ (4 estrellas)", count: 156 },
  { value: "3", label: "⭐⭐⭐ (3 estrellas)", count: 89 },
];

<CheckboxFilter
  label="Calificaciones mínimas"
  options={ratingOptions}
  selectedValues={selectedRatings}
  onChange={setSelectedRatings}
  showCounts={true}
/>
```

### Con Opciones Deshabilitadas

```tsx
const featureOptions: CheckboxOption[] = [
  { value: "breakfast", label: "Desayuno incluido" },
  { value: "cancellation", label: "Cancelación gratuita" },
  { value: "pets", label: "Se admiten mascotas", disabled: true },
  { value: "smoking", label: "Permite fumar", disabled: true },
];

<CheckboxFilter
  label="Características especiales"
  options={featureOptions}
  selectedValues={selectedFeatures}
  onChange={setSelectedFeatures}
/>
```

### Con Funcionalidad "Ver más/menos"

Para listas largas de opciones, el componente incluye funcionalidad para mostrar/ocultar opciones adicionales:

```tsx
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
  // ... más países
];

<CheckboxFilter
  label="Destinos disponibles"
  options={countryOptions}
  selectedValues={selectedCountries}
  onChange={setSelectedCountries}
  showCounts={true}
  initialVisibleCount={4}
  showMoreText="Ver más países"
  showLessText="Ver menos países"
/>
```

**Comportamiento del "Ver más/menos":**
- Muestra inicialmente `initialVisibleCount` opciones (por defecto 3)
- Si hay más opciones disponibles, muestra el botón "Ver más"
- Al expandir, muestra todas las opciones y cambia a "Ver menos"
- Los textos de los botones son completamente personalizables

## Integración con FilterChips

```tsx
function SearchWithMultipleFilters() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [amenitiesOutput, setAmenitiesOutput] = useState<string>("");
  const [priceOutput, setPriceOutput] = useState<string>("");

  const generateActiveFilters = (): FilterChip[] => {
    const filters: FilterChip[] = [];

    if (amenitiesOutput) {
      filters.push({
        id: "amenities",
        label: "Servicios",
        value: amenitiesOutput,
        onRemove: () => setSelectedAmenities([]),
      });
    }

    if (priceOutput) {
      filters.push({
        id: "price",
        label: "Precio",
        value: priceOutput,
        onRemove: resetPriceFilter,
      });
    }

    return filters;
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <CheckboxFilter
        label="Servicios"
        options={amenitiesOptions}
        selectedValues={selectedAmenities}
        onChange={setSelectedAmenities}
        onOutputStringChange={setAmenitiesOutput}
      />

      {/* Chips de filtros activos */}
      <FilterChips
        filters={generateActiveFilters()}
        onClearAll={() => {
          setSelectedAmenities([]);
          // resetear otros filtros...
        }}
      />
    </div>
  );
}
```

## Estados y Comportamiento

### Límite de Selecciones
```tsx
// Máximo 3 selecciones
<CheckboxFilter
  maxSelections={3}
  // ... otras props
/>
```

### Con Contadores
```tsx
// Muestra cantidad de resultados
<CheckboxFilter
  showCounts={true}
  options={[
    { value: "wifi", label: "WiFi", count: 45 },
    // ...
  ]}
/>
```

### Estado Deshabilitado
```tsx
// Todo el componente deshabilitado
<CheckboxFilter
  disabled={true}
  // ... otras props
/>
```

## Casos de Uso Comunes

- **E-commerce**: Marcas, características, categorías
- **Hoteles**: Servicios, ubicación, tipo de habitación
- **Empleos**: Tipo de trabajo, ubicación, experiencia
- **Inmuebles**: Características, ubicación, servicios
- **Restaurantes**: Tipo de cocina, servicios, ambiente

## Accesibilidad

- Labels asociados correctamente con checkboxes
- Navegación por teclado completa
- Estados disabled manejados apropiadamente
- Contraste de colores accesible
- IDs únicos para cada checkbox

## Estilo y Personalización

El componente usa los componentes base de shadcn/ui:

- `Checkbox`: Para los checkboxes individuales
- `Label`: Para las etiquetas
- Clases de Tailwind CSS para el layout
- Variables CSS del tema para colores

## Performance

- Callbacks memoizados con `useCallback`
- Re-renders optimizados
- Generación eficiente del output string
- Manejo de listas grandes sin problemas
