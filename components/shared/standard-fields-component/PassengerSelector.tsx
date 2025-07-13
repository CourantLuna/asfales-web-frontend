"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UsersIcon, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileFullscreenPopover } from "@/components/shared/MobileFullscreenPopover";

export interface Child {
  id: string;
  age: number;
  firstName?: string;
  lastName?: string;
}

export interface InfantOnLap {
  id: string;
  age: number; // 0-2 años
  firstName?: string;
  lastName?: string;
}

export interface InfantInSeat {
  id: string;
  age: number; // 0-2 años
  firstName?: string;
  lastName?: string;
}

export interface PassengerGroup {
  adults: number;
  children: Child[]; // 2-17 años
  infantsOnLap: InfantOnLap[]; // 0-2 años, en regazo
  infantsInSeat: InfantInSeat[]; // 0-2 años, con asiento
}

export interface PassengerSelectorProps {
  /**
   * Label text for the passenger selector
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the selector
   */
  helperText?: string;
  /**
   * Whether the selector is required
   */
  required?: boolean;
  /**
   * Container className for the entire selector group
   */
  containerClassName?: string;
  /**
   * Label className
   */
  labelClassName?: string;
  /**
   * Button className
   */
  buttonClassName?: string;
  /**
   * Whether to show the required asterisk
   */
  showRequiredAsterisk?: boolean;
  /**
   * Initial passenger configuration
   */
  initialPassengers?: PassengerGroup;
  /**
   * Callback when passengers change
   */
  onPassengersChange?: (passengers: PassengerGroup) => void;
  /**
   * Maximum adults allowed
   */
  maxAdults?: number;
  /**
   * Maximum children allowed
   */
  maxChildren?: number;
  /**
   * Maximum infants on lap allowed
   */
  maxInfantsOnLap?: number;
  /**
   * Maximum infants in seat allowed
   */
  maxInfantsInSeat?: number;
  /**
   * ID for the selector
   */
  id?: string;
  /**
   * Whether to show detailed passenger information forms
   */
  showPassengerDetails?: boolean;
}

const PassengerSelector = React.forwardRef<HTMLButtonElement, PassengerSelectorProps>(
  (
    {
      label = "Pasajeros",
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      buttonClassName,
      showRequiredAsterisk = true,
      initialPassengers,
      onPassengersChange,
      maxAdults = 9,
      maxChildren = 8,
      maxInfantsOnLap = 4,
      maxInfantsInSeat = 4,
      id,
      showPassengerDetails = false,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const selectorId = id || React.useId();

    // Initialize with default passenger group
    const [passengers, setPassengers] = React.useState<PassengerGroup>(
      initialPassengers || {
        adults: 1,
        children: [],
        infantsOnLap: [],
        infantsInSeat: [],
      }
    );

    const [open, setOpen] = React.useState(false);

    // Sincronizar con initialPassengers cuando cambie (por ejemplo, al cargar desde URL)
    React.useEffect(() => {
      if (initialPassengers) {
        setPassengers(initialPassengers);
      }
    }, [initialPassengers]);

    // Update parent when passengers change
    React.useEffect(() => {
      onPassengersChange?.(passengers);
    }, [passengers, onPassengersChange]);

    const updateAdults = (change: number) => {
      const newAdults = Math.max(1, Math.min(maxAdults, passengers.adults + change));
      setPassengers(prev => ({ ...prev, adults: newAdults }));
    };

    const addChild = () => {
      if (passengers.children.length < maxChildren) {
        const newChild: Child = {
          id: `child-${Date.now()}`,
          age: 2,
          firstName: "",
          lastName: "",
        };
        setPassengers(prev => ({
          ...prev,
          children: [...prev.children, newChild]
        }));
      }
    };

    const removeChild = (childId: string) => {
      setPassengers(prev => ({
        ...prev,
        children: prev.children.filter(child => child.id !== childId)
      }));
    };

    const updateChild = (childId: string, updates: Partial<Child>) => {
      setPassengers(prev => ({
        ...prev,
        children: prev.children.map(child =>
          child.id === childId ? { ...child, ...updates } : child
        )
      }));
    };

    const addInfantOnLap = () => {
      if (passengers.infantsOnLap.length < maxInfantsOnLap && passengers.infantsOnLap.length < passengers.adults) {
        const newInfant: InfantOnLap = {
          id: `infant-lap-${Date.now()}`,
          age: 0,
          firstName: "",
          lastName: "",
        };
        setPassengers(prev => ({
          ...prev,
          infantsOnLap: [...prev.infantsOnLap, newInfant]
        }));
      }
    };

    const removeInfantOnLap = (infantId: string) => {
      setPassengers(prev => ({
        ...prev,
        infantsOnLap: prev.infantsOnLap.filter(infant => infant.id !== infantId)
      }));
    };

    const updateInfantOnLap = (infantId: string, updates: Partial<InfantOnLap>) => {
      setPassengers(prev => ({
        ...prev,
        infantsOnLap: prev.infantsOnLap.map(infant =>
          infant.id === infantId ? { ...infant, ...updates } : infant
        )
      }));
    };

    const addInfantInSeat = () => {
      if (passengers.infantsInSeat.length < maxInfantsInSeat) {
        const newInfant: InfantInSeat = {
          id: `infant-seat-${Date.now()}`,
          age: 0,
          firstName: "",
          lastName: "",
        };
        setPassengers(prev => ({
          ...prev,
          infantsInSeat: [...prev.infantsInSeat, newInfant]
        }));
      }
    };

    const removeInfantInSeat = (infantId: string) => {
      setPassengers(prev => ({
        ...prev,
        infantsInSeat: prev.infantsInSeat.filter(infant => infant.id !== infantId)
      }));
    };

    const updateInfantInSeat = (infantId: string, updates: Partial<InfantInSeat>) => {
      setPassengers(prev => ({
        ...prev,
        infantsInSeat: prev.infantsInSeat.map(infant =>
          infant.id === infantId ? { ...infant, ...updates } : infant
        )
      }));
    };

    const getTotalPassengers = () => {
      const adults = passengers.adults;
      const children = passengers.children.length;
      const infantsOnLap = passengers.infantsOnLap.length;
      const infantsInSeat = passengers.infantsInSeat.length;
      const total = adults + children + infantsInSeat; // Los bebés en regazo no ocupan asiento
      return { adults, children, infantsOnLap, infantsInSeat, total };
    };

    const getDisplayText = () => {
      const { adults, children, infantsOnLap, infantsInSeat, total } = getTotalPassengers();
      
      // Texto corto para espacios reducidos
      if (total === 1 && adults === 1 && children === 0 && infantsOnLap === 0 && infantsInSeat === 0) {
        return "1 adulto";
      }
      
      // Si hay muchos pasajeros, usar formato compacto
      if (total > 3) {
        return `${total} pasajero${total !== 1 ? 's' : ''}`;
      }
      
      let parts = [];
      
      if (adults === 1) {
        parts.push("1 adulto");
      } else {
        parts.push(`${adults} adultos`);
      }
      
      if (children > 0) {
        parts.push(children === 1 ? "1 niño" : `${children} niños`);
      }
      
      if (infantsOnLap > 0) {
        parts.push(infantsOnLap === 1 ? "1 bebé" : `${infantsOnLap} bebés`);
      }
      
      if (infantsInSeat > 0) {
        parts.push(infantsInSeat === 1 ? "1 bebé+" : `${infantsInSeat} bebés+`);
      }
      
      return parts.join(", ");
    };

    const getFullDisplayText = () => {
      const { adults, children, infantsOnLap, infantsInSeat } = getTotalPassengers();
      
      let parts = [];
      
      if (adults === 1) {
        parts.push("1 adulto");
      } else {
        parts.push(`${adults} adultos`);
      }
      
      if (children > 0) {
        parts.push(children === 1 ? "1 niño" : `${children} niños`);
      }
      
      if (infantsOnLap > 0) {
        parts.push(infantsOnLap === 1 ? "1 bebé en regazo" : `${infantsOnLap} bebés en regazo`);
      }
      
      if (infantsInSeat > 0) {
        parts.push(infantsInSeat === 1 ? "1 bebé con asiento" : `${infantsInSeat} bebés con asiento`);
      }
      
      return parts.join(", ");
    };

    const canAddInfantOnLap = () => {
      return passengers.infantsOnLap.length < maxInfantsOnLap && 
             passengers.infantsOnLap.length < passengers.adults;
    };

    return (
      <div
        className={cn(
          // Responsive width: full on mobile, dynamic with minimum 280px on desktop
          "w-full md:min-w-[280px] md:w-auto md:max-w-[280px] flex flex-col gap-2",
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <Label
            htmlFor={selectorId}
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

        {/* Passenger Selector */}
        <MobileFullscreenPopover
          open={open}
          onOpenChange={setOpen}
          mobileTitle="Seleccionar pasajeros"
         popoverContentProps={{
            className: "w-full md:w-[380px] p-0 max-h-[500px] overflow-hidden",
            align: "start",
            side: "bottom",
            sideOffset: -48,
            alignOffset: 0
          }}
          trigger={
            <Button
              id={selectorId}
              ref={ref}
              variant="outline"
              className={cn(
                // Standard button height and spacing with flexible width
                "w-full justify-start h-12 text-left font-normal",
                // Text sizes: base on mobile, sm on desktop
                "text-base md:text-sm",
                // Prevent text overflow
                "overflow-hidden",
                // Error state styling
                error && "border-destructive focus-visible:ring-destructive",
                buttonClassName
              )}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error
                  ? `${selectorId}-error`
                  : helperText
                  ? `${selectorId}-description`
                  : undefined
              }
            >
              <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{getDisplayText()}</span>
            </Button>
          }
        >
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">Adultos</div>
                  <div className="text-xs text-muted-foreground">Mayores de 17 años</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateAdults(-1)}
                    disabled={passengers.adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{passengers.adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateAdults(1)}
                    disabled={passengers.adults >= maxAdults}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Niños</div>
                    <div className="text-xs text-muted-foreground">Edades 2 a 17 años</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeChild(passengers.children[passengers.children.length - 1]?.id)}
                      disabled={passengers.children.length === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{passengers.children.length}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={addChild}
                      disabled={passengers.children.length >= maxChildren}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children Details */}
                {passengers.children.map((child, index) => (
                  <div key={child.id} className="pl-4 space-y-2 border-l-2 border-muted">
                    <div className="text-xs font-medium text-muted-foreground">
                      Niño {index + 1}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Edad</Label>
                        <Select
                          value={child.age.toString()}
                          onValueChange={(value) => updateChild(child.id, { age: parseInt(value) })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 16 }, (_, i) => i + 2).map((age) => (
                              <SelectItem key={age} value={age.toString()}>
                                {age} años
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive"
                        onClick={() => removeChild(child.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Infants on Lap */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Bebés en regazo</div>
                    <div className="text-xs text-muted-foreground">Menores de 2 años</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeInfantOnLap(passengers.infantsOnLap[passengers.infantsOnLap.length - 1]?.id)}
                      disabled={passengers.infantsOnLap.length === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{passengers.infantsOnLap.length}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={addInfantOnLap}
                      disabled={!canAddInfantOnLap()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!canAddInfantOnLap() && passengers.infantsOnLap.length < maxInfantsOnLap && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    Máximo 1 bebé en regazo por adulto
                  </div>
                )}

                {/* Infants on Lap Details */}
                {passengers.infantsOnLap.map((infant, index) => (
                  <div key={infant.id} className="pl-4 space-y-2 border-l-2 border-muted">
                    <div className="text-xs font-medium text-muted-foreground">
                      Bebé en regazo {index + 1}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Edad</Label>
                        <Select
                          value={infant.age.toString()}
                          onValueChange={(value) => updateInfantOnLap(infant.id, { age: parseInt(value) })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 años</SelectItem>
                            <SelectItem value="1">1 año</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive"
                        onClick={() => removeInfantOnLap(infant.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Infants in Seat */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Bebés con asiento</div>
                    <div className="text-xs text-muted-foreground">Menores de 2 años</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeInfantInSeat(passengers.infantsInSeat[passengers.infantsInSeat.length - 1]?.id)}
                      disabled={passengers.infantsInSeat.length === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{passengers.infantsInSeat.length}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={addInfantInSeat}
                      disabled={passengers.infantsInSeat.length >= maxInfantsInSeat}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Infants in Seat Details */}
                {passengers.infantsInSeat.map((infant, index) => (
                  <div key={infant.id} className="pl-4 space-y-2 border-l-2 border-muted">
                    <div className="text-xs font-medium text-muted-foreground">
                      Bebé con asiento {index + 1}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Edad</Label>
                        <Select
                          value={infant.age.toString()}
                          onValueChange={(value) => updateInfantInSeat(infant.id, { age: parseInt(value) })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 años</SelectItem>
                            <SelectItem value="1">1 año</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive"
                        onClick={() => removeInfantInSeat(infant.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done Button - Solo en desktop, en mobile se usa el header */}
            <div className="pt-3 border-t md:block hidden">
              <Button
                onClick={() => setOpen(false)}
                className="w-full"
                size="sm"
              >
                Listo
              </Button>
            </div>
          </div>
        </MobileFullscreenPopover>

        {/* Error Message */}
        {error && (
          <p
            id={`${selectorId}-error`}
            className="text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${selectorId}-description`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PassengerSelector.displayName = "PassengerSelector";

export { PassengerSelector };
