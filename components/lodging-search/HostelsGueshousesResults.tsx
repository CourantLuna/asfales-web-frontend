'use client';

import React, { Suspense, useEffect, useState } from 'react';
import LodgingResultsTemplate from './LodgingResultsTemplate';
import { fetchApartmentsAndLongStays, fetchHostelsAndGuesthouses, mapLodgingToRowData } from '@/services/lodging.service';

interface HostelsGuesthousesResultsProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

export default function HostelsGuesthousesResults({ initialSearchParams }: HostelsGuesthousesResultsProps) {
  const [parsedParams, setParsedParams] = useState<any>(null);
  const [urlParams, setUrlParams] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // Obtener parámetros directamente del navegador
    const urlSearchParams = new URLSearchParams(window.location.search);
    setUrlParams(window.location.search);
    
    const params = {
      goingTo: urlSearchParams.get('goingTo') || '',
      travelingFrom: urlSearchParams.get('travelingFrom') || '',
      from: urlSearchParams.get('from') || '',
      to: urlSearchParams.get('to') || '',
      adults: parseInt(urlSearchParams.get('adults') || '0'),
      children: parseInt(urlSearchParams.get('children') || '0'),
      rooms: parseInt(urlSearchParams.get('rooms') || '1'),
    };

    console.log('URL completa:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Parámetros parseados:', params);
    console.log('initialSearchParams:', initialSearchParams);
    
    setParsedParams(params);
  }, [initialSearchParams]);

     useEffect(() => {
               
        fetchHostelsAndGuesthouses()
          .then((apiData) => {
            setRows(apiData.map(mapLodgingToRowData));
            console.log("apartments and longstays data fetched:", apiData.map(mapLodgingToRowData));
          })
          
     
      }, []);

  // Configurar filtros por defecto para hoteles y resorts
  const filterDefaults = {
    propertyType: ['hostel-backpacker', 'guesthouse', 'camping', 'youth-hostel', 'capsule-hotel', 'boutique-hotel'],
    search: parsedParams?.goingTo || '',
  };

  // Parsing de fechas
  const fromDate = parsedParams?.from ? new Date(parsedParams.from + 'T00:00:00') : null;
  const toDate = parsedParams?.to ? new Date(parsedParams.to + 'T00:00:00') : null;

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className="py-6">
      {/* Información de búsqueda debug only */}
      {/* <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Hoteles y Resorts - Versión Simple
        </h1>
        
        <div className="mb-4">
          <span className="font-semibold text-gray-600">URL Search:</span>
          <p className="text-xs bg-gray-100 p-2 rounded mt-1 break-all">{urlParams}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Destino:</span>
            <p className="text-gray-800">{getDestinationName(parsedParams?.goingTo) || 'No especificado'}</p>
            <p className="text-xs text-gray-500">Código: {parsedParams?.goingTo}</p>
            <p className="text-xs text-gray-400">{getDestinationFullName(parsedParams?.goingTo)}</p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Desde:</span>
            <p className="text-gray-800">{getDestinationName(parsedParams?.travelingFrom) || 'No especificado'}</p>
            <p className="text-xs text-gray-500">Código: {parsedParams?.travelingFrom}</p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Fechas:</span>
            <p className="text-gray-800">
              {fromDate && toDate 
                ? `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`
                : 'Fechas no especificadas'
              }
            </p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Huéspedes:</span>
            <p className="text-gray-800">
              {parsedParams?.adults || 0} adultos, {parsedParams?.children || 0} niños
            </p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Habitaciones:</span>
            <p className="text-gray-800">{parsedParams?.rooms || 1} habitación(es)</p>
          </div>

          <div>
            <span className="font-semibold text-gray-600">Filtros aplicados:</span>
            <p className="text-gray-800">
              {filterDefaults.propertyType.join(', ')} - 
              ${filterDefaults.priceRange[0]} - ${filterDefaults.priceRange[1]}
            </p>
          </div>
        </div>
      </div> */}

      {/* Componente de resultados con filtros */}
      <LodgingResultsTemplate
        LodgingData={rows}
      LodgingType="hostels-and-guesthouses"
        filterDefaults={filterDefaults}
        onFiltersChange={(filters: Record<string, any>) => {
          console.log('Filtros cambiados:', filters);
        }}
        onCardClick={(idx: number, row: any) => {
          console.log('Card clicked:', idx, row);
        }}
      />
    </div>
    </Suspense>
  );
}
