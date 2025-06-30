"use client"

import { useEffect, useState } from "react"
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

  // Detect viewport width for responsive logic
  const [isMdUp, setIsMdUp] = useState(true)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const updateMatch = () => setIsMdUp(media.matches)
    updateMatch()
    media.addEventListener("change", updateMatch)
    return () => media.removeEventListener("change", updateMatch)
  }, [])

  const badgeLimit = isMdUp ? 2 : 1
  const visibleBadges = selected.slice(0, badgeLimit)
  const extraCount = selected.length - visibleBadges.length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex justify-start items-center gap-2 border-dashed w-full md:w-auto  h-12">
          <Filter className="w-4 h-4" />
          {label}
          {visibleBadges.map((val) => {
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
          {extraCount > 0 && (
            <span className="bg-blue-600 text-white font-medium ml-1 text-xs rounded px-2 py-0.5">
              +{extraCount}
            </span>
          )}
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
