"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export interface ImageButtonSheetItem {
  /**
   * Label to display below the button
   */
  label: string;
  /**
   * Source path for the SVG/PNG image (1:1 aspect ratio)
   */
  src: string;
  /**
   * Size for both width and height (1:1 square)
   */
  size: number;
  /**
   * Content to display inside the sheet
   */
  sheetContent: React.ReactNode;
  /**
   * Title for the sheet header
   */
  sheetTitle: string;
  /**
   * Label for the bottom action button
   */
  btnLabel: string;
  /**
   * Action to execute when bottom button is pressed
   */
  btnAction: () => void;
  /**
   * Optional disabled state for this item
   */
  disabled?: boolean;
  /**
   * Optional key for the item (will use index if not provided)
   */
  key?: string;
}

export interface ImageButtonSheetProps {
  /**
   * Array of button items with their respective sheet content
   */
  items: ImageButtonSheetItem[];
  /**
   * Optional label for the entire group
   */
  label?: string;
  /**
   * Container className
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Buttons container className
   */
  buttonsContainerClassName?: string;
  /**
   * Individual button className
   */
  buttonClassName?: string;
  /**
   * Button label className
   */
  buttonLabelClassName?: string;
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Whether to show required asterisk
   */
  required?: boolean;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Grid columns layout class name (using tailwind grid-cols classes)
   * Example: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
   */
  gridColsClassName?: string;
  /**
   * ID for the component
   */
  id?: string;
}

const ImageButtonSheet = React.forwardRef<HTMLDivElement, ImageButtonSheetProps>(
  (
    {
      items = [],
      label,
      containerClassName,
      labelClassName,
      buttonsContainerClassName,
      buttonClassName,
      buttonLabelClassName,
      disabled = false,
      error,
      helperText,
      required = false,
      showRequiredAsterisk = true,
      gridColsClassName,
      id,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const componentId = id || React.useId();

    // State to track which sheets are open
    const [openSheets, setOpenSheets] = React.useState<Record<string, boolean>>({});

    const handleSheetOpen = (itemKey: string, isOpen: boolean) => {
      setOpenSheets(prev => ({
        ...prev,
        [itemKey]: isOpen
      }));
    };

    return (
      <div
        ref={ref}
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

        {/* Buttons Container - Using Grid Layout */}
        <div
          className={cn(
            "w-full grid gap-4",
            gridColsClassName || "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
            buttonsContainerClassName
          )}
        >
          {items.map((item, index) => {
            const itemKey = item.key || `${componentId}-${index}`;
            const isOpen = openSheets[itemKey] || false;
            const isDisabled = disabled || item.disabled;

            return (
              <Sheet
                key={itemKey}
                
                open={isOpen}
                onOpenChange={(open) => handleSheetOpen(itemKey, open)}
              >
                <SheetTrigger  asChild>
                  <div
                    className={cn(
                      "flex flex-col items-center gap-2 cursor-pointer",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      buttonClassName
                    )}
                  >
                    {/* Image Button */}
                    <div
                      className={cn(
                        "relative transition-all duration-200",
                        "hover:scale-105 active:scale-95",
                        isDisabled && "hover:scale-100 active:scale-100"
                      )}
                      style={{
                        width: item.size,
                        height: item.size,
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.label}
                        width={item.size}
                        height={item.size}
                        className="object-cover"
                        priority={index < 3} // Load first 3 images with priority
                      />
                    </div>

                    {/* Label below button */}
                    <Label
                      className={cn(
                        "text-xs text-center font-medium text-foreground",
                        "max-w-[80px] leading-tight",
                        isDisabled && "text-muted-foreground",
                        buttonLabelClassName
                      )}
                    >
                      {item.label}
                    </Label>
                  </div>
                </SheetTrigger>

                {/* Sheet Content */}
                <SheetContent
                  side="right"
                  className="h-full w-full max-w-none m-0 p-0 rounded-t-xl flex flex-col [&>button]:hidden lg:w-[480px]" // Ocultar el botón de cierre con CSS y hacer que aparezca desde abajo
                >
                  {/* Header con botón personalizado */}
                  <div className="flex-shrink-0 px-4 py-3 border-b bg-background flex items-center relative">
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="absolute left-2 h-8 w-8 p-0">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Cerrar</span>
                      </Button>
                    </SheetClose>
                    <div className="w-full">
                      <SheetTitle className="text-lg font-semibold text-center">
                        {item.sheetTitle}
                      </SheetTitle>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 pt-0">
                    {item.sheetContent}
                  </div>

                  {/* Bottom Button */}
                  <div className="flex-shrink-0 p-4 border-t bg-background">
                    <Button
                      onClick={() => {
                        item.btnAction();
                        handleSheetOpen(itemKey, false);
                      }}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                      disabled={isDisabled}
                    >
                      {item.btnLabel}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${componentId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${componentId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ImageButtonSheet.displayName = "ImageButtonSheet";

export { ImageButtonSheet };
