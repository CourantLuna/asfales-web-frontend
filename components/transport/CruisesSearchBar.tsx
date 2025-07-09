'use client';

import React, { useState } from 'react';
import { StandardSearchField, StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { DurationSelector, type DurationRange } from '@/components/shared/standard-fields-component/DurationSelector';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Anchor } from 'lucide-react';

interface CruisesSearchBarProps {
  /**
   * Whether to show search button (default: true)
   */
  showSearchButton?: boolean;
}

const CRUISE_DATA_SOURCES: StandardSearchDataSource[] = [
  {
    id: 'cruise-ports',
    label: 'Cruise Ports',
    icon: <Anchor className="w-4 h-4" />,
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

export default function CruisesSearchBar({ showSearchButton = true }: CruisesSearchBarProps) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<{ from?: Date; to?: Date }>({});
  const [duration, setDuration] = useState<DurationRange>({ minNights: 3, maxNights: 9 });

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
