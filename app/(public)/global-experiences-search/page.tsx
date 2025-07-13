
import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";


function GlobalExperiencesSearchContent() {
   return (
       <div>
           <h1>globalExperiencesSearch</h1>
       </div>
   );
}

export default function GlobalExperiencesSearch() {
   return (
       <Suspense fallback={<div>Loading...</div>}>
           <GlobalExperiencesSearchContent />
       </Suspense>
   );
}