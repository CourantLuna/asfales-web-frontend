'use client';

import React, { useEffect, useState } from 'react';
import LodgingResultsTemplate from './LodgingResultsTemplate';

interface HotelsResortsResultSimpleProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

export default function HotelsResortsResultSimple({ initialSearchParams }: HotelsResortsResultSimpleProps) {
  const [parsedParams, setParsedParams] = useState<any>(null);
  const [urlParams, setUrlParams] = useState<string>('');

  // Helper para mapear claves de meses a nombres abreviados
  const getMonthNames = (monthKeys: string[]) => {
    const monthNames: Record<string, string> = {
      "june": "Jun.",
      "july": "Jul.", 
      "august": "Ago.",
      "september": "Sep.",
      "october": "Oct.",
      "november": "Nov."
    };
    return monthKeys.map(key => monthNames[key] || key);
  };

  // Helper para convertir duración a texto legible
  const getDurationText = (duration: string) => {
    switch (duration) {
      case "1": return "1 noche";
      case "2-3": return "2-3 noches";
      case "4-5": return "4-5 noches";
      case "6-7": return "6-7 noches";
      default: return duration;
    }
  };

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
      isFlexible: urlSearchParams.get('isFlexible') === 'true',
      flexibleDuration: urlSearchParams.get('flexibleDuration') || '',
      flexibleMonths: urlSearchParams.get('flexibleMonths')?.split(',') || [],
    };

    console.log('URL completa:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Parámetros parseados:', params);
    console.log('initialSearchParams:', initialSearchParams);
    
    setParsedParams(params);
  }, [initialSearchParams]);

  // Configurar filtros por defecto para hoteles y resorts
  const filterDefaults = {
    propertyType: ['hotel', 'resort'],
    starRating: ['4-stars', '5-stars'],
    priceRange: [0, 1000] as [number, number],
    cancellationOptions: ['fully-refundable'],
    search: parsedParams?.goingTo || '',
  };

  // Parsing de fechas
  const fromDate = parsedParams?.from ? new Date(parsedParams.from + 'T00:00:00') : null;
  const toDate = parsedParams?.to ? new Date(parsedParams.to + 'T00:00:00') : null;

  return (
    <div className="py-6">
      {/* Información de búsqueda debug only */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
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
            <p className="text-gray-800">{parsedParams?.goingTo || 'No especificado'}</p>
            <p className="text-xs text-gray-500">Código: {parsedParams?.goingTo}</p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Desde:</span>
            <p className="text-gray-800">{parsedParams?.travelingFrom || 'No especificado'}</p>
            <p className="text-xs text-gray-500">Código: {parsedParams?.travelingFrom}</p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-600">Fechas:</span>
            {parsedParams?.isFlexible ? (
              <div>
                <p className="text-gray-800">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2 font-semibold">FLEXIBLES</span>
                  {getDurationText(parsedParams.flexibleDuration)} in {getMonthNames(parsedParams.flexibleMonths || []).join(' ')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Fechas estimadas: {fromDate && toDate 
                    ? `${fromDate.toLocaleDateString('es-ES')} - ${toDate.toLocaleDateString('es-ES')}`
                    : 'Por determinar'
                  }
                </p>
              </div>
            ) : (
              <p className="text-gray-800">
                {fromDate && toDate 
                  ? `${fromDate.toLocaleDateString('es-ES')} - ${toDate.toLocaleDateString('es-ES')}`
                  : 'Fechas no especificadas'
                }
              </p>
            )}
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
      </div>

      {/* Componente de resultados con filtros */}
      <LodgingResultsTemplate
        LodgingType="hotels-and-resorts"
        filterDefaults={filterDefaults}
        onFiltersChange={(filters: Record<string, any>) => {
          console.log('Filtros cambiados:', filters);
        }}
        onCardClick={(idx: number, row: any) => {
         alert(`Card clicked:` + ` ${idx} - ${row.title} ubicado en ${row.location}`);
        }}
      />
    </div>
  );
}
