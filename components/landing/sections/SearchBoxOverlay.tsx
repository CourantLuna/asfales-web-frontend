"use client"
import { FormMessage } from "@/components/ui/form";
import "../../../styles/landingStyles.css";
import { Button } from "@/components/ui/button"
import { Search, ArrowLeftRight, ArrowUpDown, MapPin  } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchBoxOverlay({ onSearch }: { onSearch?: (origin: string, destination: string) => void }) {

 

const [swapAnimating, setSwapAnimating] = useState(false);

function handleSwap() {
  setSwapAnimating(true);
  const temp = origin;
  setValue("origin", destination);
  setValue("destination", temp);
  setTimeout(() => setSwapAnimating(false), 200);
}


const {
  register,
  setValue,
  watch,
    handleSubmit, // <--- AGREGAR AQUÍ
  formState: { errors, isValid, touchedFields, dirtyFields }
} = useForm<{ origin: string; destination: string }>({
  mode: "onChange",
  defaultValues: { origin: "", destination: "" },
});

const origin = watch("origin");
const destination = watch("destination");

  return (
    <form onSubmit={handleSubmit((data) => onSearch?.(data.origin, data.destination))}>

    <div
      className="relative
    min-h-[calc(100vh+330px)] 
    md:min-h-[calc(100vh+330px)] 
    lg:min-h-[calc(100vh+250px)] w-full z-20 pointer-events-none "
    >
      {/* BLOQUE STICKY: solo los campos */}
      <div
        className="sticky 
      top-[calc(68vh+((100vh-900px)*0.316))]  
      lg:top-[calc(86vh+((100vh-1000px)*0.1))]
      w-full flex flex-col items-center justify-end"
      >
        <div className="flex flex-row items-center justify-center">
          <div
            className="flex flex-col lg:flex-row items-center justify-center gap-y-4 lg:gap-y-0 lg:gap-x-6 w-full max-w-7xl
          mb-0"
          >
<div className="pointer-events-auto hide-scrollbar flex flex-col md:flex-col lg:flex-row items-center justify-center gap-y-2 md:gap-y-2 lg:gap-y-0 lg:gap-x-4 overflow-y-auto max-h-[250px] px-2">
              {/* Origen */}
              <div className={`flex flex-row items-center justify-center gap-x-4 bg-white rounded-lg px-2 py-2 w-[280px] transition-transform duration-300 ${swapAnimating ? "animate-swap" : ""}`}>
                <Search className=" items-center justify-center h-4 w-4 text-muted-foreground" />
                <div className=" flex flex-col items-start">
                  <label htmlFor="origen" className="text-start text-gray-800 text-xs mb-0">
  Origen
</label>
<TooltipProvider>
<Tooltip open={!!errors.destination && touchedFields.destination && !dirtyFields.destination}>
    <TooltipTrigger asChild>
      <input
        id="origen"
        type="text"
        placeholder="República Dominicana (DO)"
        className="w-full outline-none text-gray-800"
        value={origin}
        {...register("origin", { required: true })}
        onChange={(e) => setValue("origin", e.target.value)}
      />
    </TooltipTrigger>
    <TooltipContent 
      className="bg-destructive text-destructive-foreground border border-destructive font-semibold px-3 py-2 rounded-md shadow-lg"
      align="start"
    side="top"
    alignOffset={-4}
    sideOffset={20}
    >
      El origen es obligatorio
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                </div>
              </div>

              {/* Swap (desktop only) */}
              <div className="hidden lg:block relative">
                <div className="absolute pt-0 -translate-y-1/2 left-[-20px]">
                  <Button
                    onClick={handleSwap}
                    size="icon"
                     type="button"
                    className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10 shadow-lg"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Swap (mobile) */}
              <div className="lg:hidden my-0 flex justify-center">
                <Button
                  onClick={handleSwap}
                  size="icon"
                   type="button"
                  className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10 shadow-lg"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Destino */}
              <div className={`flex flex-row items-center justify-center gap-x-4 bg-white rounded-lg px-2 py-2 w-[280px] transition-transform duration-300 ${swapAnimating ? "animate-swap" : ""}`}>
                <MapPin className="items-center justify-center h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col items-start">
                  <label htmlFor="destino" className="text-start text-gray-800 text-xs mb-0">
  Destino
</label>

                  <TooltipProvider>
<Tooltip open={!!errors.destination && touchedFields.destination && !dirtyFields.destination}>
    <TooltipTrigger asChild>
      <input
        id="destino"
        type="text"
        placeholder="País, ciudad o aeropuerto"
        className="w-full outline-none text-gray-800"
        value={destination}
        {...register("destination", { required: true })}
        onChange={(e) => setValue("destination", e.target.value)}
      />
    </TooltipTrigger>
    <TooltipContent
    side="top"
  className="bg-destructive text-destructive-foreground border border-destructive font-semibold px-3 py-2 rounded-md shadow-lg"
  align="start"
  alignOffset={-4}
  sideOffset={20}
>

      El destino es obligatorio
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                </div>
              </div>
            </div>

            {/* ESPACIADOR FALSO */}
            <div className="w-[280px] h-10" />
          </div>

          <div className="hidden lg:block min-h-[200px]"></div>
        </div>
      </div>

      {/* BOTÓN NORMAL (flujo del documento, sin fixed/sticky) */}
      <div
        className="relative z-[19] h-[76px] mt-0 
  top-[calc(63vh+((100vh-876px)*0.38))] 
  lg:top-[calc(68vh+((100vh-900px)*0.283))] 
  flex items-end justify-center lg:gap-x-6"
      >
        {/* Botón de busqueda */}
        <Button
  type="submit"
  className="z-[19] rounded-full pointer-events-auto rounded-lg bg-[#FFA500] text-white px-6 py-3 w-[280px] h-[48px] lg:ml-[624px] mt-[30px]"
>
  <Search className="mr-2 h-4 w-4" />
  Buscar Opciones de Viaje
</Button>


      </div>
    </div>
    </form>
  );
}
