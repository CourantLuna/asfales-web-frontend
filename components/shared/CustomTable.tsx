"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
// Cambia aquí la importación:
import { ImageCarouselv2, OverlayCarrusel, OverlayValue } from "@/components/shared/ImageCarouselv2";

export type AspectRatio = "16:9" | "4:3" | "1:1" | "3:4" | "9:16";
export type Fit = "cover" | "contain";

export interface FieldGroup {
  field: string;
  type: "text" | "badge" | "number" | "time" | "benefits";
  className?: string;
}

export interface Column {
  field?: string;
  fields?: FieldGroup[];
  structure?: string;
  header: string;
  type: "text" | "images" | "rating" | "time" | "benefits";
  className?: string;
  aspectRatio?: AspectRatio;
  fit?: Fit;
  height?: string;
  // Nuevos props:
  overlayCarrusel?: OverlayCarrusel | OverlayCarrusel[];
  overlayValuesKey?: string; // El nombre del campo en RowData donde están los overlays de esa celda
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
  rowHeader?: number;
  tableOrientation?: "vertical" | "horizontal";
  onEntrySelect?: (index: number) => void;
}

export default function CustomTable({
  columns,
  data,
  actions,
  rowHeader = 0,
  tableOrientation = "vertical",
  onEntrySelect
}: CustomTableProps) {
  const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto border rounded-xl ">
      <table className="min-w-full text-sm mx-auto">
        {tableOrientation === "horizontal" ? (
          <>
            <thead>
              <tr className="border-b">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-3 py-1 font-semibold text-muted-foreground text-start">
                    {col.header}
                  </th>
                ))}
                {actions && <th className="px-3 py-1 font-semibold text-muted-foreground text-start">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  onClick={(e) => {
                    const interactive = (e.target as HTMLElement).closest("button, img, .no-action-click");
                    if (interactive) return;
                    onEntrySelect?.(rowIdx);
                  }}
                  className="group hover:bg-muted/100 transition-colors duration-200 cursor-pointer border-b"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`min-w-[180px] text-start align-top  border-r last:border-none 
                           ${col.type !== "images" ? "px-3 py-1" : ""} 
                        ${col.className || ""}`
                      }
                    >
                      {renderCellContent(col, item)}
                    </td>
                  ))}
                  {actions && (
                    <td className="min-w-[240px] px-3 py-1 text-start border-r last:border-none">
                      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-1 no-action-click">
                        {actions.map((action, j) => (
                          <Button
                            key={j}
                            variant={action.variant || "default"}
                            onClick={action.onClick}
                            className="w-[100px] "
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          // vertical (default)
          <>
            <thead>
              <tr className="border-b">
                {data.map((item, i) => (
                  <th
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEntrySelect?.(i);
                    }}
                    className={`px-3 py-1 font-semibold text-muted-foreground text-start border-r last:border-none cursor-pointer
                      ${hoveredColIndex === i ? "bg-muted/100" : ""}
                    `}
                  >
                    {item[columns[rowHeader]?.field || ""]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {columns
                .filter((_, idx) => idx !== rowHeader)
                .map((col, rowIdx) => (
                  <tr key={rowIdx} className="border-b">
                    {data.map((item, colIdx) => (
                      <td
                        key={colIdx}
                        onClick={(e) => {
                          const isActionArea = e.currentTarget.querySelector("button, img, .no-action-click");
                          if (isActionArea?.contains(e.target as Node)) return;
                          onEntrySelect?.(colIdx);
                        }}
                        className={`min-w-[240px]  text-start align-top border-r last:border-none cursor-pointer
                           ${col.type !== "images" ? "px-3 py-1" : ""} 
                          ${hoveredColIndex === colIdx ? "bg-muted/100" : ""}
                          ${col.className || ""}
                        `}
                      >
                        {renderCellContent(col, item)}
                      </td>
                    ))}
                  </tr>
                ))}
              {actions && (
                <tr>
                  {data.map((_, colIdx) => (
                    <td
                      key={colIdx}
                      onClick={(e) => {
                        const isActionArea = e.currentTarget.querySelector("button, img, .no-action-click");
                        if (isActionArea?.contains(e.target as Node)) return;
                        onEntrySelect?.(colIdx);
                      }}
                      className={`min-w-[240px] px-3 py-1 text-center border-r last:border-none
                        ${hoveredColIndex === colIdx ? "bg-muted/100" : ""}
                      `}
                    >
                      <div className="flex flex-col md:flex-row justify-center items-center gap-1 no-action-click">
                        {actions.map((action, j) => (
                          <Button
                            key={j}
                            variant={action.variant || "default"}
                            onClick={action.onClick}
                            className="w-[100px] "
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
          </>
        )}
      </table>
    </div>
  );
}

function renderCellContent(column: Column, row: RowData) {
  if (column.fields && column.structure) {
    return renderStructuredFields(column.fields, column.structure, row);
  }

  switch (column.type) {
    case "text":
      return String(row[column.field || ""] ?? "");
    case "images":
      return (
        <div className="flex items-start justify-center no-action-click">
          <ImageCarouselv2
            images={row[column.field || ""]?.[0] || []}
            heightClass={column.height || "h-[220px]"}
            className={column.className || ""}
            overlayCarrusel={column.overlayCarrusel}
            overlayValues={column.overlayValuesKey ? row[column.overlayValuesKey] : undefined}
          />
        </div>
      );
    case "time":
      return formatTime(row[column.field || ""]);
    case "benefits":
      return (
        <div className="flex flex-col justify-center items-start gap-1">
          {(row[column.field || ""] as { label: string; included: boolean }[])?.map((b) => (
            <div key={b.label} className="flex items-center gap-1">
              {b.included ? (
                <Check className="text-green-600 w-4 h-4" />
              ) : (
                <X className="text-red-500 w-4 h-4" />
              )}
              <span className={b.included ? "text-green-700" : "text-red-700"}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function renderStructuredFields(fields: FieldGroup[], structure: string, row: RowData) {
  const lines = structure.split("/").map(line =>
    line.split("-").map((key, groupIndex, group) => {
      const textLiteral = key.match(/^{{(.+?)}}$/);
      if (textLiteral) {
        const prevKey = groupIndex > 0 ? group[groupIndex - 1] : null;
        const prevFieldMatch = prevKey?.match(/^(\w+)/);
        const prevFieldName = prevFieldMatch?.[1];
        const prevField = fields.find(f => f.field === prevFieldName);
        return (
          <span key={key} className={prevField?.className}>
            {textLiteral[1]}
          </span>
        );
      }

      const fieldWithText = key.match(/^(\w+)-{(.+?)}$/);
      if (fieldWithText) {
        const config = fields.find(f => f.field === fieldWithText[1]);
        if (!config) return null;
        return (
          <span key={key} className={config.className}>
            {row[config.field]}{fieldWithText[2]}
          </span>
        );
      }

      const config = fields.find(f => f.field === key);
      if (!config) return null;
      if (config.type === "badge") {
        return <Badge key={key} className={config.className}>{row[key]}</Badge>;
      }
      return <span key={key} className={config.className}>{row[key]}</span>;
    })
  );

  return (
    <div className="flex flex-col items-start gap-1">
      {lines.map((group, i) => (
        <div key={i} className="flex flex-row items-center gap-1">
          {group}
        </div>
      ))}
    </div>
  );
}

function formatTime(value: any): string {
  try {
    return format(new Date(value), "HH:mm");
  } catch {
    return "-";
  }
}
