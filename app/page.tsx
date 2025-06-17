import Hero from "@/components/sections/Hero"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppNavbar } from "@/components/layout/AppNavbar"
import SearchBoxOverlay from "@/components/sections/SearchBoxOverlay"
import TravelOptionsTabs from "@/components/TravelOptionsTabs"


export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
     {/* Search Box en capa superior */}
<div
  className="absolute w-full bg-[url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')] bg-cover bg-center pointer-events-none"
>

   {/* Overlay blanco semitransparente */}
  <div className="absolute inset-0  bg-white/30 backdrop-blur-sm" />

  <SearchBoxOverlay />
</div>

      {/* Contenido principal */}
      <div className="relative min-h-svh">
        <AppNavbar />
        <Hero />

        

      {/* Sección adicional */}
<section className="relative  h-[100vh] md:h-[100vh] overflow-hidden flex justify-center py-4">

  {/* Fondo SVG con forma personalizada */}
  <div className="absolute z-[0] top-0 right-0 left-0 h-[90px] md:h-[110px]">
    <svg
      width="1366"
      height="106"
      viewBox="0 0 1366 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
  d="M1366 98.1416H944.737C937.226 96.1686 930.661 91.3237 926.584 84.4805L897.799 36.165C892.388 27.0835 882.598 21.5195 872.026 21.5195H856V21.5H0V0.200195C0.64623 0.0690155 1.31506 1.39473e-08 2 0H1366V98.1416Z"
  fill="#0057A3"
/>

    </svg>
  </div>

  {/* Contenido centrado desde la mitad hacia arriba */}
  <div className="absolute top-[45vh] md:top-[28vh] h-[280px] w-full  px-8 flex flex-col items-center text-center">
    
    <TravelOptionsTabs />
  </div>
</section>


      </div>
    </div>

  )
}
