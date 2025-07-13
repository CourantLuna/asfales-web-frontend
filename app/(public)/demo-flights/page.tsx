import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";


function DemoFlightsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold">Demo Flights</h1>
        <p>Demo flights page content goes here.</p>
      </div>
    </div>
  );
}

export default function DemoFlightsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemoFlightsContent />
    </Suspense>
  );
}
