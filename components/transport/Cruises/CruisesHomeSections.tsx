'use client';

import React, { Suspense, useState } from 'react';
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
  Ship, 
  Anchor, 
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
  Waves,
  Utensils,
  Sparkles,
  Gamepad2,
  Baby,
  Crown,
  Eye,
  Wind,
  BedDouble,
  Route,
  Sunset,
  Camera,
  Music,
  Dumbbell,
  ListPlus
} from 'lucide-react';

interface ICruisesHomeSectionsProps {}

const popularCruises = [
  {
    id: 1,
    title: "Mediterráneo Clásico",
    cruiseLine: "Royal Caribbean",
    ship: "Symphony of the Seas",
    image: "https://cruisepanda.com/storage/ships/cGzgYqXa47vpgzIj3WaZF57potJCuWhlbiM8ByPL.jpg",
    price: "$2,899",
    originalPrice: "$3,499",
    discount: "17% OFF",
    description: "7 noches navegando por las joyas del Mediterráneo",
    rating: 4.8,
    duration: "7 noches",
    startPort: "Barcelona",
    endPort: "Roma",
    departureDate: "2025-06-15",
    stops: ["Monaco", "Palma", "Valencia", "Nápoles"],
    capacity: 6780,
    isPopular: true,
    category: "Premium"
  },
  {
    id: 2,
    title: "Caribe Oriental",
    cruiseLine: "Norwegian Cruise Line",
    ship: "Norwegian Breakaway",
    image: "https://cruisespotlight.com/wp-content/uploads/2021/11/Norwegian-Breakaway-Ship.jpg",
    price: "$1,999",
    originalPrice: "$2,299",
    discount: "13% OFF",
    description: "Paraíso tropical con playas de ensueño",
    rating: 4.7,
    duration: "10 noches",
    startPort: "Miami",
    endPort: "Miami",
    departureDate: "2025-05-20",
    stops: ["Cozumel", "Jamaica", "Bahamas", "St. Thomas"],
    capacity: 3963,
    isPopular: true,
    category: "Premium"
  },
  {
    id: 3,
    title: "Fiordos Noruegos",
    cruiseLine: "MSC Cruises",
    ship: "MSC Preziosa",
    image: "https://thumbs.dreamstime.com/b/olden-norway-th-june-msc-preziosa-anchor-fjord-msc-preziosa-anchor-fjord-301011839.jpg",
    price: "$3,299",
    originalPrice: "$3,899",
    discount: "15% OFF",
    description: "Espectacular belleza natural de los fiordos",
    rating: 4.6,
    duration: "14 noches",
    startPort: "Copenhague",
    endPort: "Bergen",
    departureDate: "2025-07-10",
    stops: ["Geiranger", "Flam", "Stavanger", "Alesund"],
    capacity: 3502,
    isPopular: false,
    category: "Luxury"
  },
  {
    id: 4,
    title: "Alaska Salvaje",
    cruiseLine: "Princess Cruises",
    ship: "Majestic Princess",
    image: "https://cruisemaven.com/wp-content/uploads/2021/09/Majestic-Princess-Glacier-Bay.jpg",
    price: "$2,599",
    originalPrice: "$2,999",
    discount: "13% OFF",
    description: "Aventura única entre glaciares y vida salvaje",
    rating: 4.9,
    duration: "12 noches",
    startPort: "Seattle",
    endPort: "Vancouver",
    departureDate: "2025-08-05",
    stops: ["Juneau", "Ketchikan", "Icy Strait", "Skagway"],
    capacity: 3560,
    isPopular: false,
    category: "Adventure"
  }
];

const cruiseDeals = [
  {
    cruiseLine: "Celebrity Cruises",
    logo: "https://www.celebritycruises.com/content/dam/celebrity/logos/celebrity-cruises-logo.png",
    route: "Caribe Occidental → 7 Noches",
    ship: "Celebrity Apex",
    originalPrice: "$2,199",
    salePrice: "$1,599",
    savings: "$600",
    category: "Premium",
    duration: "7 noches",
    amenities: "Todo Incluido",
    capacity: 2918
  },
  {
    cruiseLine: "Carnival Cruise Line",
    logo: "https://www.carnival.com/-/media/Images/PreSales/Logos/carnival-logo.png",
    route: "Bahamas → 4 Noches",
    ship: "Carnival Vista",
    originalPrice: "$899",
    salePrice: "$649",
    savings: "$250",
    category: "Fun",
    duration: "4 noches",
    amenities: "Familiar",
    capacity: 3936
  },
  {
    cruiseLine: "Virgin Voyages",
    logo: "https://assets.virginvoyages.com/virgin-voyages-logo.png",
    route: "Caribe → Adults Only",
    ship: "Scarlet Lady",
    originalPrice: "$1,899",
    salePrice: "$1,399",
    savings: "$500",
    category: "Adults Only",
    duration: "8 noches",
    amenities: "Solo Adultos",
    capacity: 2770
  }
];

const cruiseExperiences = [
  {
    type: "Suite Presidential",
    icon: Crown,
    color: "from-secondary to-secondary/80",
    features: [
      "Balcón privado",
      "Mayordomo personal",
      "Restaurante exclusivo",
      "Spa privado"
    ],
    image: "https://www.cruisedeckplans.com/DP/cabinpics/215/reg/CarPre-85163-1555026747.jpg", // imagen tipo suite presidencial :contentReference[oaicite:2]{index=2}
    price: "Desde $8,999"
  },
  {
    type: "Balcón Premium",
    icon: Eye,
    color: "from-primary to-primary/80",
    features: [
      "Vista al mar",
      "Balcón espacioso",
      "Servicio de habitaciones",
      "Amenidades premium"
    ],
    image: "https://cruise.blog/sites/default/files/inline-images/RCI_AL_AquaTheaterSuiteDeck9-Balcony1R.jpg", // balcón amplio :contentReference[oaicite:3]{index=3}
    price: "Desde $3,299"
  },
  {
    type: "Interior Plus",
    icon: BedDouble,
    color: "from-gray-500 to-gray-600",
    features: [
      "Camarote cómodo",
      "Smart TV",
      "Baño privado",
      "Aire acondicionado"
    ],
    image: "https://cruise.blog/sites/default/files/styles/fb_style/public/inline-images/owner-suite-livingroom.jpg?itok=A1Fpt8SF", // camarote interior :contentReference[oaicite:4]{index=4}
    price: "Desde $1,599"
  }
];


const cruiseStats = [
  { label: "Destinos disponibles", value: "300+", icon: Globe },
  { label: "Navieras partner", value: "25+", icon: Ship },
  { label: "Cruceros semanales", value: "150+", icon: Calendar },
  { label: "Viajeros satisfechos", value: "500K+", icon: Users }
];

// Sugerencias basadas en IA
const aiCruiseSuggestions = [
  {
    destination: "Mediterráneo",
    status: "temporada alta",
    color: "green",
    icon: "🟢",
    message: "Temporada perfecta para el Mediterráneo, ¡reserva ahora!",
    action: "Reservar temporada alta",
    savings: "Mejor época"
  },
  {
    destination: "Caribe",
    status: "precio especial",
    color: "orange",
    icon: "🟡",
    message: "Ofertas especiales en Caribe antes de temporada alta",
    action: "Aprovechar oferta",
    savings: "25% OFF"
  },
  {
    destination: "Alaska",
    status: "disponibilidad limitada",
    color: "blue",
    icon: "🔵",
    message: "Pocas cabinas disponibles para Alaska este verano",
    action: "Reservar pronto",
    savings: "Últimas cabinas"
  }
];

// Explorar por región
const cruiseRegions = [
  {
    region: "Caribe",
    image: "https://cdn.aarp.net/content/dam/aarp/travel/cruises/2019/01/1140-cruise-ship-in-caribbean-esp.jpg",
    minPrice: "$649",
    cruises: ["Caribe Oriental", "Caribe Occidental", "Caribe Sur", "Bahamas"]
  },
  {
    region: "Mediterráneo",
    image: "https://es.ncl.com/sites/default/files/2092692_Flex_Pay_Promo_Assets_700x475_FLEET_EU.jpg",
    minPrice: "$1,299",
    cruises: ["Italia y Francia", "Grecia e Islas", "España y Portugal", "Turquía"]
  },
  {
    region: "Alaska",
    image: "https://deluxetravel.com.co/wp-content/uploads/2021/05/RCI_OV_Alaska_2013-006_RET.jpg",
    minPrice: "$1,899",
    cruises: ["Pasaje Interior", "Golfo de Alaska", "Glaciar Bay", "Fiordos Kenai"]
  },
  {
    region: "Norte de Europa",
    image: "https://manzanaresvaldepenas.ayeryhoyrevista.com/wp-content/uploads/sites/3/2019/03/Crucero-en-Fiordos-Noruegos.jpg",
    minPrice: "$2,299",
    cruises: ["Fiordos Noruegos", "Báltico", "Islandia", "Groenlandia"]
  }
];


// Inspiración de cruceros
const cruiseInspiration = [
  { type: "Playas", icon: "🏖️", cruises: 45 },
  { type: "Aventura", icon: "🗻", cruises: 28 },
  { type: "Cultural", icon: "🏛️", cruises: 35 },
  { type: "Lujo", icon: "✨", cruises: 18 }
];

// Cruceros de último minuto
const lastMinuteCruises = [
  {
    destination: "Bahamas",
    departure: "En 5 días",
    originalPrice: "$1,299",
    salePrice: "$799",
    type: "4 noches",
    ship: "Norwegian Sky",
    image: "https://es.ncl.com/sites/default/files/1000px-2021-weekend-cruises-norwegian-sky.jpg"
  },
  {
    destination: "Caribe Occidental",
    departure: "En 7 días",
    originalPrice: "$1,899",
    salePrice: "$1,299",
    type: "7 noches",
    ship: "Carnival Vista",
    image: "https://www.carnival.com/-/media/images/ships/vs/carnival-vista-ship-aerial-mobile2.jpg"
  },
  {
    destination: "Mediterráneo",
    departure: "En 3 días",
    originalPrice: "$2,599",
    salePrice: "$1,899",
    type: "10 noches",
    ship: "MSC Grandiosa",
    image: "https://www.expreso.info/files/styles/large/public/2021-06/msc_grandiosa2.jpg?itok=J-QKePmG"
  }
];

// FAQs específicos para cruceros
const cruiseFaqs = [
  {
    question: "¿Qué está incluido en el precio del crucero?",
    answer: "El precio incluye alojamiento, comidas principales, entretenimiento y uso de instalaciones del barco. Las bebidas, excursiones y servicios de spa tienen costo adicional."
  },
  {
    question: "¿Puedo cambiar mi camarote después de reservar?",
    answer: "Sí, puedes cambiar tu camarote sujeto a disponibilidad. Los cambios pueden tener costos adicionales dependiendo del tipo de camarote seleccionado."
  },
  {
    question: "¿Qué documentos necesito para un crucero?",
    answer: "Necesitas pasaporte válido para cruceros internacionales. Para algunos destinos se requieren visas específicas que debes gestionar con anticipación."
  },
  {
    question: "¿Hay opciones para niños en los cruceros?",
    answer: "Sí, la mayoría de cruceros tienen programas para niños, clubs por edades, piscinas familiares y actividades especialmente diseñadas para familias."
  }
];

// Navieras destacadas para el carrusel
const featuredCruiseLines = [
  {
    id: 1,
    name: "Royal Caribbean",
    logo: "https://logos-world.net/wp-content/uploads/2023/08/Royal-Caribbean-Emblem.png",
    rating: 4.8
  },
  {
    id: 2,
    name: "Norwegian Cruise Line",
    logo: "https://book.cruisesit.com/images/home-based/websites/supplier-logos/34.png",
    rating: 4.6
  },
  {
    id: 3,
    name: "Celebrity Cruises",
    logo: "https://images.seeklogo.com/logo-png/49/2/celebrity-cruises-logo-png_seeklogo-497602.png",
    rating: 4.7
  },
  {
    id: 4,
    name: "MSC Cruises",
    logo: "https://www.ttgmedia.com/AcuCustom/Sitename/DAM/291/msc_cruises_logo-2023.jpg",
    rating: 4.5
  },
  {
    id: 5,
    name: "Princess Cruises",
    logo: "https://www.drupal.org/files/Princess_Cruises_Corp_3line_RGB_2016.jpg",
    rating: 4.6
  },
  {
    id: 6,
    name: "Carnival Cruise Line",
    logo: "https://logos-world.net/wp-content/uploads/2024/01/Carnival-Cruise-Emblem.png",
    rating: 4.4
  },
  {
    id: 7,
    name: "Virgin Voyages",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiuLXXDnC5kkbVmao1sHsZoSRNreL9cOOwBA&s",
    rating: 4.8
  },
  {
    id: 8,
    name: "Disney Cruise Line",
    logo: "https://secure.cdn3.wdpromedia.com/media/pep/live/media/site/img/style/ui-global-components/global-nav-bar/eb63e68cecdc8a886dd26c6e433e52ee-disney-cruise-line-logo.png",
    rating: 4.9
  }
];

export default function CruisesHomeSections() {
  const [activeTab, setActiveTab] = useState("cruises");
  const [likedCruises, setLikedCruises] = useState<number[]>([]);
  const [compareCruises, setCompareCruises] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedCruises(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (cruiseId: string) => {
    setCompareCruises(prev => {
      if (prev.includes(cruiseId)) {
        return prev.filter(id => id !== cruiseId);
      } else if (prev.length < 3) {
        return [...prev, cruiseId];
      }
      return prev;
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
        <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-start mb-4">
                Navega hacia tus sueños
              </h1>
              <p className="text-muted-foreground text-start mb-10">
                Descubre el mundo desde el mar con experiencias inolvidables
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {cruiseStats.map((stat, index) => (
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

      {/* Navieras Destacadas - Carrusel Infinito */}
      <InfiniteCarousel
        title="Navieras Destacadas"
        subtitle="Navega con las mejores líneas de cruceros del mundo"
        items={featuredCruiseLines}
        animationDuration={35}
        showRating={true}
        showBenefits={true}
        benefits={[
          { text: "Mejor precio garantizado", icon: "check" },
          { text: "Cancelación flexible", icon: "shield" },
          { text: "Soporte especializado", icon: "award" }
        ]}
      />

      {/* Navigation Tabs */}
      <StandardTabs
        items={[
          {
            value: "cruises",
            label: "Cruceros Populares",
            icon: <Ship className="w-4 h-4" />,
            content: (
              <div className="space-y-4">
                <div className="flex items-center justify-between pl-10">
                  <h2 className="text-3xl font-bold text-start mb-2">Cruceros Populares</h2>
                  <Button variant="outline" className="flex items-center gap-2">
                    Ver todos <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-start mb-10 pl-10">
                  Las mejores experiencias de crucero con destinos increíbles
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularCruises.map((cruise) => (
                    <Card key={cruise.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-lg flex flex-col">
                      <div className="relative">
                        <img 
                          src={cruise.image} 
                          alt={cruise.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                        />
                        <div
                          role="button"
                          className="absolute h-8 w-8 flex items-center justify-center top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow-md transition-colors duration-300 cursor-pointer"
                          onClick={() => toggleLike(cruise.id)}
                        >
                          <Heart size={20}
                            className={`stroke-2 ${likedCruises.includes(cruise.id) ? 'fill-red-500 text-red-500' : 'hover:fill-red-500'} hover:fill-red-500`} 
                          />
                        </div>
                        {cruise.isPopular && (
                          <Badge className="absolute top-2 left-2 bg-secondary hover:bg-secondary/80 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        <Badge variant="secondary" className="absolute bottom-2 left-2 bg-green-500 text-white hover:bg-green-600">
                          {cruise.discount}
                        </Badge>
                        <Badge className="absolute bottom-2 right-2 bg-primary/80 text-white">
                          {cruise.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{cruise.title}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{cruise.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{cruise.cruiseLine} • {cruise.ship}</p>
                        <p className="text-gray-700 text-sm mb-3">{cruise.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              {cruise.duration}
                            </div>
                            <div className="text-2xl font-bold text-primary">{cruise.price}</div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Anchor className="w-4 h-4" />
                              {cruise.startPort} → {cruise.endPort}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            Hasta {cruise.capacity} pasajeros
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex flex-row items-center gap-2">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                          Ver detalles
                        </Button>
                        <Button 
                          variant="outline" 
                          
                          className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                          onClick={() => toggleCompare(cruise.title)}
                          disabled={compareCruises.length >= 3 && !compareCruises.includes(cruise.title)}
                        >
                          {compareCruises.includes(cruise.title) ? (
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
                  {cruiseDeals.map((deal, index) => (
                    <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow rounded-lg">
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Ahorra {deal.savings}
                      </div>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={deal.logo} alt={deal.cruiseLine} />
                            <AvatarFallback><Ship className="w-6 h-6" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{deal.cruiseLine}</CardTitle>
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
                          <Badge variant="secondary">{deal.category}</Badge>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Barco:</span>
                            <span className="font-medium">{deal.ship}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Duración:</span>
                            <span className="font-medium">{deal.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Capacidad:</span>
                            <span className="font-medium text-blue-600">{deal.capacity} pasajeros</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-row items-center gap-2">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                          Reservar ahora
                        </Button>
                        <Button 
                          variant="outline" 
                         
                          className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                          onClick={() => toggleCompare(deal.route)}
                          disabled={compareCruises.length >= 3 && !compareCruises.includes(deal.route)}
                        >
                          {compareCruises.includes(deal.route) ? (
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
            icon: <Crown className="w-4 h-4" />,
            content: (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-start mb-2">Experiencias de Crucero</h2>
                  <p className="text-muted-foreground text-start mb-10">
                    Desde suites presidenciales hasta camarotes interiores, 
                    encuentra la experiencia perfecta para tu crucero.
                  </p>
                </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cruiseExperiences.map((experience, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-tr-2xl">
                      <div className={`h-24 bg-gradient-to-br ${experience.color} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-6 left-4 text-white">
                          <div className='flex items-center gap-2'>
                            <experience.icon className="w-8 h-8 mb-2" />
                            <h3 className="text-xl font-bold">{experience.type}</h3>
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
      {compareCruises.length > 0 && (
        <section className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              <h3 className="text-3xl font-bold text-start mb-2">Comparar Cruceros</h3>
              <Badge variant="secondary" className="bg-primary text-white">
                {compareCruises.length}/3
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCompareCruises([])}>
              <Minus className="w-4 h-4 mr-2" />
              Limpiar todo
            </Button>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Compara hasta 3 cruceros para encontrar la mejor experiencia para ti
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareCruises.map((cruiseId, index) => {
              const cruise = popularCruises.find(c => c.title === cruiseId);
              const deal = cruiseDeals.find(d => d.route === cruiseId);
              const item = cruise || deal;
              
              return (
                <div key={index} className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {cruise?.title || deal?.route || `Crucero ${index + 1}`}
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleCompare(cruiseId)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-bold text-primary">
                        {cruise?.price || deal?.salePrice || '$1,999'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span>{cruise?.duration || deal?.duration || '7 noches'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{cruise ? 'Rating:' : 'Naviera:'}</span>
                      <div className="flex items-center gap-1">
                        {cruise ? (
                          <>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-green-600">{cruise.rating}</span>
                          </>
                        ) : (
                          <span className="text-primary">{deal?.cruiseLine || 'Royal Caribbean'}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>{cruise ? 'Destino:' : 'Barco:'}</span>
                      <span className="text-gray-600">
                        {cruise?.startPort || deal?.ship || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {compareCruises.length === 3 && (
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
            <h2 className="text-3xl font-bold text-start mb-2">Sugerencias Inteligentes</h2>
          </div>
          <p className="text-muted-foreground text-start mb-10">Nuestro algoritmo de IA predice las mejores oportunidades para cruceros</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiCruiseSuggestions.map((suggestion, index) => (
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
          <h2 className="text-3xl font-bold text-start mb-2">Explorar por Región</h2>
          <div className="flex gap-2">
            {cruiseInspiration.map((inspiration, index) => (
              <Button key={index} variant="outline" size="sm" className="flex items-center gap-1">
                <span>{inspiration.icon}</span>
                {inspiration.type}
                <Badge variant="secondary" className="ml-1">{inspiration.cruises}</Badge>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cruiseRegions.map((region, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer rounded-lg">
              <div className="relative">
                <img 
                  src={region.image} 
                  alt={region.region}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{region.region}</h3>
                  <p className="text-sm opacity-90">Desde {region.minPrice}</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-sm">
                  {region.cruises.length} destinos
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1">
                  {region.cruises.slice(0, 3).map((cruise, cruiseIndex) => (
                    <Badge key={cruiseIndex} variant="outline" className="text-xs">
                      {cruise}
                    </Badge>
                  ))}
                  {region.cruises.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{region.cruises.length - 3} más
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cruceros de Último Minuto */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 pl-10">
          <div>
            <div className='flex items-center inline-flex gap-2 mb-2'>
              <Timer className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold text-start mb-2">Cruceros de Último Minuto</h2>
            </div>
            <p className="text-muted-foreground text-start mb-10">Para viajeros espontáneos que buscan aventuras marítimas inmediatas</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lastMinuteCruises.map((cruise, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow rounded-lg">
              <div className="relative">
                <img 
                  src={cruise.image} 
                  alt={cruise.destination}
                  className="w-full h-32 object-cover border-0"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                  {cruise.departure}
                </Badge>
                <Badge className="absolute top-2 right-2 bg-secondary text-white">
                  {cruise.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{cruise.destination}</h3>
                <p className="text-sm text-gray-600 mb-2">{cruise.ship}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-600 line-through">{cruise.originalPrice}</div>
                    <div className="text-xl font-bold text-green-600">{cruise.salePrice}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {Math.round(((parseInt(cruise.originalPrice.replace(/[$,]/g, '')) - parseInt(cruise.salePrice.replace(/[$,]/g, ''))) / parseInt(cruise.originalPrice.replace(/[$,]/g, ''))) * 100)}% OFF
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

      {/* Puertos Cercanos */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <div className='flex items-center inline-flex gap-2 mb-2'>
              <Location className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-start mb-2">Cruceros desde tu Puerto</h2>
            </div>
            <p className="text-muted-foreground text-start mb-6">Ofertas especiales saliendo desde puertos dominicanos</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Puerto Plata</h3>
            <p className="text-2xl font-bold text-gray-900">$899</p>
            <p className="text-sm text-gray-600">Caribe Oriental</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Santo Domingo</h3>
            <p className="text-2xl font-bold text-gray-900">$1,299</p>
            <p className="text-sm text-gray-600">Caribe Sur</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">La Romana</h3>
            <p className="text-2xl font-bold text-gray-900">$999</p>
            <p className="text-sm text-gray-600">Caribe Occidental</p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="font-bold text-primary">Samaná</h3>
            <p className="text-2xl font-bold text-gray-900">$1,599</p>
            <p className="text-sm text-gray-600">Atlántico Norte</p>
          </Card>
        </div>
      </section>

      {/* Programa NaviRewards */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold text-center mb-2">Programa NaviRewards</h2>
          </div>
          <p className="text-muted-foreground text-center mb-10">Acumula millas náuticas en cada crucero y desbloquea beneficios exclusivos</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">500 millas</h3>
              <p className="text-sm text-gray-600">Por cada crucero reservado</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Upgrade gratis</h3>
              <p className="text-sm text-gray-600">Con 5,000 millas acumuladas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Crucero gratis</h3>
              <p className="text-sm text-gray-600">Con 15,000 millas acumuladas</p>
            </div>
          </div>
          
          <Button className="bg-secondary hover:bg-secondary/80 text-white h-12 px-8">
            Únete al Programa NaviRewards
          </Button>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-start mb-2">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground text-start mb-10">Todo lo que necesitas saber sobre cruceros</p>
        </div>
        
        <div className="space-y-4 max-w-7xl mx-auto">
          {cruiseFaqs.map((faq, index) => (
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
          <h2 className="text-3xl font-bold text-start mb-2">¿Por qué elegir Asfales para cruceros?</h2>
          <p className="text-muted-foreground text-start mb-10">Especialistas en experiencias marítimas de lujo</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reservas Protegidas</h3>
            <p className="text-gray-600 text-sm">Protección total en todas tus reservas con seguro de cancelación incluido</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mejores Precios</h3>
            <p className="text-gray-600 text-sm">Garantizamos los mejores precios en cruceros, te devolvemos la diferencia</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expertos en Cruceros</h3>
            <p className="text-gray-600 text-sm">Nuestro equipo especializado te asesora para encontrar el crucero perfecto</p>
          </div>
        </div>
      </section>
    </div>
    </Suspense>
  );
}