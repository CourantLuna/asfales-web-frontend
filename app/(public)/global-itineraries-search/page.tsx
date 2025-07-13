

import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";

function GlobalItinerariesSearchContent() {
   return (
       <div>
           <h1>globalItinerariesSearch</h1>
       </div>
   );
}

export default function GlobalItinerariesSearch() {
   return (
       <Suspense fallback={<div>Loading...</div>}>
           <GlobalItinerariesSearchContent />
       </Suspense>
   );
}