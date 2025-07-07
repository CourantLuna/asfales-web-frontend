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
      { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "BCN", city: "Ciudad mediterránea" },
    ]
  },
  {
    id: "cities",
    label: "Ciudades",
    icon: <MapPin className="h-4 w-4" />,
    type: "city" as const,
    nameLabelField: "cityName",
    nameValueField: "cityCode",
    nameDescriptionField: "description",
    options: [
      { cityName: "Roma, Italia", cityCode: "ROM", description: "Ciudad eterna" },
      { cityName: "Nueva York, EE.UU.", cityCode: "NYC", description: "La gran manzana" },
      { cityName: "Tokyo, Japón", cityCode: "TYO", description: "Metrópolis moderna" },
    ]
  }
];

export default function StandardSearchFieldTest() {
  const [selectedValue, setSelectedValue] = useState<string>("MAD"); // Valor inicial: código
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">StandardSearchField - Prueba Value/Label</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="font-semibold text-blue-800 mb-2">Comportamiento esperado:</h2>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Botón:</strong> Muestra el nombre completo (ej: "Madrid (MAD - Aeropuerto Barajas)")</li>
          <li>• <strong>Estado interno:</strong> Almacena el código (ej: "MAD")</li>
          <li>• <strong>URL:</strong> Se usa el código para navegación</li>
        </ul>
      </div>
      
      <StandardSearchField
        label="Destino de prueba"
        placeholder="Selecciona un destino"
        value={selectedValue}
        onValueChange={(value) => {
          setSelectedValue(value);
          addLog(`onValueChange: "${value}"`);
        }}
        dataSources={testDataSources}
        onSelect={(option, sourceType) => {
          addLog(`onSelect: label="${option.label}", value="${option.value}", type="${sourceType}"`);
        }}
        showClearButton={true}
        minSearchLength={0}
      />
      
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Estado interno (value):</h3>
          <p className="text-lg font-mono bg-white p-2 rounded border">
            {selectedValue || 'Ninguno'}
          </p>
          
          <div className="mt-2 text-sm text-gray-600">
            <p>✅ Esperado: "MAD", "MIA", "BCN", "ROM", "NYC", "TYO" (códigos cortos)</p>
            <p>❌ Si aparece el nombre completo, hay un problema</p>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold mb-2">Botones de prueba:</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => {
                setSelectedValue("MAD");
                addLog('Valor establecido programáticamente: "MAD"');
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Set "MAD"
            </button>
            <button 
              onClick={() => {
                setSelectedValue("NYC");
                addLog('Valor establecido programáticamente: "NYC"');
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Set "NYC"
            </button>
            <button 
              onClick={() => {
                setSelectedValue("");
                addLog('Valor limpiado');
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded">
          <h3 className="font-semibold mb-2">Log de eventos:</h3>
          <div className="space-y-1 text-sm font-mono">
            {logs.length === 0 ? (
              <p className="text-gray-500">No hay eventos aún</p>
            ) : (
              logs.map((log, index) => (
                <p key={index} className="bg-white p-1 rounded border">
                  {log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
