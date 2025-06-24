"use client"

// components/pages/LandingPage.tsx
import { AppNavbar } from "@/components/layout/AppNavbar"
import Hero from "@/components/sections/Hero"
import WhyAsfales from "@/components/sections/WhyAsfales"
import TravelOptionsSection from "@/components/sections/TravelOptionsSection"
import SearchBoxOverlay from "@/components/sections/SearchBoxOverlay"
import ComparisonDemo from "@/components/sections/ComparisonDemo"

import { ImageCarousel } from "../ui/image-carousel"

export default function LandingPage() {

  return (
       <div className="min-h-screen w-full bg-[#F8FAFC]">
          {/* Fondo superior con imagen y overlay */}
          <div
            className="absolute w-full bg-[url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')] bg-cover bg-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
            <SearchBoxOverlay />
          </div>
    
          {/* Contenido principal */}
          <div className="relative min-h-svh ">
            <AppNavbar />
            <Hero />
            <TravelOptionsSection />
            <WhyAsfales />

            {/* NUEVAS SECCIONES */}
            <ComparisonDemo />
    
          </div>
        </div>
  )
}
