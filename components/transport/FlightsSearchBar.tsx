'use client';

import React, { useState } from 'react';
import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import { SearchFieldsWithSwap } from '@/components/shared/SearchFieldsWithSwap';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { StandardSelect, type StandardSelectOption } from '@/components/shared/standard-fields-component/StandardSelect';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { Button } from '@/components/ui/button';
import { Plus, Search, Plane, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTransportDataSources, defaultPassengers } from '@/lib/data/mock-datavf';

interface FlightsSearchBarProps {
  /**
   * Whether to show search buttons (default: true)
   */
  showSearchButton?: boolean;

  //sincronizacion de pasajeros
  onPassengersGlobalChange?: (passengers: PassengerGroup) => void;
  initialGlobalPassengers?: PassengerGroup;

  // Props para sincronización de campos de origen/destino
  travelingFrom?: string;
  setTravelingFrom?: (value: string) => void;
  goingTo?: string;
  setGoingTo?: (value: string) => void;
  onSwapLocations?: () => void;
  searchDataSources?: StandardSearchDataSource[];
}

interface FlightData {
  id: string;
  origin: string;
  destination: string;
  date?: Date;
}

const CABIN_CLASS_OPTIONS: StandardSelectOption[] = [
  { value: 'economy', label: 'Económica' },
  { value: 'premium-economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'Primera Clase' },
];

export default function FlightsSearchBar({ 
  showSearchButton = true,
  onPassengersGlobalChange,
  initialGlobalPassengers,
  travelingFrom,
  setTravelingFrom,
  goingTo,
  setGoingTo,
  onSwapLocations,
  searchDataSources,
}: FlightsSearchBarProps) {


  const [activeTab, setActiveTab] = useState('roundtrip');
  const [cabinClass, setCabinClass] = useState('economy');
  const [passengers, setPassengers] = useState<PassengerGroup>(defaultPassengers);

  // Obtener fuentes de datos para vuelos
  const TRANSPORT_DATA_SOURCES = searchDataSources || getTransportDataSources('air');

  // Estados locales para origin/destination (fallback si no se pasan como props)
  const [localTravelingFrom, setLocalTravelingFrom] = useState('');
  const [localGoingTo, setLocalGoingTo] = useState('');

  // Usar props sincronizados o estado local
  const currentTravelingFrom = travelingFrom !== undefined ? travelingFrom : localTravelingFrom;
  const currentGoingTo = goingTo !== undefined ? goingTo : localGoingTo;
  const handleTravelingFromChange = setTravelingFrom || setLocalTravelingFrom;
  const handleGoingToChange = setGoingTo || setLocalGoingTo;
  
  const handleSwapLocations = onSwapLocations || (() => {
    const temp = currentTravelingFrom;
    handleTravelingFromChange(currentGoingTo);
    handleGoingToChange(temp);
  });

  // Estados para fechas específicos de cada tab
  const [roundtripDates, setRoundtripDates] = useState<{ from?: Date; to?: Date }>({});
  const [onewayDate, setOnewayDate] = useState<{ from?: Date; to?: Date }>({});

  // Multi-city states
  const [flights, setFlights] = useState<FlightData[]>(
    [
      { id: '1', origin: '', destination: '', date: undefined },
      { id: '2', origin: '', destination: '', date: undefined },
    ]
  );

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
      cabinClass,
      passengers,
      roundtrip: { origin: currentTravelingFrom, destination: currentGoingTo, dates: roundtripDates },
      oneway: { origin: currentTravelingFrom, destination: currentGoingTo, date: onewayDate },
      multicity: flights,
    });
  };

  // Roundtrip Tab Content
  const roundtripContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-4">
    
{        /* Search Fields with Swap for Roundtrip */}
        <div className='w-full md:w-auto' >
          <SearchFieldsWithSwap
            originLabel="Saliendo de"
            originPlaceholder="Partir desde..."
            originValue={currentTravelingFrom}
            onOriginValueChange={handleTravelingFromChange}
            destinationLabel="Ir a"
            destinationPlaceholder="Ir a"
            destinationValue={currentGoingTo}
            onDestinationValueChange={handleGoingToChange}
            dataSources={TRANSPORT_DATA_SOURCES}
            onSwap={handleSwapLocations}
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
            className="w-full md:w-[280px]"
          />
          
          <PassengerSelector
            label="Viajeros"
            initialPassengers={ initialGlobalPassengers || passengers }
            onPassengersChange={onPassengersGlobalChange || setPassengers }
            containerClassName="w-full md:w-[280px]"
          />

           {/* Clase de cabina: Económica, Premium, Business, Primera */}
        <StandardSelect
          label="Clase de cabina"
          placeholder="Seleccionar clase"
          options={CABIN_CLASS_OPTIONS}
          value={cabinClass}
          onValueChange={setCabinClass}
          containerClassName="w-full md:w-[280px]"
        />
      </div>

      {showSearchButton && (
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      )}
    </div>
  );

  // One-way Tab Content
  const onewayContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-4">
        
        
        <div className='w-full md:w-auto' >
          <SearchFieldsWithSwap
            originLabel="Saliendo de"
            originPlaceholder="Partir desde..."
            originValue={currentTravelingFrom}
            showClearButton={true}

            onOriginValueChange={handleTravelingFromChange}
            destinationLabel="Ir a"
            destinationPlaceholder="Ir a"
            destinationValue={currentGoingTo}
            onDestinationValueChange={handleGoingToChange}
            dataSources={TRANSPORT_DATA_SOURCES}
            onSwap={handleSwapLocations}
            showSearchButton={false}
            containerClassName="-mr-4"
          />

          
        </div>
        
          <DateRangePickerCustom
            placeholder="Jul 11"
            showFlexibleDates={false}
            value={onewayDate}
            onChange={setOnewayDate}
            hasReturnDate={false}
            dualTrigger={true}
          />
          
          <PassengerSelector
            label="Viajeros"
            initialPassengers={initialGlobalPassengers || passengers}
            onPassengersChange={onPassengersGlobalChange || setPassengers}
          />

          {/* Clase de cabina */}
        <StandardSelect
          label="Clase de cabina"
          placeholder="Seleccionar clase"
          options={CABIN_CLASS_OPTIONS}
          value={cabinClass}
          onValueChange={setCabinClass}
          containerClassName="w-full md:w-[280px]"
        />
      </div>

      {showSearchButton && (
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      )}
    </div>
  );

  // Multi-city Tab Content
  const multicittyContent = (
    <div className="space-y-6">
      {/* Cabin Class and Passenger Selector */}
      <div className="flex flex-wrap gap-2 md:gap-4">
        <StandardSelect
          label="Clase de cabina"
          placeholder="Seleccionar clase"
          options={CABIN_CLASS_OPTIONS}
          value={cabinClass}
          onValueChange={setCabinClass}
          containerClassName="w-full md:w-[280px]"
        />
        
        <PassengerSelector
          label="Viajeros"
          initialPassengers={initialGlobalPassengers || passengers}
          onPassengersChange={onPassengersGlobalChange || setPassengers}
          containerClassName="w-full lg:w-auto"
        />
      </div>

      {/* Flights */}
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <div key={flight.id} className="space-y-2">
            <div className="flex items-center justify-start gap-4">
              <h3 className="text-sm font-medium text-gray-700">
                Vuelo {index + 1}
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
                  originLabel="Saliendo de"
                  originPlaceholder="Partir desde..."
                  originValue={flight.origin}
                  onOriginValueChange={(value) => updateFlight(flight.id, { origin: value })}
                  destinationLabel="Ir a"
                  destinationPlaceholder="Ir a"
                  destinationValue={flight.destination}
                  onDestinationValueChange={(value) => updateFlight(flight.id, { destination: value })}
                  dataSources={TRANSPORT_DATA_SOURCES}
                  onSwap={() => handleFlightSwap(flight.id)}
                  showSearchButton={false}
                  containerClassName="flex-1"
                />
              </div>
              
              <DateRangePickerCustom
                label="Fecha de vuelo"
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

        {showSearchButton && (
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary text-white px-8 py-3 h-12 w-full md:w-[280px] rounded-lg font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        )}
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
    <div className=" py-4 lg:p-0">
        <StandardTabs
          items={tabItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          containerClassName="w-auto"
          centerTabs={false}
          useMobileSelect={false} // Tabs normales siempre
          mobilePlaceholder="Select trip type"
        />
    </div>
  );
}