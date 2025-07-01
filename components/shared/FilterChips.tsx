"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterChip {
  /**
   * Identificador único del filtro
   */
  id: string;
  /**
   * Etiqueta del filtro (ej: "Precio", "Ubicación", "Calificación")
   */
  label: string;
  /**
   * Valor del filtro (ej: "mayor a $100", "Centro de la ciudad", "4+ estrellas")
   */
  value: string;
  /**
   * Función que se ejecuta al remover el filtro
   */
  onRemove: () => void;
  /**
   * Variante del badge
   */
  variant?: "default" | "secondary" | "destructive" | "outline";
  /**
   * Desactivar el botón de remover
   */
  removable?: boolean;
}

export interface FilterChipsProps {
  /**
   * Array de filtros activos
   */
  filters: FilterChip[];
  /**
   * Función para limpiar todos los filtros
   */
  onClearAll?: () => void;
  /**
   * Texto del botón "Limpiar todo"
   */
  clearAllText?: string;
  /**
   * Mostrar botón "Limpiar todo" cuando hay múltiples filtros
   */
  showClearAll?: boolean;
  /**
   * Clases adicionales para el contenedor
   */
  className?: string;
  /**
   * Texto que se muestra cuando no hay filtros
   */
  emptyText?: string;
  /**
   * Mostrar texto cuando no hay filtros
   */
  showEmptyText?: boolean;
}

const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  (
    {
      filters,
      onClearAll,
      clearAllText = "Limpiar todo",
      showClearAll = true,
      className,
      emptyText = "No hay filtros activos",
      showEmptyText = false,
    },
    ref
  ) => {
    const hasFilters = filters && filters.length > 0;
    const showClearAllButton = showClearAll && hasFilters && filters.length > 1 && onClearAll;

    if (!hasFilters && !showEmptyText) {
      return null;
    }

    if (!hasFilters && showEmptyText) {
      return (
        <div ref={ref} className={cn("text-sm text-muted-foreground", className)}>
          {emptyText}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2",
          className
        )}
      >
        {/* Chips de filtros individuales */}
        {filters.map((filter) => (
          <FilterChipItem key={filter.id} {...filter} />
        ))}

        {/* Botón "Limpiar todo" */}
        {showClearAllButton && (
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={onClearAll}
          >
            {clearAllText}
          </Badge>
        )}
      </div>
    );
  }
);

FilterChips.displayName = "FilterChips";

/**
 * Componente individual para cada chip de filtro
 */
const FilterChipItem = React.forwardRef<HTMLDivElement, FilterChip>(
  (
    {
      id,
      label,
      value,
      onRemove,
      variant = "secondary",
      removable = true,
    },
    ref
  ) => {
    return (
      <Badge
        variant={variant}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5",
          removable && "pr-2"
        )}
      >
        <span className="text-xs font-medium">
          {label ? `${label}: ${value}` : value}
        </span>
        
        {removable && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="ml-1 rounded-full p-0.5 hover:bg-background/50 transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label={`Remover filtro ${label}`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </Badge>
    );
  }
);

FilterChipItem.displayName = "FilterChipItem";

export { FilterChips, FilterChipItem };
