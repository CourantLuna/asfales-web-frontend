# Detección de Límites de Elementos Sticky

Este documento explica cómo detectar cuando un elemento sticky llega a su límite inferior y cambiar estilos dinámicamente.

## Hook Personalizado: `useStickyBoundary`

### Ubicación
`/hooks/useStickyBoundary.tsx`

### Propósito
Detecta cuando un elemento sticky llega al límite inferior de su contenedor padre y proporciona un estado booleano para cambiar estilos condicionalmente.

### Uso Básico

```tsx
import { useStickyBoundary } from "@/hooks/useStickyBoundary";

function MyComponent() {
  const { containerRef, stickyRef, isAtBottom } = useStickyBoundary({ 
    threshold: 10, 
    debug: true 
  });

  return (
    <div ref={containerRef} className="min-h-screen">
      <div 
        ref={stickyRef} 
        className={`sticky top-0 ${isAtBottom ? 'at-bottom-styles' : ''}`}
      >
        Contenido sticky
      </div>
    </div>
  );
}
```

### Opciones de Configuración

| Opción    | Tipo      | Default | Descripción |
|-----------|-----------|---------|-------------|
| threshold | `number`  | 10      | Distancia en píxeles para detectar proximidad al límite |
| debug     | `boolean` | false   | Habilita logs de depuración en consola |

### Cómo Funciona

1. **IntersectionObserver**: Método principal que detecta cuando el elemento sticky se intersecta con los límites del contenedor
2. **Scroll Listener**: Método de respaldo que escucha eventos de scroll y calcula posiciones manualmente
3. **Estado Reactivo**: El hook retorna un estado booleano que se actualiza automáticamente

## Implementación en SearchBoxOverlay

### Integración
```tsx
// Hook personalizado para detectar sticky boundary
const { containerRef, stickyRef, isAtBottom: isStickyAtBottom } = useStickyBoundary({ 
  threshold: 10, 
  debug: process.env.NODE_ENV === 'development'
});

// Aplicar clases condicionales para layout y espaciado
<div 
  className={`flex flex-col lg:flex-row items-center gap-y-4 lg:gap-y-0 lg:gap-x-6 w-full max-w-7xl mb-0 transition-all duration-300 ${
    isStickyAtBottom 
      ? 'justify-start px-16 md:px-12'  // Cambiar alineación y añadir padding
      : 'justify-center'      // Alineación normal
  }`}
>
```

### Estilos CSS

En `/styles/landingStyles.css`:

```css
/* Estilos aplicados cuando el sticky llega al límite */
.sticky-at-bottom .search-field {
  /* Solo cambiar el borde a color muted de Tailwind */
  border: 1px solid hsl(var(--muted));
}

/* Transiciones suaves para todos los cambios */
.sticky-at-bottom * {
  transition: all 0.3s ease-in-out;
}
```

## Casos de Uso

### 1. Cambiar Alineación y Espaciado (Implementado)
```tsx
<div className={`flex ${isAtBottom ? 'justify-start px-16 md:px-12' : 'justify-center'}`}>
  Contenido que cambia de posición
</div>
```

### 2. Cambiar Borde (Implementado)
```css
.sticky-at-bottom .search-field {
  border: 1px solid hsl(var(--muted));
}
```

### 3. Otros Casos Posibles
```css
/* Cambiar solo el color del texto */
.sticky-at-bottom {
  color: hsl(var(--muted-foreground));
}

/* Cambiar solo el fondo del borde */
.sticky-at-bottom {
  border-color: hsl(var(--border));
}
```

## Optimizaciones de Rendimiento

### 1. IntersectionObserver
- Usa IntersectionObserver como método principal para mejor rendimiento
- Más eficiente que escuchar scroll events constantemente

### 2. Passive Event Listeners
- Los scroll listeners usan la opción `{ passive: true }`
- Mejora el rendimiento al no bloquear el hilo principal

### 3. Estado Condicional
- Solo actualiza el estado cuando realmente cambia
- Evita re-renders innecesarios

### 4. Cleanup
- Limpia observers y event listeners en el cleanup del useEffect
- Previene memory leaks

## Debug y Desarrollo

### Habilitar Debug
```tsx
const { containerRef, stickyRef, isAtBottom } = useStickyBoundary({ 
  debug: process.env.NODE_ENV === 'development'
});
```

### Logs de Consola
Cuando debug está habilitado, verás logs como:
```
Sticky boundary state changed: at bottom
Sticky boundary state changed: not at bottom
```

## Consideraciones

### 1. Threshold
- Ajusta el threshold según tus necesidades
- Valores más altos detectan "proximidad" antes
- Valores más bajos requieren mayor precisión

### 2. CSS Transitions
- Añade transiciones CSS para cambios suaves
- Considera el rendimiento en dispositivos móviles

### 3. Responsive Design
- Los cálculos funcionan en todos los tamaños de pantalla
- Considera diferentes umbrales para diferentes breakpoints

### 4. Compatibilidad
- IntersectionObserver es compatible con navegadores modernos
- El fallback con scroll funciona en navegadores más antiguos
