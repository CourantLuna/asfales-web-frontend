"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowLeftRight, ArrowUpDown, MapPin  } from "lucide-react"

export default function SearchBoxOverlay() {


  return (
    <div className="relative min-h-[calc(100vh+40vh)] lg:min-h-[calc(100vh+30vh)] w-full z-20 pointer-events-auto ">
   
      {/* BLOQUE STICKY: solo los campos */}
      <div className="sticky 
        top-[calc(68vh+((100vh-900px)*0.316))]  
      lg:top-[calc(90vh+((100vh-1000px)*0.1))]
      w-full flex flex-col items-center justify-end">

        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-4 lg:gap-y-0 lg:gap-x-6 w-full max-w-7xl
        mb-0 md:mb-20">
          
          <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-y-2 md:gap-y-2 lg:gap-y-0 lg:gap-x-4 overflow-y-auto max-h-[250px] px-2 ">
            
            {/* Origen */}
            <div className="flex flex-row items-center justify-center gap-x-4  bg-white rounded-lg px-2 py-2 w-[280px]">
              <Search className=" items-center justify-center h-4 w-4 text-muted-foreground" />
              <div className=" flex flex-col items-start">
                <label className="text-start text-gray-800 text-xs mb-0">Origen</label>
                <input
                  type="text"
                  placeholder="República Dominicana (DO)"
                  className="w-full outline-none text-gray-800 "
                />
              </div>
            </div>

            {/* Swap (desktop only) */}
            <div className="hidden lg:block relative">
              <div className="absolute pt-0 -translate-y-1/2 left-[-20px]">
                <Button
                  size="icon"
                  className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10 shadow-lg"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Swap (mobile) */}
            <div className="lg:hidden my-0 flex justify-center">
              <Button
                size="icon"
                className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10 shadow-lg"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Destino */}
<div className="flex flex-row items-center justify-center gap-x-4 bg-white rounded-lg px-2 py-2 w-[280px]">
  <MapPin className="items-center justify-center h-4 w-4 text-muted-foreground" />
  <div className="flex flex-col items-start">
    <label className="text-start text-gray-800 text-xs mb-0">Destino</label>
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
  top-[calc(63vh+((100vh-876px)*0.38))] 
  md:top-[calc(53vh+((100vh-876px)*0.45))]
  lg:top-[calc(71vh+((100vh-900px)*0.283))] 
  flex items-center justify-center lg:gap-x-6">


  {/* Espaciador falso: solo visible en lg+ */}
  <div className="hidden lg:block w-[592px] h-[76px] bg-transparent" />

  {/* Botón */}
  <Button className="rounded-lg bg-[#FFA500] text-white px-6 py-3 w-[280px] h-[48px]">
    <Search className="mr-2 h-4 w-4" />
    Ver Opciones de Viaje
  </Button>
</div>


  </div>
  )
}
