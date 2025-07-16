'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  Globe,
  Heart,
  Share2,
  Bookmark,
  CalendarCheck,
  MessageCircle,
  Waves,
  Mountain,
  Camera,
  Utensils,
  Leaf,
  Building,
  Trophy,
  TreePine
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Definición de tipos según la estructura proporcionada
export type ExperienceData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string; // Ciudad o región
  type:
    | 'Playa'
    | 'Aventura'
    | 'Cultural'
    | 'Gastronómica'
    | 'Wellness'
    | 'Eco'
    | 'Urbana'
    | 'Deportiva'
    | string;

  availability: {
    mode: 'fixed' | 'recurring' | 'onRequest'; // clave para UI y filtros

    // Solo si es 'fixed':
    startDate?: string; // ISO
    endDate?: string;

    // Solo si es 'recurring':
    frequency?: string; // ejemplo: 'Lunes y Jueves', 'Cada fin de semana'

    // Cupos:
    maxCapacity?: number;
    bookedCount?: number;
  };

  isAvailable: boolean; // calculado: cupo o abierta

  price: number;
  currency: 'USD' | 'DOP' | 'EUR';
  language?: string;

  host: {
    id: string;
    name: string;
    avatarUrl?: string;
  };

  rating?: {
    score: number;
    count: number;
  };

  tags?: string[]; // extras: 'familiar', 'premium', etc.
  createdAt: string;
  updatedAt: string;
};

export interface ExperienceCardProps {
  experience: ExperienceData;
  variant?: 'default' | 'compact' | 'featured';
  showSaveButton?: boolean;
  showShareButton?: boolean;
  onSave?: (experienceId: string) => void;
  onShare?: (experienceId: string) => void;
  onClick?: (experienceId: string) => void;
}

// Función para obtener el icono según el tipo de experiencia
const getExperienceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'playa':
      return <Waves className="w-4 h-4" />;
    case 'aventura':
      return <Mountain className="w-4 h-4" />;
    case 'cultural':
      return <Camera className="w-4 h-4" />;
    case 'gastronómica':
      return <Utensils className="w-4 h-4" />;
    case 'wellness':
      return <Heart className="w-4 h-4" />;
    case 'eco':
      return <TreePine className="w-4 h-4" />;
    case 'urbana':
      return <Building className="w-4 h-4" />;
    case 'deportiva':
      return <Trophy className="w-4 h-4" />;
    default:
      return <Star className="w-4 h-4" />;
  }
};

// Función para obtener el color del badge según el tipo
const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'playa':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'aventura':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'cultural':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'gastronómica':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'wellness':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'eco':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'urbana':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'deportiva':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

// Función para formatear la disponibilidad
const formatAvailability = (availability: ExperienceData['availability']) => {
  switch (availability.mode) {
    case 'fixed':
      if (availability.startDate && availability.endDate) {
        const startDate = new Date(availability.startDate);
        const endDate = new Date(availability.endDate);
        if (startDate.toDateString() === endDate.toDateString()) {
          return startDate.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short' 
          });
        }
        return `${startDate.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'short' 
        })} - ${endDate.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'short' 
        })}`;
      }
      return 'Fecha fija';
    case 'recurring':
      return availability.frequency || 'Recurrente';
    case 'onRequest':
      return 'Bajo solicitud';
    default:
      return 'Consultar';
  }
};

// Función para obtener el indicador de disponibilidad
const getAvailabilityStatus = (availability: ExperienceData['availability'], isAvailable: boolean) => {
  if (!isAvailable) {
    return { text: 'No disponible', color: 'bg-red-500' };
  }
  
  if (availability.maxCapacity && availability.bookedCount) {
    const remaining = availability.maxCapacity - availability.bookedCount;
    if (remaining <= 2) {
      return { text: `${remaining} cupos`, color: 'bg-orange-500' };
    }
    return { text: `${remaining} cupos`, color: 'bg-green-500' };
  }
  
  return { text: 'Disponible', color: 'bg-green-500' };
};

export default function ExperienceCard({
  experience,
  variant = 'default',
  showSaveButton = true,
  showShareButton = true,
  onSave,
  onShare,
  onClick
}: ExperienceCardProps) {
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(experience.id);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(experience.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(experience.id);
    }
  };

  const availabilityStatus = getAvailabilityStatus(experience.availability, experience.isAvailable);
  
  // Variante compacta
  if (variant === 'compact') {
    return (
      <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-lg" />}>
        <div
          className="flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer group"
          onClick={handleCardClick}
        >
          {/* Imagen pequeña */}
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={experience.imageUrl}
              alt={experience.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className={`absolute top-1 right-1 w-2 h-2 ${availabilityStatus.color} rounded-full`} />
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1">{experience.title}</h3>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm text-primary">
                  {experience.currency} {experience.price}
                </p>
                {experience.rating && (
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{experience.rating.score}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }

  // Variante por defecto y featured
  return (
    <Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg" />}>
      <div
        className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.015] bg-white ${
          variant === 'featured' ? 'ring-2 ring-primary ring-opacity-20' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Imagen principal con overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Controles superiores */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Badge de tipo */}
            <Badge className={`${getTypeColor(experience.type)} flex items-center gap-1 text-xs font-medium px-2 py-1`}>
              {getExperienceIcon(experience.type)}
              {experience.type}
            </Badge>

            {/* Botones de acción */}
            <div className="flex gap-2">
              {showSaveButton && (
                <div
                  role="button"
                  className="bg-white/20 text-white backdrop-blur-md p-2 hover:text-red-500 hover:fill-red-500 pointer-events-auto"
                  onClick={handleSaveClick}
                >
                  <Heart className="w-4 h-4 hover:fill-red-500" />
                </div>
              )}
              {showShareButton && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md p-2"
                  onClick={handleShareClick}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Estado de disponibilidad */}
          {/* <Badge
            className={`absolute top-4 right-4 ${availabilityStatus.color} text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
          >
            {availabilityStatus.text}
          </Badge> */}

          {/* Contenido del overlay inferior */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-3">
            {/* Título y descripción */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{experience.title}</h2>
              <p className="text-sm text-white/90 line-clamp-2">{experience.description}</p>
            </div>

            {/* Información adicional */}
            <div className="space-y-2 text-sm text-white/90">
              {/* Ubicación */}
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {experience.location}
              </div>

              {/* Disponibilidad */}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatAvailability(experience.availability)}
              </div>

              {/* Idioma si está disponible */}
              {experience.language && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {experience.language}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido inferior */}
        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
          <div className='flex flex-col gap-3 mb-auto'>
            {/* Host y rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={experience.host.avatarUrl} />
                <AvatarFallback>{experience.host.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{experience.host.name}</p>
                <p className="text-gray-500">Anfitrión</p>
              </div>
            </div>

            {experience.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{experience.rating.score}</span>
                <span className="text-gray-500">({experience.rating.count})</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {experience.tags && experience.tags.length > 0 && (
            <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
              {experience.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {experience.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{experience.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
          </div>

          {/* Precio y cupos */}
          <div className="flex items-center justify-between pt-2 border-t flex-row">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-lg font-bold text-primary">
                {experience.currency} {experience.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">por persona</span>
            </div>

            {experience.availability.maxCapacity && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>
                  {experience.availability.bookedCount || 0}/{experience.availability.maxCapacity}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}