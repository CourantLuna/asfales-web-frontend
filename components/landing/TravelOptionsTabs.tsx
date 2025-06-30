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
  Route, } from "lucide-react"
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter"
import { GuestSelector, Room } from "@/components/shared/GuestSelector"
import { DateRange } from "react-day-picker"
import { DateRangePickerCustom } from "@/components/ui/date-range-picker-custom"
import { PassengerSelector, PassengerGroup } from "@/components/shared/PassengerSelector"
import { StandardTabs, TabItem } from "@/components/shared/StandardTabs"
import React from "react"

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
    <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
      {/* Filtros */}
      <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
        {/* ToggleGroup */}
        <ToggleGroup
          type="multiple"
          defaultValue={["air"]}
          className="gap-2 flex flex-wrap"
        >
          <ToggleGroupItem value="air" aria-label="Aéreo" className="px-4 py-2">
            <Plane className="mr-2 h-4 w-4" />
            Aéreo
          </ToggleGroupItem>
          <ToggleGroupItem value="land" aria-label="Terrestre" className="px-4 py-2">
            <Bus className="mr-2 h-4 w-4" />
            Terrestre
          </ToggleGroupItem>
          <ToggleGroupItem value="sea" aria-label="Marítimo" className="px-4 py-2">
            <Ship className="mr-2 h-4 w-4" />
            Marítimo
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Fechas y Pasajeros */}
        <div className="flex flex-col md:flex-row gap-4 items-end w-full">
          {/* Fechas de ida y vuelta con dual trigger */}
          <DateRangePickerCustom
            value={{ 
              from: fechaIda, 
              to: fechaVuelta 
            }}
            onChange={(range) => {
              setFechaIda(range.from);
              setFechaVuelta(range.to);
            }}
            showFlexibleDates={false}
            dualTrigger={true}
            dualTriggerLabels={{
              from: "Fecha de ida",
              to: "Fecha de vuelta"
            }}
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

      {/* Botón */}
      <div className="w-full md:w-[20%] flex justify-end">
        <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}
          onClick={handleBuscar}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar Opciones de Viaje
        </Button>
      </div>
    </div>
  );

  const getLodgingContent = () => (
    <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
      <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
        {/* ToggleGroup */}
        <ToggleGroup type="multiple" className="gap-2 flex flex-wrap">
          <ToggleGroupItem value="hotel" className="px-4 py-2">
            <Hotel className="mr-2 h-4 w-4" />
            Hoteles
          </ToggleGroupItem>
          <ToggleGroupItem value="house" className="px-4 py-2">
            <Home className="mr-2 h-4 w-4" />
            Casas
          </ToggleGroupItem>
          <ToggleGroupItem value="apartment" className="px-4 py-2">
            <Building2 className="mr-2 h-4 w-4" />
            Apartamentos
          </ToggleGroupItem>
          <ToggleGroupItem value="guest" className="px-4 py-2">
            🛏 Casa de huéspedes
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Fechas y Huéspedes */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
            <DateRangePickerCustom
              label="Fechas"
              value={range}
              onChange={handleRangeChange}
              showFlexibleDates={true}
              defaultActiveTab="flexible"
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
            <GuestSelector
              label="Huéspedes"
              initialRooms={guestRooms}
              onRoomsChange={setGuestRooms}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[20%] flex justify-end">
        <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}
          onClick={handleBuscar}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
    </div>
  );

  const getExperiencesContent = () => (
    <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
      <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
        {/* Fechas */}
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <DateRangePickerCustom
            label="Fechas"
            value={range}
            onChange={handleRangeChange}
            showFlexibleDates={false}
          />
        </div>

        {/* Filtro de experiencia */}
        <QuickFilter
          label="Tipo de Experiencia"
          selected={selectedExperiences}
          setSelected={setSelectedExperiences}
          options={experiencesOptions}
        />
      </div>

      <div className="w-full md:w-[20%] flex justify-end">
        <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3 " variant={"default"}
          onClick={handleBuscar}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
    </div>
  );

  const getItinerariesContent = () => (
    <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
      <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
        {/* Fechas y Personas */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
            <DateRangePickerCustom
              label="Fechas"
              value={range}
              onChange={handleRangeChange}
              showFlexibleDates={true}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
            <GuestSelector
              label="Personas"
              initialRooms={guestRooms}
              onRoomsChange={setGuestRooms}
            />
          </div>
        </div>

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

      <div className="w-full md:w-[20%] flex justify-end">
        <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}
          onClick={handleBuscar}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
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
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 pt-[240px] lg:pt-[100px]">
      <StandardTabs
        items={tabItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobilePlaceholder="Selecciona una categoría"
      />
    </div>
  );
}
