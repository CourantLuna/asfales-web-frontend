'use client';

import React, { useState } from 'react';
import { SearchFieldsWithSwap } from '@/components/shared/SearchFieldsWithSwap';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Bus } from 'lucide-react';

interface BusesSearchBarProps {}

const BUS_DATA_SOURCES: StandardSearchDataSource[] = [
  {
    id: 'bus-stations',
    label: 'Bus Stations',
    icon: <Bus className="w-4 h-4" />,
    type: 'custom',
    options: [],
    nameValueField: 'code',
    nameLabelField: 'name',
    nameDescriptionField: 'city',
  },
  {
    id: 'cities',
    label: 'Cities',
    icon: <MapPin className="w-4 h-4" />,
    type: 'city',
    options: [],
    nameValueField: 'code',
    nameLabelField: 'name',
    nameDescriptionField: 'country',
  },
];

export default function BusesSearchBar({}: BusesSearchBarProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState<{ from?: Date; to?: Date }>({});
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });

  const handleSwap = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };

  const handleSearch = () => {
    console.log('Searching buses with:', {
      origin,
      destination,
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
              originValue={origin}
              onOriginValueChange={setOrigin}
              destinationLabel="Ir a"
              destinationPlaceholder="Destino"
              destinationValue={destination}
              onDestinationValueChange={setDestination}
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
            initialPassengers={passengers}
            onPassengersChange={setPassengers}
            containerClassName="w-full lg:w-auto"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar autobuses
          </Button>
        </div>
      </div>
    </div>
  );
}
