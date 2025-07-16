'use client';

import React, { useState } from 'react';
import { ShowIfAuth } from '@/components/ShowIfAuth';
import { ShowIfUnauth } from '@/components/ShowIfUnauth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ItinerarySharedCard } from './ItinerarySharedCard';
import { ItinerariesPrivateCard } from './ItinerariesPrivateCard';
import { 
  Plus, 
  Users, 
  MessageCircle, 
  Share2, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Star,
  UserPlus,
  Eye,
  Search,
  TrendingUp,
  Globe,
  Heart,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  Compass,
  Route
} from 'lucide-react';
import router from 'next/router';

interface IItinerariesHomeSectionsProps {}

export default function ItinerariesHomeSections() {
  // Mock data para itinerarios compartidos
  const sharedItineraries = [
    {
      id: "1",
      title: "Aventura en los Andes Colombianos",
      coverImage: "https://wp.aviaturdmc.com/wp-content/uploads/2023/11/impresionante-vista-montanas-nevadas-1024x680.webp",
      startDate: "15 Mar",
      endDate: "22 Mar",
      price: "$1,200,000",
      creator: {
        id: "user1",
        name: "María García",
        userName: "maria_travel",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b9c1a37b?w=100&h=100&fit=crop&crop=face"
      },
      creatorBio: "Conoce a los Andes como nunca antes",
      colaborators: [
      { 
        id: "col3", 
        name: "Santiago Herrera", 
        avatarUrl: "https://i.pravatar.cc/150?img=15",
        userName: "santiagoherrera"
      }
    ],
      participants: [
        { id: "p1", name: "Carlos", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
        { id: "p2", name: "Ana", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { id: "p3", name: "Luis", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        { id: "p4", name: "Sofia", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" }
      ],
      maxParticipants: 8,
      cities: ["Medellín", "Guatapé", "El Peñol"],
      lodgingCount: 3,
      experienceCount: 5,
      transportSummary: [
        { mode: "flight" as const, count: 2 },
        { mode: "bus" as const, count: 3 }
      ],
      isPriceEstimated: false
    },
    {
      id: "2",
      title: "Caribe Mágico - Cartagena y San Andrés",
      coverImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop",
      startDate: "10 Abr",
      endDate: "20 Abr",
      price: "$2,500,000",
      creator: {
        id: "user2",
        name: "Carlos Ruiz",
        userName: "carlos_explorer",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      creatorBio: "Explorador de los destinos más exóticos",
      participants: [
        { id: "p5", name: "Diana", avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b9c1a37b?w=100&h=100&fit=crop&crop=face" },
        { id: "p6", name: "Miguel", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        { id: "p7", name: "Elena", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { id: "p8", name: "Pedro", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
        { id: "p9", name: "Laura", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
        { id: "p10", name: "Andrés", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }
      ],
      maxParticipants: 10,
      cities: ["Cartagena", "San Andrés", "Providencia"],
      lodgingCount: 4,
      experienceCount: 7,
      transportSummary: [
        { mode: "flight" as const, count: 3 },
        { mode: "cruise" as const, count: 1 }
      ],
      isPriceEstimated: false
    },
    {
      id: "3",
      title: "Café y Cultura en el Eje Cafetero",
      coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
      startDate: "5 May",
      endDate: "10 May",
      price: "$900,000",
      creator: {
        id: "user3",
        name: "Ana López",
        userName: "ana_coffee",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      creatorBio: "Amante del café y la naturaleza",
       colaborators: [
      { 
        id: "col1", 
        name: "Andrea Morales", 
        avatarUrl: "https://i.pravatar.cc/150?img=24",
        userName: "andreamorales"
      },
      { 
        id: "col2", 
        name: "Roberto Silva", 
        avatarUrl: "https://i.pravatar.cc/150?img=31",
        userName: "robertosilva"
      }
    ],
      participants: [
        { id: "p11", name: "Roberto", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        { id: "p12", name: "Carmen", avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b9c1a37b?w=100&h=100&fit=crop&crop=face" },
        { id: "p13", name: "Javier", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
        { id: "p14", name: "Isabel", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
        { id: "p15", name: "Fernando", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }
      ],
      maxParticipants: 12,
      cities: ["Armenia", "Salento", "Filandia", "Manizales"],
      lodgingCount: 2,
      experienceCount: 4,
      transportSummary: [
        { mode: "flight" as const, count: 1 },
        { mode: "bus" as const, count: 4 }
      ],
      isPriceEstimated: true
    }
  ];

  // Mock data para itinerarios privados (plantillas)
  const privateItineraryTemplates = [
    {
      id: "private1",
      title: "Descubre la Riviera Maya",
      imageUrl: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=600&fit=crop",
      startDate: new Date('2025-08-15'),
      endDate: new Date('2025-08-22'),
      accommodations: [
        { type: 'resort' as const, typeName: 'Resort Todo Incluido', count: 1 },
        { type: 'hotel' as const, typeName: 'Hotel Boutique', count: 1 }
      ],
      transports: [
        { type: 'flight' as const, typeName: 'Vuelo', count: 2 }
      ],
      experiences: { count: 6 },
      estimatedBudgetPerPerson: 2800000,
      currency: '$',
      destination: "Cancún, México"
    },
    {
      id: "private2",
      title: "Europa Central Clásica",
      imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
      startDate: new Date('2025-09-10'),
      endDate: new Date('2025-09-20'),
      accommodations: [
        { type: 'hotel' as const, typeName: 'Hotel 4 Estrellas', count: 3 },
        { type: 'apartment' as const, typeName: 'Apartamento', count: 1 }
      ],
      transports: [
        { type: 'flight' as const, typeName: 'Vuelo Internacional', count: 1 },
        { type: 'train' as const, typeName: 'Tren Europeo', count: 4 }
      ],
      experiences: { count: 8 },
      estimatedBudgetPerPerson: 4200000,
      currency: '$',
      destination: "Praga, Viena, Budapest"
    },
    {
      id: "private3",
      title: "Safari en Tanzania",
      imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      startDate: new Date('2025-10-05'),
      endDate: new Date('2025-10-15'),
      accommodations: [
        { type: 'resort' as const, typeName: 'Lodge Safari', count: 2 },
        { type: 'hotel' as const, typeName: 'Hotel de Lujo', count: 1 }
      ],
      transports: [
        { type: 'flight' as const, typeName: 'Vuelo Internacional', count: 2 },
        { type: 'bus' as const, typeName: 'Vehículo Safari', count: 5 }
      ],
      experiences: { count: 10 },
      estimatedBudgetPerPerson: 6500000,
      currency: '$',
      destination: "Serengeti, Ngorongoro"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative mt-10 py-12 px-4 2xl:px-0 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop)' }}
        ></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Itinerarios Únicos
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Descubre, crea y comparte experiencias de viaje extraordinarias con una comunidad de exploradores apasionados
          </p>
          
          <ShowIfUnauth>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant={"secondary"}  className=" px-8 py-4 text-lg  h-12 w-[280px]">
                <Search className="mr-2 h-5 w-5" />
                Explorar Itinerarios
              </Button>
              <Button variant="ghost" className="border border-white px-8 py-4 text-lg w-full h-12 lg:w-[280px]">
                <UserPlus className="mr-2 h-5 w-5" />
                Únete Gratis
              </Button>
            </div>
          </ShowIfUnauth>

          <ShowIfAuth>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
               <Button  variant="ghost" className="border border-white px-8 py-4 text-lg w-full h-12 lg:w-[280px]">
                <Route className="mr-2 h-5 w-5" />
                Descubrir Itinerarios
              </Button>
              <Button variant={"secondary"} className=" px-8 py-4 text-lg w-full h-12 lg:w-[280px]">
                <Plus className="mr-2 h-5 w-5" />
                Crear Mi Itinerario
              </Button>
             
            </div>
          </ShowIfAuth>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Itinerarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2,500+</div>
              <div className="text-white/80">Viajeros Conectados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Destinos Únicos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Itineraries Section */}
      <section className="py-12 px-4 2xl:px-0 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 text-start">Itinerarios Destacados</h2>
            <p className="text-muted-foreground mt-2 text-start mb-10 text-lg">
              Descubre aventuras cuidadosamente seleccionadas por nuestra comunidad de viajeros expertos
            </p>
          </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sharedItineraries.map((itinerary) => (
                <ItinerarySharedCard key={itinerary.id} {...itinerary} />
              ))}
            </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-white"
              onClick={()=>router.push("/itineraries")}
            >
              Ver Todos los Itinerarios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Private Templates Section - Solo para usuarios autenticados */}
      <ShowIfAuth>
        <section className="py-12 px-4 2xl:px-0">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-800 text-start">Plantillas para Empezar</h2>
              <p className="text-muted-foreground mt-2 text-start mb-10 text-lg">
                Comienza tu próximo viaje con estas plantillas listas para personalizar
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privateItineraryTemplates.map((template) => (
                <ItinerariesPrivateCard 
                  key={template.id} 
                  {...template}
                  onInvitePeople={(id) => console.log('Invitar personas al itinerario:', id)}
                  onClick={(id) => console.log('Abrir itinerario:', id)}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-secondary hover:bg-secondary/90 px-8 h-12 w-[280px]">
                <Plus className="mr-2 h-5 w-5" />
                Crear Desde Cero
              </Button>
            </div>
          </div>
        </section>
      </ShowIfAuth>

      {/* How It Works Section */}
      <section className="py-12 px-4 2xl:px-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 ">¿Cómo Funciona?</h2>
            <p className="text-muted-foreground mt-2 mb-10 text-lg">
              Crear y unirse a itinerarios nunca había sido tan fácil
            </p>
          </div>

          <ShowIfUnauth>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Explora</h3>
                <p className="text-gray-600">
                  Descubre itinerarios únicos creados por viajeros expertos de todo el mundo
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Únete</h3>
                <p className="text-gray-600">
                  Solicita unirte a grupos de viaje que coincidan con tus intereses y fechas
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Compass className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Viaja</h3>
                <p className="text-gray-600">
                  Disfruta de experiencias increíbles con nuevos amigos y recuerdos únicos
                </p>
              </div>
            </div>
          </ShowIfUnauth>

          <ShowIfAuth>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Crear</h3>
                <p className="text-gray-600 text-sm">
                  Diseña tu itinerario perfecto
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Compartir</h3>
                <p className="text-gray-600 text-sm">
                  Invita a otros viajeros
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Colaborar</h3>
                <p className="text-gray-600 text-sm">
                  Planifica en grupo
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/80 to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Monetizar</h3>
                <p className="text-gray-600 text-sm">
                  Gana con tus itinerarios
                </p>
              </div>
            </div>
          </ShowIfAuth>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 2xl:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 text-start">Características Únicas</h2>
            <p className="text-muted-foreground mt-2 mb-10 text-start text-lg">
              Todo lo que necesitas para crear y gestionar experiencias de viaje inolvidables
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 ">Chat Grupal</h3>
                <p className="text-gray-600">
                  Comunícate en tiempo real con tu grupo de viaje para coordinar cada detalle
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Viajes Seguros</h3>
                <p className="text-gray-600">
                  Sistema de verificación y reseñas para garantizar experiencias confiables
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Planificación Rápida</h3>
                <p className="text-gray-600">
                  Herramientas intuitivas para crear itinerarios detallados en minutos
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/80 to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monetización</h3>
                <p className="text-gray-600">
                  Convierte tu pasión por viajar en una fuente de ingresos
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Alcance Global</h3>
                <p className="text-gray-600">
                  Conecta con viajeros de todo el mundo y descubre culturas únicas
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experiencias Auténticas</h3>
                <p className="text-gray-600">
                  Descubre destinos desde la perspectiva de locales y expertos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 2xl:px-0 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para tu Próxima Aventura?
          </h2>
          <p className=" text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Únete a miles de viajeros que ya están creando recuerdos inolvidables juntos
          </p>
          
          <ShowIfUnauth>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant={"secondary"} className=" px-8 py-4 text-lg h-12 w-[280px]">
                <UserPlus className="mr-2 h-5 w-5" />
                Comienza Gratis
              </Button>
              <Button variant="ghost" className="border border-white px-8 py-4 text-lg w-full h-12 lg:w-[280px]">
                <Search className="mr-2 h-5 w-5" />
                Explorar Primero
              </Button>
            </div>
          </ShowIfUnauth>

          <ShowIfAuth>
            <Button  className="bg-secondary hover:bg-secondary/90 px-8 py-4 text-lg  h-12 w-[280px]">
              <Plus className="mr-2 h-5 w-5" />
              Crear Mi Primer Itinerario
            </Button>
          </ShowIfAuth>
        </div>
      </section>
    </div>
  );
}