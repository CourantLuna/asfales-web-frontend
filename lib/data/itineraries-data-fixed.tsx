// 'use client';

// import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
// import { Clock, MapPin, Users, Calendar, Star, DollarSign, FileText, Play, CheckCircle, XCircle } from 'lucide-react';

// // Tipos para itinerarios privados
// export interface ItineraryAccommodation {
//   id?: string;
//   name: string;
//   type: 'hotel' | 'apartment' | 'house' | 'resort';
//   rating: number;
//   pricePerNight: number;
//   currency: string;
//   nights: number;
//   image: string;
//   location: string;
//   bookingUrl?: string;
//   amenities?: string[];
// }

// export interface ItineraryTransport {
//   id?: string;
//   type: 'flight' | 'bus' | 'cruise' | 'train' | 'car';
//   from: string;
//   to: string;
//   date: string;
//   price: number;
//   currency: string;
//   duration?: string;
//   company?: string;
//   bookingReference?: string;
// }

// export interface ItineraryExperience {
//   id?: string;
//   name: string;
//   type: string;
//   date: string;
//   price: number;
//   currency: string;
//   duration: string;
//   location: string;
//   image: string;
//   rating?: number;
//   description?: string;
//   bookingUrl?: string;
//   included?: boolean;
// }

// export interface ItineraryUser {
//   id: string;
//   name: string;
//   userName?: string;
//   avatarUrl: string;
//   role?: 'creator' | 'collaborator' | 'participant';
//   joinedAt?: string;
//   permissions?: ('view' | 'edit' | 'invite' | 'manage_budget')[];
// }

// // Estructura unificada principal
// export interface DataItinerary {
//   // Identificación básica
//   id: string;
//   title: string;
//   description?: string; // Opcional para itinerarios públicos básicos
//   coverImage: string;
  
//   // Fechas y duración
//   startDate: string;
//   endDate: string;
//   duration: string;
  
//   // Ubicaciones (unificado)
//   destinations: string[]; // Más específico que cities
//   cities?: string[]; // Backward compatibility para ItineraryPackage
  
//   // Presupuesto y precios (unificado)
//   totalBudget: number; // Ahora requerido
//   currency: string;
//   price?: string; // Precio mostrado al público (puede ser estimado)
//   originalPrice?: string; // Precio original si hay descuento
//   discount?: number; // Porcentaje de descuento
//   isPriceEstimated?: boolean;
  
//   // Creador (unificado y expandido)
//   creator: ItineraryUser;
//   creatorBio?: string;
  
//   // Colaboradores y participantes (unificado)
//   collaborators: ItineraryUser[]; // Usuarios con permisos de edición
//   participants: ItineraryUser[]; 
//   maxParticipants?: number;
//   availableSpots?: number;
//   totalSpots?: number;
  
//   // Estado y visibilidad
//   status: 'draft' | 'active' | 'done' | 'canceled';
//   visibility: 'private' | 'shared' | 'public';
//   isShared: boolean;
//   shareCode?: string;
  
//   // Contenido detallado
//   accommodations: ItineraryAccommodation[];
//   lodgingCount?: number; // Calculado automáticamente
//   transport: ItineraryTransport[];
//   transportSummary?: Array<{
//     mode: 'flight' | 'bus' | 'cruise' | 'train' | 'car';
//     count: number;
//   }>; // Calculado automáticamente
//   experiences: ItineraryExperience[];
//   experienceCount?: number; // Calculado automáticamente
  
//   // Metadatos y organización
//   highlights?: string[];
//   tags: string[];
//   notes?: string;
  
//   // Ratings y reviews
//   rating?: number;
//   reviewCount?: number;
  
//   // Timestamps
//   createdAt: string;
//   updatedAt: string;
  
//   // Campos adicionales para funcionalidades avanzadas
//   weather?: {
//     season: 'spring' | 'summer' | 'fall' | 'winter';
//     averageTemp?: number;
//     rainyDays?: number;
//   };
//   difficulty?: 'easy' | 'moderate' | 'challenging' | 'expert';
//   ageRecommendation?: {
//     min?: number;
//     max?: number;
//   };
//   physicalDemand?: 'low' | 'moderate' | 'high' | 'extreme';
//   languages?: string[];
//   includedServices?: string[];
//   notIncludedServices?: string[];
//   cancellationPolicy?: string;
  
//   // SEO y marketing
//   slug?: string;
//   metaDescription?: string;
//   featured?: boolean;
//   badges?: ('bestseller' | 'new' | 'eco-friendly' | 'family-friendly' | 'adventure' | 'luxury')[];
// }

// // Mock data de itinerarios privados (al menos 9)
// export const myPrivateItineraries: DataItinerary[] = [
//   {
//     id: "pit-001",
//     title: "Aventura en los Andes Colombianos",
//     description: "Expedición de montañismo y senderismo en la Cordillera Oriental",
//     coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
//     startDate: "2025-08-15",
//     endDate: "2025-08-25",
//     duration: "10 días",
//     destinations: ["Bogotá", "Villa de Leyva", "Chingaza", "Guatavita"],
//     cities: ["Bogotá", "Villa de Leyva", "Chingaza", "Guatavita"],
//     totalBudget: 1250,
//     currency: "USD",
//     price: "$1,250 USD",
//     creator: {
//       id: "user-001",
//       name: "Juan Carlos Pérez",
//       userName: "juancarlos_travel",
//       avatarUrl: "https://i.pravatar.cc/150?img=12"
//     },
//     collaborators: [
//       {
//         id: "col-001",
//         name: "María Rodríguez",
//         userName: "maria_rodriguez",
//         avatarUrl: "https://i.pravatar.cc/150?img=25"
//       }
//     ],
//     participants: [
//       {
//         id: "user-001",
//         name: "Juan Carlos Pérez",
//         userName: "juancarlos_travel",
//         avatarUrl: "https://i.pravatar.cc/150?img=12",
//         role: "creator",
//         permissions: ["view", "edit", "invite", "manage_budget"]
//       },
//       {
//         id: "col-001",
//         name: "María Rodríguez",
//         userName: "maria_rodriguez",
//         avatarUrl: "https://i.pravatar.cc/150?img=25",
//         role: "collaborator",
//         permissions: ["view", "edit"]
//       }
//     ],
//     maxParticipants: 8,
//     availableSpots: 6,
//     totalSpots: 8,
//     status: "active",
//     visibility: "private",
//     isShared: false,
//     accommodations: [
//       {
//         name: "Hotel Boutique Casa Colonial",
//         type: "hotel",
//         rating: 4.5,
//         pricePerNight: 85,
//         currency: "USD",
//         nights: 3,
//         image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
//         location: "Villa de Leyva"
//       },
//       {
//         name: "Cabaña Montañera Chingaza",
//         type: "apartment",
//         rating: 4.2,
//         pricePerNight: 65,
//         currency: "USD",
//         nights: 2,
//         image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
//         location: "Parque Chingaza"
//       }
//     ],
//     lodgingCount: 2,
//     transport: [
//       {
//         type: "bus",
//         from: "Bogotá",
//         to: "Villa de Leyva",
//         date: "2025-08-15",
//         price: 25,
//         currency: "USD",
//         duration: "3h",
//         company: "Flota Boyacá"
//       }
//     ],
//     transportSummary: [
//       { mode: "bus", count: 1 }
//     ],
//     experiences: [
//       {
//         name: "Trekking Laguna de Guatavita",
//         type: "Senderismo",
//         date: "2025-08-18",
//         price: 45,
//         currency: "USD",
//         duration: "6h",
//         location: "Guatavita",
//         image: "https://images.unsplash.com/photo-1544966503-7cc5ac882400?w=400&h=300&fit=crop",
//         rating: 4.9
//       }
//     ],
//     experienceCount: 1,
//     highlights: ["Laguna de Guatavita", "Parque Chingaza", "Villa de Leyva colonial"],
//     tags: ["aventura", "montaña", "naturaleza", "fotografía"],
//     notes: "Recordar llevar ropa térmica y cámara con baterías extra",
//     rating: 4.8,
//     reviewCount: 0,
//     createdAt: "2025-07-01",
//     updatedAt: "2025-07-10",
//     difficulty: "moderate",
//     physicalDemand: "moderate",
//     badges: ["adventure", "eco-friendly"]
//   },
//   {
//     id: "pit-002",
//     title: "Ruta Gastronómica Caribe",
//     description: "Descubrimiento culinario por la costa atlántica colombiana",
//     coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
//     startDate: "2025-09-05",
//     endDate: "2025-09-12",
//     duration: "7 días",
//     destinations: ["Cartagena", "Santa Marta", "Barranquilla"],
//     cities: ["Cartagena", "Santa Marta", "Barranquilla"],
//     totalBudget: 980,
//     currency: "USD",
//     price: "$980 USD",
//     creator: {
//       id: "user-002",
//       name: "Ana Torres",
//       userName: "ana_gastronoma",
//       avatarUrl: "https://i.pravatar.cc/150?img=35"
//     },
//     collaborators: [
//       {
//         id: "col-002",
//         name: "Carlos Méndez",
//         userName: "carlos_mendez",
//         avatarUrl: "https://i.pravatar.cc/150?img=18"
//       },
//       {
//         id: "col-003",
//         name: "Ana Torres Food",
//         userName: "ana_torres_food",
//         avatarUrl: "https://i.pravatar.cc/150?img=42"
//       }
//     ],
//     participants: [
//       {
//         id: "user-002",
//         name: "Ana Torres",
//         userName: "ana_gastronoma",
//         avatarUrl: "https://i.pravatar.cc/150?img=35",
//         role: "creator",
//         permissions: ["view", "edit", "invite", "manage_budget"]
//       },
//       {
//         id: "col-002",
//         name: "Carlos Méndez",
//         userName: "carlos_mendez",
//         avatarUrl: "https://i.pravatar.cc/150?img=18",
//         role: "collaborator",
//         permissions: ["view", "edit"]
//       },
//       {
//         id: "col-003",
//         name: "Ana Torres Food",
//         userName: "ana_torres_food",
//         avatarUrl: "https://i.pravatar.cc/150?img=42",
//         role: "collaborator",
//         permissions: ["view", "edit"]
//       }
//     ],
//     maxParticipants: 12,
//     availableSpots: 9,
//     totalSpots: 12,
//     status: "draft",
//     visibility: "shared",
//     isShared: true,
//     shareCode: "CARIBE2024",
//     accommodations: [
//       {
//         name: "Hotel Histórico Cartagena",
//         type: "hotel",
//         rating: 4.7,
//         pricePerNight: 120,
//         currency: "USD",
//         nights: 4,
//         image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
//         location: "Centro Histórico, Cartagena"
//       }
//     ],
//     lodgingCount: 1,
//     transport: [
//       {
//         type: "flight",
//         from: "Santo Domingo",
//         to: "Cartagena",
//         date: "2025-09-05",
//         price: 285,
//         currency: "USD",
//         duration: "2h 30min",
//         company: "Avianca"
//       }
//     ],
//     transportSummary: [
//       { mode: "flight", count: 1 }
//     ],
//     experiences: [
//       {
//         name: "Tour Gastronómico Centro Histórico",
//         type: "Gastronomía",
//         date: "2025-09-06",
//         price: 75,
//         currency: "USD",
//         duration: "4h",
//         location: "Cartagena",
//         image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
//         rating: 4.8
//       },
//       {
//         name: "Clase de Cocina Criolla",
//         type: "Gastronomía",
//         date: "2025-09-08",
//         price: 95,
//         currency: "USD",
//         duration: "5h",
//         location: "Santa Marta",
//         image: "https://images.unsplash.com/photo-1556908114-f6e7ad7d3136?w=400&h=300&fit=crop",
//         rating: 4.9
//       }
//     ],
//     experienceCount: 2,
//     highlights: ["Centro Histórico Cartagena", "Cocina criolla auténtica", "Maridajes caribeños"],
//     tags: ["gastronomía", "cultura", "playa", "historia"],
//     rating: 4.7,
//     reviewCount: 3,
//     createdAt: "2025-06-20",
//     updatedAt: "2025-07-12",
//     difficulty: "easy",
//     physicalDemand: "low",
//     badges: ["family-friendly"]
//   }
// ];

// // Opciones de filtros centralizadas para "Mis Itinerarios"
// export const myItinerariesFilterOptions = {
//   status: [
//     { value: "draft", label: "Borrador", count: 3, icon: <FileText className="w-4 h-4" /> },
//     { value: "active", label: "Activo", count: 4, icon: <Play className="w-4 h-4" /> },
//     { value: "done", label: "Completado", count: 3, icon: <CheckCircle className="w-4 h-4" /> },
//     { value: "canceled", label: "Cancelado", count: 1, icon: <XCircle className="w-4 h-4" /> }
//   ],

//   visibility: [
//     { value: "private", label: "Privado", count: 5 },
//     { value: "shared", label: "Compartido", count: 3 },
//     { value: "public", label: "Público", count: 3 }
//   ] as CheckboxOption[],

//   duration: [
//     { value: "short", label: "Corto (1-5 días)", count: 4, icon: <Clock className="w-4 h-4" /> },
//     { value: "medium", label: "Medio (6-10 días)", count: 6, icon: <Clock className="w-4 h-4" /> },
//     { value: "long", label: "Largo (11+ días)", count: 1, icon: <Clock className="w-4 h-4" /> }
//   ],

//   budget: [
//     { value: "budget", label: "Económico (<$800)", count: 4 },
//     { value: "mid-range", label: "Medio ($800-$1,200)", count: 5 },
//     { value: "premium", label: "Premium ($1,200+)", count: 2 }
//   ] as CheckboxOption[],

//   tags: [
//     { value: "naturaleza", label: "Naturaleza", count: 7 },
//     { value: "aventura", label: "Aventura", count: 6 },
//     { value: "cultura", label: "Cultura", count: 5 },
//     { value: "fotografía", label: "Fotografía", count: 4 },
//     { value: "historia", label: "Historia", count: 4 },
//     { value: "gastronomía", label: "Gastronomía", count: 2 },
//     { value: "playa", label: "Playa", count: 2 },
//     { value: "montaña", label: "Montaña", count: 1 },
//     { value: "colonial", label: "Colonial", count: 2 },
//     { value: "trekking", label: "Trekking", count: 2 }
//   ] as CheckboxOption[],

//   shared: [
//     { value: "shared", label: "Compartidos", count: 6 },
//     { value: "not-shared", label: "No compartidos", count: 5 }
//   ] as CheckboxOption[],

//   rating: [
//     { value: "excellent", label: "Excelente (4.5+)", count: 5 },
//     { value: "good", label: "Bueno (4.0-4.4)", count: 3 },
//     { value: "average", label: "Regular (3.5-3.9)", count: 1 },
//     { value: "no-rating", label: "Sin calificación", count: 2 }
//   ] as CheckboxOption[]
// };

// // Opciones de ordenamiento para "Mis Itinerarios"
// export const myItinerariesSortOptions = [
//   { key: "updated-desc", label: "Recién actualizados" },
//   { key: "created-desc", label: "Recién creados" },
//   { key: "start-date-asc", label: "Próximos viajes" },
//   { key: "start-date-desc", label: "Viajes lejanos" },
//   { key: "budget-asc", label: "Menor presupuesto" },
//   { key: "budget-desc", label: "Mayor presupuesto" },
//   { key: "rating-desc", label: "Mejor calificados" },
//   { key: "title-asc", label: "Título A-Z" }
// ];

// // Función helper para filtrar itinerarios
// export const filterMyItineraries = (
//   itineraries: DataItinerary[],
//   filters: Record<string, any>
// ): DataItinerary[] => {
//   return itineraries.filter(itinerary => {
//     // Filtro por estado
//     if (filters.status?.length > 0 && !filters.status.includes(itinerary.status)) {
//       return false;
//     }

//     // Filtro por visibilidad
//     if (filters.visibility?.length > 0 && !filters.visibility.includes(itinerary.visibility)) {
//       return false;
//     }

//     // Filtro por duración
//     if (filters.duration?.length > 0) {
//       const days = parseInt(itinerary.duration);
//       const durationCategory = days <= 5 ? 'short' : days <= 10 ? 'medium' : 'long';
//       if (!filters.duration.includes(durationCategory)) {
//         return false;
//       }
//     }

//     // Filtro por presupuesto
//     if (filters.budget?.length > 0) {
//       const budgetCategory = itinerary.totalBudget < 800 ? 'budget' : 
//                            itinerary.totalBudget <= 1200 ? 'mid-range' : 'premium';
//       if (!filters.budget.includes(budgetCategory)) {
//         return false;
//       }
//     }

//     // Filtro por tags
//     if (filters.tags?.length > 0) {
//       const hasMatchingTag = filters.tags.some((tag: string) => 
//         itinerary.tags.includes(tag)
//       );
//       if (!hasMatchingTag) {
//         return false;
//       }
//     }

//     // Filtro por compartido
//     if (filters.shared?.length > 0) {
//       const isShared = itinerary.isShared;
//       if (filters.shared.includes('shared') && !isShared) {
//         return false;
//       }
//       if (filters.shared.includes('not-shared') && isShared) {
//         return false;
//       }
//     }

//     // Filtro por rating
//     if (filters.rating?.length > 0) {
//       const rating = itinerary.rating;
//       let ratingCategory = 'no-rating';
//       if (rating) {
//         if (rating >= 4.5) ratingCategory = 'excellent';
//         else if (rating >= 4.0) ratingCategory = 'good';
//         else if (rating >= 3.5) ratingCategory = 'average';
//       }
//       if (!filters.rating.includes(ratingCategory)) {
//         return false;
//       }
//     }

//     return true;
//   });
// };

// // Función helper para ordenar itinerarios
// export const sortMyItineraries = (
//   itineraries: DataItinerary[],
//   sortBy: string
// ): DataItinerary[] => {
//   const sorted = [...itineraries];
  
//   switch (sortBy) {
//     case 'updated-desc':
//       return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
//     case 'created-desc':
//       return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//     case 'start-date-asc':
//       return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
//     case 'start-date-desc':
//       return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
//     case 'budget-asc':
//       return sorted.sort((a, b) => a.totalBudget - b.totalBudget);
//     case 'budget-desc':
//       return sorted.sort((a, b) => b.totalBudget - a.totalBudget);
//     case 'rating-desc':
//       return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//     case 'title-asc':
//       return sorted.sort((a, b) => a.title.localeCompare(b.title));
//     default:
//       return sorted;
//   }
// };
