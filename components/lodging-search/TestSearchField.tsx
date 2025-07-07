'use client';

import React, { useState } from 'react';
import { StandardSearchDataSource, StandardSearchField } from '../shared/standard-fields-component/StandardSearchField';
import { Building2, Clock, MapPin, Plane } from 'lucide-react';

const testDataSources: StandardSearchDataSource[] = [
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "name",
    nameValueField: "code",
    nameDescriptionField: "city",
    options: [
      { name: "Madrid (MAD - Aeropuerto Barajas)", code: "MAD", city: "Capital de España" },
      { name: "Miami (MIA - Aeropuerto Internacional de Miami)", code: "MIA", city: "Estados Unidos" },
    ]
  }
];

export default function TestSearchField() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Test - StandardSearchField</h2>
      
      <StandardSearchField
        label="Destino de prueba"
        placeholder="Selecciona un destino"
        value={selectedValue}
        onValueChange={setSelectedValue}
        dataSources={testDataSources}
        onSelect={(option, sourceType) => {
          console.log('🔍 Opción seleccionada:', {
            label: option.label,
            value: option.value,
            description: option.description,
            sourceType
          });
          
          // StandardSearchField ya maneja el value via onValueChange
          // No necesitamos hacer nada más aquí
        }}
        showClearButton={true}
        minSearchLength={0}
      />
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Estado interno (value):</h3>
        <p className="text-lg font-mono">{selectedValue || 'Ninguno'}</p>
        
        <div className="mt-2 text-sm text-gray-600">
          <p>✅ Esperado: "MAD" o "MIA" (códigos cortos)</p>
          <p>❌ Si aparece el nombre completo, hay un problema</p>
          <p>📝 El botón debe mostrar el nombre completo, pero el estado interno debe ser el código</p>
        </div>
      </div>
    </div>
  );
}
