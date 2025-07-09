'use client';

import React, { useState } from 'react';
import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import FlightsSearchBar from './FlightsSearchBar';
import CruisesSearchBar from './CruisesSearchBar';
import BusesSearchBar from './BusesSearchBar';
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
  useToggleGroupTabsTransportType = false
}: TransportsSearchBarProps) {
  const [activeTab, setActiveTab] = useState('flights');

  const tabItems: TabItem[] = [
    {
      value: 'flights',
      label: 'Vuelos',
      icon: <Plane className="w-4 h-4" />,
      content: <FlightsSearchBar showSearchButton={showSearchButton} />,
    },
    {
      value: 'cruises',
      label: 'Cruceros',
      icon: <Ship className="w-4 h-4" />,
      content: <CruisesSearchBar showSearchButton={showSearchButton} />,
    },
    {
      value: 'buses',
      label: 'Buses',
      icon: <Bus className="w-4 h-4" />,
      content: <BusesSearchBar showSearchButton={showSearchButton} />,
    },
  ];

  return (
    <div className="w-full">
      <StandardTabs
        useToggleGroupTabs={useToggleGroupTabsTransportType}
        centerTabs={centerTabsTransportType}
        tabTriggerClassName=''
        items={tabItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        containerClassName="w-full"
        useMobileSelect={showMobileSelect}
        mobilePlaceholder="Selecciona tipo de transporte"
      />
    </div>
  );
}
