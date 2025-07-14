'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { ItinerariesResultsTemplate } from './ItinerariesResultsTemplate';
import ItinerariesHomeSections from './ItinerariesHomeSections';

interface IItinerariesHomeAndResultsProps {}

export default function ItinerariesHomeAndResults() {
    const searchParams = useSearchParams();
      // Controlar visibilidad de resultados basado en prop o searchParam
      const showResultsFromUrl = searchParams.get('showresults') === 'true';
   return (
       <div>
            <Suspense
              fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
            >
              
              {showResultsFromUrl ? (
                <ItinerariesResultsTemplate/>
              ) : (
                <>
                {/*Secciones de Home de Itineraries*/}
                    <ItinerariesHomeSections />
                </>
              )}
      
            </Suspense>
          </div>
   );
}