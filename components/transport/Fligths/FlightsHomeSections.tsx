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
import { 
  Plane, 
  MapPin, 
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
  ListPlus
} from 'lucide-react';

interface IFlightsHomeSectionsProps {}

const popularDestinations = [
  {
    id: 1,
    city: "París",
    country: "Francia",
    image: "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_1:1,w_3840,g_auto/f_auto/q_auto/v1/gc-v1/paris/3%20giorni%20a%20Parigi%20Tour%20Eiffel?_a=BAVAZGE70",
    price: "$1,299",
    discount: "25% OFF",
    description: "La ciudad del amor te espera",
    rating: 4.9,
    duration: "8h 45m",
    isPopular: true
  },
  {
    id: 2,
    city: "Tokio",
    country: "Japón",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
    price: "$1,899",
    discount: "15% OFF",
    description: "Tradición y modernidad en perfecta armonía",
    rating: 4.8,
    duration: "14h 30m",
    isPopular: true
  },
  {
    id: 3,
    city: "New York",
    country: "Estados Unidos",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop",
    price: "$899",
    discount: "30% OFF",
    description: "La ciudad que nunca duerme",
    rating: 4.7,
    duration: "6h 15m",
    isPopular: false
  },
  {
    id: 4,
    city: "Londres",
    country: "Reino Unido",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
    price: "$1,199",
    discount: "20% OFF",
    description: "Historia y elegancia británica",
    rating: 4.6,
    duration: "7h 20m",
    isPopular: false
  }
];

const flightDeals = [
  {
    airline: "Lufthansa",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=60&h=60&fit=crop",
    route: "Madrid → Frankfurt",
    originalPrice: "$450",
    salePrice: "$299",
    savings: "$151",
    class: "Economy",
    duration: "2h 30m",
    stops: "Directo"
  },
  {
    airline: "Air France",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=60&h=60&fit=crop",
    route: "Barcelona → París",
    originalPrice: "$380",
    salePrice: "$249",
    savings: "$131",
    class: "Business",
    duration: "1h 55m",
    stops: "Directo"
  },
  {
    airline: "Emirates",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=60&h=60&fit=crop",
    route: "Madrid → Dubai",
    originalPrice: "$899",
    salePrice: "$649",
    savings: "$250",
    class: "Premium Economy",
    duration: "7h 45m",
    stops: "Directo"
  }
];

const flightExperiences = [
  {
    type: "Primera Clase",
    icon: Award,
    color: "from-secondary to-secondary/80",
    features: ["Suite privada", "Chef gourmet", "Cama completamente plana", "Servicio de conserjería"],
    image: "https://globalbusinesslam.com/wp-content/uploads/2024/07/Avianca-Insignia-1-1.jpeg"
  },
  {
    type: "Business",
    icon: Briefcase,
    color: "from-primary to-primary/80",
    features: ["Asiento cama", "Lounge VIP", "Embarque prioritario", "Equipaje extra"],
    image: "https://c.ekstatic.net/ecl/aircraft-interior/business-class/a380/african-male-a380-business-champagne-cocktail-w768x480.jpg"
  },
  {
    type: "Premium Economy",
    icon: Star,
    color: "from-gray-500 to-gray-600",
    features: ["Más espacio", "Comidas premium", "Entretenimiento mejorado", "Servicio personalizado"],
    image: "https://revistatravelmanager.com/wp-content/uploads/2024/03/SIA_Premium-Economy.jpg"
  }
];

const travelStats = [
  { label: "Destinos disponibles", value: "500+", icon: Globe },
  { label: "Aerolíneas partner", value: "150+", icon: Plane },
  { label: "Vuelos diarios", value: "10,000+", icon: Calendar },
  { label: "Clientes satisfechos", value: "2M+", icon: Users }
];

// Sugerencias basadas en IA
const aiSuggestions = [
  {
    destination: "Bogotá",
    status: "bajando",
    color: "green",
    icon: "🟢",
    message: "Los precios para Bogotá están bajando, ¡reserva esta semana!",
    action: "Reservar ahora",
    savings: "15%"
  },
  {
    destination: "Miami",
    status: "subiendo",
    color: "orange",
    icon: "🟡",
    message: "Los precios para Miami subirán próximamente",
    action: "Esperar 2 semanas",
    savings: "8%"
  },
  {
    destination: "Madrid",
    status: "estable",
    color: "blue",
    icon: "🔵",
    message: "Los precios para Madrid se mantienen estables",
    action: "Reservar cuando gustes",
    savings: "5%"
  }
];

// Explorar por destino
const destinationCategories = [
  {
    category: "Caribe",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    minPrice: "$299",
    destinations: ["Cancún", "Punta Cana", "Jamaica", "Bahamas"]
  },
  {
    category: "Europa",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop",
    minPrice: "$899",
    destinations: ["París", "Londres", "Roma", "Madrid"]
  },
  {
    category: "América del Sur",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop",
    minPrice: "$399",
    destinations: ["Buenos Aires", "Río", "Lima", "Cartagena"]
  },
  {
    category: "Asia",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=300&h=200&fit=crop",
    minPrice: "$1299",
    destinations: ["Tokio", "Bangkok", "Singapur", "Seoul"]
  }
];

// Inspiración de viaje
const travelInspiration = [
  { type: "Playas", icon: "🏖️", destinations: 45 },
  { type: "Ciudades", icon: "🏙️", destinations: 120 },
  { type: "Naturaleza", icon: "🌿", destinations: 68 },
  { type: "Cultura", icon: "🎭", destinations: 89 }
];

// Vuelos de último minuto
const lastMinuteFlights = [
  {
    destination: "Cancún",
    departure: "En 2 días",
    originalPrice: "$599",
    salePrice: "$399",
    type: "Solo ida",
    image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=300&h=150&fit=crop"
  },
  {
    destination: "Miami",
    departure: "En 3 días",
    originalPrice: "$499",
    salePrice: "$349",
    type: "Ida y vuelta",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop"
  },
  {
    destination: "Nueva York",
    departure: "En 1 día",
    originalPrice: "$799",
    salePrice: "$599",
    type: "Solo ida",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=150&fit=crop"
  }
];

// FAQs
const faqs = [
  {
    question: "¿Puedo cambiar o cancelar mi reserva?",
    answer: "Sí, puedes cambiar o cancelar tu reserva hasta 24 horas antes del vuelo. Las políticas varían según la aerolínea y tipo de tarifa."
  },
  {
    question: "¿Qué equipaje está incluido?",
    answer: "El equipaje de mano está incluido en todas las tarifas. El equipaje facturado depende de la aerolínea y tipo de boleto seleccionado."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos todas las tarjetas de crédito principales, PayPal, transferencias bancarias y financiamiento a plazos."
  },
  {
    question: "¿Puedo seleccionar mi asiento?",
    answer: "Sí, puedes seleccionar tu asiento durante la reserva o después a través de tu cuenta. Algunos asientos pueden tener costo adicional."
  }
];

// Aerolíneas destacadas para el carrusel
const featuredAirlines = [
  {
    id: 1,
    name: "American Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_AA.svg",
    rating: 4.5
  },
  {
    id: 2,
    name: "United Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_UA.svg",
    rating: 4.3
  },
  {
    id: 3,
    name: "Southwest Airlines",
    logo: "https://assets.simpleviewinc.com/sv-greenville/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/greenville/Southwest-Logo-e5511f115056a36_e5512020-5056-a36f-23d14e1d88006376.png",
    rating: 4.6
  },
  {
    id: 4,
    name: "Delta Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_DL.svg",
    rating: 4.4
  },
  {
    id: 5,
    name: "Spirit Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_NK.svg",
    rating: 4.1
  },
  {
    id: 6,
    name: "JetBlue Airways",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_B6.svg",
    rating: 4.5
  },
  {
    id: 7,
    name: "Frontier Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_F9.svg",
    rating: 4.2
  },
  {
    id: 8,
    name: "Air India",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_AI.svg",
    rating: 4.0
  },
  {
    id: 9,
    name: "Hawaiian Airlines",
    logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_HA.svg",
    rating: 4.7
  },
  {
    id: 10,
    name: "Emirates",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/2560px-Emirates_logo.svg.png",
    rating: 4.8
  }
];


export default function FlightsHomeSections() {
  const [activeTab, setActiveTab] = useState("destinations");
  const [likedDestinations, setLikedDestinations] = useState<number[]>([]);
  const [compareFlights, setCompareFlights] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedDestinations(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (flightId: string) => {
    setCompareFlights(prev => {
      if (prev.includes(flightId)) {
        return prev.filter(id => id !== flightId);
      } else if (prev.length < 3) {
        return [...prev, flightId];
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
          <div className="flex items-center gap-3 mb-4">
            
            <div>
              <h1 className="text-3xl font-bold text-start mb-4">
                Vuela a tus sueños
              </h1>
              <p className="text-muted-foreground text-start mb-10">
                Descubre el mundo con los mejores precios y experiencias únicas
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {travelStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aerolíneas Destacadas - Carrusel Infinito */}
      <InfiniteCarousel
        title="Aerolíneas Destacadas"
        subtitle="Vuela con las mejores aerolíneas del mundo"
        items={featuredAirlines}
        animationDuration={30}
        showRating={true}
        showBenefits={true}
        benefits={[
          { text: "Mejor precio garantizado", icon: "check" },
          { text: "Reservas seguras", icon: "shield" },
          { text: "Atención 24/7", icon: "award" }
        ]}
      />

     

      {/* Navigation Tabs */}
      <StandardTabs
        items={[
          {
            value: "destinations",
            label: "Destinos Populares",
            icon: <MapPin className="w-4 h-4" />,
            content: (
              <div className="space-y-4">
                <div className="flex items-center justify-between pl-10">
                  <h2 className="text-3xl font-bold text-start">Destinos Populares</h2>
                  <Button variant="outline" className="flex items-center gap-2">
                    Ver todos <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-start mb-10 pl-10">
                  Descubre el mundo con los mejores precios y experiencias únicas
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularDestinations.map((destination) => (
                    <Card key={destination.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-lg
                    flex flex-col">
                      <div className="relative">
                        <img 
                          src={destination.image} 
                          alt={destination.city}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                        />
                        <div
                         role="button"
                          className="absolute h-8 w-8 flex items-center justify-center top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow-md transition-colors duration-300 cursor-pointer"
                          onClick={() => toggleLike(destination.id)}
                        
                        >
                          <Heart size={20}
                            className={` stroke-2 ${likedDestinations.includes(destination.id) ? 'fill-red-500 text-red-500' : 'hover:fill-red-500'} hover:fill-red-500`} 
                          />
                        </div>
                        {destination.isPopular && (
                          <Badge className="absolute top-2 left-2 bg-secondary hover:bg-secondary/80 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <Badge variant="secondary" className="absolute bottom-2 left-2 bg-green-500 text-white hover:bg-green-600">
                          {destination.discount}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{destination.city}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{destination.country}</p>
                        <p className="text-gray-700 text-sm mb-3">{destination.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {destination.duration}
                          </div>
                          <div className="text-2xl font-bold text-primary">{destination.price}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 h-full mt-auto  gap-2">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                          Buscar vuelos
                        </Button>
                        <Button 
                          variant="outline" 
                          
                          className="w-full h-12 border-primary text-primary hover:bg-primary/10"
                          onClick={() => toggleCompare(destination.city)}
                          disabled={compareFlights.length >= 3 && !compareFlights.includes(destination.city)}
                        >
                          {compareFlights.includes(destination.city) ? (
                            <>
                              <Minus className="w-4 h-4 mr-2" />
                              Quitar
                            </>
                          ) : (
                            <>
                              <ListPlus  className="w-4 h-4 mr-2" />
                              Comparar
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )
          },
          {
            value: "deals",
            label: "Ofertas Flash",
            icon: <Zap className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-start mb-2">Ofertas Flash</h2>
                  <Badge variant="destructive" className="animate-pulse bg-red-500 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Tiempo limitado
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {flightDeals.map((deal, index) => (
                    <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow rounded-lg">
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Ahorra {deal.savings}
                      </div>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={deal.logo} alt={deal.airline} />
                            <AvatarFallback>{deal.airline.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{deal.airline}</CardTitle>
                            <CardDescription>{deal.route}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600 line-through">{deal.originalPrice}</div>
                            <div className="text-2xl font-bold text-green-600">{deal.salePrice}</div>
                          </div>
                          <Badge variant="secondary">{deal.class}</Badge>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Duración:</span>
                            <span className="font-medium">{deal.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Escalas:</span>
                            <span className="font-medium text-green-600">{deal.stops}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-row gap-2">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white">
                          Reservar ahora
                        </Button>
                        <Button 
                          variant="outline" 
                          
                          className="w-full border-primary text-primary hover:bg-primary/10"
                          onClick={() => toggleCompare(deal.route)}
                          disabled={compareFlights.length >= 3 && !compareFlights.includes(deal.route)}
                        >
                          {compareFlights.includes(deal.route) ? (
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
            )
          },
          {
            value: "experiences",
            label: "Experiencias",
            icon: <Award className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-start mb-2">Experiencias de Vuelo</h2>
                  <p className="text-muted-foreground text-start mb-10">
                    Desde el lujo de primera clase hasta la comodidad de premium economy, 
                    encuentra la experiencia perfecta para tu viaje.
                  </p>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {flightExperiences.map((experience, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-tr-2xl">
                      <div className={`h-24 bg-gradient-to-br ${experience.color} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-6 left-4 text-white">
                         <div className='flex inline-flex items-center gap-2'>
                             <experience.icon className="w-8 h-8 mb-2" />
                          <h3 className="text-xl font-bold">{experience.type}</h3>
                         </div>
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
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <Shield className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                          Explorar {experience.type}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )
          }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobilePlaceholder="Selecciona una opción"
        centerTabs={true}
        useMobileSelect={true}
      />

  

      {/* Comparador Rápido */}
      {compareFlights.length > 0 && (
        <section className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-bold text-start mb-2">Comparar Vuelos</h3>
              <Badge variant="secondary" className="bg-primary text-white">
                {compareFlights.length}/3
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCompareFlights([])}>
              <Minus className="w-4 h-4 mr-2" />
              Limpiar todo
            </Button>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Compara hasta 3 opciones para encontrar el mejor vuelo para ti
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareFlights.map((flightId, index) => {
              const destination = popularDestinations.find(dest => dest.city === flightId);
              const deal = flightDeals.find(d => d.route === flightId);
              const item = destination || deal;
              
              return (
                <div key={index} className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {destination?.city || deal?.route || `Vuelo ${index + 1}`}
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleCompare(flightId)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-bold text-primary">
                        {destination?.price || deal?.salePrice || '$399'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span>{destination?.duration || deal?.duration || '8h 30m'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{destination ? 'Rating:' : 'Clase:'}</span>
                      <div className="flex items-center gap-1">
                        {destination ? (
                          <>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-green-600">{destination.rating}</span>
                          </>
                        ) : (
                          <span className="text-primary">{deal?.class || 'Economy'}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>{destination ? 'País:' : 'Aerolínea:'}</span>
                      <span className="text-gray-600">
                        {destination?.country || deal?.airline || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {compareFlights.length === 3 && (
            <div className="mt-4 text-center">
              <Button className="bg-primary hover:bg-primary/80">
                Ver Comparación Detallada
              </Button>
            </div>
          )}
        </section>
      )}

          {/* Sugerencias Basadas en IA */}
      <section className="space-y-6">
        <div className="text-start mb-8 pl-10">
          <div className="flex items-center inline-flex gap-2 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-start">Sugerencias Inteligentes</h2>
          </div>
          <p className="text-muted-foreground text-start mb-10">Nuestro algoritmo de IA predice las mejores oportunidades para reservar</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiSuggestions.map((suggestion, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow rounded-tr-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{suggestion.destination}</h3>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.message}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    className={`${
                      suggestion.color === 'green' ? 'bg-green-500' :
                      suggestion.color === 'orange' ? 'bg-secondary' : 'bg-primary'
                    } text-white`}
                  >
                    {suggestion.action}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">
                    Ahorra {suggestion.savings}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Explorar por Destino */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pl-10">
          <h2 className="text-3xl font-bold text-start mb-2">Explorar por Destino</h2>
          <div className="flex gap-2">
            {travelInspiration.map((inspiration, index) => (
              <Button key={index} variant="outline" size="sm" className="flex items-center gap-1">
                <span>{inspiration.icon}</span>
                {inspiration.type}
                <Badge variant="secondary" className="ml-1">{inspiration.destinations}</Badge>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationCategories.map((category, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="relative">
                <img 
                  src={category.image} 
                  alt={category.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.category}</h3>
                  <p className="text-sm opacity-90">Desde {category.minPrice}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-sm">
                  {category.destinations.length} destinos
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1">
                  {category.destinations.slice(0, 3).map((dest, destIndex) => (
                    <Badge key={destIndex} variant="outline" className="text-xs">
                      {dest}
                    </Badge>
                  ))}
                  {category.destinations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.destinations.length - 3} más
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vuelos de Último Minuto */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 pl-10">
          <div>
                      <div className='flex items-center inline-flex gap-2 mb-2'>
                        <Timer className="w-8 h-8 text-secondary" />
<h2 className="text-3xl font-bold text-start mb-2">Vuelos de Último Minuto</h2>
                      </div>
            <p className="text-muted-foreground text-start mb-10">Para viajeros espontáneos que buscan aventuras inmediatas</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lastMinuteFlights.map((flight, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={flight.image} 
                  alt={flight.destination}
                  className="w-full h-32 object-cover border-0"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                  {flight.departure}
                </Badge>
                <Badge className="absolute top-2 right-2 bg-secondary text-white">
                  {flight.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{flight.destination}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-600 line-through">{flight.originalPrice}</div>
                    <div className="text-xl font-bold text-green-600">{flight.salePrice}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {Math.round(((parseInt(flight.originalPrice.replace('$', '')) - parseInt(flight.salePrice.replace('$', ''))) / parseInt(flight.originalPrice.replace('$', ''))) * 100)}% OFF
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-secondary hover:bg-secondary/80 text-white">
                  ¡Reservar Ya!
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Aeropuertos Cercanos */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <div>
                      <div className='flex items-center inline-flex gap-2 mb-2'>
                          <Location className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-start mb-2">Vuelos desde tu Ciudad</h2>

            </div>
            <p className="text-muted-foreground text-start mb-6">Ofertas especiales saliendo desde Santo Domingo (SDQ)</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Miami</h3>
            <p className="text-2xl font-bold text-gray-900">$299</p>
            <p className="text-sm text-gray-600">Ida y vuelta</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Nueva York</h3>
            <p className="text-2xl font-bold text-gray-900">$449</p>
            <p className="text-sm text-gray-600">Ida y vuelta</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Madrid</h3>
            <p className="text-2xl font-bold text-gray-900">$599</p>
            <p className="text-sm text-gray-600">Ida y vuelta</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Panamá</h3>
            <p className="text-2xl font-bold text-gray-900">$199</p>
            <p className="text-sm text-gray-600">Ida y vuelta</p>
          </Card>
        </div>
      </section>

      {/* Programa GoFar */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold text-start mb-2">Programa GoFar</h2>
          </div>
          <p className="text-muted-foreground text-start mb-10">Acumula puntos en cada reserva y desbloquea beneficios exclusivos</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">1000 puntos</h3>
              <p className="text-sm text-gray-600">Por cada reserva de vuelo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Upgrade gratis</h3>
              <p className="text-sm text-gray-600">Con 10,000 puntos acumulados</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vuelo gratis</h3>
              <p className="text-sm text-gray-600">Con 25,000 puntos acumulados</p>
            </div>
          </div>
          
          <Button className="bg-secondary hover:bg-secondary/80 text-white">
            Únete al Programa GoFar
          </Button>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-start mb-2">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground text-start mb-10">Todo lo que necesitas saber sobre reservas de vuelos</p>
        </div>
        
        <div className="space-y-4 max-w-7xl mx-auto">
          {faqs.map((faq, index) => (
            <Collapsible key={index} open={openFaq === index} onOpenChange={() => toggleFaq(index)}>
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
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
          <h2 className="text-3xl font-bold text-start mb-2">¿Por qué elegir Asfales?</h2>
          <p className="text-muted-foreground text-start mb-10">Miles de viajeros confían en nosotros cada día</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reservas Seguras</h3>
            <p className="text-gray-600 text-sm">Protección total en todas tus reservas con garantía de reembolso</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mejor Precio Garantizado</h3>
            <p className="text-gray-600 text-sm">Encontramos los mejores precios y te devolvemos la diferencia</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Soporte 24/7</h3>
            <p className="text-gray-600 text-sm">Nuestro equipo está disponible las 24 horas para ayudarte</p>
          </div>
        </div>
      </section>
    </div>
  );
}