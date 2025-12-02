'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FlightCardData {
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
}

interface CustomFlightCardProps {
  flight: FlightCardData;
  onDetailsClick?: (flight: FlightCardData) => void;
  onClick?: (flight: FlightCardData) => void;
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
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDetailsClick?.(flight);
  };

  const handleCardClick = () => {
    onClick?.(flight);
  };

  

  return (
    <Suspense
                fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
              >
    <div
 className={`bg-white border border-gray-200 rounded-lg p-4 transition-shadow 
  shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.015] cursor-pointer group relative 
  focus:outline-none focus:ring-0 focus:border-primary focus:border-2 
  focus-within:outline-none focus-within:ring-0 focus-within:border-primary focus-within:border-2 ${className}`}
        onClick={handleCardClick}
        tabIndex={0}
    >
      <div className="flex items-center justify-between mb-3">

        {/* Badge de ahorro si existe */}
      {flight.badge && (
        <div className="bg-yellow-400 text-black text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
          💰 {flight.badge}
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
                onCompareChecked && onCompareChecked( Boolean(checked));
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
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              {flight.logo ? (
                <img
                  src={flight.logo}
                  alt={flight.airline}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-white text-xs font-bold">
                  {flight.airline.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <span className='pl-2'>{flight.departureTime}</span>
            <span className="text-gray-400">——</span>
            <span>{flight.arrivalTime}</span>
          </div>
          <div className="text-xs md:text-sm text-gray-600 pl-12">
            {flight.departureAirport} - {flight.arrivalAirport}
          </div>
          <div className="text-xs md:text-sm text-gray-500 pl-12">{flight.airline}</div>
        </div>

        {/* Duración y tipo de vuelo */}
        <div className="flex flex-row gap-3 md:flex-col items-center text-left md:text-center pl-12 md:pl-0 w- mr-auto lg:mr-0">
          <div className="text-xs md:text-sm font-medium text-gray-700 md:mb-1">
            {flight.duration}
          </div>
          <div
            className={`text-xs md:text-sm px-2 py-1 rounded w-auto ${
              flight.stops === "Vuelo sin escalas" || flight.stops === "Directo"
                ? "text-green-700 bg-green-50"
                : "text-orange-700 bg-orange-50"
            }`}
          >
            {flight.stops}
          </div>
        </div>

        
      </div>


      {/* Precio */}
        <div className="flex flex-col items-end text-right justify-content-end flex-shrink-0 w-1/3">
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            ${flight.price}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mb-2">
            {flight.priceLabel || "Redondeado por pasajero"}
          </div>
          
        </div>

        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-row items-center justify-between">

      <div className='w-auto h-full'>
      {/* Información adicional si hay promoción */}
      {flight.savings && (
          <div className="text-xs md:text-sm text-gray-600">{flight.savings}</div>
      )}
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