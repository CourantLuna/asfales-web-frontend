"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileFullscreenPopoverProps {
  /**
   * El trigger button que abre el popover
   */
  trigger: React.ReactNode;
  /**
   * El contenido del popover
   */
  children: React.ReactNode;
  /**
   * Si el popover está abierto
   */
  open: boolean;
  /**
   * Callback cuando cambia el estado de abierto
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Título para el modal en mobile
   */
  mobileTitle?: string;
  /**
   * Props adicionales para el PopoverContent en desktop
   */
  popoverContentProps?: React.ComponentProps<typeof PopoverContent>;
  /**
   * Si está deshabilitado
   */
  disabled?: boolean;
  /**
   * Callback adicional al cerrar (para lógica específica del componente)
   */
  onClose?: () => void;
  /**
   * ClassName adicional para el contenido
   */
  contentClassName?: string;
}

export function MobileFullscreenPopover({
  trigger,
  children,
  open,
  onOpenChange,
  mobileTitle = "Seleccionar",
  popoverContentProps,
  disabled = false,
  onClose,
  contentClassName
}: MobileFullscreenPopoverProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Detectar si es mobile
  React.useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Manejar tecla Enter para cerrar
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && open) {
        event.preventDefault();
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
    onOpenChange(false);
  };

  // Prevenir hidratación mismatch - renderizar popover por defecto hasta determinar el tamaño
  if (!mounted) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild disabled={disabled}>
          {trigger}
        </PopoverTrigger>
        
        <PopoverContent 
          {...popoverContentProps}
          className={cn(
            "shadow-lg",
            popoverContentProps?.className
          )}
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  if (isMobile) {
    // Modo mobile - usar Dialog en pantalla completa
    return (
      <>
        {/* Trigger */}
        <div onClick={() => !disabled && onOpenChange(true)}>
          {trigger}
        </div>

        {/* Modal en pantalla completa */}
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent 
            className={cn(
              "h-full w-full max-w-none m-0 p-0 rounded-none",
              "flex flex-col"
            )}
            // Prevenir cierre al hacer clic fuera en mobile
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            {/* Header fijo */}
            <DialogHeader className="flex-shrink-0 p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">
                  {mobileTitle}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  {/* Botón Enter hint */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    <kbd className="font-mono">Enter</kbd>
                    <span>para cerrar</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Contenido scrolleable */}
            <div className={cn("flex-1 overflow-y-auto p-4 pt-0", contentClassName)}>
              {children}
            </div>

            {/* Botón fijo en la parte inferior */}
            <div className="flex-shrink-0 p-4 border-t bg-background">
              <Button
                onClick={handleClose}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
              >
                Listo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Modo desktop - usar Popover normal
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild disabled={disabled}>
        {trigger}
      </PopoverTrigger>
      
      <PopoverContent 
        {...popoverContentProps}
        className={cn(
          "shadow-lg",
          popoverContentProps?.className
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
