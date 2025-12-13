"use client";

import { ChevronUp, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CompareDialog } from "./CompareDialog";
import { Column } from "@/components/shared/CustomTable"; // Importamos el tipo Column

export interface CompareSheetProps {
  items: any[];
  max: number;
  itemName: string;
  keyName: string;
  // Nuevo prop obligatorio para saber cómo dibujar la tabla de comparación
  columns: Column[]; 

  isOpen: boolean;
  onToggle: () => void;
  onRemove: (key: any) => void;
  onCancel: () => void;
  onCompare: (items: any[]) => void;

  imageSelector?: (row: any) => string | undefined;
}

export function CompareSheet({
  items,
  max,
  itemName,
  keyName,
  columns, // Recibimos las columnas
  isOpen,
  onToggle,
  onRemove,
  onCancel,
  onCompare,
  imageSelector,
}: CompareSheetProps) {
  const [compareOpen, setCompareOpen] = useState(false);

  const compareThis = () => {
    onCompare(items);
    setCompareOpen(true);
    console.log("items ahora compare", items);
    // return items; // No es estrictamente necesario retornar aquí
  };

  return (
    <div className="w-full flex justify-center">
      {/* Pasamos items y columns al Dialog */}
      <CompareDialog 
        open={compareOpen} 
        onOpenChange={setCompareOpen} 
        items={items}
        columns={columns}
      />

      <div
        className={cn(
          "fixed bottom-0 md:w-[70vw] w-full transition-all duration-300 z-[50]",
          isOpen ? "translate-y-0" : "translate-y-[75%]"
        )}
      >
        <div
          className="bg-blue-600 text-white rounded-t-2xl px-4 py-3 shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
            <span className="font-semibold">
              Seleccionaste {items.length} de {max} {itemName}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "bg-white px-4 py-4 shadow-xl border-t transition-all duration-300",
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3 overflow-x-auto py-2 flex-1 scrollbar-thin scrollbar-thumb-gray-300">
              {Array.from({ length: max }).map((_, index) => {
                const itemWrapper = items[index];

                if (itemWrapper) {
                  const keyValue = itemWrapper[keyName];
                  const row = itemWrapper.item; // Asumimos estructura { key:..., item:... }

                  const imageUrl =
                    (row && imageSelector?.(row)) ||
                    row?.image ||
                    row?.images?.[0] ||
                    undefined;

                  return (
                    <div
                      key={keyValue}
                      className="relative w-20 h-20 rounded-lg border shadow-sm shrink-0 overflow-hidden bg-gray-50 group"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={"item"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted text-xs text-muted-foreground p-1 text-center break-all">
                           {keyValue}
                        </div>
                      )}

                      <button
                        className="absolute top-1 right-1 bg-white/90 rounded-full shadow-sm p-0.5 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(keyValue);
                        }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={`empty-${index}`}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 shrink-0 flex items-center justify-center"
                  >
                     <span className="text-gray-300 text-xs">Vacío</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 shrink-0 md:flex-row">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium w-[110px] text-sm transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={compareThis}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold w-[110px] text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                disabled={items.length < 2}
              >
                Comparar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}