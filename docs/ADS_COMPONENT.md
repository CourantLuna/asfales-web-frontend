# Componente Ads - Documentación

## Descripción
El componente `Ads` permite mostrar anuncios publicitarios con imágenes que redirigen a URLs específicas. Incluye soporte para diferentes layouts y manejo automático de proporciones de imagen.

## Características
- ✅ **Layouts flexibles**: `flex-row`, `flex-col`, `flex-wrap`
- ✅ **Espaciado inteligente**: Usa `space-y-*` para columnas, `space-x-*` para filas, `gap-*` para wrap
- ✅ **Dimensiones automáticas**: Mantiene proporciones al especificar solo width o height
- ✅ **Optimización de imágenes**: Usa Next.js Image para mejor performance
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Accesibilidad**: Incluye aria-labels y focus states
- ✅ **Sticky positioning**: En SearchWithFilters para mejor visibilidad

## Props del Componente Ads

```tsx
interface AdItem {
  id: string;              // Identificador único
  src: string;             // URL de la imagen
  alt: string;             // Texto alternativo
  href: string;            // URL de destino al hacer click
  width?: number;          // Ancho personalizado (opcional)
  height?: number;         // Alto personalizado (opcional)
  title?: string;          // Tooltip al hacer hover
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;      // Clases CSS adicionales
}

interface AdsProps {
  ads: AdItem[];                    // Array de anuncios
  direction?: 'row' | 'col' | 'wrap'; // Dirección del layout (default: 'col')
  gap?: number;                     // Espaciado entre elementos (default: 4)
  defaultWidth?: number;            // Ancho por defecto (default: 300)
  defaultHeight?: number;           // Alto por defecto (default: 200)
  containerClassName?: string;      // Clases para el contenedor
  itemClassName?: string;           // Clases para cada elemento
  imageClassName?: string;          // Clases para las imágenes
  priority?: boolean;               // Prioridad de carga (default: false)
  quality?: number;                 // Calidad de imagen (default: 75)
  sticky?: boolean;                 // Hace que los anuncios sean sticky (default: false)
}
```

## Integración en SearchWithFilters

```tsx
<SearchWithFilters
  // ... otras props
  ads={[
    {
      id: "ad-1",
      src: "/images/ad-hotel.jpg",
      alt: "Hotel Promoción",
      href: "https://hotel-ejemplo.com",
      title: "Descubre nuestros hoteles"
    },
    {
      id: "ad-2", 
      src: "/images/ad-vuelos.jpg",
      alt: "Vuelos Baratos",
      href: "https://vuelos-ejemplo.com",
      width: 280, // Solo width, height se calcula automáticamente
      title: "Vuelos a precios increíbles"
    }
  ]}
  adsDirection="col"
  adsGap={6}
  adsDefaultWidth={300}
  adsDefaultHeight={200}
  adsSticky={false}  // Los anuncios se mueven con el scroll
  showAds={true}
/>
```

## Ejemplos de Uso

### 1. Layout Vertical (por defecto)
```tsx
const verticalAds = [
  {
    id: "hotel-promo",
    src: "/ads/hotel-luxury.jpg", 
    alt: "Hotel de Lujo",
    href: "https://luxury-hotels.com/promo",
    title: "Hoteles de 5 estrellas"
  },
  {
    id: "flight-deals",
    src: "/ads/flight-deals.jpg",
    alt: "Ofertas de Vuelos", 
    href: "https://flights.com/deals",
    title: "Vuelos con descuento"
  }
];

<Ads ads={verticalAds} direction="col" gap={4} />
```

### 2. Layout Horizontal
```tsx
const horizontalAds = [
  {
    id: "banner-1",
    src: "/ads/banner-vacation.jpg",
    alt: "Vacaciones",
    href: "https://vacations.com",
    width: 250,
    height: 100
  },
  {
    id: "banner-2", 
    src: "/ads/banner-cruise.jpg",
    alt: "Cruceros",
    href: "https://cruises.com",
    width: 250,
    height: 100
  }
];

<Ads ads={horizontalAds} direction="row" gap={3} />
```

### 3. Layout Wrap (Responsive)
```tsx
const wrappingAds = [
  {
    id: "square-1",
    src: "/ads/square-restaurant.jpg",
    alt: "Restaurantes",
    href: "https://restaurants.com",
    width: 150,
    height: 150
  },
  {
    id: "square-2",
    src: "/ads/square-activities.jpg", 
    alt: "Actividades",
    href: "https://activities.com",
    width: 150,
    height: 150
  },
  {
    id: "square-3",
    src: "/ads/square-car-rental.jpg",
    alt: "Alquiler de Autos", 
    href: "https://car-rental.com",
    width: 150,
    height: 150
  }
];

<Ads ads={wrappingAds} direction="wrap" gap={2} />
```

## Manejo Automático de Proporciones

### Solo Width especificado
```tsx
{
  id: "auto-height",
  src: "/ads/banner.jpg",
  alt: "Banner",
  href: "https://example.com",
  width: 400  // height se calcula automáticamente manteniendo proporción
}
```

### Solo Height especificado
```tsx
{
  id: "auto-width", 
  src: "/ads/vertical.jpg",
  alt: "Vertical Ad",
  href: "https://example.com", 
  height: 300  // width se calcula automáticamente manteniendo proporción
}
```

### Ambos especificados
```tsx
{
  id: "exact-size",
  src: "/ads/exact.jpg", 
  alt: "Tamaño Exacto",
  href: "https://example.com",
  width: 300,
  height: 200  // Se usan los valores exactos especificados
}
```

## Comportamiento del Gap

El componente utiliza diferentes clases de Tailwind CSS según la dirección del layout:

- **`direction="col"`**: Usa `space-y-*` para espaciado vertical entre elementos
- **`direction="row"`**: Usa `space-x-*` para espaciado horizontal entre elementos  
- **`direction="wrap"`**: Usa `gap-*` para espaciado uniforme en grid flexible

```tsx
// Ejemplos de gap por dirección
<Ads ads={ads} direction="col" gap={4} />   // Genera: space-y-4
<Ads ads={ads} direction="row" gap={6} />   // Genera: space-x-6
<Ads ads={ads} direction="wrap" gap={3} />  // Genera: gap-3
```

### Validación de Gap
- **Rango válido**: 0-12 (escala de spacing de Tailwind)
- **Valores fuera de rango**: Se ajustan automáticamente
- **Valor por defecto**: 4

## Manejo de Dimensiones por Dirección

El componente ahora prioriza las dimensiones originales de las imágenes y adapta el contenedor, nunca distorsiona las imágenes:

### Para `direction="col"` (Columna)
- **Contenedor**: `w-auto h-full` (ancho automático, altura completa)
- **Imágenes**: Mantienen sus dimensiones exactas (width × height especificados)
- **Comportamiento**: El contenedor se adapta al ancho de las imágenes, las imágenes nunca se distorsionan

```tsx
<Ads
  ads={[
    {
      id: "ad-1",
      src: "/hotel-image.jpg",
      alt: "Hotel",
      href: "#",
      width: 300,   // Dimensión exacta
      height: 200   // Dimensión exacta
      // Resultado: imagen 300×200px, contenedor w-auto
    }
  ]}
  direction="col"
/>
```

### Para `direction="row"` (Fila)
- **Contenedor**: `w-auto h-full` (ancho automático, altura completa)  
- **Imágenes**: Mantienen sus dimensiones exactas (width × height especificados)
- **Comportamiento**: El contenedor se adapta al ancho total de las imágenes

```tsx
<Ads
  ads={[
    {
      id: "ad-1",
      src: "/banner-image.jpg",
      alt: "Banner",
      href: "#",
      width: 250,   // Dimensión exacta
      height: 150   // Dimensión exacta
      // Resultado: imagen 250×150px, contenedor w-auto
    }
  ]}
  direction="row"
/>
```

### Para `direction="wrap"` (Envolvente)
- **Contenedor**: `flex-wrap` (envolvente normal)
- **Imágenes**: Mantienen sus dimensiones exactas
- **Comportamiento**: Se adaptan flexiblemente al espacio disponible

```tsx
<Ads
  ads={[
    {
      id: "ad-1",
      src: "/square-image.jpg",
      alt: "Cuadrado",
      href: "#",
      width: 200,   // Dimensión exacta
      height: 200   // Dimensión exacta
    }
  ]}
  direction="wrap"
/>
```

### Características Clave
- **Sin distorsión**: Las imágenes nunca se deforman o estiran
- **Dimensiones exactas**: Siempre respeta width y height especificados
- **Contenedor adaptativo**: El contenedor se ajusta a las imágenes, no al revés
- **object-cover**: Mantiene la calidad visual sin cambiar las dimensiones del elemento

## Comportamiento Sticky

El componente incluye una prop `sticky` para controlar si los anuncios se mantienen fijos durante el scroll:

### Sin Sticky (Recomendado para Sidebars)
```tsx
<Ads ads={ads} sticky={false} />
```
- Los anuncios se mueven naturalmente con el contenido
- Comportamiento normal de scroll
- Ideal para sidebars y contenido que debe seguir el flujo

### Con Sticky
```tsx
<Ads ads={ads} sticky={true} />
```
- Los anuncios se mantienen fijos en `top: 1rem` durante el scroll
- Útil para anuncios que deben permanecer visibles
- Puede causar solapamiento si hay múltiples anuncios sticky

### Recomendación
Para el caso de uso en `SearchWithFilters` sidebar, se recomienda usar `sticky={false}` para evitar que los anuncios se solapen durante el scroll.

## Estilos y Personalización

### Clases CSS personalizadas
```tsx
<Ads
  ads={ads}
  containerClassName="bg-gray-50 p-4 rounded-lg"
  itemClassName="shadow-md hover:shadow-lg"
  imageClassName="border border-gray-200"
/>
```

### Responsive Design
El componente está diseñado para ser responsive:
- En `SearchWithFilters` solo se muestra en `xl:block` (pantallas extra grandes)
- Las imágenes se adaptan automáticamente al contenedor
- Usa `object-cover` para mantener proporciones sin distorsión

## Performance y Optimización

- **Next.js Image**: Optimización automática de imágenes
- **Lazy Loading**: Carga diferida por defecto
- **Priority Loading**: Configurable para anuncios importantes
- **Quality Control**: Ajustable según necesidades de bandwidth

## Accesibilidad

- **Alt text**: Requerido para cada imagen
- **Title attributes**: Para tooltips informativos
- **Focus states**: Estados de foco para navegación por teclado
- **Semantic HTML**: Usa elementos `<a>` semánticamente correctos

## Casos de Uso Comunes

1. **Sidebar de anuncios** en páginas de resultados
2. **Banners promocionales** en headers/footers  
3. **Grid de partners** en páginas de landing
4. **Anuncios inline** entre contenido
5. **Promotional cards** en dashboards
