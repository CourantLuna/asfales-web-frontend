"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, Plane, Bus, Ship, Filter, Hotel, Home, Building2, Clock, CheckCircle,
Mountain as MountainIcon,
  TentTree as TentTreeIcon,
  Footprints as FootprintsIcon,
  Landmark as LandmarkIcon,
  Sun as SunIcon,
  UtensilsCrossed as UtensilsIcon,
  Music2 as MusicIcon,
  Laugh as LaughIcon, } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox" // Debes crear este wrapper según la doc oficial
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"

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
    { label: "Transporte", value: "transporte" },
    { label: "Alojamientos", value: "alojamientos" },
    { label: "Itinerarios", value: "itinerarios" },
    { label: "Experiencias", value: "experiencias" },
  ]

  return (
  <div className="w-full max-w-8xl bg-white rounded-lg shadow-md p-6">
  <Tabs value={tab} onValueChange={setTab} className="w-full items-center flex flex-col">
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
     <TabsList className="hidden md:flex w-full border-b border-border">
  {tabOptions.map(({ label, value }) => (
   <TabsTrigger
  key={value}
  value={value}
  className="flex-1 justify-center border-b-2 border-transparent 
             data-[state=active]:border-[#0057A3] 
             data-[state=active]:text-foreground 
             text-muted-foreground font-medium px-4 py-2 transition-colors"
>
  {label}
</TabsTrigger>

  ))}
</TabsList>


      <TabsContent value="transporte">
        <div className="mt-8 flex flex-col items-center justify-center gap-6">
          {/* ToggleGroup solo en desktop */}
          <ToggleGroup
            type="multiple"
            defaultValue="air"
            className="gap-2 flex"
          >
            <ToggleGroupItem value="air" aria-label="Aéreo" className="px-4 py-2 flex-1">
              <Plane className="mr-2 h-4 w-4" />
              Aéreo
            </ToggleGroupItem>
            <ToggleGroupItem value="land" aria-label="Terrestre" className="px-4 py-2 flex-1">
              <Bus className="mr-2 h-4 w-4" />
              Terrestre
            </ToggleGroupItem>
            <ToggleGroupItem value="sea" aria-label="Marítimo" className="px-4 py-2 flex-1">
              <Ship className="mr-2 h-4 w-4" />
              Marítimo
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm font-medium">Fechas</label>
              <div className="relative w-[280px]">
                <DateRangePicker date={range} setDate={setRange} />
                {/* <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />*/}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm font-medium">Pasajeros</label>
              <div className="relative w-[280px]">
                <Input defaultValue="1 adulto" className="pl-10" />
                <UsersIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button className="mt-2 bg-[#0057A3] w-[300px] h-[48px] px-6 py-3 text-white hover:bg-primary/90">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar Filtros 
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="alojamientos">
  <div className="mt-8 flex flex-col items-center justify-center gap-6">
    <ToggleGroup type="multiple" className="gap-2 flex flex-wrap justify-center">
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

    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm font-medium">Fechas</label>
        <div className="relative w-[280px]">
                <DateRangePicker date={range} setDate={setRange} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm font-medium">Huéspedes</label>
        <div className="relative w-[280px]">
          <Input defaultValue="2 adultos, 1 habitación" className="pl-10" />
          <UsersIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>

    <Button className="mt-2 bg-[#0057A3] w-[300px] h-[48px] px-6 py-3 text-white hover:bg-primary/90">
      <Filter className="mr-2 h-4 w-4" />
      Aplicar Filtros
    </Button>
  </div>
</TabsContent>


      <TabsContent value="itinerarios">
  <div className="mt-8 flex flex-col items-center justify-center gap-6">
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm font-medium">Fechas</label>
        <div className="relative w-[280px]">
      <DateRangePicker date={range} setDate={setRange} />
        </div>
        
      </div>
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm font-medium">Personas</label>
        <div className="relative w-[280px]">
          <Input defaultValue="3 adultos, 1 habitación" className="pl-10" />
          <UsersIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>

<div className="flex flex-col md:flex-row gap-4 w-full items-center">
      <div className="flex flex-wrap justify-center gap-2 border border-dashed px-4 py-2 rounded-md">
 <QuickFilter
    label="Tipo de Alojamiento"
    options={lodgingOptions}
    selected={selectedLodgingTypes}
    setSelected={setSelectedLodgingTypes}
  />
      </div>

      <div className="flex flex-wrap justify-center gap-2 border border-dashed px-4 py-2 rounded-md">
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
      </div>

      <div className="flex flex-wrap justify-center gap-2 border border-dashed px-4 py-2 rounded-md">
       <QuickFilter
  label="Tipo de Experiencia"
  selected={selectedExperiences}
  setSelected={setSelectedExperiences}
  options={experiencesOptions}
/>

      </div>
    </div>

    <Button className="mt-2 bg-[#0057A3] w-[300px] h-[48px] px-6 py-3 text-white hover:bg-primary/90">
      <Filter className="mr-2 h-4 w-4" />
      Aplicar Filtros
    </Button>
  </div>
</TabsContent>


      <TabsContent value="experiencias">
  <div className="mt-8 flex flex-col items-center justify-center gap-6">
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm font-medium">Fechas</label>
        <div className="relative w-[280px]">
          <DateRangePicker date={range} setDate={setRange} />
        </div>
      </div>
    </div>

    <div className="flex flex-wrap justify-center gap-2 border border-dashed px-4 py-2 rounded-md">
      <QuickFilter
  label="Tipo de Experiencia"
  selected={selectedExperiences}
  setSelected={setSelectedExperiences}
  options={experiencesOptions}
/>

    </div>

    <Button className="mt-2 bg-[#0057A3] w-[300px] h-[48px] px-6 py-3 text-white hover:bg-primary/90">
      <Filter className="mr-2 h-4 w-4" />
      Aplicar Filtros
    </Button>
  </div>
</TabsContent>

    </Tabs>
      </div>

  )
}
