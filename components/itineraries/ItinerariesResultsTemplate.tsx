'use client';

import React, { Suspense } from 'react';
import { ItinerarySharedCard } from './ItinerarySharedCard';
import { colombiaItineraries } from '@/lib/data/mock-datavf';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Clock,
  Star,
  Users
} from 'lucide-react';

interface ItinerariesResultsTemplateProps {
  origin?: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

export function ItinerariesResultsTemplate({
  origin = "Santo Domingo",
  destination = "Colombia",
  startDate,
  endDate,
  className = ""
}: ItinerariesResultsTemplateProps) {

  const formatDateRange = (start?: Date, end?: Date) => {
    if (!start || !end) return "Fechas flexibles";
    
    const startStr = start.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
    const endStr = end.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
    
    return `${startStr} - ${endStr}`;
  };

  return (
      <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
    <div className={`space-y-6 ${className}`}>
      {/* Header con información de búsqueda */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Itinerarios de {origin} a {destination}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{origin} → {destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDateRange(startDate, endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{colombiaItineraries.length} itinerarios encontrados</span>
              </div>
            </div>
          </div>
       
        </div>
      </div>

      {/* Grid de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {colombiaItineraries.map((itinerary) => (
          <div key={itinerary.id} className="relative">
            <ItinerarySharedCard
              id={itinerary.id}
              title={itinerary.title}
              coverImage={itinerary.coverImage}
              startDate={itinerary.startDate}
              endDate={itinerary.endDate}
              price={itinerary.price}
              creator={itinerary.creator}
              participants={itinerary.participants}
              cities={itinerary.cities}
              lodgingCount={itinerary.lodgingCount}
              experienceCount={itinerary.experienceCount}
              transportSummary={itinerary.transportSummary}
              isPriceEstimated={itinerary.isPriceEstimated}
            />
            
            {/* Badges adicionales */}
            <div className="absolute top-3 left-3 space-y-1 gap-2">
              {itinerary.discount && (
                <Badge className="bg-red-500 text-white text-xs">
                  -{itinerary.discount}%
                </Badge>
              )}
              {itinerary.availableSpots <= 2 && (
                <Badge variant="destructive" className="text-xs">
                  ¡Solo {itinerary.availableSpots} cupos!
                </Badge>
              )}
            </div>

            {/* Rating y duración overlay */}
            <div className="absolute top-3 right-3  flex gap-2 items-center">
              <Badge className="bg-black/70 text-white text-xs backdrop-blur-sm h-full">
                <Star className="w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {itinerary.rating}
              </Badge>
              <Badge variant="secondary" className=" text-xs h-full">
                <Clock className="w-3 mr-1" />
                {itinerary.duration}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con información adicional */}
      <div className="bg-muted/50 rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          ¿No encuentras lo que buscas?{' '}
          <Button variant="link" className="p-0 h-auto text-sm">
            Solicita un itinerario personalizado
          </Button>
        </p>
      </div>
    </div>
    </Suspense>
  );
}