import LodgingHomeSections from '@/components/lodging-search/LodgingHomeSections';
import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";


export default function lodgingsHome() {
   return (
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
         <LodgingHomeSections />
      </Suspense>
   );
}