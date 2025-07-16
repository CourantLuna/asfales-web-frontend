

import GlobalItinerarySearch from '@/components/itineraries/GlobalItinerarySearch';
import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";

function GlobalItinerariesSearchContent() {
   return (
       <GlobalItinerarySearch />
   );
}

export default function GlobalItinerariesSearch() {
   return (
       <Suspense fallback={<div>Loading...</div>}>
           <GlobalItinerariesSearchContent />
       </Suspense>
   );
}