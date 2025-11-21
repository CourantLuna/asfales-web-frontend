'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import { ImageButtonSheet, ImageButtonSheetItem } from '@/components/shared/standard-fields-component/ImageButtonSheet';
import FlightsSearchBar from './Fligths/FlightsSearchBar';
import CruisesSearchBar from './Cruises/CruisesSearchBar';
import BusesSearchBar from './Buses/BusesSearchBar';
import { Plane, Ship, Bus } from 'lucide-react';



interface TransportsSearchBarProps {
  /**
   * Whether to show search buttons in child components (default: true)
   */
  showSearchButton?: boolean;
  /**
   * Whether to show mobile select dropdown for tabs (default: true)
   */
  showMobileSelect?: boolean;

  centerTabsTransportType?: boolean
  useToggleGroupTabsTransportType?: boolean;
  

}

export default function TransportsSearchBar({ 
  showSearchButton = true, 
  showMobileSelect = true,
  centerTabsTransportType = true,
  useToggleGroupTabsTransportType = false,
}: TransportsSearchBarProps) {
  const [activeTab, setActiveTab] = useState('flights');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Función para actualizar la URL con el transportType
  const updateUrlWithTransportType = (transportType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Construir los parámetros de la URL de forma segura
    // Agregar parámetro para mostrar resultados
    params.set("transportType", transportType);
    
    // Actualizar la URL manteniendo otros parámetros existentes
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  // Handler personalizado para el cambio de tab
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    updateUrlWithTransportType(newTab);
  };

 
  
  // Items para ImageButtonSheet (mobile/tablet)
  const sheetItems: ImageButtonSheetItem[] = [
    {
      label: "Vuelos",
      src: '/menu-icons/plane-icon.svg',
      size: 64,
      sheetContent: <FlightsSearchBar />,
      sheetTitle: "Búsqueda de Vuelos",
      btnLabel: "Buscar Vuelos",
      btnAction: () => {
        handleTabChange('flights');
        console.log('Búsqueda de vuelos ejecutada');
      },
      key: "flights"
    },
    {
      label: "Cruceros",
      src: '/menu-icons/cruise-icon.svg',
      size: 64,
      sheetContent: <CruisesSearchBar  />,
      sheetTitle: "Búsqueda de Cruceros",
      btnLabel: "Buscar Cruceros",
      btnAction: () => {
        handleTabChange('cruises');
        console.log('Búsqueda de cruceros ejecutada');
      },
      key: "cruises"
    },
    {
      label: "Buses",
      src: '/menu-icons/bus-icon.svg',
      size: 64,
      sheetContent: <BusesSearchBar  />,
      sheetTitle: "Búsqueda de Buses",
      btnLabel: "Buscar Buses",
      btnAction: () => {
        handleTabChange('buses');
        console.log('Búsqueda de buses ejecutada');
      },
      key: "buses"
    }
  ];

  // Items para StandardTabs (desktop)
  const tabItems: TabItem[] = [
    {
      value: 'flights',
      label: 'Vuelos',
      icon: <Plane className="w-4 h-4" />,
      content: <FlightsSearchBar
             
                showSearchButton={showSearchButton} 
               />,
    },
    {
      value: 'cruises',
      label: 'Cruceros',
      icon: <Ship className="w-4 h-4" />,
      content: <CruisesSearchBar showSearchButton={showSearchButton}/>,
    },
    {
      value: 'buses',
      label: 'Buses',
      icon: <Bus className="w-4 h-4" />,
      content: <BusesSearchBar showSearchButton={showSearchButton}
                />,
    },
  ];

  return (
           <div className="w-full max-w-7xl mx-auto">
      {/* Mobile/Tablet: ImageButtonSheet (lg hacia abajo) */}
      <div className="lg:hidden">
        <ImageButtonSheet
          items={sheetItems}
          label="Selecciona tu tipo de transporte"
          labelClassName="text-lg font-semibold mb-4"
          containerClassName="w-full"
          gridColsClassName="grid-cols-3 gap-6"
          buttonsContainerClassName="w-full justify-center" 
          buttonClassName="w-full flex items-center justify-center"
          buttonLabelClassName="text-sm font-medium mt-2"
        />
      </div>

      {/* Desktop: StandardTabs (lg hacia arriba) */}
      <div className="hidden lg:block">
        <StandardTabs
          useToggleGroupTabs={useToggleGroupTabsTransportType}
          centerTabs={centerTabsTransportType}
          tabTriggerClassName=''
          items={tabItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          containerClassName="w-full"
          useMobileSelect={showMobileSelect}
          mobilePlaceholder="Selecciona tipo de transporte"
        />
      </div>
    </div>
  );
}