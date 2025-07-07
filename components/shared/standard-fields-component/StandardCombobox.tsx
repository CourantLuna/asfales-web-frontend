"use client";

import * as React from "react";
import { Command, CommandGroup, CommandItem, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type StandardComboboxOption = {
  label: string;
  value: string;
  /** Opción de icono ReactNode, p.ej. <Image src="…" /> o cualquier SVG/emoji */
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface StandardComboboxProps {
  /**
   * Label text for the combobox
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the combobox
   */
  helperText?: string;
  /**
   * Whether the combobox is required
   */
  required?: boolean;
  /**
   * Container className for the entire combobox group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Combobox trigger className
   */
  comboboxClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Options for the combobox
   */
  options: StandardComboboxOption[];
  /**
   * Current value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;
  /**
   * ID for the combobox
   */
  id?: string;
}

const StandardCombobox = React.forwardRef<HTMLButtonElement, StandardComboboxProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      comboboxClassName,
      showRequiredAsterisk = true,
      placeholder = "Seleccionar...",
      searchPlaceholder = "Buscar opción...",
      options,
      value,
      onChange,
      disabled,
      id,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const current = options.find((opt) => opt.value === value);
    
    // Generate unique ID if not provided
    const comboboxId = id || React.useId();

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
            htmlFor={comboboxId}
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

        {/* Combobox */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={comboboxId}
              ref={ref}
              variant="outline"
              role="combobox"
              disabled={disabled}
              aria-expanded={open}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error
                  ? `${comboboxId}-error`
                  : helperText
                  ? `${comboboxId}-helper`
                  : undefined
              }
              className={cn(
                // Standard combobox height and spacing
                "w-full justify-between h-12",
                // Text sizes: base on mobile, sm on desktop
                "text-base md:text-sm",
                // Error state styling
                error && "border-destructive focus-visible:ring-destructive",
                // Disabled state
                disabled && "cursor-not-allowed opacity-50",
                comboboxClassName
              )}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {current?.icon && (
                  <span className="flex-shrink-0">{current.icon}</span>
                )}
                <span className={cn(
                  "truncate text-left",
                  !current && "text-muted-foreground"
                )}>
                  {current?.label || placeholder}
                </span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full md:w-[280px] p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandGroup>
                {options.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No se encontraron opciones
                  </div>
                ) : (
                  options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => {
                        if (!option.disabled) {
                          onChange(option.value);
                          setOpen(false);
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Error Message */}
        {error && (
          <p
            id={`${comboboxId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${comboboxId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

StandardCombobox.displayName = "StandardCombobox";

export { StandardCombobox };
