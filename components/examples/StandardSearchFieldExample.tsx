import React, { useState } from 'react';
import { StandardSearchField } from '../shared/standard-fields-component/StandardSearchField';
import { MapPin } from 'lucide-react';

const cityData = [
  { id: 'madrid', name: 'Madrid', description: 'Capital de España' },
  { id: 'barcelona', name: 'Barcelona', description: 'Ciudad condal' },
  { id: 'valencia', name: 'Valencia', description: 'Ciudad de las artes' },
  { id: 'sevilla', name: 'Sevilla', description: 'Ciudad del flamenco' },
];

const dataSources = [
  {
    id: 'cities',
    label: 'Ciudades',
    icon: <MapPin className="h-4 w-4" />,
    type: 'city' as const,
    options: cityData,
    nameLabelField: 'name',
    nameValueField: 'id',
    nameDescriptionField: 'description'
  }
];

/**
 * Componente de ejemplo que demuestra el uso del StandardSearchField
 * con la nueva funcionalidad de botón "X" para limpiar selección
 */
export const StandardSearchFieldExample = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">StandardSearchField - Botón Clear Selection</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Variante Default</h2>
        <StandardSearchField
          label="Ciudad de origen"
          placeholder="Selecciona una ciudad"
          value={selectedCity}
          onValueChange={setSelectedCity}
          dataSources={dataSources}
          required
        />
        <p className="text-sm text-gray-600">
          Valor seleccionado: <code>{selectedCity || 'ninguno'}</code>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Variante Compact</h2>
        <StandardSearchField
          label="Ciudad de destino"
          placeholder="Selecciona una ciudad"
          value={selectedDestination}
          onValueChange={setSelectedDestination}
          dataSources={dataSources}
          variant="compact"
        />
        <p className="text-sm text-gray-600">
          Valor seleccionado: <code>{selectedDestination || 'ninguno'}</code>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Instrucciones</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Selecciona una ciudad en cualquiera de los campos</li>
          <li>• Verás que aparece un botón "X" a la derecha cuando hay un valor seleccionado</li>
          <li>• Haz clic en el botón "X" para limpiar la selección</li>
          <li>• El botón "X" funciona tanto en la variante default como en la compact</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Resetear todo</h2>
        <button
          onClick={() => {
            setSelectedCity('');
            setSelectedDestination('');
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Limpiar ambos campos
        </button>
      </div>
    </div>
  );
};

export default StandardSearchFieldExample;
