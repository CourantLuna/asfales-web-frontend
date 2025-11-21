'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Ship, 
  Star, 
  Clock,
  MapPin,
  Heart,
  Share2,
  Bookmark,
  Wifi,
  Utensils,
  Waves,
  Wind,
  Armchair,
  Monitor,
  CircleDollarSign,
  ShieldCheck,
  ArrowRight,
  Timer,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Award,
  Luggage,
  Briefcase,
  AlertCircle,
  Building2,
  Crown,
  Layers,
  Camera,
  MessageSquare,
  Shield,
  CreditCard,
  Info,
  ChevronDown,
  ChevronUp,
  MapPinIcon,
  ClockIcon,
  X,
  Check,
  Users,
  Navigation,
  Route,
  RefreshCw,
  BedDouble,
  Eye,
  Home,
  Anchor,
  Calendar,
  Gamepad2,
  Baby,
  Dumbbell,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';
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
  variant?: 'default' | 'compact' | 'featured';
  showSaveButton?: boolean;
  showShareButton?: boolean;
  onSave?: (cruiseId: string) => void;
  onShare?: (cruiseId: string) => void;
  onClick?: (cruiseId: string) => void;
  onCabinSelect?: (cruiseId: string, cabinType: string) => void;
}

// Tipos de tabs disponibles
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

// Función para obtener precio más barato
const getCheapestCabin = (cabinOptions: CruiseTrip['cabinOptions']) => {
  return cabinOptions.reduce((cheapest, cabin) => 
    cabin.price < cheapest.price ? cabin : cheapest
  );
};

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

// Función para formatear precio con símbolo de moneda
const formatPrice = (price: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    DOP: 'RD$'
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
  const [expandedTab, setExpandedTab] = useState<TabType | null>(null);
  const [selectedCabinType, setSelectedCabinType] = useState<string>(cruise.cabinOptions[0]?.type || '');
  const [isSaved, setIsSaved] = useState(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const cheapestCabin = getCheapestCabin(cruise.cabinOptions);
  const selectedCabin = cruise.cabinOptions.find(cabin => cabin.type === selectedCabinType) || cheapestCabin;

  const handleTabClick = (tabId: TabType) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(cruise.id);
  };

  const handleShare = () => {
    onShare?.(cruise.id);
  };

  const handleCabinSelect = (cabinType: string) => {
    setSelectedCabinType(cabinType);
    // Reset guests when changing cabin to ensure they don't exceed new cabin's capacity
    const newCabin = cruise.cabinOptions.find(cabin => cabin.type === cabinType);
    if (newCabin && (adults + children) > newCabin.maxGuests) {
      setAdults(1);
      setChildren(0);
    }
    onCabinSelect?.(cruise.id, cabinType);
  };

  const handleAdultsChange = (value: string) => {
    const newAdults = Number(value);
    setAdults(newAdults);
    // Adjust children if total exceeds max capacity
    if (newAdults + children > selectedCabin.maxGuests) {
      setChildren(Math.max(0, selectedCabin.maxGuests - newAdults));
    }
  };

  const handleChildrenChange = (value: string) => {
    const newChildren = Number(value);
    setChildren(newChildren);
  };

  // Función para calcular el precio total basado en huéspedes
  const calculateTotalPrice = () => {
    const adultPrice = adults * selectedCabin.price;
    const childPrice = children * selectedCabin.price * 0.75; // 25% descuento para niños
    return adultPrice + childPrice;
  };

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
              <p className="font-medium">{cruise.ship.name}</p>
              {cruise.ship.model && <p className="text-gray-600">{cruise.ship.model}</p>}
            </div>
            <div className="space-y-1">
              {cruise.ship.capacity && (
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  {cruise.ship.capacity.toLocaleString()} pasajeros
                </p>
              )}
              {cruise.ship.decks && (
                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  {cruise.ship.decks} cubiertas
                </p>
              )}
              {cruise.ship.yearBuilt && (
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Año {cruise.ship.yearBuilt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información de la naviera */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Naviera
          </h4>
          <div className="flex items-center gap-3">
            {cruise.cruiseLine.logoUrl ? (
              <img 
                src={cruise.cruiseLine.logoUrl} 
                alt={cruise.cruiseLine.name}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <p className="font-medium">{cruise.cruiseLine.name}</p>
              {cruise.cruiseLine.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{cruise.cruiseLine.rating}/5</span>
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
        {cruise.amenities.pools > 0 && (
          <div className="flex flex-col items-center text-center">
            <Waves className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">{cruise.amenities.pools} Piscinas</span>
          </div>
        )}
        {cruise.amenities.restaurants > 0 && (
          <div className="flex flex-col items-center text-center">
            <Utensils className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">{cruise.amenities.restaurants} Restaurantes</span>
          </div>
        )}
        {cruise.amenities.gym && (
          <div className="flex flex-col items-center text-center">
            <Dumbbell className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">Gimnasio</span>
          </div>
        )}
        {cruise.amenities.casino && (
          <div className="flex flex-col items-center text-center">
            <Gamepad2 className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">Casino</span>
          </div>
        )}
        {cruise.amenities.kidsClub && (
          <div className="flex flex-col items-center text-center">
            <Baby className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">Club Niños</span>
          </div>
        )}
        {cruise.amenities.showsIncluded && (
          <div className="flex flex-col items-center text-center">
            <Sparkles className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">Shows en vivo</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderItinerarioTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="space-y-4">
        {/* Información general */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Puerto de Salida</span>
              </div>
              <p className="font-medium">{cruise.itinerary.startPort}</p>
              <p className="text-gray-600">{formatDate(cruise.itinerary.departureDate)}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Anchor className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-800">Puerto de Llegada</span>
              </div>
              <p className="font-medium">{cruise.itinerary.endPort}</p>
              <p className="text-gray-600">{formatDate(cruise.itinerary.returnDate)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-gray-500" />
              <span>{cruise.itinerary.durationNights} noches</span>
            </div>
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-gray-500" />
              <span>{cruise.itinerary.stops.length} paradas</span>
            </div>
          </div>
        </div>

        {/* Paradas del itinerario */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Route className="w-5 h-5 text-blue-600" />
            Paradas del Crucero
          </h4>
          <div className="space-y-3">
            {cruise.itinerary.stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{stop.port}</p>
                  <p className="text-xs text-gray-600">{stop.country}</p>
                </div>
                {stop.arrivalDateTime && (
                  <div className="text-right text-xs text-gray-500">
                    <p>Llegada: {formatTime(stop.arrivalDateTime)}</p>
                    {stop.departureDateTime && (
                      <p>Salida: {formatTime(stop.departureDateTime)}</p>
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
        {/* Política de Cancelación */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Política de Cancelación
          </h4>
          <p className="text-sm text-gray-600">{cruise.policies.cancellation}</p>
        </div>

        {/* Política de Equipaje */}
        {cruise.policies.baggage?.includedKgPerPerson && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Luggage className="w-5 h-5 text-blue-600" />
              Política de Equipaje
            </h4>
            <p className="text-sm text-gray-600">
              Equipaje incluido: {cruise.policies.baggage.includedKgPerPerson} kg por persona
            </p>
          </div>
        )}

        {/* Salud y Vacunas */}
        {cruise.policies.healthAndVaccines && (
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
        {cruise.cabinOptions.map((cabin, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedCabinType === cabin.type
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => handleCabinSelect(cabin.type)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCabinIcon(cabin.type)}
                  <span className="font-semibold">{cabin.type}</span>
                </div>
                {cabin.refundable && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
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
                  <span>Hasta {cabin.maxGuests} huéspedes</span>
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
      {selectedCabinType && (
        <div className="mt-6 bg-white rounded-lg border shadow-md p-4">
          {/* Selección de huéspedes */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Información de Huéspedes</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Adultos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adultos
                </label>
                <Select value={adults.toString()} onValueChange={handleAdultsChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar adultos" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: selectedCabin.maxGuests }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Adulto' : 'Adultos'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">(Edad 18+)</p>
              </div>

              {/* Niños */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niños
                </label>
                <Select 
                  value={children.toString()} 
                  onValueChange={handleChildrenChange}
                  disabled={adults >= selectedCabin.maxGuests}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar niños" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.max(0, selectedCabin.maxGuests - adults) + 1 }, (_, i) => i).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Niño' : 'Niños'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">(Edad 1-17)</p>
              </div>
            </div>
            
            {/* Validación del total de huéspedes */}
            {(adults + children) > selectedCabin.maxGuests && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-xs text-red-600">
                  El total de huéspedes ({adults + children}) excede la capacidad máxima de la cabina ({selectedCabin.maxGuests}).
                </p>
              </div>
            )}
            
            {(adults + children) === 0 && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-yellow-600">
                  Debe seleccionar al menos un huésped.
                </p>
              </div>
            )}
          </div>

          <h4 className="font-semibold mb-3">Resumen de tu selección</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cabina {selectedCabin.type}</span>
              <span className="font-medium">{formatPrice(selectedCabin.price, selectedCabin.currency)} por persona</span>
            </div>
            <div className="flex justify-between">
              <span>Duración</span>
              <span>{cruise.itinerary.durationNights} noches</span>
            </div>
            <div className="flex justify-between">
              <span>Huéspedes</span>
              <span>
                {adults} {adults === 1 ? 'adulto' : 'adultos'}
                {children > 0 && `, ${children} ${children === 1 ? 'niño' : 'niños'}`}
              </span>
            </div>
            
            {/* Desglose de precios */}
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
              
              {/* Total */}
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(calculateTotalPrice(), selectedCabin.currency)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                *Los niños tienen 25% de descuento
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={(adults + children) === 0 || (adults + children) > selectedCabin.maxGuests}
            onClick={() => {
              // Lógica de reserva
              const totalPrice = calculateTotalPrice();
              console.log('Reservando cabina:', selectedCabinType, 'Adultos:', adults, 'Niños:', children, 'Total:', totalPrice);
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
      case 'informacion':
        return renderInformacionTab();
      case 'amenidades':
        return renderAmenidadesTab();
      case 'itinerario':
        return renderItinerarioTab();
      case 'politicas':
        return renderPoliticasTab();
      case 'cabinas':
        return renderCabinasTab();
      default:
        return null;
    }
  };

  return (
    <Card className="w-full overflow-visible border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header principal del card */}
      <CardContent className="p-0 overflow-visible">
        <div className="p-4">
          {/* Fila superior: Logo, naviera, fechas, precio */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Logo de la naviera */}
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                {cruise.cruiseLine.logoUrl ? (
                  <img 
                    src={cruise.cruiseLine.logoUrl} 
                    alt={cruise.cruiseLine.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Ship className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-lg">{cruise.cruiseLine.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">CRUCERO</Badge>
                  {cruise.cruiseLine.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{cruise.cruiseLine.rating}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    {cruise.cabinOptions.some(cabin => cabin.refundable) ? 'Reembolsable' : 'No reembolsable'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(cheapestCabin.price, cheapestCabin.currency)}
              </div>
              <div className="text-sm text-gray-600">
                {cruise.availability.remainingCabins} cabinas disponibles
              </div>
              <div className="text-xs text-gray-500">
                Desde cabina {cheapestCabin.type}
              </div>
            </div>
          </div>

          {/* Fila de fechas y duración */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {/* Fecha de salida */}
              <div>
                <div className="text-2xl font-bold">{formatDate(cruise.itinerary.departureDate)}</div>
                <div className="text-sm text-gray-600">{cruise.itinerary.startPort}</div>
                <div className="text-xs text-gray-500">Salida</div>
              </div>

              {/* Duración y tipo */}
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-600 mb-1">{cruise.itinerary.durationNights} noches</div>
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <Ship className="w-4 h-4 text-gray-400 mx-2" />
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {cruise.itinerary.stops.length} paradas
                </div>
              </div>

              {/* Fecha de regreso */}
              <div>
                <div className="text-2xl font-bold">{formatDate(cruise.itinerary.returnDate)}</div>
                <div className="text-sm text-gray-600">{cruise.itinerary.endPort}</div>
                <div className="text-xs text-gray-500">Regreso</div>
              </div>
            </div>
          </div>

          {/* Amenidades destacadas */}
          {/* <div className="flex items-center gap-4 mb-4">
            {cruise.amenities.pools > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Waves className="w-4 h-4" />
                <span>{cruise.amenities.pools} Piscinas</span>
              </div>
            )}
            {cruise.amenities.restaurants > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Utensils className="w-4 h-4" />
                <span>{cruise.amenities.restaurants} Restaurantes</span>
              </div>
            )}
            {cruise.amenities.gym && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Dumbbell className="w-4 h-4" />
                <span>Gimnasio</span>
              </div>
            )}
            {cruise.amenities.showsIncluded && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>Shows</span>
              </div>
            )}
          </div> */}

          {/* Información del barco */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm">{cruise.ship.name}</h4>
                <p className="text-xs text-gray-600">
                  {cruise.ship.capacity && `${cruise.ship.capacity.toLocaleString()} pasajeros`}
                  {cruise.ship.yearBuilt && ` • Año ${cruise.ship.yearBuilt}`}
                </p>
              </div>
              {cruise.ship.shipImageUrl && (
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