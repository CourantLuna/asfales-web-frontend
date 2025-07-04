"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface StandardRadioOption {
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

export interface StandardRadioGroupProps {
  /**
   * Label for the radio group
   */
  label?: string;
  /**
   * Array of radio options
   */
  options: StandardRadioOption[];
  /**
   * Current selected value
   */
  value?: string;
  /**
   * Change handler
   */
  onValueChange?: (value: string) => void;
  /**
   * Default selected value
   */
  defaultValue?: string;
  /**
   * Whether the radio group is disabled
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
   * Radio group className
   */
  radioGroupClassName?: string;
  /**
   * Individual radio item className
   */
  radioItemClassName?: string;
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
   * ID for the radio group
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

const StandardRadioGroup = React.forwardRef<HTMLDivElement, StandardRadioGroupProps>(
  (
    {
      label,
      options = [],
      value,
      onValueChange,
      defaultValue,
      disabled = false,
      containerClassName,
      labelClassName,
      radioGroupClassName,
      radioItemClassName,
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
    const radioId = id || React.useId();

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

    // Base radio group classes
    const radioGroupClasses = cn(
      variant === "vertical" 
        ? "flex flex-col gap-0"
        : wrap 
          ? `grid gap-2 ${getGridColsClass()}`
          : "gap-0 flex flex-wrap justify-start",
      radioGroupClassName
    );

    // Base radio item classes for traditional radio button layout
    const getRadioItemClasses = () => {
      return cn(
        "flex items-center gap-2 cursor-pointer",
        "hover:bg-accent/50 rounded-md p-2 transition-colors",
        radioItemClassName
      );
    };

    // Icon size classes
    const getIconClasses = (isSelected: boolean) => {
      const sizeClasses = (variant === "vertical" || wrap) ? "w-6 h-6" : "w-5 h-5";
      return cn(
        "flex-shrink-0",
        sizeClasses,
        isSelected ? "text-primary" : "text-muted-foreground"
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col ",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label
            className={cn(
              "text-sm font-medium text-foreground text-start mb-2",
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

        {/* Radio Group */}
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          disabled={disabled}
          className={radioGroupClasses}
          id={radioId}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            const itemId = `${radioId}-${option.value}`;
            
            return (
              <div key={option.value} className={getRadioItemClasses()}>
                <RadioGroupItem 
                  value={option.value} 
                  id={itemId}
                  disabled={option.disabled || disabled}
                />
                
                <Label
                  htmlFor={itemId}
                  className="flex items-center gap-1 cursor-pointer flex-1"
                >
                  {/* Icon */}
                  {option.icon && (
                    <span className={getIconClasses(isSelected)}>
                      {option.icon}
                    </span>
                  )}
                  
                  {/* Label and count */}
                  <span className={cn(
                    "leading-tight break-words hyphens-auto",
                    " font-normal"
                  )}>
                    {option.label}
                    {option.count !== undefined && (
                      <span className="ml-1 text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {/* Error Message */}
        {error && (
          <p
            id={`${radioId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
       
      </div>
    );
  }
);

StandardRadioGroup.displayName = "StandardRadioGroup";

export { StandardRadioGroup };
