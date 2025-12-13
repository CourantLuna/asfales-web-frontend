'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bus,  Star, Clock,Map as MapIcon, MapPin, Heart, Share2,Bookmark,Wifi, Utensils, Zap, Wind, Armchair, Monitor, CircleDollarSign,
  ShieldCheck, ArrowRight, Timer, CheckCircle2, Phone, Mail, Globe, Award, Luggage, Briefcase, AlertCircle, Building2,
  Crown, Layers, Camera, MessageSquare, Shield, CreditCard, Info, ChevronDown, ChevronUp, MapPinIcon, ClockIcon,
  X,Check, Users, Navigation, Route, RefreshCw,
  Usb,
  Lightbulb,
  DoorOpen,
  Ticket,
  Dumbbell,
  Fish,
  Baby, Ship, 
 
  BedDouble,
  Eye,
  Home,
  Anchor,
  Calendar,
  Gamepad2,
  
  Sparkles,
  Waves,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// Asegúrate de importar la interfaz desde tu archivo de tipos
import { TransportTrip, TransportStop } from '../types/transport.types';

// Constante para mantener la lógica de huéspedes (ya que TransportTrip no tiene maxGuests en prices)
const DEFAULT_MAX_GUESTS = 4;

export interface CustomCruiseCardProps {
  cruise: TransportTrip; // Usamos la nueva interfaz
  variant?: 'default' | 'compact' | 'featured';
  showSaveButton?: boolean;
  showShareButton?: boolean;
  onSave?: (cruiseId: string) => void;
  onShare?: (cruiseId: string) => void;
  onClick?: (cruiseId: string) => void;
  onCabinSelect?: (cruiseId: string, cabinType: string) => void;
}

type TabType = 'informacion' | 'amenidades' | 'itinerario' | 'politicas' | 'cabinas';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  { id: 'informacion', label: 'Información del Crucero', icon: <Info className="w-4 h-4" /> },
  { id: 'amenidades', label: 'Amenidades', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'itinerario', label: 'Itinerario', icon: <MapPinIcon className="w-4 h-4" /> },
  { id: 'politicas', label: 'Políticas', icon: <Shield className="w-4 h-4" /> },
  { id: 'cabinas', label: 'RESERVAR CABINA/S', icon: <BedDouble className="w-4 h-4" /> }
];

// Función para formatear tiempo
const formatTime = (dateString: string) => {
  return format(new Date(dateString), 'H:mm', { locale: es });
};

// Función para formatear fecha
const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd MMM yyyy', { locale: es });
};

// Función para obtener precio más barato (adaptada a prices[])
const getCheapestCabin = (prices: TransportTrip['prices']) => {
  if (!prices || prices.length === 0) return { price: 0, currency: 'USD', class: 'N/A' };
  
  return prices.reduce((cheapest, current) => 
    current.price < cheapest.price ? current : cheapest
  );
};

// Función para obtener el icono de cabina según la clase
const getCabinIcon = (type: string = '') => {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('interior')) return <BedDouble className="w-4 h-4" />;
  if (lowerType.includes('exterior')) return <Eye className="w-4 h-4" />;
  if (lowerType.includes('balc')) return <Wind className="w-4 h-4" />;
  if (lowerType.includes('suite')) return <Crown className="w-4 h-4" />;
  return <Home className="w-4 h-4" />;
};

// Función para formatear precio
const formatPrice = (price: number, currency: string = 'USD') => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    DOP: 'RD$',
    COP: 'COP$'
  };
  return `${symbols[currency] || '$'} ${price.toLocaleString()}`;
};

export default function CustomCruiseCard({
  cruise,
  variant = 'default',
  showSaveButton = true,
  showShareButton = true,
  onSave,
  onShare,
  onClick,
  onCabinSelect
}: CustomCruiseCardProps) {

  if (!cruise) { return <div className="h-20 bg-gray-100 animate-pulse rounded-lg" />;  }
  const [expandedTab, setExpandedTab] = useState<TabType | null>(null);
  
  // Usamos 'class' en lugar de 'type' y prices en lugar de cabinOptions
  const [selectedCabinClass, setSelectedCabinClass] = useState<string>(cruise.prices[0]?.class || '');
  
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const cheapestCabin = getCheapestCabin(cruise.prices);
  const selectedCabin = cruise.prices.find(p => p.class === selectedCabinClass) || cheapestCabin;

  // Determinar capacidad máxima (fallback a constante porque no está en la interfaz)
  const maxGuests = DEFAULT_MAX_GUESTS; 

  const handleTabClick = (tabId: TabType) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
  };

  const handleCabinSelect = (cabinClass: string) => {
    setSelectedCabinClass(cabinClass);
    // Resetear huéspedes si exceden la capacidad (usando la constante maxGuests)
    if ((adults + children) > maxGuests) {
      setAdults(1);
      setChildren(0);
    }
    onCabinSelect?.(cruise.id, cabinClass);
  };

  const handleAdultsChange = (value: string) => {
    const newAdults = Number(value);
    setAdults(newAdults);
    if (newAdults + children > maxGuests) {
      setChildren(Math.max(0, maxGuests - newAdults));
    }
  };

  const handleChildrenChange = (value: string) => {
    const newChildren = Number(value);
    setChildren(newChildren);
  };

  const calculateTotalPrice = () => {
    const adultPrice = adults * selectedCabin.price;
    const childPrice = children * selectedCabin.price * 0.75; 
    return adultPrice + childPrice;
  };

  const AMENITIES_MAP: any= {
  wifi: { icon: Wifi, label: "Wi-Fi" },
  usb: { icon: Usb, label: "USB" },
  ac: { icon: Wind, label: "A/C" },
  onboardToilet: { icon: Building2, label: "Baño" },
  recliningSeats: { icon: Armchair, label: "Asientos reclinables" },
  entertainment: { icon: Monitor, label: "Entretenimiento" },
  readingLight: { icon: Lightbulb, label: "Luz lectura" },
  reading_light: { icon: Lightbulb, label: "Luz lectura" },
  gps_tracking: { icon: Navigation, label: "GPS" },
  emergencyExit: { icon: DoorOpen, label: "Salida emergencia" },
  emergency_exit: { icon: DoorOpen, label: "Salida emergencia" },
  pools: { icon: MapPin, label: "Piscinas" },
  restaurants: { icon: Ticket, label: "Restaurantes" },
  gym: { icon: Dumbbell, label: "Gimnasio" },
  casino: { icon: Fish, label: "Casino" },
  kidsClub: { icon: Baby, label: "Club niños" },
  showsIncluded: { icon: Ticket, label: "Shows incluidos" },
  excursionsIncluded: { icon: MapPin, label: "Excursiones" },
};


  // --- RENDERS DE TABS ---

  const renderInformacionTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="space-y-4">
        {/* Información del barco */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Ship className="w-5 h-5 text-blue-600" />
            Información del Barco
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              {/* Acceso a cruise.ship */}
              <p className="font-medium">{cruise.ship?.name || 'Barco Asignado'}</p>
              {cruise.ship?.model && <p className="text-gray-600">{cruise.ship.model}</p>}
            </div>
            <div className="space-y-1">
              {cruise.ship?.capacity && (
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  {cruise.ship.capacity.toLocaleString()} pasajeros
                </p>
              )}
              {cruise.ship?.decks && (
                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  {cruise.ship.decks} cubiertas
                </p>
              )}
              {cruise.ship?.yearBuilt && (
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Año {cruise.ship.yearBuilt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información de la naviera (operator) */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Crown className="w-5 h-5 text-blue-600" />
            Naviera
          </h4>
          <div className="flex items-center gap-3">
            {cruise.operator.logoUrl ? (
              <img 
                src={cruise.operator.logoUrl} 
                alt={cruise.operator.name}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <p className="font-medium">{cruise.operator.name}</p>
              {cruise.operator.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{cruise.operator.rating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAmenidadesTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(cruise.amenities)
    .filter(([key, value]) => value && AMENITIES_MAP[key])
    .map(([key]) => {
      const { icon: Icon, label } = AMENITIES_MAP[key];
      return (
        <div
          key={key}
          className="flex items-center gap-1 text-sm text-gray-600"
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
      );
    })}
      </div>
    </div>
  );

  const renderItinerarioTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="space-y-4">
        {/* Información general (Origin / Destination) */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Puerto de Salida</span>
              </div>
              {/* Acceso a cruise.origin.stop */}
              <p className="font-medium">{cruise.origin.stop?.city} ({cruise.origin.stop.stopName})</p>
              <p className="text-gray-600">{formatDate(cruise.origin.dateTime)}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Anchor className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-800">Puerto de Llegada</span>
              </div>
              {/* Acceso a cruise.destination.stop */}
              <p className="font-medium">{cruise.destination.stop?.city} ({cruise.destination.stop?.stopName})</p>
              <p className="text-gray-600">{formatDate(cruise.destination.dateTime)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-gray-500" />
              <span>{cruise.durationNights} noches</span>
            </div>
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-gray-500" />
              <span>{cruise.stops?.length || 0} paradas</span>
            </div>
          </div>
        </div>

        {/* Paradas del itinerario (cruise.stops) */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Route className="w-5 h-5 text-blue-600" />
            Escalas
          </h4>
          <div className="space-y-3">
            {cruise.stops?.map((stopItem, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  {/* Acceso a stopItem.stop.stopName y city */}
                  <p className="font-medium text-sm">{stopItem.stop.city} - {stopItem.stop.stopName}</p>
                  <p className="text-xs text-gray-600">{stopItem.stop.countryCode}</p>
                </div>
                {stopItem.arrivalTime && (
                  <div className="text-right text-xs text-gray-500">
                    <p>Llegada: {formatTime(stopItem.arrivalTime)}</p>
                    {stopItem.departureTime && (
                      <p>Salida: {formatTime(stopItem.departureTime)}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPoliticasTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="space-y-4">
        {cruise.policies?.cancellation && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Política de Cancelación
            </h4>
            <p className="text-sm text-gray-600">{cruise.policies.cancellation}</p>
          </div>
        )}

        {cruise.policies?.baggage?.includedKg && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Luggage className="w-5 h-5 text-blue-600" />
              Política de Equipaje
            </h4>
            <p className="text-sm text-gray-600">
              Equipaje incluido: {cruise.policies.baggage.includedKg} kg por persona
            </p>
          </div>
        )}

        {cruise.policies?.healthAndVaccines && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Salud y Vacunas
            </h4>
            <p className="text-sm text-gray-600">{cruise.policies.healthAndVaccines}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCabinasTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mapeamos cruise.prices en lugar de cabinOptions */}
        {cruise.prices.map((cabin, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedCabinClass === cabin.class
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            // Usamos cabin.class
            onClick={() => handleCabinSelect(cabin.class || '')}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCabinIcon(cabin.class)}
                  <span className="font-semibold">{cabin.class}</span>
                </div>
                {cabin.refundable && (
                  <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-200">
                    Reembolsable
                  </Badge>
                )}
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg text-primary">
                  {formatPrice(cabin.price, cabin.currency)}
                </p>
                <p className="text-xs text-gray-500">por persona</p>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1 ">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {/* Usamos constante maxGuests porque no viene en data */}
                  <span>Hasta {maxGuests} huéspedes</span>
                </div>
              </div>

              {cabin.inclusions && cabin.inclusions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-700">Incluye:</p>
                  {cabin.inclusions.slice(0, 3).map((inclusion, idx) => (
                    <p key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" />
                      {inclusion}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Información de reserva cuando hay cabina seleccionada */}
      {selectedCabinClass && (
        <div className="mt-6 bg-white rounded-lg border shadow-md p-4">
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Información de Huéspedes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adultos
                </label>
                <Select value={adults.toString()} onValueChange={handleAdultsChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Adultos" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Adulto' : 'Adultos'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">(Edad 18+)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niños
                </label>
                <Select 
                  value={children.toString()} 
                  onValueChange={handleChildrenChange}
                  disabled={adults >= maxGuests}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Niños" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.max(0, maxGuests - adults) + 1 }, (_, i) => i).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Niño' : 'Niños'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">(Edad 1-17)</p>
              </div>
            </div>
            
            {(adults + children) > maxGuests && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-xs text-red-600">
                  El total de huéspedes excede la capacidad de la cabina.
                </p>
              </div>
            )}
          </div>

          <h4 className="font-semibold mb-3">Resumen de tu selección</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cabina {selectedCabin.class}</span>
              <span className="font-medium">{formatPrice(selectedCabin.price, selectedCabin.currency)} por persona</span>
            </div>
            <div className="flex justify-between">
              <span>Duración</span>
              <span>{cruise.durationNights} noches</span>
            </div>
            <div className="flex justify-between">
              <span>Huéspedes</span>
              <span>
                {adults} {adults === 1 ? 'adulto' : 'adultos'}
                {children > 0 && `, ${children} ${children === 1 ? 'niño' : 'niños'}`}
              </span>
            </div>
            
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between text-gray-600">
                <span>Adultos ({adults} × {formatPrice(selectedCabin.price, selectedCabin.currency)})</span>
                <span>{formatPrice(adults * selectedCabin.price, selectedCabin.currency)}</span>
              </div>
              {children > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Niños ({children} × {formatPrice(selectedCabin.price * 0.75, selectedCabin.currency)})</span>
                  <span>{formatPrice(children * selectedCabin.price * 0.75, selectedCabin.currency)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(calculateTotalPrice(), selectedCabin.currency)}
                </span>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={(adults + children) === 0 || (adults + children) > maxGuests}
            onClick={() => {
              const totalPrice = calculateTotalPrice();
              console.log('Reservando cabina:', selectedCabinClass, 'Adultos:', adults, 'Total:', totalPrice);
              onClick?.(cruise.id);
            }}
          >
            Reservar por {formatPrice(calculateTotalPrice(), selectedCabin.currency)}
          </Button>
        </div>
      )}
    </div>
  );

  const renderTabContent = (tabId: TabType) => {
    switch (tabId) {
      case 'informacion': return renderInformacionTab();
      case 'amenidades': return renderAmenidadesTab();
      case 'itinerario': return renderItinerarioTab();
      case 'politicas': return renderPoliticasTab();
      case 'cabinas': return renderCabinasTab();
      default: return null;
    }
  };

  return (
    <Card className="w-full overflow-visible border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0 overflow-visible">
        <div className="p-4">
          
          {/* Fila superior: Logo, naviera, fechas, precio */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
                {cruise.operator.logoUrl ? (
                  <img 
                    src={cruise.operator.logoUrl} 
                    alt={cruise.operator.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Ship className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-lg">{cruise.operator.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">CRUCERO</Badge>
                  {cruise.operator.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{cruise.operator.rating}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    {cruise.prices.some(p => p.refundable) ? 'Reembolsable' : 'No reembolsable'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(cheapestCabin.price, cheapestCabin.currency)}
              </div>
              <div className="text-sm text-gray-600">
                {cruise.availability.remainingCabins || 0} cabinas disponibles
              </div>
              <div className="text-xs text-gray-500">
                Desde cabina {cheapestCabin.class}
              </div>
            </div>
          </div>

          {/* Fila de fechas y duración */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6 w-full">
              {/* Fecha de salida (Origin) */}
              <div>
                <div className="text-xl md:text-2xl font-bold">{formatDate(cruise.origin.dateTime)}</div>
                <div className="text-sm text-gray-600">{cruise.origin.stop?.city}</div>
                <div className="text-xs text-gray-500">Salida</div>
              </div>

              {/* Duración y tipo */}
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-600 mb-1">{cruise.durationNights} noches</div>
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <Ship className="w-4 h-4 text-gray-400 mx-2" />
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {cruise.stops?.length || 0} paradas
                </div>
              </div>

              {/* Fecha de regreso (Destination) */}
              <div className="text-right">
                <div className="text-xl md:text-2xl font-bold">{formatDate(cruise.destination.dateTime)}</div>
                <div className="text-sm text-gray-600">{cruise.destination.stop?.city}</div>
                <div className="text-xs text-gray-500">Regreso</div>
              </div>
            </div>
          </div>

          {/* Información del barco Resumida */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm">{cruise.ship?.name}</h4>
                <p className="text-xs text-gray-600">
                  {cruise.ship?.capacity && `${cruise.ship.capacity.toLocaleString()} pasajeros`}
                  {cruise.ship?.yearBuilt && ` • Año ${cruise.ship.yearBuilt}`}
                </p>
              </div>
              {cruise.ship?.shipImageUrl && (
                <img
                  src={cruise.ship.shipImageUrl}
                  alt={cruise.ship.name}
                  className="w-16 h-10 object-cover rounded"
                />
              )}
            </div>
          </div>

          {/* Tabs navegables */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${tab.id === 'cabinas'
                      ? expandedTab === tab.id 
                        ? 'bg-blue-600 text-white border border-blue-700' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      : expandedTab === tab.id 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {expandedTab === tab.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido expandible de los tabs */}
        {expandedTab && renderTabContent(expandedTab)}
      </CardContent>
    </Card>
  );
}