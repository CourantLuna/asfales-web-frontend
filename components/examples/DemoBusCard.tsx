'use client';

import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CustomBusCard from '@/components/transport/Buses/CustomBusCard';
import { mockBusTrips } from '@/lib/data/bus-trips-data';

export default function BusCardDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
       

        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CustomBusCard Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demostración completa del componente CustomBusCard con diferentes variantes y datos reales
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary">5 Viajes de ejemplo</Badge>
            <Badge variant="secondary">4 Variantes</Badge>
            <Badge variant="secondary">Múltiples países</Badge>
            <Badge variant="secondary">Diferentes operadores</Badge>
          </div>
        </div>

        {/* Variante Default */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🚌 Variante Default
              <Badge variant="outline">variant="default"</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Suspense fallback={<div>Cargando...</div>}>
                <CustomBusCard 
                  busTrip={mockBusTrips[0]} 
                  variant="default" 
                />
              </Suspense>
            </div>
          </CardContent>
        </Card>

        {/* Variante Compact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              📱 Variante Compact
              <Badge variant="outline">variant="compact"</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<div>Cargando...</div>}>
                <CustomBusCard 
                  busTrip={mockBusTrips[1]} 
                  variant="compact"
                  
                />
                {/* <CustomBusCard 
                  busTrip={mockBusTrips[2]} 
                  variant="compact" 
                /> */}
              </Suspense>
            </div>
          </CardContent>
        </Card>

        {/* Variante Featured */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              ⭐ Variante Featured
              <Badge variant="outline">variant="featured"</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Suspense fallback={<div>Cargando...</div>}>
                <CustomBusCard 
                  busTrip={mockBusTrips[3]} 
                  variant="featured" 
                />
              </Suspense>
            </div>
          </CardContent>
        </Card>

        {/* Variante Detailed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              📋 Variante Detailed
              <Badge variant="outline">variant="detailed"</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Suspense fallback={<div>Cargando...</div>}>
                <CustomBusCard 
                  busTrip={mockBusTrips[4]} 
                  variant="default" 
                />
              </Suspense>
            </div>
          </CardContent>
        </Card>

        {/* Comparación lado a lado */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🔄 Comparación de Variantes
              <Badge variant="outline">Mismo viaje, diferentes vistas</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Compact vs Default */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Compact vs Default</h3>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <Badge className="mb-2">Compact</Badge>
                    <Suspense fallback={<div>Cargando...</div>}>
                      <CustomBusCard 
                        busTrip={mockBusTrips[0]} 
                        variant="compact" 
                      />
                    </Suspense>
                  </div>
                  <div>
                    <Badge className="mb-2">Default</Badge>
                    <Suspense fallback={<div>Cargando...</div>}>
                      <CustomBusCard 
                        busTrip={mockBusTrips[0]} 
                        variant="default" 
                      />
                    </Suspense>
                  </div>
                </div>
              </div>

              {/* Featured vs Detailed */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Featured vs Detailed</h3>
                <div className="grid gap-4 xl:grid-cols-2">
                  <div>
                    <Badge className="mb-2">Featured</Badge>
                    <Suspense fallback={<div>Cargando...</div>}>
                      <CustomBusCard 
                        busTrip={mockBusTrips[1]} 
                        variant="featured" 
                      />
                    </Suspense>
                  </div>
                  <div>
                    <Badge className="mb-2">Detailed</Badge>
                    <Suspense fallback={<div>Cargando...</div>}>
                      <CustomBusCard 
                        busTrip={mockBusTrips[1]} 
                        variant="default" 
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características del componente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🎯 Características del Componente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">📊 Datos Incluidos</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Información del operador</li>
                  <li>• Rutas con paradas</li>
                  <li>• Múltiples clases de precio</li>
                  <li>• Amenidades detalladas</li>
                  <li>• Políticas de equipaje</li>
                  <li>• Disponibilidad en tiempo real</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">🎨 Variantes UI</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Compact:</strong> Vista resumida</li>
                  <li>• <strong>Default:</strong> Vista estándar</li>
                  <li>• <strong>Featured:</strong> Vista destacada</li>
                  <li>• <strong>Detailed:</strong> Vista completa</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">⚡ Funcionalidades</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Selección de clase interactiva</li>
                  <li>• Visualización de amenidades</li>
                  <li>• Información de paradas</li>
                  <li>• Cálculo de duración</li>
                  <li>• Estados de disponibilidad</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos de prueba */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🗃️ Datos de Prueba</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockBusTrips.map((trip, index) => (
                <div key={trip.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <span className="font-semibold">{trip.operator.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {trip.origin.city} → {trip.destination.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {trip.isDirect ? 'Directo' : `${trip.stops.length} paradas`} • 
                    {Math.floor(trip.durationMinutes / 60)}h {trip.durationMinutes % 60}m
                  </p>
                  <div className="flex gap-1 mt-2">
                    {trip.prices.map((price) => (
                      <Badge key={price.class} variant="secondary" className="text-xs">
                        {price.class}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-gray-600">
          <p>CustomBusCard Component Demo - Asfales Travel Platform</p>
          <p className="text-sm mt-2">Componente totalmente funcional con datos de ejemplo realistas</p>
        </div>
      </div>
    </div>
  );
}


