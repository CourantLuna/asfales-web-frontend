import Hero from "@/components/sections/Hero"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppNavbar } from "@/components/layout/AppNavbar"
import SearchBoxOverlay from "@/components/sections/SearchBoxOverlay"
import TravelOptionsTabs from "@/components/TravelOptionsTabs"


export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[rgb(59_130_246_/_0.5)]">
      {/* Search Box en capa superior */}
      <div className="absolute w-full bg-[rgb(220_38_38_/_0.5)] pointer-events-none">
        <SearchBoxOverlay />
      </div>

      {/* Contenido principal */}
      <div className="relative min-h-svh">
        <AppNavbar />
        <Hero />

        {/* Sección adicional */}
        <section className="min-h-svh bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Próxima Sección Destacada
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            Aquí puedes incluir una introducción a itinerarios, recomendaciones o cualquier contenido adicional para el usuario.
          </p>
            <TravelOptionsTabs />

        </section>
      </div>
    </div>

  )
}
