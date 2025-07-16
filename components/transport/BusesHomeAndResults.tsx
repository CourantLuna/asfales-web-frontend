'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import BusesResultsTemplate from './BusesResultsTemplate';
import BusesHomeSections from './BusesHomeSections';

interface IBusesHomeAndResultsProps {}

export default function BusesHomeAndResults() {

const searchParams = useSearchParams();
         // Controlar visibilidad de resultados basado en prop o searchParam
         const showResultsFromUrl = searchParams.get('showresults') === 'true';    
         
         return (
        <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
                    
                    {showResultsFromUrl ? (
                    //   <ExperiencesResults/>
                      
                      <BusesResultsTemplate />
                    ) : (
                      <>
                      {/*Secciones de Home de Experiences*/}
                    <BusesHomeSections />
                      </>
                    )}
            
                  </Suspense>
   );
}