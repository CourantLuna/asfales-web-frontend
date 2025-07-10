'use client';

import React, { useState } from 'react';
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

  const handleSearch = () => {
    console.log('Searching buses with:', {
      origin: currentOrigin,
      destination: currentDestination,
      dates,
      passengers,
    });
  };

  return (
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
  );
}
