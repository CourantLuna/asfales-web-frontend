import { Suspense } from 'react';
import FlightResultsTemplate from "@/components/transport/Fligths/FlightResultsTemplate";

export const dynamic = 'force-dynamic'


export default function FlightResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
        <FlightResultsTemplate />
      </Suspense>
    </div>
  );
}
