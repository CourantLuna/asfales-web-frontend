import MyItinerariesClient from '@/components/itineraries/MyItinerariesClient';
import React from 'react';
export const dynamic = "force-dynamic";


export default function Page() {
   return (
       <div>
           <MyItinerariesClient className="max-w-7xl mx-auto px-4" />
       </div>
   );
}