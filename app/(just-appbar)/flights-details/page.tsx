'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Briefcase, 
  Wifi, 
  Coffee, 
  Tv, 
  Zap,
  Check,
  X,
  ArrowRight,
  Calendar,
  User,
  CreditCard,
  ChevronRight
} from 'lucide-react';

// Tipo para vuelo seleccionado
interface SelectedFlight {
  stepId: string;
  flight: FlightData;
}

// Interface para datos de vuelo (debe coincidir con FlightResultsTemplate)
interface FlightData {
  id: string;
  airline: string;
  flightNumber?: string;
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
  travelClass: 'economy' | 'premium-economy' | 'business' | 'first';
  travelClassDetails: {
    name: string;
    description: string;
    seatType?: string;
    amenities?: string[];
  };
  baggage: {
    personalItem: {
      included: boolean;
      dimensions: string;
      weight?: string;
    };
    carryOn: {
      included: boolean;
      dimensions: string;
      weight?: string;
      price?: number;
    };
    checkedBag: {
      included: boolean;
      weight: string;
      price?: number;
      count: number;
    };
  };
  flexibility: {
    refundable: boolean;
    refundPolicy?: string;
    changeable: boolean;
    changePolicy?: string;
    changeFee?: number;
  };
  services: {
    wifi: boolean;
    meals: boolean;
    entertainment: boolean;
    powerOutlets: boolean;
  };
}

function FlightDetailsContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('return') || '/transports/flights';
  const flightType = searchParams.get('type') || 'roundtrip';
  
  // Obtener información adicional de la URL
  const totalFromUrl = searchParams.get('total');
  const currencyFromUrl = searchParams.get('currency') || 'USD';
  const countFromUrl = searchParams.get('count');
  
  // Obtener vuelos seleccionados desde URL params
  const selectedFlightsParam = searchParams.get('flights');
  
  // Parsear vuelos desde URL o usar datos de ejemplo
  let selectedFlights: SelectedFlight[] = [];
  
  try {
    if (selectedFlightsParam) {
      selectedFlights = JSON.parse(decodeURIComponent(selectedFlightsParam));
      console.log('✅ Vuelos cargados desde URL:', selectedFlights);
    }
  } catch (error) {
    console.error('❌ Error parsing flights from URL:', error);
  }
  
  // Si no hay vuelos en la URL, usar datos de ejemplo para demo
  if (selectedFlights.length === 0) {
    selectedFlights = [
      {
        stepId: 'choose-departure',
        flight: {
          id: "base-1",
          airline: "LATAM",
          flightNumber: "LA 2040",
          departureTime: "6:30 a. m.",
          arrivalTime: "12:45 p. m.",
          departureAirport: "Santo Domingo (SDQ)",
          arrivalAirport: "Medellín (MDE)",
          duration: "6 h 15 min",
          stops: "Vuelo sin escalas",
          price: 450,
          currency: "USD",
          priceLabel: "Redondeado por pasajero",
          logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
          travelClass: "economy" as const,
          travelClassDetails: {
            name: "Económica",
            description: "Asiento estándar con servicios básicos",
            seatType: "Asiento reclinable estándar",
            amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
          },
          baggage: {
            personalItem: {
              included: true,
              dimensions: "40cm x 20cm x 25cm"
            },
            carryOn: {
              included: true,
              dimensions: "55cm x 40cm x 20cm",
              weight: "10kg"
            },
            checkedBag: {
              included: false,
              weight: "23kg",
              price: 90,
              count: 1
            }
          },
          flexibility: {
            refundable: true,
            refundPolicy: "Reembolso con penalización del 15%",
            changeable: true,
            changePolicy: "Cambios permitidos",
            changeFee: 60
          },
          services: {
            wifi: true,
            meals: true,
            entertainment: true,
            powerOutlets: true
          }
        }
      },
      {
        stepId: 'choose-return',
        flight: {
          id: "ret-1",
          airline: "LATAM",
          flightNumber: "LA 2595",
          departureTime: "10:15 a. m.",
          arrivalTime: "6:30 p. m.",
          departureAirport: "Medellín (MDE)",
          arrivalAirport: "Santo Domingo (SDQ)",
          duration: "8 h 15 min",
          stops: "1 escala",
          price: 380,
          currency: "USD",
          priceLabel: "Redondeado por pasajero",
          logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
          travelClass: "economy" as const,
          travelClassDetails: {
            name: "Económica",
            description: "Asiento estándar con servicios básicos",
            seatType: "Asiento reclinable estándar",
            amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
          },
          baggage: {
            personalItem: {
              included: true,
              dimensions: "40cm x 20cm x 25cm"
            },
            carryOn: {
              included: true,
              dimensions: "55cm x 40cm x 20cm",
              weight: "10kg"
            },
            checkedBag: {
              included: false,
              weight: "23kg",
              price: 90,
              count: 1
            }
          },
          flexibility: {
            refundable: true,
            refundPolicy: "Reembolso con penalización del 15%",
            changeable: true,
            changePolicy: "Cambios permitidos",
            changeFee: 60
          },
          services: {
            wifi: true,
            meals: true,
            entertainment: true,
            powerOutlets: true
          }
        }
      }
    ];
  }

  // Calcular precio total - usar datos de URL si están disponibles, sino calcular
  const totalPrice = totalFromUrl ? parseFloat(totalFromUrl) : selectedFlights.reduce((sum, sf) => sum + sf.flight.price, 0);
  const currency = currencyFromUrl || selectedFlights[0]?.flight.currency || 'USD';

  // Validar consistencia de datos
  if (totalFromUrl && selectedFlights.length > 0) {
    const calculatedTotal = selectedFlights.reduce((sum, sf) => sum + sf.flight.price, 0);
    if (Math.abs(calculatedTotal - totalPrice) > 1) {
      console.warn('⚠️ Discrepancia en precio total:', { fromUrl: totalPrice, calculated: calculatedTotal });
    }
  }

  // Obtener títulos de los pasos
  const getStepTitle = (stepId: string) => {
    const titles: Record<string, string> = {
      'choose-departure': 'Vuelo de ida',
      'choose-return': 'Vuelo de regreso',
      'choose-flight-0': 'Primer vuelo',
      'choose-flight-1': 'Segundo vuelo',
      'choose-flight-2': 'Tercer vuelo'
    };
    return titles[stepId] || 'Vuelo';
  };

  const handleContinueBooking = () => {
    // Aquí redirigirías al proceso de reserva con todos los vuelos
    console.log('Continuar con la reserva de vuelos:', selectedFlights);
    window.location.href = `/booking/flights?flights=${encodeURIComponent(JSON.stringify(selectedFlights))}`;
  };

  const handleBackToResults = () => {
    window.location.href = returnUrl;
  };

  const handleEditFlight = (stepId: string) => {
    // Regresar al paso específico para editar el vuelo
    const editUrl = `${returnUrl}?step=${stepId}`;
    window.location.href = editUrl;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={handleBackToResults}
          className="mb-4"
        >
          ← Volver a resultados
        </Button>
        
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">Revisa los detalles de tu viaje</h1>
          <p className="text-gray-600">
            Confirma que todos los detalles de tus vuelos son correctos antes de continuar
          </p>
          
          {/* Indicador de fuente de datos */}
          {selectedFlightsParam ? (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <Check className="h-4 w-4" />
              Vuelos seleccionados cargados
            </div>
          ) : (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <Plane className="h-4 w-4" />
              Datos de ejemplo para demo
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Vuelos seleccionados */}
        <div className="lg:col-span-2 space-y-6">
          {selectedFlights.map((selectedFlight, index) => {
            const { stepId, flight } = selectedFlight;
            
            return (
              <Card key={stepId} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      {getStepTitle(stepId)}
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditFlight(stepId)}
                    >
                      Editar
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* Información del vuelo */}
                  <div className="space-y-4">
                    
                    {/* Header del vuelo */}
                    <div className="flex items-center gap-4">
                      <img 
                        src={flight.logo} 
                        alt={flight.airline}
                        className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${flight.price} {flight.currency}</p>
                        {flight.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {flight.badge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Ruta del vuelo */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-lg font-bold">{flight.departureTime}</p>
                          <p className="text-sm text-gray-600">{flight.departureAirport}</p>
                        </div>
                        
                        <div className="flex-1 mx-6">
                          <div className="flex items-center justify-center">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <div className="mx-4 text-center">
                              <Plane className="h-5 w-5 mx-auto text-gray-400 mb-1" />
                              <p className="text-xs text-gray-600">{flight.duration}</p>
                              <p className="text-xs text-gray-500">{flight.stops}</p>
                            </div>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-bold">{flight.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{flight.arrivalAirport}</p>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional en grid */}
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      
                      {/* Clase de viaje */}
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">Clase</span>
                        </div>
                        <p className="text-gray-600">{flight.travelClassDetails.name}</p>
                      </div>

                      {/* Equipaje */}
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">Equipaje</span>
                        </div>
                        <div className="space-y-1">
                          {flight.baggage.personalItem.included && (
                            <p className="text-xs text-green-600">✓ Artículo personal</p>
                          )}
                          {flight.baggage.carryOn.included ? (
                            <p className="text-xs text-green-600">✓ Equipaje de mano</p>
                          ) : (
                            <p className="text-xs text-gray-500">+ ${flight.baggage.carryOn.price} Equipaje de mano</p>
                          )}
                          {flight.baggage.checkedBag.included ? (
                            <p className="text-xs text-green-600">✓ Maleta documentada</p>
                          ) : (
                            <p className="text-xs text-gray-500">+ ${flight.baggage.checkedBag.price} Maleta documentada</p>
                          )}
                        </div>
                      </div>

                      {/* Flexibilidad */}
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">Flexibilidad</span>
                        </div>
                        <div className="space-y-1">
                          <p className={`text-xs ${flight.flexibility.refundable ? 'text-green-600' : 'text-gray-500'}`}>
                            {flight.flexibility.refundable ? '✓' : '✗'} Reembolsable
                          </p>
                          <p className={`text-xs ${flight.flexibility.changeable ? 'text-green-600' : 'text-gray-500'}`}>
                            {flight.flexibility.changeable ? '✓' : '✗'} Cambios
                            {flight.flexibility.changeable && flight.flexibility.changeFee && 
                              ` (+$${flight.flexibility.changeFee})`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sidebar - Resumen */}
        <div className="space-y-6">
          
          {/* Resumen de precios */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {selectedFlights.map((sf, index) => (
                  <div key={sf.stepId} className="flex justify-between text-sm">
                    <span>{getStepTitle(sf.stepId)}</span>
                    <span>${sf.flight.price} {sf.flight.currency}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Impuestos y cargos</span>
                  <span>Incluidos</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-xl">
                <span>Total</span>
                <span>${totalPrice} {currency}</span>
              </div>
              
              <p className="text-xs text-gray-500">Precio por persona</p>
            </CardContent>
          </Card>

          {/* Información del viaje */}
          <Card>
            <CardHeader>
              <CardTitle>Información del viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo de viaje</span>
                <span className="capitalize">{flightType === 'roundtrip' ? 'Ida y vuelta' : flightType === 'oneway' ? 'Solo ida' : 'Multiciudad'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pasajeros</span>
                <span>1 Adulto</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vuelos</span>
                <span>{selectedFlights.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleContinueBooking}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Continuar con la reserva
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleBackToResults}
            >
              Volver a selección
            </Button>
          </div>

          {/* Información importante */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-600">¡Reserva pronto!</p>
                    <p className="text-gray-600">Los precios pueden cambiar</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Reserva gratuita hasta 24h antes del vuelo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function FlightDetailsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <FlightDetailsContent />
    </Suspense>
  );
}
