"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isToday, isBefore, isSameDay, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";

export interface SingleDatePickerProps {
  /**
   * Label for the date picker
   */
  label?: string;
  /**
   * Current selected date
   */
  value?: Date;
  /**
   * Change handler for date
   */
  onChange?: (date: Date | undefined) => void;
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
   * Minimum selectable date
   */
  minDate?: Date;
}

const SingleDatePicker = React.forwardRef<HTMLButtonElement, SingleDatePickerProps>(
  ({ label, value, onChange, placeholder = "Seleccionar fecha", disabled, className, minDate }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(value || new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);

    // Sync with external value
    React.useEffect(() => {
      setSelectedDate(value);
    }, [value]);

    const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
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
        const isSelected = selectedDate && isSameDay(currentDate, selectedDate);
        const isToday_ = isToday(currentDate);
        const isPast = minDate ? isBefore(currentDate, minDate) : isBefore(currentDate, new Date()) && !isToday_;

        days.push(
          <button
            key={currentDate.toISOString()}
            onClick={() => handleDateClick(currentDate)}
            disabled={isPast}
            className={cn(
              "h-10 w-10 rounded-full text-sm font-medium transition-colors",
              "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
              isSelected && "bg-primary text-primary-foreground hover:bg-primary",
              isToday_ && !isSelected && "bg-muted font-bold",
              isPast && "text-muted-foreground opacity-50 cursor-not-allowed"
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

    const displayText = React.useMemo(() => {
      if (selectedDate) {
        return format(selectedDate, "EEE, MMM d", { locale: es });
      }
      return placeholder;
    }, [selectedDate, placeholder]);

    return (
      <div className={cn("flex flex-col gap-2 w-full md:w-[280px]", className)}>
        {label && (
          <Label className="text-sm font-medium text-foreground">
            {label}
          </Label>
        )}
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-start h-12 text-left font-normal",
                "text-base md:text-sm",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {displayText}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent 
            className="w-auto p-4 shadow-lg" 
            align="start" 
            side="bottom"
            sideOffset={-48}
            alignOffset={0}
          >
            <div className="space-y-4">
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                >
                  →
                </Button>
              </div>

              {/* Calendar */}
              {renderCalendar(currentMonth)}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SingleDatePicker.displayName = "SingleDatePicker";

export { SingleDatePicker };
