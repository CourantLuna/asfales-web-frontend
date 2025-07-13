'use client';

import { useState, useCallback } from 'react';

interface UsePaginationProps {
  /** Número inicial de elementos visibles */
  initialVisibleItems: number;
  /** Número de elementos a agregar por cada paso */
  itemsPerStep: number;
  /** Número total de elementos disponibles */
  totalItems?: number;
}

interface UsePaginationReturn {
  /** Número actual de elementos visibles */
  visibleItems: number;
  /** Función para mostrar más elementos */
  showMore: () => void;
  /** Función para mostrar menos elementos (volver al inicial) */
  showLess: () => void;
  /** Función para resetear la paginación */
  reset: () => void;
  /** Si hay más elementos para mostrar */
  hasMore: boolean;
  /** Si se puede mostrar menos (más allá del inicial) */
  canShowLess: boolean;
}

/**
 * Hook personalizado para manejar la paginación de elementos
 */
export const usePagination = ({
  initialVisibleItems,
  itemsPerStep,
  totalItems
}: UsePaginationProps): UsePaginationReturn => {
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

  const showMore = useCallback(() => {
    if (totalItems) {
      setVisibleItems(prev => Math.min(prev + itemsPerStep, totalItems));
    } else {
      setVisibleItems(prev => prev + itemsPerStep);
    }
  }, [itemsPerStep, totalItems]);

  const showLess = useCallback(() => {
    setVisibleItems(initialVisibleItems);
  }, [initialVisibleItems]);

  const reset = useCallback(() => {
    setVisibleItems(initialVisibleItems);
  }, [initialVisibleItems]);

  const hasMore = totalItems ? visibleItems < totalItems : true;
  const canShowLess = visibleItems > initialVisibleItems;

  return {
    visibleItems,
    showMore,
    showLess,
    reset,
    hasMore,
    canShowLess
  };
};

export default usePagination;
