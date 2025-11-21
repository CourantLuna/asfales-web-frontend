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


  return (
    <div>
      
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