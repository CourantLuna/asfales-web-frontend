"use client";

import { ChevronUp, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CompareDialog } from "./CompareDialog";

export interface CompareSheetProps {
  items: any[];
  max: number;
  itemName: string;
  keyName: string;

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
    return items;
  };

  return (
    <div className="w-full flex justify-center">
      <CompareDialog open={compareOpen} onOpenChange={setCompareOpen} />

      <div
        className={cn(
          "fixed bottom-0 md:w-[70vw] w-full transition-all duration-300 z-[50]",
          isOpen ? "translate-y-0" : "translate-y-[75%]"
        )}
      >
        <div
          className="bg-blue-600 text-white rounded-t-2xl px-4 py-3 shadow-lg cursor-pointer"
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
            <div className="flex gap-3 overflow-x-auto py-2 flex-1">
              {Array.from({ length: max }).map((_, index) => {
                const itemWrapper = items[index];

                if (itemWrapper) {
                  const keyValue = itemWrapper[keyName];
                  const row = itemWrapper.item;

                  const imageUrl =
                    (row && imageSelector?.(row)) ||
                    row?.image ||
                    row?.images?.[0] ||
                    undefined;

                  return (
                    <div
                      key={keyValue}
                      className="relative w-20 h-20 rounded-lg border shadow-sm shrink-0 overflow-visible"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={"item"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={`https://placehold.co/600x400?text=${keyValue}`}
                          alt={"item"}
                          fill
                          className="object-cover"
                        />
                      )}

                      <button
                        className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1"
                        onClick={() => onRemove(keyValue)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={`empty-${index}`}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 shrink-0"
                  />
                );
              })}
            </div>

            <div className="flex flex-col gap-2 shrink-0 md:flex-row">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-full bg-white border border-gray-400 text-gray-700 font-medium w-[110px]"
              >
                Cancelar
              </button>

              <button
                onClick={compareThis}
                className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold w-[110px]"
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
