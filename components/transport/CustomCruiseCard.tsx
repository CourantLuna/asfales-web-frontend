'use client';

import React, { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Ship, 
  Star, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  MapPin,
  Anchor,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  Wifi,
  Utensils,
  Waves,
  Building2,
  Gamepad2,
  Baby,
  Dumbbell,
  CircleDollarSign,
  ShieldCheck,
  ArrowRight,
  Plane,
  Camera,
  CalendarDays,
  Timer,
  Sparkles,
  Crown,
  Eye,
  BedDouble,
  Wind,
  Home,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';

// Definición de tipos según la estructura proporcionada
export type CruiseTrip = {
  id: string;
  cruiseLine: {
    id: string;
    name: string;
    logoUrl?: string;
    rating?: number;
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
    };
  };

  ship: {
    name: string;
    model?: string;
    yearBuilt?: number;
    capacity?: number;
    decks?: number;
    shipImageUrl?: string;
  };

  itinerary: {
    startPort: string;
    endPort: string;
    departureDate: string;
    returnDate: string;
    durationNights: number;
    stops: {
      port: string;
      country: string;
      arrivalDateTime?: string;
      departureDateTime?: string;
    }[];
  };

  cabinOptions: {
    type: 'Interior' | 'Exterior' | 'Balcón' | 'Suite';
    price: number;
    currency: 'USD' | 'EUR' | 'DOP';
    maxGuests: number;
    refundable: boolean;
    inclusions?: string[];
    perks?: string[];
  }[];

  amenities: {
    pools: number;
    restaurants: number;
    gym: boolean;
    casino: boolean;
    kidsClub: boolean;
    showsIncluded: boolean;
    excursionsIncluded?: boolean;
  };

  policies: {
    baggage?: {
      includedKgPerPerson?: number;
    };
    cancellation: string;
    healthAndVaccines?: string;
  };

  availability: {
    remainingCabins: number;
    capacityCabins: number;
  };

  recurring?: {
    frequency: string;
    nextSailings: string[];
  };

  isRoundTrip: boolean;
  updatedAt: string;
};

export interface CustomCruiseCardProps {
  cruise: CruiseTrip;
  variant?: 'default' | 'compact' | 'featured' | 'detailed';
  showSaveButton?: boolean;
  showShareButton?: boolean;
  showCompareButton?: boolean;
  onSave?: (cruiseId: string) => void;
  onShare?: (cruiseId: string) => void;
  onCompare?: (cruiseId: string) => void;
  onClick?: (cruiseId: string) => void;
  onCabinSelect?: (cruiseId: string, cabinType: string) => void;
}

// Función para obtener el icono de cabina según el tipo
const getCabinIcon = (type: string) => {
  switch (type) {
    case 'Interior':
      return <BedDouble className="w-4 h-4" />;
    case 'Exterior':
      return <Eye className="w-4 h-4" />;
    case 'Balcón':
      return <Wind className="w-4 h-4" />;
    case 'Suite':
      return <Crown className="w-4 h-4" />;
    default:
      return <Home className="w-4 h-4" />;
  }
};

// Función para obtener el color del badge según el tipo de cabina
const getCabinColor = (type: string) => {
  switch (type) {
    case 'Interior':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Exterior':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Balcón':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Suite':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Función para formatear fechas
const formatCruiseDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd MMM yyyy', { locale: es });
};

// Función para obtener el estado de disponibilidad
const getAvailabilityStatus = (remaining: number, capacity: number) => {
  const percentage = (remaining / capacity) * 100;
  
  if (remaining === 0) {
    return { text: 'Agotado', color: 'bg-red-500', urgent: true };
  } else if (percentage <= 10) {
    return { text: `Solo ${remaining} cabinas`, color: 'bg-orange-500', urgent: true };
  } else if (percentage <= 25) {
    return { text: `${remaining} cabinas`, color: 'bg-yellow-500', urgent: false };
  } else {
    return { text: 'Disponible', color: 'bg-green-500', urgent: false };
  }
};

// Función para calcular el precio más barato
const getCheapestCabin = (cabinOptions: CruiseTrip['cabinOptions']) => {
  return cabinOptions.reduce((cheapest, cabin) => 
    cabin.price < cheapest.price ? cabin : cheapest
  );
};

// Función para obtener mejores amenities destacables
const getHighlightAmenities = (amenities: CruiseTrip['amenities']) => {
  const highlights = [];
  
  if (amenities.pools > 0) highlights.push({ icon: <Waves className="w-4 h-4" />, text: `${amenities.pools} Piscinas` });
  if (amenities.restaurants > 0) highlights.push({ icon: <Utensils className="w-4 h-4" />, text: `${amenities.restaurants} Restaurantes` });
  if (amenities.gym) highlights.push({ icon: <Dumbbell className="w-4 h-4" />, text: 'Gimnasio' });
  if (amenities.casino) highlights.push({ icon: <Gamepad2 className="w-4 h-4" />, text: 'Casino' });
  if (amenities.showsIncluded) highlights.push({ icon: <Sparkles className="w-4 h-4" />, text: 'Shows' });
  if (amenities.kidsClub) highlights.push({ icon: <Baby className="w-4 h-4" />, text: 'Club Niños' });
  
  return highlights;
};

export default function CustomCruiseCard({
  cruise,
  variant = 'default',
  showSaveButton = true,
  showShareButton = true,
  showCompareButton = true,
  onSave,
  onShare,
  onCompare,
  onClick,
  onCabinSelect
}: CustomCruiseCardProps) {
  
  const [selectedCabinType, setSelectedCabinType] = useState<string>(cruise.cabinOptions[0]?.type || '');
  const [showAllStops, setShowAllStops] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(cruise.id);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(cruise.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(cruise.id);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(cruise.id);
    }
  };

  const handleCabinSelect = (cabinType: string) => {
    setSelectedCabinType(cabinType);
    if (onCabinSelect) {
      onCabinSelect(cruise.id, cabinType);
    }
  };

  const availabilityStatus = getAvailabilityStatus(cruise.availability.remainingCabins, cruise.availability.capacityCabins);
  const cheapestCabin = getCheapestCabin(cruise.cabinOptions);
  const highlightAmenities = getHighlightAmenities(cruise.amenities);
  const selectedCabin = cruise.cabinOptions.find(cabin => cabin.type === selectedCabinType) || cheapestCabin;
  
  // Variante compacta
  if (variant === 'compact') {
    return (
      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded-lg" />}>
        <div
          className="flex bg-white rounded-xl border hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
          onClick={handleCardClick}
        >
          {/* Imagen del barco - sin padding, altura completa */}
          <div className="relative w-32 flex-shrink-0 overflow-hidden">
            <img
              src={cruise.ship.shipImageUrl || '/placeholder-cruise.jpg'}
              alt={cruise.ship.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className={`absolute top-2 right-2 w-2 h-2 ${availabilityStatus.color} rounded-full`} />
            
            {/* Overlay con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg line-clamp-1">{cruise.ship.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Ship className="w-4 h-4" />
                  {cruise.cruiseLine.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {cruise.itinerary.startPort} → {cruise.itinerary.endPort}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">Desde</p>
                <p className="font-bold text-lg text-primary">
                  {cheapestCabin.currency} {cheapestCabin.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">por persona</p>
              </div>
            </div>
            
            {/* Opciones de cabina compactas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {cruise.itinerary.durationNights} noches
                </div>
                <Badge className={`${availabilityStatus.color} text-white text-xs`}>
                  {availabilityStatus.text}
                </Badge>
              </div>
              
              {/* Grid compacto de cabinas */}
              <div className="flex gap-1 flex-wrap">
                {cruise.cabinOptions.slice(0, 4).map((cabin, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs cursor-pointer transition-colors ${
                      selectedCabinType === cabin.type
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCabinSelect(cabin.type);
                    }}
                  >
                    {getCabinIcon(cabin.type)}
                    <span className="font-medium">{cabin.type}</span>
                    <span className="text-primary font-semibold">
                      {cabin.currency} {cabin.price.toLocaleString()}
                    </span>
                    {cabin.refundable && (
                      <RefreshCw className="w-3 h-3 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  }

  // Variante por defecto, featured y detailed
  return (
    <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}>
      <Card
        className={`relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white ${
          variant === 'featured' ? 'ring-2 ring-primary ring-opacity-30 shadow-xl' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Header con imagen del barco */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={cruise.ship.shipImageUrl || '/placeholder-cruise.jpg'}
            alt={cruise.ship.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Controles superiores */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Logo de la línea de cruceros */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
              {cruise.cruiseLine.logoUrl ? (
                <img 
                  src={cruise.cruiseLine.logoUrl} 
                  alt={cruise.cruiseLine.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <Ship className="w-5 h-5 text-primary" />
              )}
              <span className="text-sm font-semibold text-gray-900">{cruise.cruiseLine.name}</span>
              {cruise.cruiseLine.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{cruise.cruiseLine.rating}</span>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              {showSaveButton && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
                  onClick={handleSaveClick}
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
              )}
              {showShareButton && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
                  onClick={handleShareClick}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              {showCompareButton && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
                  onClick={handleCompareClick}
                >
                  <TrendingUp className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Estado de disponibilidad prominente */}
          <Badge
            className={`absolute top-16 right-4 ${availabilityStatus.color} text-white font-medium px-3 py-1 rounded-full shadow-lg ${
              availabilityStatus.urgent ? 'animate-pulse' : ''
            }`}
          >
            {availabilityStatus.text}
          </Badge>

          {/* Información del overlay inferior */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
            {/* Nombre del barco */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold line-clamp-1">{cruise.ship.name}</h2>
              {cruise.ship.model && (
                <p className="text-sm text-white/90">{cruise.ship.model}</p>
              )}
            </div>

            {/* Información básica del itinerario */}
            <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{cruise.itinerary.startPort}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                <span>{cruise.itinerary.endPort}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatCruiseDate(cruise.itinerary.departureDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>{cruise.itinerary.durationNights} noches</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Información del barco */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {cruise.ship.capacity && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{cruise.ship.capacity.toLocaleString()} pasajeros</span>
              </div>
            )}
            {cruise.ship.decks && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span>{cruise.ship.decks} cubiertas</span>
              </div>
            )}
            {cruise.ship.yearBuilt && (
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <span>Año {cruise.ship.yearBuilt}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-gray-500" />
              <span>{cruise.isRoundTrip ? 'Ida y vuelta' : 'Solo ida'}</span>
            </div>
          </div>

          <Separator />

          {/* Itinerario de paradas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Itinerario ({cruise.itinerary.stops.length} paradas)
              </h3>
              {cruise.itinerary.stops.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllStops(!showAllStops);
                  }}
                >
                  {showAllStops ? 'Ver menos' : 'Ver todo'}
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAllStops ? 'rotate-90' : ''}`} />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(showAllStops ? cruise.itinerary.stops : cruise.itinerary.stops.slice(0, 4)).map((stop, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{stop.port}</p>
                    <p className="text-xs text-gray-500">{stop.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenidades destacadas */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Amenidades a bordo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {highlightAmenities.slice(0, 6).map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="text-primary">{amenity.icon}</div>
                  <span>{amenity.text}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Selector de cabinas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-primary" />
              Opciones de cabina
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {cruise.cabinOptions.map((cabin, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedCabinType === cabin.type
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCabinSelect(cabin.type);
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getCabinColor(cabin.type)} flex items-center gap-1`}>
                        {getCabinIcon(cabin.type)}
                        {cabin.type}
                      </Badge>
                     
                    </div>
                    
                    <div className="text-center">
                      <p className="font-bold text-md text-primary">
                        {cabin.currency} {cabin.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">por persona</p>
                    </div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Hasta {cabin.maxGuests} huéspedes</span>
                      </div>
                      {cabin.refundable && (
                        <div className="flex items-center gap-1 text-green-600">
                          <RefreshCw className="w-3 h-3" />
                          <span>Reembolsable</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detalles de la cabina seleccionada */}
            {selectedCabin && selectedCabin.inclusions && selectedCabin.inclusions.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                <h4 className="font-medium text-sm text-blue-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Incluido en {selectedCabin.type}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-blue-800">
                  {selectedCabin.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full" />
                      <span>{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Políticas importantes */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Políticas importantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Cancelación:</span>
                </div>
                <p className="text-gray-600 text-xs pl-6">{cruise.policies.cancellation}</p>
              </div>
              
              {cruise.policies.baggage?.includedKgPerPerson && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Equipaje incluido:</span>
                  </div>
                  <p className="text-gray-600 text-xs pl-6">
                    {cruise.policies.baggage.includedKgPerPerson} kg por persona
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Footer con precio y acción */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">Precio desde</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {cheapestCabin.currency} {cheapestCabin.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">por persona</span>
              </div>
              <p className="text-xs text-gray-500">
                Cabina {cheapestCabin.type} • {cruise.itinerary.durationNights} noches
              </p>
            </div>

            <div className="text-right space-y-2">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
                onClick={(e) => {
                  e.stopPropagation();
                  // Lógica para reservar
                }}
              >
                Reservar ahora
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500">
                {cruise.availability.remainingCabins} cabinas disponibles
              </p>
            </div>
          </div>
        </div>

        {/* Badge de crucero recurrente */}
        {cruise.recurring && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 text-xs font-medium rounded-br-lg">
            <RefreshCw className="w-3 h-3 inline mr-1" />
            {cruise.recurring.frequency}
          </div>
        )}
      </Card>
    </Suspense>
  );
}