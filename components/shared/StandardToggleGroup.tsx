"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface StandardToggleOption {
  /** Unique value for the option */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional count for the option */
  count?: number;
}

export interface StandardToggleGroupProps {
  /**
   * Label for the toggle group
   */
  label?: string;
  /**
   * Array of toggle options
   */
  options: StandardToggleOption[];
  /**
   * Current selected value(s)
   */
  value?: string | string[];
  /**
   * Change handler
   */
  onValueChange?: (value: string | string[]) => void;
  /**
   * Selection type: single or multiple
   */
  type?: "single" | "multiple";
  /**
   * Default selected value(s)
   */
  defaultValue?: string | string[];
  /**
   * Whether the toggle group is disabled
   */
  disabled?: boolean;
  /**
   * Container className
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Toggle group className
   */
  toggleGroupClassName?: string;
  /**
   * Individual toggle item className
   */
  toggleItemClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  required?: boolean;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * ID for the toggle group
   */
  id?: string;
  /**
   * Layout variant: 'horizontal' (default) or 'vertical'
   */
  variant?: "horizontal" | "vertical";
  /**
   * Whether to wrap items in a grid layout
   */
  wrap?: boolean;
  /**
   * Grid columns for wrap layout
   */
  gridCols?: "auto" | 1 | 2 | 3 | 4 | 5 | 6;
}

const StandardToggleGroup = React.forwardRef<HTMLDivElement, StandardToggleGroupProps>(
  (
    {
      label,
      options = [],
      value,
      onValueChange,
      type = "multiple",
      defaultValue,
      disabled = false,
      containerClassName,
      labelClassName,
      toggleGroupClassName,
      toggleItemClassName,
      required = false,
      showRequiredAsterisk = true,
      error,
      helperText,
      id,
      variant = "horizontal",
      wrap = false,
      gridCols = 2,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const toggleId = id || React.useId();

    // Internal state management
    const [internalValue, setInternalValue] = React.useState<string | string[]>(() => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return type === "multiple" ? [] : "";
    });

    // Sync with external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Handle value changes with proper typing
    const handleValueChange = (newValue: string | string[]) => {
      // Ensure the value type matches the selection type
      const processedValue = type === "multiple" 
        ? Array.isArray(newValue) ? newValue : [newValue].filter(Boolean)
        : Array.isArray(newValue) ? newValue[0] || "" : newValue;

      setInternalValue(processedValue);
      onValueChange?.(processedValue);
    };

    // Helper function to get selection state for each option
    const getOptionState = (optionValue: string): boolean => {
      if (type === "multiple") {
        return Array.isArray(internalValue) ? internalValue.includes(optionValue) : false;
      } else {
        return internalValue === optionValue;
      }
    };

    // Get properly typed values for ToggleGroup
    const toggleGroupValue = type === "multiple" 
      ? (Array.isArray(internalValue) ? internalValue : []) 
      : (typeof internalValue === "string" ? internalValue : "");
    
    const toggleGroupDefaultValue = type === "multiple"
      ? (Array.isArray(defaultValue) ? defaultValue : [])
      : (typeof defaultValue === "string" ? defaultValue : undefined);

    // Get grid columns class
    const getGridColsClass = () => {
      if (!wrap) return "";
      switch (gridCols) {
        case 1: return "grid-cols-1";
        case 2: return "grid-cols-2";
        case 3: return "grid-cols-3";
        case 4: return "grid-cols-4";
        case 5: return "grid-cols-5";
        case 6: return "grid-cols-6";
        case "auto": return "grid-cols-2"; // Auto defaults to 2 columns
        default: return "grid-cols-2"; // Default to 2 columns
      }
    };

    // Base toggle group classes
    const toggleGroupClasses = cn(
      wrap 
        ? `grid gap-3 ${getGridColsClass()}`
        : "gap-2 flex flex-wrap justify-start",
      toggleGroupClassName
    );

    // Base toggle item classes
    const getToggleItemClasses = (isSelected: boolean) => {
      const baseClasses = variant === "vertical" 
        ? "flex-col h-full w-full px-2 py-2 text-xs"
        : wrap 
          ? "flex-col w-full px-2 py-1 text-xs gap-"
          : "px-2 py-1  gap-2 text-base md:text-xs flex-row";
      
      return cn(
        baseClasses,
        "justify-center font-normal items-center overflow-hidden",
        // Error state
        error && "border-destructive focus-visible:ring-destructive",
        toggleItemClassName
      );
    };

    // Icon size classes
    const getIconClasses = (isSelected: boolean) => {
      const sizeClasses = (variant === "vertical" || wrap) ? "w-5 h-5" : "w-4 h-4";
      return cn(
        "flex-shrink-0",
        sizeClasses,
        isSelected ? "text-secondary" : "text-muted-foreground"
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col gap-1",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label
            className={cn(
              "text-sm font-medium text-foreground text-start",
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

        {/* Toggle Group */}
        {type === "multiple" ? (
          <ToggleGroup
            type="multiple"
            value={Array.isArray(toggleGroupValue) ? toggleGroupValue : []}
            onValueChange={handleValueChange}
            defaultValue={Array.isArray(toggleGroupDefaultValue) ? toggleGroupDefaultValue : []}
            disabled={disabled}
            className={toggleGroupClasses}
            id={toggleId}
          >
            {options.map((option) => {
              const isSelected = Array.isArray(toggleGroupValue) ? toggleGroupValue.includes(option.value) : false;
              return (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  aria-label={option.label}
                  disabled={option.disabled || disabled}
                  className={getToggleItemClasses(isSelected)}
                >
                  {option.icon && (
                    <span className={getIconClasses(isSelected) }>
                      {option.icon}
                    </span>
                  )}
                  <span className={cn(
                    "text-center leading-tight break-words hyphens-auto",
                    (variant === "vertical" || wrap) ? "text-[11px]" : "text-sm"
                  )}>
                    {option.label}
                    {option.count && (
                      <span className="ml-1 text-muted-foreground text-[10px]">
                        ({option.count})
                      </span>
                    )}
                  </span>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        ) : (
          <ToggleGroup
            type="single"
            value={typeof toggleGroupValue === "string" ? toggleGroupValue : ""}
            onValueChange={handleValueChange}
            defaultValue={typeof toggleGroupDefaultValue === "string" ? toggleGroupDefaultValue : undefined}
            disabled={disabled}
            className={toggleGroupClasses}
            id={toggleId}
          >
            {options.map((option) => {
              const isSelected = typeof toggleGroupValue === "string" ? toggleGroupValue === option.value : false;
              return (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  aria-label={option.label}
                  disabled={option.disabled || disabled}
                  className={getToggleItemClasses(isSelected)}
                >
                  {option.icon && (
                    <div className={getIconClasses(isSelected)}>
                      {option.icon}
                    </div>
                  )}
                  <span className={cn(
                    "text-center leading-tight break-words hyphens-auto",
                    (variant === "vertical" || wrap) ? "text-xs" : "text-sm"
                  )}>
                    {option.label}
                    {option.count && (
                      <span className="ml-1 text-muted-foreground text-xs">
                        ({option.count})
                      </span>
                    )}
                  </span>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={`${toggleId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${toggleId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardToggleGroup.displayName = "StandardToggleGroup";

export { StandardToggleGroup };