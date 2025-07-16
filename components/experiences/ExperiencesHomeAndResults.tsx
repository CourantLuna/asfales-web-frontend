'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import ExperiencesResultsTemplate from './ExperiencesResultsTemplate';
import ExperiencesHomeSections from './ExperiencesHomeSections';

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
                      
                      <ExperiencesResultsTemplate />
                    ) : (
                      <>
                      {/*Secciones de Home de Experiences*/}
                      <ExperiencesHomeSections />
                      </>
                    )}
            
                  </Suspense>
                </div>
   );
}