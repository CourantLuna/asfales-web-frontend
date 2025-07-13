'use client';

import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { Clock, MapPin, Users, Calendar, Star, DollarSign, FileText, Play, CheckCircle, XCircle } from 'lucide-react';

// Tipos para itinerarios privados
export interface ItineraryAccommodation {
  name: string;
  type: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  nights: number;
  image: string;
  location: string;
}

export interface ItineraryTransport {
  type: string;
  from: string;
  to: string;
  date: string;
  price: number;
  currency: string;
  duration?: string;
  company?: string;
}

export interface ItineraryExperience {
  name: string;
  type: string;
  date: string;
  price: number;
  currency: string;
  duration: string;
  location: string;
  image: string;
  rating?: number;
}

export interface PrivateItinerary {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  duration: string;
  destinations: string[];
  totalBudget: number;
  currency: string;
  status: 'draft' | 'active' | 'done' | 'canceled';
  visibility: 'private' | 'friends' | 'public';
  collaborators: string[];
  accommodations: ItineraryAccommodation[];
  transport: ItineraryTransport[];
  experiences: ItineraryExperience[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  isShared: boolean;
  shareCode?: string;
  tags: string[];
}

// Mock data de itinerarios privados (al menos 9)
export const myPrivateItineraries: PrivateItinerary[] = [
  {
    id: "pit-001",
    title: "Aventura en los Andes Colombianos",
    description: "Expedición de montañismo y senderismo en la Cordillera Oriental",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    startDate: "2025-08-15",
    endDate: "2025-08-25",
    duration: "10 días",
    destinations: ["Bogotá", "Villa de Leyva", "Chingaza", "Guatavita"],
    totalBudget: 1250,
    currency: "USD",
    status: "active",
    visibility: "private",
    collaborators: ["maria.rodriguez@email.com"],
    rating: 4.8,
    isShared: false,
    tags: ["aventura", "montaña", "naturaleza", "fotografía"],
    createdAt: "2025-07-01",
    updatedAt: "2025-07-10",
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
    transport: [
      {
        type: "bus",
        from: "Bogotá",
        to: "Villa de Leyva",
        date: "2024-08-15",
        price: 25,
        currency: "USD",
        duration: "3h",
        company: "Flota Boyacá"
      }
    ],
    experiences: [
      {
        name: "Trekking Laguna de Guatavita",
        type: "Senderismo",
        date: "2024-08-18",
        price: 45,
        currency: "USD",
        duration: "6h",
        location: "Guatavita",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882400?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ],
    notes: "Recordar llevar ropa térmica y cámara con baterías extra"
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
    totalBudget: 980,
    currency: "USD",
    status: "draft",
    visibility: "friends",
    collaborators: ["carlos.mendez@email.com", "ana.torres@email.com"],
    isShared: true,
    shareCode: "CARIBE2024",
    tags: ["gastronomía", "cultura", "playa", "historia"],
    createdAt: "2025-06-20",
    updatedAt: "2025-07-12",
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
    transport: [
      {
        type: "flight",
        from: "Santo Domingo",
        to: "Cartagena",
        date: "2024-09-05",
        price: 285,
        currency: "USD",
        duration: "2h 30min",
        company: "Avianca"
      }
    ],
    experiences: [
      {
        name: "Tour Gastronómico Centro Histórico",
        type: "Gastronomía",
        date: "2024-09-06",
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
        date: "2024-09-08",
        price: 95,
        currency: "USD",
        duration: "5h",
        location: "Santa Marta",
        image: "https://images.unsplash.com/photo-1556908114-f6e7ad7d3136?w=400&h=300&fit=crop",
        rating: 4.9
      }
    ]
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
    totalBudget: 1650,
    currency: "USD",
    status: "done",
    visibility: "public",
    collaborators: [],
    rating: 4.9,
    isShared: true,
    shareCode: "AMAZON2024",
    tags: ["naturaleza", "aventura", "biodiversidad", "indígena"],
    createdAt: "2024-05-15",
    updatedAt: "2024-11-02",
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
    ]
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
    totalBudget: 1150,
    currency: "USD",
    status: "active",
    visibility: "private",
    collaborators: ["sofia.valencia@email.com"],
    isShared: false,
    tags: ["café", "cultura", "paisaje", "tradición"],
    createdAt: "2024-07-08",
    updatedAt: "2024-07-15",
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
    ]
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
    totalBudget: 650,
    currency: "USD",
    status: "draft",
    visibility: "private",
    collaborators: [],
    isShared: false,
    tags: ["astronomía", "desierto", "fotografía", "geología"],
    createdAt: "2024-07-20",
    updatedAt: "2024-07-25",
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
    ]
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
    totalBudget: 1350,
    currency: "USD",
    status: "done",
    visibility: "friends",
    collaborators: ["diego.ramirez@email.com"],
    rating: 4.6,
    isShared: true,
    shareCode: "PACIFICO2024",
    tags: ["ballenas", "biodiversidad", "playa", "naturaleza"],
    createdAt: "2024-05-10",
    updatedAt: "2024-07-30",
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
    ]
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
    totalBudget: 850,
    currency: "USD",
    status: "active",
    visibility: "public",
    collaborators: ["laura.gutierrez@email.com", "andres.lopez@email.com"],
    isShared: true,
    shareCode: "TEYUNA2025",
    tags: ["trekking", "arqueología", "aventura", "historia"],
    createdAt: "2024-08-01",
    updatedAt: "2024-08-05",
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
    ]
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
    totalBudget: 750,
    currency: "USD",
    status: "done",
    visibility: "private",
    collaborators: [],
    rating: 4.7,
    isShared: false,
    tags: ["naturaleza", "río", "colores", "fotografía"],
    createdAt: "2024-06-10",
    updatedAt: "2024-10-02",
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
    ]
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
    totalBudget: 680,
    currency: "USD",
    status: "draft",
    visibility: "friends",
    collaborators: ["patricia.morales@email.com"],
    isShared: true,
    shareCode: "BOYACA2025",
    tags: ["colonial", "artesanías", "cultura", "historia"],
    createdAt: "2024-08-10",
    updatedAt: "2024-08-12",
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
    ]
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
    totalBudget: 420,
    currency: "USD",
    status: "canceled",
    visibility: "private",
    collaborators: [],
    isShared: false,
    tags: ["romántico", "colonial", "relajación", "fin de semana"],
    createdAt: "2024-08-15",
    updatedAt: "2024-08-20",
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
    ]
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
    totalBudget: 890,
    currency: "USD",
    status: "active",
    visibility: "public",
    collaborators: ["fotografo.pro@email.com", "natura.guide@email.com"],
    isShared: true,
    shareCode: "LLANOS2025",
    tags: ["fotografía", "safari", "naturaleza", "fauna"],
    createdAt: "2024-08-25",
    updatedAt: "2024-09-01",
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
    ]
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
    { value: "friends", label: "Solo amigos", count: 3 },
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
  itineraries: PrivateItinerary[],
  filters: Record<string, any>
): PrivateItinerary[] => {
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
  itineraries: PrivateItinerary[],
  sortBy: string
): PrivateItinerary[] => {
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
