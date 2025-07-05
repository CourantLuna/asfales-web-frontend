# SearchWithFilters - Componente de Búsqueda con Filtros

El componente `SearchWithFilters` es un componente reutilizable que proporciona funcionalidad de búsqueda y filtrado con múltiples opciones de filtros y modo de comparación opcional.

## Características

- **Búsqueda con autocompletado**: Campo de búsqueda con soporte para múltiples fuentes de datos
- **Múltiples tipos de filtros**: Checkbox, radio, rango de precios, toggle con iconos
- **Modo de comparación**: Opcional y configurable con textos personalizables
- **Filtros activos**: Chips que muestran filtros aplicados con opción de eliminar
- **Completamente personalizable**: Textos, placeholders y comportamiento configurables
- **Responsive**: Adaptado para dispositivos móviles y desktop

## Configuración del Modo de Comparación

El modo de comparación ahora se maneja como una propiedad separada, no como parte de la configuración de filtros:

```tsx
<SearchWithFilters
  // ... otras props
  enableCompareMode={true}
  compareConfig={{
    titleOff: "Comparar productos",
    subtitleOff: "Obtén una vista lado a lado de hasta 5 productos",
    titleOn: "Comparando productos",
    subtitleOn: "Selecciona productos para comparar lado a lado"
  }}
  // ... más props
/>
```

### Propiedades del Modo de Comparación

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `enableCompareMode` | `boolean` | Habilita o deshabilita el modo de comparación |
| `compareConfig` | `object` | Configuración de textos para el modo de comparación |
| `compareConfig.titleOff` | `string` | Título cuando el modo está desactivado |
| `compareConfig.subtitleOff` | `string` | Subtítulo cuando el modo está desactivado |
| `compareConfig.titleOn` | `string` | Título cuando el modo está activado |
| `compareConfig.subtitleOn` | `string` | Subtítulo cuando el modo está activado |

## Uso Básico

```tsx
import SearchWithFilters from "@/components/shared/SearchWithFilters";

const MySearchComponent = () => {
  return (
    <SearchWithFilters
      rows={myData}
      // Opciones de filtros específicos
      guestRatingOptions={guestRatingOptions}
      starRatingOptions={starRatingOptions}
      amenitiesOptions={amenitiesOptions}
      popularFiltersOptions={popularFiltersOptions}
      // Configuración de ordenamiento
      sortOptions={sortOptions}
      dataSources={dataSources}
      // Configuración de rango de precios
      priceRange={{ min: 0, max: 1000, step: 10 }}
      currency="$"
      // Modo de comparación
      enableCompareMode={true}
      compareConfig={{
        titleOff: "Comparar elementos",
        subtitleOff: "Obtén una vista lado a lado de hasta 5 elementos",
        titleOn: "Comparando elementos",
        subtitleOn: "Selecciona elementos para comparar lado a lado"
      }}
      // Textos personalizables
      searchPlaceholder="Buscar..."
      noResultsMessage="No se encontraron resultados"
      clearFiltersText="Limpiar filtros"
      sortByText="Ordenar por"
      howItWorksText="¿Cómo funciona?"
      resultsCountText={(count) => `${count}+ resultados`}
      // Renderizado de resultados
      renderResults={({ filteredRows, compareMode, onCardClick }) => (
        <div>
          {/* Tu renderizado personalizado aquí */}
        </div>
      )}
      // Callbacks
      onCardClick={(idx, row) => console.log("Clicked", idx, row)}
      onFiltersChange={(filters) => console.log("Filters changed", filters)}
    />
  );
};
```

## Propiedades Principales

### Datos
- `rows`: Array de datos a mostrar y filtrar

### Opciones de Filtros
- `guestRatingOptions`: Opciones para calificación de huéspedes (radio)
- `starRatingOptions`: Opciones para calificación por estrellas (checkbox)
- `paymentTypeOptions`: Opciones para tipo de pago (checkbox)
- `cancellationOptions`: Opciones para cancelación (checkbox)
- `propertyTypeOptions`: Opciones para tipo de propiedad (checkbox)
- `amenitiesOptions`: Opciones para amenidades (toggle con iconos)
- `popularFiltersOptions`: Opciones para filtros populares (checkbox)

### Configuración
- `sortOptions`: Opciones de ordenamiento
- `dataSources`: Fuentes de datos para búsqueda con autocompletado
- `priceRange`: Configuración del rango de precios `{ min, max, step }`
- `currency`: Símbolo de moneda para mostrar precios
- `customFilters`: Filtros personalizados adicionales

### Modo de Comparación
- `enableCompareMode`: Habilita el modo de comparación
- `compareConfig`: Configuración de textos para el modo de comparación

### Callbacks
- `renderResults`: Función para renderizar los resultados
- `onCardClick`: Callback cuando se hace click en un elemento
- `onFiltersChange`: Callback cuando cambian los filtros

### Textos Personalizables
- `searchPlaceholder`: Placeholder del campo de búsqueda
- `noResultsMessage`: Mensaje cuando no hay resultados
- `clearFiltersText`: Texto del botón limpiar filtros
- `sortByText`: Texto del selector de ordenamiento
- `howItWorksText`: Texto del enlace "¿Cómo funciona?"
- `resultsCountText`: Función para formatear el contador de resultados

## Ejemplos de Uso

### Búsqueda de Alojamiento
```tsx
<SearchWithFilters
  rows={lodgingData}
  guestRatingOptions={guestRatingOptions}
  starRatingOptions={starRatingOptions}
  amenitiesOptions={amenitiesOptions}
  propertyTypeOptions={propertyTypeOptions}
  sortOptions={sortOptions}
  dataSources={lodgingDataSources}
  priceRange={{ min: 0, max: 1000, step: 10 }}
  currency="$"
  enableCompareMode={true}
  compareConfig={{
    titleOff: "Comparar propiedades",
    subtitleOff: "Obtén una vista lado a lado de hasta 5 propiedades",
    titleOn: "Comparando propiedades",
    subtitleOn: "Selecciona propiedades para comparar lado a lado"
  }}
  searchPlaceholder="Buscar alojamiento..."
  noResultsMessage="No se encontraron propiedades"
  resultsCountText={(count) => `${count}+ alojamientos`}
  renderResults={({ filteredRows, compareMode, onCardClick }) => (
    <LodgingCardList
      rows={filteredRows}
      showCompareCheckbox={compareMode}
      onCardClick={onCardClick}
    />
  )}
/>
```

### Búsqueda de Productos
```tsx
<SearchWithFilters
  rows={productData}
  popularFiltersOptions={categoryOptions}
  guestRatingOptions={qualityOptions}
  starRatingOptions={ratingOptions}
  amenitiesOptions={featureOptions}
  sortOptions={sortOptions}
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
  resultsCountText={(count) => `${count}+ productos`}
  renderResults={({ filteredRows, compareMode, onCardClick }) => (
    <ProductGrid
      products={filteredRows}
      showCompareCheckbox={compareMode}
      onCardClick={onCardClick}
    />
  )}
/>
```

## Estructura del Componente

El componente se estructura en las siguientes secciones:

1. **Columna de Filtros (Izquierda)**: Contiene todos los filtros configurados
2. **Contenido Principal (Derecha)**:
   - Chips de filtros activos
   - Modo de comparación (si está habilitado)
   - Barra de control superior con contador y ordenamiento
   - Resultados renderizados

## Beneficios

1. **Separación de responsabilidades**: El modo de comparación está separado de los filtros
2. **Flexibilidad**: Configuración independiente del modo de comparación
3. **Reutilización**: Mismo componente para diferentes tipos de búsqueda
4. **Personalización**: Textos y comportamiento completamente configurables
5. **Mantenibilidad**: Código más limpio y fácil de mantener

## Notas Importantes

- El componente maneja el estado de filtros internamente
- Los chips de filtros se generan automáticamente
- El modo de comparación es completamente opcional
- Los textos de comparación son personalizables
- El componente es responsive y se adapta a diferentes tamaños de pantalla
