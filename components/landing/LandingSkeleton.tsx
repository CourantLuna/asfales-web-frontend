"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRef, useState } from "react";
import Hero from "@/components/landing/sections/Hero";
import TravelOptionsSection from "@/components/landing/sections/TravelOptionsSection";
import SearchBoxOverlay from "@/components/landing/sections/SearchBoxOverlay";


interface LandingPageProps {
  children?: React.ReactNode;
}

export default function LandingSkeleton({ children }: LandingPageProps) {
  const [searchValues, setSearchValues] = useState<{ origin: string; destination: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("transport"); // <--- aquí defines el estado


  function smoothScrollTo(targetY: number, duration = 800) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percent, 3); // easeOutCubic
      window.scrollTo(0, startY + diff * ease);
      if (progress < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const handleSearch = (origin: string, destination: string) => {
    setSearchValues({ origin, destination });
    smoothScrollTo(resultsRef.current?.offsetTop ?? 0, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      {/* Imagen de fondo + overlay */}
      <div className="absolute w-full bg-[url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')] bg-cover bg-center pointer-events-none">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        <SearchBoxOverlay onSearch={handleSearch} />
      </div>

      <div className="relative min-h-svh">
        <Hero />

        <div ref={resultsRef}>
          <TravelOptionsSection
          activeTab={activeTab} setActiveTab={setActiveTab}
          />

          {children}
        </div>
      </div>
    </div>
  );
}
