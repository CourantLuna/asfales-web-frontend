'use client';


import React, { Suspense, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Star,
  Users,
  Share2,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  UserPlus,
  DollarSign,
  Globe,
  Route,
  Eye,
  Search
} from 'lucide-react';
import { ShowIfAuth } from '../ShowIfAuth';
import { ShowIfUnauth } from '../ShowIfUnauth';

interface IMyItinerariesHomeSectionsProps {}

export default function MyItinerariesHomeSections() {
   return (
       <Suspense fallback={null}>
           {/* Secciones de Interés del Usuario - MEJORADAS CON GRADIENTES SELECTIVOS */}
           <div className="space-y-8 pb-12">
             {/* Sección principal de acciones - Solo para usuarios autenticados */}
             <ShowIfAuth>
               <div className="bg-gray-50 rounded-3xl p-8">
                 <div className="text-center mb-8">
                   <h2 className="text-3xl font-bold text-gray-900 mb-2">
                     Crea • Edita • Comparte
                   </h2>
                   <p className="text-gray-600 text-lg">
                     Gestiona tus itinerarios de manera profesional
                   </p>
                   <Button className="mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 h-12">
                     <Plus className="mr-2 h-5 w-5" />
                     Crear Nuevo Itinerario
                   </Button>
                 </div>
           
                 {/* Cards de gestión de itinerarios */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Crear desde cero */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop" 
                         alt="Crear itinerario"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                       <div className="absolute top-4 left-4">
                         <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                           CREAR DESDE CERO
                         </Badge>
                       </div>
                       <div className="absolute bottom-4 left-4 text-white pr-4">
                         <h3 className="font-semibold text-lg mb-1">
                           Diseña tu itinerario perfecto
                         </h3>
                         <p className="text-sm text-white/80">
                           Agrega segmentos, edita detalles y personaliza tu viaje
                         </p>
                       </div>
                       <div className="absolute bottom-4 right-4">
                         <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Plus className="w-5 h-5 text-white" />
                         </div>
                       </div>
                     </div>
                   </div>
           
                   {/* Editar y gestionar */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop" 
                         alt="Editar itinerarios"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                       <div className="absolute top-4 left-4">
                         <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-0">
                           EDITAR Y GESTIONAR
                         </Badge>
                       </div>
                       <div className="absolute bottom-4 left-4 text-white pr-4">
                         <h3 className="font-semibold text-lg mb-1">
                           Perfecciona tus itinerarios
                         </h3>
                         <p className="text-sm text-white/80">
                           Reordena segmentos, ajusta detalles y optimiza rutas
                         </p>
                       </div>
                       <div className="absolute bottom-4 right-4">
                         <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                           <ChevronRight className="w-5 h-5 text-white" />
                         </div>
                       </div>
                     </div>
                   </div>
           
                   {/* Publicar y comercializar */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop" 
                         alt="Publicar itinerario"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                       <div className="absolute top-4 left-4">
                         <Badge className="bg-gradient-to-r from-primary via-secondary to-primary text-white border-0">
                           PUBLICAR Y MONETIZAR
                         </Badge>
                       </div>
                       <div className="absolute bottom-4 left-4 text-white pr-4">
                         <h3 className="font-semibold text-lg mb-1">
                           Comparte con el mundo
                         </h3>
                         <p className="text-sm text-white/80">
                           Publica, asigna precios y colabora con otros viajeros
                         </p>
                       </div>
                       <div className="absolute bottom-4 right-4">
                         <div className="w-10 h-10 bg-gradient-to-r from-primary via-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Share2 className="w-5 h-5 text-white" />
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           
               
             </ShowIfAuth>
           
             {/* Sección de búsqueda de reservaciones - Full width */}
             <div className="bg-white rounded-xl border shadow-sm p-6">
               <div className="max-w-7xl mx-auto text-center justify-center">
                 <ShowIfAuth>
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     Busca tu Reservación
                   </h3>
                   <p className="text-gray-600 mb-6">
                     Busca con tu número de itinerario para ver los detalles de tu reservación
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
                       <input
                         type="text"
                         placeholder="IT-2024-001234"
                         className="w-full w-full lg:w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                       />
                     <Button className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white w-full lg:w-[280px]">
                       <Search className="w-4 h-4 mr-2" />
                       Buscar
                     </Button>
                   </div>
                  
                 </ShowIfAuth>
           
                 <ShowIfUnauth>
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     Busca tu Reservación
                   </h3>
                   <p className="text-gray-600 mb-6">
                     Ingresa tu correo electrónico y número de itinerario para ver los detalles de tu reservación
                   </p>
                   
                   <div className="space-y-3 max-w-md mx-auto">
                     <div>
                       <input
                         type="email"
                         placeholder="Tu correo electrónico"
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                       />
                     </div>
                     <div>
                       <input
                         type="text"
                         placeholder="Número de itinerario"
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                       />
                     </div>
                     <Button className="w-full px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white">
                       <Search className="w-4 h-4 mr-2" />
                       Buscar Reservación
                     </Button>
                   </div>
                   
                   <div className="mt-4 space-y-2">
                     <p className="text-sm text-gray-500">
                       Ejemplo: IT-2024-001234
                     </p>
                     <button className="text-primary hover:text-primary/80 text-sm underline">
                       ¿Olvidaste tu número de itinerario?
                     </button>
                   </div>
                 </ShowIfUnauth>
               </div>
             </div>  
           
             {/* Funcionalidades principales - Solo autenticados */}
             <ShowIfAuth>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Panel de gestión de segmentos */}
                 <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow">
                   <div className="flex items-center justify-between mb-6">
                     <div>
                       <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Segmentos</h3>
                       <p className="text-gray-600 text-sm">Organiza y perfecciona cada parte de tu viaje</p>
                     </div>
                     <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                       <Route className="w-6 h-6 text-white" />
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                         <Plus className="w-4 h-4 text-primary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Agregar Segmentos</h4>
                         <p className="text-sm text-gray-500">Manual o desde resultados de búsqueda</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                         <Users className="w-4 h-4 text-secondary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Reordenar Elementos</h4>
                         <p className="text-sm text-gray-500">Arrastra y reorganiza tu itinerario</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                         <Star className="w-4 h-4 text-primary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Editar Detalles</h4>
                         <p className="text-sm text-gray-500">Personaliza cada segmento del viaje</p>
                       </div>
                     </div>
                   </div>
                 </div>
           
                 {/* Panel de colaboración y monetización */}
                 <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow">
                   <div className="flex items-center justify-between mb-6">
                     <div>
                       <h3 className="text-xl font-semibold text-gray-900 mb-2">Colaboración y Ventas</h3>
                       <p className="text-gray-600 text-sm">Comparte y monetiza tus creaciones</p>
                     </div>
                     <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                       <DollarSign className="w-6 h-6 text-white" />
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                         <Share2 className="w-4 h-4 text-secondary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Compartir con Colaboradores</h4>
                         <p className="text-sm text-gray-500">Invita a amigos a planear juntos</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                         <Globe className="w-4 h-4 text-primary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Publicar como Grupo</h4>
                         <p className="text-sm text-gray-500">Haz tu itinerario público</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
                       <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                         <DollarSign className="w-4 h-4 text-secondary" />
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">Asignar Precio Comercial</h4>
                         <p className="text-sm text-gray-500">Monetiza tu experiencia</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </ShowIfAuth>
           
             {/* Sección de herramientas avanzadas - Solo autenticados */}
             <ShowIfAuth>
               <div className="bg-gray-50 rounded-xl p-8">
                 <div className="text-center mb-8">
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
                     Herramientas Profesionales
                   </h3>
                   <p className="text-gray-600 text-lg">
                     Lleva tus itinerarios al siguiente nivel
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                     <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                       <Calendar className="w-8 h-8 text-white" />
                     </div>
                     <h4 className="font-semibold text-gray-900 mb-2">Planificación Avanzada</h4>
                     <p className="text-sm text-gray-600">Cronogramas detallados y optimización de rutas</p>
                   </div>
                   
                   <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                     <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                       <Users className="w-8 h-8 text-white" />
                     </div>
                     <h4 className="font-semibold text-gray-900 mb-2">Chat Colaborativo</h4>
                     <p className="text-sm text-gray-600">Comunícate en tiempo real con tu equipo</p>
                   </div>
                   
                   <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                     <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                       <Star className="w-8 h-8 text-white" />
                     </div>
                     <h4 className="font-semibold text-gray-900 mb-2">Análticas Premium</h4>
                     <p className="text-sm text-gray-600">Estadísticas de tus itinerarios publicados</p>
                   </div>
                   
                   <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                     <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                       <Share2 className="w-8 h-8 text-white" />
                     </div>
                     <h4 className="font-semibold text-gray-900 mb-2">Exportar y Compartir</h4>
                     <p className="text-sm text-gray-600">PDF, enlaces públicos y redes sociales</p>
                   </div>
                 </div>
               </div>
             </ShowIfAuth>
           
            
           
             {/* CTA final - Adaptativo según autenticación */}
             <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-3xl p-8 text-center">
               <ShowIfAuth>
                 <div className="max-w-2xl mx-auto">
                   <h3 className="text-2xl font-bold mb-4">
                     ¿Listo para tu próxima creación?
                   </h3>
                   <p className="text-white/90 text-lg mb-8">
                     Transforma tus ideas de viaje en itinerarios profesionales que otros querrán seguir
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button variant="secondary" className="px-8 py-3 h-12 text-lg">
                       <Plus className="mr-2 h-5 w-5" />
                       Crear Nuevo Itinerario
                     </Button>
                     <Button variant="ghost" className="border border-white px-8 py-3 h-12 text-lg">
                       <Star className="mr-2 h-5 w-5" />
                       Ver Plantillas Populares
                     </Button>
                   </div>
                 </div>
               </ShowIfAuth>
           
               <ShowIfUnauth>
                 <div className="max-w-2xl mx-auto">
                   <h3 className="text-2xl font-bold mb-4">
                     ¡Descubre el Poder de Planificar en Asfales!
                   </h3>
                   <p className="text-white/90 text-lg mb-8">
                     Únete a miles de viajeros que ya están creando y compartiendo itinerarios increíbles
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button variant="secondary" className="px-8 py-3 h-12 text-lg">
                       <UserPlus className="mr-2 h-5 w-5" />
                       Registrarse Gratis
                     </Button>
                     <Button variant="ghost" className="border border-white px-8 py-3 h-12 text-lg lg:w-[280px] w-full">
                       <Eye className="mr-2 h-5 w-5" />
                       Ver Demo
                     </Button>
                   </div>
                 </div>
               </ShowIfUnauth>
             </div>
           </div>
           
       </Suspense>
   );
}