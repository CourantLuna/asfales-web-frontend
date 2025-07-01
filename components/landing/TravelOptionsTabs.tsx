"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Search, Plane, Bus, Ship, Hotel, Home, Building2,
Mountain as MountainIcon,
  TentTree as TentTreeIcon,
  Footprints as FootprintsIcon,
  Landmark as LandmarkIcon,
  Sun as SunIcon,
  UtensilsCrossed as UtensilsIcon,
  Music2 as MusicIcon,
  Laugh as LaughIcon,
  Mountain,
  Route,
  Clock,
  MapPin,
  ArrowLeftRight,
  ArrowUpDown, } from "lucide-react"
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter"
import { GuestSelector, Room } from "@/components/shared/GuestSelector"
import { DateRange } from "react-day-picker"
import { DateRangePickerCustom } from "@/components/ui/date-range-picker-custom"
import { PassengerSelector, PassengerGroup } from "@/components/shared/PassengerSelector"
import { StandardTabs, TabItem } from "@/components/shared/StandardTabs"
import { StandardToggleGroup } from "@/components/shared/StandardToggleGroup"
import React from "react"
import { StandardSearchField } from "../shared/StandardSearchField";
import { set } from "date-fns";

export default function TravelOptionsTabs({
  activeTab,
  setActiveTab,
  onScrollToResults
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  onScrollToResults: () => void
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (pathname.startsWith("/global-") && pathname.endsWith("-search")) {
      router.replace(`/global-${tab}-search`);
    }
  }

  function handleBuscar() {
    if (onScrollToResults) onScrollToResults(); // <--- mueve el scroll
    // const y = window.scrollY || window.pageYOffset;
    // alert(`Scroll Y actual: ${y}`);
    router.push(`/global-${activeTab}-search`);
  }

  useEffect(() => {
    const match = pathname.match(/^\/global-(.*)-search$/);
    if (match) {
      setActiveTab(match[1]);
    }
  }, [pathname]);

  // Opciones de filtros
  const experiencesOptions: FilterOption[] = [
    { label: "Aventura", value: "aventura", icon: MountainIcon },
    { label: "Camping", value: "camping", icon: TentTreeIcon },
    { label: "Senderismo", value: "senderismo", icon: FootprintsIcon },
    { label: "Cultural", value: "cultural", icon: LandmarkIcon },
    { label: "Playa", value: "playa", icon: SunIcon },
    { label: "Gastronómica", value: "gastronomica", icon: UtensilsIcon },
    { label: "Conciertos", value: "conciertos", icon: MusicIcon },
    { label: "Eventos de Comedia", value: "comedia", icon: LaughIcon },
  ]

  const lodgingOptions: FilterOption[] = [
    { label: "Hoteles", value: "hotel", icon: Hotel },
    { label: "Casas", value: "house", icon: Home },
    { label: "Apartamentos", value: "apartment", icon: Building2 },
    { label: "Casa de huéspedes", value: "guest", icon: () => <>🛏</> },
  ]

  const[selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>(["air"])
  const [selectedLodgingTypes, setSelectedLodgingTypes] = useState<string[]>(["hotel"])
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(["playa"])
  const [guestRooms, setGuestRooms] = useState<Room[]>([{
    id: "room-1",
    adults: 2,
    children: []
  }])
  const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date()
    })

  // Estados para fechas de transporte
  const [fechaIda, setFechaIda] = useState<Date | undefined>(new Date())
  const [fechaVuelta, setFechaVuelta] = useState<Date | undefined>(new Date())

  // Estado para pasajeros de transporte
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  })

  // Estados para búsqueda de destinos
  const [travelingFrom, setTravelingFrom] = useState<string>("")
  const [goingTo, setGoingTo] = useState<string>("")

  // Función para intercambiar origen y destino
  const handleSwapLocations = () => {
    const temp = travelingFrom;
    setTravelingFrom(goingTo);
    setGoingTo(temp);
  };
  
  // Fuentes de datos para el buscador con diferentes tipos
  const searchDataSources = [
    {
      id: "recent",
      label: "Búsquedas recientes", 
      icon: <Clock className="h-4 w-4" />,
      type: "recent" as const,
      options: [
        { label: "Medellín (MDE - A. Internacional José...)", value: "med1", description: "3 de julio–6 de julio", icon: <Plane className="h-4 w-4" /> },
        { label: "Miami (MIA - Aeropuerto Internacional...)", value: "mia1", description: "1 de julio–30 de agosto • 60 noches • 2...", icon: <Plane className="h-4 w-4" /> },
        { label: "San Juan de la Maguana", value: "sj1", description: "2 de junio–3 de junio • 1 noche • 2...", icon: <MapPin className="h-4 w-4" /> },
      ]
    },
    {
      id: "airports",
      label: "Aeropuertos",
      icon: <Plane className="h-4 w-4" />,
      type: "airport" as const,
      options: [
        { label: "Madrid (MAD - Aeropuerto Barajas)", value: "mad", description: "Capital de España", icon: <Plane className="h-4 w-4" /> },
        { label: "Barcelona (BCN - Aeropuerto El Prat)", value: "bcn", description: "Ciudad mediterránea", icon: <Plane className="h-4 w-4" /> },
        { label: "París (CDG - Charles de Gaulle)", value: "par", description: "Ciudad de la luz", icon: <Plane className="h-4 w-4" /> },
        { label: "Londres (LHR - Heathrow)", value: "lon", description: "Capital británica", icon: <Plane className="h-4 w-4" /> },
      ]
    },
    {
      id: "cities",
      label: "Ciudades",
      icon: <MapPin className="h-4 w-4" />,
      type: "city" as const,
      options: [
        { label: "Roma, Italia", value: "rom", description: "Ciudad eterna", icon: <MapPin className="h-4 w-4" /> },
        { label: "Nueva York, EE.UU.", value: "nyc", description: "La gran manzana", icon: <MapPin className="h-4 w-4" /> },
        { label: "Tokyo, Japón", value: "tyo", description: "Metrópolis moderna", icon: <MapPin className="h-4 w-4" /> },
        { label: "Buenos Aires, Argentina", value: "bue", description: "París de Sudamérica", icon: <MapPin className="h-4 w-4" /> },
      ]
    },
    {
      id: "hotels",
      label: "Hoteles",
      icon: <Building2 className="h-4 w-4" />,
      type: "hotel" as const,
      options: [
        { label: "Hotel Ritz Madrid", value: "ritz-mad", description: "Lujo en el centro de Madrid", icon: <Building2 className="h-4 w-4" /> },
        { label: "Hotel Majestic Barcelona", value: "maj-bcn", description: "Elegancia en Passeig de Gràcia", icon: <Building2 className="h-4 w-4" /> },
      ]
    }
  ]

  // Handler para convertir tipos de fecha
  const handleRangeChange = (newRange: { from?: Date; to?: Date }) => {
    if (newRange.from && newRange.to) {
      setRange({ from: newRange.from, to: newRange.to });
    } else if (newRange.from) {
      setRange({ from: newRange.from, to: undefined });
    } else {
      setRange(undefined);
    }
  }

  // Contenido de cada tab
  const getTransportContent = () => (
    <div className="w-full flex flex-col gap-4 items-start">
      {/* Tipo de Transporte */}
      <StandardToggleGroup
        label="Tipo de Transporte"
        type="multiple"
        value={selectedTransportTypes}
        onValueChange={(value) => setSelectedTransportTypes(Array.isArray(value) ? value : [value])}
        options={[
          {
            value: "air",
            label: "Aéreo",
            icon: <Plane className="mr-2 h-4 w-4" />
          },
          {
            value: "land", 
            label: "Terrestre",
            icon: <Bus className="mr-2 h-4 w-4" />
          },
          {
            value: "sea",
            label: "Marítimo", 
            icon: <Ship className="mr-2 h-4 w-4" />
          }
        ]}
      />
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end w-full">
        {/* Fechas de ida y vuelta con dual trigger */}
        <DateRangePickerCustom
          value={{ from: fechaIda, to: fechaVuelta }}
          onChange={(range) => {
            setFechaIda(range.from);
            setFechaVuelta(range.to);
          }}
          showFlexibleDates={false}
          dualTrigger={true}
          dualTriggerLabels={{ from: "Fecha de ida", to: "Fecha de vuelta" }}
          hasReturnDate={true}
        />

        {/* Pasajeros */}
        <PassengerSelector
          label="Pasajeros"
          initialPassengers={passengers}
          onPassengersChange={setPassengers}
        />

        
      </div>
    </div>
  );

  const getLodgingContent = () => (
    <div className="w-full flex flex-col gap-4 items-start">
        {/* Tipo de Alojamiento */}
        <StandardToggleGroup
          label="Tipo de Alojamiento"
          type="multiple"
          value={selectedLodgingTypes}
          onValueChange={(value) => setSelectedLodgingTypes(Array.isArray(value) ? value : [value])}
          options={[
            {
              value: "hotel",
              label: "Hoteles",
              icon: <Hotel className="mr-2 h-4 w-4" />
            },
            {
              value: "house",
              label: "Casas",
              icon: <Home className="mr-2 h-4 w-4" />
            },
            {
              value: "apartment",
              label: "Apartamentos",
              icon: <Building2 className="mr-2 h-4 w-4" />
            },
            {
              value: "guest",
              label: "Casa de huéspedes",
              icon: <span className="mr-2">🛏</span>
            }
          ]}
        />

        {/* Fechas y Huéspedes */}
        <div className="flex flex-wrap gap-4 items-end w-full">
          <DateRangePickerCustom
              label="Fechas"
              value={range}
              onChange={handleRangeChange}
              showFlexibleDates={true}
              defaultActiveTab="flexible"
            />
          <GuestSelector
              label="Huéspedes"
              initialRooms={guestRooms}
              onRoomsChange={setGuestRooms}
            />
        </div>
      
    </div>
  );

  const getExperiencesContent = () => (
    <div className="flex flex-wrap gap-4 items-end w-full">
        {/* Fechas */}
          <DateRangePickerCustom
            label="Fechas"
            value={range}
            onChange={handleRangeChange}
            showFlexibleDates={false}
          />

        {/* Filtro de experiencia */}
        <QuickFilter
          label="Tipo de Experiencia"
          selected={selectedExperiences}
          setSelected={setSelectedExperiences}
          options={experiencesOptions}
        />

      
    </div>
  );

  const getItinerariesContent = () => (
    <div className="flex flex-wrap gap-4 items-end w-full">
      <DateRangePickerCustom
              label="Fechas"
              value={range}
              onChange={handleRangeChange}
              showFlexibleDates={true}
            />
        
            <GuestSelector
              label="Personas"
              initialRooms={guestRooms}
              onRoomsChange={setGuestRooms}
            />
          

        {/* Filtros rápidos */}
        <div className="flex flex-wrap gap-4 w-full">
          <QuickFilter
            label="Tipo de Alojamiento"
            options={lodgingOptions}
            selected={selectedLodgingTypes}
            setSelected={setSelectedLodgingTypes}
          />
          <QuickFilter
            label="Tipo de Transporte"
            options={[
              { label: "Aéreo", value: "air", icon: Plane },
              { label: "Marítimo", value: "sea", icon: Ship },
              { label: "Terrestre", value: "land", icon: Bus },
            ]}
            selected={selectedTransportTypes}
            setSelected={setSelectedTransportTypes}
          />
          <QuickFilter
            label="Tipo de Experiencia"
            options={experiencesOptions}
            selected={selectedExperiences}
            setSelected={setSelectedExperiences}
          />
        </div>
      
    </div>
  );

  // Definición de los tabs
  const tabItems: TabItem[] = [
    {
      value: "transport",
      label: "Transporte",
      icon: <Plane className="w-4 h-4" />,
      content: getTransportContent(),
    },
    {
      value: "lodging",
      label: "Alojamientos", 
      icon: <Hotel className="w-4 h-4" />,
      content: getLodgingContent(),
    },
    {
      value: "experiences",
      label: "Experiencias",
      icon: <Mountain className="w-4 h-4" />,
      content: getExperiencesContent(),
    },
    {
      value: "itineraries",
      label: "Itinerarios",
      icon: <Route className="w-4 h-4" />,
      content: getItinerariesContent(),
    },
  ];

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 items-end ">
      <StandardTabs
        items={tabItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobilePlaceholder="Selecciona una categoría"
      />

  <div className="flex flex-wrap gap-2 md:gap-4 w-full py-2 left-0">
       {/* Swap (desktop only) */}
              <div className="hidden md:block relative">
                <div className="absolute pt-[1px] translate-y-3/4 left-[283px]">
                  <Button
                    onClick={handleSwapLocations}
                    size="icon"
                    type="button"
                    className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              
      {/* Campo Origen */}
        <StandardSearchField
          label="Origen"
          placeholder="¿Donde empieza tu aventura?"
          value={travelingFrom}
          onValueChange={setTravelingFrom}
          dataSources={searchDataSources}
          onSelect={(option, sourceType) => {
            setTravelingFrom(option.label);
            console.log("Origen seleccionado:", option, "Tipo:", sourceType);
          }}
          showClearButton={true}
          minSearchLength={0}       
        />

        {/* Swap (mobile) */}
              <div className="md:hidden my-0 flex justify-center">

                <div className="absolute  translate-y-[-7px] left-3/4">

                <Button
                  onClick={handleSwapLocations}
                  size="icon"
                  type="button"
                  className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                </div>
              </div>
      
      {/* Campo Destino */}
        <StandardSearchField
          label="Destino"
          placeholder="¿A dónde quieres ir?"
          value={goingTo}
          onValueChange={setGoingTo}
          dataSources={searchDataSources}
          onSelect={(option, sourceType) => {
            setGoingTo(option.label);
            console.log("Destino seleccionado:", option, "Tipo:", sourceType);
          }}
          showClearButton={true}
          minSearchLength={0}
        />

   <div className="flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
     <Button 
      className="bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm"
      variant="default"
      onClick={handleBuscar}
    >
      <Search className="mr-2 h-4 w-4 text-primary-foreground" />
      Buscar Opciones de Viaje
    </Button>
   </div>
</div>
    
  
    </div>
  );
}
