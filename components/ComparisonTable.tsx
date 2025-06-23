// components/ComparisonTable.tsx
"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "./ui/image-carousel"
import clsx from "clsx"

export type ComparisonRow =
  | {
      label?: string
      rowType: "default" | "text"
      values: string[]
        className?: string

    }
  | {
      label?: string
      rowType: "calificacion"
      values: { score: number; label: string; reviews: string }[]
    }
  | {
      label?: string
      rowType: "beneficios"
      values: Record<string, boolean>[]
    }
  | {
      label?: string
      rowType: "imagenes"
      values: string[][]
      aspectRatio?: "1:1" | "2:1" | "1:2" | "16:9" | "4:3"
    }
  | {
      label?: string
      rowType: "acciones"
      values: { label: string;
                onClick?: () => void; 
                icon?: React.ElementType; 
                variant?: "default" | "destructive" | "outline"| "secondary" | "ghost"| "link" }[][]
    }

export type ComparisonTableProps = {
  headers: string[]
  rows: ComparisonRow[]
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="border rounded-xl py-4 overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="hidden md:table-cell text-muted-foreground font-medium w-48"></th>
            {headers.map((header, i) => (
              <th key={i} className="text-center font-semibold text-gray-800">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
           {rows.map((row, rowIndex) => {
            if (row.rowType === "default" || row.rowType === "text") {
              return (
                <tr key={rowIndex} className="border-b">
                  <td className="hidden md:table-cell py-3 text-muted-foreground ">{row?.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className={clsx("text-center min-w-[240px]", row.className)} >
                      {val}
                    </td>
                  ))}
                </tr>
              )
            }

            if (row.rowType === "calificacion") {
              return (
                <tr key={rowIndex} className="border-b">
                  <td className="hidden md:table-cell py-5 text-muted-foreground">{row?.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="text-center space-y-1">
                      <div className="inline-flex items-center gap-2 justify-center">
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          {val.score.toFixed(1)}
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {val.label}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">{val.reviews}</div>
                    </td>
                  ))}
                </tr>
              )
            }

         if (row.rowType === "beneficios") {
              const keys = Object.keys(row.values[0])
              return (
                <tr key={rowIndex} className="border-b">
                  <td className="hidden md:table-cell py-3 text-muted-foreground align-top">{row?.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="text-center">
                      <div className="inline-flex flex-col items-center px-3 py-2 gap-1">
                        {keys.map((beneficio, bIndex) => (
                          <div key={bIndex} className="flex items-center gap-1 text-sm">
                            {val[beneficio] ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <Check className="w-4 h-4" /> {beneficio}
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center gap-1">
                                <X className="w-4 h-4" /> {beneficio}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              )
            }

            if (row.rowType === "imagenes") {
              return (
                <tr key={rowIndex} className="border-b">
                  <td className="hidden md:table-cell py-3 text-muted-foreground">{row?.label}</td>
                  {row.values.map((imgs, i) => (
                    <td key={i} className="text-center">
                      <ImageCarousel
                        images={imgs}
                        aspectRatio={row.aspectRatio || "1:1"}
                        className="mx-auto"
                      />
                    </td>
                  ))}
                </tr>
              )
            }

            if (row.rowType === "acciones") {
  return (
    <tr key={rowIndex}>
      <td className="hidden md:table-cell py-4 text-muted-foreground">
        {row?.label}
      </td>
      {row.values.map((actions, i) => (
        <td key={i} className="pt-4">
          <div className="flex flex-col md:flex-row justify-center h-full items-center gap-2">
            {actions.map((action, j) => (
              <Button
                key={j}
                size="sm"
                variant={action.variant}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
}


            return null
          })}
        </tbody>
      </table>
    </div>
  )
}
