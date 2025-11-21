'use client';

import React, { useState } from 'react';
import CustomCruiseCard from '@/components/transport/Cruises/CustomCruiseCard';
import { mockCruises } from '@/lib/data/cruises-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CruiseCardDemo() {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'compact' | 'featured'>('default');
  const [selectedCruiseIndex, setSelectedCruiseIndex] = useState(0);

  const handleSave = (cruiseId: string) => {
    console.log('💾 Crucero guardado:', cruiseId);
  };

  const handleShare = (cruiseId: string) => {
    console.log('🔗 Crucero compartido:', cruiseId);
  };

  const handleClick = (cruiseId: string) => {
    console.log('👆 Crucero clickeado:', cruiseId);
  };

  const handleCabinSelect = (cruiseId: string, cabinType: string) => {
    console.log('🛏️ Cabina seleccionada:', { cruiseId, cabinType });
  };

  const currentCruise = mockCruises[selectedCruiseIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Custom Cruise Card Demo</h1>
          <p className="text-lg text-gray-600">
            Componente de cruceros compacto con tabs navegables - Inspirado en el diseño de buses
          </p>
        </div>

        {/* Controles */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Controles de Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selector de variante */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Variante del Card:</label>
              <div className="flex gap-2">
                {['default', 'compact', 'featured'].map((variant) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? 'default' : 'outline'}
                    onClick={() => setSelectedVariant(variant as any)}
                    className="capitalize"
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selector de crucero */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Crucero:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockCruises.map((cruise, index) => (
                  <Button
                    key={cruise.id}
                    variant={selectedCruiseIndex === index ? 'default' : 'outline'}
                    onClick={() => setSelectedCruiseIndex(index)}
                    className="text-left h-auto p-3 flex flex-col items-start"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {cruise.cruiseLine.name}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {cruise.itinerary.durationNights}n
                      </Badge>
                    </div>
                    <span className="font-medium text-sm line-clamp-1">{cruise.ship.name}</span>
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {cruise.itinerary.startPort} → {cruise.itinerary.endPort}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Info del crucero actual */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-lg text-blue-900 mb-3">{currentCruise.ship.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 font-medium">Línea:</span>
                  <p className="text-blue-900">{currentCruise.cruiseLine.name}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Duración:</span>
                  <p className="text-blue-900">{currentCruise.itinerary.durationNights} noches</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Precio desde:</span>
                  <p className="text-blue-900 font-bold">
                    {Math.min(...currentCruise.cabinOptions.map(c => c.price)).toLocaleString()} {currentCruise.cabinOptions[0].currency}
                  </p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Disponibilidad:</span>
                  <p className={`font-bold ${currentCruise.availability.remainingCabins > 50 ? 'text-green-600' : 
                    currentCruise.availability.remainingCabins > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {currentCruise.availability.remainingCabins} cabinas
                  </p>
                </div>
              </div>
              
              {/* Paradas destacadas */}
              <div className="mt-4">
                <span className="text-blue-600 font-medium">Paradas principales:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentCruise.itinerary.stops.slice(0, 4).map((stop, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-blue-300 text-blue-700">
                      {stop.port}, {stop.country}
                    </Badge>
                  ))}
                  {currentCruise.itinerary.stops.length > 4 && (
                    <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                      +{currentCruise.itinerary.stops.length - 4} más
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Demo Principal */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Vista Previa del Card</h2>
          
          <div className={`flex justify-center ${selectedVariant === 'compact' ? 'items-start' : ''}`}>
            <div className={selectedVariant === 'compact' ? 'w-full max-w-2xl' : 'w-full max-w-lg'}>
              <CustomCruiseCard
                cruise={currentCruise}
                variant={selectedVariant}
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
                onCabinSelect={handleCabinSelect}
              />
            </div>
          </div>
        </div>

        {/* Comparación de variantes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Comparación de Variantes</h2>
          
          {/* Variante Compact */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">🔹 Variante Compact (Para listas y búsquedas)</h3>
            <CustomCruiseCard
              cruise={mockCruises[0]}
              variant="compact"
              onSave={handleSave}
              onShare={handleShare}
              onClick={handleClick}
            />
          </div>

          {/* Variante Default y Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">🔹 Variante Default</h3>
              <CustomCruiseCard
                cruise={mockCruises[1]}
                variant="default"
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
                onCabinSelect={handleCabinSelect}
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">🔹 Variante Featured (Destacado)</h3>
              <CustomCruiseCard
                cruise={mockCruises[2]}
                variant="featured"
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
                onCabinSelect={handleCabinSelect}
              />
            </div>
          </div>
        </div>

        {/* Grid de todos los cruceros */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Galería de Todos los Cruceros</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCruises.map((cruise, index) => (
              <CustomCruiseCard
                key={cruise.id}
                cruise={cruise}
                variant={index === 0 ? 'featured' : 'default'}
                onSave={handleSave}
                onShare={handleShare}
                onClick={handleClick}
                onCabinSelect={handleCabinSelect}
              />
            ))}
          </div>
        </div>

        {/* JSON del crucero actual */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Estructura de Datos (JSON)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-auto text-xs max-h-96">
              {JSON.stringify(currentCruise, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Características destacadas */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-primary">🚢 Características del Nuevo Diseño</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ Diseño Compacto</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Estructura inspirada en BusCard</li>
                  <li>• Tabs navegables organizados</li>
                  <li>• Información jerarquizada</li>
                  <li>• Responsive y optimizado</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">🎯 Tabs Funcionales</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Información del Crucero</li>
                  <li>• Amenidades a bordo</li>
                  <li>• Itinerario completo</li>
                  <li>• Políticas y términos</li>
                  <li>• Selector de cabinas</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">🚀 UX Mejorada</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Selección visual de cabinas</li>
                  <li>• Resumen de reserva integrado</li>
                  <li>• Navegación intuitiva</li>
                  <li>• Estados visuales claros</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
