'use client';

import React, { useEffect, useState } from 'react';
import LodgingResultsTemplate from './LodgingResultsTemplate';
import { fetchApartmentsAndLongStays, mapLodgingToRowData } from '@/services/lodging.service';

interface ApartmentsLongstaysResultsProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

export default function ApartmentsLongstaysResults({ initialSearchParams }: ApartmentsLongstaysResultsProps) {
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

  // Solo para DEMO: simula una carga lenta
    useEffect(() => {
             
      fetchApartmentsAndLongStays()
        .then((apiData) => {
          setRows(apiData.map(mapLodgingToRowData));
          console.log("apartments and longstays data fetched:", apiData.map(mapLodgingToRowData));
        })
        
   
    }, []);

  // Configurar filtros por defecto para hoteles y resorts
  const filterDefaults = {
    propertyType: ['apartment', 'studio', 'one-bedroom', 'loft'],
    search: parsedParams?.goingTo || '',
  };

  // Parsing de fechas
  const fromDate = parsedParams?.from ? new Date(parsedParams.from + 'T00:00:00') : null;
  const toDate = parsedParams?.to ? new Date(parsedParams.to + 'T00:00:00') : null;

  return (
    <div className=" py-6">
     

      {/* Componente de resultados con filtros */}
      <LodgingResultsTemplate
      LodgingData={rows}
        LodgingType="apartments-and-longstays"
        filterDefaults={filterDefaults}
        onFiltersChange={(filters: Record<string, any>) => {
          console.log('Filtros cambiados:', filters);
        }}
        onCardClick={(idx: number, row: any) => {
          console.log('Card clicked:', idx, row);
        }}
      />
    </div>
  );
}
