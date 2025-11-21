'use client';

import React, { useState } from 'react';
import CustomFlightCard from './CustomFlightCard';
import { Breadcrumb, useFlightBreadcrumbSteps } from '../../shared/Breadcrumb';
import { Button } from '../../ui/button';

const CustomFlightCardDemo: React.FC = () => {
  // Estados para el demo
  const [flightType, setFlightType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [currentStep, setCurrentStep] = useState('choose-departure');
  const [allowBackNavigation, setAllowBackNavigation] = useState(true);
  const [allowForwardNavigation, setAllowForwardNavigation] = useState(false);
  
  // Para multi-destino
  const multiDestinations = ['Medellín', 'Madrid'];
  
  // Generar steps del breadcrumb según el tipo de vuelo
  const breadcrumbSteps = useFlightBreadcrumbSteps(flightType, currentStep, multiDestinations, allowBackNavigation);
  
  // Handler para navegación de breadcrumb
  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
  };

  // Handler para cambiar tipo de vuelo (demo)
  const handleFlightTypeChange = (type: 'roundtrip' | 'oneway' | 'multicity') => {
    setFlightType(type);
    setCurrentStep('choose-departure');
  };
  // Datos que replican exactamente los vuelos mostrados en la imagen
  const flights = [
    {
      id: "1",
      airline: "Arajet",
      departureTime: "7:07 p. m.",
      arrivalTime: "8:42 p. m.",
      departureAirport: "Santo Domingo (SDQ)",
      arrivalAirport: "Medellín (MDE)",
      duration: "2 h 35 min",
      stops: "Vuelo sin escalas",
      price: 325,
      currency: "USD",
      priceLabel: "Redondeado por pasajero",
      logo: "/placeholder-logo.svg"
    },
    {
      id: "2", 
      airline: "Arajet",
      departureTime: "9:37 a. m.",
      arrivalTime: "11:12 a. m.",
      departureAirport: "Santo Domingo (SDQ)",
      arrivalAirport: "Medellín (MDE)",
      duration: "2 h 35 min",
      stops: "Vuelo sin escalas",
      price: 436,
      currency: "USD",
      priceLabel: "Redondeado por pasajero",
      logo: "/placeholder-logo.svg"
    },
    {
      id: "3",
      airline: "Arajet",
      departureTime: "6:00 a. m.",
      arrivalTime: "7:38 a. m.",
      departureAirport: "Santo Domingo (SDQ)",
      arrivalAirport: "Medellín (MDE)",
      duration: "2 h 38 min",
      stops: "Vuelo sin escalas",
      price: 404,
      currency: "USD",
      priceLabel: "Redondeado por pasajero",
      logo: "/placeholder-logo.svg"
    },
    {
      id: "4",
      airline: "Copa",
      departureTime: "5:23 a. m.",
      arrivalTime: "5:00 p. m.",
      departureAirport: "Santo Domingo (SDQ)",
      arrivalAirport: "Medellín (MDE)",
      duration: "12 h 37 min",
      stops: "1 escala",
      price: 265,
      currency: "USD",
      priceLabel: "Redondeado por pasajero",
      logo: "/placeholder-logo.svg",
      badge: "Ahorra en paquete",
      savings: "Reserva este vuelo con un hotel y ahorra el 100% en el vuelo"
    }
  ];

  const handleDetailsClick = (flight: any) => {
    console.log('Ver detalles del vuelo:', flight);
  };

  const handleFlightClick = (flight: any) => {
    console.log('Vuelo seleccionado:', flight);
  };

  return (
    <div className="container py-6 max-w-7xl">
      {/* Controles de demo para cambiar tipo de vuelo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo: Tipos de vuelo</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            variant={flightType === 'oneway' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFlightTypeChange('oneway')}
          >
            Vuelo sencillo
          </Button>
          <Button
            variant={flightType === 'roundtrip' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFlightTypeChange('roundtrip')}
          >
            Vuelo redondo
          </Button>
          <Button
            variant={flightType === 'multicity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFlightTypeChange('multicity')}
          >
            Multi-destino
          </Button>
        </div>
        
        {/* Controles de navegación */}
        <div className="border-t pt-3">
          <h4 className="text-xs font-medium text-gray-600 mb-2">Opciones de navegación:</h4>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={allowBackNavigation}
                onChange={(e) => setAllowBackNavigation(e.target.checked)}
                className="rounded"
              />
              <span>Permitir navegación hacia atrás</span>
            </label>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={allowForwardNavigation}
                onChange={(e) => setAllowForwardNavigation(e.target.checked)}
                className="rounded"
              />
              <span>Permitir navegación hacia adelante</span>
            </label>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mb-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
        <Breadcrumb
          steps={breadcrumbSteps}
          onStepClick={handleBreadcrumbClick}
          allowBackNavigation={allowBackNavigation}
          allowForwardNavigation={allowForwardNavigation}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {breadcrumbSteps.find(step => step.isActive)?.label || 'Vuelos - Custom Flight Cards'}
        </h1>
        <p className="text-gray-600">
          Santo Domingo (SDQ) → Medellín (MDE) • {flights.length} vuelos encontrados
        </p>
      </div>

      {/* Lista de vuelos */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <CustomFlightCard
            key={flight.id}
            flight={flight}
            onDetailsClick={handleDetailsClick}
            onClick={handleFlightClick}
          />
        ))}
      </div>

      {/* Controles de navegación de pasos (demo) */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = breadcrumbSteps.findIndex(step => step.isActive);
            if (currentIndex > 0) {
              setCurrentStep(breadcrumbSteps[currentIndex - 1].id);
            }
          }}
          disabled={breadcrumbSteps.findIndex(step => step.isActive) === 0}
        >
          ← Paso anterior
        </Button>
        
        <Button
          onClick={() => {
            const currentIndex = breadcrumbSteps.findIndex(step => step.isActive);
            if (currentIndex < breadcrumbSteps.length - 1) {
              setCurrentStep(breadcrumbSteps[currentIndex + 1].id);
            }
          }}
          disabled={breadcrumbSteps.findIndex(step => step.isActive) === breadcrumbSteps.length - 1}
        >
          Siguiente paso →
        </Button>
      </div>



      
    </div>
  );
};

export default CustomFlightCardDemo;
