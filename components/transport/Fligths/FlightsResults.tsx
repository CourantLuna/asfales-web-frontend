'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FlightResultsTemplate from './FlightResultsTemplate';
import { Badge } from '@/components/ui/badge';
import { Plane, Calendar, Users, ArrowRight, MapPin } from 'lucide-react';
import { formatCityName } from '@/lib/data/mock-datavf';

interface IFlightsResultsProps {
  filterDefaults?: Record<string, any>;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  flightData?: any[];
  flightType?: 'roundtrip' | 'oneway' | 'multicity';
  destinations?: string[];
  externalShowResults?: boolean; // Para controlar la visibilidad desde fuera
}


export default function FlightsResults({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  flightData,
  flightType: propFlightType = 'roundtrip',
  destinations: propDestinations,
}: IFlightsResultsProps) {
  const searchParams = useSearchParams();
  
  // Estados para la información de búsqueda
  const [flightType, setFlightType] = useState<'roundtrip' | 'oneway' | 'multicity'>(propFlightType);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy',
    flights: [] as Array<{from: string, to: string, date: string}>
  });


  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🔄 Loading URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar tipo de vuelo PRIMERO
    const typeParam = searchParams.get('type');
    
    if (typeParam) {
     
      setFlightType(typeParam as 'roundtrip' | 'oneway' | 'multicity');
    }

    // Cargar datos de búsqueda
    const fromParam = searchParams.get('from') || '';
    const toParam = searchParams.get('to') || '';
    const departureDateParam = searchParams.get('departureDate') || '';
    const returnDateParam = searchParams.get('returnDate') || '';
    const adultsParam = searchParams.get('adults') || '1';
    const childrenParam = searchParams.get('children') || '0';
    const infantsParam = searchParams.get('infants') || '0';
    const classParam = searchParams.get('class') || 'economy';
    const flightsParam = searchParams.get('flights');



    let parsedFlights: Array<{from: string, to: string, date: string}> = [];
    if (flightsParam && typeParam === 'multicity') {
      try {
        parsedFlights = JSON.parse(flightsParam);
      } catch (error) {
        console.error('❌ Error parsing flights from URL:', error);
      }
    }

    setSearchData({
      from: fromParam,
      to: toParam,
      departureDate: departureDateParam,
      returnDate: returnDateParam,
      adults: parseInt(adultsParam) || 1,
      children: parseInt(childrenParam) || 0,
      infants: parseInt(infantsParam) || 0,
      class: classParam,
      flights: parsedFlights
    });

    console.log('✅ URL parameters loaded successfully');
  }, [searchParams, propFlightType]);

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  // Función para formatear pasajeros
  const formatPassengers = () => {
    const parts = [];
    if (searchData.adults > 0) {
      parts.push(`${searchData.adults} adulto${searchData.adults > 1 ? 's' : ''}`);
    }
    if (searchData.children > 0) {
      parts.push(`${searchData.children} niño${searchData.children > 1 ? 's' : ''}`);
    }
    if (searchData.infants > 0) {
      parts.push(`${searchData.infants} bebé${searchData.infants > 1 ? 's' : ''}`);
    }
    return parts.join(', ');
  };

  // Función para formatear clase de cabina
  const formatCabinClass = (cabinClass: string) => {
    const classMap: Record<string, string> = {
      'economy': 'Económica',
      'premium-economy': 'Premium Economy',
      'business': 'Business',
      'first': 'Primera Clase'
    };
    return classMap[cabinClass] || cabinClass;
  };



  // Renderizar el header con información de búsqueda
  const renderSearchHeader = () => {
    return (
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="space-y- flex flex-row items-center gap-4">
            

            {/* Información específica según el tipo de vuelo */}
            {flightType === 'multicity' && searchData.flights.length > 0 ? (
              <div className="space-y-3">
                {searchData.flights.map((flight, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Vuelo {index + 1}
                      </span>
                      <MapPin className="w-4 h-4" />
                      <span>{formatCityName(flight.from)} → {formatCityName(flight.to)}</span>
                    </div>
                    {flight.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(flight.date)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {(searchData.from || searchData.to) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {searchData.from && formatCityName(searchData.from)}
                      {searchData.from && searchData.to && (
                        <>
                          {flightType === 'roundtrip' ? (
                            <ArrowRight className="w-4 h-4 mx-2 inline" />
                          ) : (
                            ' → '
                          )}
                        </>
                      )}
                      {searchData.to && formatCityName(searchData.to)}
                    </span>
                  </div>
                )}
                
                {(searchData.departureDate || searchData.returnDate) && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {searchData.departureDate && formatDate(searchData.departureDate)}
                      {searchData.departureDate && searchData.returnDate && flightType === 'roundtrip' && ' - '}
                      {searchData.returnDate && flightType === 'roundtrip' && formatDate(searchData.returnDate)}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{formatPassengers()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  <span>{formatCabinClass(searchData.class)}</span>
                </div>
              </div>
            )}

            <div className='flex items-center justify-between'>
                <Badge variant="secondary" className="ml-2">
                {flightType === 'roundtrip' && 'Ida y vuelta'}
                {flightType === 'oneway' && 'Solo ida'}
                {flightType === 'multicity' && 'Múltiples destinos'}
              </Badge>
            </div>
          </div>
        </div>
      </Suspense>
    );
  };

  return (
    <div>
      {/* Header con información de búsqueda */}
      {renderSearchHeader()}
      
      {/* Componente de resultados */}
      <FlightResultsTemplate
        filterDefaults={filterDefaults}
        className={className}
        onFiltersChange={onFiltersChange}
        onCardClick={onCardClick}
        flightData={flightData}
        flightType={flightType}
        destinations={propDestinations}
      />
    </div>
  );
}