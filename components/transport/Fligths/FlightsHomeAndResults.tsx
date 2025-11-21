"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import FlightsResults from "./FlightsResults";
import FlightsHomeSections from "./FlightsHomeSections";

interface IFlightsHomeAndResultsProps {
    
}

export default function FlightsHomeAndResults() {
const searchParams = useSearchParams();
  // Controlar visibilidad de resultados basado en prop o searchParam
  const showResultsFromUrl = searchParams.get('showresults') === 'true';

  const [state, setState] = useState();
  return (
    <div>
      <Suspense
        fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
      >
        
        {showResultsFromUrl ? (
          <FlightsResults/>
        ) : (
          <>
          {/*Secciones de Home de Flights*/}
            <FlightsHomeSections />
          </>
        )}

      </Suspense>
    </div>
  );
}
