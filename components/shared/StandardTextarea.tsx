"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface StandardTextareaProps extends React.ComponentProps<"textarea"> {
  /**
   * Label text for the textarea
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Whether the textarea is required
   */
  required?: boolean;
  /**
   * Container className for the entire textarea group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Textarea className (will be merged with standard classes)
   */
  textareaClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Minimum height for the textarea
   */
  minHeight?: string;
}

const StandardTextarea = React.forwardRef<HTMLTextAreaElement, StandardTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      textareaClassName,
      showRequiredAsterisk = true,
      minHeight = "min-h-[120px]",
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const textareaId = id || React.useId();

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
            htmlFor={textareaId}
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

        {/* Textarea */}
        <Textarea
          id={textareaId}
          ref={ref}
          className={cn(
            // Standard textarea height and spacing
            minHeight,
            "w-full",
            // Text sizes: base on mobile, sm on desktop
            "text-base md:text-sm",
            // Error state styling
            error && "border-destructive focus-visible:ring-destructive",
            textareaClassName,
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          required={required}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardTextarea.displayName = "StandardTextarea";

export { StandardTextarea };
