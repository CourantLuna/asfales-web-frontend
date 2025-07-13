import { Suspense } from 'react';
export const dynamic = "force-dynamic";

function CustomFlightCardsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Custom Flight Cards
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">
            Página de tarjetas de vuelo personalizadas en construcción.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CustomFlightCardsPage() {
  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <CustomFlightCardsContent />
    </Suspense>
  );
}
