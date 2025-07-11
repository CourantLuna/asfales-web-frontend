'use client';

import React, { useState, useMemo } from 'react';
import CustomFlightCard from './CustomFlightCard';
import { Breadcrumb, useFlightBreadcrumbSteps } from '../shared/Breadcrumb';
import { Button } from '../ui/button';
import { Plus, Minus } from 'lucide-react';

// Interfaces
interface FlightData {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: string;
  price: number;
  currency: string;
  priceLabel?: string;
  logo?: string;
  badge?: string;
  savings?: string;
}

interface FlightResultSet {
  stepId: string;
  title: string;
  subtitle: string;
  flights: FlightData[];
}

interface SelectedFlight {
  stepId: string;
  flight: FlightData;
}

const FlightResultsTemplate: React.FC = () => {
  // Estados principales
  const [flightType, setFlightType] = useState<'round-trip' | 'one-way' | 'multi-destination'>('round-trip');
  const [currentStep, setCurrentStep] = useState('choose-departure');
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([]);

  // Estados para paginación
  const [visibleFlights, setVisibleFlights] = useState(3);
  const initialVisibleFlights = 3;
  const flightsPerStep = 3;

  // Para multi-destino
  const multiDestinations = ['Medellín', 'Madrid'];
  
  // Generar steps del breadcrumb
  const breadcrumbSteps = useFlightBreadcrumbSteps(flightType, currentStep, multiDestinations);

  // Efecto para ajustar el step cuando cambia el tipo de vuelo
  React.useEffect(() => {
    if (flightType === 'multi-destination' && currentStep === 'choose-departure') {
      setCurrentStep('choose-flight-0');
    } else if (flightType !== 'multi-destination' && currentStep.startsWith('choose-flight-')) {
      setCurrentStep('choose-departure');
    }
  }, [flightType, currentStep]);

  // Datos simulados - diferentes conjuntos según el tipo de viaje
  const flightResultSets: FlightResultSet[] = useMemo(() => {
    const baseFlights = [
      {
        id: "dep-1",
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
        id: "dep-2",
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
        badge: "Ahorra en paquete"
      },
      {
        id: "dep-3",
        airline: "Avianca",
        departureTime: "9:15 a. m.",
        arrivalTime: "2:30 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "5 h 15 min",
        stops: "1 escala",
        price: 380,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-4",
        airline: "LATAM",
        departureTime: "11:45 a. m.",
        arrivalTime: "4:20 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "4 h 35 min",
        stops: "Vuelo sin escalas",
        price: 450,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-5",
        airline: "JetBlue",
        departureTime: "3:30 p. m.",
        arrivalTime: "10:45 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "7 h 15 min",
        stops: "1 escala",
        price: 290,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "dep-6",
        airline: "Spirit",
        departureTime: "6:00 p. m.",
        arrivalTime: "11:25 p. m.",
        departureAirport: "Santo Domingo (SDQ)",
        arrivalAirport: "Medellín (MDE)",
        duration: "5 h 25 min",
        stops: "Vuelo sin escalas",
        price: 199,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      }
    ];

    const returnFlights = [
      {
        id: "ret-1",
        airline: "LATAM",
        departureTime: "10:15 a. m.",
        arrivalTime: "6:30 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "8 h 15 min",
        stops: "1 escala",
        price: 380,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-2",
        airline: "Avianca",
        departureTime: "2:45 p. m.",
        arrivalTime: "8:20 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 35 min",
        stops: "Vuelo sin escalas",
        price: 420,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-3",
        airline: "Copa",
        departureTime: "6:30 a. m.",
        arrivalTime: "2:15 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "7 h 45 min",
        stops: "1 escala",
        price: 340,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-4",
        airline: "Arajet",
        departureTime: "11:20 a. m.",
        arrivalTime: "4:55 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 35 min",
        stops: "Vuelo sin escalas",
        price: 395,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-5",
        airline: "JetBlue",
        departureTime: "4:10 p. m.",
        arrivalTime: "10:45 p. m.",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "6 h 35 min",
        stops: "1 escala",
        price: 320,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "ret-6",
        airline: "Spirit",
        departureTime: "8:45 p. m.",
        arrivalTime: "2:30 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Santo Domingo (SDQ)",
        duration: "5 h 45 min",
        stops: "Vuelo sin escalas",
        price: 250,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      }
    ];

    const madridFlights = [
      {
        id: "mad-1",
        airline: "Iberia",
        departureTime: "11:30 a. m.",
        arrivalTime: "6:45 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "11 h 15 min",
        stops: "1 escala",
        price: 850,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-2",
        airline: "Air Europa",
        departureTime: "6:20 p. m.",
        arrivalTime: "2:10 p. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "13 h 50 min",
        stops: "1 escala",
        price: 780,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-3",
        airline: "LATAM",
        departureTime: "9:15 a. m.",
        arrivalTime: "4:30 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "12 h 15 min",
        stops: "1 escala",
        price: 920,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-4",
        airline: "Avianca",
        departureTime: "3:45 p. m.",
        arrivalTime: "11:20 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "14 h 35 min",
        stops: "2 escalas",
        price: 750,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      },
      {
        id: "mad-5",
        airline: "Copa",
        departureTime: "7:00 a. m.",
        arrivalTime: "1:45 a. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "15 h 45 min",
        stops: "2 escalas",
        price: 680,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg",
        badge: "Precio más bajo"
      },
      {
        id: "mad-6",
        airline: "Turkish Airlines",
        departureTime: "10:30 p. m.",
        arrivalTime: "8:15 p. m.+1",
        departureAirport: "Medellín (MDE)",
        arrivalAirport: "Madrid (MAD)",
        duration: "16 h 45 min",
        stops: "2 escalas",
        price: 890,
        currency: "USD",
        priceLabel: "Redondeado por pasajero",
        logo: "/placeholder-logo.svg"
      }
    ];

    switch (flightType) {
      case 'one-way':
        return [
          {
            stepId: 'choose-departure',
            title: 'Elige tu vuelo de salida',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          }
        ];

      case 'round-trip':
        return [
          {
            stepId: 'choose-departure',
            title: 'Elige tu vuelo a Medellín',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          },
          {
            stepId: 'choose-return',
            title: 'Elige tu vuelo de regreso',
            subtitle: 'Medellín (MDE) → Santo Domingo (SDQ)',
            flights: returnFlights
          }
        ];

      case 'multi-destination':
        return [
          {
            stepId: 'choose-flight-0',
            title: 'Elige tu vuelo a Medellín',
            subtitle: 'Santo Domingo (SDQ) → Medellín (MDE)',
            flights: baseFlights
          },
          {
            stepId: 'choose-flight-1',
            title: 'Elige tu vuelo a Madrid',
            subtitle: 'Medellín (MDE) → Madrid (MAD)',
            flights: madridFlights
          }
        ];

      default:
        return [];
    }
  }, [flightType]);

  // Obtener el conjunto de resultados actual
  const currentResultSet = flightResultSets.find(set => set.stepId === currentStep);

  // Handler para navegación de breadcrumb (solo hacia atrás)
  const handleBreadcrumbClick = (stepId: string) => {
    setCurrentStep(stepId);
    setVisibleFlights(initialVisibleFlights); // Reset paginación al cambiar step
  };

  // Handler para seleccionar vuelo (avanza automáticamente)
  const handleFlightSelect = (flight: FlightData) => {
    if (!currentResultSet) return;

    // Agregar/actualizar vuelo seleccionado
    setSelectedFlights(prev => {
      const filtered = prev.filter(sf => sf.stepId !== currentStep);
      return [...filtered, { stepId: currentStep, flight }];
    });

    // Avanzar al siguiente paso automáticamente
    const currentIndex = breadcrumbSteps.findIndex(step => step.isActive);
    if (currentIndex < breadcrumbSteps.length - 1) {
      setCurrentStep(breadcrumbSteps[currentIndex + 1].id);
      setVisibleFlights(initialVisibleFlights); // Reset paginación al avanzar step
    }
  };

  // Handler para ver detalles (no avanza)
  const handleDetailsClick = (flight: FlightData) => {
    console.log('Ver detalles del vuelo:', flight);
  };

  // Handler para cambiar tipo de vuelo
  const handleFlightTypeChange = (type: 'round-trip' | 'one-way' | 'multi-destination') => {
    setFlightType(type);
    // Ajustar el step inicial según el tipo
    const initialStep = type === 'multi-destination' ? 'choose-flight-0' : 'choose-departure';
    setCurrentStep(initialStep);
    setSelectedFlights([]);
    setVisibleFlights(initialVisibleFlights); // Reset paginación
  };

  // Handlers para paginación
  const handleShowMore = () => {
    if (currentResultSet) {
      setVisibleFlights(prev => Math.min(prev + flightsPerStep, currentResultSet.flights.length));
    }
  };

  const handleShowLess = () => {
    setVisibleFlights(initialVisibleFlights);
  };

  // Renderizar contenido según el paso actual
  const renderStepContent = () => {
    // Si estamos en el paso de revisión, mostrar vuelos seleccionados
    if (currentStep === 'review-details') {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              🎉 ¡Resumen de tu viaje!
            </h2>
            <div className="space-y-4">
              {selectedFlights.map((selected, index) => {
                const stepInfo = breadcrumbSteps.find(step => step.id === selected.stepId);
                return (
                  <div key={selected.stepId} className="bg-white rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {stepInfo?.label || `Vuelo ${index + 1}`}
                    </h3>
                    <CustomFlightCard
                      flight={selected.flight}
                      onDetailsClick={handleDetailsClick}
                      className="bg-gray-50"
                    />
                  </div>
                );
              })}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total estimado:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${selectedFlights.reduce((total, sf) => total + sf.flight.price, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Mostrar lista de vuelos para seleccionar
    if (currentResultSet) {
      const visibleFlightsList = currentResultSet.flights.slice(0, visibleFlights);
      const hasMoreFlights = visibleFlights < currentResultSet.flights.length;
      const canShowLess = visibleFlights > initialVisibleFlights;
      const remainingFlights = currentResultSet.flights.length - visibleFlights;
      const nextStepFlights = Math.min(flightsPerStep, remainingFlights);

      return (
        <div className="space-y-6">
          {/* Lista de vuelos visible */}
          <div className="space-y-4">
            {visibleFlightsList.map((flight) => (
              <CustomFlightCard
                key={flight.id}
                flight={flight}
                onDetailsClick={handleDetailsClick}
                onClick={() => handleFlightSelect(flight)}
                className="hover:bg-blue-50 transition-colors cursor-pointer"
              />
            ))}
          </div>

          {/* Controles de paginación */}
          {(hasMoreFlights || canShowLess) && (
            <div className="flex flex-col items-center space-y-3 py-6 md:w-auto w-full">
              <div className="text-sm text-gray-600 text-center">
                Mostrando {visibleFlights} de {currentResultSet.flights.length} vuelos
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {hasMoreFlights && (
                  <Button
                    onClick={handleShowMore}
                    variant="outline"
                    className="w-full md:w-80 flex items-center space-x-2 px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>
                      Mostrar más vuelos ({nextStepFlights} más)
                    </span>
                  </Button>
                )}

                {canShowLess && (
                  <Button
                    onClick={handleShowLess}
                    variant="ghost"
                    className="w-full md:w-80 text-gray-600 hover:text-gray-800 flex items-center space-x-2 px-6 py-2 border-2"
                  >
                    <Minus className="h-4 w-4" />
                    <span>
                      Mostrar menos vuelos
                    </span>
                  </Button>
                )}
              </div>

              {currentResultSet.flights.length > initialVisibleFlights && (
                <div className="w-full max-w-xs">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(visibleFlights / currentResultSet.flights.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {Math.round((visibleFlights / currentResultSet.flights.length) * 100)}% cargado
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasMoreFlights && currentResultSet.flights.length > initialVisibleFlights && (
            <div className="text-center py-4">
              <p className="text-gray-600 text-sm">
                ✈️ Has visto todos los vuelos disponibles
              </p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="text-center py-12 text-gray-500">
        No hay resultados para mostrar
      </div>
    );
  };

  return (
    <div className="container py-6 max-w-7xl">
      {/* Controles de demo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo: Tipos de vuelo</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleFlightTypeChange('one-way')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'one-way'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Vuelo sencillo
          </button>
          <button
            onClick={() => handleFlightTypeChange('round-trip')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'round-trip'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Vuelo redondo
          </button>
          <button
            onClick={() => handleFlightTypeChange('multi-destination')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              flightType === 'multi-destination'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            Multi-destino
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
        <Breadcrumb
          steps={breadcrumbSteps}
          onStepClick={handleBreadcrumbClick}
          allowBackNavigation={true}
          allowForwardNavigation={false}
          className="w-full mb-4"
        />

      {/* Título y subtítulo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {currentResultSet?.title || breadcrumbSteps.find(step => step.isActive)?.label || 'Resumen del viaje'}
        </h1>
        {currentResultSet && (
          <p className="text-gray-600">
            {currentResultSet.subtitle} • {currentResultSet.flights.length} vuelos encontrados
          </p>
        )}
        {currentStep === 'review-details' && (
          <p className="text-gray-600">
            Revisa y confirma tu selección de {selectedFlights.length} vuelo{selectedFlights.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Contenido principal */}
      {renderStepContent()}
    </div>
  );
};

export default FlightResultsTemplate;