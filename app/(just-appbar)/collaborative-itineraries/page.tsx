import CollaborativeItineraries from '@/components/itineraries/CollaborativeItineraries';
import React from 'react';
export const dynamic = "force-dynamic";

export default function Page() {
   return (
       <div>
           <CollaborativeItineraries className='max-w-7xl mx-auto px-4'/>
       </div>
   );
}