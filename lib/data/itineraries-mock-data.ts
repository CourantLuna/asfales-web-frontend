// Datos mock para itinerarios (ejemplos y testing)

import { ItineraryPackage } from '@/lib/data/mock-datavf';
import { ItineraryRowData, ItinerarySearchData } from './itineraries-types';

// Datos de ejemplo para itinerarios adicionales (complementando los existentes)
export const sampleItineraries: ItineraryPackage[] = [
  {
    id: "sample-1",
    title: "Ruta del Café y Cultura Paisa",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    duration: "8 días",
    price: "$1,450",
    originalPrice: "$1,650",
    discount: 12,
    rating: 4.9,
    reviewCount: 127,
    creator: {
      id: "creator-1",
      name: "Carlos Mendoza",
      username: "carlosmendoza",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    participants: [
      { 
        id: "participant-1",
        name: "Ana García", 
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100" 
      },
      { 
        id: "participant-2",
        name: "Miguel Torres", 
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
      }
    ],
    cities: ["Medellín", "Guatapé", "Santa Fe de Antioquia", "Jardín"],
    lodgingCount: 3,
    experienceCount: 12,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "bus", count: 4 }
    ],
    isPriceEstimated: false,
    availableSpots: 4,
    totalSpots: 12,
    highlights: [
      "Tour por fincas cafeteras tradicionales",
      "Senderismo en Jardín y Guatapé",
      "Experiencia gastronómica paisa auténtica"
    ]
  },
  {
    id: "sample-2", 
    title: "Aventura en el Amazonas Colombiano",
    coverImage: "https://images.unsplash.com/photo-1580825451310-a2b9133e93d0?w=800",
    startDate: "2024-04-10",
    endDate: "2024-04-17",
    duration: "7 días",
    price: "$2,100",
    originalPrice: "$2,100",
    rating: 4.7,
    reviewCount: 89,
    creator: {
      id: "creator-2",
      name: "Isabella Ramírez",
      username: "isabellaramirez",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    participants: [
      { 
        id: "participant-3",
        name: "Roberto Silva", 
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" 
      }
    ],
    cities: ["Leticia", "Puerto Nariño", "Comunidades Indígenas"],
    lodgingCount: 2,
    experienceCount: 8,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "cruise", count: 3 }
    ],
    isPriceEstimated: false,
    availableSpots: 4,
    totalSpots: 10,
    highlights: [
      "Navegación por el río Amazonas",
      "Encuentro con comunidades indígenas",
      "Observación de delfines rosados"
    ]
  }
];

// Datos de ejemplo para testing de búsquedas
export const mockSearchData: ItinerarySearchData[] = [
  {
    origin: "Santo Domingo",
    destination: "Colombia",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-15"),
    totalItineraries: 20
  },
  {
    origin: "Bogotá",
    destination: "Costa Caribeña",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-10"),
    totalItineraries: 15
  },
  {
    origin: "Madrid",
    destination: "Ruta del Café",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-12"),
    totalItineraries: 8
  }
];

// Datos de ejemplo para row data mapeado
export const sampleRowData: ItineraryRowData[] = [
  {
    id: "row-1",
    title: "Ruta del Café Premium",
    descMain: "Medellín, Guatapé, Jardín • 8 días • $1,450",
    descSecondary: "⭐ 4.9 (127 reseñas) • 12 experiencias",
    price: "$1,450",
    originalData: sampleItineraries[0]
  },
  {
    id: "row-2",
    title: "Expedición Amazónica",
    descMain: "Leticia, Puerto Nariño • 7 días • $2,100",
    descSecondary: "⭐ 4.7 (89 reseñas) • 8 experiencias",
    price: "$2,100",
    originalData: sampleItineraries[1]
  }
];

// Función para generar datos mock dinámicos
export const generateMockItineraries = (count: number = 10): ItineraryPackage[] => {
  const cities = ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "San Gil", "Armenia"];
  const experiences = ["Cultural", "Aventura", "Naturaleza", "Gastronomía", "Wellness", "Fotografía"];
  const creators = [
    "Carlos Mendoza", "Isabella Ramírez", "Miguel Torres", "Ana García", "Roberto Silva"
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `mock-${index + 1}`,
    title: `Itinerario ${experiences[index % experiences.length]} ${cities[index % cities.length]}`,
    coverImage: `https://images.unsplash.com/photo-${1544735716392 + index}?w=800`,
    startDate: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    endDate: new Date(Date.now() + ((index + 1) * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    duration: `${7 + (index % 14)} días`,
    price: `$${1200 + (index * 200)}`,
    originalPrice: `$${1400 + (index * 200)}`,
    discount: index % 3 === 0 ? 10 + (index % 20) : undefined,
    rating: 4.0 + (index % 10) / 10,
    reviewCount: 50 + (index * 20),
    creator: {
      id: `creator-${index + 1}`,
      name: creators[index % creators.length],
      username: creators[index % creators.length].toLowerCase().replace(' ', ''),
      avatarUrl: `https://images.unsplash.com/photo-${1472099645785 + index}?w=100`
    },
    participants: Array.from({ length: 1 + (index % 3) }, (_, pIndex) => ({
      id: `participant-${index}-${pIndex}`,
      name: `Participante ${pIndex + 1}`,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + index + pIndex}?w=100`
    })),
    cities: cities.slice(0, 2 + (index % 3)),
    lodgingCount: 2 + (index % 4),
    experienceCount: 5 + (index % 10),
    transportSummary: [
      { mode: "flight" as const, count: 1 + (index % 2) },
      { mode: "bus" as const, count: 2 + (index % 3) }
    ],
    isPriceEstimated: index % 4 === 0,
    availableSpots: 1 + (index % 8),
    totalSpots: 8 + (index % 8),
    highlights: [
      `Experiencia ${experiences[index % experiences.length].toLowerCase()}`,
      `Destino ${cities[index % cities.length]}`,
      "Guía especializado incluido"
    ]
  }));
};

// Configuración de testing por defecto
export const testingDefaults = {
  totalItineraries: 20,
  defaultOrigin: "Santo Domingo", 
  defaultDestination: "Colombia",
  mockDataCount: 10
};
