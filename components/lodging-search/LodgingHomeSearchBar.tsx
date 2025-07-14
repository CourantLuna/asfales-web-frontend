'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { StandardToggleGroup } from '../shared/standard-fields-component/StandardToggleGroup';
import { Building2, Hotel } from 'lucide-react';
import LodgingSearchBar from './LodgingSearchBar';
import BreadcrumbNav from '../shared/BreadcrumbNav';
import router from 'next/router';

interface ILodgingHomeSearchBarProps {
  showSearchButtonLodging?: boolean,
  onLodgingTypeChange?: (type: string) => void; // Nueva prop
  initialLodgingType?: string; // Nueva prop opcional
  basePath?: string; // Nueva prop opcional para la ruta base
}

export default function LodgingHomeSearchBar({ 
  showSearchButtonLodging = true,
onLodgingTypeChange,
  initialLodgingType,
  basePath,
}: ILodgingHomeSearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [selectedLodgingType, setSelectedLodgingType] = useState<string>("hotels-and-resorts");

  // Efecto para sincronizar el toggle con la URL actual
  useEffect(() => {
    // Extraer el tipo de alojamiento del path
    // Esperamos paths como: /lodgings/hotels-and-resorts, /lodgings/hostels-and-guesthouses, etc.
    const pathMatch = pathname.match(/\/lodgings\/(.+?)(?:\/|$|\?)/);
    
    if (pathMatch && pathMatch[1]) {
      const lodgingTypeFromPath = pathMatch[1];
      
      // Validar que el tipo extraído sea uno de los válidos
      const validTypes = [
        "hotels-and-resorts",
        "hostels-and-guesthouses", 
        "apartments-and-longstays"
      ];
      
      if (validTypes.includes(lodgingTypeFromPath)) {
        setSelectedLodgingType(lodgingTypeFromPath);
      }
    }
  }, [pathname]);

  // Función para actualizar la URL con el transportType
  const updateUrlWithLodgingType = (LodgingType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Construir los parámetros de la URL de forma segura
    // Agregar parámetro para mostrar resultados
    params.set("lodgingType",LodgingType );
    
    // Actualizar la URL manteniendo otros parámetros existentes
    router.push(`${window.location.pathname}?${params.toString()}`);
  };
  
  // Función para manejar cambios y notificar al padre
  const handleLodgingTypeChange = (value: string) => {
    setSelectedLodgingType(value);
    updateUrlWithLodgingType(value); // Actualizar la URL
    onLodgingTypeChange?.(value); // Notificar al padre
  };

  return (
    <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
           <div className="w-full max-w-7xl mx-auto">

    <div className="w-full space-y-6">
      {/* Toggle Group para seleccionar tipo de alojamiento */}
      <StandardToggleGroup
        label="Tipo de Alojamiento"
        type="single"
        value={selectedLodgingType}
        onValueChange={(value) => handleLodgingTypeChange(value as string)}
        options={[
          {
            value: "hotels-and-resorts",
            label: "Hoteles y Resorts",
            icon: <Hotel className="mr-2 h-4 w-4" />,
          },
          {
            value: "hostels-and-guesthouses",
            label: "Hostales y Casas de Huéspedes",
            icon: <span className="mr-2 h-4 w-4">🛏</span>,
          },
          {
            value: "apartments-and-longstays",
            label: "Apartamentos y estadías largas",
            icon: <Building2 className="mr-2 h-4 w-4" />,
          },
        ]}
      />

      {/* Search Bar con el tipo seleccionado */}
      <LodgingSearchBar lodgingType={selectedLodgingType} showSearchButton={showSearchButtonLodging} 
        basePathUrl={basePath}
      />
        
    </div>

  </div>
  </Suspense>
  );
}