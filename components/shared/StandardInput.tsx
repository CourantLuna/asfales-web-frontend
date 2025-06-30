"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StandardInputProps extends React.ComponentProps<"input"> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Icon to display inside the input (optional)
   */
  icon?: LucideIcon;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Container className for the entire input group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Input className (will be merged with standard classes)
   */
  inputClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
}

const StandardInput = React.forwardRef<HTMLInputElement, StandardInputProps>(
  (
    {
      label,
      icon,
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      inputClassName,
      showRequiredAsterisk = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || React.useId();

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
            htmlFor={inputId}
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

        {/* Input */}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {React.createElement(icon, { className: "h-4 w-4 text-muted-foreground" })}
            </div>
          )}
          <Input
            id={inputId}
            ref={ref}
            className={cn(
              // Standard input height and spacing
              "h-12 w-full text-start",
              // Conditional padding based on icon presence
              icon ? "pl-12 pr-4" : "px-4",
              // Text sizes: base on mobile, sm on desktop  
              "text-base md:text-sm",
              // Error state styling
              error && "border-destructive focus-visible:ring-destructive",
              inputClassName,
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            required={required}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardInput.displayName = "StandardInput";

export { StandardInput };
