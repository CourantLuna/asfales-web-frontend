"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Search, UsersIcon, Plane, Bus, Ship, Filter, Hotel, Home, Building2,
Mountain as MountainIcon,
  TentTree as TentTreeIcon,
  Footprints as FootprintsIcon,
  Landmark as LandmarkIcon,
  Sun as SunIcon,
  UtensilsCrossed as UtensilsIcon,
  Music2 as MusicIcon,
  Laugh as LaughIcon,
  Mountain,
  RouteIcon,
  Route, } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Combobox, Option } from "@/components/ui/combobox" // Debes crear este wrapper según la doc oficial
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter"
import { DateRange } from "react-day-picker"
import  DateRangePicker  from "@/components/ui/date-range-picker"
import React from "react"
import { se } from "date-fns/locale";

export default function TravelOptionsTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
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
  router.push(`/global-${activeTab}-search`);
}

useEffect(() => {
  const match = pathname.match(`/^\\/global-(.*)-search$/`);
  if (match) {
    setActiveTab(match[1]);
  }
}, [pathname]);


const[selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>(["air"])
const [selectedLodgingTypes, setSelectedLodgingTypes] = useState<string[]>(["hotel"])
const [selectedExperiences, setSelectedExperiences] = useState<string[]>(["playa"])
const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  })

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

   const tabOptions = [
      { label: "Transporte", value: "transporte", icon: <Plane className="w-4 h-4" /> },
      { label: "Alojamientos", value: "alojamientos", icon: <Hotel className="w-4 h-4" /> },
      { label: "Actividades", value: "experiencias", icon: <Mountain className="w-4 h-4" /> },
      { label: "Itinerarios", value: "itinerarios", icon: <Route className="w-4 h-4" /> },
    ];

      const classNameTabs = `flex-1 justify-center border-b-2 border-transparent  bg-transparent
             data-[state=active]:border-primary 
             data-[state=active]:text-primary 
             text-muted-foreground font-medium px-4 py-2 transition-colors`;

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full items-center flex flex-col bg-transparent"
      >
        {/* Combobox solo en móviles */}
        <div className="block w-[240px] md:hidden">
          <Combobox
            options={tabOptions}
            value={activeTab}
            onChange={handleTabChange}
            placeholder="Selecciona una categoría"
          />
        </div>

        {/* TabsTrigger solo en desktop */}
       <TabsList className="hidden md:flex w-full justify-center mb-6 py-4 bg-transparent border-b-2">
          <TabsTrigger value="transport" className={classNameTabs}>
            <Plane className="mr-2 w-4 h-4" /> Transporte
          </TabsTrigger>
          <TabsTrigger value="lodging" className={classNameTabs}>
            <Hotel className="mr-2 w-4 h-4" /> Alojamientos
          </TabsTrigger>
          <TabsTrigger value="experiences" className={classNameTabs}>
            <Mountain className="mr-2 w-4 h-4" /> Experiencias
          </TabsTrigger>
          <TabsTrigger value="itineraries" className={classNameTabs}>
            <Route className="mr-2 w-4 h-4" /> Itinerarios
          </TabsTrigger>
        </TabsList>

         {/* Panels siempre montados, solo el activo es visible */}
  <div className="relative w-full">
    {/* Panel Transporte */}
    <div style={{ display: activeTab === "transport" ? "block" : "none" }}>
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
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        {/* Fechas */}
       <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Fechas</label>
          <div className="relative w-full">
            <DateRangePicker />
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Pasajeros</label>
          <div className="relative w-full">
            <Input
              defaultValue="1 adulto"
              className="pl-10 w-full"
            />
            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>

    {/* Botón */}
    <div className="w-full md:w-[20%] flex justify-end">
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}
        onClick={handleBuscar}

      >
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  </div>
      </div>

    {/* Panel Alojamientos */}
    <div style={{ display: activeTab === "lodging" ? "block" : "none" }}>
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
          <label className="text-sm font-medium">Fechas</label>
          <div className="relative w-full">
            <DateRangePicker />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Huéspedes</label>
          <div className="relative w-full">
            <Input
              defaultValue="2 adultos, 1 habitación"
              className="pl-10 w-full"
            />
            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
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
    </div>

    {/* Panel Experiencias */}
    <div style={{ display: activeTab === "experiences" ? "block" : "none" }}>
      <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
    <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
      {/* Fechas */}
      <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
        <label className="text-sm font-medium">Fechas</label>
        <div className="relative w-full">
          <DateRangePicker />
        </div>
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
    </div>

    {/* Panel Itinerarios */}
    <div style={{ display: activeTab === "itineraries" ? "block" : "none" }}>
<div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
    <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
      {/* Fechas y Personas */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Fechas</label>
          <div className="relative w-full">
            <DateRangePicker  />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Personas</label>
          <div className="relative w-full">
            <Input
              defaultValue="3 adultos, 1 habitación"
              className="pl-10 w-full"
            />
            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
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
      </div>
  </div>

      </Tabs>
    </div>
  );
}
