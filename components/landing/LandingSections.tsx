"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRef, useState } from "react";
import Hero from "@/components/landing/sections/Hero";
import WhyAsfales from "@/components/landing/sections/WhyAsfales";
import TravelOptionsSection from "@/components/landing/sections/TravelOptionsSection";
import SearchBoxOverlay from "@/components/landing/sections/SearchBoxOverlay";
import ComparisonDemo from "@/components/landing/sections/ComparisonDemo";
import ExploreItineraries from "@/components/landing/sections/ExploreItineraries";
import FAQSection from "./sections/Faqsection";
import LandingBanner from "./sections/LandingBanner";
import ItineraryPlanSection from "./sections/ItineraryPlanSection";
import PredictionsSection from "./sections/PredictionsSection";

interface LandingPageProps {
  children?: React.ReactNode;
}

export default function LandingSections({ children }: LandingPageProps) {
  const [searchValues, setSearchValues] = useState<{ origin: string; destination: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
      <div className="relative min-h-svh">
              <LandingBanner />
              <WhyAsfales />
              <ComparisonDemo />
              <ItineraryPlanSection />
              <ExploreItineraries />
              <PredictionsSection />
              <FAQSection /> 
    </div>
  );
}
