# Sincronización de Campos de Búsqueda - TravelOptionsTabs & SearchBoxOverlay

## Overview
Se ha implementado una sincronización bidireccional entre los campos de origen y destino de `TravelOptionsTabs` y `SearchBoxOverlay`, permitiendo que ambos componentes compartan el mismo estado y fuentes de datos.

## 🔄 Arquitectura de Sincronización

### **Estado Elevado al Padre (LandingSkeleton)**
El estado compartido se maneja en `LandingSkeleton` como componente padre común:

```tsx
// Estados compartidos para origen y destino
const [travelingFrom, setTravelingFrom] = useState<string>("");
const [goingTo, setGoingTo] = useState<string>("");

// Fuentes de datos compartidas
const searchDataSources = [
  // ... configuración de aeropuertos, ciudades, hoteles, etc.
];
```

### **Flujo de Datos**

```
LandingSkeleton (Estado Principal)
├── SearchBoxOverlay (Props Controladas)
│   ├── originValue={travelingFrom}
│   ├── onOriginValueChange={setTravelingFrom}
│   ├── destinationValue={goingTo}
│   └── onDestinationValueChange={setGoingTo}
└── TravelOptionsSection
    └── TravelOptionsTabs (Props Controladas)
        ├── travelingFrom={travelingFrom}
        ├── setTravelingFrom={setTravelingFrom}
        ├── goingTo={goingTo}
        ├── setGoingTo={setGoingTo}
        └── searchDataSources={searchDataSources}
```

## 📡 Implementación de Sincronización

### **1. SearchBoxOverlay - Props Controladas**

#### **Interface Actualizada:**
```tsx
export default function SearchBoxOverlay({ 
  onSearch,
  dataSources = [],
  originValue,
  onOriginValueChange,
  destinationValue,
  onDestinationValueChange
}: { 
  onSearch?: (origin: string, destination: string) => void;
  dataSources?: StandardSearchDataSource[];
  originValue?: string;
  onOriginValueChange?: (value: string) => void;
  destinationValue?: string;
  onDestinationValueChange?: (value: string) => void;
})
```

#### **Sincronización con react-hook-form:**
```tsx
// Valores por defecto desde props
const { setValue, watch } = useForm({
  defaultValues: { 
    origin: originValue || "", 
    destination: destinationValue || "" 
  },
});

// Sincronización bidireccional
useEffect(() => {
  if (originValue !== undefined && originValue !== origin) {
    setValue("origin", originValue);
  }
}, [originValue, origin, setValue]);

useEffect(() => {
  if (onOriginValueChange && origin !== originValue) {
    onOriginValueChange(origin);
  }
}, [origin, onOriginValueChange, originValue]);
```

### **2. TravelOptionsTabs - Estado Híbrido**

#### **Interface Actualizada:**
```tsx
export default function TravelOptionsTabs({
  activeTab,
  setActiveTab,
  onScrollToResults,
  travelingFrom: externalTravelingFrom,
  setTravelingFrom: externalSetTravelingFrom,
  goingTo: externalGoingTo,
  setGoingTo: externalSetGoingTo,
  searchDataSources: externalSearchDataSources
}: {
  // ... props existentes
  travelingFrom?: string,
  setTravelingFrom?: (value: string) => void,
  goingTo?: string,
  setGoingTo?: (value: string) => void,
  searchDataSources?: any[]
})
```

#### **Estados Locales con Sincronización:**
```tsx
// Estados locales que se sincronizan con externos
const [travelingFrom, setTravelingFrom] = useState<string>(externalTravelingFrom || "")
const [goingTo, setGoingTo] = useState<string>(externalGoingTo || "")

// Sincronización de entrada (externo -> local)
useEffect(() => {
  if (externalTravelingFrom !== undefined && externalTravelingFrom !== travelingFrom) {
    setTravelingFrom(externalTravelingFrom);
  }
}, [externalTravelingFrom, travelingFrom]);

// Sincronización de salida (local -> externo)
useEffect(() => {
  if (externalSetTravelingFrom && travelingFrom !== externalTravelingFrom) {
    externalSetTravelingFrom(travelingFrom);
  }
}, [travelingFrom, externalSetTravelingFrom, externalTravelingFrom]);
```

## ✨ Características de la Sincronización

### **🔄 Bidireccional**
- **SearchBoxOverlay → TravelOptionsTabs**: Cambios en el overlay se reflejan en las tabs
- **TravelOptionsTabs → SearchBoxOverlay**: Cambios en las tabs se reflejan en el overlay

### **🎯 Tiempo Real**
- **Inmediato**: Los cambios se propagan instantáneamente
- **Sin Conflictos**: Evita loops infinitos con validaciones condicionales

### **🛡️ Robusto**
- **Backward Compatible**: Los componentes funcionan independientemente si no reciben props externas
- **Validaciones**: Previene actualizaciones innecesarias y conflictos de estado

### **📊 Fuentes de Datos Compartidas**
- **Consistencia**: Ambos componentes usan las mismas opciones de búsqueda
- **Centralizado**: Una sola fuente de verdad para aeropuertos, ciudades, hoteles, etc.

## 🎮 Experiencia de Usuario

### **Flujo de Uso:**
1. **Usuario escribe en SearchBoxOverlay** → Valor se actualiza en TravelOptionsTabs
2. **Usuario selecciona en TravelOptionsTabs** → Valor se actualiza en SearchBoxOverlay
3. **Función Swap** → Intercambia valores en ambos componentes simultáneamente
4. **Búsqueda** → Ambos componentes tienen los mismos valores finales

### **Casos de Uso:**
- **Landing Page**: Usuario interactúa con el overlay sticky
- **Navigation**: Usuario ajusta valores en las tabs principales
- **Consistency**: Los valores persisten entre interacciones

## 🔧 Configuración de Datos

### **Estructura de searchDataSources:**
```tsx
const searchDataSources = [
  {
    id: "recent",
    label: "Búsquedas recientes", 
    icon: <Clock className="h-4 w-4" />,
    type: "recent" as const,
    nameLabelField: "destination",
    nameValueField: "searchId", 
    nameDescriptionField: "period",
    options: [...]
  },
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "name",
    nameValueField: "code",
    nameDescriptionField: "city",
    options: [...]
  },
  // ... más fuentes
];
```

## 🚀 Beneficios

### **Para el Usuario:**
- **Experiencia Fluida**: Los valores se mantienen sincronizados
- **Menos Frustración**: No hay que volver a escribir información
- **Interfaz Intuitiva**: Cambios visibles en tiempo real

### **Para el Desarrollador:**
- **Código Limpio**: Estado centralizado y bien organizado
- **Mantenibilidad**: Fácil agregar nuevas funcionalidades
- **Debugging**: Estado predecible y rastreable

### **Para el Negocio:**
- **Mejor UX**: Reduce abandono por re-escritura de datos
- **Consistencia**: Misma experiencia en diferentes partes de la app
- **Flexibilidad**: Fácil agregar nuevos puntos de sincronización

## 🔍 Testing

### **Casos de Prueba:**
1. **Escritura en SearchBoxOverlay** → Verificar actualización en TravelOptionsTabs
2. **Selección en TravelOptionsTabs** → Verificar actualización en SearchBoxOverlay
3. **Función Swap** → Verificar intercambio en ambos componentes
4. **Navegación entre componentes** → Verificar persistencia de valores
5. **Búsqueda** → Verificar que ambos componentes envían los mismos datos

Esta implementación garantiza una experiencia de usuario cohesiva y un código mantenible para la sincronización de campos de búsqueda entre componentes.
