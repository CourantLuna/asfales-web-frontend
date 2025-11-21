'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import InfiniteCarousel from '@/components/shared/InfiniteCarousel';
import { StandardTabs } from '@/components/shared/standard-fields-component/StandardTabs';
import CustomBusCard, { BusTrip } from './CustomBusCard';
import { 
  Bus, 
  Route, 
  Clock, 
  Star, 
  TrendingUp, 
  Calendar,
  Users,
  Luggage,
  Wifi,
  Coffee,
  Shield,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Zap,
  Briefcase,
  Brain,
  Scale,
  Map,
  Compass,
  Gift,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Target,
  Timer,
  MapPin as Location,
  CreditCard,
  Wind,
  Navigation,
  Building2,
  Armchair,
  AlertCircle,
  Fuel,
  ShieldCheck,
  Camera,
  MessageSquare,
  DollarSign,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Ticket,
  Info,
  Mountain,
  TreePine,
  Sunset,
  Building,
  Palmtree,
  ListPlus
} from 'lucide-react';

interface IBusesHomeSectionsProps {}

const popularRoutes = [
  {
    id: 1,
    route: "Santo Domingo → Santiago",
    operator: "Metro Bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop",
    price: "$350",
    originalPrice: "$420",
    discount: "17% OFF",
    description: "Viaje cómodo con aire acondicionado y WiFi",
    rating: 4.8,
    duration: "2h 30m",
    distance: "155 km",
    frequency: "Cada 30 min",
    stops: 2,
    amenities: ["WiFi", "A/C", "USB", "Baño"],
    isPopular: true,
    category: "Premium"
  },
  {
    id: 2,
    route: "Santiago → Puerto Plata",
    operator: "Caribe Tours",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=250&fit=crop",
    price: "$280",
    originalPrice: "$320",
    discount: "13% OFF",
    description: "Directo al destino turístico más popular",
    rating: 4.7,
    duration: "1h 15m",
    distance: "68 km",
    frequency: "Cada 45 min",
    stops: 1,
    amenities: ["WiFi", "A/C", "Snacks", "GPS"],
    isPopular: true,
    category: "Turístico"
  },
  {
    id: 3,
    route: "Santo Domingo → La Romana",
    operator: "Expreso Bavaro",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    price: "$420",
    originalPrice: "$480",
    discount: "13% OFF",
    description: "Conexión directa a Punta Cana y Bávaro",
    rating: 4.6,
    duration: "1h 45m",
    distance: "110 km",
    frequency: "Cada hora",
    stops: 0,
    amenities: ["WiFi", "A/C", "Entretenimiento", "Reclinables"],
    isPopular: false,
    category: "Express"
  },
  {
    id: 4,
    route: "Santo Domingo → Barahona",
    operator: "Sur Express",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    price: "$520",
    originalPrice: "$620",
    discount: "16% OFF",
    description: "Hacia las playas vírgenes del sur",
    rating: 4.5,
    duration: "3h 20m",
    distance: "208 km",
    frequency: "3 veces al día",
    stops: 3,
    amenities: ["WiFi", "A/C", "Comidas", "Asientos Cama"],
    isPopular: false,
    category: "Confort"
  }
];

const busDeals = [
  {
    operator: "Metro Bus",
    logo: "https://images.unsplash.com/photo-1554306297-0c86e837d24b?w=60&h=60&fit=crop",
    route: "Santo Domingo → Mao",
    vehicle: "Mercedes Benz Sprinter",
    originalPrice: "$480",
    salePrice: "$320",
    savings: "$160",
    category: "Premium",
    duration: "2h 45m",
    features: "WiFi + Snacks",
    capacity: 25
  },
  {
    operator: "Caribe Tours",
    logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop",
    route: "Santiago → Moca",
    vehicle: "Volvo 9700",
    originalPrice: "$220",
    salePrice: "$160",
    savings: "$60",
    category: "Ejecutivo",
    duration: "45 min",
    features: "A/C + USB",
    capacity: 42
  },
  {
    operator: "Expreso Bávaro",
    logo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=60&h=60&fit=crop",
    route: "Santo Domingo → Higüey",
    vehicle: "King Long",
    originalPrice: "$380",
    salePrice: "$280",
    savings: "$100",
    category: "Turístico",
    duration: "1h 50m",
    features: "Entretenimiento + WiFi",
    capacity: 48
  }
];

const busExperiences = [
  {
    type: "VIP Premium",
    icon: Award,
    color: "from-secondary to-secondary/80",
    features: ["Asientos reclinables 180°", "Servicio de comidas", "WiFi de alta velocidad", "Entretenimiento personal"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop",
    price: "Desde $650"
  },
  {
    type: "Ejecutivo Plus",
    icon: Briefcase,
    color: "from-primary to-primary/80",
    features: ["Asientos de cuero", "Tomas USB individuales", "Aire acondicionado dual", "Espacio extra para piernas"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=200&fit=crop",
    price: "Desde $420"
  },
  {
    type: "Económico Confort",
    icon: Bus,
    color: "from-gray-500 to-gray-600",
    features: ["Asientos cómodos", "Aire acondicionado", "WiFi básico", "Ventanas panorámicas"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    price: "Desde $180"
  }
];

const busStats = [
  { label: "Rutas disponibles", value: "200+", icon: Route },
  { label: "Operadores partner", value: "15+", icon: Bus },
  { label: "Viajes diarios", value: "500+", icon: Calendar },
  { label: "Pasajeros satisfechos", value: "250K+", icon: Users }
];

// Sugerencias basadas en IA
const aiBusSuggestions = [
  {
    destination: "Puerto Plata",
    status: "demanda alta",
    color: "green",
    icon: "🟢",
    message: "Alta demanda para Puerto Plata este fin de semana, ¡reserva pronto!",
    action: "Reservar temprano",
    savings: "Asegurar asiento"
  },
  {
    destination: "Punta Cana",
    status: "precio especial",
    color: "orange",
    icon: "🟡",
    message: "Descuentos especiales en rutas a Punta Cana por temporada baja",
    action: "Aprovechar descuento",
    savings: "30% OFF"
  },
  {
    destination: "Barahona",
    status: "nueva ruta",
    color: "blue",
    icon: "🔵",
    message: "Nueva ruta directa a Barahona con buses de última generación",
    action: "Conocer nueva ruta",
    savings: "Estreno"
  }
];

// Explorar por región
const busDestinations = [
  {
    region: "Norte",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    minPrice: "$180",
    destinations: ["Puerto Plata", "Santiago", "Moca", "La Vega"]
  },
  {
    region: "Este",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
    minPrice: "$220",
    destinations: ["Punta Cana", "La Romana", "Higüey", "Bávaro"]
  },
  {
    region: "Sur",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    minPrice: "$280",
    destinations: ["Barahona", "Azua", "San Juan", "Neiba"]
  },
  {
    region: "Oeste",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    minPrice: "$320",
    destinations: ["Dajabón", "Monte Cristi", "Mao", "Valverde"]
  }
];

// Inspiración de viajes
const busInspiration = [
  { type: "Playas", icon: "🏖️", routes: 25 },
  { type: "Montañas", icon: "🗻", routes: 18 },
  { type: "Ciudades", icon: "🏙️", routes: 35 },
  { type: "Turístico", icon: "🎭", routes: 22 }
];

// Viajes de último minuto
const lastMinuteBuses = [
  {
    destination: "Santiago",
    departure: "En 2 horas",
    originalPrice: "$350",
    salePrice: "$280",
    type: "Express",
    operator: "Metro Bus",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300&h=150&fit=crop"
  },
  {
    destination: "Puerto Plata",
    departure: "En 45 min",
    originalPrice: "$420",
    salePrice: "$320",
    type: "Turístico",
    operator: "Caribe Tours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop"
  },
  {
    destination: "La Romana",
    departure: "En 3 horas",
    originalPrice: "$480",
    salePrice: "$380",
    type: "Premium",
    operator: "Expreso Bávaro",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=150&fit=crop"
  }
];

// FAQs específicos para buses
const busFaqs = [
  {
    question: "¿Qué equipaje puedo llevar en el bus?",
    answer: "Puedes llevar una maleta de hasta 23kg en bodega y equipaje de mano. El equipaje adicional tiene costo extra según la política del operador."
  },
  {
    question: "¿Puedo cambiar o cancelar mi boleto?",
    answer: "Sí, puedes cambiar o cancelar tu boleto hasta 2 horas antes de la salida. Los cambios pueden tener costo adicional según las condiciones de la tarifa."
  },
  {
    question: "¿Los buses tienen WiFi y aire acondicionado?",
    answer: "La mayoría de nuestros buses premium y ejecutivos incluyen WiFi gratuito y aire acondicionado. Las especificaciones se muestran en cada viaje."
  },
  {
    question: "¿Cómo selecciono mi asiento?",
    answer: "Puedes seleccionar tu asiento durante la reserva sin costo adicional. Los asientos preferenciales pueden tener un pequeño cargo extra."
  }
];

// Operadores destacados para el carrusel
const featuredBusOperators = [
  {
    id: 1,
    name: "Metro Bus",
    logo: "https://images.unsplash.com/photo-1554306297-0c86e837d24b?w=60&h=60&fit=crop",
    rating: 4.8
  },
  {
    id: 2,
    name: "Caribe Tours",
    logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop",
    rating: 4.7
  },
  {
    id: 3,
    name: "Expreso Bávaro",
    logo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=60&h=60&fit=crop",
    rating: 4.6
  },
  {
    id: 4,
    name: "Terra Bus",
    logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop",
    rating: 4.5
  },
  {
    id: 5,
    name: "Javilla Tours",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop",
    rating: 4.4
  },
  {
    id: 6,
    name: "Transporte Espinal",
    logo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=60&h=60&fit=crop",
    rating: 4.3
  }
];

// Datos de ejemplo para CustomBusCard
const sampleBusTrips: BusTrip[] = [
  {
    id: "1",
    routeCode: "SD-STI-001",
    operator: {
      id: "metro-bus",
      name: "Metro Bus",
      logoUrl: "https://images.unsplash.com/photo-1554306297-0c86e837d24b?w=60&h=60&fit=crop",
      rating: 4.8,
      contact: {
        phone: "+1 809-555-0123",
        email: "info@metrobus.com.do",
        website: "www.metrobus.com.do"
      }
    },
    origin: {
      city: "Santo Domingo",
      terminal: "Terminal de Buses del Este",
      countryCode: "DO",
      departureDateTime: "2025-07-17T08:00:00"
    },
    destination: {
      city: "Santiago",
      terminal: "Terminal Cibao",
      countryCode: "DO",
      arrivalDateTime: "2025-07-17T10:30:00"
    },
    durationMinutes: 150,
    distanceKm: 155,
    stops: [
      {
        city: "La Vega",
        terminal: "Terminal La Vega",
        arrivalTime: "09:15",
        departureTime: "09:25"
      }
    ],
    prices: [
      {
        class: "Económica",
        price: 280,
        currency: "DOP",
        refundable: true,
        includesMeal: false,
        seatSelectionIncluded: true
      },
      {
        class: "Premium",
        price: 350,
        currency: "DOP",
        refundable: true,
        includesMeal: true,
        seatSelectionIncluded: true
      }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: true,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: {
        includedKg: 23,
        carryOnKg: 8,
        extraKgPrice: 50
      },
      cancellation: "Cancelación gratuita hasta 2 horas antes de la salida",
      changes: "Cambios permitidos hasta 2 horas antes con costo de $50",
      minors: "Menores de 12 años viajan con 50% de descuento",
      pets: "No se permiten mascotas excepto animales de servicio"
    },
    availability: {
      seatsAvailable: 15,
      totalCapacity: 42
    },
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop"
    ],
    ratings: {
      overall: 4.8,
      comfort: 4.7,
      punctuality: 4.9,
      service: 4.6,
      cleanliness: 4.8,
      totalReviews: 245
    },
    isDirect: false,
    recurring: {
      frequency: "Cada 30 minutos",
      nextDates: ["2025-07-18T08:00:00", "2025-07-19T08:00:00"]
    },
    updatedAt: "2025-07-16T12:00:00"
  }
];

export default function BusesHomeSections() {
  const [activeTab, setActiveTab] = useState("routes");
  const [likedRoutes, setLikedRoutes] = useState<number[]>([]);
  const [compareBuses, setCompareBuses] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedRoutes(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (busId: string) => {
    setCompareBuses(prev => {
      if (prev.includes(busId)) {
        return prev.filter(id => id !== busId);
      } else if (prev.length < 3) {
        return [...prev, busId];
      }
      return prev;
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-start mb-4">
                Viaja por tierra con comodidad
              </h1>
              <p className="text-muted-foreground text-start mb-10">
                Conectamos cada rincón del país con buses modernos y servicios
                premium
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {busStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operadores Destacados - Carrusel Infinito */}
      <InfiniteCarousel
        title="Operadores Destacados"
        subtitle="Viaja con las mejores empresas de transporte del país"
        items={featuredBusOperators}
        animationDuration={25}
        showRating={true}
        showBenefits={true}
        benefits={[
          { text: "Tarifas competitivas", icon: "check" },
          { text: "Horarios puntuales", icon: "shield" },
          { text: "Soporte 24/7", icon: "award" },
        ]}
      />

      {/* Navigation Tabs */}
      <StandardTabs
        items={[
          {
            value: "routes",
            label: "Rutas Populares",
            icon: <Route className="w-4 h-4" />,
            content: (
              <div className="space-y-4">
                <div className="flex items-center justify-between pl-10">
                  <h2 className="text-3xl font-bold text-start mb-2">
                    Rutas Populares
                  </h2>
                  <Button variant="outline" className="flex items-center gap-2">
                    Ver todas <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-start mb-10 pl-10">
                  Los destinos más solicitados con las mejores frecuencias y
                  tarifas
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularRoutes.map((route) => (
                    <Card
                      key={route.id}
                      className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-lg flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={route.image}
                          alt={route.route}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                        />
                        <div
                          role="button"
                          className="absolute h-8 w-8 flex items-center justify-center top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow-md transition-colors duration-300 cursor-pointer"
                          onClick={() => toggleLike(route.id)}
                        >
                          <Heart
                            size={20}
                            className={`stroke-2 ${
                              likedRoutes.includes(route.id)
                                ? "fill-red-500 text-red-500"
                                : "hover:fill-red-500"
                            } hover:fill-red-500`}
                          />
                        </div>
                        {route.isPopular && (
                          <Badge className="absolute top-2 left-2 bg-secondary hover:bg-secondary/80 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className="absolute bottom-2 left-2 bg-green-500 text-white hover:bg-green-600"
                        >
                          {route.discount}
                        </Badge>
                        <Badge className="absolute bottom-2 right-2 bg-primary/80 text-white">
                          {route.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{route.route}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {route.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {route.operator}
                        </p>
                        <p className="text-gray-700 text-sm mb-3">
                          {route.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              {route.duration}
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              {route.price}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Route className="w-4 h-4" />
                              {route.distance}
                            </div>
                            <div className="text-gray-600">
                              {route.frequency}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {route.amenities.slice(0, 3).map((amenity, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {amenity}
                              </Badge>
                            ))}
                            {route.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{route.amenities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-row gap-2 items-center">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                          Horarios
                        </Button>
                        <Button
                          variant="outline"
                          
                          className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                          onClick={() => toggleCompare(route.route)}
                          disabled={
                            compareBuses.length >= 3 &&
                            !compareBuses.includes(route.route)
                          }
                        >
                          {compareBuses.includes(route.route) ? (
                            <>
                              <Minus className="w-4 h-4 mr-2" />
                              Quitar
                            </>
                          ) : (
                            <>
                              <ListPlus className="w-4 h-4 mr-2" />
                              Comparar
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          },
          {
            value: "deals",
            label: "Ofertas Flash",
            icon: <Zap className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-start mb-2">
                    Ofertas Flash
                  </h2>
                  <Badge
                    variant="destructive"
                    className="animate-pulse bg-red-500 text-white"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Tiempo limitado
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {busDeals.map((deal, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden hover:shadow-xl transition-shadow rounded-lg"
                    >
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Ahorra {deal.savings}
                      </div>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={deal.logo} alt={deal.operator} />
                            <AvatarFallback>
                              <Bus className="w-6 h-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {deal.operator}
                            </CardTitle>
                            <CardDescription>{deal.route}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600 line-through">
                              {deal.originalPrice}
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                              {deal.salePrice}
                            </div>
                          </div>
                          <Badge variant="secondary">{deal.category}</Badge>
                        </div>

                        <Separator />

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Vehículo:</span>
                            <span className="font-medium">{deal.vehicle}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Duración:</span>
                            <span className="font-medium">{deal.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Capacidad:</span>
                            <span className="font-medium text-blue-600">
                              {deal.capacity} asientos
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Incluye:</span>
                            <span className="font-medium text-green-600">
                              {deal.features}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-row gap-2 items-center">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                          Reservar ahora
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                          onClick={() => toggleCompare(deal.route)}
                          disabled={
                            compareBuses.length >= 3 &&
                            !compareBuses.includes(deal.route)
                          }
                        >
                          {compareBuses.includes(deal.route) ? (
                             <>
                                                         <Minus className="w-4 h-4 mr-2" />
                                                         Quitar
                                                       </>
                                                     ) : (
                                                       <>
                                                         <ListPlus className="w-4 h-4 mr-2" />
                                                         Comparar
                                                       </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          },
          {
            value: "experiences",
            label: "Experiencias",
            icon: <Award className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-start mb-2">
                    Experiencias de Viaje
                  </h2>
                  <p className="text-muted-foreground text-start mb-10">
                    Desde buses VIP premium hasta opciones económicas, encuentra
                    la experiencia perfecta para tu viaje.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {busExperiences.map((experience, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-tr-2xl"
                    >
                      <div
                        className={`h-24 bg-gradient-to-br ${experience.color} relative`}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-6 left-4 text-white">
                          <div className="flex items-center gap-2">
                            <experience.icon className="w-8 h-8 mb-2" />
                            <h3 className="text-xl font-bold">
                              {experience.type}
                            </h3>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 text-white font-bold text-sm">
                          {experience.price}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <img
                          src={experience.image}
                          alt={experience.type}
                          className="w-full h-32 object-cover rounded-lg mb-4 border-0"
                        />
                        <ul className="space-y-2">
                          {experience.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          Explorar {experience.type}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobilePlaceholder="Selecciona una opción"
        centerTabs={true}
        useMobileSelect={true}
      />

           {/* Comparador Rápido */}
      {compareBuses.length > 0 && (
        <section className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-bold text-start mb-2">
                Comparar Buses
              </h3>
              <Badge variant="secondary" className="bg-primary text-white">
                {compareBuses.length}/3
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompareBuses([])}
            >
              <Minus className="w-4 h-4 mr-2" />
              Limpiar todo
            </Button>
          </div>

          <p className="text-muted-foreground mb-4">
            Compara hasta 3 opciones para encontrar el mejor viaje para ti
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareBuses.map((busId, index) => {
              const route = popularRoutes.find((r) => r.route === busId);
              const deal = busDeals.find((d) => d.route === busId);
              const item = route || deal;

              return (
                <div key={index} className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {route?.route || deal?.route || `Bus ${index + 1}`}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCompare(busId)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-bold text-primary">
                        {route?.price || deal?.salePrice || "$280"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span>
                        {route?.duration || deal?.duration || "2h 30m"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{route ? "Rating:" : "Operador:"}</span>
                      <div className="flex items-center gap-1">
                        {route ? (
                          <>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-green-600">
                              {route.rating}
                            </span>
                          </>
                        ) : (
                          <span className="text-primary">
                            {deal?.operator || "Metro Bus"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>{route ? "Frecuencia:" : "Categoría:"}</span>
                      <span className="text-gray-600">
                        {route?.frequency || deal?.category || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {compareBuses.length === 3 && (
            <div className="mt-4 text-center">
              <Button className="bg-primary hover:bg-primary/80">
                Ver Comparación Detallada
              </Button>
            </div>
          )}
        </section>
      )}

      {/* CustomBusCard Showcase */}
      <section className="space-y-6">
        <div className="text-start mb-8 pl-10">
          <h2 className="text-3xl font-bold text-start mb-2">
            Viajes Destacados
          </h2>
          <p className="text-muted-foreground text-start mb-10">
            Información detallada de nuestros mejores viajes con todas las
            comodidades
          </p>
        </div>

        <div className="space-y-6">
          {sampleBusTrips.map((trip) => (
            <CustomBusCard
              key={trip.id}
              busTrip={trip}
              variant="featured"
              showSaveButton={true}
              showShareButton={true}
              onSave={(tripId) => console.log("Saved trip:", tripId)}
              onShare={(tripId) => console.log("Shared trip:", tripId)}
              onClick={(tripId) => console.log("Clicked trip:", tripId)}
              onClassSelect={(tripId, classType) =>
                console.log("Selected class:", classType, "for trip:", tripId)
              }
            />
          ))}
        </div>
      </section>

      {/* Sugerencias Basadas en IA */}
      <section className="space-y-6">
        <div className="text-start mb-8 pl-10">
          <div className="flex items-center inline-flex gap-2 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-start mb-2">
              Sugerencias Inteligentes
            </h2>
          </div>
          <p className="text-muted-foreground text-start mb-10">
            Nuestro algoritmo de IA predice las mejores oportunidades para
            viajar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiBusSuggestions.map((suggestion, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow rounded-tr-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">
                      {suggestion.destination}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {suggestion.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    className={`${
                      suggestion.color === "green"
                        ? "bg-green-500"
                        : suggestion.color === "orange"
                        ? "bg-secondary"
                        : "bg-primary"
                    } text-white`}
                  >
                    {suggestion.action}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">
                    {suggestion.savings}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

 

      {/* Explorar por Región */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pl-10">
          <h2 className="text-3xl font-bold text-start mb-2">
            Explorar por Región
          </h2>
          <div className="flex gap-2">
            {busInspiration.map((inspiration, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <span>{inspiration.icon}</span>
                {inspiration.type}
                <Badge variant="secondary" className="ml-1">
                  {inspiration.routes}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {busDestinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.region}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {destination.region}
                  </h3>
                  <p className="text-sm opacity-90">
                    Desde {destination.minPrice}
                  </p>
                </div>
                <Badge className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-sm">
                  {destination.destinations.length} destinos
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1">
                  {destination.destinations
                    .slice(0, 3)
                    .map((dest, destIndex) => (
                      <Badge
                        key={destIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {dest}
                      </Badge>
                    ))}
                  {destination.destinations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{destination.destinations.length - 3} más
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Buses de Último Minuto */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 pl-10">
          <div>
            <div className="flex items-center inline-flex gap-2 mb-2">
              <Timer className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold text-start mb-2">
                Buses de Último Minuto
              </h2>
            </div>
            <p className="text-muted-foreground text-start mb-10">
              Para viajeros espontáneos que necesitan partir hoy mismo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lastMinuteBuses.map((bus, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={bus.image}
                  alt={bus.destination}
                  className="w-full h-32 object-cover border-0"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                  {bus.departure}
                </Badge>
                <Badge className="absolute top-2 right-2 bg-secondary text-white">
                  {bus.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{bus.destination}</h3>
                <p className="text-sm text-gray-600 mb-2">{bus.operator}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-600 line-through">
                      {bus.originalPrice}
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {bus.salePrice}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {Math.round(
                      ((parseInt(bus.originalPrice.replace(/[$,]/g, "")) -
                        parseInt(bus.salePrice.replace(/[$,]/g, ""))) /
                        parseInt(bus.originalPrice.replace(/[$,]/g, ""))) *
                        100
                    )}
                    % OFF
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-secondary hover:bg-secondary/80 text-white">
                  ¡Reservar Ahora!
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Terminales Principales */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <div className="flex items-center inline-flex gap-2 mb-2">
              <Building2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-start mb-2">
                Terminales Principales
              </h2>
            </div>
            <p className="text-muted-foreground text-start mb-6">
              Principales puntos de salida en el Gran Santo Domingo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Terminal del Este</h3>
            <p className="text-2xl font-bold text-gray-900">$180</p>
            <p className="text-sm text-gray-600">Hacia el este</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Terminal Cibao</h3>
            <p className="text-2xl font-bold text-gray-900">$280</p>
            <p className="text-sm text-gray-600">Hacia el norte</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Terminal del Oeste</h3>
            <p className="text-2xl font-bold text-gray-900">$320</p>
            <p className="text-sm text-gray-600">Hacia el oeste</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Terminal del Sur</h3>
            <p className="text-2xl font-bold text-gray-900">$420</p>
            <p className="text-sm text-gray-600">Hacia el sur</p>
          </Card>
        </div>
      </section>

      {/* Programa ViajeRewards */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold text-start mb-2">
              Programa ViajeRewards
            </h2>
          </div>
          <p className="text-muted-foreground text-start mb-10">
            Acumula kilómetros en cada viaje y desbloquea beneficios exclusivos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">10 km por $</h3>
              <p className="text-sm text-gray-600">Por cada peso gastado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Descuentos VIP</h3>
              <p className="text-sm text-gray-600">Con 5,000 km acumulados</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Viaje gratis</h3>
              <p className="text-sm text-gray-600">Con 20,000 km acumulados</p>
            </div>
          </div>

          <Button className="bg-secondary hover:bg-secondary/80 text-white">
            Únete al Programa ViajeRewards
          </Button>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-start mb-2">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground text-start mb-10">
            Todo lo que necesitas saber sobre viajes en bus
          </p>
        </div>

        <div className="space-y-4 max-w-7xl mx-auto">
          {busFaqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openFaq === index}
              onOpenChange={() => toggleFaq(index)}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="mt-2 border-t-0">
                  <CardContent className="p-6 pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-start mb-2">
            ¿Por qué elegir Asfales para buses?
          </h2>
          <p className="text-muted-foreground text-start mb-10">
            Conectamos el país con los mejores operadores de transporte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Viajes Seguros</h3>
            <p className="text-gray-600 text-sm">
              Solo trabajamos con operadores certificados con los más altos
              estándares de seguridad
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Puntualidad Garantizada
            </h3>
            <p className="text-gray-600 text-sm">
              Monitoreo en tiempo real de todos los viajes para garantizar
              horarios precisos
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Mejores Tarifas
            </h3>
            <p className="text-gray-600 text-sm">
              Comparamos precios de todos los operadores para ofrecerte las
              mejores tarifas del mercado
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}