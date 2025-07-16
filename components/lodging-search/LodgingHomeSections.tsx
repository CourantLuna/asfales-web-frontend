'use client';

import React, { Suspense, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StandardTabs } from '@/components/shared/standard-fields-component/StandardTabs';
import CustomCard from "@/components/shared/CustomCard";
import InfiniteCarousel from '../shared/InfiniteCarousel';
import LodgingCardList from './LodgingCard';
import { 
  Info,
  Hotel, 
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
  Gift,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Target,
  Timer,
  CreditCard,
  Wind,
  Navigation,
  Building2,
  Car,
  Utensils,
  Sparkles,
  Gamepad2,
  Baby,
  Crown,
  Eye,
  BedDouble,
  DollarSign,
  Mountain,
  TreePine,
  Sunset,
  Building,
  Palmtree,
  Plane,
  Home,
  Key,
  ListPlus
} from "lucide-react";

interface ILodgingHomeSectionsProps {}

const popularHotels = [
  {
    id: 1,
    name: "Iberostar Costa Dorada",
    location: "Costa Dorada, Puerto Plata",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=250&fit=crop",
    price: "$5,500",
    originalPrice: "$6,800",
    discount: "19% OFF",
    description: "Resort familiar todo incluido con parque acuático",
    rating: 4.6,
    reviews: 1845,
    amenities: ["Parque Acuático", "Kids Club", "5 Restaurantes", "Spa"],
    isPopular: true,
    category: "Familiar"
  },
  {
    id: 2,
    name: "Sanctuary Cap Cana",
    location: "Cap Cana, Punta Cana",
    image: "https://images.unsplash.com/photo-1587725875615-91aa2a7bf546?w=400&h=250&fit=crop",
    price: "$8,900",
    originalPrice: "$11,200",
    discount: "21% OFF",
    description: "Lujo exclusivo adults-only en marina privada",
    rating: 4.9,
    reviews: 673,
    amenities: ["Adults Only", "Marina", "Golf", "Butler Service"],
    isPopular: true,
    category: "Ultra Luxury"
  },
  {
    id: 3,
    name: "Hotel Mercure Santo Domingo",
    location: "Malecón, Santo Domingo",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=250&fit=crop",
    price: "$3,200",
    originalPrice: "$4,100",
    discount: "22% OFF",
    description: "Vista al Caribe en el corazón de la capital",
    rating: 4.5,
    reviews: 1129,
    amenities: ["Vista al Mar", "Centro", "Business", "Rooftop"],
    isPopular: false,
    category: "Business"
  },
  {
    id: 4,
    name: "Lifestyle Tropical Beach Resort",
    location: "Cofresi, Puerto Plata",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    price: "$4,800",
    originalPrice: "$6,000",
    discount: "20% OFF",
    description: "Todo incluido frente a Ocean World",
    rating: 4.4,
    reviews: 892,
    amenities: ["Ocean World", "Playa", "Shows", "Deportes"],
    isPopular: false,
    category: "Todo Incluido"
  }
];

const hotelDeals = [
  {
    hotel: "Secrets Cap Cana Resort",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=60&h=60&fit=crop",
    location: "Cap Cana → 3 noches",
    type: "Adults Only Premium",
    originalPrice: "$8,900",
    salePrice: "$6,200",
    savings: "$2,700",
    category: "Adults Only",
    features: "Todo incluido premium",
    rating: 4.8
  },
  {
    hotel: "Casa Bonita Tropical Lodge",
    logo: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=60&h=60&fit=crop",
    location: "Barahona → 2 noches",
    type: "Eco Lodge",
    originalPrice: "$3,400",
    salePrice: "$2,200",
    savings: "$1,200",
    category: "Ecoturismo",
    features: "Naturaleza + Aventura",
    rating: 4.5
  },
  {
    hotel: "Lifestyle Holidays Vacation Club",
    logo: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=60&h=60&fit=crop",
    location: "Cofresi → 4 noches",
    type: "All Inclusive Resort",
    originalPrice: "$7,600",
    salePrice: "$5,400",
    savings: "$2,200",
    category: "Familiar",
    features: "Parque acuático incluido",
    rating: 4.6
  }
];

const hotelExperiences = [
  {
    type: "Suite Presidencial",
    icon: Crown,
    color: "from-secondary to-secondary/80",
    features: ["Vista panorámica al mar", "Jacuzzi privado", "Mayordomo 24h", "Check-in VIP"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=200&fit=crop",
    price: "Desde $12,500"
  },
  {
    type: "Junior Suite",
    icon: Eye,
    color: "from-primary to-primary/80",
    features: ["Balcón con vista", "Sala de estar", "Minibar premium", "Room service 24h"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop",
    price: "Desde $6,800"
  },
  {
    type: "Habitación Estándar",
    icon: BedDouble,
    color: "from-gray-500 to-gray-600",
    features: ["Cama queen/king", "WiFi gratuito", "TV satelital", "Aire acondicionado"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop",
    price: "Desde $2,400"
  }
];

const lodgingStats = [
  { label: "Hoteles disponibles", value: "2,500+", icon: Hotel },
  { label: "Destinos cubiertos", value: "32", icon: MapPin },
  { label: "Reservas diarias", value: "800+", icon: Calendar },
  { label: "Huéspedes satisfechos", value: "180K+", icon: Users }
];

// Sugerencias basadas en IA
const aiLodgingSuggestions = [
  {
    destination: "Punta Cana",
    status: "temporada alta",
    color: "green",
    icon: "🟢",
    message: "Temporada perfecta para Punta Cana, ¡disponibilidad limitada!",
    action: "Reservar ahora",
    savings: "Mejor época"
  },
  {
    destination: "Santo Domingo",
    status: "precio especial",
    color: "orange",
    icon: "🟡",
    message: "Ofertas especiales en hoteles históricos de la capital",
    action: "Ver ofertas",
    savings: "35% OFF"
  },
  {
    destination: "Puerto Plata",
    status: "disponibilidad alta",
    color: "blue",
    icon: "🔵",
    message: "Excelente disponibilidad en resorts todo incluido",
    action: "Explorar opciones",
    savings: "Variedad amplia"
  }
];

// Explorar por tipo de alojamiento
const lodgingTypes = [
  {
    type: "Resorts Todo Incluido",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
    minPrice: "$4,200",
    properties: ["Punta Cana", "Puerto Plata", "La Romana", "Samaná"]
  },
  {
    type: "Hoteles Boutique",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop",
    minPrice: "$2,800",
    properties: ["Santiago", "Santo Domingo", "Jarabacoa", "Constanza"]
  },
  {
    type: "Eco Lodges",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=300&h=200&fit=crop",
    minPrice: "$1,900",
    properties: ["Barahona", "Monte Cristi", "Los Haitises", "Sierra Prieta"]
  },
  {
    type: "Hoteles de Playa",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
    minPrice: "$3,500",
    properties: ["Boca Chica", "Juan Dolio", "Cofresí", "Bayahíbe"]
  }
];

// Inspiración de alojamientos
const lodgingInspiration = [
  { type: "Playas", icon: "🏖️", hotels: 85 },
  { type: "Montañas", icon: "🏔️", hotels: 32 },
  { type: "Ciudades", icon: "🏙️", hotels: 124 },
  { type: "Naturaleza", icon: "🌿", hotels: 45 }
];

// Ofertas de último minuto
const lastMinuteHotels = [
  {
    destination: "Casa de Campo",
    departure: "Check-in hoy",
    originalPrice: "$8,500",
    salePrice: "$5,200",
    type: "Luxury Resort",
    hotel: "Casa de Campo Resort",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=150&fit=crop"
  },
  {
    destination: "Zona Colonial",
    departure: "Check-in mañana",
    originalPrice: "$4,200",
    salePrice: "$2,800",
    type: "Hotel Histórico",
    hotel: "Hotel Boutique Colonial",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=150&fit=crop"
  },
  {
    destination: "Playa Cofresí",
    departure: "Este fin de semana",
    originalPrice: "$6,800",
    salePrice: "$4,500",
    type: "Todo Incluido",
    hotel: "Cofresi Beach Resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=150&fit=crop"
  }
];

// FAQs específicos para alojamientos
const lodgingFaqs = [
  {
    question: "¿Puedo cancelar mi reserva de hotel sin costo?",
    answer: "La mayoría de nuestros hoteles ofrecen cancelación gratuita hasta 24-48 horas antes del check-in. Las políticas específicas se muestran al momento de reservar."
  },
  {
    question: "¿Qué está incluido en las tarifas de hotel?",
    answer: "Las tarifas base incluyen alojamiento e impuestos. Los servicios adicionales como desayuno, WiFi, estacionamiento y resort fees se especifican por separado."
  },
  {
    question: "¿Cómo puedo garantizar el mejor precio?",
    answer: "Ofrecemos garantía de mejor precio. Si encuentras una tarifa menor en otro sitio, igualaremos el precio y añadiremos un 10% de descuento adicional."
  },
  {
    question: "¿Los hoteles todo incluido incluyen bebidas alcohólicas?",
    answer: "Sí, la mayoría de resorts todo incluido incluyen bebidas alcohólicas nacionales e internacionales. Algunas marcas premium pueden tener costo adicional."
  }
];

// Cadenas hoteleras para el carrusel
const featuredHotelChains = [
  {
    id: 1,
    name: "Marriott Hotels",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Marriott-Logo.png",
    rating: 4.6
  },
  {
    id: 2,
    name: "Hilton Worldwide",
    logo: "https://1000logos.net/wp-content/uploads/2017/02/Hilton-Logo.png",
    rating: 4.5
  },
  {
    id: 3,
    name: "Hyatt Hotels",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Hyatt-Symbol.png",
    rating: 4.7
  },
  {
    id: 4,
    name: "InterContinental",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/InterContinental-Logo.png",
    rating: 4.4
  },
  {
    id: 5,
    name: "Radisson Hotels",
    logo: "https://logos-world.net/wp-content/uploads/2020/12/Radisson-Logo.png",
    rating: 4.3
  },
  {
    id: 6,
    name: "Wyndham Hotels",
    logo: "https://1000logos.net/wp-content/uploads/2020/09/Wyndham-Logo.png",
    rating: 4.2
  },
  {
    id: 7,
    name: "Dreams Resorts",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=60&fit=crop",
    rating: 4.8
  },
  {
    id: 8,
    name: "Secrets Resorts",
    logo: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=100&h=60&fit=crop",
    rating: 4.9
  }
];

// Datos de ejemplo para LodgingCard
const sampleLodgingData = [
  {
    title: "Hotel Casa Colonial Beach & Spa",
    location: "Playa Dorada, Puerto Plata",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
    ],
    feature1: "WiFi gratis",
    feature2: "Estacionamiento",
    descMain: "Resort todo incluido frente al mar",
    descSub: "Playa privada • Spa • 3 restaurantes",
    refundable: "Cancelación gratis",
    reserveNow: "Reserva ahora, paga después",
    rating: "4.8",
    ratingLabel: "Excelente",
    ratingCount: "(1,205 reseñas)",
    badge2ndColumn: "Oferta especial",
    nightlyPrice: "$4,200 por noche",
    beforePrice: "$5,100",
    afterPrice: "$4,200",
    badge1: "18% OFF",
    isFavorite: false
  },
  {
    title: "Dreams Punta Cana Resort & Spa",
    location: "Bávaro, Punta Cana",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
    ],
    feature1: "5 restaurantes",
    feature2: "3 piscinas",
    descMain: "Lujo premium todo incluido",
    descSub: "Adults only • Playa paradisíaca",
    refundable: "Cancelación gratis hasta 48h",
    reserveNow: "Confirmación inmediata",
    rating: "4.9",
    ratingLabel: "Excepcional",
    ratingCount: "(2,341 reseñas)",
    badge2ndColumn: "Bestseller",
    nightlyPrice: "$6,800 por noche",
    beforePrice: "$8,200",
    afterPrice: "$6,800",
    badge1: "17% OFF",
    isFavorite: true
  },
  {
    title: "JW Marriott Santo Domingo",
    location: "Zona Colonial, Santo Domingo",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"
    ],
    feature1: "Centro histórico",
    feature2: "Business center",
    descMain: "Elegancia en la capital",
    descSub: "Patrimonio mundial • Lujo moderno",
    refundable: "Cancelación gratis",
    reserveNow: "Precio garantizado",
    rating: "4.6",
    ratingLabel: "Muy bueno",
    ratingCount: "(987 reseñas)",
    badge2ndColumn: "Centro histórico",
    nightlyPrice: "$5,500 por noche",
    beforePrice: "$6,800",
    afterPrice: "$5,500",
    badge1: "19% OFF",
    isFavorite: false
  }
];

export default function LodgingHomeSections() {
  const [activeTab, setActiveTab] = useState("hotels");
  const [likedHotels, setLikedHotels] = useState<number[]>([]);
  const [compareHotels, setCompareHotels] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedHotels(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (hotelId: string) => {
    setCompareHotels(prev => {
      if (prev.includes(hotelId)) {
        return prev.filter(id => id !== hotelId);
      } else if (prev.length < 3) {
        return [...prev, hotelId];
      }
      return prev;
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCardClick = (cardType: string) => {
    console.log(`Clicked on ${cardType} card`);
  };

  const handleLodgingCardClick = (index: number, rowData: any) => {
    console.log('Clicked lodging card:', index, rowData.title);
  };

  // Hoteles partners para demostrar reutilización del carrusel
  const featuredHotels = featuredHotelChains;
      return (
        <Suspense
          fallback={
            <div className="h-20 bg-gray-100 animate-pulse rounded-lg" />
          }
        >
          <div
            className="w-full py-8 h-[auto] space-y-12"
            suppressHydrationWarning
          >
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-3xl p-8 md:p-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-start mb-4">
                      Encuentra el alojamiento perfecto
                    </h1>
                    <p className="text-muted-foreground text-start mb-10">
                      Desde resorts de lujo hasta hoteles boutique, descubre
                      experiencias únicas
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  {lodgingStats.map((stat, index) => (
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

            {/* <h2 className="text-2xl font-bold mb-6">Ideas para tu próximo viaje</h2> */}

            {/* Hoteles Partners - Ejemplo de reutilización */}
            <InfiniteCarousel
              title="Cadenas Hoteleras Destacadas"
              subtitle="Encuentra el alojamiento perfecto para tu viaje con las mejores marcas"
              items={featuredHotelChains}
              animationDuration={30}
              showRating={true}
              showBenefits={true}
              benefits={[
                { text: "Cancelación gratuita", icon: "check" },
                { text: "Precio garantizado", icon: "shield" },
                { text: "Reserva sin tarjeta", icon: "award" },
              ]}
              className="bg-gray-50"
            />

            <div
              className="flex flex-col lg:flex-row gap-6 w-full"
              suppressHydrationWarning
            >
              {/* Card Principal - Más grande - 70% en lg */}
              <div className="w-full lg:w-[65%] flex">
                <CustomCard
                  cardWidth="w-full"
                  carouselWidth="w-full"
                  carouselHeight="h-[300px]"
                  cardHeight="h-[300px]"
                  title=""
                  description=""
                  images={[
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
                  ]}
                  orientationCard="vertical"
                  className="rounded-xl"
                  showCompareCheckbox={false}
                  onClick={() => handleCardClick("cancelacion-gratis")}
                  // Para el overlay personalizado, necesitaremos crear un custom overlay
                  content={
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">
                          Cancelación gratis en la mayoría de los hoteles
                        </h3>
                        <p className="text-sm opacity-90">
                          Porque la flexibilidad es importante.
                        </p>
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Cards Laterales - 30% en lg */}
              <div className="w-full lg:w-[35%] flex flex-col space-y-6">
                {/* Ad Card 1 */}
                <CustomCard
                  title="Crea recuerdos en Maryland"
                  description="Este verano, disfruta de actividades divertidas para toda la familia."
                  images={[
                    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  ]}
                  carouselWidth="w-1/3"
                  cardWidth="w-full"
                  orientationCard="horizontal"
                  className="rounded-xl"
                  showCompareCheckbox={false}
                  onClick={() => handleCardClick("maryland")}
                  overlayCarrusel={{
                    type: "badge",
                    bgcolor: "bg-blue-600",
                    field: "badge",
                    align: "top-left",
                    textColor: "text-white",
                  }}
                  overlayValues={{
                    badge: "Anuncio",
                  }}
                  content={
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Info clicked");
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  }
                />

                {/* Ad Card 2 */}
                <CustomCard
                  title="Cuando vuelvas a viajar, estaremos para servirte."
                  description="Ideas e inspiración para viajar"
                  images={[
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                  ]}
                  carouselWidth="w-1/3"
                  cardWidth="w-full"
                  orientationCard="horizontal"
                  className="rounded-xl"
                  showCompareCheckbox={false}
                  onClick={() => handleCardClick("inspiracion")}
                />
              </div>

              <div className="align-center" suppressHydrationWarning>
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
                  crossOrigin="anonymous"
                ></script>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", width: "100%", height: "90px" }}
                  data-ad-client="ca-pub-1234567890123456"
                  data-ad-slot="1234567890"
                ></ins>
                <script>
                  (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
              </div>
            </div>

            {/* Navigation Tabs */}
            <StandardTabs
              items={[
                {
                  value: "hotels",
                  label: "Hoteles Populares",
                  icon: <Hotel className="w-4 h-4" />,
                  content: (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pl-10">
                        <h2 className="text-3xl font-bold text-start mb-2">
                          Hoteles Populares
                        </h2>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          Ver todos <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-start mb-10 pl-10">
                        Los mejores alojamientos con las mejores ofertas y
                        ubicaciones
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularHotels.map((hotel) => (
                          <Card
                            key={hotel.id}
                            className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-lg flex flex-col"
                          >
                            <div className="relative">
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                              />
                              <div
                                role="button"
                                className="absolute h-8 w-8 flex items-center justify-center top-2 right-2 text-red-500 hover:text-red-600 bg-white rounded-full p-1 shadow-md transition-colors duration-300 cursor-pointer"
                                onClick={() => toggleLike(hotel.id)}
                              >
                                <Heart
                                  size={20}
                                  className={`stroke-2 ${
                                    likedHotels.includes(hotel.id)
                                      ? "fill-red-500 text-red-500"
                                      : "hover:fill-red-500"
                                  } hover:fill-red-500`}
                                />
                              </div>
                              {hotel.isPopular && (
                                <Badge className="absolute top-2 left-2 bg-secondary hover:bg-secondary/80 text-white">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className="absolute bottom-2 left-2 bg-green-500 text-white hover:bg-green-600"
                              >
                                {hotel.discount}
                              </Badge>
                              <Badge className="absolute bottom-2 right-2 bg-primary/80 text-white">
                                {hotel.category}
                              </Badge>
                            </div>
                            <CardContent className="p-4 flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg">
                                  {hotel.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">
                                    {hotel.rating}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">
                                {hotel.location}
                              </p>
                              <p className="text-gray-700 text-sm mb-3">
                                {hotel.description}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    {hotel.reviews} reseñas
                                  </div>
                                  <div className="text-2xl font-bold text-primary">
                                    {hotel.price}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {hotel.amenities
                                    .slice(0, 3)
                                    .map((amenity, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {amenity}
                                      </Badge>
                                    ))}
                                  {hotel.amenities.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{hotel.amenities.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 space-y-2">
                              <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                                Ver disponibilidad
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-10 border-primary text-primary hover:bg-primary/10"
                                onClick={() => toggleCompare(hotel.name)}
                                disabled={
                                  compareHotels.length >= 3 &&
                                  !compareHotels.includes(hotel.name)
                                }
                              >
                                {compareHotels.includes(hotel.name) ? (
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
                        {hotelDeals.map((deal, index) => (
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
                                  <AvatarImage
                                    src={deal.logo}
                                    alt={deal.hotel}
                                  />
                                  <AvatarFallback>
                                    <Hotel className="w-6 h-6" />
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">
                                    {deal.hotel}
                                  </CardTitle>
                                  <CardDescription>
                                    {deal.location}
                                  </CardDescription>
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
                                <Badge variant="secondary">
                                  {deal.category}
                                </Badge>
                              </div>

                              <Separator />

                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Tipo:</span>
                                  <span className="font-medium">
                                    {deal.type}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Rating:</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">
                                      {deal.rating}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">
                                    Incluye:
                                  </span>
                                  <span className="font-medium text-green-600">
                                    {deal.features}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="space-y-2">
                              <Button className="w-full bg-primary hover:bg-primary/80 text-white h-12">
                                Reservar ahora
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                                onClick={() => toggleCompare(deal.hotel)}
                                disabled={
                                  compareHotels.length >= 3 &&
                                  !compareHotels.includes(deal.hotel)
                                }
                              >
                                {compareHotels.includes(deal.hotel) ? (
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
                  icon: <Crown className="w-4 h-4" />,
                  content: (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-start mb-2">
                          Experiencias de Alojamiento
                        </h2>
                        <p className="text-muted-foreground text-start mb-10">
                          Desde suites presidenciales hasta habitaciones
                          estándar, encuentra la experiencia perfecta para tu
                          estancia.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {hotelExperiences.map((experience, index) => (
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
                                {experience.features.map(
                                  (feature, featureIndex) => (
                                    <li
                                      key={featureIndex}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                      {feature}
                                    </li>
                                  )
                                )}
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

            {/* LodgingCard Showcase */}
            <section className="space-y-6">
              <div className="text-start mb-8 pl-10">
                <h2 className="text-3xl font-bold text-start mb-2">
                  Hoteles Destacados
                </h2>
                <p className="text-muted-foreground text-start mb-10">
                  Información detallada de nuestros mejores hoteles con todas
                  las comodidades
                </p>
              </div>

              <LodgingCardList
                rows={sampleLodgingData}
                onCardClick={handleLodgingCardClick}
                showCompareCheckbox={true}
                initialVisibleCards={3}
                cardsPerStep={3}
                showMoreLabel="Ver más hoteles"
                enableShowLess={true}
                onCompareChange={toggleCompare}
                compareList={compareHotels}
                maxCompareItems={3}
              />
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
                  alojarse
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiLodgingSuggestions.map((suggestion, index) => (
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

            {/* Comparador Rápido */}
            {compareHotels.length > 0 && (
              <section className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Scale className="w-6 h-6 text-primary" />
                    <h3 className="text-3xl font-bold text-start mb-2">
                      Comparar Hoteles
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-primary text-white"
                    >
                      {compareHotels.length}/3
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompareHotels([])}
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Limpiar todo
                  </Button>
                </div>

                <p className="text-muted-foreground mb-4">
                  Compara hasta 3 hoteles para encontrar el mejor alojamiento
                  para ti
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {compareHotels.map((hotelId, index) => {
                    const hotel = popularHotels.find((h) => h.name === hotelId);
                    const deal = hotelDeals.find((d) => d.hotel === hotelId);
                    const lodgingCard = sampleLodgingData.find(
                      (l) => l.title === hotelId
                    );
                    const item = hotel || deal || lodgingCard;

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            {hotel?.name ||
                              deal?.hotel ||
                              lodgingCard?.title ||
                              `Hotel ${index + 1}`}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleCompare(hotelId)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Precio:</span>
                            <span className="font-bold text-primary">
                              {hotel?.price ||
                                deal?.salePrice ||
                                lodgingCard?.afterPrice ||
                                "$4,200"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ubicación:</span>
                            <span>
                              {hotel?.location ||
                                deal?.location ||
                                lodgingCard?.location ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-green-600">
                                {hotel?.rating ||
                                  deal?.rating ||
                                  lodgingCard?.rating ||
                                  "4.5"}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Categoría:</span>
                            <span className="text-gray-600">
                              {hotel?.category ||
                                deal?.category ||
                                (lodgingCard ? "Resort" : "Resort")}
                            </span>
                          </div>
                          {lodgingCard && (
                            <div className="flex justify-between">
                              <span>Características:</span>
                              <span className="text-gray-600 text-xs">
                                {lodgingCard.feature1} • {lodgingCard.feature2}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {compareHotels.length === 3 && (
                  <div className="mt-4 text-center">
                    <Button className="bg-primary hover:bg-primary/80">
                      Ver Comparación Detallada
                    </Button>
                  </div>
                )}
              </section>
            )}

            {/* Explorar por Tipo de Alojamiento */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pl-10">
                <h2 className="text-3xl font-bold text-start mb-2">
                  Explorar por Tipo
                </h2>
                <div className="flex gap-2">
                  {lodgingInspiration.map((inspiration, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <span>{inspiration.icon}</span>
                      {inspiration.type}
                      <Badge variant="secondary" className="ml-1">
                        {inspiration.hotels}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {lodgingTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={type.image}
                        alt={type.type}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{type.type}</h3>
                        <p className="text-sm opacity-90">
                          Desde {type.minPrice}
                        </p>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-sm">
                        {type.properties.length} destinos
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {type.properties
                          .slice(0, 3)
                          .map((property, propIndex) => (
                            <Badge
                              key={propIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {property}
                            </Badge>
                          ))}
                        {type.properties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{type.properties.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Hoteles de Último Minuto */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pl-10">
                <div>
                  <div className="flex items-center inline-flex gap-2 mb-2">
                    <Timer className="w-8 h-8 text-secondary" />
                    <h2 className="text-3xl font-bold text-start mb-2">
                      Hoteles de Último Minuto
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-start mb-10">
                    Para viajeros espontáneos que buscan ofertas especiales
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lastMinuteHotels.map((hotel, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={hotel.image}
                        alt={hotel.destination}
                        className="w-full h-32 object-cover border-0"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                        {hotel.departure}
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-secondary text-white">
                        {hotel.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">
                        {hotel.destination}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {hotel.hotel}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-gray-600 line-through">
                            {hotel.originalPrice}
                          </div>
                          <div className="text-xl font-bold text-green-600">
                            {hotel.salePrice}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {Math.round(
                            ((parseInt(
                              hotel.originalPrice.replace(/[$,]/g, "")
                            ) -
                              parseInt(hotel.salePrice.replace(/[$,]/g, ""))) /
                              parseInt(
                                hotel.originalPrice.replace(/[$,]/g, "")
                              )) *
                              100
                          )}
                          % OFF
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

            {/* Destinos Populares */}
            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <div className="flex items-center inline-flex gap-2 mb-2">
                    <MapPin className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold text-start mb-2">
                      Destinos Populares
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-start mb-6">
                    Los mejores destinos para tu próxima estadía
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <h3 className="font-bold text-primary">Punta Cana</h3>
                  <p className="text-2xl font-bold text-gray-900">$4,200</p>
                  <p className="text-sm text-gray-600">Resorts todo incluido</p>
                </Card>
                <Card className="text-center p-4">
                  <h3 className="font-bold text-primary">Santo Domingo</h3>
                  <p className="text-2xl font-bold text-gray-900">$3,800</p>
                  <p className="text-sm text-gray-600">Centro histórico</p>
                </Card>
                <Card className="text-center p-4">
                  <h3 className="font-bold text-primary">Puerto Plata</h3>
                  <p className="text-2xl font-bold text-gray-900">$3,200</p>
                  <p className="text-sm text-gray-600">Costa Atlántica</p>
                </Card>
                <Card className="text-center p-4">
                  <h3 className="font-bold text-primary">Santiago</h3>
                  <p className="text-2xl font-bold text-gray-900">$2,800</p>
                  <p className="text-sm text-gray-600">Ciudad metropolitana</p>
                </Card>
              </div>
            </section>

            {/* Programa HospedaRewards */}
            <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Gift className="w-8 h-8 text-secondary" />
                  <h2 className="text-3xl font-bold text-start mb-2">
                    Programa HospedaRewards
                  </h2>
                </div>
                <p className="text-muted-foreground text-start mb-10">
                  Acumula noches de hotel y desbloquea beneficios exclusivos
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      100 puntos por $
                    </h3>
                    <p className="text-sm text-gray-600">
                      Por cada peso gastado
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Upgrade gratis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Con 5 noches acumuladas
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Noche gratis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Con 10 noches acumuladas
                    </p>
                  </div>
                </div>

                <Button className="bg-secondary hover:bg-secondary/80 text-white">
                  Únete al Programa HospedaRewards
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
                  Todo lo que necesitas saber sobre alojamientos
                </p>
              </div>

              <div className="space-y-4 max-w-7xl mx-auto">
                {lodgingFaqs.map((faq, index) => (
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
                  ¿Por qué elegir Asfales para hoteles?
                </h2>
                <p className="text-muted-foreground text-start mb-10">
                  Tu mejor aliado para encontrar el alojamiento perfecto
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Reservas Seguras
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Protección total en todas tus reservas con garantía de mejor
                    precio
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Atención Personalizada
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Soporte 24/7 con expertos en hospitalidad para ayudarte
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Mejores Ofertas
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Acceso exclusivo a tarifas especiales y promociones únicas
                  </p>
                </div>
              </div>
            </section>
          </div>
        </Suspense>
      );
}

