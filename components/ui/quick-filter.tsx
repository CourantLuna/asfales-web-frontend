"use client"

import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export type FilterOption = {
  label: string
  value: string
  icon?: React.ElementType
}

type QuickFilterProps = {
  label: string
  options: FilterOption[]
  selected: string[]
  setSelected: (val: string[]) => void
}

export function QuickFilter({ label, options, selected, setSelected }: QuickFilterProps) {
  const toggle = (value: string) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-start gap-2 border-dashed w-full md:w-[280px] h-12 inline-flex items-center">
          <Filter className="w-4 h-4" />
          {label}
          {selected.map((val) => {
            const opt = options.find((o) => o.value === val)
            return (
              <span
                key={val}
                className="bg-yellow-400 text-black font-medium ml-1 text-xs rounded px-2 py-0.5"
              >
                {opt?.label}
              </span>
            )
          })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-2">
        {options.map((opt) => (
          <div
            key={opt.value}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggle(opt.value)}
          >
            <div className="flex items-center gap-2">
              {opt.icon && <opt.icon className="h-4 w-4 text-muted-foreground" />}
              <span>{opt.label}</span>
            </div>
            <input type="checkbox" checked={selected.includes(opt.value)} readOnly />
          </div>
        ))}
        <div className="text-center pt-2 border-t">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setSelected([])}
          >
            Borrar filtros
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
