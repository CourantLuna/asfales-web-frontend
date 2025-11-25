'use client';

import React, { Suspense, useEffect, useState } from 'react';
import LodgingResultsTemplate from './LodgingResultsTemplate';
import { fetchLodgings } from "@/services/lodging.service";
import { RowData } from '../shared/CustomTable';
import { mapLodgingToRowData } from '@/lib/lodging-search-utils';

interface HotelsResortsResultSimpleProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

export default function HotelsResortsResultSimple({ initialSearchParams }: HotelsResortsResultSimpleProps) {
  const [parsedParams, setParsedParams] = useState<any>(null);
  const [urlParams, setUrlParams] = useState<string>('');
  const [rows, setRows] = useState<RowData[]>([]);

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

fetchLodgings()
      .then((apiData) => {
        setRows(apiData.map(mapLodgingToRowData));
        console.log("Lodging data fetched:", apiData);
      })
      

  }, []);

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
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className="py-2">


      {/* Componente de resultados con filtros */}
      <LodgingResultsTemplate
              LodgingData={rows}
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
    </Suspense>
  );
}