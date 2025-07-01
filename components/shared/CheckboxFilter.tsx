"use client";

import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  /**
   * Valor único del checkbox
   */
  value: string;
  /**
   * Texto que se muestra al usuario
   */
  label: string;
  /**
   * Si el checkbox está deshabilitado
   */
  disabled?: boolean;
  /**
   * Información adicional o contador
   */
  count?: number;
}

export interface CheckboxFilterProps {
  /**
   * Etiqueta principal del filtro
   */
  label: string;
  /**
   * Array de opciones disponibles
   */
  options: CheckboxOption[];
  /**
   * Valores seleccionados actuales
   */
  selectedValues: string[];
  /**
   * Función que se ejecuta cuando cambian las selecciones
   */
  onChange: (selectedValues: string[]) => void;
  /**
   * Función que se ejecuta cuando cambia el output string
   */
  onOutputStringChange?: (outputString: string) => void;
  /**
   * Función que se ejecuta cuando cambian los chips individuales
   */
  onIndividualChipsChange?: (chips: Array<{id: string, label: string, onRemove: () => void}>) => void;
  /**
   * Máximo número de elementos que se pueden seleccionar
   */
  maxSelections?: number;
  /**
   * Número inicial de opciones a mostrar antes del "Ver más"
   */
  initialVisibleCount?: number;
  /**
   * Texto del botón "Ver más"
   */
  showMoreText?: string;
  /**
   * Texto del botón "Ver menos"
   */
  showLessText?: string;
  /**
   * Desactivar todo el componente
   */
  disabled?: boolean;
  /**
   * Clases adicionales para el contenedor
   */
  className?: string;
  /**
   * Texto que se muestra cuando no hay selecciones
   */
  emptyText?: string;
  /**
   * Mostrar contadores en las opciones
   */
  showCounts?: boolean;
}

const CheckboxFilter = React.forwardRef<HTMLDivElement, CheckboxFilterProps>(
  (
    {
      label,
      options,
      selectedValues,
      onChange,
      onOutputStringChange,
      onIndividualChipsChange,
      maxSelections,
      initialVisibleCount = 3,
      showMoreText = "Ver más",
      showLessText = "Ver menos",
      disabled = false,
      className,
      emptyText = "Ninguna opción seleccionada",
      showCounts = false,
    },
    ref
  ) => {
    // Estado para controlar la expansión
    const [isExpanded, setIsExpanded] = useState(false);

    // Determinar qué opciones mostrar
    const visibleOptions = isExpanded 
      ? options 
      : options.slice(0, initialVisibleCount);
    
    // Verificar si necesitamos botón "Ver más"
    const needsShowMore = options.length > initialVisibleCount;
    // Generar chips individuales para cada selección
    const generateIndividualChips = useCallback((values: string[]) => {
      return values.map(value => {
        const option = options.find(opt => opt.value === value);
        return {
          id: `${label.toLowerCase().replace(/\s+/g, '-')}-${value}`,
          label: option?.label || value,
          onRemove: () => {
            const newValues = values.filter(v => v !== value);
            onChange(newValues);
          }
        };
      });
    }, [options, label, onChange]);

    // Generar output string basado en selecciones
    const generateOutputString = useCallback((values: string[]) => {
      if (values.length === 0) return "";
      if (values.length === 1) {
        const option = options.find(opt => opt.value === values[0]);
        return option?.label || values[0];
      }
      if (values.length === 2) {
        const option1 = options.find(opt => opt.value === values[0])?.label || values[0];
        const option2 = options.find(opt => opt.value === values[1])?.label || values[1];
        return `${option1} y ${option2}`;
      }
      if (values.length <= 3) {
        const labels = values.map(value => options.find(opt => opt.value === value)?.label || value);
        return `${labels.slice(0, -1).join(", ")} y ${labels[labels.length - 1]}`;
      }
      const firstTwo = values.slice(0, 2).map(value => options.find(opt => opt.value === value)?.label || value);
      return `${firstTwo.join(", ")} y ${values.length - 2} más`;
    }, [options]);

    // Efecto para notificar cambios en el output string
    React.useEffect(() => {
      if (onOutputStringChange) {
        const outputString = generateOutputString(selectedValues);
        onOutputStringChange(outputString);
      }
    }, [selectedValues, generateOutputString]); // Removido onOutputStringChange de dependencies

    // Efecto para notificar cambios en los chips individuales
    React.useEffect(() => {
      if (onIndividualChipsChange) {
        const chips = generateIndividualChips(selectedValues);
        onIndividualChipsChange(chips);
      }
    }, [selectedValues, generateIndividualChips]); // Removido onIndividualChipsChange de dependencies

    // Manejar cambio de checkbox individual
    const handleCheckboxChange = useCallback((value: string, checked: boolean) => {
      if (disabled) return;

      let newSelectedValues: string[];
      
      if (checked) {
        // Agregar valor
        if (maxSelections && selectedValues.length >= maxSelections) {
          // Si ya se alcanzó el máximo, no agregar más
          return;
        }
        newSelectedValues = [...selectedValues, value];
      } else {
        // Remover valor
        newSelectedValues = selectedValues.filter(v => v !== value);
      }

      onChange(newSelectedValues);
    }, [disabled, maxSelections, selectedValues, onChange]);

    // Limpiar todas las selecciones
    const clearAll = useCallback(() => {
      if (disabled) return;
      onChange([]);
    }, [disabled, onChange]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col gap-4",
          className
        )}
      >
        {/* Header con label y botón limpiar */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">
            {label}
          </Label>
          {selectedValues.length > 0 && (
            <button
              onClick={clearAll}
              disabled={disabled}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Opciones */}
        <div className="space-y-3">
          {visibleOptions.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const isDisabled = disabled || option.disabled || 
              (maxSelections && !isSelected && selectedValues.length >= maxSelections);

            return (
              <div
                key={option.value}
                className="flex items-center space-x-3"
              >
                <Checkbox
                  id={`${label}-${option.value}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(option.value, checked === true)
                  }
                  disabled={Boolean(isDisabled)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`${label}-${option.value}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1 flex items-center justify-between",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    isSelected && "font-medium"
                  )}
                >
                  <span>{option.label}</span>
                  {showCounts && option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>

        {/* Botón Ver más / Ver menos */}
        {needsShowMore && (
          <div className="flex justify-start">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              disabled={disabled}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 font-normal hover:underline"
            >
              {isExpanded ? showLessText : showMoreText}
            </button>
          </div>
        )}

        {/* Estado vacío */}
        {options.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-4">
            No hay opciones disponibles
          </div>
        )}

        {/* Información adicional */}
        {maxSelections && (
          <div className="text-xs text-muted-foreground">
            {selectedValues.length} de {maxSelections} seleccionados
          </div>
        )}

        {/* Debug info (solo en desarrollo) */}
        {/* {process.env.NODE_ENV === 'development' && selectedValues.length > 0 && (
          <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
            <strong>Seleccionados:</strong> {selectedValues.join(", ")}
          </div>
        )} */}
      </div>
    );
  }
);

CheckboxFilter.displayName = "CheckboxFilter";

export { CheckboxFilter };
