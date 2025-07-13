import FlightsResults from '@/components/transport/FlightsResults';
import React, { Suspense } from 'react';

export default function Page() {
   return (
       <div>
        <Suspense
                fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
              >
           <FlightsResults />
           </Suspense>
       </div>
   );
}