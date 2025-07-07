"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { StandardSearchField, StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { ArrowLeftRight, ArrowUpDown, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchFieldsWithSwapProps {
  /**
   * Label para el campo de origen
   */
  originLabel?: string;
  /**
   * Placeholder para el campo de origen
   */
  originPlaceholder?: string;
  /**
   * Valor del campo de origen
   */
  originValue: string;
  /**
   * Función que se ejecuta cuando cambia el valor del origen
   */
  onOriginValueChange: (value: string) => void;
  /**
   * Label para el campo de destino
   */
  destinationLabel?: string;
  /**
   * Placeholder para el campo de destino
   */
  destinationPlaceholder?: string;
  /**
   * Valor del campo de destino
   */
  destinationValue: string;
  /**
   * Función que se ejecuta cuando cambia el valor del destino
   */
  onDestinationValueChange: (value: string) => void;
  /**
   * Fuentes de datos para ambos campos de búsqueda
   */
  dataSources: StandardSearchDataSource[];
  /**
   * Función que se ejecuta cuando se selecciona una opción en el campo de origen
   */
  onOriginSelect?: (option: any, sourceType: string) => void;
  /**
   * Función que se ejecuta cuando se selecciona una opción en el campo de destino
   */
  onDestinationSelect?: (option: any, sourceType: string) => void;
  /**
   * Función que se ejecuta cuando se intercambian los valores
   */
  onSwap?: () => void;
  /**
   * Función personalizada para manejar el intercambio si se necesita lógica adicional
   */
  customSwapHandler?: () => void;
  /**
   * Mostrar botón de limpiar en los campos
   */
  showClearButton?: boolean;
  /**
   * Longitud mínima de búsqueda
   */
  minSearchLength?: number;
  /**
   * Desactivar los campos
   */
  disabled?: boolean;
  /**
   * Mostrar botón de búsqueda
   */
  showSearchButton?: boolean;
  /**
   * Texto del botón de búsqueda
   */
  searchButtonText?: string;
  /**
   * Función que se ejecuta al hacer clic en el botón de búsqueda
   */
  onSearch?: () => void;
  /**
   * Clases adicionales para el contenedor
   */
  containerClassName?: string;
  /**
   * Clases adicionales para el botón de intercambio
   */
  swapButtonClassName?: string;
  /**
   * Clases adicionales para el botón de búsqueda
   */
  searchButtonClassName?: string;
  /**
   * Color del botón de intercambio
   */
  swapButtonColor?: string;
  /**
   * Tamaño del gap entre elementos
   */
  gap?: "sm" | "md" | "lg";
  /**
   * Orientación en desktop
   */
  orientation?: "horizontal" | "vertical";
}

const SearchFieldsWithSwap = React.forwardRef<HTMLDivElement, SearchFieldsWithSwapProps>(
  (
    {
      originLabel = "Origen",
      originPlaceholder = "¿Dónde empieza tu aventura?",
      originValue,
      onOriginValueChange,
      destinationLabel = "Destino",
      destinationPlaceholder = "¿A dónde quieres ir?",
      destinationValue,
      onDestinationValueChange,
      dataSources,
      onOriginSelect,
      onDestinationSelect,
      onSwap,
      customSwapHandler,
      showClearButton = true,
      minSearchLength = 0,
      disabled = false,
      showSearchButton = true,
      searchButtonText = "Buscar Opciones de Viaje",
      onSearch,
      containerClassName,
      swapButtonClassName,
      searchButtonClassName,
      swapButtonColor = "#FFA500",
      gap = "md",
      orientation = "horizontal",
    },
    ref
  ) => {
    // Función por defecto para intercambiar valores
    const handleSwap = () => {
      if (customSwapHandler) {
        customSwapHandler();
      } else if (onSwap) {
        onSwap();
      } else {
        // Intercambio por defecto
        const tempOrigin = originValue;
        onOriginValueChange(destinationValue);
        onDestinationValueChange(tempOrigin);
      }
    };

    // Configuración de gaps
    const gapConfig = {
      sm: "gap-2",
      md: "gap-2 md:gap-4",
      lg: "gap-4 md:gap-6"
    };

    const selectedGap = gapConfig[gap];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap md:flex-nowrap w-full md:w-auto",
          selectedGap,
          containerClassName
        )}
      >
        
       

        {/* Campo Origen */}
        <StandardSearchField
          containerClassName="w-full md:w-[280px]"
          label={originLabel}
          placeholder={originPlaceholder}
          value={originValue}
          onValueChange={onOriginValueChange}
          dataSources={dataSources}
          onSelect={onOriginSelect}
          showClearButton={showClearButton}
          minSearchLength={minSearchLength}
          disabled={disabled}
        />

        

        {/* Botón Swap para Mobile */}
        <div className="md:hidden my-0 flex justify-center">
          <div className="absolute translate-y-[-7px] left-3/4">
            <Button
              onClick={handleSwap}
              size="icon"
              type="button"
              disabled={disabled}
              className={cn(
                "rounded-full text-white w-10 h-10 transition-colors",
                swapButtonClassName
              )}
              style={{ 
                backgroundColor: swapButtonColor,
                borderColor: swapButtonColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = swapButtonColor;
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = swapButtonColor;
                e.currentTarget.style.opacity = "1";
              }}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Campo Destino */}
        <StandardSearchField
                  containerClassName="w-full md:w-[280px]"

          label={destinationLabel}
          placeholder={destinationPlaceholder}
          value={destinationValue}
          onValueChange={onDestinationValueChange}
          dataSources={dataSources}
          onSelect={onDestinationSelect}
          showClearButton={showClearButton}
          minSearchLength={minSearchLength}
          disabled={disabled}
        />
 {/* Botón Swap para Desktop */}
        <div className="hidden md:block relative">
          <div 
            className={cn(
              "absolute pt-[1px] translate-y-3/4 -left-[326px]",
              orientation === "vertical" && "left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2"
            )}
          >
            <Button
              onClick={handleSwap}
              size="icon"
              type="button"
              disabled={disabled}
              className={cn(
                "rounded-full text-white w-10 h-10 transition-colors",
                swapButtonClassName
              )}
              style={{ 
                backgroundColor: swapButtonColor,
                borderColor: swapButtonColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = swapButtonColor;
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = swapButtonColor;
                e.currentTarget.style.opacity = "1";
              }}
            >
              {orientation === "horizontal" ? (
                <ArrowLeftRight className="h-4 w-4" />
              ) : (
                <ArrowUpDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>


        {/* Botón de Búsqueda */}
        {showSearchButton && (
          <div className="flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
            <Button
              className={cn(
                "bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm",
                searchButtonClassName
              )}
              variant="default"
              onClick={onSearch}
              disabled={disabled}
            >
              {searchButtonText === "Buscar Opciones de Viaje" ? (
                <Search className="mr-2 h-4 w-4" />
              ) : (
                <Filter className="mr-2 h-4 w-4" />
              )}
              {searchButtonText}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

SearchFieldsWithSwap.displayName = "SearchFieldsWithSwap";

export { SearchFieldsWithSwap };
