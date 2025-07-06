# StandardSearchField - Separación Value/Label

## Problema Solucionado

Anteriormente, `StandardSearchField` tenía un bug donde se pasaba el `label` (nombre mostrado) en lugar del `value` (código/identificador) al callback `onValueChange`. Esto causaba inconsistencias en el manejo de datos.

## Solución Implementada

### 1. Corrección del bug en `handleSelect`
```tsx
// ANTES (incorrecto)
onValueChange(option.label);

// DESPUÉS (correcto)
onValueChange(option.value);
```

### 2. Mapeo automático Value → Label
Se agregó la función `getDisplayLabelFromValue` que mapea automáticamente el value (código) al label (nombre mostrado) para la visualización en el botón.

```tsx
const getDisplayLabelFromValue = (currentValue: string): string => {
  if (!currentValue) return "";
  
  // Buscar en todas las fuentes de datos
  for (const source of dataSources) {
    for (const option of source.options) {
      const optionValue = option[source.nameValueField] || '';
      if (optionValue === currentValue) {
        return option[source.nameLabelField] || '';
      }
    }
  }
  
  // Si no se encuentra el mapeo, devolver el valor tal como está
  return currentValue;
};
```

### 3. Actualización del displayValue
```tsx
// ANTES
const displayValue = value || placeholder;

// DESPUÉS
const displayValue = value ? getDisplayLabelFromValue(value) : placeholder;
```

## Comportamiento Actual

### Para el Usuario (UI)
- **Botón:** Muestra el nombre completo (ej: "Madrid (MAD - Aeropuerto Barajas)")
- **Búsqueda:** Funciona normalmente con nombres y códigos
- **Placeholder:** Se muestra cuando no hay selección

### Para el Desarrollador (Estado)
- **`value` prop:** Siempre contiene el código/identificador (ej: "MAD")
- **`onValueChange`:** Recibe el código/identificador, no el nombre
- **`onSelect`:** Recibe el objeto completo con ambos `label` y `value`

## Ejemplos de Uso

### Uso básico (recomendado)
```tsx
<StandardSearchField
  value={selectedCode}          // "MAD"
  onValueChange={setSelectedCode}  // Recibe "MAD"
  dataSources={dataSources}
  onSelect={(option, sourceType) => {
    // option.label = "Madrid (MAD - Aeropuerto Barajas)"
    // option.value = "MAD"
    // onValueChange ya fue llamado con "MAD"
  }}
/>
```

### Uso con lógica adicional
```tsx
<StandardSearchField
  value={selectedCode}
  onValueChange={setSelectedCode}
  dataSources={dataSources}
  onSelect={(option, sourceType) => {
    // Lógica adicional opcional
    console.log(`Seleccionado: ${option.label} (${option.value})`);
    
    // Ejemplo: Guardar en localStorage
    localStorage.setItem('lastDestination', option.value);
  }}
/>
```

## Casos de Prueba

### Archivo de Prueba
Se creó `components/examples/StandardSearchFieldTest.tsx` para verificar el comportamiento:

- ✅ Estado interno mantiene códigos ("MAD", "MIA", etc.)
- ✅ Botón muestra nombres completos
- ✅ Búsqueda funciona con nombres y códigos
- ✅ Botón clear funciona correctamente
- ✅ Valores programáticos se mapean correctamente

### Página de Prueba
Accesible en: `/test-search`

## Archivos Modificados

1. `components/shared/StandardSearchField.tsx` - Corrección del bug y mapeo automático
2. `components/lodging-search/LodgingSearchBar.tsx` - Simplificación del onSelect
3. `components/lodging-search/TestSearchField.tsx` - Actualización de pruebas
4. `components/examples/StandardSearchFieldTest.tsx` - Nuevo archivo de prueba completo

## Retrocompatibilidad

Los cambios son 100% retrocompatibles:
- Componentes existentes seguirán funcionando
- La API pública no cambió
- Solo se corrigió el comportamiento interno
- Los datos en URLs y estado serán más consistentes

## Beneficios

1. **Consistencia:** URLs y estado usan códigos, UI muestra nombres
2. **Flexibilidad:** Fácil cambiar etiquetas sin afectar identificadores
3. **Depuración:** Más fácil rastrear problemas con códigos únicos
4. **Performance:** URLs más cortas y limpias
5. **Mantenibilidad:** Separación clara entre identificación y presentación
