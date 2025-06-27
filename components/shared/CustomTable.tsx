// CustomTable.tsx
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { ImageCarousel } from "@/components/ui/image-carousel";

export interface FieldGroup {
  field: string;
  type: "text" | "badge" | "number" | "time"| "benefits";
  className?: string;
}

export interface Column {
  field?: string;
  fields?: FieldGroup[];
  structure?: string;
  header: string;
  type: "text" | "images" | "rating" | "time" | "benefits";
  className?: string;
  aspectRatio?: "1:1" | "2:1" | "1:2" | "16:9" | "4:3";
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
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
const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto border rounded-xl ">
      <table className="min-w-full text-sm mx-auto">
{tableOrientation === "horizontal" ? (
  <>
    <thead>
      <tr className="border-b">
        {columns.map((col, idx) => (
          <th key={idx} className="p-2 font-semibold text-muted-foreground text-center">
            {col.header}
          </th>
        ))}
        {actions && <th className="p-2 font-semibold text-muted-foreground text-center">Acciones</th>}
      </tr>
    </thead>
    <tbody>
  {data.map((item, rowIdx) => {
    const rowFirstField = columns[0]?.field
      ? item[columns[0].field]
      : Object.values(item)[0];

    return (
      <tr
  key={rowIdx}
  onClick={(e) => {
    const interactive = (e.target as HTMLElement).closest("button, img, .no-action-click");
    if (interactive) return;
    onEntrySelect?.(rowIdx); // ← notifica al padre
  }}
  className="group hover:bg-muted/50 transition-colors duration-200 cursor-pointer border-b"
>

        {columns.map((col, colIdx) => (
          <td
            key={colIdx}
            className={`min-w-[180px] p-2 text-center align-top border-r last:border-none ${
    col.className || ""
  }`}
          >
            {renderCellContent(col, item)}
          </td>
        ))}

        {actions && (
          <td className="min-w-[240px] p-2 text-center border-r last:border-none">
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
    );
  })}
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
    onEntrySelect?.(i); // ← notifica al padre
  }}

        className={`p-2 font-semibold text-muted-foreground text-center border-r last:border-none cursor-pointer
          ${hoveredColIndex === i ? "bg-muted/40" : ""}
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
    onEntrySelect?.(colIdx); // ← notifica al padre
  }}

            className={`min-w-[240px] p-1 text-center align-top border-r last:border-none cursor-pointer
              ${hoveredColIndex === colIdx ? "bg-muted/50" : ""}
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
    onEntrySelect?.(colIdx); // ← notifica al padre
  }}

          className={`min-w-[240px] p-2 text-center border-r last:border-none
            ${hoveredColIndex === colIdx ? "bg-muted/20" : ""}
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
        <div className="flex items-center justify-center max-w-[200px] mx-auto no-action-click">
          <ImageCarousel
            images={row[column.field || ""]?.[0] || []}
            aspectRatio={column.aspectRatio || "4:3"}
            fit={column.fit || "cover"}
            className={column.className || ""}
          />
        </div>
      );
    case "time":
      return formatTime(row[column.field || ""]);
    case "benefits":
  return (
    <div className="flex flex-col justify-center items-center gap-1">
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
    <div className="flex flex-col items-center gap-1">
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
