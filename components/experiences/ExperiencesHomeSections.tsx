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
import ExperienceCard from './ExperienceCard';
import type { ExperienceData } from './ExperienceCard';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  ArrowRight,
  Timer,
  Play,
  Zap,
  Scale,
  Gift,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Target,
  Clock,
  Award,
  DollarSign,
  Shield,
  Mountain,
  Waves,
  Camera,
  Utensils,
  TreePine,
  Building,
  Trophy,
  Sparkles,
  Baby,
  HeartHandshake,
  PartyPopper,
  Compass,
  Filter,
  Map,
  Flame,
  Eye,
  Ticket,
  Package,
  Plane,
  Hotel,
  AlertCircle,
  Bell,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Gamepad2,
  Music,
  Sun,
  Snowflake,
  Crown
} from "lucide-react";

interface IExperiencesHomeSectionsProps {}

// Datos de ejemplo para experiencias
const emotionCategories = [
  {
    id: 1,
    title: "Aventura extrema",
    icon: Mountain,
    description: "Adrenalina pura y emociones intensas",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
    experiences: 45,
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Bienestar y relajación",
    icon: TreePine,
    description: "Encuentra tu paz interior",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    experiences: 32,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Gastronomía y cultura",
    icon: Utensils,
    description: "Sabores auténticos y tradiciones",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    experiences: 67,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Eventos y fiestas locales",
    icon: PartyPopper,
    description: "Vive la cultura local",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-100",
    textColor: "text-pink-800",
    experiences: 28,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Planes en familia",
    icon: Baby,
    description: "Diversión para toda la familia",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    experiences: 54,
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Escapadas románticas",
    icon: HeartHandshake,
    description: "Momentos únicos en pareja",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    experiences: 38,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
  }
];

const popularExperiences: ExperienceData[] = [
  {
    id: "1",
    title: "Safari en Buggy por Macao Beach",
    description: "Aventura todo terreno explorando playas vírgenes y cenotes naturales",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    location: "Punta Cana",
    type: "Aventura",
    availability: {
      mode: "recurring",
      frequency: "Lunes, Miércoles y Viernes",
      maxCapacity: 12,
      bookedCount: 8
    },
    isAvailable: true,
    price: 85,
    currency: "USD",
    language: "Español, Inglés",
    host: {
      id: "h1",
      name: "Adventures RD",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop"
    },
    rating: {
      score: 4.8,
      count: 156
    },
    tags: ["Adrenalina", "Naturaleza", "Grupos"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-07-15T14:30:00Z"
  },
  {
    id: "2",
    title: "Tour Gastronómico Santo Domingo Colonial",
    description: "Degusta la auténtica cocina dominicana en el corazón histórico",
    imageUrl: "https://images.unsplash.com/photo-1555992336-03a23c7c9846?w=400&h=300&fit=crop",
    location: "Santo Domingo",
    type: "Gastronómica",
    availability: {
      mode: "recurring",
      frequency: "Martes y Sábados",
      maxCapacity: 15,
      bookedCount: 12
    },
    isAvailable: true,
    price: 65,
    currency: "USD",
    language: "Español, Inglés, Francés",
    host: {
      id: "h2",
      name: "Chef Maria Santos",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop"
    },
    rating: {
      score: 4.9,
      count: 89
    },
    tags: ["Auténtico", "Cultural", "Fotogénico"],
    createdAt: "2024-02-20T08:00:00Z",
    updatedAt: "2024-07-16T09:15:00Z"
  },
  {
    id: "3",
    title: "Catamaran Sunset & Snorkel",
    description: "Navega hacia el atardecer perfecto con snorkel en arrecifes de coral",
    imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop",
    location: "Saona Island",
    type: "Playa",
    availability: {
      mode: "recurring",
      frequency: "Todos los días",
      maxCapacity: 25,
      bookedCount: 18
    },
    isAvailable: true,
    price: 120,
    currency: "USD",
    language: "Español, Inglés",
    host: {
      id: "h3",
      name: "Caribbean Sailing",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
    },
    rating: {
      score: 4.7,
      count: 203
    },
    tags: ["Romántico", "Naturaleza", "Premium"],
    createdAt: "2024-03-10T12:00:00Z",
    updatedAt: "2024-07-16T11:45:00Z"
  }
];

const seasonalSuggestions = [
  {
    id: 1,
    season: "Verano",
    icon: Sun,
    title: "Aventuras Acuáticas",
    description: "Perfecto para actividades en el agua",
    experiences: ["Catamarán", "Snorkel", "Surf"],
    color: "bg-yellow-500"
  },
  {
    id: 2,
    season: "Temporada Alta",
    icon: Crown,
    title: "Experiencias Premium",
    description: "Lo mejor de la temporada turística",
    experiences: ["Tours VIP", "Cenas exclusivas", "Shows especiales"],
    color: "bg-purple-500"
  },
  {
    id: 3,
    season: "Temporada de Ballenas",
    icon: Waves,
    title: "Avistamiento de Ballenas",
    description: "Enero - Marzo en Samaná",
    experiences: ["Whale Watching", "Tours marinos", "Fotografía"],
    color: "bg-blue-500"
  }
];

const flashDeals = [
  {
    id: 1,
    title: "Zipline Adventure",
    location: "Puerto Plata",
    originalPrice: 120,
    salePrice: 85,
    savings: 35,
    timeLeft: "2h 30m",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
    bookedToday: 12
  },
  {
    id: 2,
    title: "Cueva de las Maravillas",
    location: "La Romana",
    originalPrice: 75,
    salePrice: 50,
    savings: 25,
    timeLeft: "5h 15m",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
    bookedToday: 8
  },
  {
    id: 3,
    title: "Merengue & Bachata Class",
    location: "Santiago",
    originalPrice: 45,
    salePrice: 30,
    savings: 15,
    timeLeft: "1h 45m",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop",
    bookedToday: 15
  }
];

const experiencePackages = [
  {
    id: 1,
    title: "Aventura Completa Punta Cana",
    description: "3 días de adrenalina + resort todo incluido",
    experiences: ["Buggy Safari", "Catamaran", "Zipline"],
    hotel: "Dreams Punta Cana",
    originalPrice: 850,
    packagePrice: 650,
    savings: 200,
    duration: "3 días / 2 noches",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Cultura & Gastronomía Colonial",
    description: "Inmersión cultural + hotel boutique histórico",
    experiences: ["Tour gastronómico", "Museo Alcázar", "Show folclórico"],
    hotel: "Hodelpa Nicolás de Ovando",
    originalPrice: 550,
    packagePrice: 420,
    savings: 130,
    duration: "2 días / 1 noche",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7c9846?w=400&h=300&fit=crop"
  }
];

const mapRegions = [
  {
    id: 1,
    name: "Punta Cana",
    coordinates: { x: 85, y: 70 },
    experiences: 45,
    topExperience: "Safari en Buggy",
    price: "desde $65"
  },
  {
    id: 2,
    name: "Santo Domingo",
    coordinates: { x: 45, y: 50 },
    experiences: 32,
    topExperience: "Tour Colonial",
    price: "desde $45"
  },
  {
    id: 3,
    name: "Puerto Plata",
    coordinates: { x: 30, y: 25 },
    experiences: 28,
    topExperience: "Teleférico",
    price: "desde $55"
  },
  {
    id: 4,
    name: "Samaná",
    coordinates: { x: 70, y: 20 },
    experiences: 18,
    topExperience: "Ballenas Jorobadas",
    price: "desde $85"
  }
];

const partnersLogos = [
  {
    id: 1,
    name: "GetYourGuide",
    logo: "https://logos-world.net/wp-content/uploads/2020/12/GetYourGuide-Logo.png",
    rating: 4.8
  },
  {
    id: 2,
    name: "Viator",
    logo: "https://1000logos.net/wp-content/uploads/2020/08/Viator-Logo.png",
    rating: 4.7
  },
  {
    id: 3,
    name: "Airbnb Experiences",
    logo: "https://logos-world.net/wp-content/uploads/2020/10/Airbnb-Logo.png",
    rating: 4.6
  },
  {
    id: 4,
    name: "Expedia Activities",
    logo: "https://1000logos.net/wp-content/uploads/2020/04/Expedia-Logo.png",
    rating: 4.5
  }
];

export default function ExperiencesHomeSections() {
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [compareExperiences, setCompareExperiences] = useState<string[]>([]);
  const [savedExperiences, setSavedExperiences] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(2);

  const toggleSaveExperience = (id: string) => {
    setSavedExperiences(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleCompareExperience = (id: string) => {
    setCompareExperiences(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleRegionClick = (regionId: number) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId);
  };

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <div className="w-full py-8 h-[auto] space-y-16" suppressHydrationWarning>
        
        {/* Hero Section with Video Background */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/10 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          
          {/* Background Video/Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop"
              alt="Experiencias increíbles"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 p-8 md:p-16 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-400/20 text-yellow-200 border-yellow-400/30">
                  Más de 200 experiencias únicas
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Vive experiencias
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  {" "}increíbles
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">
                Descubre actividades únicas, conoce la cultura local y crea recuerdos inolvidables en República Dominicana
              </p>

             
            </div>
          </div>
        </section>

        {/* Explora por Emoción */}
        <section className="space-y-8">
          <div className="text-start mb-12 ">
            <div className="flex items-center justify-start flex-row gap-2 mb-2">
              <Heart className="w-8 h-8 text-secondary items-center" />
              <h2 className=" text-3xl font-bold">Explora por Emoción</h2>
            </div>
            <p className="text-lg text-muted-foreground m">
              Encuentra la experiencia perfecta según lo que tu corazón busca vivir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emotionCategories.map((category) => (
              <Card key={category.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 rounded-3xl">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm">
                        {category.experiences} experiencias
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-white/90 text-sm">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experiencias Partners */}
        <InfiniteCarousel
          title="Partners de Experiencias"
          subtitle="Trabajamos con las mejores plataformas del mundo"
          items={partnersLogos}
          animationDuration={25}
          showRating={true}
          showBenefits={true}
          benefits={[
            { text: "Reserva garantizada", icon: "check" },
            { text: "Cancelación flexible", icon: "shield" },
            { text: "Soporte 24/7", icon: "award" }
          ]}
          className="bg-gradient-to-r from-primary/5 to-secondary/5"
        />

        {/* Experiencias Populares con Tabs */}
        <StandardTabs
          items={[
            {
              value: "popular",
              label: "Más Populares",
              icon: <TrendingUp className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  <div className="text-start mb-8 ">
                    <h2 className="text-3xl font-bold mb-4">Lo más reservado esta semana</h2>
                    <p className="text-muted-foreground">Experiencias que otros viajeros están adorando</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularExperiences.map((experience) => (
                      <ExperienceCard
                        key={experience.id}
                        experience={experience}
                        variant="default"
                        onSave={() => toggleSaveExperience(experience.id)}
                        onShare={() => console.log('Share:', experience.id)}
                        onClick={() => console.log('View:', experience.id)}
                      />
                    ))}
                  </div>
                </div>
              )
            },
            {
              value: "seasonal",
              label: "Temporada",
              icon: <Sun className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  <div className="text-start mb-8">
                    <h2 className="text-3xl font-bold mb-4">Perfectas para esta época</h2>
                    <p className="text-muted-foreground">Experiencias ideales según el clima y la temporada</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {seasonalSuggestions.map((suggestion) => (
                      <Card key={suggestion.id} className="relative overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
                        <div className={`h-20 ${suggestion.color} relative`}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute bottom-4 left-6 text-white flex items-center gap-3">
                            <suggestion.icon className="w-8 h-8" />
                            <div>
                              <h3 className="text-lg font-bold">{suggestion.title}</h3>
                              <p className="text-xs text-white/80">{suggestion.season}</p>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <p className="text-gray-600 mb-4">{suggestion.description}</p>
                          <div className="space-y-2">
                            <p className="font-semibold text-sm text-gray-800">Incluye:</p>
                            <div className="flex flex-wrap gap-2">
                              {suggestion.experiences.map((exp, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter>
                          <Button className="w-full bg-primary hover:bg-primary/80">
                            Explorar {suggestion.title}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            },
            {
              value: "map",
              label: "Mapa Interactivo",
              icon: <Map className="w-4 h-4" />,
              content: (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Explora por Región</h2>
                    <p className="text-muted-foreground">Descubre experiencias únicas en cada destino</p>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 min-h-[400px]">
                    {/* Mapa simplificado de RD */}
                    <div className="relative w-full h-80 bg-blue-200/50 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-blue-300/30"></div>
                      
                      {/* Regiones interactivas */}
                      {mapRegions.map((region) => (
                        <div
                          key={region.id}
                          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            selectedRegion === region.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                          }`}
                          style={{ 
                            left: `${region.coordinates.x}%`, 
                            top: `${region.coordinates.y}%` 
                          }}
                          onClick={() => handleRegionClick(region.id)}
                        >
                          {/* Pin del mapa */}
                          <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                            selectedRegion === region.id ? 'bg-secondary' : 'bg-primary'
                          }`}>
                            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          
                          {/* Tooltip */}
                          {selectedRegion === region.id && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-[200px] border">
                              <h4 className="font-bold text-lg mb-2">{region.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{region.experiences} experiencias disponibles</p>
                              <p className="text-sm font-semibold text-primary mb-1">⭐ {region.topExperience}</p>
                              <p className="text-sm text-secondary font-bold">{region.price}</p>
                              <Button size="sm" className="w-full mt-3 bg-primary">
                                Ver experiencias
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        💡 Haz clic en los puntos del mapa para explorar cada región
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mobilePlaceholder="Selecciona vista"
          centerTabs={true}
          useMobileSelect={true}
        />

        {/* Ofertas Flash */}
        <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-red-500 animate-pulse" />
              <h2 className="text-3xl font-bold">Ofertas Flash</h2>
              <Badge className="bg-red-500 text-white animate-pulse">
                ¡Solo por hoy!
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">Experiencias increíbles a precios únicos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashDeals.map((deal) => (
              <Card key={deal.id} className="relative overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-200 rounded-lg">
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  Ahorra ${deal.savings}
                </div>
                
                <div className="relative h-48">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{deal.title}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {deal.location}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600 line-through">${deal.originalPrice}</div>
                      <div className="text-2xl font-bold text-red-600">${deal.salePrice}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-red-600 font-bold">
                        <Timer className="w-4 h-4" />
                        {deal.timeLeft}
                      </div>
                      <div className="text-xs text-gray-600">{deal.bookedToday} reservas hoy</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    ¡Reservar ahora!
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparador de Experiencias */}
        {compareExperiences.length > 0 && (
          <section className="bg-primary/5 rounded-3xl p-8 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Scale className="w-8 h-8 text-primary" />
                <h3 className="text-3xl font-bold">Comparar Experiencias</h3>
                <Badge className="bg-primary text-white">
                  {compareExperiences.length}/3
                </Badge>
              </div>
              <Button variant="outline" onClick={() => setCompareExperiences([])}>
                <Minus className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Compara hasta 3 experiencias para encontrar la perfecta para ti
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compareExperiences.map((expId, index) => {
                const experience = popularExperiences.find(exp => exp.id === expId);
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg">{experience?.title || `Experiencia ${index + 1}`}</h4>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleCompareExperience(expId)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Precio:</span>
                        <span className="font-bold text-primary">${experience?.price || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ubicación:</span>
                        <span>{experience?.location || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tipo:</span>
                        <span>{experience?.type || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{experience?.rating?.score || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Idiomas:</span>
                        <span className="text-xs">{experience?.language || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {compareExperiences.length === 3 && (
              <div className="text-center mt-6">
                <Button className="bg-primary hover:bg-primary/80">
                  Ver Comparación Detallada
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Paquetes Combinados */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold">Paquetes Combinados</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ahorra más combinando experiencias con alojamiento y transporte
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiencePackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl">
                <div className="relative h-64">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                    Ahorra ${pkg.savings}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-white/90">{pkg.description}</p>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                    
                    <div>
                      <p className="font-semibold mb-2">Incluye:</p>
                      <div className="space-y-1">
                        {pkg.experiences.map((exp, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {exp}
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-sm">
                          <Hotel className="w-4 h-4 text-primary" />
                          {pkg.hotel}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="text-sm text-gray-600 line-through">${pkg.originalPrice}</div>
                        <div className="text-2xl font-bold text-primary">${pkg.packagePrice}</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        -{Math.round((pkg.savings / pkg.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-white h-12 rounded-xl">
                    Reserva el Paquete Completo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Programa GoFar Rewards */}
        <section className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <h2 className="text-3xl font-bold">Programa GoFar Rewards</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acumula puntos con cada experiencia y desbloquea beneficios exclusivos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">10 puntos por $</h3>
              <p className="text-sm text-gray-600">Por cada dólar gastado</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Experiencias gratis</h3>
              <p className="text-sm text-gray-600">Con 1000 puntos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Acceso VIP</h3>
              <p className="text-sm text-gray-600">Experiencias exclusivas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cancelación premium</h3>
              <p className="text-sm text-gray-600">Hasta 1 hora antes</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 h-12">
              Únete a GoFar Rewards
            </Button>
          </div>
        </section>

        {/* Alertas de Experiencias */}
        <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Bell className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Alertas de Experiencias Únicas</h2>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8">
              Sé el primero en enterarte de nuevos festivales, aventuras únicas y eventos especiales
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Festivales</h4>
                <p className="text-sm text-gray-600">Merengue, Jazz, Cultura</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Eventos Especiales</h4>
                <p className="text-sm text-gray-600">Temporadas únicas</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Aventuras Nuevas</h4>
                <p className="text-sm text-gray-600">Experiencias innovadoras</p>
              </div>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg h-12">
                  Suscribirse
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                📧 Máximo 1 email por semana. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </section>

        {/* Sección para Proveedores */}
        <section className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold">¿Tienes algo especial que ofrecer?</h2>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8">
              Únete a nuestra comunidad de anfitriones y comparte tus experiencias únicas con viajeros de todo el mundo
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Guías Locales</h4>
                <p className="text-sm text-gray-600">Comparte tu conocimiento del territorio</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Chefs & Restaurantes</h4>
                <p className="text-sm text-gray-600">Ofrece experiencias gastronómicas</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Artistas</h4>
                <p className="text-sm text-gray-600">Talleres, shows y arte local</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Aventura & Deportes</h4>
                <p className="text-sm text-gray-600">Tours activos y extremos</p>
              </div>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Comienza tu aventura como anfitrión</h3>
              <p className="text-gray-600 mb-6">
                Te ayudamos a crear experiencias memorables y a conectar con viajeros auténticos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">+1 (809) 555-0123</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold">anfitriones@asfales.com</span>
                </div>
              </div>
              
              <Button className="bg-secondary hover:bg-secondary/80 text-white px-8 py-3 mt-6">
                Quiero ser anfitrión
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Asfales para experiencias?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tu plataforma confiable para descubrir y vivir experiencias auténticas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Experiencias Verificadas</h3>
              <p className="text-gray-600 text-sm">Todos nuestros anfitriones son verificados y las experiencias evaluadas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Satisfacción Garantizada</h3>
              <p className="text-gray-600 text-sm">Si no quedas satisfecho, te devolvemos el 100% de tu dinero</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Soporte Local 24/7</h3>
              <p className="text-gray-600 text-sm">Equipo local disponible para ayudarte antes, durante y después</p>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}