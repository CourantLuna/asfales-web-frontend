"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
// Cambia aquí la importación:
import { ImageCarouselv2, OverlayCarrusel, OverlayValue } from "@/components/shared/ImageCarouselv2";
import { departureTimeOptions } from '../transport/Fligths/lib/flight-filter-options';

export type AspectRatio = "16:9" | "4:3" | "1:1" | "3:4" | "9:16";
export type Fit = "cover" | "contain";

export interface FieldGroup {
  field: string;
  type: "text" | "badge" | "number" | "time" | "benefits" | "rating" ;
  className?: string;
}

export type FieldType =
 "text" | "images" | "rating" | "time" | "benefits" | "badge" | "image" | "currency" | "datetime" | "TransportStops"

export interface Column {
  field?: string;
  fields?: FieldGroup[];
  structure?: string;
  header: string;
  type: FieldType;
  className?: string;
  aspectRatio?: AspectRatio;
  variant?: "secondary" | "default" | "outline" | "destructive" | null | undefined
  badgeClass?: string,
  fit?: Fit;
  height?: string;
  // Nuevos props:
  overlayCarrusel?: OverlayCarrusel | OverlayCarrusel[];
  overlayValuesKey?: string; // El nombre del campo en RowData donde están los overlays de esa celda
  sufixText?: string,
  prefixText?: string
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
    // Usamos el helper getNestedValue para obtener el dato, o string vacío si es null
      const rawValue = getNestedValue(row, column.field || "") ?? "";
      // Construimos el string: (prefijo o nada) + valor + (sufijo o nada)
      return `${column.prefixText || ""}${String(rawValue)}${column.sufixText || ""}`;

case "currency":
      const valCurrency = getNestedValue(row, column.field || "");
      
      // Si es nulo o indefinido
      if (valCurrency === undefined || valCurrency === null) return "-";

      const numValue = Number(valCurrency);

      // Si no es un número válido, lo mostramos como texto normal
      if (isNaN(numValue)) {
         return `${column.prefixText || ""}${String(valCurrency)}${column.sufixText || ""}`;
      }

      // Formateo estándar (ej: 1,234.56)
      const formattedNumber = numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return `${column.prefixText || ""}${formattedNumber}${column.sufixText || ""}`;

    case "images":
      return (
        <div className="flex items-start justify-center no-action-click">
          <ImageCarouselv2
            images={row[column.field || ""]}
            heightClass={column.height || "h-[220px]"}
            className={column.className || ""}
            overlayCarrusel={column.overlayCarrusel}
            overlayValues={column.overlayValuesKey ? row[column.overlayValuesKey] : undefined}
          />
        </div>
      );
    case "time":
      return  `${column.prefixText || ""}${formatTime(row[column.field || ""])} ${column.sufixText || ""}` ;

      case "datetime":
      const valDateTime = getNestedValue(row, column.field || "");
      
      if (!valDateTime) return "-";

      let formattedDate = "";
      try {
        // Formato: "dd/MM/yyyy HH:mm" (Ej: 20/05/2026 14:30)
        // Puedes cambiar el string de formato según tu preferencia
        formattedDate = format(new Date(valDateTime), "dd/MM/yyyy HH:mm");
      } catch (error) {
        // Si falla el parseo, mostramos el valor original
        formattedDate = String(valDateTime);
      }

      return `${column.prefixText || ""}${formattedDate}${column.sufixText || ""}`;

    case "badge":
      const valBadge = getNestedValue(row, column.field || "");
      
      // Si el valor no existe, no mostramos el badge (o puedes retornar "-")
      if (valBadge === undefined || valBadge === null || valBadge === "") return null;

      return (
         <div className={column.className + "justify-center items-center py-1"}>
          {column.prefixText || ""}
        <Badge 
          variant={column.variant} // 'secondary' es un buen estilo base, pero className lo sobreescribe
          className={column.badgeClass || ""}
        >
         
          {String(valBadge)}
         
        </Badge>
         {column.sufixText || ""}
         </div>
      );
        
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

      case "TransportStops":
      const stopsData = row["stops"];

      // Si no es un array o está vacío, asumimos que es directo
      if (!Array.isArray(stopsData) || stopsData.length === 0) {
        return (
          <span className="text-muted-foreground text-xs italic flex items-center gap-1">
             Sin escalas (Directo)
          </span>
        );
      }

      return (
        <div className="flex flex-col gap-3 py-1">
          {stopsData.map((item: any, idx: number) => (
            <div key={idx} className="relative pl-3 border-l-2 border-gray-200 last:border-0">
              {/* Punto visual de la línea de tiempo */}
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-400"></div>

              {/* Cabecera: Código y Ciudad */}
              <div className="flex items-center gap-2 mb-0.5">
                <Badge variant="outline" className="h-5 px-1 text-[10px] font-mono bg-gray-50 text-gray-700 border-gray-300">
                  {item.stop?.stopCode || "N/A"}
                </Badge>
                <span className="font-semibold text-xs text-gray-800">
                  {item.stop?.city || "Desconocido"}
                </span>
              </div>

              {/* Nombre del aeropuerto (opcional, pequeño) */}
              <div className="text-[10px] text-gray-500 leading-tight mb-1 truncate max-w-[180px]" title={item.stop?.stopName}>
                {item.stop?.stopName}
              </div>

              {/* Horarios */}
              <div className="flex items-center gap-3 text-[10px] text-gray-600 bg-gray-50/50 p-1 rounded w-fit">
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] text-gray-400 uppercase">Llegada</span>
                  <span className="font-mono">{format(new Date(item.arrivalTime), "dd/MM/yyyy HH:mm")}</span>
                </div>
                <div className="h-4 w-px bg-gray-300 mx-1"></div> {/* Separador */}
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] text-gray-400 uppercase">Salida</span>
                  <span className="font-mono">{format(new Date(item.departureTime), "dd/MM/yyyy HH:mm")}</span>
                </div>
              </div>
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


// Helper para obtener valores anidados: "afterPrice.value" -> row["afterPrice"]["value"]
function getNestedValue(obj: any, path: string): any {
  if (!path) return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
}