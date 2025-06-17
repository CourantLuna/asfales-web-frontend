"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, Plane, Bus, Ship } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox" // Debes crear este wrapper según la doc oficial

export default function TravelOptionsTabs() {
  const [tab, setTab] = useState("transporte")

  const tabOptions = [
    { label: "Transporte", value: "transporte" },
    { label: "Alojamientos", value: "alojamientos" },
    { label: "Itinerarios", value: "itinerarios" },
    { label: "Experiencias", value: "experiencias" },
  ]

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full max-w-8xl items-center flex flex-col">
      {/* Combobox solo en móviles */}
      <div className="block w-[240px]  md:hidden mb-4 ">
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
                <Input type="date" className="pl-10 " />
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

          <Button className="mt-2 bg-primary text-white hover:bg-primary/90">
            Buscar ahora
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="alojamientos">
        <div className="mt-8 text-center text-muted-foreground">
          <p>Contenido de alojamiento próximamente.</p>
        </div>
      </TabsContent>

      <TabsContent value="itinerarios">
        <div className="mt-8 text-center text-muted-foreground">
          <p>Aquí puedes construir itinerarios personalizados.</p>
        </div>
      </TabsContent>

      <TabsContent value="experiencias">
        <div className="mt-8 text-center text-muted-foreground">
          <p>Explora tours, actividades y eventos inolvidables.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
