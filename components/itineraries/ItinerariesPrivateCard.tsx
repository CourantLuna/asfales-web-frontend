'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Calendar, Hotel, Plane, Ship, Bus, Tickets, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipos para el card de itinerario privado
interface ItineraryAccommodation {
  type: 'hotel' | 'apartment' | 'house' | 'resort';
  typeName: string;
  count: number;
}

interface ItineraryTransport {
  type: 'flight' | 'cruise' | 'bus' | 'train';
  typeName: string;
  count: number;
}

interface ItineraryExperience {
  count: number;
}

export interface ItinerariesPrivateCardProps {
  id: string;
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  accommodations: ItineraryAccommodation[];
  transports: ItineraryTransport[];
  experiences: ItineraryExperience;
  estimatedBudgetPerPerson: number;
  currency: string;
  destination?: string;
  onInvitePeople?: (itineraryId: string) => void;
  onClick?: (itineraryId: string) => void;
}

// Iconos para tipos de transporte
const getTransportIcon = (type: string) => {
  switch (type) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'cruise': return <Ship className="w-4 h-4" />;
    case 'bus': return <Bus className="w-4 h-4" />;
    case 'train': return <Bus className="w-4 h-4" />;
    default: return <Plane className="w-4 h-4" />;
  }
};

// Función para calcular días restantes
const getDaysUntilTrip = (startDate: Date) => {
  const now = new Date();
  const timeDiff = startDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) {
    return 'Completado';
  } else if (daysDiff === 0) {
    return 'Hoy';
  } else if (daysDiff === 1) {
    return 'Mañana';
  } else if (daysDiff <= 30) {
    return `${daysDiff} días`;
  } else {
    return formatDistanceToNow(startDate, { locale: es, addSuffix: true });
  }
};

// Función para formatear fechas
const formatDateRange = (startDate: Date, endDate: Date) => {
  const start = startDate.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  });
  const end = endDate.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
  return `${start} - ${end}`;
};

export function ItinerariesPrivateCard({
  id,
  title,
  imageUrl,
  startDate,
  endDate,
  accommodations,
  transports,
  experiences,
  estimatedBudgetPerPerson,
  currency,
  destination,
  onInvitePeople,
  onClick
}: ItinerariesPrivateCardProps) {

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleInviteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInvitePeople) {
      onInvitePeople(id);
    }
  };

  return (
  <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <div
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.015] bg-white"
      onClick={handleCardClick}
    >
      {/* Imagen de fondo con overlay */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Botón Invitar */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
          onClick={handleInviteClick}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Invitar
        </Button>

        {/* Badge de días restantes */}
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 bg-primary text-white text-[11px] font-medium px-2 py-1 rounded-full shadow-sm"
        >
          {getDaysUntilTrip(startDate)}
        </Badge>

        {/* Contenido del card */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          {/* Título */}
          <h2 className="text-xl font-bold line-clamp-2">{title}</h2>

          {/* Fechas */}
          <div className="flex items-center text-sm text-white/90">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDateRange(startDate, endDate)}
          </div>

          {/* Detalles del viaje */}
          <div className="space-y-2 text-sm text-white/90">
            {/* Alojamientos */}
            {accommodations.length > 0 && (
              <div className="flex items-start">
                <Hotel className="w-4 h-4 mt-0.5 mr-2" />
                <span className="leading-snug">
                  {accommodations.map((acc, index) => (
                    <span key={index}>
                      {acc.count} {acc.typeName}
                      {index < accommodations.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            )}

            {/* Transportes */}
            {transports.length > 0 && (
              <div className="flex items-start">
                <div className="w-4 h-4 mt-0.5 mr-2">{getTransportIcon(transports[0]?.type)}</div>
                <span className="leading-snug">
                  {transports.map((transport, index) => (
                    <span key={index}>
                      {transport.count} {transport.typeName}
                      {index < transports.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            )}

            {/* Experiencias */}
            {experiences?.count > 0 && (
              <div className="flex items-center">
                <Tickets className="w-4 h-4 mr-2" />
                {experiences.count} experiencia
                {experiences.count !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Presupuesto */}
          <div className="flex items-center pt-2 text-base font-semibold">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>
              {currency}{" "}
              {estimatedBudgetPerPerson.toLocaleString()}{" "}
              <span className="text-sm font-normal text-white/70">por persona</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
  );
}