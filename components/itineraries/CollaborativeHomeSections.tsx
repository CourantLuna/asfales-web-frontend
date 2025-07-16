'use client';

import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ShowIfAuth } from '@/components/ShowIfAuth';
import { ShowIfUnauth } from '@/components/ShowIfUnauth';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  CalendarDays,
  Plane,
  UserPlus,
  HeartHandshake,
  MessageCircle,
  Calendar,
  DollarSign,
  Star,
  Search,
  Route,
  FileCheck,
  Link as LinkIcon,
  Globe,
  AlertCircle,
  CheckCircle,
  ClipboardEdit,
  Clock,
  Settings,
  Pencil,
  Briefcase
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

interface ICollaborativeHomeSectionsProps {}

export default function CollaborativeHomeSections() {
   return (
       <Suspense fallback={null}>
           {/* Secciones de Interés del Usuario - Enfocadas en Colaboración */}
           <div className="space-y-8 pb-12">
             {/* Sección principal de acciones colaborativas - Solo para usuarios autenticados */}
             <ShowIfAuth>
               <div className="bg-gray-50 rounded-3xl p-8">
                 <div className="text-center mb-8">
                   <h2 className="text-3xl font-bold text-gray-900 mb-2">
                     Colabora • Contribuye • Comparte
                   </h2>
                   <p className="text-gray-600 text-lg">
                     Trabaja con otros viajeros para crear experiencias inolvidables
                   </p>
                   <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                     <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 h-12">
                       <UserPlus className="mr-2 h-5 w-5" />
                       Unirme a un Itinerario
                     </Button>
                     <Button variant="outline" className=" px-8 py-3 h-12">
                       <HeartHandshake className="mr-2 h-5 w-5" />
                       Invitar Colaboradores
                     </Button>
                   </div>
                 </div>
           
                 {/* Cards de gestión de colaboración */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Colaboraciones activas */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" 
                         alt="Colaboraciones activas"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                         <h3 className="text-white text-xl font-semibold mb-2">Colaboraciones Activas</h3>
                         <p className="text-white/80 text-sm">Continúa trabajando en itinerarios compartidos</p>
                       </div>
                     </div>
                     <div className="p-5">
                       <div className="flex justify-between items-center mb-4">
                         <span className="text-sm text-muted-foreground">5 itinerarios activos</span>
                         <Badge className="bg-emerald-500 text-white">Colaborando</Badge>
                       </div>
                       <div className="flex -space-x-2">
                         {[1, 2, 3, 4].map(i => (
                           <Avatar key={i} className="border-2 border-white">
                             <AvatarImage src={`https://i.pravatar.cc/150?img=${i+10}`} />
                             <AvatarFallback>U{i}</AvatarFallback>
                           </Avatar>
                         ))}
                         <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white">
                           <span className="text-xs font-medium text-primary">+3</span>
                         </div>
                       </div>
                     </div>
                   </div>
           
                   {/* Invitaciones pendientes */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop" 
                         alt="Invitaciones pendientes"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                         <h3 className="text-white text-xl font-semibold mb-2">Invitaciones Pendientes</h3>
                         <p className="text-white/80 text-sm">Responde a solicitudes para colaborar</p>
                       </div>
                     </div>
                     <div className="p-5">
                       <div className="flex justify-between items-center mb-4">
                         <span className="text-sm text-muted-foreground">3 invitaciones nuevas</span>
                         <Badge className="bg-amber-500 text-white">Por revisar</Badge>
                       </div>
                       <div className="space-y-2">
                         <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                             <Avatar>
                               <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                               <AvatarFallback>LM</AvatarFallback>
                             </Avatar>
                             <div className="text-sm">
                               <p className="font-medium">Laura Méndez</p>
                               <p className="text-xs text-muted-foreground">Hace 2 días</p>
                             </div>
                           </div>
                           <Button size="sm" className="h-8" variant="ghost">Ver</Button>
                         </div>
                       </div>
                     </div>
                   </div>
           
                   {/* Itinerarios compartidos */}
                   <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                     <div className="relative h-48">
                       <img 
                         src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop" 
                         alt="Itinerarios compartidos"
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                         <h3 className="text-white text-xl font-semibold mb-2">Itinerarios Públicos</h3>
                         <p className="text-white/80 text-sm">Explora itinerarios colaborativos públicos</p>
                       </div>
                     </div>
                     <div className="p-5">
                       <div className="flex justify-between items-center mb-4">
                         <span className="text-sm text-muted-foreground">15 itinerarios disponibles</span>
                         <Badge className="bg-blue-500 text-white">Público</Badge>
                       </div>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <Globe className="h-4 w-4 text-muted-foreground" />
                           <span className="text-sm text-muted-foreground">Comunidad Asfales</span>
                         </div>
                         <Button size="sm" className="h-8" variant="ghost">Explorar</Button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           
               {/* Estado de colaboraciones */}
               <div className="bg-white rounded-xl border shadow-sm p-6">
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-semibold text-gray-900">Estado de Colaboraciones</h3>
                   <Button variant="outline" size="sm">
                     <Settings className="w-4 h-4 mr-2" />
                     Configurar
                   </Button>
                 </div>
           
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <Card className="border-l-4 border-l-emerald-500">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm text-muted-foreground">Completados</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="flex items-end justify-between">
                         <div className="text-2xl font-bold">7</div>
                         <div className="flex items-center text-emerald-500 text-sm">
                           <CheckCircle className="h-4 w-4 mr-1" />
                           3 este mes
                         </div>
                       </div>
                       <Progress value={70} className="h-1 mt-4" />
                     </CardContent>
                   </Card>
           
                   <Card className="border-l-4 border-l-amber-500">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm text-muted-foreground">En Progreso</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="flex items-end justify-between">
                         <div className="text-2xl font-bold">5</div>
                         <div className="flex items-center text-amber-500 text-sm">
                           <Clock className="h-4 w-4 mr-1" />
                           Activos
                         </div>
                       </div>
                       <Progress value={45} className="h-1 mt-4" />
                     </CardContent>
                   </Card>
           
                   <Card className="border-l-4 border-l-blue-500">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm text-muted-foreground">Pendientes</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="flex items-end justify-between">
                         <div className="text-2xl font-bold">3</div>
                         <div className="flex items-center text-blue-500 text-sm">
                           <AlertCircle className="h-4 w-4 mr-1" />
                           Por revisar
                         </div>
                       </div>
                       <Progress value={30} className="h-1 mt-4" />
                     </CardContent>
                   </Card>
           
                   <Card className="border-l-4 border-l-gray-500">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm text-muted-foreground">Contribuciones</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="flex items-end justify-between">
                         <div className="text-2xl font-bold">42</div>
                         <div className="flex items-center text-gray-500 text-sm">
                           <ClipboardEdit className="h-4 w-4 mr-1" />
                           Total
                         </div>
                       </div>
                       <Progress value={85} className="h-1 mt-4" />
                     </CardContent>
                   </Card>
                 </div>
               </div>
             </ShowIfAuth>
           
             {/* Tabs de actividad colaborativa - Solo para usuarios autenticados */}
             <ShowIfAuth>
               <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                 <Tabs defaultValue="pendientes" className="w-full">
                   <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-none h-14">
                     <TabsTrigger value="pendientes" className="data-[state=active]:bg-white rounded-none h-full">
                       <AlertCircle className="w-4 h-4 mr-2" />
                       Pendientes
                     </TabsTrigger>
                     <TabsTrigger value="activos" className="data-[state=active]:bg-white rounded-none h-full">
                       <Clock className="w-4 h-4 mr-2" />
                       Activos
                     </TabsTrigger>
                     <TabsTrigger value="completados" className="data-[state=active]:bg-white rounded-none h-full">
                       <CheckCircle className="w-4 h-4 mr-2" />
                       Completados
                     </TabsTrigger>
                   </TabsList>
                   
                   <TabsContent value="pendientes" className="p-6">
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="text-lg font-semibold">Acciones Pendientes</h3>
                         <Badge className="bg-amber-100 text-amber-800">3 pendientes</Badge>
                       </div>
                       
                       {/* Lista de acciones pendientes */}
                       <div className="space-y-3">
                         <div className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                           <div className="bg-amber-100 p-2 rounded-full">
                             <UserPlus className="h-5 w-5 text-amber-600" />
                           </div>
                           <div className="flex-grow">
                             <p className="font-medium">Invitación a colaborar</p>
                             <p className="text-sm text-muted-foreground">Carlos Méndez te invitó a "Aventura en Lisboa"</p>
                           </div>
                           <div className="flex gap-2">
                             <Button size="sm" variant="outline">Rechazar</Button>
                             <Button size="sm">Aceptar</Button>
                           </div>
                         </div>
                         
                         <div className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                           <div className="bg-amber-100 p-2 rounded-full">
                             <FileCheck className="h-5 w-5 text-amber-600" />
                           </div>
                           <div className="flex-grow">
                             <p className="font-medium">Revisión pendiente</p>
                             <p className="text-sm text-muted-foreground">Ana López añadió 3 hoteles a "Ruta de vinos en Francia"</p>
                           </div>
                           <Button size="sm">Revisar</Button>
                         </div>
                         
                         <div className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                           <div className="bg-amber-100 p-2 rounded-full">
                             <MessageCircle className="h-5 w-5 text-amber-600" />
                           </div>
                           <div className="flex-grow">
                             <p className="font-medium">Mensaje nuevo</p>
                             <p className="text-sm text-muted-foreground">Luis García comentó en "Viaje a Japón 2026"</p>
                           </div>
                           <Button size="sm">Responder</Button>
                         </div>
                       </div>
                     </div>
                   </TabsContent>
                   
                   <TabsContent value="activos" className="p-6">
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="text-lg font-semibold">Colaboraciones Activas</h3>
                         <Button variant="outline" size="sm">
                           <Pencil className="w-4 h-4 mr-2" />
                           Editar
                         </Button>
                       </div>
                       
                       {/* Lista de colaboraciones activas */}
                       <div className="space-y-3">
                         <div className="p-4 rounded-lg border bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer">
                           <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-3">
                               <Avatar>
                                 <AvatarImage src="https://i.pravatar.cc/150?img=30" />
                                 <AvatarFallback>MR</AvatarFallback>
                               </Avatar>
                               <div>
                                 <p className="font-medium">Escapada a Barcelona</p>
                                 <p className="text-sm text-muted-foreground">Creado por Martín Rodríguez</p>
                               </div>
                             </div>
                             <Badge>5 colaboradores</Badge>
                           </div>
                           <div className="flex items-center justify-between text-sm text-muted-foreground">
                             <div className="flex items-center gap-1">
                               <CalendarDays className="w-4 h-4" />
                               15 ago - 22 ago, 2025
                             </div>
                             <div className="flex items-center gap-2">
                               <div className="flex items-center gap-1">
                                 <Plane className="w-4 h-4 text-amber-300" />
                                 2
                               </div>
                               <div className="flex items-center gap-1">
                                 <Briefcase className="w-4 h-4 text-blue-300" />
                                 3
                               </div>
                             </div>
                           </div>
                           <div className="mt-3">
                             <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                               <span>Progreso: 65%</span>
                               <span>13/20 tareas</span>
                             </div>
                             <Progress value={65} className="h-1.5" />
                           </div>
                         </div>
                         
                         <div className="p-4 rounded-lg border bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer">
                           <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-3">
                               <Avatar>
                                 <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                                 <AvatarFallback>LG</AvatarFallback>
                               </Avatar>
                               <div>
                                 <p className="font-medium">Viaje a Japón 2026</p>
                                 <p className="text-sm text-muted-foreground">Creado por Laura Gómez</p>
                               </div>
                             </div>
                             <Badge>8 colaboradores</Badge>
                           </div>
                           <div className="flex items-center justify-between text-sm text-muted-foreground">
                             <div className="flex items-center gap-1">
                               <CalendarDays className="w-4 h-4" />
                               10 mar - 28 mar, 2026
                             </div>
                             <div className="flex items-center gap-2">
                               <div className="flex items-center gap-1">
                                 <Plane className="w-4 h-4 text-amber-300" />
                                 4
                               </div>
                               <div className="flex items-center gap-1">
                                 <Briefcase className="w-4 h-4 text-blue-300" />
                                 6
                               </div>
                             </div>
                           </div>
                           <div className="mt-3">
                             <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                               <span>Progreso: 40%</span>
                               <span>12/30 tareas</span>
                             </div>
                             <Progress value={40} className="h-1.5" />
                           </div>
                         </div>
                       </div>
                     </div>
                   </TabsContent>
                   
                   <TabsContent value="completados" className="p-6">
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <h3 className="text-lg font-semibold">Colaboraciones Completadas</h3>
                         <Badge className="bg-emerald-100 text-emerald-800">7 completados</Badge>
                       </div>
                       
                       {/* Lista de colaboraciones completadas */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                           <div className="flex items-center justify-between mb-2">
                             <p className="font-medium">Tour por Italia</p>
                             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                               Completado
                             </Badge>
                           </div>
                           <p className="text-sm text-muted-foreground mb-2">Jun 10 - Jun 24, 2025</p>
                           <div className="flex items-center gap-2">
                             <Avatar className="h-6 w-6">
                               <AvatarImage src="https://i.pravatar.cc/150?img=33" />
                               <AvatarFallback>AP</AvatarFallback>
                             </Avatar>
                             <span className="text-xs text-muted-foreground">Con 6 colaboradores</span>
                           </div>
                         </div>
                         
                         <div className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                           <div className="flex items-center justify-between mb-2">
                             <p className="font-medium">Caribe Mexicano</p>
                             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                               Completado
                             </Badge>
                           </div>
                           <p className="text-sm text-muted-foreground mb-2">Feb 5 - Feb 15, 2025</p>
                           <div className="flex items-center gap-2">
                             <Avatar className="h-6 w-6">
                               <AvatarImage src="https://i.pravatar.cc/150?img=36" />
                               <AvatarFallback>SL</AvatarFallback>
                             </Avatar>
                             <span className="text-xs text-muted-foreground">Con 4 colaboradores</span>
                           </div>
                         </div>
                       </div>
                       
                       <div className="text-center mt-4">
                         <Button variant="outline">Ver todos los itinerarios completados</Button>
                       </div>
                     </div>
                   </TabsContent>
                 </Tabs>
               </div>
             </ShowIfAuth>
           
           
             {/* CTA final - Adaptativo según autenticación */}
             <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-3xl p-8 text-center">
               <ShowIfAuth>
                 <div className="max-w-2xl mx-auto">
                   <h3 className="text-2xl font-bold mb-4">
                     ¿Listo para colaborar más?
                   </h3>
                   <p className="text-white/90 text-lg mb-8">
                     Invita a otros viajeros a tus itinerarios y crea experiencias inolvidables juntos
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button variant="ghost" className=" border-white border h-12 text-white hover:bg-white">
                       <HeartHandshake className="mr-2 h-5 w-5" />
                       Invitar Colaboradores
                     </Button>
                     <Button variant="default" className="h-12 text-white border-white hover:bg-white/30">
                       Explorar Itinerarios Públicos
                     </Button>
                   </div>
                 </div>
               </ShowIfAuth>
           
               <ShowIfUnauth>
                 <div className="max-w-2xl mx-auto">
                   <h3 className="text-2xl font-bold mb-4">
                     Mejor juntos: Planifica tus viajes en equipo
                   </h3>
                   <p className="text-white/90 text-lg mb-8">
                     Únete a miles de viajeros que crean itinerarios de forma colaborativa
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button className="bg-white text-primary hover:bg-white/90">
                       Crear una cuenta gratis
                     </Button>
                     <Link href="/como-funciona">
                      <Button variant="default" className="h-12 text-white border-white hover:bg-white/30">
                         Cómo funciona
                       </Button>
                     </Link>
                   </div>
                 </div>
               </ShowIfUnauth>
             </div>
           </div>
       </Suspense>
   );
}