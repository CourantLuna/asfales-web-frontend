"use client"
import "../../../styles/landingStyles.css";
import { Button } from "@/components/ui/button"
import { Search, ArrowLeftRight, ArrowUpDown, MapPin  } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StandardSearchField, StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { useStickyBoundary } from "@/hooks/useStickyBoundary";

export default function SearchBoxOverlay({ 
  onSearch,
  dataSources = [],
  originValue,
  onOriginValueChange,
  destinationValue,
  onDestinationValueChange,
  activeTab = "transport",
  onScrollToResults
}: { 
  onSearch?: (origin: string, destination: string) => void;
  dataSources?: StandardSearchDataSource[];
  originValue?: string;
  onOriginValueChange?: (value: string) => void;
  destinationValue?: string;
  onDestinationValueChange?: (value: string) => void;
  activeTab?: string;
  onScrollToResults?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Hook personalizado para detectar sticky boundary
  const { containerRef, stickyRef, isAtBottom: isStickyAtBottom } = useStickyBoundary({ 
    threshold: 10, 
    debug: process.env.NODE_ENV === 'development' // Solo debug en desarrollo
  });

   // Detectar si es LG hacia abajo
  const [isLgDown, setIsLgDown] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLgDown(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [swapAnimating, setSwapAnimating] = useState(false);

  function handleSwap() {
    setSwapAnimating(true);
    const temp = origin;
    setValue("origin", destination);
    setValue("destination", temp);
    
    // Notificar al padre sobre el intercambio
    if (onOriginValueChange && destination !== originValue) {
      onOriginValueChange(destination);
    }
    if (onDestinationValueChange && temp !== destinationValue) {
      onDestinationValueChange(temp);
    }
    
    setTimeout(() => setSwapAnimating(false), 200);
  }

function handleBuscar() {
    // Acción para LG hacia abajo
    if (isLgDown) {
      if (onScrollToResults) {
      onScrollToResults();
    }
      // Aquí tu acción especial para mobile/tablet
      // alert("Acción especial para LG hacia abajo");
      return;
    }
    // Acción normal para LG hacia arriba
    if (onSearch) {
      onSearch(origin, destination);
    }
    if (onScrollToResults) {
      onScrollToResults();
    }
    router.push(`/global-${activeTab}-search`);
  }


const {
  register,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isValid, touchedFields, dirtyFields }
} = useForm<{ origin: string; destination: string }>({
  mode: "onChange",
  defaultValues: { 
    origin: originValue || "", 
    destination: destinationValue || "" 
  },
});

const origin = watch("origin");
const destination = watch("destination");

// SOLO sincronizar desde props hacia el formulario (evitar bucles)
useEffect(() => {
  if (originValue !== undefined && originValue !== origin) {
    setValue("origin", originValue, { shouldValidate: false });
  }
}, [originValue]);

useEffect(() => {
  if (destinationValue !== undefined && destinationValue !== destination) {
    setValue("destination", destinationValue, { shouldValidate: false });
  }
}, [destinationValue]);

  return (
    <form onSubmit={handleSubmit((data) => {
      handleBuscar();
    })}>

    <div
      ref={containerRef}
      className="relative
    min-h-[calc(100vh+90px)] 
    md:min-h-[calc(100vh+120px)] 
    2xl:min-h-[calc(100vh+190px)] w-full z-20 pointer-events-none "
    >
      {/* BLOQUE STICKY: solo los campos */}
      {/* La clase 'sticky-at-bottom' se añade automáticamente cuando el elemento sticky 
          llega al límite inferior de su contenedor. Puedes personalizar los estilos 
          en landingStyles.css para cambiar la apariencia en este estado. */}
      <div
        ref={stickyRef}
        className={`sticky 
      top-[calc(66vh+((100vh-900px)*0.316))]  
      2xl:top-[calc(84vh+((100vh-1000px)*0.1))]
      w-full flex flex-col items-center justify-end transition-all duration-300 ${
        isStickyAtBottom ? 'sticky-at-bottom opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      >
        <div className="flex flex-row items-center justify-center w-full max-w-7xl">
          <div className="flex flex-col 2xl:flex-row items-center gap-y-4 2xl:gap-y-0 2xl:gap-x-6 w-full max-w-7xl mb-0 transition-all duration-300 justify-center">
            <div className= {`${isStickyAtBottom ? "pointer-events-none" : "pointer-events-auto"} hide-scrollbar flex flex-col md:flex-col 2xl:flex-row items-center justify-center gap-y-2 md:gap-y-2 2xl:gap-y-0 2xl:gap-x-2 overflow-y-auto max-h-[250px] px-2`}>
              {/* Origen */}
              <div className={`transition-all duration-300 ${swapAnimating ? "animate-swap" : ""}`}>
                <StandardSearchField
                  variant="compact"
                  containerClassName="w-[280px]"
                  label="Origen"
                  placeholder="¿A donde?"
                  value={origin}
                  onValueChange={(value) => {
                    setValue("origin", value, { shouldValidate: false });
                    // Notificar al padre solo cuando el usuario cambia algo
                    if (onOriginValueChange && value !== originValue) {
                      onOriginValueChange(value);
                    }
                  }}
                  dataSources={dataSources}
                  onSelect={(option, sourceType) => {
  // StandardSearchField ya maneja el valor correctamente via onValueChange
  console.log('🎯 SearchBoxOverlay - Origin selected:', {
    label: option.label,
    value: option.value,
    sourceType
  });
}}
                  showClearButton={true}
                  minSearchLength={0}
                  fieldIcon={<Search className="h-5 w-5 text-primary" />}
                  
                />
              </div>

              {/* Swap (desktop only) */}
              <div className="hidden 2xl:block relative">
                <div className="absolute pt-0 left-[-20px] -translate-y-1/2">
                  <Button
                    onClick={handleSwap}
                    size="icon"
                    type="button"
                    className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Swap (mobile) */}
              <div className="2xl:hidden my-0 flex justify-center">
                <Button
                  onClick={handleSwap}
                  size="icon"
                  type="button"
                  className="rounded-full bg-[#FFA500] hover:bg-[#FFA500] text-white w-10 h-10"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Destino */}
              <div className={`transition-all duration-300 ${swapAnimating ? "animate-swap" : ""}`}>
                <StandardSearchField
                                  variant="compact"
                         containerClassName="w-[280px]"
                         label={"Destino"}
                         placeholder={"¿Hacia donde?"}
                         value={destination}
                         onValueChange={(value) => {
                           setValue("destination", value, { shouldValidate: false });
                           // Notificar al padre solo cuando el usuario cambia algo
                           if (onDestinationValueChange && value !== destinationValue) {
                             onDestinationValueChange(value);
                           }
                         }}
                         dataSources={dataSources}
                         onSelect={(option, sourceType) => {
                           // StandardSearchField ya maneja el valor correctamente via onValueChange
                           // El value se almacena, el label se muestra
                           console.log("🎯 TravelOptionsTabs - Destino seleccionado:", {
                             label: option.label,
                             value: option.value,
                             sourceType
                           });
                         }}
                         showClearButton={true}
                         minSearchLength={0}
                         disabled={false}
                       />
              </div>
            </div>

            {/* ESPACIADOR FALSO */}
            <div className="w-[280px] h-10" />
          </div>

          <div className="hidden 2xl:block min-h-[200px]"></div>
        </div>
      </div>

      {/* BOTÓN NORMAL (flujo del documento, sin fixed/sticky) */}
      <div
        className={`relative z-[19] h-[76px] mt-0 
  top-[calc(60vh+((100vh-876px)*0.38))] 
  2xl:top-[calc(66vh+((100vh-900px)*0.283))] 
  flex items-end justify-center 2xl:gap-x-6 transition-opacity duration-300 ${
    isStickyAtBottom ? 'opacity-0 pointer-events-none' : 'opacity-100'
  }`}
      >
        {/* Botón de busqueda */}
        <Button
          type="submit"
          onClick={handleBuscar}
          disabled={!origin || !destination}
          className="z-[19] rounded-full pointer-events-auto rounded-lg bg-[#FFA500] text-white px-6 py-3 w-[280px] h-[48px] 2xl:ml-[624px] mt-[30px]"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar Opciones de Viaje
        </Button>


      </div>
    </div>
    </form>
  );
}
