'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbStep {
  id: string;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isClickable?: boolean;
}

export interface BreadcrumbProps {
  steps: BreadcrumbStep[];
  onStepClick?: (stepId: string) => void;
  className?: string;
  separator?: React.ReactNode;
  variant?: 'default' | 'compact';
  allowBackNavigation?: boolean; // Nueva prop para habilitar navegación hacia atrás
  allowForwardNavigation?: boolean; // Nueva prop para habilitar navegación hacia adelante
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  steps,
  onStepClick,
  className = "",
  separator,
  variant = 'default',
  allowBackNavigation = true,
  allowForwardNavigation = false
}) => {
  const defaultSeparator = <ChevronRight className="h-4 w-4 text-gray-400" />;
  
  // Determinar si un step es clickeable basado en las reglas de navegación
  const isStepClickable = (step: BreadcrumbStep, index: number) => {
    const currentIndex = steps.findIndex(s => s.isActive);
    
    // Si el step tiene isClickable definido explícitamente, usar ese valor
    if (step.isClickable !== undefined) {
      return step.isClickable;
    }
    
    // Reglas automáticas basadas en allowBackNavigation y allowForwardNavigation
    if (step.isActive) {
      return false; // El step activo no es clickeable
    }
    
    if (step.isCompleted && allowBackNavigation) {
      return true; // Steps completados son clickeables si se permite navegación hacia atrás
    }
    
    if (index > currentIndex && allowForwardNavigation) {
      return true; // Steps futuros son clickeables si se permite navegación hacia adelante
    }
    
    return false;
  };
  
  return (
    <nav 
      className={cn(
        "flex items-center space-x-1 text-sm",
        variant === 'compact' ? "py-2" : "py-3",
        className
      )}
      aria-label="Breadcrumb"
    >
      {steps.map((step, index) => {
        const stepClickable = isStepClickable(step, index);
        
        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div
              className={cn(
                "flex items-center transition-colors duration-200",
                stepClickable && "cursor-pointer hover:text-gray-700",
                !stepClickable && "cursor-default"
              )}
              onClick={() => stepClickable && onStepClick?.(step.id)}
            >
              <span
                className={cn(
                  "text-sm transition-all duration-200",
                  // Estado activo (step actual)
                  step.isActive && "font-bold text-gray-900",
                  // Estado completado pero no activo
                  step.isCompleted && !step.isActive && "text-gray-700 font-medium",
                  // Estado por defecto/pendiente
                  !step.isActive && !step.isCompleted && "text-gray-500 font-normal",
                  // Hover effect para clickeables
                  stepClickable && "hover:text-gray-800 hover:underline",
                  // Indicador visual adicional para steps clickeables completados
                  stepClickable && step.isCompleted && "hover:font-semibold"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Separator */}
            {index < steps.length - 1 && (
              <div className="flex items-center">
                {separator || defaultSeparator}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// Hook para generar steps según el tipo de vuelo
export const useFlightBreadcrumbSteps = (
  flightType: 'round-trip' | 'one-way' | 'multi-destination',
  currentStep: string,
  destinations?: string[],
  allowBackNavigation: boolean = true
) => {
  const baseSteps = React.useMemo(() => {
    switch (flightType) {
      case 'one-way':
        return [
          { id: 'choose-departure', label: 'Elige tu vuelo de salida' },
          { id: 'review-details', label: 'Revisa los detalles del viaje' }
        ];
      
      case 'round-trip':
        return [
          { id: 'choose-departure', label: 'Elige tu vuelo a Medellín' },
          { id: 'choose-return', label: 'Elige tu vuelo a Madrid' },
          { id: 'review-details', label: 'Revisa los detalles del viaje' }
        ];
      
      case 'multi-destination':
        const steps = [];
        if (destinations && destinations.length > 0) {
          destinations.forEach((destination, index) => {
            if (index === 0) {
              steps.push({ 
                id: `choose-flight-${index}`, 
                label: `Elige tu vuelo a ${destination}` 
              });
            } else {
              steps.push({ 
                id: `choose-flight-${index}`, 
                label: `Elige tu vuelo a ${destination}` 
              });
            }
          });
        }
        steps.push({ id: 'review-details', label: 'Revisa los detalles del viaje' });
        return steps;
      
      default:
        return [];
    }
  }, [flightType, destinations]);

  // Determinar estados de cada step
  const stepsWithStates = React.useMemo(() => {
    const currentIndex = baseSteps.findIndex(step => step.id === currentStep);
    
    return baseSteps.map((step, index) => ({
      ...step,
      isActive: step.id === currentStep,
      isCompleted: index < currentIndex,
      // No definir isClickable aquí - se manejará en el componente Breadcrumb
    }));
  }, [baseSteps, currentStep]);

  return stepsWithStates;
};

export default Breadcrumb;
