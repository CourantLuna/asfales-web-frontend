'use client';

import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { Clock, MapPin, Users, Calendar, Star, DollarSign, FileText, Play, CheckCircle, XCircle } from 'lucide-react';

// Tipos para itinerarios privados
export interface ItineraryAccommodation {
  id?: string;
  name: string;
  type: 'hotel' | 'apartment' | 'house' | 'resort';
  rating: number;
  pricePerNight: number;
  currency: string;
  nights: number;
  image: string;
  location: string;
  bookingUrl?: string;
  amenities?: string[];
}

export interface ItineraryTransport {
  id?: string;
  type: 'flight' | 'bus' | 'cruise' | 'train' | 'car';
  from: string;
  to: string;
  date: string;
  price: number;
  currency: string;
  duration?: string;
  company?: string;
  bookingReference?: string;
}

export interface ItineraryExperience {
  id?: string;
  name: string;
  type: string;
  date: string;
  price: number;
  currency: string;
  duration: string;
  location: string;
  image: string;
  rating?: number;
  description?: string;
  bookingUrl?: string;
  included?: boolean;
}

export interface ItineraryUser {
  id: string;
  name: string;
  userName?: string;
  avatarUrl: string;
  role?: 'creator' | 'collaborator' | 'participant';
  joinedAt?: string;
  permissions?: ('view' | 'edit' | 'invite' | 'manage_budget')[];
}

// Estructura unificada principal
export interface DataItinerary {
  // Identificación básica
  id: string;
  title: string;
  description?: string; // Opcional para itinerarios públicos básicos
  coverImage: string;
  
  // Fechas y duración
  startDate: string;
  endDate: string;
  duration: string;
  
  // Ubicaciones (unificado)
  destinations: string[]; // Más específico que cities
  cities?: string[]; // Backward compatibility para ItineraryPackage
  
  // Presupuesto y precios (unificado)
  totalBudget: number; // Ahora requerido
  currency: string;
  price?: string; // Precio mostrado al público (puede ser estimado)
  originalPrice?: string; // Precio original si hay descuento
  discount?: number; // Porcentaje de descuento
  isPriceEstimated?: boolean;
  
  // Creador (unificado y expandido)
  creator: ItineraryUser;
  creatorBio?: string;
  
  // Colaboradores y participantes (unificado)
  collaborators: ItineraryUser[]; // Usuarios con permisos de edición
  participants: ItineraryUser[]; 
  maxParticipants?: number;
  availableSpots?: number;
  totalSpots?: number;
  
  // Estado y visibilidad
  status: 'draft' | 'active' | 'done' | 'canceled';
  visibility: 'private' | 'shared' | 'public';
  isShared: boolean;
  shareCode?: string;
  
  // Contenido detallado
  accommodations: ItineraryAccommodation[];
  lodgingCount?: number; // Calculado automáticamente
  transport: ItineraryTransport[];
  transportSummary?: Array<{
    mode: 'flight' | 'bus' | 'cruise' | 'train' | 'car';
    count: number;
  }>; // Calculado automáticamente
  experiences: ItineraryExperience[];
  experienceCount?: number; // Calculado automáticamente
  
  // Metadatos y organización
  highlights?: string[];
  tags: string[];
  notes?: string;
  
  // Ratings y reviews
  rating?: number;
  reviewCount?: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  
  // Campos adicionales para funcionalidades avanzadas
  weather?: {
    season: 'spring' | 'summer' | 'fall' | 'winter';
    averageTemp?: number;
    rainyDays?: number;
  };
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'expert';
  ageRecommendation?: {
    min?: number;
    max?: number;
  };
  physicalDemand?: 'low' | 'moderate' | 'high' | 'extreme';
  languages?: string[];
  includedServices?: string[];
  notIncludedServices?: string[];
  cancellationPolicy?: string;
  
  // SEO y marketing
  slug?: string;
  metaDescription?: string;
  featured?: boolean;
  badges?: ('bestseller' | 'new' | 'eco-friendly' | 'family-friendly' | 'adventure' | 'luxury')[];
}

// Mock data de itinerarios privados (al menos 9)
export const myPrivateItineraries: DataItinerary[] = [
  {
    id: "pit-001",
    title: "Aventura en los Andes Colombianos",
    description: "Expedición de montañismo y senderismo en la Cordillera Oriental",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    startDate: "2025-08-15",
    endDate: "2025-08-25",
    duration: "10 días",
    destinations: ["Bogotá", "Villa de Leyva", "Chingaza", "Guatavita"],
    cities: ["Bogotá", "Villa de Leyva", "Chingaza", "Guatavita"],
    totalBudget: 1250,
    currency: "USD",
    price: "$1,250 USD",
    creator: {
      id: "user-001",
      name: "Juan Carlos Pérez",
      userName: "juancarlos_travel",
      avatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    collaborators: [
      {
        id: "col-001",
        name: "María Rodríguez",
        userName: "maria_rodriguez",
        avatarUrl: "https://i.pravatar.cc/150?img=25"
      }
    ],
    participants: [
      {
        id: "user-001",
        name: "Juan Carlos Pérez",
        userName: "juancarlos_travel",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-001",
        name: "María Rodríguez",
        userName: "maria_rodriguez",
        avatarUrl: "https://i.pravatar.cc/150?img=25",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 8,
    availableSpots: 6,
    totalSpots: 8,
    status: "active",
    visibility: "private",
    isShared: false,
    accommodations: [
      {
        name: "Hotel Boutique Casa Colonial",
        type: "hotel",
        rating: 4.5,
        pricePerNight: 85,
        currency: "USD",
        nights: 3,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        location: "Villa de Leyva"
      },
      {
        name: "Cabaña Montañera Chingaza",
        type: "apartment",
        rating: 4.2,
        pricePerNight: 65,
        currency: "USD",
        nights: 2,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        location: "Parque Chingaza"
      }
    ],
    lodgingCount: 2,
    transport: [
      {
        type: "bus",
        from: "Bogotá",
        to: "Villa de Leyva",
        date: "2025-08-15",
        price: 25,
        currency: "USD",
        duration: "3h",
        company: "Flota Boyacá"
      }
    ],
    transportSummary: [
      { mode: "bus", count: 1 }
    ],
    experiences: [
      {
        name: "Trekking Laguna de Guatavita",
        type: "Senderismo",
        date: "2025-08-18",
        price: 45,
        currency: "USD",
        duration: "6h",
        location: "Guatavita",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882400?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    experienceCount: 1,
    highlights: ["Laguna de Guatavita", "Parque Chingaza", "Villa de Leyva colonial"],
    tags: ["aventura", "montaña", "naturaleza", "fotografía"],
    notes: "Recordar llevar ropa térmica y cámara con baterías extra",
    rating: 4.8,
    reviewCount: 0,
    createdAt: "2025-07-01",
    updatedAt: "2025-07-10",
    difficulty: "moderate",
    physicalDemand: "moderate",
    badges: ["adventure", "eco-friendly"]
  },
  {
    id: "pit-002",
    title: "Ruta Gastronómica Caribe",
    description: "Descubrimiento culinario por la costa atlántica colombiana",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    startDate: "2025-09-05",
    endDate: "2025-09-12",
    duration: "7 días",
    destinations: ["Cartagena", "Santa Marta", "Barranquilla"],
    cities: ["Cartagena", "Santa Marta", "Barranquilla"],
    totalBudget: 980,
    currency: "USD",
    price: "$980 USD",
    creator: {
      id: "user-002",
      name: "Ana Torres",
      userName: "ana_gastronoma",
      avatarUrl: "https://i.pravatar.cc/150?img=35"
    },
    collaborators: [
      {
        id: "col-002",
        name: "Carlos Méndez",
        userName: "carlos_mendez",
        avatarUrl: "https://i.pravatar.cc/150?img=18"
      },
      {
        id: "col-003",
        name: "Ana Torres Food",
        userName: "ana_torres_food",
        avatarUrl: "https://i.pravatar.cc/150?img=42"
      }
    ],
    participants: [
      {
        id: "user-002",
        name: "Ana Torres",
        userName: "ana_gastronoma",
        avatarUrl: "https://i.pravatar.cc/150?img=35",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-002",
        name: "Carlos Méndez",
        userName: "carlos_mendez",
        avatarUrl: "https://i.pravatar.cc/150?img=18",
        role: "collaborator",
        permissions: ["view", "edit"]
      },
      {
        id: "col-003",
        name: "Ana Torres Food",
        userName: "ana_torres_food",
        avatarUrl: "https://i.pravatar.cc/150?img=42",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 12,
    availableSpots: 9,
    totalSpots: 12,
    status: "draft",
    visibility: "shared",
    isShared: true,
    shareCode: "CARIBE2024",
    accommodations: [
      {
        name: "Hotel Histórico Cartagena",
        type: "hotel",
        rating: 4.7,
        pricePerNight: 120,
        currency: "USD",
        nights: 4,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        location: "Centro Histórico, Cartagena"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "flight",
        from: "Santo Domingo",
        to: "Cartagena",
        date: "2025-09-05",
        price: 285,
        currency: "USD",
        duration: "2h 30min",
        company: "Avianca"
      }
    ],
    transportSummary: [
      { mode: "flight", count: 1 }
    ],
    experiences: [
      {
        name: "Tour Gastronómico Centro Histórico",
        type: "Gastronomía",
        date: "2025-09-06",
        price: 75,
        currency: "USD",
        duration: "4h",
        location: "Cartagena",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        rating: 4.8
      },
      {
        name: "Clase de Cocina Criolla",
        type: "Gastronomía",
        date: "2025-09-08",
        price: 95,
        currency: "USD",
        duration: "5h",
        location: "Santa Marta",
        image: "https://images.unsplash.com/photo-1556908114-f6e7ad7d3136?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    experienceCount: 2,
    highlights: ["Centro Histórico Cartagena", "Cocina criolla auténtica", "Maridajes caribeños"],
    tags: ["gastronomía", "cultura", "playa", "historia"],
    rating: 4.7,
    reviewCount: 3,
    createdAt: "2025-06-20",
    updatedAt: "2025-07-12",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["family-friendly"]
  },
  {
    id: "pit-003",
    title: "Expedición Amazonas",
    description: "Inmersión en la selva amazónica colombiana y biodiversidad",
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
    startDate: "2024-10-20",
    endDate: "2024-10-30",
    duration: "10 días",
    destinations: ["Leticia", "Puerto Nariño", "Isla de los Micos"],
    cities: ["Leticia", "Puerto Nariño", "Isla de los Micos"],
    totalBudget: 1650,
    currency: "USD",
    price: "$1,650 USD",
    creator: {
      id: "user-003",
      name: "Sofia Valencia",
      userName: "sofia_amazon",
      avatarUrl: "https://i.pravatar.cc/150?img=28"
    },
    collaborators: [],
    participants: [
      {
        id: "user-003",
        name: "Sofia Valencia",
        userName: "sofia_amazon",
        avatarUrl: "https://i.pravatar.cc/150?img=28",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      }
    ],
    maxParticipants: 8,
    availableSpots: 8,
    totalSpots: 8,
    status: "done",
    visibility: "public",
    isShared: true,
    shareCode: "AMAZON2024",
    accommodations: [
      {
        name: "Ecolodge Reserva Natural",
        type: "resort",
        rating: 4.3,
        pricePerNight: 95,
        currency: "USD",
        nights: 5,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        location: "Leticia"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "cruise",
        from: "Leticia",
        to: "Puerto Nariño",
        date: "2024-10-22",
        price: 35,
        currency: "USD",
        duration: "2h",
        company: "Transportes Amazonas"
      }
    ],
    transportSummary: [
      { mode: "cruise", count: 1 }
    ],
    experiences: [
      {
        name: "Avistamiento de Delfines Rosados",
        type: "Naturaleza",
        date: "2024-10-23",
        price: 85,
        currency: "USD",
        duration: "4h",
        location: "Río Amazonas",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop",
        rating: 5.0
      }
    ],
    experienceCount: 1,
    highlights: ["Delfines rosados", "Biodiversidad amazónica", "Culturas indígenas"],
    tags: ["naturaleza", "aventura", "biodiversidad", "indígena"],
    rating: 4.9,
    reviewCount: 8,
    createdAt: "2024-05-15",
    updatedAt: "2024-11-02",
    difficulty: "moderate",
    physicalDemand: "moderate",
    badges: ["eco-friendly", "adventure"]
  },
  {
    id: "pit-004",
    title: "Café y Cultura Paisa",
    description: "Ruta del café por el Eje Cafetero y Medellín",
    coverImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
    startDate: "2024-11-10",
    endDate: "2024-11-18",
    duration: "8 días",
    destinations: ["Medellín", "Armenia", "Manizales", "Pereira"],
    cities: ["Medellín", "Armenia", "Manizales", "Pereira"],
    totalBudget: 1150,
    currency: "USD",
    price: "$1,150 USD",
    creator: {
      id: "user-004",
      name: "Luis García",
      userName: "luis_coffee",
      avatarUrl: "https://i.pravatar.cc/150?img=14"
    },
    collaborators: [
      {
        id: "col-005",
        name: "Sofia Valencia",
        userName: "sofia_valencia",
        avatarUrl: "https://i.pravatar.cc/150?img=28"
      }
    ],
    participants: [
      {
        id: "user-004",
        name: "Luis García",
        userName: "luis_coffee",
        avatarUrl: "https://i.pravatar.cc/150?img=14",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-005",
        name: "Sofia Valencia",
        userName: "sofia_valencia",
        avatarUrl: "https://i.pravatar.cc/150?img=28",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 10,
    availableSpots: 8,
    totalSpots: 10,
    status: "active",
    visibility: "private",
    isShared: false,
    accommodations: [
      {
        name: "Finca Cafetera El Paraíso",
        type: "house",
        rating: 4.6,
        pricePerNight: 78,
        currency: "USD",
        nights: 3,
        image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop",
        location: "Armenia"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "bus",
        from: "Medellín",
        to: "Armenia",
        date: "2024-11-12",
        price: 28,
        currency: "USD",
        duration: "4h",
        company: "Flota Magdalena"
      }
    ],
    transportSummary: [
      { mode: "bus", count: 1 }
    ],
    experiences: [
      {
        name: "Tour Completo Finca Cafetera",
        type: "Cultural",
        date: "2024-11-13",
        price: 55,
        currency: "USD",
        duration: "6h",
        location: "Armenia",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.7
      }
    ],
    experienceCount: 1,
    highlights: ["Proceso del café", "Paisaje Cultural Cafetero", "Cultura paisa"],
    tags: ["café", "cultura", "paisaje", "tradición"],
    rating: 4.6,
    reviewCount: 2,
    createdAt: "2024-07-08",
    updatedAt: "2024-07-15",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["family-friendly"]
  },
  {
    id: "pit-005",
    title: "Desierto de la Tatacoa",
    description: "Observación astronómica y paisajes desérticos únicos",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    startDate: "2024-12-02",
    endDate: "2024-12-06",
    duration: "4 días",
    destinations: ["Neiva", "Villavieja", "Desierto de la Tatacoa"],
    cities: ["Neiva", "Villavieja", "Desierto de la Tatacoa"],
    totalBudget: 650,
    currency: "USD",
    price: "$650 USD",
    creator: {
      id: "user-005",
      name: "Roberto Martínez",
      userName: "roberto_astro",
      avatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    collaborators: [],
    participants: [
      {
        id: "user-005",
        name: "Roberto Martínez",
        userName: "roberto_astro",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      }
    ],
    maxParticipants: 6,
    availableSpots: 6,
    totalSpots: 6,
    status: "draft",
    visibility: "private",
    isShared: false,
    accommodations: [
      {
        name: "Observatorio Astronómico Tatacoa",
        type: "apartment",
        rating: 4.1,
        pricePerNight: 45,
        currency: "USD",
        nights: 3,
        image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
        location: "Desierto de la Tatacoa"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "bus",
        from: "Bogotá",
        to: "Neiva",
        date: "2024-12-02",
        price: 35,
        currency: "USD",
        duration: "5h",
        company: "Coomotor"
      }
    ],
    transportSummary: [
      { mode: "bus", count: 1 }
    ],
    experiences: [
      {
        name: "Noche de Observación Astronómica",
        type: "Astronomía",
        date: "2024-12-03",
        price: 65,
        currency: "USD",
        duration: "4h",
        location: "Desierto de la Tatacoa",
        image: "https://images.unsplash.com/photo-1446776876599-3c75c4f3a3e5?w=400&h=300&fit=crop",
        rating: 4.8
      }
    ],
    experienceCount: 1,
    highlights: ["Observación de estrellas", "Paisaje desértico", "Silencio absoluto"],
    tags: ["astronomía", "desierto", "fotografía", "geología"],
    rating: 4.5,
    reviewCount: 1,
    createdAt: "2024-07-20",
    updatedAt: "2024-07-25",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["new"]
  },
  {
    id: "pit-006",
    title: "Pacífico Colombiano Salvaje",
    description: "Avistamiento de ballenas y biodiversidad marina",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    startDate: "2024-07-20",
    endDate: "2024-07-28",
    duration: "8 días",
    destinations: ["Buenaventura", "Bahía Málaga", "Nuquí"],
    cities: ["Buenaventura", "Bahía Málaga", "Nuquí"],
    totalBudget: 1350,
    currency: "USD",
    price: "$1,350 USD",
    creator: {
      id: "user-006",
      name: "Diego Ramírez",
      userName: "diego_marino",
      avatarUrl: "https://i.pravatar.cc/150?img=45"
    },
    collaborators: [
      {
        id: "col-006",
        name: "Carolina López",
        userName: "carolina_bio",
        avatarUrl: "https://i.pravatar.cc/150?img=38"
      }
    ],
    participants: [
      {
        id: "user-006",
        name: "Diego Ramírez",
        userName: "diego_marino",
        avatarUrl: "https://i.pravatar.cc/150?img=45",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-006",
        name: "Carolina López",
        userName: "carolina_bio",
        avatarUrl: "https://i.pravatar.cc/150?img=38",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 8,
    availableSpots: 6,
    totalSpots: 8,
    status: "done",
    visibility: "shared",
    isShared: true,
    shareCode: "PACIFICO2024",
    accommodations: [
      {
        name: "Ecolodge Pacífico",
        type: "resort",
        rating: 4.4,
        pricePerNight: 110,
        currency: "USD",
        nights: 4,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
        location: "Nuquí"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "cruise",
        from: "Buenaventura",
        to: "Nuquí",
        date: "2024-07-21",
        price: 85,
        currency: "USD",
        duration: "3h",
        company: "Transportes Pacífico"
      }
    ],
    transportSummary: [
      { mode: "cruise", count: 1 }
    ],
    experiences: [
      {
        name: "Avistamiento de Ballenas Jorobadas",
        type: "Naturaleza",
        date: "2024-07-23",
        price: 125,
        currency: "USD",
        duration: "6h",
        location: "Bahía Málaga",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    experienceCount: 1,
    highlights: ["Ballenas jorobadas", "Biodiversidad marina", "Playas vírgenes"],
    tags: ["ballenas", "biodiversidad", "playa", "naturaleza"],
    rating: 4.6,
    reviewCount: 5,
    createdAt: "2024-05-10",
    updatedAt: "2024-07-30",
    difficulty: "moderate",
    physicalDemand: "moderate",
    badges: ["eco-friendly", "adventure"]
  },
  {
    id: "pit-007",
    title: "Ciudad Perdida Trek",
    description: "Caminata ancestral a la Ciudad Perdida de los Tayronas",
    coverImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882400?w=800&h=600&fit=crop",
    startDate: "2025-01-15",
    endDate: "2025-01-21",
    duration: "6 días",
    destinations: ["Santa Marta", "Machete Pelao", "Ciudad Perdida"],
    cities: ["Santa Marta", "Machete Pelao", "Ciudad Perdida"],
    totalBudget: 850,
    currency: "USD",
    price: "$850 USD",
    creator: {
      id: "user-007",
      name: "Laura Gutiérrez",
      userName: "laura_trek",
      avatarUrl: "https://i.pravatar.cc/150?img=52"
    },
    collaborators: [
      {
        id: "col-007",
        name: "Andrés López",
        userName: "andres_history",
        avatarUrl: "https://i.pravatar.cc/150?img=61"
      },
      {
        id: "col-008",
        name: "Patricia Morales",
        userName: "patricia_guide",
        avatarUrl: "https://i.pravatar.cc/150?img=29"
      }
    ],
    participants: [
      {
        id: "user-007",
        name: "Laura Gutiérrez",
        userName: "laura_trek",
        avatarUrl: "https://i.pravatar.cc/150?img=52",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-007",
        name: "Andrés López",
        userName: "andres_history",
        avatarUrl: "https://i.pravatar.cc/150?img=61",
        role: "collaborator",
        permissions: ["view", "edit"]
      },
      {
        id: "col-008",
        name: "Patricia Morales",
        userName: "patricia_guide",
        avatarUrl: "https://i.pravatar.cc/150?img=29",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 12,
    availableSpots: 9,
    totalSpots: 12,
    status: "active",
    visibility: "public",
    isShared: true,
    shareCode: "TEYUNA2025",
    accommodations: [
      {
        name: "Campamento Base Trekking",
        type: "apartment",
        rating: 4.0,
        pricePerNight: 25,
        currency: "USD",
        nights: 4,
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
        location: "Ruta Ciudad Perdida"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "train",
        from: "Santa Marta",
        to: "Machete Pelao",
        date: "2025-01-15",
        price: 45,
        currency: "USD",
        duration: "2h",
        company: "Tours Ciudad Perdida"
      }
    ],
    transportSummary: [
      { mode: "train", count: 1 }
    ],
    experiences: [
      {
        name: "Trekking Completo Ciudad Perdida",
        type: "Trekking",
        date: "2025-01-16",
        price: 385,
        currency: "USD",
        duration: "4 días",
        location: "Sierra Nevada",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        rating: 4.8
      }
    ],
    experienceCount: 1,
    highlights: ["Ciudad Perdida", "Cultura Tayrona", "Sierra Nevada"],
    tags: ["trekking", "arqueología", "aventura", "historia"],
    rating: 4.8,
    reviewCount: 12,
    createdAt: "2024-08-01",
    updatedAt: "2024-08-05",
    difficulty: "challenging",
    physicalDemand: "high",
    badges: ["adventure", "bestseller"]
  },
  {
    id: "pit-008",
    title: "Caño Cristales Maravilla",
    description: "El río más hermoso del mundo en temporada de colores",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    startDate: "2024-09-25",
    endDate: "2024-09-29",
    duration: "4 días",
    destinations: ["Villavicencio", "La Macarena", "Caño Cristales"],
    cities: ["Villavicencio", "La Macarena", "Caño Cristales"],
    totalBudget: 750,
    currency: "USD",
    price: "$750 USD",
    creator: {
      id: "user-008",
      name: "Miguel Santos",
      userName: "miguel_nature",
      avatarUrl: "https://i.pravatar.cc/150?img=67"
    },
    collaborators: [],
    participants: [
      {
        id: "user-008",
        name: "Miguel Santos",
        userName: "miguel_nature",
        avatarUrl: "https://i.pravatar.cc/150?img=67",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      }
    ],
    maxParticipants: 8,
    availableSpots: 8,
    totalSpots: 8,
    status: "done",
    visibility: "private",
    isShared: false,
    accommodations: [
      {
        name: "Hotel Campestre La Macarena",
        type: "hotel",
        rating: 3.9,
        pricePerNight: 65,
        currency: "USD",
        nights: 3,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        location: "La Macarena"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "flight",
        from: "Bogotá",
        to: "Villavicencio",
        date: "2024-09-25",
        price: 85,
        currency: "USD",
        duration: "45min",
        company: "Satena"
      }
    ],
    transportSummary: [
      { mode: "flight", count: 1 }
    ],
    experiences: [
      {
        name: "Tour Caño Cristales Completo",
        type: "Naturaleza",
        date: "2024-09-26",
        price: 185,
        currency: "USD",
        duration: "8h",
        location: "Caño Cristales",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    experienceCount: 1,
    highlights: ["Río de cinco colores", "Macarenia clavigera", "Paisajes únicos"],
    tags: ["naturaleza", "río", "colores", "fotografía"],
    rating: 4.7,
    reviewCount: 4,
    createdAt: "2024-06-10",
    updatedAt: "2024-10-02",
    difficulty: "moderate",
    physicalDemand: "moderate",
    badges: ["eco-friendly"]
  },
  {
    id: "pit-009",
    title: "Ruta Colonial Boyacá",
    description: "Pueblos coloniales y tradiciones ancestrales boyacenses",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    startDate: "2025-02-10",
    endDate: "2025-02-16",
    duration: "6 días",
    destinations: ["Tunja", "Villa de Leyva", "Ráquira", "Monguí"],
    cities: ["Tunja", "Villa de Leyva", "Ráquira", "Monguí"],
    totalBudget: 680,
    currency: "USD",
    price: "$680 USD",
    creator: {
      id: "user-009",
      name: "Patricia Morales",
      userName: "patricia_colonial",
      avatarUrl: "https://i.pravatar.cc/150?img=71"
    },
    collaborators: [
      {
        id: "col-009",
        name: "Fernando Castro",
        userName: "fernando_artisan",
        avatarUrl: "https://i.pravatar.cc/150?img=58"
      }
    ],
    participants: [
      {
        id: "user-009",
        name: "Patricia Morales",
        userName: "patricia_colonial",
        avatarUrl: "https://i.pravatar.cc/150?img=71",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-009",
        name: "Fernando Castro",
        userName: "fernando_artisan",
        avatarUrl: "https://i.pravatar.cc/150?img=58",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 10,
    availableSpots: 8,
    totalSpots: 10,
    status: "draft",
    visibility: "shared",
    isShared: true,
    shareCode: "BOYACA2025",
    accommodations: [
      {
        name: "Posada Colonial Villa de Leyva",
        type: "house",
        rating: 4.5,
        pricePerNight: 72,
        currency: "USD",
        nights: 3,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        location: "Villa de Leyva"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "bus",
        from: "Bogotá",
        to: "Tunja",
        date: "2025-02-10",
        price: 18,
        currency: "USD",
        duration: "2h 30min",
        company: "Libertadores"
      }
    ],
    transportSummary: [
      { mode: "bus", count: 1 }
    ],
    experiences: [
      {
        name: "Taller de Cerámica en Ráquira",
        type: "Artesanías",
        date: "2025-02-12",
        price: 45,
        currency: "USD",
        duration: "3h",
        location: "Ráquira",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        rating: 4.6
      }
    ],
    experienceCount: 1,
    highlights: ["Pueblos coloniales", "Artesanías tradicionales", "Historia boyacense"],
    tags: ["colonial", "artesanías", "cultura", "historia"],
    rating: 4.3,
    reviewCount: 7,
    createdAt: "2024-08-10",
    updatedAt: "2024-08-12",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["family-friendly"]
  },
  {
    id: "pit-010",
    title: "Escapada Romántica Villa de Leyva",
    description: "Fin de semana romántico en el pueblo más hermoso de Colombia",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    startDate: "2025-03-14",
    endDate: "2025-03-16",
    duration: "3 días",
    destinations: ["Villa de Leyva", "Ráquira"],
    cities: ["Villa de Leyva", "Ráquira"],
    totalBudget: 420,
    currency: "USD",
    price: "$420 USD",
    creator: {
      id: "user-010",
      name: "Carlos Méndez",
      userName: "carlos_romantic",
      avatarUrl: "https://i.pravatar.cc/150?img=43"
    },
    collaborators: [],
    participants: [
      {
        id: "user-010",
        name: "Carlos Méndez",
        userName: "carlos_romantic",
        avatarUrl: "https://i.pravatar.cc/150?img=43",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      }
    ],
    maxParticipants: 2,
    availableSpots: 2,
    totalSpots: 2,
    status: "canceled",
    visibility: "private",
    isShared: false,
    accommodations: [
      {
        name: "Hotel Boutique Romántico",
        type: "hotel",
        rating: 4.8,
        pricePerNight: 95,
        currency: "USD",
        nights: 2,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        location: "Villa de Leyva"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "bus",
        from: "Bogotá",
        to: "Villa de Leyva",
        date: "2025-03-14",
        price: 22,
        currency: "USD",
        duration: "3h",
        company: "Flota Boyacá"
      }
    ],
    transportSummary: [
      { mode: "bus", count: 1 }
    ],
    experiences: [
      {
        name: "Cena Romántica con Vista",
        type: "Gastronómico",
        date: "2025-03-14",
        price: 85,
        currency: "USD",
        duration: "2h",
        location: "Villa de Leyva",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        rating: 4.5
      }
    ],
    experienceCount: 1,
    highlights: ["Plaza principal", "Cena romántica", "Arquitectura colonial"],
    tags: ["romántico", "colonial", "relajación", "fin de semana"],
    rating: 0,
    reviewCount: 0,
    createdAt: "2024-08-15",
    updatedAt: "2024-08-20",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["luxury"]
  },
  {
    id: "pit-011",
    title: "Safari Fotográfico Los Llanos",
    description: "Captura la fauna y flora de los llanos orientales colombianos",
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
    startDate: "2025-04-10",
    endDate: "2025-04-15",
    duration: "5 días",
    destinations: ["Villavicencio", "Yopal", "Hato La Aurora"],
    cities: ["Villavicencio", "Yopal", "Hato La Aurora"],
    totalBudget: 890,
    currency: "USD",
    price: "$890 USD",
    creator: {
      id: "user-011",
      name: "Gabriel Ruiz",
      userName: "gabriel_photo",
      avatarUrl: "https://i.pravatar.cc/150?img=76"
    },
    collaborators: [
      {
        id: "col-010",
        name: "Elena Vargas",
        userName: "elena_photographer",
        avatarUrl: "https://i.pravatar.cc/150?img=84"
      },
      {
        id: "col-011",
        name: "Ricardo Silva",
        userName: "ricardo_naturalist",
        avatarUrl: "https://i.pravatar.cc/150?img=91"
      }
    ],
    participants: [
      {
        id: "user-011",
        name: "Gabriel Ruiz",
        userName: "gabriel_photo",
        avatarUrl: "https://i.pravatar.cc/150?img=76",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-010",
        name: "Elena Vargas",
        userName: "elena_photographer",
        avatarUrl: "https://i.pravatar.cc/150?img=84",
        role: "collaborator",
        permissions: ["view", "edit"]
      },
      {
        id: "col-011",
        name: "Ricardo Silva",
        userName: "ricardo_naturalist",
        avatarUrl: "https://i.pravatar.cc/150?img=91",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 8,
    availableSpots: 5,
    totalSpots: 8,
    status: "active",
    visibility: "public",
    isShared: true,
    shareCode: "LLANOS2025",
    accommodations: [
      {
        name: "Hato Ecoturístico La Aurora",
        type: "resort",
        rating: 4.3,
        pricePerNight: 120,
        currency: "USD",
        nights: 4,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        location: "Los Llanos"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "flight",
        from: "Bogotá",
        to: "Yopal",
        date: "2025-04-10",
        price: 95,
        currency: "USD",
        duration: "1h",
        company: "Satena"
      }
    ],
    transportSummary: [
      { mode: "flight", count: 1 }
    ],
    experiences: [
      {
        name: "Safari Fotográfico Amanecer",
        type: "Fotografía",
        date: "2025-04-11",
        price: 145,
        currency: "USD",
        duration: "6h",
        location: "Hato La Aurora",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    experienceCount: 1,
    highlights: ["Fauna llanera", "Amanecer en sabana", "Fotografía de naturaleza"],
    tags: ["fotografía", "safari", "naturaleza", "fauna"],
    rating: 4.8,
    reviewCount: 6,
    createdAt: "2024-08-25",
    updatedAt: "2024-09-01",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["eco-friendly", "bestseller"]
  },
  {
    id: "pit-012",
    title: "Isla de San Andrés Paraíso",
    description: "Aguas cristalinas y cultura raizal en el Caribe colombiano",
    coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    startDate: "2025-05-20",
    endDate: "2025-05-27",
    duration: "7 días",
    destinations: ["San Andrés", "Providencia", "Johnny Cay"],
    cities: ["San Andrés", "Providencia", "Johnny Cay"],
    totalBudget: 1580,
    currency: "USD",
    price: "$1,580 USD",
    creator: {
      id: "user-012",
      name: "Valentina Moreno",
      userName: "valentina_caribe",
      avatarUrl: "https://i.pravatar.cc/150?img=88"
    },
    collaborators: [
      {
        id: "col-012",
        name: "Sebastián Torres",
        userName: "sebastian_diving",
        avatarUrl: "https://i.pravatar.cc/150?img=95"
      }
    ],
    participants: [
      {
        id: "user-012",
        name: "Valentina Moreno",
        userName: "valentina_caribe",
        avatarUrl: "https://i.pravatar.cc/150?img=88",
        role: "creator",
        permissions: ["view", "edit", "invite", "manage_budget"]
      },
      {
        id: "col-012",
        name: "Sebastián Torres",
        userName: "sebastian_diving",
        avatarUrl: "https://i.pravatar.cc/150?img=95",
        role: "collaborator",
        permissions: ["view", "edit"]
      }
    ],
    maxParticipants: 6,
    availableSpots: 4,
    totalSpots: 6,
    status: "active",
    visibility: "shared",
    isShared: true,
    shareCode: "SANANDRES2025",
    accommodations: [
      {
        name: "Resort Decamerón San Andrés",
        type: "resort",
        rating: 4.6,
        pricePerNight: 180,
        currency: "USD",
        nights: 6,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        location: "San Andrés"
      }
    ],
    lodgingCount: 1,
    transport: [
      {
        type: "flight",
        from: "Bogotá",
        to: "San Andrés",
        date: "2025-05-20",
        price: 320,
        currency: "USD",
        duration: "2h 15min",
        company: "Avianca"
      }
    ],
    transportSummary: [
      { mode: "flight", count: 1 }
    ],
    experiences: [
      {
        name: "Buceo en Barrera de Coral",
        type: "Acuático",
        date: "2025-05-22",
        price: 95,
        currency: "USD",
        duration: "4h",
        location: "San Andrés",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        rating: 4.8
      },
      {
        name: "Tour Johnny Cay y Acuario",
        type: "Acuático",
        date: "2025-05-24",
        price: 65,
        currency: "USD",
        duration: "6h",
        location: "Johnny Cay",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        rating: 4.7
      }
    ],
    experienceCount: 2,
    highlights: ["Mar de siete colores", "Cultura raizal", "Buceo en arrecife"],
    tags: ["playa", "buceo", "caribe", "cultura"],
    rating: 4.7,
    reviewCount: 9,
    createdAt: "2024-09-05",
    updatedAt: "2024-09-10",
    difficulty: "easy",
    physicalDemand: "low",
    badges: ["luxury", "family-friendly"]
  }
];

// Opciones de filtros centralizadas para "Mis Itinerarios"
export const myItinerariesFilterOptions = {
  status: [
    { value: "draft", label: "Borrador", count: 3, icon: <FileText className="w-4 h-4" /> },
    { value: "active", label: "Activo", count: 4, icon: <Play className="w-4 h-4" /> },
    { value: "done", label: "Completado", count: 3, icon: <CheckCircle className="w-4 h-4" /> },
    { value: "canceled", label: "Cancelado", count: 1, icon: <XCircle className="w-4 h-4" /> }
  ],

  visibility: [
    { value: "private", label: "Privado", count: 5 },
    { value: "shared", label: "Compartido", count: 3 },
    { value: "public", label: "Público", count: 3 }
  ] as CheckboxOption[],

  duration: [
    { value: "short", label: "Corto (1-5 días)", count: 4, icon: <Clock className="w-4 h-4" /> },
    { value: "medium", label: "Medio (6-10 días)", count: 6, icon: <Clock className="w-4 h-4" /> },
    { value: "long", label: "Largo (11+ días)", count: 1, icon: <Clock className="w-4 h-4" /> }
  ],

  budget: [
    { value: "budget", label: "Económico (<$800)", count: 4 },
    { value: "mid-range", label: "Medio ($800-$1,200)", count: 5 },
    { value: "premium", label: "Premium ($1,200+)", count: 2 }
  ] as CheckboxOption[],

  tags: [
    { value: "naturaleza", label: "Naturaleza", count: 7 },
    { value: "aventura", label: "Aventura", count: 6 },
    { value: "cultura", label: "Cultura", count: 5 },
    { value: "fotografía", label: "Fotografía", count: 4 },
    { value: "historia", label: "Historia", count: 4 },
    { value: "gastronomía", label: "Gastronomía", count: 2 },
    { value: "playa", label: "Playa", count: 2 },
    { value: "montaña", label: "Montaña", count: 1 },
    { value: "colonial", label: "Colonial", count: 2 },
    { value: "trekking", label: "Trekking", count: 2 }
  ] as CheckboxOption[],

  shared: [
    { value: "shared", label: "Compartidos", count: 6 },
    { value: "not-shared", label: "No compartidos", count: 5 }
  ] as CheckboxOption[],

  rating: [
    { value: "excellent", label: "Excelente (4.5+)", count: 5 },
    { value: "good", label: "Bueno (4.0-4.4)", count: 3 },
    { value: "average", label: "Regular (3.5-3.9)", count: 1 },
    { value: "no-rating", label: "Sin calificación", count: 2 }
  ] as CheckboxOption[]
};

// Opciones de ordenamiento para "Mis Itinerarios"
export const myItinerariesSortOptions = [
  { key: "updated-desc", label: "Recién actualizados" },
  { key: "created-desc", label: "Recién creados" },
  { key: "start-date-asc", label: "Próximos viajes" },
  { key: "start-date-desc", label: "Viajes lejanos" },
  { key: "budget-asc", label: "Menor presupuesto" },
  { key: "budget-desc", label: "Mayor presupuesto" },
  { key: "rating-desc", label: "Mejor calificados" },
  { key: "title-asc", label: "Título A-Z" }
];

// Función helper para filtrar itinerarios
export const filterMyItineraries = (
  itineraries: DataItinerary[],
  filters: Record<string, any>
): DataItinerary[] => {
  return itineraries.filter(itinerary => {
    // Filtro por estado
    if (filters.status?.length > 0 && !filters.status.includes(itinerary.status)) {
      return false;
    }

    // Filtro por visibilidad
    if (filters.visibility?.length > 0 && !filters.visibility.includes(itinerary.visibility)) {
      return false;
    }

    // Filtro por duración
    if (filters.duration?.length > 0) {
      const days = parseInt(itinerary.duration);
      const durationCategory = days <= 5 ? 'short' : days <= 10 ? 'medium' : 'long';
      if (!filters.duration.includes(durationCategory)) {
        return false;
      }
    }

    // Filtro por presupuesto
    if (filters.budget?.length > 0) {
      const budgetCategory = itinerary.totalBudget < 800 ? 'budget' : 
                           itinerary.totalBudget <= 1200 ? 'mid-range' : 'premium';
      if (!filters.budget.includes(budgetCategory)) {
        return false;
      }
    }

    // Filtro por tags
    if (filters.tags?.length > 0) {
      const hasMatchingTag = filters.tags.some((tag: string) => 
        itinerary.tags.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filtro por compartido
    if (filters.shared?.length > 0) {
      const isShared = itinerary.isShared;
      if (filters.shared.includes('shared') && !isShared) {
        return false;
      }
      if (filters.shared.includes('not-shared') && isShared) {
        return false;
      }
    }

    // Filtro por rating
    if (filters.rating?.length > 0) {
      const rating = itinerary.rating;
      let ratingCategory = 'no-rating';
      if (rating) {
        if (rating >= 4.5) ratingCategory = 'excellent';
        else if (rating >= 4.0) ratingCategory = 'good';
        else if (rating >= 3.5) ratingCategory = 'average';
      }
      if (!filters.rating.includes(ratingCategory)) {
        return false;
      }
    }

    return true;
  });
};

// Función helper para ordenar itinerarios
export const sortMyItineraries = (
  itineraries: DataItinerary[],
  sortBy: string
): DataItinerary[] => {
  const sorted = [...itineraries];
  
  switch (sortBy) {
    case 'updated-desc':
      return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    case 'created-desc':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'start-date-asc':
      return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    case 'start-date-desc':
      return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    case 'budget-asc':
      return sorted.sort((a, b) => a.totalBudget - b.totalBudget);
    case 'budget-desc':
      return sorted.sort((a, b) => b.totalBudget - a.totalBudget);
    case 'rating-desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};
