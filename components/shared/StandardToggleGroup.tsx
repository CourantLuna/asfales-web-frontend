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

    // Helper function to get all selection states
    const getAllSelectionStates = (): Record<string, boolean> => {
      const states: Record<string, boolean> = {};
      options.forEach(option => {
        states[option.value] = getOptionState(option.value);
      });
      return states;
    };

    // Get properly typed values for ToggleGroup
    const toggleGroupValue = type === "multiple" 
      ? (Array.isArray(internalValue) ? internalValue : []) 
      : (typeof internalValue === "string" ? internalValue : "");
    
    const toggleGroupDefaultValue = type === "multiple"
      ? (Array.isArray(defaultValue) ? defaultValue : [])
      : (typeof defaultValue === "string" ? defaultValue : undefined);

    return (
      <div
        className={cn(
          "w-full flex flex-col gap-2",
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
            className={cn(
              "gap-2 flex flex-wrap justify-start",
              toggleGroupClassName
            )}
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
                  className={cn(
                    // Standard styling consistent with other components
                    "px-4 py-2 h-12 gap-2 text-base md:text-sm",
                    "justify-start font-normal",
                    // Error state
                    error && "border-destructive focus-visible:ring-destructive",
                    toggleItemClassName
                  )}
                >
                  {option.icon && (
                    <span className={cn(
                      "flex-shrink-0",
                      isSelected ? "text-secondary" : ""
                    )}>
                      {option.icon}
                    </span>
                  )}
                  <span className="truncate">{option.label}</span>
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
            className={cn(
              "gap-2 flex flex-wrap justify-start",
              toggleGroupClassName
            )}
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
                  className={cn(
                    // Standard styling consistent with other components
                    "px-4 py-2 h-12 gap-2 text-base md:text-sm",
                    "justify-start font-normal",
                    // Error state
                    error && "border-destructive focus-visible:ring-destructive",
                    toggleItemClassName
                  )}
                >
                  {option.icon && (
                    <div className={cn(
                      "flex-shrink-0",
                      isSelected ? "text-secondary" : "text-muted-foreground"
                    )}>
                      {option.icon}
                    </div>
                  )}
                  <span className="truncate">{option.label}</span>
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
