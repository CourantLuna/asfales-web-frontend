import React from 'react';
import HotelsResortsResultSimple from '@/components/lodging-search/HotelsResortsResultSimple';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
   // Debug: Imprimir los searchParams para verificar que lleguen
   console.log('searchParams en page.tsx:', searchParams);
   
   return (
       <div>
           {/* Versión que usa window.location.search directamente */}
           <HotelsResortsResultSimple initialSearchParams={searchParams} />
       </div>
   );
}