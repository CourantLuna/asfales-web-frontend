import React, { Suspense } from 'react';
import BusCardDemoPage from '@/components/examples/DemoBusCard';
export const dynamic = "force-dynamic";

export default function Page() {
   return (
       <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
         <BusCardDemoPage />
       </Suspense>
   );
}