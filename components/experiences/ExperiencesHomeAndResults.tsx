'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

interface IExperiencesHomeAndResultsProps {}

export default function ExperiencesHomeAndResults() {
   const searchParams = useSearchParams();
         // Controlar visibilidad de resultados basado en prop o searchParam
         const showResultsFromUrl = searchParams.get('showresults') === 'true';
   return (
      <div>
                  <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
                    
                    {showResultsFromUrl ? (
                    //   <ExperiencesResults/>
                      <h1>ExperiencesResults</h1>
                    ) : (
                      <>
                      {/*Secciones de Home de Experiences*/}
                    <h1>Experiences Home </h1>
                      </>
                    )}
            
                  </Suspense>
                </div>
   );
}