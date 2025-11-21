'use client';

import React, { Suspense, useState } from 'react';
import CruisesResultsTemplate from './CruisesResultsTemplate';
import { useSearchParams } from 'next/navigation';
import CruisesHomeSections from './CruisesHomeSections';

interface ICruisesHomeAndResultsProps {}

export default function CruisesHomeAndResults() {
   // Controlar visibilidad de resultados basado en prop o searchParam
   const searchParams = useSearchParams();

         const showResultsFromUrl = searchParams.get('showresults') === 'true';    
         return (
        <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
                    
                    {showResultsFromUrl ? (
                    //   <ExperiencesResults/>
                      
                      <CruisesResultsTemplate />
                    ) : (
                      <>
                      {/*Secciones de Home de Experiences*/}
                      <CruisesHomeSections />
                      </>
                    )}
            
                  </Suspense>
   );
}