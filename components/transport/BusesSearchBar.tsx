'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchFieldsWithSwap } from '@/components/shared/SearchFieldsWithSwap';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Bus } from 'lucide-react';
import { getTransportDataSources, defaultPassengers } from '@/lib/data/mock-datavf';

interface BusesSearchBarProps {
  /**
   * Whether to show search button (default: true)
   */
  showSearchButton?: boolean;

  // Props para sincronización de campos de origen/destino
  travelingFrom?: string;
  setTravelingFrom?: (value: string) => void;
  goingTo?: string;
  setGoingTo?: (value: string) => void;
  onSwapLocations?: () => void;
  searchDataSources?: StandardSearchDataSource[];
}

export default function BusesSearchBar(
  { 
    showSearchButton = true,
    travelingFrom,
    setTravelingFrom,
    goingTo,
    setGoingTo,
    onSwapLocations,
    searchDataSources,
  }:
   BusesSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const basePath = (pathname === '/' || pathname === '/global-transport-search') ? '/global-transport-search' : (pathname.endsWith('/transports') ? pathname : '/transports');

  // Estados locales para origin/destination (fallback si no se pasan como props)
  const [localOrigin, setLocalOrigin] = useState('');
  const [localDestination, setLocalDestination] = useState('');
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const [passengers, setPassengers] = useState<PassengerGroup>(defaultPassengers);

  // Obtener fuentes de datos para buses
  const BUS_DATA_SOURCES = searchDataSources || getTransportDataSources('bus');

  // Usar props sincronizados o estado local
  const currentOrigin = travelingFrom !== undefined ? travelingFrom : localOrigin;
  const currentDestination = goingTo !== undefined ? goingTo : localDestination;
  const handleOriginChange = setTravelingFrom || setLocalOrigin;
  const handleDestinationChange = setGoingTo || setLocalDestination;

  const handleSwap = onSwapLocations || (() => {
    const tempOrigin = currentOrigin;
    handleOriginChange(currentDestination);
    handleDestinationChange(tempOrigin);
  });

  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🚌 Loading bus URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar origen y destino (solo si no vienen como props)
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (fromParam && !travelingFrom) {
      console.log('🎯 Loading origin:', { fromParam });
      handleOriginChange(fromParam);
    }
    if (toParam && !goingTo) {
      console.log('🎯 Loading destination:', { toParam });
      handleDestinationChange(toParam);
    }

    // Cargar pasajeros
    const adultsParam = searchParams.get('adults');
    const childrenParam = searchParams.get('children');
    const infantsOnLapParam = searchParams.get('infantsOnLap');
    const infantsInSeatParam = searchParams.get('infantsInSeat');
    
    if (adultsParam || childrenParam || infantsOnLapParam || infantsInSeatParam) {
      console.log('📊 Loading passengers:', { adultsParam, childrenParam, infantsOnLapParam, infantsInSeatParam });
      setPassengers(prev => ({
        adults: adultsParam ? parseInt(adultsParam) : prev.adults,
        children: childrenParam ? Array(parseInt(childrenParam)).fill({ age: 12, id: `child-${Date.now()}` }) : prev.children,
        infantsOnLap: infantsOnLapParam ? Array(parseInt(infantsOnLapParam)).fill({ age: 1, id: `infant-lap-${Date.now()}` }) : prev.infantsOnLap,
        infantsInSeat: infantsInSeatParam ? Array(parseInt(infantsInSeatParam)).fill({ age: 1, id: `infant-seat-${Date.now()}` }) : prev.infantsInSeat,
      }));
    }

    // Cargar fechas
    const departureDateParam = searchParams.get('departureDate');
    const returnDateParam = searchParams.get('returnDate');
    
    if (departureDateParam || returnDateParam) {
      console.log('📅 Loading dates:', { departureDateParam, returnDateParam });
      setDates({
        from: departureDateParam ? new Date(departureDateParam + 'T12:00:00') : undefined,
        to: returnDateParam ? new Date(returnDateParam + 'T12:00:00') : undefined,
      });
    }

    console.log('✅ Bus URL parameters loaded successfully');
  }, [searchParams, travelingFrom, goingTo, handleOriginChange, handleDestinationChange]);

  const handleSearch = () => {
    console.log('🚌 Searching buses with:', {
      origin: currentOrigin,
      destination: currentDestination,
      dates,
      passengers,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();

    // Agregar parámetros básicos solo si tienen valor
    if (currentOrigin) {
      params.append("from", currentOrigin);
    }
    if (currentDestination) {
      params.append("to", currentDestination);
    }

    // Pasajeros
    if (passengers) {
      params.append("adults", passengers.adults.toString());
      if (passengers.children.length > 0) {
        params.append("children", passengers.children.length.toString());
      }
      const totalInfants = passengers.infantsOnLap.length + passengers.infantsInSeat.length;
      if (totalInfants > 0) {
        params.append("infants", totalInfants.toString());
        params.append("infantsOnLap", passengers.infantsOnLap.length.toString());
        params.append("infantsInSeat", passengers.infantsInSeat.length.toString());
      }
    }

    // Fechas
    if (dates?.from) {
      params.append("departureDate", dates.from.toISOString().split("T")[0]);
    }
    if (dates?.to) {
      params.append("returnDate", dates.to.toISOString().split("T")[0]);
    }

    // Agregar parámetro para mostrar resultados
    params.append("showresults", "true");

        // Agregar parámetro para mostrar resultados
    params.append("transportType", "buses");

    // Navegar con la URL construida
    const finalUrl = (pathname === '/' || pathname === '/global-transport-search') ? `${basePath}?${params.toString()}` : `${basePath}/buses?${params.toString()}`;
    console.log("🌐 Final bus URL:", finalUrl);
    router.push(finalUrl);
  };

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className="w-full p-4 lg:p-0">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {/* Search Fields with Swap for Origin/Destination */}
          <div className="w-full md:w-auto">
            <SearchFieldsWithSwap
              originLabel="Saliendo de"
              originPlaceholder="Terminal Central"
              originValue={currentOrigin}
              onOriginValueChange={handleOriginChange}
              destinationLabel="Ir a"
              destinationPlaceholder="Destino"
              destinationValue={currentDestination}
              onDestinationValueChange={handleDestinationChange}
              dataSources={BUS_DATA_SOURCES}
              onSwap={handleSwap}
              showSearchButton={false}
              containerClassName="-mr-4"
            />
          </div>
          
          {/* Date Range Picker for Bus Travel */}
          <DateRangePickerCustom
            label="Fecha de viaje"
            placeholder="Seleccionar fecha"
            value={dates}
            onChange={setDates}
            hasReturnDate={false}
            dualTrigger={false}
            className="w-full lg:w-auto"
          />
          
          {/* Passenger Selector */}
          <PassengerSelector
            label="Pasajeros"
            initialPassengers={ passengers}
            onPassengersChange={setPassengers}
            containerClassName="w-full lg:w-auto"
          />
        </div>

        {/* Search Button */}
        {showSearchButton && (
          <div className="flex justify-end">
            <Button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar autobuses
            </Button>
          </div>
        )}
      </div>
    </div>
    </Suspense>
  );
}