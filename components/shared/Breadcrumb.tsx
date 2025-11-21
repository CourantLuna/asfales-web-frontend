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
  allowBackNavigation?: boolean;
  allowForwardNavigation?: boolean;
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

  const defaultSeparator = <ChevronRight className="h-4 w-4 text-gray-400 hidden md:block" />;

  const isStepClickable = (step: BreadcrumbStep, index: number) => {
    const currentIndex = steps.findIndex(s => s.isActive);

    if (step.isClickable !== undefined) return step.isClickable;
    if (step.isActive) return false;
    if (step.isCompleted && allowBackNavigation) return true;
    if (index > currentIndex && allowForwardNavigation) return true;

    return false;
  };

  return (
    <nav
      className={cn(
        "text-sm w-full",
        variant === 'compact' ? "py-2" : "py-3",
        className
      )}
      aria-label="Breadcrumb"
    >
      {/* MOBILE VERSION: stacked, numbered */}
      <div className="flex flex-col space-y-2 md:hidden">
        {steps.map((step, index) => {
          const clickable = isStepClickable(step, index);

          return (
            <div
              key={step.id}
              className={cn(
                "flex w-full items-center gap-2 transition-colors duration-200",
                clickable && "cursor-pointer hover:text-gray-700"
              )}
              onClick={() => clickable && onStepClick?.(step.id)}
            >
              {/* Número */}
              <span className="text-gray-500 font-medium">{index + 1}.</span>

              {/* Label */}
              <span
                className={cn(
                  "transition-all duration-200",
                  step.isActive && "font-bold text-gray-900",
                  step.isCompleted && !step.isActive && "text-gray-700 font-medium",
                  !step.isActive && !step.isCompleted && "text-gray-500",
                  clickable && "hover:text-gray-800 hover:underline"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VERSION: inline, with arrows */}
      <div className="hidden md:flex items-center space-x-1">
        {steps.map((step, index) => {
          const clickable = isStepClickable(step, index);

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex items-center transition-colors duration-200",
                  clickable && "cursor-pointer hover:text-gray-700"
                )}
                onClick={() => clickable && onStepClick?.(step.id)}
              >
                <span
                  className={cn(
                    "text-sm transition-all duration-200",
                    step.isActive && "font-bold text-gray-900",
                    step.isCompleted && !step.isActive && "text-gray-700 font-medium",
                    !step.isActive && !step.isCompleted && "text-gray-500",
                    clickable && "hover:text-gray-800 hover:underline"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center">
                  {separator || defaultSeparator}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;


// Hook para generar steps según el tipo de vuelo
export const useFlightBreadcrumbSteps = (
  flightType: 'roundtrip' | 'oneway' | 'multicity',
  currentStep: string,
  destinations?: string[],
  allowBackNavigation: boolean = true
) => {
  const baseSteps = React.useMemo(() => {
    switch (flightType) {
      case 'oneway':
        return [
          { id: 'choose-departure', label: 'Elige tu vuelo de salida' },
          { id: 'review-details', label: 'Revisa los detalles del viaje' }
        ];
      
      case 'roundtrip':
        return [
          { id: 'choose-departure', label: 'Elige tu vuelo a Medellín' },
          { id: 'choose-return', label: 'Elige tu vuelo de vuelta a Santo Domingo' },
          { id: 'review-details', label: 'Revisa los detalles del viaje' }
        ];
      
      case 'multicity':
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

