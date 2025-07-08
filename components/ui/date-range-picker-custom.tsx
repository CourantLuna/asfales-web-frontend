"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth, isToday, isBefore, isAfter, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { StandardTabs, TabItem } from "@/components/shared/standard-fields-component/StandardTabs";
import { MobileFullscreenPopover } from "@/components/shared/MobileFullscreenPopover";

export interface DateRangePickerCustomProps {
  /**
   * Label for the date range picker
   */
  label?: string;
  /**
   * Current selected date range
   */
  value?: {
    from?: Date;
    to?: Date;
  };
  /**
   * Change handler for date range
   */
  onChange?: (range: { 
    from?: Date; 
    to?: Date;
    isFlexible?: boolean;
    flexibleDuration?: string;
    flexibleMonths?: string[];
  }) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to show flexible dates tab
   */
  showFlexibleDates?: boolean;
  /**
   * Whether to use dual triggers (two separate buttons for ida/vuelta)
   */
  dualTrigger?: boolean;
  /**
   * Default active tab ('calendar' or 'flexible')
   */
  defaultActiveTab?: 'calendar' | 'flexible';
  /**
   * Labels for dual trigger mode
   */
  dualTriggerLabels?: {
    from: string;
    to: string;
  };
  /**
   * Whether to show return date field (only applicable in dual trigger mode)
   */
  hasReturnDate?: boolean;
}

const DateRangePickerCustom = React.forwardRef<HTMLButtonElement, DateRangePickerCustomProps>(
  ({ 
    label, 
    value, 
    onChange, 
    placeholder = "Seleccionar fechas", 
    disabled, 
    className, 
    showFlexibleDates = true, 
    dualTrigger = false,
    defaultActiveTab = "calendar",
    dualTriggerLabels = { from: "Fecha de ida", to: "Fecha de vuelta" },
    hasReturnDate = true
  }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(defaultActiveTab);
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedRange, setSelectedRange] = React.useState<{ from?: Date; to?: Date }>(value || {});
    const [exactDates, setExactDates] = React.useState(true);
    const [flexibleDuration, setFlexibleDuration] = React.useState("2-3");
    const [includeWeekend, setIncludeWeekend] = React.useState(false);
    const [flexibleMonths, setFlexibleMonths] = React.useState<string[]>(["july"]);
    const [activeTrigger, setActiveTrigger] = React.useState<'from' | 'to' | null>(null);
    const [isFlexibleActive, setIsFlexibleActive] = React.useState(defaultActiveTab === "flexible");

    // Sync with external value
    React.useEffect(() => {
      if (value) {
        setSelectedRange(value);
      }
    }, [value]);

    // Reset flexible active state when switching to calendar tab
    React.useEffect(() => {
      if (activeTab === "calendar") {
        setIsFlexibleActive(false);
      }
    }, [activeTab]);

    // Calendar helpers
    const nextMonth = addMonths(currentMonth, 1);
    
    const formatDisplayDate = (date: Date) => {
      return format(date, "EEE, MMM d", { locale: es });
    };

    const handleDateClick = (date: Date) => {
      if (dualTrigger && activeTrigger) {
        // En modo dual trigger, asignar fecha según el trigger activo con validación
        const newRange = { ...selectedRange };
        
        if (activeTrigger === 'from') {
          // Si no hay fecha de regreso habilitada, solo asignar fecha de ida
          if (!hasReturnDate) {
            newRange.from = date;
            newRange.to = undefined;
          } else {
            // Si hay fecha de vuelta y la fecha de ida es mayor, ajustar
            if (selectedRange.to && isAfter(date, selectedRange.to)) {
              newRange.from = date;
              newRange.to = undefined; // Limpiar fecha de vuelta si es anterior a la ida
            } else {
              newRange.from = date;
            }
          }
        } else if (hasReturnDate) {
          // Solo permitir seleccionar fecha de vuelta si hasReturnDate es true
          // Si hay fecha de ida y la fecha de vuelta es menor, no permitir
          if (selectedRange.from && isBefore(date, selectedRange.from)) {
            // No hacer nada - mantener la selección actual
            return;
          } else {
            newRange.to = date;
          }
        }
        
        setSelectedRange(newRange);
        onChange?.({ 
          ...newRange,
          isFlexible: false 
        });
        setOpen(false);
      } else {
        // Modo normal - selección de rango
        if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
          // Start new selection
          setSelectedRange({ from: date, to: undefined });
        } else if (selectedRange.from && !selectedRange.to) {
          // Complete selection
          if (isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
          } else {
            setSelectedRange({ from: selectedRange.from, to: date });
          }
        }
      }
    };

    const handleDone = () => {
      if (activeTab === "calendar") {
        setIsFlexibleActive(false);
        onChange?.({ 
          ...selectedRange,
          isFlexible: false 
        });
      } else {
        // Handle flexible dates logic here
        setIsFlexibleActive(true);
        const today = new Date();
        const fakeDates = {
          from: today,
          to: addDays(today, 7),
          isFlexible: true,
          flexibleDuration,
          flexibleMonths
        };
        onChange?.(fakeDates);
      }
      setOpen(false);
    };

    const renderCalendar = (month: Date) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const startDate = monthStart;
      const endDate = monthEnd;

      const days = [];
      const date = new Date(startDate);
      
      // Add empty cells for days before month start
      const firstDayOfWeek = date.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
      }

      // Add days of the month
      while (date <= endDate) {
        const currentDate = new Date(date);
        const isSelected = selectedRange.from && isSameDay(currentDate, selectedRange.from) ||
                          selectedRange.to && isSameDay(currentDate, selectedRange.to);
        const isInRange = selectedRange.from && selectedRange.to &&
                         isAfter(currentDate, selectedRange.from) &&
                         isBefore(currentDate, selectedRange.to);
        const isToday_ = isToday(currentDate);
        const isPast = isBefore(currentDate, new Date()) && !isToday_;
        
        // En modo dual trigger, deshabilitar fechas según el trigger activo
        let isDisabledByTrigger = false;
        if (dualTrigger && activeTrigger) {
          if (activeTrigger === 'to' && selectedRange.from && hasReturnDate) {
            // Si estamos seleccionando fecha de vuelta y está habilitada, deshabilitar fechas anteriores a la ida
            isDisabledByTrigger = isBefore(currentDate, selectedRange.from);
          }
        }

        days.push(
          <button
            key={currentDate.toISOString()}
            onClick={() => handleDateClick(currentDate)}
            disabled={isPast || isDisabledByTrigger}
            className={cn(
              "h-10 w-10 rounded-full text-sm font-medium transition-colors",
              "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
              isSelected && "bg-primary text-primary-foreground hover:bg-primary",
              isInRange && "bg-primary/20 text-primary",
              isToday_ && !isSelected && "bg-muted font-bold",
              (isPast || isDisabledByTrigger) && "text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            {format(currentDate, "d")}
          </button>
        );
        date.setDate(date.getDate() + 1);
      }

      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {format(month, "MMMM yyyy", { locale: es })}
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground mb-2">
            <div>Dom</div>
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </div>
      );
    };

    const getFlexibleDisplayText = () => {
      if (!isFlexibleActive || flexibleMonths.length === 0) {
        return null;
      }

      // Mapeo de claves de meses a abreviaciones en español (3 letras + punto)
      const monthNames: Record<string, string> = {
        "june": "Jun.",
        "july": "Jul.", 
        "august": "Ago.",
        "september": "Sep.",
        "october": "Oct.",
        "november": "Nov."
      };

      // Convertir duración a texto legible
      const getDurationText = (duration: string) => {
        switch (duration) {
          case "1": return "1 noche";
          case "2-3": return "2-3 noches";
          case "4-5": return "4-5 noches";
          case "6-7": return "6-7 noches";
          default: return duration;
        }
      };

      const monthsText = flexibleMonths
        .map(key => monthNames[key] || key)
        .join(" ");

      return `${getDurationText(flexibleDuration)} in ${monthsText}`;
    };

    const displayText = React.useMemo(() => {
      // Si fechas flexibles está activa y tiene datos, mostrar el texto flexible
      const flexibleText = getFlexibleDisplayText();
      if (flexibleText) {
        return flexibleText;
      }

      // Lógica original para fechas del calendario
      if (selectedRange.from && selectedRange.to) {
        return `${format(selectedRange.from, "MMM d", { locale: es })} - ${format(selectedRange.to, "MMM d", { locale: es })}`;
      } else if (selectedRange.from) {
        return format(selectedRange.from, "MMM d", { locale: es });
      }
      return placeholder;
    }, [selectedRange, placeholder, isFlexibleActive, flexibleDuration, flexibleMonths]);

    // Contenido del tab de calendario
    const getCalendarContent = () => (
      <div className="m-0 space-y-4 p-4">
        {/* Selected Range Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "text-sm font-medium px-3 py-1 rounded-md",
              dualTrigger && activeTrigger === 'from' ? "bg-primary/20 text-primary" : ""
            )}>
              {selectedRange.from ? formatDisplayDate(selectedRange.from) : (dualTrigger ? dualTriggerLabels.from : "Inicio")}
            </div>
            {hasReturnDate && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <div className={cn(
                  "text-sm font-medium px-3 py-1 rounded-md",
                  dualTrigger && activeTrigger === 'to' ? "bg-primary/20 text-primary" : ""
                )}>
                  {selectedRange.to ? formatDisplayDate(selectedRange.to) : (dualTrigger ? dualTriggerLabels.to : "Fin")}
                </div>
              </>
            )}
          </div>
          {dualTrigger && (
            <div className="text-xs text-muted-foreground">
              {activeTrigger === 'from' ? 'Selecciona la fecha de ida' : 
               activeTrigger === 'to' && hasReturnDate ? 
                 (selectedRange.from ? 'Selecciona la fecha de vuelta (debe ser posterior a la ida)' : 'Primero selecciona la fecha de ida') :
                 !hasReturnDate ? 'Selecciona la fecha' : 'Seleccionando fechas de viaje'
              }
            </div>
          )}
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dual Month Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {renderCalendar(currentMonth)}
          <div className="hidden md:block">
            {renderCalendar(nextMonth)}
          </div>
        </div>

        {/* Date Range Options */}
        <div className="space-y-3">
          <ToggleGroup
            type="single"
            value={exactDates ? "exact" : "flexible"}
            onValueChange={(value) => setExactDates(value === "exact")}
            className="justify-start"
          >
            <ToggleGroupItem value="exact" className="text-sm">
              Fechas exactas
            </ToggleGroupItem>
            <ToggleGroupItem value="1day" className="text-sm">
              ± 1 día
            </ToggleGroupItem>
            <ToggleGroupItem value="2days" className="text-sm">
              ± 2 días
            </ToggleGroupItem>
            <ToggleGroupItem value="3days" className="text-sm">
              ± 3 días
            </ToggleGroupItem>
            <ToggleGroupItem value="7days" className="text-sm">
              ± 7 días
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );

    // Contenido del tab de fechas flexibles
    const getFlexibleContent = () => (
      <div className="m-0 p-4 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">¿Cuánto tiempo quieres quedarte?</h3>
          <p className="text-sm text-muted-foreground">Selecciona la duración y los meses que prefieres</p>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Duración de la estadía</h4>
          <ToggleGroup
            type="single"
            value={flexibleDuration}
            onValueChange={(value) => {
              if (value) {
                setFlexibleDuration(value);
                // Si estamos en modo fechas flexibles, activar immediatamente para mostrar el cambio
                if (activeTab === "flexible") {
                  setIsFlexibleActive(true);
                }
              }
            }}
            className="justify-center flex-wrap gap-2"
          >
            <ToggleGroupItem value="1" className="text-sm">
              1 noche
            </ToggleGroupItem>
            <ToggleGroupItem value="2-3" className="text-sm">
              2-3 noches
            </ToggleGroupItem>
            <ToggleGroupItem value="4-5" className="text-sm">
              4-5 noches
            </ToggleGroupItem>
            <ToggleGroupItem value="6-7" className="text-sm">
              6-7 noches
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Weekend Checkbox */}
        <div className="flex items-center justify-center space-x-2 p-3 bg-muted/30 rounded-lg">
          <input
            type="checkbox"
            id="weekend"
            checked={includeWeekend}
            onChange={(e) => setIncludeWeekend(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="weekend" className="text-sm font-medium">
            Debe incluir fin de semana
          </label>
        </div>

        {/* Month Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">¿Cuándo quieres viajar?</h4>
          <p className="text-xs text-muted-foreground">Puedes seleccionar múltiples meses</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: "june", label: "Junio", year: "2025" },
              { key: "july", label: "Julio", year: "2025" },
              { key: "august", label: "Agosto", year: "2025" },
              { key: "september", label: "Septiembre", year: "2025" },
              { key: "october", label: "Octubre", year: "2025" },
              { key: "november", label: "Noviembre", year: "2025" },
            ].map((month) => (
              <button
                key={month.key}
                onClick={() => {
                  const newMonths = flexibleMonths.includes(month.key)
                    ? flexibleMonths.filter(m => m !== month.key)
                    : [...flexibleMonths, month.key];
                  setFlexibleMonths(newMonths);
                  // Si estamos en modo fechas flexibles, activar immediatamente para mostrar el cambio
                  if (activeTab === "flexible" && newMonths.length > 0) {
                    setIsFlexibleActive(true);
                  }
                }}
                className={cn(
                  "p-3 rounded-lg border text-center transition-all text-sm hover:scale-105",
                  flexibleMonths.includes(month.key)
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "border-muted hover:bg-muted hover:border-primary/50"
                )}
              >
                <Calendar className="h-4 w-4 mx-auto mb-1" />
                <div className="font-medium">{month.label}</div>
                <div className="text-xs opacity-70">{month.year}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <div className={cn("flex flex-col gap-2 w-full md:w-auto", className)}>
        {label && (
          <Label className="text-sm font-medium text-foreground text-start">
            {label}
          </Label>
        )}
        
        <MobileFullscreenPopover
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
            if (!newOpen) {
              setActiveTrigger(null);
            }
          }}
          mobileTitle={dualTrigger ? 
            (activeTrigger === 'from' ? dualTriggerLabels.from : 
             activeTrigger === 'to' ? dualTriggerLabels.to : 
             "Seleccionar fechas") : 
            "Seleccionar fechas"
          }
          popoverContentProps={{
            className: "w-auto p-0 shadow-lg",
            align: "start",
            side: "bottom",
            sideOffset: -48,
            alignOffset: 0
          }}
          trigger={
            dualTrigger ? (
              // Dual trigger mode - two separate buttons with individual labels
              <div className="flex flex-col md:flex-row gap-4">
                {/* Fecha de ida */}
                <div className="relative w-full md:w-[280px]">
                  <Label className="text-sm font-medium text-foreground mb-2 block text-start">
                    {dualTriggerLabels.from}
                  </Label>
                  <Button
                    variant="outline"
                    disabled={disabled}
                    onClick={() => setActiveTrigger('from')}
                    className={cn(
                      "w-full justify-start h-12 text-left font-normal",
                      "text-base md:text-sm px-4 gap-2",
                      !selectedRange.from && "text-muted-foreground",
                      activeTrigger === 'from' && open && "ring-2 ring-primary"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">
                      {selectedRange.from ? format(selectedRange.from, "MMM d", { locale: es }) : "Seleccionar fecha"}
                    </span>
                  </Button>
                </div>
                
                {/* Fecha de regreso - solo mostrar si hasReturnDate es true */}
                {hasReturnDate && (
                  <div className="relative w-full md:w-[280px]">
                    <Label className="text-sm font-medium text-foreground mb-2 block text-start">
                      {dualTriggerLabels.to}
                    </Label>
                    <Button
                      variant="outline"
                      disabled={disabled}
                      onClick={() => setActiveTrigger('to')}
                      className={cn(
                        "w-full justify-start h-12 text-left font-normal",
                        "text-base md:text-sm px-4 gap-2",
                        !selectedRange.to && "text-muted-foreground",
                        activeTrigger === 'to' && open && "ring-2 ring-primary"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">
                        {selectedRange.to ? format(selectedRange.to, "MMM d", { locale: es }) : "Seleccionar fecha"}
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full md:w-[280px]">
                <Button
                  ref={ref}
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start h-12 text-left font-normal px-4 gap-4",
                    "text-base md:text-sm",
                    !selectedRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{displayText}</span>
                </Button>
              </div>
            )
          }
        >
          <div className="w-[600px] max-w-[95vw]">
            {showFlexibleDates ? (
              // Si flexible dates está habilitado, usar StandardTabs
              <StandardTabs
                items={[
                  {
                    value: "calendar",
                    label: "Calendario",
                    icon: <Calendar className="w-4 h-4" />,
                    content: getCalendarContent(),
                  },
                  {
                    value: "flexible",
                    label: "Fechas flexibles",
                    icon: <Calendar className="w-4 h-4" />,
                    content: getFlexibleContent(),
                  },
                ]}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as 'calendar' | 'flexible')}
                mobilePlaceholder="Selecciona tipo de fecha"
              />
            ) : (
              // Si no hay flexible dates, mostrar solo el contenido del calendario
              getCalendarContent()
            )}

            {/* Footer - Solo en desktop, en mobile se usa el header */}
            <div className="p-4 border-t bg-muted/30 md:block hidden">
              <div className="flex justify-end">
                <Button onClick={handleDone} className="px-6">
                  Listo
                </Button>
              </div>
            </div>
          </div>
        </MobileFullscreenPopover>
      </div>
    );
  }
);

DateRangePickerCustom.displayName = "DateRangePickerCustom";

export { DateRangePickerCustom };
