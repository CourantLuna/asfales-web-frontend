"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DateRangePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  return (
    <div className="relative w-full md:w-[280px]">
      <Popover>
        <PopoverTrigger asChild>
        <Button
  variant="outline"
  id="dates"
  className="flex w-full h-12 md:w-72 items-center justify-between font-normal px-3"
>
  {/* Icono + texto a la izquierda */}
  <span className="flex items-center gap-3 overflow-hidden">
    <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    <span className="truncate">
      {range?.from && range?.to
        ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
        : "Seleccione fechas"}
    </span>
  </span>

  {/* Chevron a la derecha */}
  <ChevronDownIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
</Button>




        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(range) => {
              setRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
