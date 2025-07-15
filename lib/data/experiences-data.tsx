'use client';

import { ExperienceData } from '@/components/experiences/ExperienceCard';

// Mock data de experiencias para Colombia
export const mockExperiences: ExperienceData[] = [
  {
    id: 'exp-001',
    title: 'Tour de Café Premium en Zona Cafetera',
    description: 'Descubre los secretos del café colombiano en una finca tradicional. Incluye degustación, taller de barismo y almuerzo típico.',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
    location: 'Armenia, Quindío',
    type: 'Gastronómica',
    availability: {
      mode: 'recurring',
      frequency: 'Todos los días',
      maxCapacity: 12,
      bookedCount: 8
    },
    isAvailable: true,
    price: 180000,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-001',
      name: 'Carlos Mendoza',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.8,
      count: 127
    },
    tags: ['familiar', 'educativo', 'premium', 'almuerzo incluido'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-10T14:30:00Z'
  },
  {
    id: 'exp-002',
    title: 'Trekking a Ciudad Perdida',
    description: 'Aventura épica de 4 días y 3 noches hasta el sitio arqueológico más importante de Colombia. Incluye guía especializado y hospedaje.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    location: 'Santa Marta, Magdalena',
    type: 'Aventura',
    availability: {
      mode: 'fixed',
      startDate: '2024-08-15T06:00:00Z',
      endDate: '2024-08-18T18:00:00Z',
      maxCapacity: 16,
      bookedCount: 14
    },
    isAvailable: true,
    price: 850000,
    currency: 'USD',
    language: 'Español, Inglés, Francés',
    host: {
      id: 'host-002',
      name: 'Ana Rodríguez',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1-6b?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.9,
      count: 89
    },
    tags: ['aventura extrema', 'patrimonio', 'camping', 'guía certificado'],
    createdAt: '2024-02-20T08:00:00Z',
    updatedAt: '2024-07-12T16:45:00Z'
  },
  {
    id: 'exp-003',
    title: 'Relajación Total en Spa Termal',
    description: 'Día completo de bienestar en aguas termales naturales con masajes terapéuticos, yoga al amanecer y alimentación consciente.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    location: 'Tabio, Cundinamarca',
    type: 'Wellness',
    availability: {
      mode: 'recurring',
      frequency: 'Fines de semana',
      maxCapacity: 20,
      bookedCount: 12
    },
    isAvailable: true,
    price: 280000,
    currency: 'USD',
    language: 'Español',
    host: {
      id: 'host-003',
      name: 'Sofía Herrera',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.7,
      count: 156
    },
    tags: ['relajación', 'spa', 'yoga', 'alimentación saludable'],
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-07-14T11:20:00Z'
  },
  {
    id: 'exp-004',
    title: 'Avistamiento de Ballenas Jorobadas',
    description: 'Experiencia única observando ballenas jorobadas en su migración anual. Incluye transporte en lancha y snorkel opcional.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    location: 'Bahía Málaga, Valle del Cauca',
    type: 'Playa',
    availability: {
      mode: 'fixed',
      startDate: '2024-08-01T07:00:00Z',
      endDate: '2024-11-30T17:00:00Z',
      maxCapacity: 25,
      bookedCount: 22
    },
    isAvailable: true,
    price: 380000,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-004',
      name: 'Miguel Torres',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.9,
      count: 203
    },
    tags: ['vida marina', 'temporada especial', 'fotografía', 'conservación'],
    createdAt: '2024-04-05T07:30:00Z',
    updatedAt: '2024-07-15T09:15:00Z'
  },
  {
    id: 'exp-005',
    title: 'Tour Gastronómico por La Candelaria',
    description: 'Recorrido culinario por el centro histórico de Bogotá. Degusta platos típicos en mercados locales y restaurantes emblemáticos.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    location: 'Bogotá, Cundinamarca',
    type: 'Cultural',
    availability: {
      mode: 'recurring',
      frequency: 'Martes a Domingo',
      maxCapacity: 15,
      bookedCount: 15
    },
    isAvailable: false,
    price: 120000,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-005',
      name: 'Esperanza Gómez',
      avatarUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.6,
      count: 78
    },
    tags: ['historia', 'gastronomía', 'mercados', 'centro histórico'],
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-07-13T15:10:00Z'
  },
  {
    id: 'exp-006',
    title: 'Exploración Nocturna en Guatapé',
    description: 'Experiencia única escalando la Piedra del Peñón al atardecer y explorando el pueblo de los zócalos bajo las estrellas.',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73dd1?w=800&h=600&fit=crop',
    location: 'Guatapé, Antioquia',
    type: 'Aventura',
    availability: {
      mode: 'onRequest',
      maxCapacity: 8,
      bookedCount: 0
    },
    isAvailable: true,
    price: 220000,
    currency: 'USD',
    language: 'Español',
    host: {
      id: 'host-006',
      name: 'Andrés Ramírez',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.8,
      count: 45
    },
    tags: ['nocturno', 'escalada', 'fotografía', 'pueblo mágico'],
    createdAt: '2024-05-12T16:00:00Z',
    updatedAt: '2024-07-11T20:30:00Z'
  },
  {
    id: 'exp-007',
    title: 'Clase de Salsa en Cali',
    description: 'Aprende a bailar salsa en la capital mundial de este ritmo. Incluye clases grupales, práctica social y show profesional.',
    imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    location: 'Cali, Valle del Cauca',
    type: 'Cultural',
    availability: {
      mode: 'recurring',
      frequency: 'Viernes y Sábados',
      maxCapacity: 30,
      bookedCount: 18
    },
    isAvailable: true,
    price: 95000,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-007',
      name: 'Luisa Fernanda Valencia',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 4.7,
      count: 234
    },
    tags: ['baile', 'música', 'cultura local', 'show en vivo'],
    createdAt: '2024-02-28T18:00:00Z',
    updatedAt: '2024-07-09T21:00:00Z'
  },
  {
    id: 'exp-008',
    title: 'Eco-Tour por el Amazonas Colombiano',
    description: 'Expedición de 3 días en el Amazonas con comunidades indígenas. Incluye navegación por río, pesca de pirañas y rituales ancestrales.',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
    location: 'Leticia, Amazonas',
    type: 'Eco',
    availability: {
      mode: 'fixed',
      startDate: '2024-09-10T06:00:00Z',
      endDate: '2024-09-12T18:00:00Z',
      maxCapacity: 12,
      bookedCount: 6
    },
    isAvailable: true,
    price: 1200000,
    currency: 'USD',
    language: 'Español, Inglés, Portugués',
    host: {
      id: 'host-008',
      name: 'Taita Bernardo',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    },
    rating: {
      score: 5.0,
      count: 34
    },
    tags: ['amazonas', 'comunidades indígenas', 'biodiversidad', 'ritual ancestral'],
    createdAt: '2024-06-01T05:00:00Z',
    updatedAt: '2024-07-08T12:45:00Z'
  }
];

// Función para filtrar experiencias por tipo
export const filterExperiencesByType = (experiences: ExperienceData[], type: string) => {
  return experiences.filter(exp => exp.type.toLowerCase() === type.toLowerCase());
};

// Función para filtrar experiencias disponibles
export const getAvailableExperiences = (experiences: ExperienceData[]) => {
  return experiences.filter(exp => exp.isAvailable);
};

// Función para ordenar experiencias por rating
export const sortExperiencesByRating = (experiences: ExperienceData[]) => {
  return experiences.sort((a, b) => {
    const ratingA = a.rating?.score || 0;
    const ratingB = b.rating?.score || 0;
    return ratingB - ratingA;
  });
};

// Función para ordenar experiencias por precio
export const sortExperiencesByPrice = (experiences: ExperienceData[], ascending = true) => {
  return experiences.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};
