import { useState, useEffect, useRef, RefObject } from 'react';

interface UseStickyBoundaryOptions {
  /** Threshold in pixels to detect proximity to boundary */
  threshold?: number;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Hook personalizado para detectar cuando un elemento sticky llega a su límite inferior
 * 
 * @param options - Configuración del hook
 * @returns Object con refs para container y sticky element, y estado isAtBottom
 * 
 * @example
 * ```tsx
 * const { containerRef, stickyRef, isAtBottom } = useStickyBoundary({ threshold: 10 });
 * 
 * return (
 *   <div ref={containerRef} className="container">
 *     <div 
 *       ref={stickyRef} 
 *       className={`sticky ${isAtBottom ? 'at-bottom' : ''}`}
 *     >
 *       Sticky content
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useStickyBoundary(options: UseStickyBoundaryOptions = {}) {
  const { threshold = 10, debug = false } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;
      
      const container = containerRef.current;
      const sticky = stickyRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      
      // Calculamos si el sticky ha llegado al fondo del contenedor
      const containerBottom = containerRect.bottom;
      const stickyBottom = stickyRect.bottom;
      
      const isAtBottomState = Math.abs(containerBottom - stickyBottom) <= threshold;
      
      setIsAtBottom(prev => {
        if (prev !== isAtBottomState) {
          if (debug) {
            console.log('Sticky boundary state changed:', isAtBottomState ? 'at bottom' : 'not at bottom');
          }
          return isAtBottomState;
        }
        return prev;
      });
    };

    // Usar IntersectionObserver para mejor rendimiento
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAtBottomState = entry.intersectionRatio < 1 && 
                               entry.boundingClientRect.bottom > (entry.rootBounds?.bottom || 0);
        
        setIsAtBottom(prev => {
          if (prev !== isAtBottomState) {
            if (debug) {
              console.log('Sticky boundary state changed (IntersectionObserver):', 
                         isAtBottomState ? 'at bottom' : 'not at bottom');
            }
            return isAtBottomState;
          }
          return prev;
        });
      },
      {
        root: containerRef.current,
        threshold: [0, 0.1, 0.5, 0.9, 1]
      }
    );

    if (stickyRef.current && containerRef.current) {
      observer.observe(stickyRef.current);
    }

    // Fallback con scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, debug]);

  return {
    containerRef,
    stickyRef,
    isAtBottom
  };
}

export default useStickyBoundary;
