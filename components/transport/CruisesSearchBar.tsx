'use client';

import React, { useState } from 'react';
import { StandardSearchField, StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { DurationSelector, type DurationRange } from '@/components/shared/standard-fields-component/DurationSelector';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Anchor } from 'lucide-react';
import { getTransportDataSources } from '@/lib/data/mock-datavf';
import { PassengerGroup } from '../shared/standard-fields-component/PassengerSelector';

interface CruisesSearchBarProps {
  /**
   * Whether to show search button (default: true)
   */
  showSearchButton?: boolean;

}

export default function CruisesSearchBar({ showSearchButton = true }: CruisesSearchBarProps) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<{ from?: Date; to?: Date }>({});
  const [duration, setDuration] = useState<DurationRange>({ minNights: 3, maxNights: 9 });

  // Obtener fuentes de datos para cruceros
  const CRUISE_DATA_SOURCES = getTransportDataSources('cruise');

  const handleSearch = () => {
    console.log('Searching cruises with:', {
      destination,
      departureDate,
      duration,
    });
  };

  return (
    <div className="w-full p-4 lg:p-0">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {/* Destination Field */}
          <StandardSearchField
            label="Destino"
            placeholder="Caribe, Mediterráneo, Alaska..."
            value={destination}
            onValueChange={setDestination}
            dataSources={CRUISE_DATA_SOURCES}
            showClearButton={true}
            containerClassName="w-full md:w-auto"
          />
          
          {/* Departure Date Range */}
          <DateRangePickerCustom
            placeholder="Jul 11"
            showFlexibleDates={false}
            value={departureDate}
            onChange={setDepartureDate}
            hasReturnDate={false}
            dualTrigger={true}
            className="w-full lg:w-auto"
          />
          
          {/* Duration Selector */}
          <DurationSelector
            label="Duración"
            placeholder="3 - 9 noches"
            value={duration}
            onChange={setDuration}
            containerClassName="w-full lg:w-[280px]"
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
              Buscar cruceros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
