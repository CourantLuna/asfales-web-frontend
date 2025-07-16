'use client';

import React, { Suspense, useState } from 'react';
import { ItinerariesResultsTemplate } from './ItinerariesResultsTemplate';

interface IGlobalItinerarySearchProps {}

export default function GlobalItinerarySearch() {
   const [state, setState] = useState();
   return (
    <div className='w-full pt-2 pb-2 p-4 2xl:px-0 lg:py-2 flex-1 flex flex-col h-full max-w-7xl mx-auto'>
        <Suspense  fallback={<div className='h-20 bg-gray-100 animate-pulse rounded-lg'></div>}>
        
           <ItinerariesResultsTemplate />
        
        </Suspense>
       </div>
   );
}