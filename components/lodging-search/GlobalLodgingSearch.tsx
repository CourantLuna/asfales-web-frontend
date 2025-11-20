'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HotelsResortsResultSimple from './HotelsResortsResultSimple';
import ApartmentsLongstaysResults from './ApartmentsLongstaysResults';
import HostelsGuesthousesResults from './HostelsGueshousesResults';


interface IGlobalLodgingSearchProps {}

export default function GlobalLodgingSearch() {
  const searchParams = useSearchParams();
  const lodgingType = searchParams.get('lodgingType') || 'hotels-and-resorts';

  // Renderizar el componente apropiado basado en LodgingType
  const renderLodgingResults = () => {
    switch (lodgingType) {
      case 'hotels-and-resorts':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
               ¡Te llevamos a volar!
            </h1>
            < HotelsResortsResultSimple />
          </>
        );
      case 'apartments-and-longstays':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
              ¡Te llevamos a navegar!
            </h1>
            < ApartmentsLongstaysResults/>
          </>
        );
      case 'hostels-and-guesthouses':
        return (
          <>
            <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-4">
              ¡Te alojamos donde quieras!
            </h1>
            <HostelsGuesthousesResults />
          </>
        );
      default:
        // Si no hay LodgingType o es inválido, mostrar mensaje por defecto
        return (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Selecciona un tipo de Lodginge para comenzar</p>
            <p className="text-sm">Usa el buscador de arriba para encontra alojamiento a tu medida</p>
          </div>
        );
    }
  };

  return (
    <div className='w-full pt-2 pb-2 p-4 2xl:px-0 lg:py-2 flex-1 flex flex-col h-full max-w-7xl mx-auto'>
        <Suspense  fallback={<div>Loading...</div>}>
      {renderLodgingResults()}
    </Suspense>
    </div>
  );
}