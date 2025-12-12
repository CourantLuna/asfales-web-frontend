'use client';

import React, { Suspense, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import InfiniteCarousel from '@/components/shared/InfiniteCarousel';
import { StandardTabs } from '@/components/shared/standard-fields-component/StandardTabs';
import { 
  Plane, 
  Bus, 
  Ship, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  Zap, 
  Shield, 
  Award, 
  Gift, 
  Target, 
  CheckCircle,
  Globe,
  Briefcase,
  Map,
  Sparkles
} from 'lucide-react';

// --- DATOS SIMULADOS (Tomados de tus archivos individuales para consistencia) ---

// Estadísticas Globales
const globalStats = [
  { label: "Destinos Globales", value: "1,000+", icon: Globe },
  { label: "Operadores y Navieras", value: "200+", icon: Briefcase },
  { label: "Rutas Diarias", value: "15,000+", icon: Map },
  { label: "Viajeros Felices", value: "3M+", icon: Users }
];

// Carrusel de Partners (Mix de los 3 tipos)
const mixedPartners = [
  { id: 1, name: "American Airlines", logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_AA.svg", rating: 4.5 },
  { id: 2, name: "Metro Bus", logo: "https://images.unsplash.com/photo-1554306297-0c86e837d24b?w=60&h=60&fit=crop", rating: 4.8 },
  { id: 3, name: "Royal Caribbean", logo: "https://logos-world.net/wp-content/uploads/2023/08/Royal-Caribbean-Emblem.png", rating: 4.8 },
  { id: 4, name: "Delta Airlines", logo: "https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/landing_airline_logo_DL.svg", rating: 4.4 },
  { id: 5, name: "Caribe Tours", logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop", rating: 4.7 },
  { id: 6, name: "Norwegian", logo: "https://book.cruisesit.com/images/home-based/websites/supplier-logos/34.png", rating: 4.6 },
];

// Highlights por Categoría
const flightHighlights = [
  {
    id: 1,
    title: "París, Francia",
    subtitle: "La ciudad del amor",
    image: "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_1:1,w_3840,g_auto/f_auto/q_auto/v1/gc-v1/paris/3%20giorni%20a%20Parigi%20Tour%20Eiffel?_a=BAVAZGE70",
    price: "$1,299",
    tag: "Popular",
    rating: 4.9,
    icon: Plane
  },
  {
    id: 2,
    title: "Tokio, Japón",
    subtitle: "Tradición y modernidad",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
    price: "$1,899",
    tag: "Oferta",
    rating: 4.8,
    icon: Plane
  }
];

const busHighlights = [
  {
    id: 3,
    title: "Sto Dgo → Santiago",
    subtitle: "Metro Bus Premium",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop",
    price: "$350",
    tag: "Frecuente",
    rating: 4.8,
    icon: Bus
  },
  {
    id: 4,
    title: "Punta Cana Express",
    subtitle: "Expreso Bávaro",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    price: "$420",
    tag: "Turístico",
    rating: 4.6,
    icon: Bus
  }
];

const cruiseHighlights = [
  {
    id: 5,
    title: "Caribe Oriental",
    subtitle: "7 Noches - Royal Caribbean",
    image: "https://cruisespotlight.com/wp-content/uploads/2021/11/Norwegian-Breakaway-Ship.jpg",
    price: "$1,999",
    tag: "Todo Incluido",
    rating: 4.7,
    icon: Ship
  },
  {
    id: 6,
    title: "Mediterráneo",
    subtitle: "10 Noches - MSC",
    image: "https://cruisepanda.com/storage/ships/cGzgYqXa47vpgzIj3WaZF57potJCuWhlbiM8ByPL.jpg",
    price: "$2,899",
    tag: "Lujo",
    rating: 4.8,
    icon: Ship
  }
];

// Ofertas Mixtas (Flash Sales)
const mixedDeals = [
  {
    type: "flight",
    operator: "Lufthansa",
    route: "Madrid → Frankfurt",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=60&h=60&fit=crop",
    price: "$299",
    original: "$450",
    savings: "33%",
    icon: Plane,
    color: "text-blue-500"
  },
  {
    type: "bus",
    operator: "Caribe Tours",
    route: "Santiago → Puerto Plata",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=60&h=60&fit=crop",
    price: "$280",
    original: "$320",
    savings: "15%",
    icon: Bus,
    color: "text-green-500"
  },
  {
    type: "cruise",
    operator: "Carnival",
    route: "Bahamas (4 Noches)",
    image: "https://www.carnival.com/-/media/Images/PreSales/Logos/carnival-logo.png",
    price: "$649",
    original: "$899",
    savings: "28%",
    icon: Ship,
    color: "text-cyan-500"
  }
];

interface ITransportsHomeSectionsProps {}

export default function TransportsHomeSections() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-12 py-8">
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-3xl" />}>
        
        {/* 1. Hero Section Unificado */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/10 rounded-3xl p-8 md:p-16 text-center md:text-left">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary bg-primary/5">
                <Sparkles className="w-4 h-4 mr-2" />
                La forma inteligente de viajar
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Aire, Tierra y Mar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  en un solo lugar
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                Gestiona todos tus viajes desde una única plataforma. Compara precios, 
                encuentra las mejores rutas y reserva tu próxima aventura con total seguridad.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Explorar Todo
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-gray-50">
                  Ver Ofertas
                </Button>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 cursor-pointer bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plane className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Vuelos</h3>
                    <p className="text-xs text-gray-500 mt-1">Nacionales e Int.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 cursor-pointer bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bus className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Buses</h3>
                    <p className="text-xs text-gray-500 mt-1">Interurbanos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 cursor-pointer bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ship className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Cruceros</h3>
                    <p className="text-xs text-gray-500 mt-1">Todas las navieras</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-100">
            {globalStats.map((stat, index) => (
              <div key={index} className="text-center md:text-left flex flex-col md:flex-row items-center gap-3">
                <div className="p-2 bg-white shadow-sm rounded-lg">
                  <stat.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Unified Partners Carousel */}
        <InfiniteCarousel
          title="Nuestros Partners Globales"
          subtitle="Trabajamos con las empresas líderes en transporte aéreo, terrestre y marítimo"
          items={mixedPartners}
          animationDuration={35}
          showRating={true}
        />

        {/* 3. Featured Sections (Tabs) */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Explora por Categoría</h2>
            <p className="text-muted-foreground">Lo más destacado y popular seleccionado para ti</p>
          </div>

          <StandardTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            centerTabs={true}
            items={[
              {
                value: "all",
                label: "Destacados",
                icon: <Star className="w-4 h-4" />,
                content: (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {/* Mix of 1 Flight, 1 Bus, 1 Cruise */}
                      {[flightHighlights[0], busHighlights[0], cruiseHighlights[0]].map((item, i) => (
                         <Card key={i} className="group overflow-hidden hover:shadow-lg transition-all border-0 bg-white">
                           <div className="relative h-56 overflow-hidden">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                             <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
                               <item.icon className="w-3 h-3 mr-1" />
                               {i === 0 ? "Vuelo" : i === 1 ? "Bus" : "Crucero"}
                             </Badge>
                             <Badge variant="secondary" className="absolute bottom-3 right-3 shadow-sm">
                               {item.price}
                             </Badge>
                           </div>
                           <CardContent className="p-5">
                             <div className="flex justify-between items-start mb-2">
                               <div>
                                 <h3 className="font-bold text-lg">{item.title}</h3>
                                 <p className="text-sm text-gray-500">{item.subtitle}</p>
                               </div>
                               <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                 <span className="text-xs font-medium">{item.rating}</span>
                               </div>
                             </div>
                           </CardContent>
                           <CardFooter className="p-5 pt-0">
                             <Button className="w-full bg-gray-900 text-white hover:bg-primary">Ver Detalles</Button>
                           </CardFooter>
                         </Card>
                      ))}
                   </div>
                )
              },
              {
                value: "flights",
                label: "Vuelos",
                icon: <Plane className="w-4 h-4" />,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flightHighlights.map((item) => (
                      <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                           <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">{item.tag}</Badge>
                        </div>
                        <CardContent className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                               <h3 className="font-bold text-xl">{item.title}</h3>
                               <p className="text-muted-foreground">{item.subtitle}</p>
                             </div>
                             <div className="text-2xl font-bold text-blue-600">{item.price}</div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Duración variable</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Individual/Grupo</span>
                          </div>
                          <Button variant="outline" className="self-start border-blue-200 text-blue-600 hover:bg-blue-50">
                            Buscar Vuelos <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              },
              {
                value: "buses",
                label: "Autobuses",
                icon: <Bus className="w-4 h-4" />,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {busHighlights.map((item) => (
                      <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                           <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">{item.tag}</Badge>
                        </div>
                        <CardContent className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                               <h3 className="font-bold text-xl">{item.title}</h3>
                               <p className="text-muted-foreground">{item.subtitle}</p>
                             </div>
                             <div className="text-2xl font-bold text-green-600">{item.price}</div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Salidas diarias</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Confort Plus</span>
                          </div>
                          <Button variant="outline" className="self-start border-green-200 text-green-600 hover:bg-green-50">
                            Ver Horarios <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              },
              {
                value: "cruises",
                label: "Cruceros",
                icon: <Ship className="w-4 h-4" />,
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cruiseHighlights.map((item) => (
                      <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                           <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                           <Badge className="absolute top-2 left-2 bg-cyan-500 hover:bg-cyan-600">{item.tag}</Badge>
                        </div>
                        <CardContent className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                               <h3 className="font-bold text-xl">{item.title}</h3>
                               <p className="text-muted-foreground">{item.subtitle}</p>
                             </div>
                             <div className="text-2xl font-bold text-cyan-600">{item.price}</div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7-14 Noches</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Pensión completa</span>
                          </div>
                          <Button variant="outline" className="self-start border-cyan-200 text-cyan-600 hover:bg-cyan-50">
                            Ver Camarotes <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              }
            ]}
          />
        </section>

        {/* 4. Mixed Flash Deals */}
        <section className="bg-gray-50 -mx-4 md:-mx-8 px-4 md:px-8 py-12">
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-3xl font-bold">Ofertas Flash Multimodales</h2>
            </div>
            <Badge variant="destructive" className="animate-pulse">Tiempo Limitado</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mixedDeals.map((deal, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-bl-lg z-10">
                   -{deal.savings}
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={deal.image} />
                      <AvatarFallback>{deal.operator[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{deal.operator}</CardTitle>
                      <CardDescription>{deal.route}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between mb-4">
                    <div className="text-sm text-gray-500 line-through">{deal.original}</div>
                    <div className={`text-3xl font-bold ${deal.color}`}>{deal.price}</div>
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <deal.icon className="w-4 h-4" />
                      {deal.type === 'flight' ? 'Ida y vuelta' : deal.type === 'bus' ? 'Asiento cama' : 'Interior'}
                    </span>
                    <span className="font-medium text-red-500">Quedan 4 cupos</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full group-hover:bg-gray-900 transition-colors">
                    Reservar Ahora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Why Choose Asfales (Unified Trust) */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Asfales?</h2>
            <p className="text-muted-foreground">La única plataforma que asegura tu viaje de principio a fin, sin importar el medio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur rounded-xl p-6 text-center hover:bg-white transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Garantía Multi-Trayecto</h3>
              <p className="text-sm text-gray-600">Si tu vuelo se retrasa y pierdes tu bus o crucero, nosotros lo cubrimos.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur rounded-xl p-6 text-center hover:bg-white transition-colors">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Mejor Precio Combinado</h3>
              <p className="text-sm text-gray-600">Algoritmos inteligentes que encuentran la combinación más barata entre aire, tierra y mar.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur rounded-xl p-6 text-center hover:bg-white transition-colors">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Soporte Centralizado 24/7</h3>
              <p className="text-sm text-gray-600">Un solo número de contacto para resolver problemas con aerolíneas, buses o navieras.</p>
            </div>
          </div>
        </section>

        {/* 6. Loyalty Program (GoFar / ViajeRewards Unified) */}
        <section className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-16">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
               <div className="flex items-center gap-2 text-yellow-400">
                 <Gift className="w-6 h-6" />
                 <span className="font-bold tracking-wide uppercase">Programa de Lealtad Unificado</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                 Un Mundo de Recompensas
               </h2>
               <p className="text-gray-300 text-lg">
                 Acumula puntos <strong>GoFar</strong> en vuelos, <strong>Kilómetros</strong> en buses y <strong>Millas Náuticas</strong> en cruceros. 
                 Todo se suma en una sola cuenta para canjear por cualquier tipo de viaje.
               </p>
               <div className="flex gap-4 pt-4">
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-green-400" />
                   <span className="text-sm">Sin fechas restringidas</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-green-400" />
                   <span className="text-sm">Puntos nunca vencen</span>
                 </div>
               </div>
            </div>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white w-full md:w-80 p-6">
               <div className="text-center">
                 <Target className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                 <h3 className="text-xl font-bold mb-2">Bono de Bienvenida</h3>
                 <p className="text-3xl font-bold text-yellow-400 mb-2">5,000</p>
                 <p className="text-sm text-gray-300 mb-6">Puntos al registrarte hoy</p>
                 <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                   Únete Gratis
                 </Button>
               </div>
            </Card>
          </div>
        </section>

      </Suspense>
    </div>
  );
}