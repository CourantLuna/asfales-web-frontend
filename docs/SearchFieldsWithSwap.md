# SearchFieldsWithSwap

Un componente reutilizable que combina dos campos de búsqueda con un botón de intercambio y opcionalmente un botón de búsqueda. Ideal para formularios de búsqueda de viajes, rutas, o cualquier escenario donde se necesite intercambiar origen y destino.

## Características

- ✅ **Campos de búsqueda duales** con funcionalidad completa de `StandardSearchField`
- ✅ **Botón de intercambio** con iconos diferentes para desktop (horizontal) y móvil (vertical)
- ✅ **Completamente personalizable** - colores, textos, comportamientos
- ✅ **Responsive** - se adapta automáticamente a diferentes tamaños de pantalla
- ✅ **Botón de búsqueda opcional** con texto personalizable
- ✅ **Manejo de intercambio personalizado** para lógica adicional
- ✅ **Soporte completo de TypeScript** con tipos bien definidos

## Ventajas del Mapeo Dinámico

✅ **Flexibilidad Total**: Puedes usar cualquier estructura de datos sin reformatear  
✅ **Reutilización**: El mismo componente funciona con APIs diferentes  
✅ **Mantenimiento**: No necesitas transformar datos, solo especificas los campos  
✅ **Tipado**: TypeScript inferirá los tipos de tus datos originales  

### Casos de Uso Comunes

```tsx
// Datos de una API de aeropuertos
{
  id: "airports-api",
  label: "Aeropuertos",
  icon: <Plane />,
  type: "airport",
  nameLabelField: "airport_name",     // Campo de la API
  nameValueField: "iata_code",        // Campo de la API  
  nameDescriptionField: "city_name",  // Campo de la API
  options: apiResponse.airports       // Datos directos de la API
}

// Datos de búsquedas recientes del localStorage
{
  id: "recent-searches", 
  label: "Recientes",
  icon: <Clock />,
  type: "recent",
  nameLabelField: "displayText",      // Campo personalizado
  nameValueField: "searchId",         // Campo personalizado
  nameDescriptionField: "timestamp",  // Campo personalizado
  options: JSON.parse(localStorage.getItem("searches") || "[]")
}
```

## Uso Básico

```tsx
import { SearchFieldsWithSwap } from "@/components/shared/SearchFieldsWithSwap";

function MyComponent() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <SearchFieldsWithSwap
      originValue={origin}
      onOriginValueChange={setOrigin}
      destinationValue={destination}
      onDestinationValueChange={setDestination}
      dataSources={searchDataSources}
      onSearch={() => console.log("Buscar viajes")}
    />
  );
}
```

### StandardSearchDataSource

El componente ahora soporta mapeo dinámico de campos para máxima flexibilidad:

```tsx
type StandardSearchDataSource = {
  id: string;                    // Identificador único
  label: string;                 // Etiqueta del grupo
  icon: React.ReactNode;         // Icono compartido por todas las opciones
  type: 'recent' | 'airport' | 'hotel' | 'city' | 'custom';
  options: any[];               // Datos sin formatear
  nameLabelField: string;       // Campo para el texto mostrado
  nameValueField: string;       // Campo para el valor interno
  nameDescriptionField?: string; // Campo para la descripción (opcional)
}
```

### Ejemplo de Datos

```tsx
const searchDataSources = [
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport",
    nameLabelField: "name",           // Tomará el campo "name" como label
    nameValueField: "code",           // Tomará el campo "code" como value
    nameDescriptionField: "city",     // Tomará el campo "city" como descripción
    options: [
      { name: "Madrid (MAD - Aeropuerto Barajas)", code: "mad", city: "Capital de España" },
      { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "bcn", city: "Ciudad mediterránea" },
    ]
  },
  {
    id: "hotels", 
    label: "Hoteles",
    icon: <Building className="h-4 w-4" />,
    type: "hotel",
    nameLabelField: "hotelName",      // Campo personalizado para el nombre
    nameValueField: "hotelId",        // Campo personalizado para el ID
    nameDescriptionField: "location", // Campo personalizado para ubicación
    options: [
      { hotelName: "Hotel Ritz Madrid", hotelId: "ritz-mad", location: "Centro de Madrid" },
      { hotelName: "Hotel W Barcelona", hotelId: "w-bcn", location: "Playa de Barcelona" },
    ]
  }
];
```

## Props

### Requeridas

| Prop | Tipo | Descripción |
|------|------|-------------|
| `originValue` | `string` | Valor actual del campo de origen |
| `onOriginValueChange` | `(value: string) => void` | Función para actualizar el valor del origen |
| `destinationValue` | `string` | Valor actual del campo de destino |
| `onDestinationValueChange` | `(value: string) => void` | Función para actualizar el valor del destino |
| `dataSources` | `StandardSearchDataSource[]` | Fuentes de datos para los campos de búsqueda |

### Opcionales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `originLabel` | `string` | `"Origen"` | Label del campo de origen |
| `originPlaceholder` | `string` | `"¿Dónde empieza tu aventura?"` | Placeholder del campo de origen |
| `destinationLabel` | `string` | `"Destino"` | Label del campo de destino |
| `destinationPlaceholder` | `string` | `"¿A dónde quieres ir?"` | Placeholder del campo de destino |
| `onOriginSelect` | `(option: any, sourceType: string) => void` | - | Callback cuando se selecciona una opción en origen |
| `onDestinationSelect` | `(option: any, sourceType: string) => void` | - | Callback cuando se selecciona una opción en destino |
| `onSwap` | `() => void` | - | Función simple de intercambio |
| `customSwapHandler` | `() => void` | - | Función personalizada de intercambio con lógica adicional |
| `showClearButton` | `boolean` | `true` | Mostrar botón de limpiar en los campos |
| `minSearchLength` | `number` | `0` | Longitud mínima para activar búsqueda |
| `disabled` | `boolean` | `false` | Desactivar todos los campos |
| `showSearchButton` | `boolean` | `true` | Mostrar botón de búsqueda |
| `searchButtonText` | `string` | `"Buscar Opciones de Viaje"` | Texto del botón de búsqueda |
| `onSearch` | `() => void` | - | Callback del botón de búsqueda |
| `swapButtonColor` | `string` | `"#FFA500"` | Color del botón de intercambio |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Espaciado entre elementos |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Orientación en desktop |

### Clases CSS

| Prop | Descripción |
|------|-------------|
| `containerClassName` | Clases adicionales para el contenedor principal |
| `swapButtonClassName` | Clases adicionales para el botón de intercambio |
| `searchButtonClassName` | Clases adicionales para el botón de búsqueda |

## Ejemplos

### Ejemplo Básico
```tsx
<SearchFieldsWithSwap
  originValue={origin}
  onOriginValueChange={setOrigin}
  destinationValue={destination}
  onDestinationValueChange={setDestination}
  dataSources={dataSources}
  onSearch={() => handleSearch()}
/>
```

### Ejemplo Personalizado
```tsx
<SearchFieldsWithSwap
  originLabel="Desde"
  destinationLabel="Hacia"
  originValue={origin}
  onOriginValueChange={setOrigin}
  destinationValue={destination}
  onDestinationValueChange={setDestination}
  dataSources={dataSources}
  searchButtonText="Buscar Vuelos"
  swapButtonColor="#10B981"
  gap="lg"
  onSearch={() => handleFlightSearch()}
/>
```

### Ejemplo con Intercambio Personalizado
```tsx
<SearchFieldsWithSwap
  originValue={origin}
  onOriginValueChange={setOrigin}
  destinationValue={destination}
  onDestinationValueChange={setDestination}
  dataSources={dataSources}
  customSwapHandler={() => {
    // Lógica personalizada
    console.log("Intercambiando con analytics...");
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    // Enviar evento de analytics, validaciones, etc.
  }}
/>
```

### Ejemplo Compacto (Sin Botón de Búsqueda)
```tsx
<SearchFieldsWithSwap
  originValue={origin}
  onOriginValueChange={setOrigin}
  destinationValue={destination}
  onDestinationValueChange={setDestination}
  dataSources={dataSources}
  showSearchButton={false}
  gap="sm"
/>
```

## Comportamiento del Intercambio

El componente ofrece tres formas de manejar el intercambio:

1. **Por defecto**: Si no se proporciona `onSwap` ni `customSwapHandler`, intercambia automáticamente los valores
2. **Simple**: Con `onSwap` se ejecuta la función proporcionada
3. **Personalizado**: Con `customSwapHandler` se ejecuta lógica personalizada

## Responsive Design

- **Desktop**: Botón de intercambio horizontal (←→) posicionado entre los campos
- **Mobile**: Botón vertical (↑↓) centrado entre los campos
- Los campos se apilan verticalmente en pantallas pequeñas

## Dependencias

- `@/components/ui/button`
- `@/components/shared/StandardSearchField`
- `lucide-react`
- `@/lib/utils`

## Archivos Relacionados

- `SearchFieldsWithSwap.tsx` - Componente principal
- `SearchFieldsWithSwap.examples.tsx` - Ejemplos de uso
- `StandardSearchField.tsx` - Componente de campo de búsqueda subyacente
