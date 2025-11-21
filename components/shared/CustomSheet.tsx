"use client";

import { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
  fixedContent?: ReactNode;
  showShareButton?: boolean;
  showFavoriteButton?: boolean;
  onShareClick?: () => void;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
  className?: string;
}

export function CustomSheet({
  open,
  onOpenChange,
  title,
  children,
  fixedContent,
  showShareButton = false,
  showFavoriteButton = false,
  onShareClick,
  onFavoriteClick,
  isFavorite = false,
  className
}: CustomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "flex flex-col p-0 w-full lg:max-w-[480px]",
          className
        )}
      >
        {/* Header fijo */}
        <div className="sticky top-0 z-40 bg-background border-b">
          <SheetHeader className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
role="button"                  onClick={() => onOpenChange?.(false)}
                  className="shrink-0"
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </div>
                <SheetTitle className="text-left mr-auto">{title}</SheetTitle>
              </div>
              
              <div className="flex items-center gap-4">
                {showShareButton && (
                  <div
                    role="button"
                    onClick={onShareClick}
                    className="shrink-0"
                  >
                    <Share className="h-6 w-6 text-primary" />
                  </div>
                )}
                
                {showFavoriteButton && (
                  <div
                    role="button"
                    onClick={onFavoriteClick}
                    className={cn(
                      "shrink-0 transition-colors text-primary hover:text-red-600",
                      isFavorite && "text-red-500 hover:text-red-600",
                      !isFavorite && "hover:text-red-500"
                    )}
                  >
                    <Heart 
                      className={cn(
                        "h-6 w-6 ",
                        isFavorite && "fill-current"
                      )} 
                    />
                  </div>
                )}
              </div>
            </div>
          </SheetHeader>
          
          {/* Contenido fijo opcional debajo del header */}
          {fixedContent && (
            <div className="bg-background px-4 py-2">
              {fixedContent}
            </div>
          )}
        </div>

        {/* Contenido principal scrolleable */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
