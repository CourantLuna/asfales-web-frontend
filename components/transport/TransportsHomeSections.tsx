'use client';

import React, { Suspense, useState } from 'react';

interface ITransportsHomeSectionsProps {}

export default function TransportsHomeSections() {
   const [state, setState] = useState();
   return (
       <div>
          <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
            {/*Secciones de Home de Transports*/ }        
           <h1>TransportsHomeSections</h1>
          </Suspense>
       </div>
   );
}