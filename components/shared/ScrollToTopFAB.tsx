"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollToTopFABProps {
  threshold?: number; // Distancia en px para mostrar el FAB
  duration?: number; // Duración de la animación de scroll
  scrollToPosition?: number; // Posición Y específica a la que regresar (debe ser menor que threshold)
  className?: string;
}

export function ScrollToTopFAB({ 
  threshold = 300, 
  duration = 800,
  scrollToPosition = 0,
  className = ""
}: ScrollToTopFABProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Validar que scrollToPosition sea menor que threshold
  const targetPosition = Math.max(0, Math.min(scrollToPosition, threshold - 1));
  
  // Warning en desarrollo si la configuración no es óptima
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && scrollToPosition >= threshold) {
      console.warn(
        `ScrollToTopFAB: scrollToPosition (${scrollToPosition}) should be less than threshold (${threshold}) for optimal UX. Using ${targetPosition} instead.`
      );
    }
  }, [scrollToPosition, threshold, targetPosition]);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const toggleVisibility = () => {
      const wasVisible = isVisible;
      const shouldBeVisible = window.scrollY > threshold;
      
      if (shouldBeVisible !== wasVisible) {
        setIsVisible(shouldBeVisible);
        
        // Activar animación de salto cuando aparece
        if (shouldBeVisible && !wasVisible) {
          setShouldAnimate(true);
          // Desactivar la animación después de que termine
          setTimeout(() => setShouldAnimate(false), 800);
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold, isMounted, isVisible]);

 const scrollToTop = () => {
  if (typeof window === "undefined") return;

  // Detectar mobile (puedes ajustar el breakpoint)
  // const isMobile = window.innerWidth < 768;

  // if (isMobile) {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   return;
  // }

  // ...existing code for animated scroll...
  const currentY = window.scrollY;
  const start = currentY;
  const target = 0;
  const distance = start - target;
  const startTime = performance.now();

  if (Math.abs(distance) < 10) return;

  const animate = (time: number) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOut = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const currentPosition = start - (distance * easeInOut);
    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        // Use CSS media queries for mobile detection to avoid hydration issues
        "fixed bottom-20 right-4 md:right-8 lg:right-12 z-40 transition-all duration-300 ease-in-out",
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-4 scale-90 pointer-events-none",
        className
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          // Estilo FAB - circular y elevado
          "h-12 w-12 rounded-full shadow-lg hover:shadow-xl",
          "bg-primary hover:bg-primary/90 text-white",
          "transition-all duration-200 ease-in-out",
          "hover:scale-110 active:scale-95",
          // Efecto de resplandor sutil
          "ring-2 ring-primary/20 hover:ring-primary/30"
        )}
        style={{
          // Animación personalizada de salto hacia arriba
          animation: shouldAnimate ? 'fabJumpUp 0.8s ease-out' : undefined,
        }}
        aria-label={`Scroll to ${targetPosition === 0 ? 'top' : `position ${targetPosition}px`}`}
      >
        <ArrowUp 
          className="h-5 w-5 transition-transform duration-300"
          style={{
            // Animación sutil para la flecha
            animation: shouldAnimate ? 'arrowFloat 0.8s ease-in-out' : undefined,
          }}
        />
      </Button>
      
      {/* Estilos CSS personalizados para las animaciones */}
      <style jsx>{`
        @keyframes fabJumpUp {
          0% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-8px) scale(1.05); }
          50% { transform: translateY(-12px) scale(1.08); }
          75% { transform: translateY(-4px) scale(1.02); }
          100% { transform: translateY(0px) scale(1); }
        }
        
        @keyframes arrowFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
