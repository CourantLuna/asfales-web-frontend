'use client';

import React, { useState } from 'react';
import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import { SearchFieldsWithSwap } from '@/components/shared/SearchFieldsWithSwap';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { Button } from '@/components/ui/button';
import { Plus, Search, Plane, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ITransportSearchBarProps {}

interface FlightData {
  id: string;
  origin: string;
  destination: string;
  date?: Date;
}

const TRANSPORT_DATA_SOURCES: StandardSearchDataSource[] = [
  {
    id: 'airports',
    label: 'Airports',
    icon: <Plane className="w-4 h-4" />,
    type: 'airport',
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

export default function TransportSearchBar() {
  const [activeTab, setActiveTab] = useState('roundtrip');
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });

  // Roundtrip states
  const [roundtripOrigin, setRoundtripOrigin] = useState('');
  const [roundtripDestination, setRoundtripDestination] = useState('');
  const [roundtripDates, setRoundtripDates] = useState<{ from?: Date; to?: Date }>({});

  // One-way states
  const [onewayOrigin, setOnewayOrigin] = useState('');
  const [onewayDestination, setOnewayDestination] = useState('');
  const [onewayDate, setOnewayDate] = useState<{ from?: Date; to?: Date }>({});

  // Multi-city states
  const [flights, setFlights] = useState<FlightData[]>(
    [
      { id: '1', origin: '', destination: '', date: undefined },
      { id: '2', origin: '', destination: '', date: undefined },
    ]
  );

  const handleRoundtripSwap = () => {
    const tempOrigin = roundtripOrigin;
    setRoundtripOrigin(roundtripDestination);
    setRoundtripDestination(tempOrigin);
  };

  const handleOnewaySwap = () => {
    const tempOrigin = onewayOrigin;
    setOnewayOrigin(onewayDestination);
    setOnewayDestination(tempOrigin);
  };

  const handleFlightSwap = (flightId: string) => {
    setFlights(prev => prev.map(flight => 
      flight.id === flightId 
        ? { ...flight, origin: flight.destination, destination: flight.origin }
        : flight
    ));
  };

  const updateFlight = (flightId: string, updates: Partial<FlightData>) => {
    setFlights(prev => prev.map(flight => 
      flight.id === flightId ? { ...flight, ...updates } : flight
    ));
  };

  const addFlight = () => {
    const newFlight: FlightData = {
      id: Date.now().toString(),
      origin: '',
      destination: '',
      date: undefined,
    };
    setFlights(prev => [...prev, newFlight]);
  };

  const removeFlight = (flightId: string) => {
    if (flights.length > 2) {
      setFlights(prev => prev.filter(flight => flight.id !== flightId));
    }
  };

  const handleSearch = () => {
    console.log('Searching transport with:', {
      activeTab,
      passengers,
      roundtrip: { origin: roundtripOrigin, destination: roundtripDestination, dates: roundtripDates },
      oneway: { origin: onewayOrigin, destination: onewayDestination, date: onewayDate },
      multicity: flights,
    });
  };

  // Roundtrip Tab Content
  const roundtripContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <div className='w-full md:w-auto' >
          <SearchFieldsWithSwap
            originLabel="Saliendo de"
            originPlaceholder="Santo Domingo (SDQ-Las Americas Intl.)"
            originValue={roundtripOrigin}
            onOriginValueChange={setRoundtripOrigin}
            destinationLabel="Ir a"
            destinationPlaceholder="Ir a"
            destinationValue={roundtripDestination}
            onDestinationValueChange={setRoundtripDestination}
            dataSources={TRANSPORT_DATA_SOURCES}
            onSwap={handleRoundtripSwap}
            showSearchButton={false}
            containerClassName="-mr-4"
          />
        </div>
        
          <DateRangePickerCustom
            label="Fechas de viaje"
            placeholder="Jul 11"
            value={roundtripDates}
            onChange={setRoundtripDates}
            hasReturnDate={true}
            dualTrigger={false}
            className="w-full lg:w-auto"
          />
          
          <PassengerSelector
            label="Viajeros"
            initialPassengers={passengers}
            onPassengersChange={setPassengers}
            containerClassName="w-full lg:w-auto"
          />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
        >
          <Search className="w-4 h-4 mr-2" />
                    Buscar
        </Button>
      </div>
    </div>
  );

  // One-way Tab Content
  const onewayContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <div className="">
          <SearchFieldsWithSwap
            originLabel="Leaving from"
            originPlaceholder="Santo Domingo (SDQ-Las Americas Intl.)"
            originValue={onewayOrigin}
            showClearButton={true}

            onOriginValueChange={setOnewayOrigin}
            destinationLabel="Going to"
            destinationPlaceholder="Going to"
            destinationValue={onewayDestination}
            onDestinationValueChange={setOnewayDestination}
            dataSources={TRANSPORT_DATA_SOURCES}
            onSwap={handleOnewaySwap}
            showSearchButton={false}
            containerClassName="-mr-4"
          />

          
        </div>
        
          <DateRangePickerCustom
            label="Date"
            placeholder="Jul 11"
            showFlexibleDates={false}
            value={onewayDate}
            onChange={setOnewayDate}
            hasReturnDate={false}
            dualTrigger={false}
          />
          
          <PassengerSelector
            label="Travelers"
            initialPassengers={passengers}
            onPassengersChange={setPassengers}
          />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );

  // Multi-city Tab Content
  const multicittyContent = (
    <div className="space-y-6">
      {/* Passenger Selector First */}
      <div className="flex justify-start">
        <PassengerSelector
          label="Travelers"
          initialPassengers={passengers}
          onPassengersChange={setPassengers}
          containerClassName="w-full lg:w-auto"
        />
      </div>

      {/* Flights */}
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <div key={flight.id} className="space-y-2">
            <div className="flex items-center justify-start gap-4">
              <h3 className="text-sm font-medium text-gray-700">
                Flight {index + 1}
              </h3>
              {flights.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFlight(flight.id)}
                  className="text-red-600 hover:text-red-700 h-12 w-full md:w-[280px]"
                >
                  Remove
                </Button>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="">
                <SearchFieldsWithSwap
                  originLabel="Leaving from"
                  originPlaceholder="Santo Domingo (SDQ-Las Americas Intl.)"
                  originValue={flight.origin}
                  onOriginValueChange={(value) => updateFlight(flight.id, { origin: value })}
                  destinationLabel="Going to"
                  destinationPlaceholder="Going to"
                  destinationValue={flight.destination}
                  onDestinationValueChange={(value) => updateFlight(flight.id, { destination: value })}
                  dataSources={TRANSPORT_DATA_SOURCES}
                  onSwap={() => handleFlightSwap(flight.id)}
                  showSearchButton={false}
                  containerClassName="flex-1"
                />
              </div>
              
              <DateRangePickerCustom
                label="Date"
                placeholder="Jul 11"
                value={flight.date ? { from: flight.date } : {}}
                onChange={(range) => updateFlight(flight.id, { date: range.from })}
                hasReturnDate={false}
                dualTrigger={false}
                className="w-full lg:w-auto"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Another Flight Button */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={addFlight}
          disabled={flights.length >= 5} // Limit to 5 flights
          className="text-primary border-primary hover:bg-blue-50 h-12 w-full md:w-[280px] rounded-lg font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir otro vuelo
        </Button>

         <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary text-white px-8 py-3 h-12 w-full md:w-[280px] rounded-lg font-medium"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Search Button */}
      <div className="flex justify-end">
       
      </div>
    </div>
  );

  const tabItems: TabItem[] = [
    {
      value: 'roundtrip',
      label: 'Ida y vuelta',
      content: roundtripContent,
    },
    {
      value: 'oneway',
      label: 'Solo ida',
      content: onewayContent,
    },
    {
      value: 'multicity',
      label: 'Multiples destinos',
      content: multicittyContent,
    },
  ];

  return (
    <div className="w-full p-4 lg:p-0">
        <StandardTabs
          items={tabItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          containerClassName="w-full"
          showMobileSelector={true}
          mobilePlaceholder="Select trip type"
        />
    </div>
  );
}