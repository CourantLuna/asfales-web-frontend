'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SeatMap, { Seat, SeatMapConfig } from '@/components/shared/SeatMap';
import { 
  Bus, 
  Star, 
  Clock,
  MapPin,
  Heart,
  Share2,
  Bookmark,
  Wifi,
  Utensils,
  Zap,
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
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Definición de tipos
export type BusTrip = {
  id: string;
  routeCode: string;
  operator: {
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

  origin: {
    city: string;
    terminal: string;
    countryCode: string;
    departureDateTime: string;
  };

  destination: {
    city: string;
    terminal: string;
    countryCode: string;
    arrivalDateTime: string;
  };

  durationMinutes: number;
  distanceKm: number;

  stops: {
    city: string;
    terminal?: string;
    arrivalTime?: string;
    departureTime?: string;
  }[];

  prices: {
    class: 'Económica' | 'Premium' | 'VIP';
    price: number;
    currency: 'USD' | 'DOP' | 'EUR' | 'COP';
    refundable: boolean;
    includesMeal?: boolean;
    seatSelectionIncluded?: boolean;
  }[];

  amenities: {
    wifi: boolean;
    usbPorts: boolean;
    ac: boolean;
    onboardToilet: boolean;
    recliningSeats: boolean;
    entertainment?: boolean;
    reading_light?: boolean;
    gps_tracking?: boolean;
    emergency_exit?: boolean;
  };

  policies: {
    baggage: {
      includedKg: number;
      carryOnKg: number;
      extraKgPrice?: number;
    };
    cancellation: string;
    changes: string;
    minors?: string;
    pets?: string;
    luggage?: string;
  };

  availability: {
    seatsAvailable: number;
    totalCapacity: number;
  };

  images?: string[];
  
  ratings?: {
    overall: number;
    comfort: number;
    punctuality: number;
    service: number;
    cleanliness: number;
    totalReviews: number;
  };

  isDirect: boolean;
  recurring?: {
    frequency: string;
    nextDates: string[];
  };

  updatedAt: string;
};

export interface CustomBusCardProps {
  busTrip: BusTrip;
  variant?: 'default' | 'compact' | 'featured';
  showSaveButton?: boolean;
  showShareButton?: boolean;
  onSave?: (tripId: string) => void;
  onShare?: (tripId: string) => void;
  onClick?: (tripId: string) => void;
  onClassSelect?: (tripId: string, classType: string) => void;
}

// Tipos de tabs disponibles
type TabType = 'servicios' | 'fotos' | 'terminales' | 'comentarios' | 'politicas' | 'sillas';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabConfig[] = [
  { id: 'servicios', label: 'Servicios', icon: <Info className="w-4 h-4" /> },
  { id: 'fotos', label: 'Fotos', icon: <Camera className="w-4 h-4" /> },
  { id: 'terminales', label: 'Terminal de salida y llegada', icon: <MapPinIcon className="w-4 h-4" /> },
  { id: 'comentarios', label: 'Puntuación y comentarios', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'politicas', label: 'Política de Reserva', icon: <Shield className="w-4 h-4" /> },
  { id: 'sillas', label: 'RESERVAR SILLA/S', icon: <Armchair className="w-4 h-4" /> }
];

// Función para formatear tiempo
const formatTime = (dateString: string) => {
  try {
    if (!dateString) return '--:--';
    
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '--:--';
    }
    
    return format(date, 'H:mm', { locale: es });
  } catch (error) {
    console.error('Error formatting time:', error, dateString);
    return '--:--';
  }
};

// Función para formatear duración
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
};

// Función para obtener precio más barato
const getCheapestPrice = (prices: BusTrip['prices']) => {
  return prices.reduce((cheapest, price) => 
    price.price < cheapest.price ? price : cheapest
  );
};

// Función para formatear precio con símbolo de moneda
const formatPrice = (price: number, currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    DOP: 'RD$',
    COP: 'COL$'
  };
  
  return `${symbols[currency] || '$'} ${price.toLocaleString()}.00`;
};

export default function CustomBusCard({
  busTrip,
  variant = 'default',
  showSaveButton = true,
  showShareButton = true,
  onSave,
  onShare,
  onClick,
  onClassSelect
}: CustomBusCardProps) {
  const [expandedTab, setExpandedTab] = useState<TabType | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>(busTrip.prices[0]?.class || 'Económica');
  const [isSaved, setIsSaved] = useState(false);

  // Estados para el mapa de asientos - SIEMPRE declarados para evitar el error de hooks
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  
  // Generar asientos una sola vez
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const columnLabels = ['A', 'B', 'C', 'D'];
    const seatMapConfig = {
      rows: 12,
      columnsPerRow: 4
    };
    
    for (let row = 1; row <= seatMapConfig.rows; row++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = columnLabels[colIndex];
        const seatNumber = (row - 1) * 4 + colIndex + 1;
        
        // Determinar estado del asiento basado en disponibilidad
        const isAvailable = seatNumber <= busTrip.availability.seatsAvailable + 
          (busTrip.availability.totalCapacity - busTrip.availability.seatsAvailable - 15);
        
        seats.push({
          id: `${row}${column}`,
          row,
          column,
          status: isAvailable ? 'available' : 'occupied',
          class: 'economy', // Los buses generalmente tienen una sola clase
          price: busTrip.prices[0]?.price || 0
        });
      }
    }
    
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const cheapestPrice = getCheapestPrice(busTrip.prices);
  const selectedPrice = busTrip.prices.find(p => p.class === selectedClass) || cheapestPrice;

  const handleTabClick = (tabId: TabType) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(busTrip.id);
  };

  const handleShare = () => {
    onShare?.(busTrip.id);
  };

  const handleClassSelect = (classType: string) => {
    setSelectedClass(classType);
    onClassSelect?.(busTrip.id, classType);
  };

  // Funciones para manejo de asientos
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeatIds(prev => [...prev, seatId]);
  };

  const handleSeatDeselect = (seatId: string) => {
    setSelectedSeatIds(prev => prev.filter(id => id !== seatId));
  };

  const renderServiciosTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {busTrip.amenities.wifi && (
          <div className="flex flex-col items-center text-center">
            <Wifi className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Wi-Fi</span>
          </div>
        )}
        {busTrip.amenities.ac && (
          <div className="flex flex-col items-center text-center">
            <Wind className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Aire Acondicionado</span>
          </div>
        )}
        {busTrip.amenities.usbPorts && (
          <div className="flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Puerto USB</span>
          </div>
        )}
        {busTrip.amenities.onboardToilet && (
          <div className="flex flex-col items-center text-center">
            <Building2 className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Baño a bordo</span>
          </div>
        )}
        {busTrip.amenities.recliningSeats && (
          <div className="flex flex-col items-center text-center">
            <Armchair className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Asientos reclinables</span>
          </div>
        )}
        {busTrip.amenities.reading_light && (
          <div className="flex flex-col items-center text-center">
            <Award className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Luz de lectura</span>
          </div>
        )}
        {busTrip.amenities.gps_tracking && (
          <div className="flex flex-col items-center text-center">
            <Navigation className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Sistema GPS</span>
          </div>
        )}
        {busTrip.amenities.emergency_exit && (
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-600">Salida de emergencia</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderFotosTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      {busTrip.images && busTrip.images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {busTrip.images.map((image, index) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`${busTrip.operator.name} - Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No hay fotos disponibles para este bus</p>
          <p className="text-sm text-gray-400 mt-1">
            Las imágenes son de referencia y las características del bus pueden cambiar por decisión 
            de la compañía transportadora por causas excepcionales.
          </p>
        </div>
      )}
    </div>
  );

  const renderTerminalesTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Terminal de Salida */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-secondary/80" />
            <h4 className="font-semibold text-secondary">Terminal de Salida</h4>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="font-medium">{busTrip.origin.city}</p>
            <p className="text-sm text-gray-600 mb-2">{busTrip.origin.terminal}</p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold">{formatTime(busTrip.origin.departureDateTime)}</span>
            </div>
          </div>
        </div>

        {/* Terminal de Llegada */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary/80" />
            <h4 className="font-semibold text-primary">Terminal de Llegada</h4>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="font-medium">{busTrip.destination.city}</p>
            <p className="text-sm text-gray-600 mb-2">{busTrip.destination.terminal}</p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold">{formatTime(busTrip.destination.arrivalDateTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Paradas intermedias si existen */}
      {busTrip.stops.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Route className="w-5 h-5 text-blue-600" />
            Paradas intermedias
          </h4>
          <div className="space-y-2">
            {busTrip.stops.map((stop, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                <div>
                  <p className="font-medium">{stop.city}</p>
                  {stop.terminal && <p className="text-sm text-gray-600">{stop.terminal}</p>}
                </div>
                {stop.arrivalTime && (
                  <span className="text-sm font-medium">{formatTime(stop.arrivalTime)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderComentariosTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      {busTrip.ratings ? (
        <div>
          <div className="bg-white p-4 rounded-lg border mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">{busTrip.ratings.overall.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">({busTrip.ratings.totalReviews} reseñas)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">{busTrip.ratings.comfort.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Comodidad</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{busTrip.ratings.punctuality.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Puntualidad</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{busTrip.ratings.service.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Servicio</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{busTrip.ratings.cleanliness.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Limpieza</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">La calificación mostrada es la calificación agregada para este operador de bus.</p>
        </div>
      )}
    </div>
  );

  const renderPoliticasTab = () => (
    <div className="p-4 bg-gray-50 border-t">
      <div className="space-y-4">
        {/* Política de Equipaje */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Luggage className="w-5 h-5 text-blue-600" />
            Política de equipaje
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Equipaje incluido: {busTrip.policies.baggage.includedKg} kg</p>
            <p>• Equipaje de mano: {busTrip.policies.baggage.carryOnKg} kg</p>
            {busTrip.policies.baggage.extraKgPrice && (
              <p>• Kg adicional: {formatPrice(busTrip.policies.baggage.extraKgPrice, busTrip.prices[0].currency)}</p>
            )}
          </div>
        </div>

        {/* Política de Cancelación */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Política de Cancelación
          </h4>
          <p className="text-sm text-gray-600">{busTrip.policies.cancellation}</p>
        </div>

        {/* Política de Cambios */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            Política de Cambios
          </h4>
          <p className="text-sm text-gray-600">{busTrip.policies.changes}</p>
        </div>

        {/* Otras políticas */}
        {busTrip.policies.minors && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Política de menores
            </h4>
            <p className="text-sm text-gray-600">{busTrip.policies.minors}</p>
          </div>
        )}

        {busTrip.policies.pets && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-600" />
              Política de mascotas
            </h4>
            <p className="text-sm text-gray-600">{busTrip.policies.pets}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSillasTab = () => {
    // Configuración del mapa de asientos para el bus
    const seatMapConfig: SeatMapConfig = {
      type: 'bus',
      rows: 12,
      columnsPerRow: 4,
      orientation: variant === 'compact' ? 'vertical' : 'horizontal',
      seatLayout: {
        left: 2,
        right: 2
      },
    };

    return (
      <div className="p-4 bg-gray-50 ">
        <div className=" flex flex-row">

          <div className='w-full flex-1 flex flex-col items-center justify-center gap-2'>
            {/* Componente SeatMap reutilizable */}
          <SeatMap
            config={seatMapConfig}
            seats={seats}
            selectedSeats={selectedSeatIds}
            onSeatSelect={handleSeatSelect}
            onSeatDeselect={handleSeatDeselect}
            maxSelections={6}
            showLegend={true}
            showClassInfo={false}
            showSelectedSeats={false}
          />
          <div className="text-center text-sm text-gray-600 mb-4">
                <p>{busTrip.availability.seatsAvailable} de {busTrip.availability.totalCapacity} sillas disponibles</p>
               
              </div>
          </div>

          {/* Información de selección de asientos */}
          {selectedSeatIds.length === 0 ? (
            null
          ) : (
            /* Resumen de reserva cuando hay asientos seleccionados */
            <div className="bg-white rounded-lg border shadow-md p-6 min-w-[300px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">SALIDA & LLEGADA</h3>
                <button 
                  onClick={() => setSelectedSeatIds([])}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Información de salida */}
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{formatTime(busTrip.origin.departureDateTime)}</div>
                    <div className="font-medium">{busTrip.origin.city}</div>
                    <div className="text-sm text-gray-600">{busTrip.origin.terminal}</div>
                  </div>
                </div>
              </div>

              {/* Información de llegada */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{formatTime(busTrip.destination.arrivalDateTime)}</div>
                    <div className="font-medium">{busTrip.destination.city}</div>
                    <div className="text-sm text-gray-600">{busTrip.destination.terminal}</div>
                  </div>
                </div>
              </div>

              {/* Número de asiento */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">N° de asiento</div>
                <div className="font-semibold">
                  {selectedSeatIds.map((seatId, index) => (
                    <span key={seatId}>
                      {seatId}
                      {index < selectedSeatIds.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detalles del precio */}
              <div className="border-t pt-4 mb-6">
                <h4 className="font-semibold mb-3">Detalles del precio</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Moneda</span>
                    <span>{formatPrice(selectedPrice.price * selectedSeatIds.length, selectedPrice.currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2">
                    <span>Monto total</span>
                    <span>{formatPrice((selectedPrice.price + 1100) * selectedSeatIds.length, selectedPrice.currency)}</span>
                  </div>
                </div>
                {/* <div className="text-xs text-gray-500 mt-2">
                  Incluye cargo de {formatPrice(1100, selectedPrice.currency)} por asiento
                </div> */}
              </div>

              {/* Ver detalles link */}
              <div className="text-center mb-4">
                <button className="text-primary text-sm hover:underline">
                  Ver Detalles
                </button>
              </div>

              {/* Botón de reservar */}
              <Button 
              variant={"default"}
                className="w-full text-white py-3 rounded-lg font-semibold"
                onClick={() => {
                  // Aquí iría la lógica de reserva
                  console.log('Reservando asientos:', selectedSeatIds);
                }}
              >
                RESERVAR
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = (tabId: TabType) => {
    switch (tabId) {
      case 'servicios':
        return renderServiciosTab();
      case 'fotos':
        return renderFotosTab();
      case 'terminales':
        return renderTerminalesTab();
      case 'comentarios':
        return renderComentariosTab();
      case 'politicas':
        return renderPoliticasTab();
      case 'sillas':
        return renderSillasTab();
      default:
        return null;
    }
  };

  return (
    <Card className="w-full overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header principal del card */}
      <CardContent className="p-0">
        <div className="p-4">
          {/* Fila superior: Logo, operador, horarios, precio */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Logo del operador */}
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                {busTrip.operator.logoUrl ? (
                  <img 
                    src={busTrip.operator.logoUrl} 
                    alt={busTrip.operator.name}
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                ) : (
                  <Bus className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-lg">{busTrip.operator.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">BUS</Badge>
                  {busTrip.operator.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{busTrip.operator.rating}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">Reembolsable</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(selectedPrice.price, selectedPrice.currency)}
              </div>
              <div className="text-sm text-gray-600">
                {busTrip.availability.seatsAvailable} sillas disponibles
              </div>
              <div className="text-xs text-gray-500">
                Cargo {formatPrice(1100, selectedPrice.currency)} / Asiento
              </div>
            </div>
          </div>

          {/* Fila de horarios y duración */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {/* Horario de salida */}
              <div>
                <div className="text-2xl font-bold">{formatTime(busTrip.origin.departureDateTime)}</div>
                <div className="text-sm text-gray-600">{busTrip.origin.city}</div>
                <div className="text-xs text-gray-500">{busTrip.origin.terminal}</div>
              </div>

              {/* Duración y ruta */}
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-600 mb-1">{formatDuration(busTrip.durationMinutes)}</div>
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <Bus className="w-4 h-4 text-gray-400 mx-2" />
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                {!busTrip.isDirect && (
                  <div className="text-xs text-gray-500 mt-1">
                    {busTrip.stops.length} parada{busTrip.stops.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Horario de llegada */}
              <div>
                <div className="text-2xl font-bold">{formatTime(busTrip.destination.arrivalDateTime)}</div>
                <div className="text-sm text-gray-600">{busTrip.destination.city}</div>
                <div className="text-xs text-gray-500">{busTrip.destination.terminal}</div>
              </div>
            </div>
          </div>

          {/* Amenidades destacadas */}
          <div className="flex items-center gap-4 mb-4">
            {busTrip.amenities.wifi && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Wifi className="w-4 h-4" />
                <span>Wi-Fi</span>
              </div>
            )}
            {busTrip.amenities.ac && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Wind className="w-4 h-4" />
                <span>A/C</span>
              </div>
            )}
            {busTrip.amenities.onboardToilet && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>Baño</span>
              </div>
            )}
            {busTrip.amenities.gps_tracking && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Navigation className="w-4 h-4" />
                <span>GPS</span>
              </div>
            )}
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
                    ${tab.id === 'sillas'
                      ? expandedTab === tab.id 
                        ? 'bg-primary/60 text-white border border-primary/80' 
                        : 'bg-primary text-white hover:bg-primary/80'
                      : expandedTab === tab.id 
                        ? 'bg-primary/40 text-primary/90 border border-primary/40' 
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
