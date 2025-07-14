
import React from 'react';
import FlightResultsPage from '../flight-results/page';
import FlightsResults from '@/components/transport/FlightsResults';
import GlobalTransportSearch from '@/components/transport/GlobalTransportSearch';
export const dynamic = "force-dynamic";


export default function globalTransportSearch() {
   return (
       <div>
        <GlobalTransportSearch />
       </div>
   );
}