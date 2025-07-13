'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, UserPlus, Calendar, MapPin, Hotel, Plane, Ship, Bus, Sparkles, DollarSign, Tickets, Mountain } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipos para los itinerarios
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

interface Itinerary {
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
  destination: string;
}

// Datos mock para los itinerarios
const mockItineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Aventura Europea Completa',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    startDate: new Date('2025-08-15'),
    endDate: new Date('2025-08-30'),
    destination: 'París, Francia',
    accommodations: [
      { type: 'hotel', typeName: 'Hotel', count: 3 },
      { type: 'apartment', typeName: 'Apartamento', count: 1 }
    ],
    transports: [
      { type: 'flight', typeName: 'Vuelo', count: 2 },
      { type: 'bus', typeName: 'Bus', count: 3 }
    ],
    experiences: { count: 8 },
    estimatedBudgetPerPerson: 2450,
    currency: 'USD'
  },
  {
    id: '2', 
    title: 'Crucero por el Mediterráneo',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    startDate: new Date('2025-09-10'),
    endDate: new Date('2025-09-17'),
    destination: 'Barcelona, España',
    accommodations: [
      { type: 'resort', typeName: 'Resort', count: 1 }
    ],
    transports: [
      { type: 'cruise', typeName: 'Crucero', count: 1 },
      { type: 'flight', typeName: 'Vuelo', count: 1 }
    ],
    experiences: { count: 5 },
    estimatedBudgetPerPerson: 1890,
    currency: 'USD'
  },
  {
    id: '3',
    title: 'Escapada Cultural en Japón',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    startDate: new Date('2025-11-20'),
    endDate: new Date('2025-12-05'),
    destination: 'Tokio, Japón',
    accommodations: [
      { type: 'hotel', typeName: 'Hotel', count: 2 },
      { type: 'house', typeName: 'Casa', count: 1 }
    ],
    transports: [
      { type: 'flight', typeName: 'Vuelo', count: 2 },
      { type: 'train', typeName: 'Tren', count: 4 }
    ],
    experiences: { count: 12 },
    estimatedBudgetPerPerson: 3250,
    currency: 'USD'
  },
  {
    id: '4',
    title: 'Road Trip por la Costa Oeste',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-07-14'),
    destination: 'California, EE.UU.',
    accommodations: [
      { type: 'hotel', typeName: 'Hotel', count: 5 },
      { type: 'house', typeName: 'Casa', count: 2 }
    ],
    transports: [
      { type: 'flight', typeName: 'Vuelo', count: 1 },
      { type: 'bus', typeName: 'Bus', count: 6 }
    ],
    experiences: { count: 15 },
    estimatedBudgetPerPerson: 2850,
    currency: 'USD'
  }
];

// Iconos para tipos de transporte
const getTransportIcon = (type: string) => {
  switch (type) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'cruise': return <Ship className="w-4 h-4" />;
    case 'bus': return <Bus className="w-4 h-4" />;
    case 'train': return <Bus className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
};

// Función para calcular días restantes
const getDaysUntilTrip = (startDate: Date) => {
  const now = new Date();
  const timeDiff = startDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) {
    return 'Finalizado';
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

export default function MyItineraries() {
  const handleCreateItinerary = () => {
    console.log('🎯 Crear nuevo itinerario');
    // Lógica para crear nuevo itinerario
  };

  const handleInvitePeople = (itineraryId: string) => {
    console.log('👥 Invitar personas al itinerario:', itineraryId);
    // Lógica para invitar personas
  };

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
    <div className="space-y-6">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          Mis Itinerarios
        </h1>
        <Button 
          onClick={handleCreateItinerary}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear itinerario
        </Button>
      </div>

      {/* Grid de itinerarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {mockItineraries.map((itinerary) => (
  <div
    key={itinerary.id}
    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.015] bg-white"
  >
    {/* Imagen de fondo con overlay */}
    <div className="relative h-80 overflow-hidden">
      <img
        src={itinerary.imageUrl}
        alt={itinerary.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Botón Invitar */}
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
        onClick={(e) => {
          e.stopPropagation();
          handleInvitePeople(itinerary.id);
        }}
      >
        <UserPlus className="w-4 h-4 mr-1" />
        Invitar
      </Button>

      {/* Badge de días restantes */}
      <Badge
        variant="secondary"
        className="absolute top-4 right-4 bg-primary text-white text-[11px] font-medium px-2 py-1 rounded-full shadow-sm"
      >
        {getDaysUntilTrip(itinerary.startDate)}
      </Badge>

      {/* Contenido del card */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        {/* Título */}
        <h2 className="text-xl font-bold line-clamp-2">{itinerary.title}</h2>

        {/* Fechas */}
        <div className="flex items-center text-sm text-white/90">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDateRange(itinerary.startDate, itinerary.endDate)}
        </div>

        {/* Detalles del viaje */}
        <div className="space-y-2 text-sm text-white/90">
          {/* Alojamientos */}
          {itinerary.accommodations.length > 0 && (
            <div className="flex items-start">
              <Hotel className="w-4 h-4 mt-0.5 mr-2" />
              <span className="leading-snug">
                {itinerary.accommodations.map((acc, index) => (
                  <span key={index}>
                    {acc.count} {acc.typeName}
                    {index < itinerary.accommodations.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
          )}

          {/* Transportes */}
          {itinerary.transports.length > 0 && (
            <div className="flex items-start">
              <div className="w-4 h-4 mt-0.5 mr-2">{getTransportIcon(itinerary.transports[0]?.type)}</div>
              <span className="leading-snug">
                {itinerary.transports.map((transport, index) => (
                  <span key={index}>
                    {transport.count} {transport.typeName}
                    {index < itinerary.transports.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
          )}

          {/* Experiencias */}
          {itinerary.experiences?.count > 0 && (
            <div className="flex items-center">
              <Tickets className="w-4 h-4 mr-2" />
              {itinerary.experiences.count} experiencia
              {itinerary.experiences.count !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Presupuesto */}
        <div className="flex items-center pt-2 text-base font-semibold">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>
            {itinerary.currency}{" "}
            {itinerary.estimatedBudgetPerPerson.toLocaleString()}{" "}
            <span className="text-sm font-normal text-white/70">por persona</span>
          </span>
        </div>
      </div>
    </div>
  </div>
))}

      </div>

      {/* Estado vacío si no hay itinerarios */}
      {mockItineraries.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No tienes itinerarios creados
          </h3>
          <p className="text-muted-foreground mb-6">
            Comienza a planificar tu próxima aventura creando tu primer itinerario
          </p>
          <Button 
            onClick={handleCreateItinerary}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear mi primer itinerario
          </Button>
        </div>
      )}
    </div>
    </Suspense>
  );
}