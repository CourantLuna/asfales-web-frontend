"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandItem, CommandInput, CommandSeparator } from "@/components/ui/command";
import { Search, X, Clock, MapPin, Plane, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileFullscreenPopover } from "@/components/shared/MobileFullscreenPopover";

export type StandardSearchOption = {
  label: string;
  value: string;
  description?: string;
  /** Opción de icono ReactNode, p.ej. <Image src="…" /> o cualquier SVG/emoji */
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type StandardSearchDataSource = {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: 'recent' | 'airport' | 'hotel' | 'city' | 'custom' | 'bus' | 'cruise';
  options: any[]; // Datos sin formatear
  nameLabelField: string; // Nombre del campo para el label (ej: "name", "title", "label")
  nameValueField: string; // Nombre del campo para el value (ej: "id", "code", "value")
  nameDescriptionField?: string; // Nombre del campo para la descripción (opcional)
};

export interface StandardSearchFieldProps {
  /**
   * Label text for the search field
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the search field
   */
  helperText?: string;
  /**
   * Whether the search field is required
   */
  required?: boolean;
  /**
   * Container className for the entire search group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Search field className
   */
  searchClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Placeholder text for the search field
   */
  placeholder?: string;
  /**
   * Placeholder text for the search input in popover
   */
  searchPlaceholder?: string;
  /**
   * Data sources with different types and icons
   */
  dataSources: StandardSearchDataSource[];
  /**
   * Current search value
   */
  value: string;
  /**
   * Change handler for search input
   */
  onValueChange: (value: string) => void;
  /**
   * Selection handler when an option is chosen
   */
  onSelect?: (option: StandardSearchOption, sourceType: string) => void;
  /**
   * Whether the search field is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show clear button when there's text
   */
  showClearButton?: boolean;
  /**
   * Custom filter function for options
   * Can return either data sources (legacy) or flat options array
   */
  filterFunction?: (
    dataSources: StandardSearchDataSource[], 
    searchTerm: string
  ) => StandardSearchDataSource[] | (StandardSearchOption & { sourceId: string; sourceType: string; sourceIcon: React.ReactNode })[];
  /**
   * Minimum characters before showing results
   */
  minSearchLength?: number;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * ID for the search field
   */
  id?: string;
  /**
   * Presentation variant
   * - 'default': Label arriba, button abajo con icono + texto inline
   * - 'compact': Sin label separado, button con layout de dos columnas (icono + label/value)
   */
  variant?: 'default' | 'compact';
  /**
   * Icon para el campo de búsqueda (solo para variant compact)
   */
  fieldIcon?: React.ReactNode;
}

const StandardSearchField = React.forwardRef<HTMLButtonElement, StandardSearchFieldProps>(
  (
    {
      label = "Buscar",
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      searchClassName,
      showRequiredAsterisk = true,
      placeholder = "¿A dónde quieres ir?",
      searchPlaceholder = "Escribir para buscar...",
      dataSources = [],
      value,
      onValueChange,
      onSelect,
      disabled,
      showClearButton = true,
      filterFunction,
      minSearchLength = 1,
      isLoading = false,
      emptyMessage = "No se encontraron resultados",
      id,
      variant = 'default',
      fieldIcon,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState("");
    
    // Generate unique ID if not provided
    const searchId = id || React.useId();

    // Default filter function that returns flat options with source info
    const defaultFilterFunction = (dataSources: StandardSearchDataSource[], searchTerm: string) => {
      const MAX_INITIAL_OPTIONS = 6;
      const allOptions: (StandardSearchOption & { sourceId: string; sourceType: string; sourceIcon: React.ReactNode })[] = [];
      
      // Flatten all options from all sources with source metadata and dynamic field mapping
      dataSources.forEach(source => {
        source.options.forEach(option => {
          // Map dynamic fields to StandardSearchOption format
          allOptions.push({
            label: option[source.nameLabelField] || '',
            value: option[source.nameValueField] || '',
            description: source.nameDescriptionField ? option[source.nameDescriptionField] : undefined,
            icon: source.icon, // Use source icon for all options
            disabled: option.disabled || false,
            sourceId: source.id,
            sourceType: source.type,
            sourceIcon: source.icon
          });
        });
      });
      
      if (!searchTerm || searchTerm.length < minSearchLength) {
        // Al abrir inicialmente, mostrar máximo 6 opciones
        return allOptions.slice(0, MAX_INITIAL_OPTIONS);
      }
      
      // Al buscar, filtrar todas las opciones
      const term = searchTerm.toLowerCase();
      return allOptions.filter(option => 
        option.label.toLowerCase().includes(term) ||
        option.description?.toLowerCase().includes(term) ||
        option.value.toLowerCase().includes(term)
      );
    };

    const filteredOptions = React.useMemo(() => {
      const filterFn = filterFunction || defaultFilterFunction;
      const result = filterFn(dataSources, internalValue);
      
      // Si filterFunction personalizada devuelve sources, convertir a opciones planas
      if (Array.isArray(result) && result.length > 0 && 'options' in result[0]) {
        const flatOptions: (StandardSearchOption & { sourceId: string; sourceType: string; sourceIcon: React.ReactNode })[] = [];
        (result as StandardSearchDataSource[]).forEach(source => {
          source.options.forEach(option => {
            // Map dynamic fields to StandardSearchOption format
            flatOptions.push({
              label: option[source.nameLabelField] || '',
              value: option[source.nameValueField] || '',
              description: source.nameDescriptionField ? option[source.nameDescriptionField] : undefined,
              icon: source.icon,
              disabled: option.disabled || false,
              sourceId: source.id,
              sourceType: source.type,
              sourceIcon: source.icon
            });
          });
        });
        return flatOptions;
      }
      
      return result as (StandardSearchOption & { sourceId: string; sourceType: string; sourceIcon: React.ReactNode })[];
    }, [dataSources, internalValue, filterFunction, minSearchLength]);

    const handleInputChange = (newValue: string) => {
      setInternalValue(newValue);
    };

    const handleSelect = (option: StandardSearchOption & { sourceId: string; sourceType: string }) => {
      if (!option.disabled) {
        onValueChange(option.value);
        onSelect?.(option, option.sourceType);
        setOpen(false);
        setInternalValue("");
      }
    };

    const handleClear = (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setInternalValue("");
    };

    const handleClearSelection = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onValueChange("");
      setInternalValue("");
    };

    // Función para mapear el value (código) al label (nombre mostrado)
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

    const displayValue = value ? getDisplayLabelFromValue(value) : placeholder;

    // Render del botón trigger según la variante
    const renderTriggerButton = () => {
      if (variant === 'compact') {
        return (
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              // Layout de dos columnas para compact
              "w-full h-16 p-4 justify-start font-normal",
              // Error state styling
              error && "border-destructive focus-visible:ring-destructive",
              searchClassName
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${searchId}-error`
                : helperText
                ? `${searchId}-helper`
                : undefined
            }
            aria-label={label || placeholder}
          >
            <div className="flex items-center gap-4 w-full">
              {/* Columna 1: Icono (pequeña, full height) */}
              <div className="flex-shrink-0 flex items-center justify-center">
                {fieldIcon || <Search className="h-5 w-5 text-muted-foreground" />}
              </div>
              
              {/* Columna 2: Label arriba, Value abajo */}
              <div className="flex-1 min-w-0 text-left">
                <div className="text-start text-gray-800 text-xs mb-0 leading-tight">
                  {label}
                </div>
                <div className={cn(
                  "text-gray-800 truncate leading-tight mt-1",
                  !value && "text-muted-foreground"
                )}>
                  {displayValue}
                </div>
              </div>

              {/* Botón X para limpiar selección (solo si hay valor) */}
              {value && (
                <div
                  onClick={handleClearSelection}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground flex-shrink-0 cursor-pointer rounded-md hover:bg-muted transition-colors flex items-center justify-center"
                  aria-label="Limpiar selección"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClearSelection(e as any);
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                </div>
              )}
            </div>
          </Button>
        );
      }

      // Variante default (actual)
      return (
        <Button
          ref={ref}
          variant="outline"
          disabled={disabled}
          className={cn(
            // Standard button height and spacing
            "w-full justify-start h-12 text-left font-normal px-4 gap-2",
            // Text sizes: base on mobile, sm on desktop
            "text-base md:text-sm",
            // Error state styling
            error && "border-destructive focus-visible:ring-destructive",
            !value && "text-muted-foreground",
            searchClassName
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${searchId}-error`
              : helperText
              ? `${searchId}-helper`
              : undefined
          }
          aria-label={label || placeholder}
        >
          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="truncate flex-1">{displayValue}</span>
          {/* Botón X para limpiar selección (solo si hay valor) */}
          {value && (
            <div
              onClick={handleClearSelection}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground flex-shrink-0 ml-2 cursor-pointer rounded-md hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="Limpiar selección"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClearSelection(e as any);
                }
              }}
            >
              <X className="h-4 w-4" />
            </div>
          )}
        </Button>
      );
    };

    return (
      <div
        className={cn(
          // Responsive width: full on mobile, 280px on desktop
          "w-full flex flex-col gap-2",
          containerClassName
        )}
      >
        {/* Label - Solo mostrar en variante default */}
        {label && variant === 'default' && (
          <Label
            className={cn(
              // Standard label styling with left alignment
              "text-sm font-medium text-foreground text-start",
              // Error state
              error && "text-destructive",
              labelClassName
            )}
          >
            {label}
            {required && showRequiredAsterisk && (
              <span className="text-destructive ml-1">*</span>
            )}
          </Label>
        )}

        {/* Search Button */}
        <MobileFullscreenPopover
          open={open}
          onOpenChange={setOpen}
          mobileTitle={`Buscar ${label || 'opciones'}`}
          popoverContentProps={{
            className: "w-[400px] max-w-[95vw] p-0 max-h-[400px] overflow-hidden",
            align: "start",
            side: "bottom",
            sideOffset: -48,
            alignOffset: 0,
            onOpenAutoFocus: (e) => e.preventDefault(),
            onCloseAutoFocus: (e) => e.preventDefault()
          }}
          trigger={renderTriggerButton()}
        >
          <div className="flex flex-col max-h-[400px]">
            {/* Search Header */}
            <div className="p-4 border-b flex-shrink-0">
              <div className="relative">
                <Input
                  type="text"
                  value={internalValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-12 w-full pl-10 pr-10 text-base"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                
                {/* Clear Button */}
                {showClearButton && internalValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Results Content with Scroll */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {isLoading ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  Buscando...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                <div className="p-2">
                  {/* Flat List of Options - No Section Headers */}
                  <div className="space-y-1">
                    {filteredOptions.map((option, index) => (
                      <button
                        key={`${option.sourceId}-${option.value}-${index}`}
                        onClick={() => handleSelect(option)}
                        disabled={option.disabled}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                          "hover:bg-muted focus:bg-muted focus:outline-none",
                          option.disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {/* Option Icon (prefer option icon, fallback to source icon) */}
                        {(option.icon || option.sourceIcon) && (
                          <div className="flex-shrink-0 mt-0.5">
                            {option.icon || option.sourceIcon}
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-sm">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground truncate mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </MobileFullscreenPopover>

        {/* Error Message */}
        {error && (
          <p
            id={`${searchId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${searchId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardSearchField.displayName = "StandardSearchField";

export { StandardSearchField };