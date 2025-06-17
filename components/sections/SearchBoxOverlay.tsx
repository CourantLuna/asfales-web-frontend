"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowLeftRight, ArrowUpDown } from "lucide-react"

export default function SearchBoxOverlay() {


  return (
    <div className="relative min-h-[calc(100vh+40vh)] md:min-h-[calc(100vh+25vh)] w-full z-30 pointer-events-auto">
      
      {/* BLOQUE STICKY: solo los campos */}
      <div className="sticky 
        top-[calc(65vh+((100vh-900px)*0.4))]  
      lg:top-[calc(90vh+((100vh-1000px)*0.02))]
      w-full flex flex-col items-center justify-end">

        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-4 lg:gap-y-0 lg:gap-x-6 w-full max-w-7xl
        mb-0 md:mb-20">
          
          <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-y-2 md:gap-y-2 lg:gap-y-0 lg:gap-x-4 overflow-y-auto max-h-[250px] px-2">
            
            {/* Origen */}
            <div className="flex flex-col items-center justify-center">
              <label className="text-white text-sm font-medium mb-2">Origen</label>
              <div className="bg-white rounded-lg px-4 py-3 w-[280px]">
                <input
                  type="text"
                  placeholder="República Dominicana (DO)"
                  className="w-full outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Swap (desktop only) */}
            <div className="hidden lg:block relative">
              <div className="absolute pt-7 -translate-y-1/2 left-[-20px]">
                <Button
                  size="icon"
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 shadow-lg"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Swap (mobile) */}
            <div className="lg:hidden my-0 flex justify-center">
              <Button
                size="icon"
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 shadow-lg"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Destino */}
            <div className="flex flex-col items-center justify-center">
              <label className="text-white text-sm font-medium mb-2">Destino</label>
              <div className="bg-white rounded-lg px-4 py-3 w-[280px]">
                <input
                  type="text"
                  placeholder="País, ciudad o aeropuerto"
                  className="w-full outline-none text-gray-800"
                />
              </div>
            </div>
          </div>

           {/* ESPACIADOR FALSO */}
      <div className="w-[280px] h-10" />


        </div>
      </div>

    {/* BOTÓN NORMAL (flujo del documento, sin fixed/sticky) */}
   <div className="relative w-full h-[76px] mt-0 lg:h-[80px] lg:mt-4 
  top-[calc(60vh+((100vh-876px)*0.4))] 
  md:top-[calc(50vh+((100vh-876px)*0.5))]
  lg:top-[calc(72vh+((100vh-900px)*0.2))] 
  flex items-center justify-center lg:gap-x-6">


  {/* Espaciador falso: solo visible en lg+ */}
  <div className="hidden lg:block w-[592px] h-[76px] bg-transparent" />

  {/* Botón */}
  <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 w-[280px] h-[48px]">
    <Search className="mr-2 h-4 w-4" />
    Ver Opciones de Viaje
  </Button>
</div>


  </div>
  )
}
