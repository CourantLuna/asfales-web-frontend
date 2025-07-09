"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface StandardSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface StandardSelectProps {
  /**
   * Label text for the select
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Container className for the entire select group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Select trigger className
   */
  selectClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Options for the select
   */
  options: StandardSelectOption[];
  /**
   * Current value
   */
  value?: string;
  /**
   * Change handler
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * ID for the select
   */
  id?: string;
}

const StandardSelect = React.forwardRef<HTMLButtonElement, StandardSelectProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      selectClassName,
      showRequiredAsterisk = true,
      placeholder = "Seleccionar...",
      options,
      value,
      onValueChange,
      disabled,
      id,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const selectId = id || React.useId();

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
            htmlFor={selectId}
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

        {/* Select */}
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger
            id={selectId}
            ref={ref}
            className={cn(
              // Standard select height and spacing
              "h-12 w-full px-4 text-start w-full",
              // Text sizes: base on mobile, sm on desktop
              "text-base md:text-sm",
              // Error state styling
              error && "border-destructive focus:ring-destructive",
              selectClassName
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Error Message */}
        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${selectId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardSelect.displayName = "StandardSelect";

export { StandardSelect };
