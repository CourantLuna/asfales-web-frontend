
import React, { Suspense } from 'react';
import FlightShoppingCart from '@/components/transport/Fligths/FlightShoppingCart'; // Ajusta la ruta

export default function FlightDetailsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center">
         <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
         <p className="text-gray-500">Cargando detalles del vuelo...</p>
      </div>
    }>
      <FlightShoppingCart />
    </Suspense>
  );
}