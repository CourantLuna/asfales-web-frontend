'use client';

import React from 'react';
import { Button } from '../../ui/button';
import { Plane } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";

// Interfaces para los datos del vuelo
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
  // Clase de viaje
  travelClass: 'economy' | 'premium-economy' | 'business' | 'first';
  travelClassDetails: {
    name: string;
    description: string;
    seatType?: string;
    amenities?: string[];
  };
  // Equipaje
  baggage: {
    personalItem: {
      included: boolean;
      dimensions: string;
      weight?: string;
    };
    carryOn: {
      included: boolean;
      dimensions: string;
      weight: string;
      price?: number;
    };
    checkedBag: {
      included: boolean;
      dimensions?: string;
      weight: string;
      price?: number;
      count?: number;
    };
  };
  // Flexibilidad
  flexibility: {
    refundable: boolean;
    refundPolicy?: string;
    changeable: boolean;
    changePolicy?: string;
    changeFee?: number;
  };
  // Servicios adicionales
  services?: {
    wifi: boolean;
    meals: boolean;
    entertainment: boolean;
    powerOutlets: boolean;
  };
}

interface FlightDetailSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  flight: FlightData | null;
  onSelectFlight: () => void;
}

export default function FlightDetailSheet({ 
  isOpen, 
  onOpenChange, 
  flight, 
  onSelectFlight 
}: FlightDetailSheetProps) {
  if (!flight) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] md:w-[500px] h-full overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-lg font-semibold">
            Detalles del Vuelo
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600">
            {flight.departureAirport} → {flight.arrivalAirport}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Información de la aerolínea */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              {flight.logo ? (
                <img
                  src={flight.logo}
                  alt={flight.airline}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-white text-sm font-bold">
                  {flight.airline.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{flight.airline}</h3>
              <p className="text-sm text-gray-600">
                {flight.flightNumber ? `Vuelo ${flight.flightNumber}` : 'Vuelo comercial'}
              </p>
            </div>
          </div>

          {/* Badge de promoción */}
          {flight.badge && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-800 font-medium">💰 {flight.badge}</span>
              </div>
            </div>
          )}

          {/* Horarios y ruta */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Información del Vuelo</h4>
            
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{flight.departureTime}</div>
                <div className="text-xs text-gray-600">{flight.departureAirport}</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center mx-4">
                <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                <div className="w-full border-t border-gray-300 relative">
                  <Plane className="w-4 h-4 text-gray-400 absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50" />
                </div>
                <div className="text-xs text-gray-500 mt-1">{flight.stops}</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{flight.arrivalTime}</div>
                <div className="text-xs text-gray-600">{flight.arrivalAirport}</div>
              </div>
            </div>
          </div>

          {/* Clase de Viaje */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Clase de Viaje</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="text-base font-medium text-blue-900">
                  Clase: {flight.travelClassDetails?.name || 'Económica'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {flight.travelClassDetails?.description || 'Asiento estándar con servicios básicos'}
                </div>
                {flight.travelClassDetails?.seatType && (
                  <div className="text-xs text-gray-500 mt-1">
                    {flight.travelClassDetails.seatType}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600 font-medium">✓ Incluido</div>
              </div>
            </div>
            
            {flight.travelClassDetails?.amenities && flight.travelClassDetails.amenities.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="text-xs text-gray-600 mb-2">Servicios incluidos:</div>
                <div className="flex flex-wrap gap-2">
                  {flight.travelClassDetails.amenities.map((amenity, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Equipaje */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Equipaje</h4>
            
            <div className="space-y-3">
              {/* Artículo personal */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flight.baggage?.personalItem?.included ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm ${
                      flight.baggage?.personalItem?.included ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {flight.baggage?.personalItem?.included ? '✓' : '✕'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Artículo personal {flight.baggage?.personalItem?.included ? 'incluido' : 'no incluido'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {flight.baggage?.personalItem?.dimensions || '40cm x 20cm x 25cm'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  flight.baggage?.personalItem?.included ? 'text-green-600' : 'text-red-600'
                }`}>
                  {flight.baggage?.personalItem?.included ? 'Incluido' : 'No incluido'}
                </div>
              </div>

              {/* Equipaje de mano */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flight.baggage?.carryOn?.included ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm ${
                      flight.baggage?.carryOn?.included ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {flight.baggage?.carryOn?.included ? '✓' : '$'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Equipaje de mano</div>
                    <div className="text-xs text-gray-600">
                      {flight.baggage?.carryOn?.dimensions || '55cm x 40cm x 20cm'}, 
                      máx. {flight.baggage?.carryOn?.weight || '8kg'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  flight.baggage?.carryOn?.included ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {flight.baggage?.carryOn?.included ? 'Incluido' : `$${flight.baggage?.carryOn?.price || 144}`}
                </div>
              </div>

              {/* Equipaje documentado */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flight.baggage?.checkedBag?.included ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm ${
                      flight.baggage?.checkedBag?.included ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {flight.baggage?.checkedBag?.included ? '✓' : '$'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {flight.baggage?.checkedBag?.count ? `${flight.baggage.checkedBag.count}er. ` : '1er. '}
                      equipaje documentado
                    </div>
                    <div className="text-xs text-gray-600">
                      Máximo {flight.baggage?.checkedBag?.weight || '23kg'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  flight.baggage?.checkedBag?.included ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {flight.baggage?.checkedBag?.included ? 'Incluido' : `$${flight.baggage?.checkedBag?.price || 116}`}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600">
                  💡 <span className="font-medium">Tip:</span> Agregar equipaje durante la reserva es más económico que en el aeropuerto
                </div>
              </div>
            </div>
          </div>

          {/* Flexibilidad */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Flexibilidad</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flight.flexibility?.refundable ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm ${
                      flight.flexibility?.refundable ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {flight.flexibility?.refundable ? '✓' : '✕'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {flight.flexibility?.refundable ? 'Reembolsable' : 'No reembolsable'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {flight.flexibility?.refundPolicy || 'Política estándar de la aerolínea'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  flight.flexibility?.refundable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {flight.flexibility?.refundable ? 'Disponible' : 'No disponible'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flight.flexibility?.changeable ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm ${
                      flight.flexibility?.changeable ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {flight.flexibility?.changeable ? '✓' : '✕'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {flight.flexibility?.changeable ? 'Se admiten cambios' : 'No se admiten cambios'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {flight.flexibility?.changePolicy || 'Este boleto no permite modificaciones'}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium text-right ${
                  flight.flexibility?.changeable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {flight.flexibility?.changeable 
                    ? (flight.flexibility.changeFee === 0 ? 'Gratis' : `$${flight.flexibility.changeFee}`)
                    : 'No disponible'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Servicios adicionales */}
          {flight.services && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Servicios a Bordo</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    flight.services.wifi ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xs ${
                      flight.services.wifi ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      📶
                    </span>
                  </div>
                  <span className={`text-sm ${
                    flight.services.wifi ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    WiFi
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    flight.services.meals ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xs ${
                      flight.services.meals ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      🍽️
                    </span>
                  </div>
                  <span className={`text-sm ${
                    flight.services.meals ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    Comidas
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    flight.services.entertainment ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xs ${
                      flight.services.entertainment ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      📺
                    </span>
                  </div>
                  <span className={`text-sm ${
                    flight.services.entertainment ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    Entretenimiento
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    flight.services.powerOutlets ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xs ${
                      flight.services.powerOutlets ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      🔌
                    </span>
                  </div>
                  <span className={`text-sm ${
                    flight.services.powerOutlets ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    Enchufes
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Precio */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Precio Total</h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-blue-600">${flight.price}</span>
              <span className="text-sm text-gray-600">{flight.currency}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {flight.priceLabel || "Redondeado por pasajero"}
            </p>
            
            {flight.savings && (
              <div className="text-sm text-green-600 bg-green-100 p-2 rounded mt-3">
                💚 {flight.savings}
              </div>
            )}
          </div>
        </div>

        {/* Botón de selección que ocupa todo el ancho */}
        <div className="sticky bottom-0 bg-white border-t pt-4 mt-6">
          <Button 
            onClick={onSelectFlight}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Seleccionar este Vuelo
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

