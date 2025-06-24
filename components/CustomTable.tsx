// CustomTable.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";

export interface Column {
  field?: string;
  fields?: string[];
  header: string;
  type: "text" | "images" | "rating" | "time";
  className?: string;
  aspectRatio?: "1:1" | "2:1" | "1:2" | "16:9" | "4:3";
}

export interface Action {
  label: string;
  variant?: "default" | "secondary" | "outline";
  onClick?: () => void;
}

export interface RowData {
  [key: string]: any;
}

export interface CustomTableProps {
  columns: Column[];
  data: RowData[];
  actions?: Action[];
  rowHeader?: number; // índice del campo que será usado como header y excluido del cuerpo
}

export default function CustomTable({
  columns,
  data,
  actions,
  rowHeader = 0,
}: CustomTableProps) {
  const headerField = columns[rowHeader]?.field;

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            {data.map((item, i) => (
              <th
                key={i}
                className="p-2 font-semibold text-muted-foreground text-center"
              >
                {item[headerField || ""] as string}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns
            .filter((_, idx) => idx !== rowHeader)
            .map((col, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {data.map((item, colIndex) => (
                  <td
                    key={colIndex}
                    className={`min-w-[240px] p-1 text-center align-top ${
                      col.className || ""
                    }`.trim()}
                  >
                    {renderCellContent(col, item)}
                  </td>
                ))}
              </tr>
            ))}

          {/* Beneficios */}
          {data[0]?.benefits && (
            <tr className="border-b">
              {data.map((item, idx) => (
                <td key={idx} className="min-w-[240px] p-4 text-sm">
                  <div className="flex flex-col justify-center items-center gap-1">
                    {item.benefits.map(
                      (b: { label: string; included: boolean }) => (
                        <div key={b.label} className="flex items-center gap-1">
                          {b.included ? (
                            <Check className="text-green-600 w-4 h-4" />
                          ) : (
                            <X className="text-red-500 w-4 h-4" />
                          )}
                          <span
                            className={
                              b.included ? "text-green-700" : "text-red-700"
                            }
                          >
                            {b.label}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </td>
              ))}
            </tr>
          )}

{/* Acciones */}
{actions && (
  <tr>
    {data.map((_, i) => (
      <td key={i} className="min-w-[240px] p-2 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          {actions.map((action, j) => (
            <Button
              key={j}
              variant={action.variant || "default"}
              className="w-[100px]"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </td>
    ))}
  </tr>
)}



        </tbody>
      </table>
    </div>
  );
}

function renderCellContent(column: Column, row: RowData) {
  switch (column.type) {
    case "text":
      return String(row[column.field || ""] ?? "");
    case "images":
      return (
        <div className="flex items-center justify-center max-w-[200px] mx-auto">
          <ImageCarousel
            images={row[column.field || ""]?.[0] || []}
            aspectRatio={column.aspectRatio || "4:3"}
          />
        </div>
      );
    case "rating":
      const [score, label, reviews] = column.fields!.map((f) => row[f]);
      return (
        <div className="text-center">
          <Badge className="bg-green-600 text-white text-sm px-2 py-1 font-bold">
            {score}
          </Badge>
          <div>{label}</div>
          <div className="text-xs text-muted-foreground">
            {reviews} opiniones
          </div>
        </div>
      );
    case "time":
      return formatTime(row[column.field || ""]);
  }
}

function formatTime(value: any): string {
  try {
    return format(new Date(value), "HH:mm");
  } catch {
    return "-";
  }
}
