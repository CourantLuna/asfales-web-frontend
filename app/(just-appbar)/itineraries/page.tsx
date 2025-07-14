import ItinerariesHomeAndResults from '@/components/itineraries/ItinerariesHomeAndResults';
import { ItinerariesResultsTemplate } from '@/components/itineraries/ItinerariesResultsTemplate';
import React from 'react';
export const dynamic = "force-dynamic";


export default function Page() {
   return (
       <div>
           <ItinerariesHomeAndResults />
       </div>
   );
}