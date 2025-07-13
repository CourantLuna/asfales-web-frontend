'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Plus, Minus } from 'lucide-react';

interface PaginationCardProps {
  /** Número total de elementos */
  totalItems: number;
  /** Número de elementos visibles actualmente */
  visibleItems: number;
  /** Número inicial de elementos visibles */
  initialVisibleItems: number;
  /** Número de elementos a mostrar por paso */
  itemsPerStep: number;
  /** Callback cuando se hace click en "Mostrar más" */
  onShowMore: () => void;
  /** Callback cuando se hace click en "Mostrar menos" */
  onShowLess: () => void;
  /** Texto para el tipo de elemento (ej: "vuelos", "hoteles", "experiencias") */
  itemLabel: string;
  /** Texto personalizado para el botón "Mostrar más" */
  showMoreText?: string;
  /** Texto personalizado para el botón "Mostrar menos" */
  showLessText?: string;
  /** Mensaje cuando se han visto todos los elementos */
  allItemsMessage?: string;
  /** Clases CSS personalizadas */
  className?: string;
  /** Si mostrar la barra de progreso */
  showProgressBar?: boolean;
  /** Color del progreso (clase de Tailwind) */
  progressColor?: string;
}

const PaginationCard: React.FC<PaginationCardProps> = ({
  totalItems,
  visibleItems,
  initialVisibleItems,
  itemsPerStep,
  onShowMore,
  onShowLess,
  itemLabel,
  showMoreText,
  showLessText,
  allItemsMessage,
  className = '',
  showProgressBar = true,
  progressColor = 'bg-primary'
}) => {
  // No mostrar nada si no hay elementos para paginar
  if (totalItems <= initialVisibleItems) {
    return null;
  }

  const hasMoreItems = visibleItems < totalItems;
  const canShowLess = visibleItems > initialVisibleItems;
  const remainingItems = totalItems - visibleItems;
  const nextStepItems = Math.min(itemsPerStep, remainingItems);
  const progressPercentage = (visibleItems / totalItems) * 100;

  return (
    <div className={`flex flex-col items-center space-y-3 py-6 ${className}`}>
      {/* Contador de elementos */}
      <div className="text-sm text-gray-600 text-center">
        Mostrando {visibleItems} de {totalItems} {itemLabel}
      </div>

      {/* Botones de control */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        {hasMoreItems && (
          <Button
            onClick={onShowMore}
            variant="outline"
            className="w-full md:w-80 flex items-center space-x-2 px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>
              {showMoreText || `Mostrar más ${itemLabel}`} ({nextStepItems} más)
            </span>
          </Button>
        )}

        {canShowLess && (
          <Button
            onClick={onShowLess}
            variant="ghost"
            className="w-full md:w-80 text-gray-600 hover:text-gray-800 flex items-center space-x-2 px-6 py-2 border-2"
          >
            <Minus className="h-4 w-4" />
            <span>{showLessText || `Mostrar menos ${itemLabel}`}</span>
          </Button>
        )}
      </div>

      {/* Barra de progreso */}
      {showProgressBar && totalItems > initialVisibleItems && (
        <div className="w-full max-w-xs">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            {Math.round(progressPercentage)}% cargado
          </div>
        </div>
      )}

      {/* Mensaje cuando se han visto todos los elementos */}
      {!hasMoreItems && totalItems > initialVisibleItems && (
        <div className="text-center py-4">
          <p className="text-gray-600 text-sm">
            {allItemsMessage || `✨ Has visto todos los ${itemLabel} disponibles`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginationCard;
