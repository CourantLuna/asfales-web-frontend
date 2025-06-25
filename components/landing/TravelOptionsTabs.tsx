"use client"

import { useState } from "react"
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
import { Combobox } from "@/components/ui/combobox" // Debes crear este wrapper según la doc oficial
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import React from "react"

export default function TravelOptionsTabs() {
  const [tab, setTab] = useState("transporte")
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
    { label: "Transporte", value: "transporte", icon: Plane },
    { label: "Alojamientos", value: "alojamientos", icon: Hotel },
    { label: "Itinerarios", value: "itinerarios", icon: Mountain },
    { label: "Experiencias", value: "experiencias", icon: Route },
  ]

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full items-center flex flex-col"
      >
        {/* Combobox solo en móviles */}
        <div className="block w-[240px] md:hidden">
          <Combobox
            options={tabOptions}
            value={tab}
            onChange={setTab}
            placeholder="Selecciona una categoría"
          />
        </div>

        {/* TabsTrigger solo en desktop */}
        <TabsList className="hidden md:flex w-full justify-center gap-2 mb-2">
          {tabOptions.map(({ label, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className=" flex-1 justify-center border-b-2 border-transparent 
             data-[state=active]:border-primary 
             data-[state=active]:text-foreground 
             text-muted-foreground font-medium px-4 py-2 transition-colors"
            >
              {React.createElement(
                tabOptions.find((option) => option.value === value)!.icon,
                {
                  className: "mr-2 w-4 h-4",
                }
              )}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

         <TabsContent value="transporte">
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
            <DateRangePicker date={range} setDate={setRange} />
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
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}>
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  </div>
</TabsContent>

<TabsContent value="alojamientos">
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
            <DateRangePicker date={range} setDate={setRange} />
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
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}>
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  </div>
</TabsContent>

<TabsContent value="itinerarios">
  <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
    <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
      {/* Fechas y Personas */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
          <label className="text-sm font-medium">Fechas</label>
          <div className="relative w-full">
            <DateRangePicker date={range} setDate={setRange} />
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
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3" variant={"default"}>
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  </div>
</TabsContent>

<TabsContent value="experiencias">
  <div className="flex flex-col md:flex-row w-full gap-4 items-end mt-2">
    <div className="w-full md:w-[80%] flex flex-wrap gap-4 items-end">
      {/* Fechas */}
      <div className="flex flex-col items-start gap-2 w-full md:w-[280px]">
        <label className="text-sm font-medium">Fechas</label>
        <div className="relative w-full">
          <DateRangePicker date={range} setDate={setRange} />
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
      <Button className="bg-primary  w-full md:w-[280px] h-[48px] px-6 py-3 " variant={"default"}>
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  </div>
</TabsContent>


      </Tabs>
    </div>
  );
}
