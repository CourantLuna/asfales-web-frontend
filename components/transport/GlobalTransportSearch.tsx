'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FlightsResults from './Fligths/FlightsResults';
import BusesResultsTemplate from './Buses/BusesResultsTemplate';
import CruisesResultsTemplate from './Cruises/CruisesResultsTemplate';

interface IGlobalTransportSearchProps {}

export default function GlobalTransportSearch() {
  const searchParams = useSearchParams();
  const transportType = searchParams.get('transportType');

  // Renderizar el componente apropiado basado en transportType
  const renderTransportResults = () => {
    switch (transportType) {
      case 'flights':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
               ¡Te llevamos a volar!
            </h1>
            <FlightsResults externalShowResults={true} />
          </>
        );
      case 'cruises':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
              ¡Te llevamos a navegar!
            </h1>
            <CruisesResultsTemplate />
          </>
        );
      case 'buses':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
              ¡Te llevamos en carretera!
            </h1>
            <BusesResultsTemplate />
          </>
        );
      default:
        // Si no hay transportType o es inválido, mostrar mensaje por defecto
        return (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Selecciona un tipo de transporte para comenzar</p>
            <p className="text-sm">Usa el buscador de arriba para encontrar vuelos, cruceros o autobuses</p>
          </div>
        );
    }
  };

  return (
    <div className='w-full pt-2 pb-2 p-4 2xl:px-0 lg:py-2 flex-1 flex flex-col h-full max-w-7xl mx-auto'>
        <Suspense  fallback={<div>Loading...</div>}>
      {renderTransportResults()}
    </Suspense>
    </div>
  );
}