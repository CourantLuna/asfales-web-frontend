'use client';

import React, { useState, useEffect, Suspense, useImperativeHandle, forwardRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import { SearchFieldsWithSwap } from '@/components/shared/SearchFieldsWithSwap';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { StandardSelect, type StandardSelectOption } from '@/components/shared/standard-fields-component/StandardSelect';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { Button } from '@/components/ui/button';
import { Plus, Search, Plane, MapPin, Trash, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTransportDataSources, defaultPassengers } from '@/lib/data/mock-datavf';
import path from 'path';
import { useIsMobile } from '@/components/ui/use-mobile';

interface FlightsSearchBarProps {
  /**
   * Whether to show search buttons (default: true)
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

const FlightsSearchBar = forwardRef(function FlightsSearchBar(
  {
    showSearchButton = true,
    travelingFrom,
    setTravelingFrom,
    goingTo,
    setGoingTo,
    onSwapLocations,
    searchDataSources,
  }: FlightsSearchBarProps,
  ref
) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const basePath = (pathname === '/' || pathname === '/global-transport-search') ? '/global-transport-search' : (pathname.endsWith('/transports') ? pathname : '/transports');
  const [activeTab, setActiveTab] = useState('roundtrip');
  const [cabinClass, setCabinClass] = useState('economy');
  const [passengers, setPassengers] = useState<PassengerGroup>(defaultPassengers);

  // Obtener fuentes de datos para vuelos
  const TRANSPORT_DATA_SOURCES = searchDataSources || getTransportDataSources('air');

  // Estados locales para origin/destination (fallback si no se pasan como props)
  const [localTravelingFrom, setLocalTravelingFrom] = useState('SDQ');
  const [localGoingTo, setLocalGoingTo] = useState('MDE');

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
      { id: '1', origin: 'SDQ', destination: 'MDE', date: undefined },
      { id: '2', origin: 'MDE', destination: 'MAD', date: undefined },
    ]
  );

  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🔄 Loading URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar tipo de vuelo PRIMERO (tab activo)
    const typeParam = searchParams.get('type');
    if (typeParam && ['roundtrip', 'oneway', 'multicity'].includes(typeParam)) {
      setActiveTab(typeParam);
    }

    // Cargar origen y destino (solo para roundtrip y oneway)
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (fromParam && !travelingFrom && typeParam !== 'multicity') { // Solo si no viene como prop y no es multicity
      handleTravelingFromChange(fromParam);
    }
    if (toParam && !goingTo && typeParam !== 'multicity') { // Solo si no viene como prop y no es multicity
      handleGoingToChange(toParam);
    }

    // Cargar clase de cabina (para todos los tipos)
    const classParam = searchParams.get('class');
    if (classParam) {
      setCabinClass(classParam);
    }

    // Cargar pasajeros (para todos los tipos)
    const adultsParam = searchParams.get('adults');
    const childrenParam = searchParams.get('children');
    const infantsOnLapParam = searchParams.get('infantsOnLap');
    const infantsInSeatParam = searchParams.get('infantsInSeat');
    
    if (adultsParam || childrenParam || infantsOnLapParam || infantsInSeatParam) {
      console.log('📊 Loading passengers:', { adultsParam, childrenParam, infantsOnLapParam, infantsInSeatParam });
      setPassengers(prev => ({
        adults: adultsParam ? parseInt(adultsParam) : prev.adults,
        children: childrenParam ? Array(parseInt(childrenParam)).fill({ age: 12 }) : prev.children,
        infantsOnLap: infantsOnLapParam ? Array(parseInt(infantsOnLapParam)).fill({ age: 1 }) : prev.infantsOnLap,
        infantsInSeat: infantsInSeatParam ? Array(parseInt(infantsInSeatParam)).fill({ age: 1 }) : prev.infantsInSeat,
      }));
    }

    // Cargar fechas según el tipo de vuelo
    const departureDateParam = searchParams.get('departureDate');
    const returnDateParam = searchParams.get('returnDate');
    const flightsParam = searchParams.get('flights');

    if (typeParam === 'roundtrip') {
      console.log('📅 Loading roundtrip dates:', { departureDateParam, returnDateParam });
      setRoundtripDates({
        from: departureDateParam ? new Date(departureDateParam + 'T12:00:00') : undefined,
        to: returnDateParam ? new Date(returnDateParam + 'T12:00:00') : undefined,
      });
    } else if (typeParam === 'oneway') {
      console.log('📅 Loading oneway date:', { departureDateParam });
      if (departureDateParam) {
        setOnewayDate({
          from: new Date(departureDateParam + 'T12:00:00'),
        });
      }
    } else if (typeParam === 'multicity') {
      console.log('✈️ Loading multicity flights:', { flightsParam });
      if (flightsParam) {
        try {
          const parsedFlights = JSON.parse(flightsParam);
          console.log('✈️ Parsed flights:', parsedFlights);
          const loadedFlights = parsedFlights.map((flight: any, index: number) => ({
            id: (index + 1).toString(),
            origin: flight.from || '',
            destination: flight.to || '',
            date: flight.date ? new Date(flight.date + 'T12:00:00') : undefined, // Forzar hora local del mediodía
          }));
          console.log('✈️ Loaded flights with dates:', loadedFlights);
          setFlights(loadedFlights);
        } catch (error) {
          console.error('❌ Error parsing flights from URL:', error);
        }
      }
    }

    console.log('✅ URL parameters loaded successfully');
  }, [searchParams, travelingFrom, goingTo, handleTravelingFromChange, handleGoingToChange]);

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
    console.log('🚀 handleSearch called with values:', {
      activeTab,
      cabinClass,
      passengers,
      currentTravelingFrom,
      currentGoingTo,
      roundtripDates,
      onewayDate,
      flights,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();

    // Agregar parámetros básicos solo si tienen valor
    if (currentTravelingFrom) {
      params.append("from", currentTravelingFrom);
    }
    if (currentGoingTo) {
      params.append("to", currentGoingTo);
    }

    // Tipo de viaje
    params.append("type", activeTab);

    // Clase de cabina
    if (cabinClass) {
      params.append("class", cabinClass);
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

    // Fechas según el tipo de viaje
    if (activeTab === 'roundtrip') {
      if (roundtripDates?.from) {
        params.append("departureDate", roundtripDates.from.toISOString().split("T")[0]);
      }
      if (roundtripDates?.to) {
        params.append("returnDate", roundtripDates.to.toISOString().split("T")[0]);
      }
    } else if (activeTab === 'oneway') {
      if (onewayDate?.from) {
        params.append("departureDate", onewayDate.from.toISOString().split("T")[0]);
      }
    } else if (activeTab === 'multicity') {
      // Para multicity, serializar los vuelos como JSON
      const validFlights = flights.filter(flight => 
        flight.origin && flight.destination && flight.date
      );
      if (validFlights.length > 0) {
        const flightsData = validFlights.map(flight => ({
          from: flight.origin,
          to: flight.destination,
          date: flight.date?.toISOString().split("T")[0]
        }));
        params.append("flights", JSON.stringify(flightsData));
      }
    }

    // Agregar parámetro para mostrar resultados
    params.append("showresults", "true");

        // Agregar parámetro para mostrar resultados
    params.append("transportType", "flights");

    // Navegar con la URL construida
    var finalUrl = (pathname === '/' || pathname === '/global-transport-search')  ? `${basePath}?${params.toString()}` : `${basePath}/flights?${params.toString()}`;
    finalUrl = (isMobile? `?${params.toString()}`: finalUrl);
    console.log("🌐 Final URL:", finalUrl);
    router.push(finalUrl);
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
            key={`passengers-${activeTab}`} // Key estable basada en el tab activo
            initialPassengers={ passengers }
            onPassengersChange={ setPassengers }
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

        {showSearchButton && (
        <div className="flex justify-end items-end ml-auto">
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar vuelos
          </Button>
        </div>
      )}
      </div>

      
    </div>
  );

  // oneway Tab Content
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
          dualTriggerLabels={{
            from: 'Fecha de partida',
            to: 'Fecha de regreso'
          }}
            placeholder="Jul 11"
            showFlexibleDates={false}
            value={onewayDate}
            onChange={setOnewayDate}
            hasReturnDate={false}
            dualTrigger={true}
          />
          
          <PassengerSelector
            label="Viajeros"
            key={`passengers-${activeTab}`} // Key estable basada en el tab activo
            initialPassengers={ passengers}
            onPassengersChange={ setPassengers}
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

         {showSearchButton && (
        <div className="flex justify-end items-end ml-auto">
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium h-12 w-full md:w-[280px]"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar vuelo
          </Button>
        </div>
      )}
      </div>

     
      
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
          key={`passengers-${activeTab}`} // Key estable basada en el tab activo
          initialPassengers={  passengers}
          onPassengersChange={ setPassengers}
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
                  className="text-red-600 hover:text-red-700 "
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Eliminar vuelo
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
                // label="Fecha de vuelo"
                dualTriggerLabels={{
            from: 'Fecha de partida',
            to: 'Fecha de regreso'
          }}
                placeholder="Jul 11"
                value={flight.date ? { from: flight.date } : {}}
                onChange={(range) => updateFlight(flight.id, { date: range.from })}
                hasReturnDate={false}
                dualTrigger={true}
                showFlexibleDates={false}
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
            Buscar vuelos
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

  useImperativeHandle(ref, () => ({
  executeSearch: handleSearch
}));

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className="pt-0 lg:p-0">
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
    </Suspense>


  );
});



export default FlightsSearchBar;