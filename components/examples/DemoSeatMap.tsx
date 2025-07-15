'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SeatMap, { Seat, SeatMapConfig } from '@/components/shared/SeatMap';

export default function SeatMapDemoPage() {
  // Configuración para bus
  const busConfig: SeatMapConfig = {
    type: 'bus',
    rows: 12,
    columnsPerRow: 4,
    orientation: 'vertical',
    seatLayout: {
      left: 2,
      right: 2
    }
  };

  // Configuración para bus horizontal
  const busHorizontalConfig: SeatMapConfig = {
    type: 'bus',
    rows: 12,
    columnsPerRow: 4,
    orientation: 'horizontal',
    seatLayout: {
      left: 2,
      right: 2
    }
  };

  // Configuración para avión pequeño
  const airplaneSmallConfig: SeatMapConfig = {
    type: 'airplane',
    rows: 20,
    columnsPerRow: 6,
    orientation: 'vertical',
    seatLayout: {
      left: 3,
      right: 3
    },
    classLayout: {
      'Primera Clase': { startRow: 1, endRow: 3, class: 'first' },
      'Clase Ejecutiva': { startRow: 4, endRow: 7, class: 'business' },
      'Económica Premium': { startRow: 8, endRow: 12, class: 'premium' },
      'Económica': { startRow: 13, endRow: 20, class: 'economy' }
    }
  };

  // Configuración para avión pequeño horizontal
  const airplaneSmallHorizontalConfig: SeatMapConfig = {
    type: 'airplane',
    rows: 15,
    columnsPerRow: 6,
    orientation: 'horizontal',
    seatLayout: {
      left: 3,
      right: 3
    },
    classLayout: {
      'Primera Clase': { startRow: 1, endRow: 3, class: 'first' },
      'Clase Ejecutiva': { startRow: 4, endRow: 7, class: 'business' },
      'Económica Premium': { startRow: 8, endRow: 12, class: 'premium' },
      'Económica': { startRow: 13, endRow: 15, class: 'economy' }
    }
  };

  // Configuración para avión grande
  const airplaneLargeConfig: SeatMapConfig = {
    type: 'airplane',
    rows: 30,
    columnsPerRow: 9,
    orientation: 'vertical',
    seatLayout: {
      left: 3,
      right: 3,
      aisles: [3, 6] // Dos pasillos
    },
    classLayout: {
      'Primera Clase': { startRow: 1, endRow: 4, class: 'first' },
      'Clase Ejecutiva': { startRow: 5, endRow: 10, class: 'business' },
      'Económica Premium': { startRow: 11, endRow: 18, class: 'premium' },
      'Económica': { startRow: 19, endRow: 30, class: 'economy' }
    }
  };

  // Generar asientos para demostración
  const generateDemoSeats = (config: SeatMapConfig): Seat[] => {
    const seats: Seat[] = [];
    const columnLabels = Array.from({ length: config.columnsPerRow }, (_, i) => 
      String.fromCharCode(65 + i)
    );

    for (let row = 1; row <= config.rows; row++) {
      for (let colIndex = 0; colIndex < config.columnsPerRow; colIndex++) {
        const column = columnLabels[colIndex];
        
        // Determinar clase del asiento basado en la fila
        let seatClass: 'economy' | 'premium' | 'business' | 'first' = 'economy';
        if (config.classLayout) {
          for (const [_, classInfo] of Object.entries(config.classLayout)) {
            if (row >= classInfo.startRow && row <= classInfo.endRow) {
              seatClass = classInfo.class;
              break;
            }
          }
        }

        // Simular disponibilidad (80% disponible)
        const isOccupied = Math.random() < 0.2;
        
        seats.push({
          id: `${row}${column}`,
          row,
          column,
          status: isOccupied ? 'occupied' : 'available',
          class: seatClass,
          price: seatClass === 'first' ? 2000 : 
                 seatClass === 'business' ? 1200 : 
                 seatClass === 'premium' ? 800 : 400,
          features: seatClass === 'first' ? ['Cama completamente plana', 'Comida gourmet', 'Acceso lounge'] :
                   seatClass === 'business' ? ['Asiento reclinable', 'Comida premium', 'Entretenimiento'] :
                   seatClass === 'premium' ? ['Espacio extra', 'Embarque prioritario'] :
                   ['Asiento estándar']
        });
      }
    }

    return seats;
  };

  // Estados para cada demo
  const [busSeats] = useState(() => generateDemoSeats(busConfig));
  const [busHorizontalSeats] = useState(() => generateDemoSeats(busHorizontalConfig));
  const [airplaneSmallSeats] = useState(() => generateDemoSeats(airplaneSmallConfig));
  const [airplaneSmallHorizontalSeats] = useState(() => generateDemoSeats(airplaneSmallHorizontalConfig));
  const [airplaneLargeSeats] = useState(() => generateDemoSeats(airplaneLargeConfig));

  const [busSelectedSeats, setBusSelectedSeats] = useState<string[]>([]);
  const [busHorizontalSelectedSeats, setBusHorizontalSelectedSeats] = useState<string[]>([]);
  const [airplaneSmallSelectedSeats, setAirplaneSmallSelectedSeats] = useState<string[]>([]);
  const [airplaneSmallHorizontalSelectedSeats, setAirplaneSmallHorizontalSelectedSeats] = useState<string[]>([]);
  const [airplaneLargeSelectedSeats, setAirplaneLargeSelectedSeats] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SeatMap Component Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Componente reutilizable para mapas de asientos - Buses, Aviones y más
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary">Reutilizable</Badge>
            <Badge variant="secondary">Interactivo</Badge>
            <Badge variant="secondary">SVG Icons</Badge>
            <Badge variant="secondary">Multi-transporte</Badge>
          </div>
        </div>

        {/* Demo de Bus */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🚌 Mapa de Asientos - Bus (Vista Vertical)
              <Badge variant="outline">48 asientos total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap
              config={busConfig}
              seats={busSeats}
              selectedSeats={busSelectedSeats}
              onSeatSelect={(seatId) => setBusSelectedSeats(prev => [...prev, seatId])}
              onSeatDeselect={(seatId) => setBusSelectedSeats(prev => prev.filter(id => id !== seatId))}
              maxSelections={2}
              showLegend={true}
              showClassInfo={false}
            />
          </CardContent>
        </Card>

        {/* Demo de Bus Horizontal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🚌 Mapa de Asientos - Bus (Vista Horizontal)
              <Badge variant="outline">48 asientos total</Badge>
              <Badge variant="secondary">Nuevo - Vista lateral</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap
              config={busHorizontalConfig}
              seats={busHorizontalSeats}
              selectedSeats={busHorizontalSelectedSeats}
              onSeatSelect={(seatId) => setBusHorizontalSelectedSeats(prev => [...prev, seatId])}
              onSeatDeselect={(seatId) => setBusHorizontalSelectedSeats(prev => prev.filter(id => id !== seatId))}
              maxSelections={2}
              showLegend={true}
              showClassInfo={false}
            />
          </CardContent>
        </Card>

        {/* Demo de Avión Pequeño */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              ✈️ Mapa de Asientos - Avión Pequeño (Vista Vertical)
              <Badge variant="outline">120 asientos, 4 clases</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap
              config={airplaneSmallConfig}
              seats={airplaneSmallSeats}
              selectedSeats={airplaneSmallSelectedSeats}
              onSeatSelect={(seatId) => setAirplaneSmallSelectedSeats(prev => [...prev, seatId])}
              onSeatDeselect={(seatId) => setAirplaneSmallSelectedSeats(prev => prev.filter(id => id !== seatId))}
              maxSelections={1}
              showLegend={true}
              showClassInfo={true}
            />
          </CardContent>
        </Card>

        {/* Demo de Avión Pequeño Horizontal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              ✈️ Mapa de Asientos - Avión Pequeño (Vista Horizontal)
              <Badge variant="outline">90 asientos, 4 clases</Badge>
              <Badge variant="secondary">Nuevo - Vista lateral</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap
              config={airplaneSmallHorizontalConfig}
              seats={airplaneSmallHorizontalSeats}
              selectedSeats={airplaneSmallHorizontalSelectedSeats}
              onSeatSelect={(seatId) => setAirplaneSmallHorizontalSelectedSeats(prev => [...prev, seatId])}
              onSeatDeselect={(seatId) => setAirplaneSmallHorizontalSelectedSeats(prev => prev.filter(id => id !== seatId))}
              maxSelections={1}
              showLegend={true}
              showClassInfo={true}
            />
          </CardContent>
        </Card>

        {/* Demo de Avión Grande */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🛫 Mapa de Asientos - Avión Grande
              <Badge variant="outline">270 asientos, configuración 3-3-3</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SeatMap
              config={airplaneLargeConfig}
              seats={airplaneLargeSeats}
              selectedSeats={airplaneLargeSelectedSeats}
              onSeatSelect={(seatId) => setAirplaneLargeSelectedSeats(prev => [...prev, seatId])}
              onSeatDeselect={(seatId) => setAirplaneLargeSelectedSeats(prev => prev.filter(id => id !== seatId))}
              maxSelections={3}
              showLegend={true}
              showClassInfo={true}
            />
          </CardContent>
        </Card>

        {/* Características del componente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🎯 Características del SeatMap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">🔧 Configuración</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tipos: Bus, Avión, Tren</li>
                  <li>• <strong>Orientación:</strong> Vertical u Horizontal</li>
                  <li>• Layout flexible (2+2, 3+3, 3+3+3)</li>
                  <li>• Múltiples clases de servicio</li>
                  <li>• Configuración de pasillos</li>
                  <li>• Nomenclatura automática</li>
                  <li>• Estados personalizables</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">🎨 Características UI</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>SVG Icons:</strong> outlined-chair.svg base</li>
                  <li>• <strong>Tooltips:</strong> Información detallada en hover</li>
                  <li>• <strong>Estados:</strong> Disponible, Ocupado, Seleccionado</li>
                  <li>• <strong>Clases:</strong> Economy, Premium, Business, First</li>
                  <li>• <strong>Vista:</strong> Vertical (arriba-abajo) u Horizontal (lateral)</li>
                  <li>• <strong>Responsive:</strong> Se adapta a pantallas</li>
                  <li>• <strong>Accesibilidad:</strong> Tooltips y estados</li>
                  <li>• <strong>Animaciones:</strong> Hover y transiciones</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">⚡ Funcionalidades</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Selección múltiple configurable</li>
                  <li>• Callbacks de selección/deselección</li>
                  <li>• Leyenda automática</li>
                  <li>• Información de clases</li>
                  <li>• Validación de límites</li>
                  <li>• Estado de asientos persistente</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Código de uso */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">💻 Ejemplo de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`import SeatMap, { SeatMapConfig, Seat } from '@/components/shared/SeatMap';

const config: SeatMapConfig = {
  type: 'airplane',
  rows: 20,
  columnsPerRow: 6,
  orientation: 'horizontal', // 'vertical' | 'horizontal'
  seatLayout: { left: 3, right: 3 },
  classLayout: {
    'Business': { startRow: 1, endRow: 5, class: 'business' },
    'Economy': { startRow: 6, endRow: 20, class: 'economy' }
  }
};

<SeatMap
  config={config}
  seats={seats}
  selectedSeats={selectedSeats}
  onSeatSelect={handleSeatSelect}
  onSeatDeselect={handleSeatDeselect}
  maxSelections={2}
  showLegend={true}
  showClassInfo={true}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-gray-600">
          <p>SeatMap Component - Asfales Travel Platform</p>
          <p className="text-sm mt-2">Componente reutilizable para cualquier tipo de transporte</p>
        </div>
      </div>
    </div>
  );
}
