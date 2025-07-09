"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileFullscreenPopover } from "@/components/shared/MobileFullscreenPopover";

export interface DurationRange {
  minNights: number;
  maxNights: number;
}

export interface DurationSelectorProps {
  /**
   * Label text for the selector
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Current duration range value
   */
  value?: DurationRange;
  /**
   * Callback when duration changes
   */
  onChange?: (value: DurationRange) => void;
  /**
   * Whether the selector is disabled
   */
  disabled?: boolean;
  /**
   * Container className
   */
  containerClassName?: string;
  /**
   * Trigger className
   */
  triggerClassName?: string;
  /**
   * Error message
   */
  error?: string;
}

const DurationSelector = React.forwardRef<HTMLButtonElement, DurationSelectorProps>(
  (
    {
      label = "Duración",
      placeholder = "Seleccionar duración",
      value = { minNights: 3, maxNights: 9 },
      onChange,
      disabled = false,
      containerClassName,
      triggerClassName,
      error,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [tempValue, setTempValue] = React.useState<DurationRange>(value);

    // Sync tempValue with value prop
    React.useEffect(() => {
      setTempValue(value);
    }, [value]);

    const handleMinNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = parseInt(e.target.value) || 0;
      setTempValue(prev => ({
        ...prev,
        minNights: newMin,
        maxNights: Math.max(newMin, prev.maxNights)
      }));
    };

    const handleMaxNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = parseInt(e.target.value) || 0;
      setTempValue(prev => ({
        ...prev,
        maxNights: Math.max(prev.minNights, newMax)
      }));
    };

    const handleDone = () => {
      onChange?.(tempValue);
      setOpen(false);
    };

    const handleCancel = () => {
      setTempValue(value);
      setOpen(false);
    };

    const formatDisplayValue = (range: DurationRange) => {
      if (range.minNights === range.maxNights) {
        return `${range.minNights} noches`;
      }
      return `${range.minNights} - ${range.maxNights} noches`;
    };

    const triggerContent = (
      <Button
        ref={ref}
        variant="outline"
        disabled={disabled}
        className={cn(
          "h-12 w-full justify-start text-left font-normal px-4",
          "text-base md:text-sm",
          !value && "text-muted-foreground",
          error && "border-destructive",
          triggerClassName
        )}
      >
        <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
        <span className="flex-1 truncate">
          {value ? formatDisplayValue(value) : placeholder}
        </span>
      </Button>
    );

    const popoverContent = (
      <div className="p-4 space-y-4 w-80">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Duración</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-nights" className="text-sm font-medium">
                Noches mínimas
              </Label>
              <Input
                id="min-nights"
                type="number"
                min="1"
                max="30"
                value={tempValue.minNights}
                onChange={handleMinNightsChange}
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-nights" className="text-sm font-medium">
                Noches máximas
              </Label>
              <Input
                id="max-nights"
                type="number"
                min={tempValue.minNights}
                max="30"
                value={tempValue.maxNights}
                onChange={handleMaxNightsChange}
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDone}
            className="px-6"
          >
            Listo
          </Button>
        </div>
      </div>
    );

    return (
      <div
        className={cn(
          "w-full md:w-[280px] flex flex-col gap-2",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label className="text-sm font-medium text-foreground text-start">
            {label}
          </Label>
        )}

        {/* Selector */}
        <MobileFullscreenPopover
          trigger={triggerContent}
          open={open}
          onOpenChange={setOpen}
          mobileTitle="Duración"
          disabled={disabled}
          onClose={handleDone}
        >
          {popoverContent}
        </MobileFullscreenPopover>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DurationSelector.displayName = "DurationSelector";

export { DurationSelector };
