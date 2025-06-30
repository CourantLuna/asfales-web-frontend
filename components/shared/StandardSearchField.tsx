"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput, CommandSeparator } from "@/components/ui/command";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type StandardSearchOption = {
  label: string;
  value: string;
  description?: string;
  /** Opción de icono ReactNode, p.ej. <Image src="…" /> o cualquier SVG/emoji */
  icon?: React.ReactNode;
  disabled?: boolean;
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
   * Options for the search results
   */
  options: StandardSearchOption[];
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
  onSelect?: (option: StandardSearchOption) => void;
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
   */
  filterFunction?: (options: StandardSearchOption[], searchTerm: string) => StandardSearchOption[];
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
}

const StandardSearchField = React.forwardRef<HTMLInputElement, StandardSearchFieldProps>(
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
      placeholder = "Buscar...",
      searchPlaceholder = "Escribir para buscar...",
      options = [],
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
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || "");
    
    // Generate unique ID if not provided
    const searchId = id || React.useId();

    // Update internal value when prop changes
    React.useEffect(() => {
      setInternalValue(value || "");
    }, [value]);

    // Default filter function
    const defaultFilterFunction = (options: StandardSearchOption[], searchTerm: string) => {
      if (!searchTerm || searchTerm.length < minSearchLength) return [];
      
      const term = searchTerm.toLowerCase();
      return options.filter(option => 
        option.label.toLowerCase().includes(term) ||
        option.description?.toLowerCase().includes(term) ||
        option.value.toLowerCase().includes(term)
      );
    };

    const filteredOptions = React.useMemo(() => {
      const filterFn = filterFunction || defaultFilterFunction;
      return filterFn(options, internalValue);
    }, [options, internalValue, filterFunction, minSearchLength]);

    const handleInputChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange(newValue);
      
      // Open popover when user starts typing
      if (newValue.length >= minSearchLength && !open) {
        setOpen(true);
      }
    };

    const handleSelect = (option: StandardSearchOption) => {
      if (!option.disabled) {
        setInternalValue(option.label);
        onValueChange(option.label);
        onSelect?.(option);
        setOpen(false);
      }
    };

    const handleClear = () => {
      setInternalValue("");
      onValueChange("");
      setOpen(false);
    };

    const handleInputFocus = () => {
      if (internalValue.length >= minSearchLength) {
        setOpen(true);
      }
    };

    return (
      <div
        className={cn(
          // Responsive width: full on mobile, 280px on desktop
          "w-full md:w-[280px] flex flex-col gap-2",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label
            htmlFor={searchId}
            className={cn(
              // Standard label styling
              "text-sm font-medium text-foreground",
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

        {/* Search Field */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                id={searchId}
                ref={ref}
                type="text"
                value={internalValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  // Standard input height and spacing
                  "h-12 w-full pl-10 pr-10",
                  // Text sizes: base on mobile, sm on desktop
                  "text-base md:text-sm",
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
                required={required}
              />
              
              {/* Search Icon */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              
              {/* Clear Button */}
              {showClearButton && internalValue && !disabled && (
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
          </PopoverTrigger>

          {/* Results Popover */}
          {(internalValue.length >= minSearchLength || isLoading) && (
            <PopoverContent className="w-full md:w-[280px] p-0 max-h-[300px] overflow-hidden" align="start">
              <Command shouldFilter={false}>
                {/* Search input in popover */}
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={internalValue}
                  onValueChange={handleInputChange}
                />
                
                <CommandSeparator />
                
                {/* Results */}
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {isLoading ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Buscando...
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      {emptyMessage}
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option)}
                        className="flex items-start gap-3 p-3 cursor-pointer"
                      >
                        {/* Icon */}
                        {option.icon && (
                          <span className="flex-shrink-0 mt-0.5">{option.icon}</span>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground truncate mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          )}
        </Popover>

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
