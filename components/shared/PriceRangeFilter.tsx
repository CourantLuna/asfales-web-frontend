"use client";

import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PriceRangeFilterProps {
  /**
   * Valor mínimo del rango
   */
  min: number;
  /**
   * Valor máximo del rango
   */
  max: number;
  /**
   * Valor mínimo actual seleccionado
   */
  value: [number, number];
  /**
   * Función que se ejecuta cuando cambia el rango
   */
  onChange: (value: [number, number]) => void;
  /**
   * Función que se ejecuta cuando cambia el output string
   */
  onOutputStringChange?: (outputString: string) => void;
  /**
   * Paso del slider
   */
  step?: number;
  /**
   * Etiqueta del componente
   */
  label?: string;
  /**
   * Símbolo de moneda
   */
  currency?: string;
  /**
   * Formato para mostrar valores grandes (ej: "1K+", "1M+")
   */
  formatValue?: (value: number) => string;
  /**
   * Desactivar el componente
   */
  disabled?: boolean;
  /**
   * Clases adicionales para el contenedor
   */
  containerClassName?: string;
  /**
   * Mostrar inputs de texto para edición manual
   */
  showInputs?: boolean;
}

const PriceRangeFilter = React.forwardRef<HTMLDivElement, PriceRangeFilterProps>(
  (
    {
      min,
      max,
      value,
      onChange,
      onOutputStringChange,
      step = 1,
      label = "Precio",
      currency = "$",
      formatValue,
      disabled = false,
      containerClassName,
      showInputs = true,
    },
    ref
  ) => {
    const [minValue, maxValue] = value;
    const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

    // Formatear valor para mostrar
    const defaultFormatValue = useCallback((val: number) => {
      if (formatValue) return formatValue(val);
      if (val >= 1000000) return `${currency}${(val / 1000000).toFixed(1)}M+`;
      if (val >= 1000) return `${currency}${(val / 1000).toFixed(0)}K+`;
      return `${currency}${val}`;
    }, [currency, formatValue]);

    // Generar output string dinámico
    const getOutputString = useCallback((currentMin: number, currentMax: number) => {
      // Si ambos están en los valores por defecto, output vacío
      if (currentMin === min && currentMax === max) {
        return "";
      }
      
      // Si min=0 y max < max, output es "menor a $max"
      if (currentMin === min && currentMax < max) {
        return `menor a ${defaultFormatValue(currentMax)}`;
      }
      
      // Si min > 0 y max está en el valor por defecto, output es "mayor a $min"
      if (currentMin > min && currentMax === max) {
        return `mayor a ${defaultFormatValue(currentMin)}`;
      }
      
      // Si ambos min > 0 y max < max, output es "$min a $max"
      if (currentMin > min && currentMax < max) {
        return `${defaultFormatValue(currentMin)} a ${defaultFormatValue(currentMax)}`;
      }
      
      return "";
    }, [min, max, defaultFormatValue]);

    // Efecto para notificar cambios en el output string
    React.useEffect(() => {
      if (onOutputStringChange) {
        const outputString = getOutputString(minValue, maxValue);
        onOutputStringChange(outputString);
      }
    }, [minValue, maxValue, onOutputStringChange, getOutputString]);

    // Calcular porcentajes para el slider
    const getPercentage = useCallback((val: number) => {
      return ((val - min) / (max - min)) * 100;
    }, [min, max]);

    // Convertir porcentaje a valor
    const getValueFromPercentage = useCallback((percentage: number) => {
      const val = min + (percentage / 100) * (max - min);
      return Math.round(val / step) * step;
    }, [min, max, step]);

    // Manejar cambio en el slider
    const handleSliderChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      const newValue = Math.max(min, Math.min(max, getValueFromPercentage(percentage)));
      
      // Determinar qué thumb está más cerca
      const distToMin = Math.abs(newValue - minValue);
      const distToMax = Math.abs(newValue - maxValue);
      
      if (distToMin <= distToMax) {
        // Mover el mínimo, pero no puede superar el máximo
        const newMin = Math.min(newValue, maxValue);
        onChange([newMin, maxValue]);
      } else {
        // Mover el máximo, pero no puede ser menor que el mínimo
        const newMax = Math.max(newValue, minValue);
        onChange([minValue, newMax]);
      }
    }, [disabled, min, max, minValue, maxValue, onChange, getValueFromPercentage]);

    // Manejar drag de thumbs
    const handleMouseDown = useCallback((thumb: "min" | "max") => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(thumb);
    }, [disabled]);

    // Manejar movimiento del mouse durante drag
    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging || disabled) return;
      
      const sliderElement = document.querySelector('[data-slider-track]') as HTMLElement;
      if (!sliderElement) return;
      
      const rect = sliderElement.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newValue = getValueFromPercentage(percentage);
      
      if (isDragging === "min") {
        const newMin = Math.min(newValue, maxValue);
        onChange([newMin, maxValue]);
      } else {
        const newMax = Math.max(newValue, minValue);
        onChange([minValue, newMax]);
      }
    }, [isDragging, disabled, minValue, maxValue, onChange, getValueFromPercentage]);

    // Finalizar drag
    const handleMouseUp = useCallback(() => {
      setIsDragging(null);
    }, []);

    // Event listeners para drag
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Manejar cambio en inputs manuales
    const handleInputChange = useCallback((type: "min" | "max", inputValue: string) => {
      const numValue = parseFloat(inputValue.replace(/[^\d.]/g, ''));
      if (isNaN(numValue)) return;
      
      if (type === "min") {
        const newMin = Math.max(min, Math.min(numValue, maxValue));
        onChange([newMin, maxValue]);
      } else {
        const newMax = Math.min(max, Math.max(numValue, minValue));
        onChange([minValue, newMax]);
      }
    }, [min, max, minValue, maxValue, onChange]);

    const minPercentage = getPercentage(minValue);
    const maxPercentage = getPercentage(maxValue);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col gap-4",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label className="text-sm font-medium text-foreground">
            {label}
          </Label>
        )}

        {/* Slider Container */}
        <div className="relative px-3">
          {/* Track Background */}
          <div
            data-slider-track
            className={cn(
              "relative h-2 bg-muted rounded-full cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleSliderChange}
          >
            {/* Active Range */}
            <div
              className="absolute h-2 bg-primary rounded-full"
              style={{
                left: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`,
              }}
            />
            
            {/* Min Thumb */}
            <div
              className={cn(
                "absolute w-5 h-5 bg-white border-2 border-primary rounded-full cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-all",
                isDragging === "min" && "cursor-grabbing scale-110 shadow-lg",
                disabled && "cursor-not-allowed opacity-50"
              )}
              style={{ left: `${minPercentage}%` }}
              onMouseDown={handleMouseDown("min")}
            />
            
            {/* Max Thumb */}
            <div
              className={cn(
                "absolute w-5 h-5 bg-white border-2 border-primary rounded-full cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-all",
                isDragging === "max" && "cursor-grabbing scale-110 shadow-lg",
                disabled && "cursor-not-allowed opacity-50"
              )}
              style={{ left: `${maxPercentage}%` }}
              onMouseDown={handleMouseDown("max")}
            />
          </div>

          {/* Value Labels */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{defaultFormatValue(min)}</span>
            <span>{defaultFormatValue(max)}</span>
          </div>
        </div>

        {/* Manual Inputs */}
        {showInputs && (
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label htmlFor="price-min" className="text-xs text-muted-foreground mb-1 block">
                Mínimo
              </Label>
              <Input
                id="price-min"
                type="text"
                value={defaultFormatValue(minValue)}
                onChange={(e) => handleInputChange("min", e.target.value)}
                disabled={disabled}
                className="h-10 text-center"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="price-max" className="text-xs text-muted-foreground mb-1 block">
                Máximo
              </Label>
              <Input
                id="price-max"
                type="text"
                value={defaultFormatValue(maxValue)}
                onChange={(e) => handleInputChange("max", e.target.value)}
                disabled={disabled}
                className="h-10 text-center"
              />
            </div>
          </div>
        )}

        {/* Current Range Display */}
        {/* <div className="text-sm text-center text-muted-foreground">
          {defaultFormatValue(minValue)} - {defaultFormatValue(maxValue)}
        </div> */}
      </div>
    );
  }
);

PriceRangeFilter.displayName = "PriceRangeFilter";

/**
 * Hook para obtener el output string de un rango de precios
 */
export const usePriceRangeOutputString = (
  minValue: number,
  maxValue: number,
  min: number,
  max: number,
  currency: string = "$",
  formatValue?: (value: number) => string
) => {
  // Formatear valor para mostrar
  const defaultFormatValue = useCallback((val: number) => {
    if (formatValue) return formatValue(val);
    if (val >= 1000000) return `${currency}${(val / 1000000).toFixed(1)}M+`;
    if (val >= 1000) return `${currency}${(val / 1000).toFixed(0)}K+`;
    return `${currency}${val}`;
  }, [currency, formatValue]);

  return useCallback((currentMin: number = minValue, currentMax: number = maxValue) => {
    // Si ambos están en los valores por defecto, output vacío
    if (currentMin === min && currentMax === max) {
      return "";
    }
    
    // Si min=0 y max < max, output es "menor a $max"
    if (currentMin === min && currentMax < max) {
      return `menor a ${defaultFormatValue(currentMax)}`;
    }
    
    // Si min > 0 y max está en el valor por defecto, output es "mayor a $min"
    if (currentMin > min && currentMax === max) {
      return `mayor a ${defaultFormatValue(currentMin)}`;
    }
    
    // Si ambos min > 0 y max < max, output es "$min a $max"
    if (currentMin > min && currentMax < max) {
      return `${defaultFormatValue(currentMin)} a ${defaultFormatValue(currentMax)}`;
    }
    
    return "";
  }, [minValue, maxValue, min, max, defaultFormatValue]);
};

export { PriceRangeFilter };
