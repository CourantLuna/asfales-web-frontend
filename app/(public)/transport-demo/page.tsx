"use client";

import { useState } from 'react';
import { PassengerSelector, type PassengerGroup } from '@/components/shared/standard-fields-component/PassengerSelector';
import { GuestSelector, type Room } from '@/components/shared/standard-fields-component/GuestSelector';
import { DateRangePickerCustom } from '@/components/ui/date-range-picker-custom';
import { StandardSearchField } from '@/components/shared/standard-fields-component/StandardSearchField';
import { Plane, MapPin } from 'lucide-react';
import TravelSearchBarMobile from '@/components/shared/TravelSearchBarMobile';

export default function TransportExamplePage() {
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });
  const [guests, setGuests] = useState<Room[]>([{
    id: 'room-1',
    adults: 2,
    children: [],
  }]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [flexibleDateRange, setFlexibleDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [searchValue, setSearchValue] = useState('');

  const dataSources = [
    {
      id: 'airports',
      label: 'Airports',
      icon: <Plane className="w-4 h-4" />,
      type: 'airport' as const,
      options: [],
      nameValueField: 'code',
      nameLabelField: 'name',
    },
    {
      id: 'cities',
      label: 'Cities', 
      icon: <MapPin className="w-4 h-4" />,
      type: 'city' as const,
      options: [],
      nameValueField: 'code',
      nameLabelField: 'name',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Mobile Fullscreen Popover Demo & Flexible Dates
            </h1>
            <p className="text-gray-600 mb-8">
              En mobile (md hacia abajo) todos los campos abrirán en pantalla completa con header y botón de cerrar. 
              <br />
              Puedes cerrar con <kbd className="bg-gray-200 px-2 py-1 rounded">Enter</kbd> o con el botón X.
              <br />
              <strong>NUEVO:</strong> Prueba las fechas flexibles - cuando selecciones fechas flexibles, verás el formato "[duración] in [meses]"
            </p>
          </div>

          {/* Individual Components Demo */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Componentes Individuales</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* PassengerSelector */}
              <div>
                <h3 className="text-sm font-medium mb-2">PassengerSelector</h3>
                <PassengerSelector
                  label="Pasajeros"
                  onPassengersChange={setPassengers}
                />
              </div>

              {/* GuestSelector */}
              <div>
                <h3 className="text-sm font-medium mb-2">GuestSelector</h3>
                <GuestSelector
                  label="Huéspedes"
                  onRoomsChange={setGuests}
                />
              </div>

              {/* DateRangePickerCustom - Calendar Mode */}
              <div>
                <h3 className="text-sm font-medium mb-2">DateRangePickerCustom (Calendar Default)</h3>
                <DateRangePickerCustom
                  label="Fechas (Calendario)"
                  value={dateRange}
                  onChange={setDateRange}
                  defaultActiveTab="calendar"
                />
              </div>

              {/* DateRangePickerCustom - Flexible Mode */}
              <div>
                <h3 className="text-sm font-medium mb-2">DateRangePickerCustom (Flexible Default)</h3>
                <DateRangePickerCustom
                  label="Fechas (Flexibles)"
                  value={flexibleDateRange}
                  onChange={setFlexibleDateRange}
                  defaultActiveTab="flexible"
                  placeholder="Selecciona fechas flexibles"
                />
              </div>

              {/* StandardSearchField */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-2">StandardSearchField</h3>
                <StandardSearchField
                  label="Buscar destino"
                  placeholder="¿A dónde quieres ir?"
                  value={searchValue}
                  onValueChange={setSearchValue}
                  dataSources={dataSources}
                />
              </div>

            </div>
          </div>

          {/* Flexible Dates Test */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">
              �️ Prueba Fechas Flexibles
            </h3>
            <div className="space-y-3 text-yellow-800">
              <div className="flex items-start gap-3">
                <span className="font-semibold">Instrucciones:</span>
                <span>Usa el campo "DateRangePickerCustom (Flexible Default)" de arriba</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">1.</span>
                <span>Ve al tab "Fechas flexibles"</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">2.</span>
                <span>Selecciona una duración (ej: "2-3 noches")</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">3.</span>
                <span>Selecciona uno o más meses (ej: Julio, Agosto, Septiembre)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">4.</span>
                <span>El label debería cambiar inmediatamente a: "2-3 noches in Julio. Agosto. Septiembre"</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">Resultado esperado:</span>
                <span className="bg-yellow-200 px-2 py-1 rounded font-mono text-sm">[duración] in [mes1. mes2. mes3...]</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              � Instrucciones para probar
            </h3>
            <div className="space-y-3 text-blue-800">
              <div className="flex items-start gap-3">
                <span className="font-semibold">Desktop:</span>
                <span>Los campos abren popover normal como antes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">Mobile (md ↓):</span>
                <span>Los campos abren en pantalla completa con header y acciones</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">Cerrar modal:</span>
                <span>Botón X en el header o tecla Enter desde cualquier lugar</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold">Componentes:</span>
                <span>PassengerSelector, GuestSelector, DateRangePickerCustom, StandardSearchField</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              ✅ Características implementadas
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-800">
              <div>
                <h4 className="font-semibold mb-2">📱 Mobile Fullscreen</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Pantalla completa en mobile</li>
                  <li>• Header con título y acciones</li>
                  <li>• Scroll del contenido</li>
                  <li>• Prevención de cierre accidental</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🗓️ Fechas Flexibles</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Label dinámico con formato especial</li>
                  <li>• "[duración] in [meses]" automático</li>
                  <li>• Actualización en tiempo real</li>
                  <li>• Múltiples meses seleccionables</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎮 Controles</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Botón X para cerrar</li>
                  <li>• Tecla Enter para cerrar</li>
                  <li>• Hint visual de Enter (desktop)</li>
                  <li>• Popover normal en desktop</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔧 Técnico</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Detección automática de mobile</li>
                  <li>• Wrapper reutilizable</li>
                  <li>• Props configurables</li>
                  <li>• TypeScript completo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TravelSearchBarMobile/>
    </div>
  );
}
