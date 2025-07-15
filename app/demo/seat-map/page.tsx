import React from 'react';
export const dynamic = "force-dynamic";
import { Suspense } from 'react';
import SeatMapDemoPage from '@/components/examples/DemoSeatMap';

export default function Page() {
   return (
           <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
    
      
        <SeatMapDemoPage />
            </Suspense>
   );
}