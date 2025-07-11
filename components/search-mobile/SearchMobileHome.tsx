'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Plane, Calendar, Users, Clock, MapPin, BadgePercent } from "lucide-react";

interface RecentSearch {
  id: string;
  type: 'hotel' | 'flight';
  destination: string;
  dates: string;
  passengers: string;
  icon?: React.ReactNode;
  extraInfo?: string;
  origin?: string;
}

export default function SearchMobileHome() {
  // Datos de ejemplo para búsquedas recientes
  const recentSearches: RecentSearch[] = [
    {
      id: '1',
      type: 'hotel',
      destination: 'Boca Chica, República Dominicana',
      dates: '25 jul. - 29 jul.',
      passengers: '2 huéspedes',
      extraInfo: '1 habitación',
      icon: <Building2 className="h-6 w-6 text-primary" />
    },
    {
      id: '2',
      type: 'flight',
      origin: 'Las Americas Intl. Airport (SDQ)',
      destination: 'Nueva York (NYC)',
      dates: '7 nov. - 22 nov.',
      passengers: '1 persona',
      icon: <Plane className="h-6 w-6 text-primary" />
    },
    {
      id: '3',
      type: 'hotel',
      destination: 'Medellín, Colombia',
      dates: '14 jul. - 15 jul.',
      passengers: '2 huéspedes',
      extraInfo: '1 habitación',
      icon: <Building2 className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 pb-32">
      {/* Ofertas Especiales */}
      <Card className="bg-blue-50 p-4 rounded-xl border-0 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 rounded-full p-3">
            <BadgePercent className="h-8 w-8 text-primary" />
            {/* <img 
              src="/menu-icons/discount.svg" 
              alt="Ofertas" 
              className="w-8 h-8"
            /> */}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-blue-900">
              Consulta las últimas ofertas de vuelos que tenemos para ti
            </h2>
            <Button 
              variant="link" 
              className="px-0 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Buscar ofertas
            </Button>
          </div>
        </div>
      </Card>

      {/* Búsquedas Recientes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Búsquedas recientes</h2>
        <div className="flex flex-col gap-3">
          {recentSearches.map((search) => (
            <Card 
              key={search.id}
              className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                <div className="bg-blue-50 rounded-full justify-center flex-col flex p-2 w-auto h-10 w-10 items-center">
                  {search.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{search.destination}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{search.dates}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{search.passengers}</span>
                    </div>
                    {search.extraInfo && (
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{search.extraInfo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Destinos Populares */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Destinos populares</h2>
        <div className="grid grid-cols-2 gap-3">
          {['Punta Cana', 'Cartagena', 'Miami', 'Cancún'].map((destination) => (
            <Card 
              key={destination}
              className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{destination}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action - Planificación */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-0">
        <div className="flex items-start gap-4">
          <div className="bg-white/80 rounded-full p-2">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              ¿Planeas un viaje pronto?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Encuentra las mejores opciones para tus fechas
            </p>
           
          </div>
        </div>
         <Button variant="default" className="w-full">
              Comenzar búsqueda
            </Button>
      </Card>
    </div>
  );
}