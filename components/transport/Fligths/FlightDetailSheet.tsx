'use client';

import React from 'react';
import { Button } from '../../ui/button';
import { Plane, Wifi, Utensils, Tv, Plug, CheckCircle, XCircle, Luggage, Briefcase, Calendar } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { TransportTrip } from '../types/transport.types';

interface FlightDetailSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  flight: TransportTrip | null;
  onSelectFlight: () => void;
}

// --- Funciones auxiliares de formato ---
const formatTime = (isoString: string) => {
  if (!isoString) return '--:--';
  return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

// Nueva función para formatear la fecha (Ej: "Lun, 20 May")
const formatDate = (isoString: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('es-ES', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });
};

const formatDuration = (minutes?: number) => {
  if (!minutes) return '--';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export default function FlightDetailSheet({ 
  isOpen, 
  onOpenChange, 
  flight, 
  onSelectFlight 
}: FlightDetailSheetProps) {
  if (!flight) return null;

  // Asumimos el primer precio disponible como referencia para la clase mostrada
  const priceInfo = flight.prices?.[0];
  const originCode = flight.origin.stop.stopCode;
  const destCode = flight.destination.stop.stopCode;
  const originCity = flight.origin.stop.city;
  const destCity = flight.destination.stop.city;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] md:w-[500px] h-full overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-lg font-semibold">
            Detalles del Vuelo
          </SheetTitle>
          
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Información de la aerolínea */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center flex-shrink-0 overflow-hidden">
              {flight.operator.logoUrl ? (
                <img
                  src={flight.operator.logoUrl}
                  alt={flight.operator.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-gray-500 text-sm font-bold">
                  {flight.operator.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{flight.operator.name}</h3>
              <p className="text-sm text-gray-600">
                {flight.routeId ? `Ruta ${flight.routeId}` : 'Vuelo comercial'}
              </p>
            </div>
          </div>

          {/* Badge de promoción */}
          {flight.classesAvailable && flight.classesAvailable.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <span className="text-blue-800 font-medium text-sm">
                   Disponible en: {flight.classesAvailable.join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Horarios y ruta (CON FECHAS) */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
            <h4 className="font-semibold text-gray-900">Itinerario</h4>
            
            <div className="flex justify-between items-center">
              
              {/* ORIGEN */}
              <div className="text-center min-w-[80px]">
                {/* FECHA DE SALIDA */}
                <div className="text-xs font-semibold text-blue-600 mb-1 uppercase">
                  {formatDate(flight.origin.dateTime)}
                </div>
                <div className="text-xl font-bold text-gray-900">{formatTime(flight.origin.dateTime)}</div>
                <div className="text-sm font-medium text-gray-700">{originCode}</div>
                <div className="text-xs text-gray-500">{originCity}</div>
              </div>
              
              {/* GRÁFICO CENTRAL */}
              <div className="flex-1 flex flex-col items-center mx-4">
                <div className="text-xs text-gray-500 mb-1">{formatDuration(flight.durationMinutes)}</div>
                <div className="w-full border-t-2 border-dashed border-gray-300 relative my-2">
                  <Plane className="w-5 h-5 text-blue-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 p-0.5" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {flight.isDirect ? 'Directo' : `${flight.stops?.length || 1} Escala(s)`}
                </div>
              </div>
              
              {/* DESTINO */}
              <div className="text-center min-w-[80px]">
                {/* FECHA DE LLEGADA */}
                <div className="text-xs font-semibold text-blue-600 mb-1 uppercase">
                  {formatDate(flight.destination.dateTime)}
                </div>
                <div className="text-xl font-bold text-gray-900">{formatTime(flight.destination.dateTime)}</div>
                <div className="text-sm font-medium text-gray-700">{destCode}</div>
                <div className="text-xs text-gray-500">{destCity}</div>
              </div>
            </div>
          </div>

          {/* Clase de Viaje y Precio */}
          {priceInfo && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                   <h4 className="font-semibold text-gray-900">Tarifa {priceInfo.class}</h4>
                   <p className="text-xs text-gray-500">Base seleccionada</p>
                </div>
                <div className="text-right">
                   <div className="text-2xl font-bold text-blue-600">
                     ${priceInfo.price} <span className="text-sm font-normal text-gray-500">{priceInfo.currency}</span>
                   </div>
                </div>
              </div>

              {priceInfo.inclusions && (
                <div className="mt-3 pt-3 border-t border-blue-200/50">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Incluye:</div>
                  <div className="flex flex-wrap gap-2">
                    {priceInfo.inclusions.map((inc, idx) => (
                      <span key={idx} className="text-xs bg-white border border-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {inc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Equipaje (Basado en Policies) */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
               <Luggage className="w-4 h-4" /> Política de Equipaje
            </h4>
            
            <div className="space-y-4">
              {/* Equipaje de mano */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${flight.policies?.baggage?.carryOnKg ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Briefcase className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-gray-900">Equipaje de mano</p>
                      <p className="text-xs text-gray-500">
                          {flight.policies?.baggage?.carryOnKg 
                            ? `Hasta ${flight.policies.baggage.carryOnKg}kg incluido` 
                            : 'No incluido en tarifa base'}
                      </p>
                   </div>
                </div>
                {flight.policies?.baggage?.carryOnKg ? (
                   <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                   <span className="text-xs font-medium text-blue-600">
                      + ${flight.policies?.baggage?.extraKgPrice || 45}
                   </span>
                )}
              </div>

              {/* Equipaje de bodega */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${flight.policies?.baggage?.includedKg ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Luggage className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-gray-900">Equipaje documentado</p>
                      <p className="text-xs text-gray-500">
                          {flight.policies?.baggage?.includedKg 
                            ? `Hasta ${flight.policies.baggage.includedKg}kg incluido` 
                            : 'Costo adicional por maleta'}
                      </p>
                   </div>
                </div>
                {flight.policies?.baggage?.includedKg ? (
                   <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                   <span className="text-xs font-medium text-blue-600">
                      Consultar
                   </span>
                )}
              </div>
            </div>
          </div>

          {/* Políticas de cambio y cancelación */}
          {flight.policies && (
             <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Políticas</h4>
                <div className="space-y-2 text-sm">
                   {flight.policies.cancellation && (
                      <div className="flex gap-2 items-start">
                         <div className="mt-1 min-w-[4px] h-[4px] rounded-full bg-gray-400" />
                         <p className="text-gray-600">
                            <span className="font-medium text-gray-900">Cancelación: </span> 
                            {flight.policies.cancellation}
                         </p>
                      </div>
                   )}
                   {flight.policies.changes && (
                      <div className="flex gap-2 items-start">
                         <div className="mt-1 min-w-[4px] h-[4px] rounded-full bg-gray-400" />
                         <p className="text-gray-600">
                            <span className="font-medium text-gray-900">Cambios: </span> 
                            {flight.policies.changes}
                         </p>
                      </div>
                   )}
                </div>
             </div>
          )}

          {/* Amenities / Servicios a Bordo */}
          {flight.amenities && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Servicios a Bordo</h4>
              <div className="grid grid-cols-2 gap-3">
                 <AmenityItem icon={<Wifi className="w-4 h-4"/>} label="WiFi" active={flight.amenities.wifi} />
                 <AmenityItem icon={<Utensils className="w-4 h-4"/>} label="Comidas" active={flight.prices?.[0]?.includesMeal} />
                 <AmenityItem icon={<Tv className="w-4 h-4"/>} label="Entretenimiento" active={flight.amenities.entertainment} />
                 <AmenityItem icon={<Plug className="w-4 h-4"/>} label="Conexiones USB/AC" active={flight.amenities.usb || flight.amenities.ac} />
              </div>
            </div>
          )}
        </div>

        {/* Botón de selección */}
        <div className="sticky bottom-0 bg-white border-t pt-4 mt-6 pb-2">
          <Button 
            onClick={onSelectFlight}
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            Seleccionar Vuelo
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AmenityItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
   return (
      <div className="flex items-center space-x-2">
         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
            {icon}
         </div>
         <span className={`text-sm ${active ? 'text-gray-900' : 'text-gray-400 line-through decoration-gray-400'}`}>
            {label}
         </span>
      </div>
   );
}