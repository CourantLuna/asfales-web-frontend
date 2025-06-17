"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, Plane, Bus, Ship } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function TravelOptionsTabs() {
  return (
    <Tabs defaultValue="transporte" className="w-full max-w-4xl">
      <TabsList className="w-full grid grid-cols-4 bg-muted">
        <TabsTrigger value="transporte">Transporte</TabsTrigger>
        <TabsTrigger value="alojamientos">Alojamientos</TabsTrigger>
        <TabsTrigger value="itinerarios">Itinerarios</TabsTrigger>
        <TabsTrigger value="experiencias">Experiencias</TabsTrigger>
      </TabsList>

      <TabsContent value="transporte">
        <div className="mt-8 flex flex-col items-center justify-center gap-6">
          {/* Subopciones de transporte */}
           <ToggleGroup type="multiple" defaultValue="air" className="gap-2">
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

          {/* Filtros básicos */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm font-medium">Fechas</label>
              <div className="relative">
                <Input type="date" className="pl-10" />
                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="text-sm font-medium">Pasajeros</label>
              <div className="relative">
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
