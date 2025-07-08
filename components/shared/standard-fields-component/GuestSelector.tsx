"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersIcon, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileFullscreenPopover } from "@/components/shared/MobileFullscreenPopover";

interface Child {
  id: string;
  age: number;
}

interface Room {
  id: string;
  adults: number;
  children: Child[];
}

interface GuestSelectorProps {
  /**
   * Label text for the guest selector
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
   * Initial rooms configuration
   */
  initialRooms?: Room[];
  /**
   * Callback when rooms change
   */
  onRoomsChange?: (rooms: Room[]) => void;
  /**
   * Maximum number of rooms allowed
   */
  maxRooms?: number;
  /**
   * Maximum adults per room
   */
  maxAdultsPerRoom?: number;
  /**
   * Maximum children per room
   */
  maxChildrenPerRoom?: number;
  /**
   * ID for the selector
   */
  id?: string;
}

const GuestSelector = React.forwardRef<HTMLButtonElement, GuestSelectorProps>(
  (
    {
      label = "Huéspedes",
      error,
      helperText,
      required,
      containerClassName,
      labelClassName,
      buttonClassName,
      showRequiredAsterisk = true,
      initialRooms,
      onRoomsChange,
      maxRooms = 8,
      maxAdultsPerRoom = 6,
      maxChildrenPerRoom = 4,
      id,
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const selectorId = id || React.useId();

    // Initialize with default room
    const [rooms, setRooms] = React.useState<Room[]>(
      initialRooms || [
        {
          id: "room-1",
          adults: 2,
          children: [],
        },
      ]
    );

    const [open, setOpen] = React.useState(false);

    // Update parent when rooms change
    React.useEffect(() => {
      onRoomsChange?.(rooms);
    }, [rooms, onRoomsChange]);

    const addRoom = () => {
      if (rooms.length < maxRooms) {
        const newRoom: Room = {
          id: `room-${Date.now()}`,
          adults: 2,
          children: [],
        };
        setRooms([...rooms, newRoom]);
      }
    };

    const removeRoom = (roomId: string) => {
      if (rooms.length > 1) {
        setRooms(rooms.filter(room => room.id !== roomId));
      }
    };

    const updateAdults = (roomId: string, change: number) => {
      setRooms(rooms.map(room => {
        if (room.id === roomId) {
          const newAdults = Math.max(1, Math.min(maxAdultsPerRoom, room.adults + change));
          return { ...room, adults: newAdults };
        }
        return room;
      }));
    };

    const addChild = (roomId: string) => {
      setRooms(rooms.map(room => {
        if (room.id === roomId && room.children.length < maxChildrenPerRoom) {
          const newChild: Child = {
            id: `child-${Date.now()}`,
            age: 2, // Default age for new child
          };
          return { ...room, children: [...room.children, newChild] };
        }
        return room;
      }));
    };

    const removeChild = (roomId: string, childId: string) => {
      setRooms(rooms.map(room => {
        if (room.id === roomId) {
          return { ...room, children: room.children.filter(child => child.id !== childId) };
        }
        return room;
      }));
    };

    const updateChildAge = (roomId: string, childId: string, age: number) => {
      setRooms(rooms.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            children: room.children.map(child =>
              child.id === childId ? { ...child, age } : child
            ),
          };
        }
        return room;
      }));
    };

    const getTotalGuests = () => {
      const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
      const totalChildren = rooms.reduce((sum, room) => sum + room.children.length, 0);
      return { adults: totalAdults, children: totalChildren };
    };

    const getDisplayText = () => {
      const { adults, children } = getTotalGuests();
      const roomCount = rooms.length;
      
      let text = `${adults} adulto${adults !== 1 ? 's' : ''}`;
      if (children > 0) {
        text += `, ${children} niño${children !== 1 ? 's' : ''}`;
      }
      text += `, ${roomCount} habitación${roomCount !== 1 ? 'es' : ''}`;
      
      return text;
    };

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

        {/* Guest Selector */}
        <MobileFullscreenPopover
          open={open}
          onOpenChange={setOpen}
          mobileTitle="Seleccionar huéspedes"
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
                // Standard button height and spacing
                "w-full justify-start h-12 text-left font-normal px-4 gap-2",
                // Text sizes: base on mobile, sm on desktop
                "text-base md:text-sm",
                // Error state styling
                error && "border-destructive focus-visible:ring-destructive",
                buttonClassName
              )}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error
                  ? `${selectorId}-error`
                  : helperText
                  ? `${selectorId}-helper`
                  : undefined
              }
            >
              <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="truncate">{getDisplayText()}</span>
            </Button>
          }
        >
          {/* Scrollable content area */}
          <div className="space-y-4 p-4 max-h-[400px] overflow-y-auto">
            {rooms.map((room, roomIndex) => (
              <div key={room.id} className="space-y-4 border-b pb-4 last:border-b-0 last:pb-0">
                {/* Room header */}
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Habitación {roomIndex + 1}</h4>
                  {rooms.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRoom(room.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Eliminar
                    </Button>
                  )}
                </div>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adultos</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateAdults(room.id, -1)}
                      disabled={room.adults <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{room.adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateAdults(room.id, 1)}
                      disabled={room.adults >= maxAdultsPerRoom}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Niños</div>
                      <div className="text-xs text-muted-foreground">Edad 0 a 17</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeChild(room.id, room.children[room.children.length - 1]?.id)}
                        disabled={room.children.length === 0}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{room.children.length}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addChild(room.id)}
                        disabled={room.children.length >= maxChildrenPerRoom}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children ages */}
                  {room.children.map((child, childIndex) => (
                    <div key={child.id} className="flex items-center justify-between ml-4">
                      <span className="text-sm">Niño {childIndex + 1}</span>
                      <Select
                        value={child.age.toString()}
                        onValueChange={(value) => updateChildAge(room.id, child.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 18 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add another room - dentro del área de scroll */}
            {rooms.length < maxRooms && (
              <Button
                variant="link"
                onClick={addRoom}
                className="w-full text-primary p-0 h-auto"
              >
                + Agregar otra habitación
              </Button>
            )}
          </div>

          {/* Fixed footer area - fuera del scroll - Solo en desktop */}
          <div className="border-t bg-background p-4 space-y-2 md:block hidden">
            {/* Need more rooms link */}
            <div className="text-center">
              <Button
                variant="link"
                className="text-sm text-primary p-0 h-auto"
                onClick={() => {
                  // Handle booking 9+ rooms
                  console.log("Need to book 9+ rooms");
                }}
              >
                ¿Necesitas reservar 9 o más habitaciones?
              </Button>
            </div>

            {/* Done button */}
            <Button
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Listo
            </Button>
          </div>
        </MobileFullscreenPopover>

        {/* Error Message */}
        {error && (
          <p
            id={`${selectorId}-error`}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${selectorId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

GuestSelector.displayName = "GuestSelector";

export { GuestSelector };
export type { Room, Child, GuestSelectorProps };
