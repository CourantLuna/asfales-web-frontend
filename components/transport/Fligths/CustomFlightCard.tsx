'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TransportTrip } from '../types/transport.types'; // Asegúrate de que la ruta es correcta

// --- Helpers de Formato para transformar la data cruda ---
const formatTime = (isoString?: string) => {
  if (!isoString) return '--:--';
  return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

const formatDate = (isoString?: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }); // Ej: 20 may
};

const formatDuration = (minutes?: number) => {
  if (!minutes) return '--';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

interface CustomFlightCardProps {
  flight: TransportTrip; // <-- AHORA USA EL TIPO CORRECTO
  onDetailsClick?: (flight: TransportTrip) => void;
  onClick?: (flight: TransportTrip) => void;
  onCompareChecked?: (checked: boolean) => void;
  showCompareCheckbox?: boolean;
  isCompareChecked?: boolean;
  className?: string;
}

const CustomFlightCard: React.FC<CustomFlightCardProps> = ({
  flight,
  onDetailsClick,
  onClick,
  onCompareChecked,
  showCompareCheckbox = false,
  isCompareChecked = false,
  className = "",
}) => {

  if(!flight) {
    return <div className="h-20 bg-gray-100 animate-pulse rounded-lg" />;
  }
  
  // --- EXTRACCIÓN Y MAPEO DE DATOS (TransportTrip -> Variables UI) ---
  const basePrice = flight?.prices?.[0];
  const price = basePrice?.price || 0;
  const currency = basePrice?.currency || 'USD';
  
  const origin = flight?.origin?.stop;
  const dest = flight?.destination?.stop;
  
  const departureTime = formatTime(flight?.origin?.dateTime);
  const arrivalTime = formatTime(flight?.destination?.dateTime);
  const departureDate = formatDate(flight?.origin?.dateTime);
  const arrivalDate = formatDate(flight?.destination?.dateTime);
  
  const duration = formatDuration(flight.durationMinutes);
  
  const stopsLabel = (flight.stops?.length === 0 && flight.isDirect)
    ? "Directo" 
    : `${flight.stops?.length} Escala${(flight.stops?.length || 0) > 1 ? 's' : ''}`;

  const airlineName = flight?.operator?.name;
  const airlineLogo = flight?.operator?.logoUrl;
  
  const badge = flight?.classesAvailable?.[0]; // Ej: "Económica"
  const priceLabel = "Por pasajero"; 

  // ------------------------------------------------------------------

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDetailsClick?.(flight);
  };

  const handleCardClick = () => {
    onClick?.(flight);
  };

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <div
        className={`bg-white border border-gray-200 rounded-lg p-4 transition-shadow 
        shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.015] cursor-pointer group relative 
        focus:outline-none focus:ring-0 focus:border-primary focus:border-2 
        focus-within:outline-none focus-within:ring-0 focus-within:border-primary focus-within:border-2 ${className}`}
        onClick={handleCardClick}
        tabIndex={0}
      >
        <div className="flex items-center justify-between mb-3">
          {/* Badge de clase/ahorro */}
          {badge && (
            <div className="bg-yellow-400 text-black text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
              {badge}
            </div>
          )}

          {/* Checkbox overlay para comparar */}
          {showCompareCheckbox && (
            <div 
              className="backdrop-blur-sm shadow-sm transition-colors justify-end ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                id={flight.id}
                checked={isCompareChecked}
                onCheckedChange={(checked) => {
                  onCompareChecked && onCompareChecked(Boolean(checked));
                }}
                className="w-4 h-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 "
              />
            </div>
          )}
        </div>

        <div className='flex flex-row justify-content-between'>
          {/* Layout responsive: vertical en mobile, horizontal en desktop */}
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 w-2/3">
            
            {/* Horarios y ruta */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 text-sm md:text-lg font-bold text-gray-900">
                
                {/* Logo de aerolínea */}
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {airlineLogo ? (
                    <img
                      src={airlineLogo}
                      alt={airlineName}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs font-bold">
                      {airlineName.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* --- SECCIÓN DE HORAS Y FECHAS --- */}
                <div className="flex items-center space-x-2 pl-2">
                  {/* Salida */}
                  <div className="flex flex-col items-center leading-tight">
                    {departureDate && (
                      <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wide">
                        {departureDate}
                      </span>
                    )}
                    <span>{departureTime}</span>
                  </div>

                  <span className="text-gray-300 font-light">——</span>

                  {/* Llegada */}
                  <div className="flex flex-col items-center leading-tight">
                    {arrivalDate && (
                      <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wide">
                        {arrivalDate}
                      </span>
                    )}
                    <span>{arrivalTime}</span>
                  </div>
                </div>
                {/* ---------------------------------- */}

              </div>
              
              <div className="text-xs md:text-sm text-gray-600 pl-12">
                {origin?.stopCode} - {dest?.stopCode} ({origin?.city} a {dest?.city})
              </div>
              <div className="text-xs md:text-sm text-gray-500 pl-12">{airlineName}</div>
            </div>

            {/* Duración y tipo de vuelo */}
            <div className="flex flex-row gap-3 md:flex-col items-center text-left md:text-center pl-12 md:pl-0 w- mr-auto lg:mr-0">
              <div className="text-xs md:text-sm font-medium text-gray-700 md:mb-1">
                {duration}
              </div>
              <div
                className={`text-xs md:text-sm px-2 py-1 rounded w-auto ${
                  flight.isDirect
                    ? "text-green-700 bg-green-50"
                    : "text-orange-700 bg-orange-50"
                }`}
              >
                {stopsLabel}
              </div>
            </div>
          </div>

          {/* Precio */}
          <div className="flex flex-col items-end text-right justify-content-end flex-shrink-0 w-1/3">
            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              ${price}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mb-2">
              {priceLabel} <span className="uppercase">{currency}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-row items-center justify-between">
          <div className='w-auto h-full'>
             {/* Espacio para tags de ahorro si implementas lógica futura */}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDetailsClick}
            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal text-xs md:text-sm"
          >
            Detalles del vuelo
          </Button>
        </div>
      </div>
    </Suspense>
  );
};

export default CustomFlightCard;