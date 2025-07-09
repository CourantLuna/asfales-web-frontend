'use client';

import React, { useState } from 'react';
import { StandardTabs, type TabItem } from '@/components/shared/standard-fields-component/StandardTabs';
import FlightsSearchBar from './FlightsSearchBar';
import CruisesSearchBar from './CruisesSearchBar';
import BusesSearchBar from './BusesSearchBar';
import { Plane, Ship, Bus } from 'lucide-react';

interface TransportsSearchBarProps {}

export default function TransportsSearchBar({}: TransportsSearchBarProps) {
  const [activeTab, setActiveTab] = useState('flights');

  const tabItems: TabItem[] = [
    {
      value: 'flights',
      label: 'Vuelos',
      icon: <Plane className="w-4 h-4" />,
      content: <FlightsSearchBar />,
    },
    {
      value: 'cruises',
      label: 'Cruceros',
      icon: <Ship className="w-4 h-4" />,
      content: <CruisesSearchBar />,
    },
    {
      value: 'buses',
      label: 'Buses',
      icon: <Bus className="w-4 h-4" />,
      content: <BusesSearchBar />,
    },
  ];

  return (
    <div className="w-full">
      <StandardTabs
        items={tabItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        containerClassName="w-full"
        useMobileSelect={true}
        mobilePlaceholder="Selecciona tipo de transporte"
      />
    </div>
  );
}
