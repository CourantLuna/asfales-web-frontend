'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '@/components/shared/SearchWithFilters';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import ExperienceCard, { ExperienceData } from './ExperienceCard';
import { 
  Compass, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Waves,
  Mountain,
  Camera,
  Utensils,
  Heart,
  TreePine,
  Building,
  Trophy,
  DollarSign,
  Calendar
} from 'lucide-react';

interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  experienceTypes?: string[];
  availability?: string[];
  location?: string[];
  duration?: string[];
  language?: string[];
  rating?: string;
  amenities?: string[];
}

interface ExperiencesResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  experienceData?: ExperienceData[];
  onSave?: (experienceId: string) => void;
  onShare?: (experienceId: string) => void;
}

// Datos simulados de experiencias
const mockExperienceData: ExperienceData[] = [
  {
    id: 'exp-001',
    title: 'Aventura de Buceo en Arrecifes de Coral',
    description: 'Explora los coloridos arrecifes de coral del Caribe dominicano en esta experiencia única de buceo. Perfecto para principiantes y expertos.',
    imageUrl: '/placeholder.jpg',
    location: 'Punta Cana, República Dominicana',
    type: 'Playa',
    availability: {
      mode: 'recurring',
      frequency: 'Martes, Jueves y Sábados',
      maxCapacity: 12,
      bookedCount: 8
    },
    isAvailable: true,
    price: 85,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-001',
      name: 'Carlos Mendoza',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.8,
      count: 156
    },
    tags: ['Familiar', 'Aventura', 'Acuático', 'Fotografía'],
    createdAt: '2025-07-10T08:00:00',
    updatedAt: '2025-07-16T10:00:00'
  },
  {
    id: 'exp-002',
    title: 'Tour Gastronómico por el Casco Antiguo',
    description: 'Descubre los sabores auténticos de la cocina dominicana mientras exploramos los rincones históricos de Santo Domingo.',
    imageUrl: '/placeholder.jpg',
    location: 'Santo Domingo, República Dominicana',
    type: 'Gastronómica',
    availability: {
      mode: 'fixed',
      startDate: '2025-08-20T18:00:00',
      endDate: '2025-08-20T22:00:00',
      maxCapacity: 15,
      bookedCount: 12
    },
    isAvailable: true,
    price: 65,
    currency: 'USD',
    language: 'Español',
    host: {
      id: 'host-002',
      name: 'María González',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.9,
      count: 203
    },
    tags: ['Gastronómico', 'Cultural', 'Local', 'Historia'],
    createdAt: '2025-07-08T15:30:00',
    updatedAt: '2025-07-16T09:15:00'
  },
  {
    id: 'exp-003',
    title: 'Senderismo en las Montañas de Jarabacoa',
    description: 'Una experiencia única en las montañas dominicanas, perfecta para conectar con la naturaleza y disfrutar de vistas espectaculares.',
    imageUrl: '/placeholder.jpg',
    location: 'Jarabacoa, República Dominicana',
    type: 'Aventura',
    availability: {
      mode: 'recurring',
      frequency: 'Fines de semana',
      maxCapacity: 20,
      bookedCount: 5
    },
    isAvailable: true,
    price: 45,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-003',
      name: 'Roberto Silva',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.7,
      count: 89
    },
    tags: ['Naturaleza', 'Aventura', 'Ejercicio', 'Paisajes'],
    createdAt: '2025-07-05T12:00:00',
    updatedAt: '2025-07-16T08:45:00'
  },
  {
    id: 'exp-004',
    title: 'Sesión de Yoga al Amanecer en la Playa',
    description: 'Comienza tu día con una relajante sesión de yoga frente al mar, perfecta para rejuvenecer cuerpo y mente.',
    imageUrl: '/placeholder.jpg',
    location: 'Bávaro, República Dominicana',
    type: 'Wellness',
    availability: {
      mode: 'recurring',
      frequency: 'Todos los días',
      maxCapacity: 25,
      bookedCount: 18
    },
    isAvailable: true,
    price: 35,
    currency: 'USD',
    language: 'Español, Inglés, Francés',
    host: {
      id: 'host-004',
      name: 'Ana Martínez',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.9,
      count: 312
    },
    tags: ['Wellness', 'Relajación', 'Playa', 'Madrugadores'],
    createdAt: '2025-07-01T06:00:00',
    updatedAt: '2025-07-16T07:30:00'
  },
  {
    id: 'exp-005',
    title: 'Workshop de Fotografía de Paisajes',
    description: 'Aprende técnicas profesionales de fotografía mientras capturamos los paisajes más impresionantes de la isla.',
    imageUrl: '/placeholder.jpg',
    location: 'Samaná, República Dominicana',
    type: 'Cultural',
    availability: {
      mode: 'onRequest',
      maxCapacity: 8,
      bookedCount: 3
    },
    isAvailable: true,
    price: 120,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-005',
      name: 'David Kim',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.8,
      count: 67
    },
    tags: ['Fotografía', 'Arte', 'Paisajes', 'Técnico'],
    createdAt: '2025-06-28T14:20:00',
    updatedAt: '2025-07-16T11:10:00'
  },
  {
    id: 'exp-006',
    title: 'Eco-Tour por la Reserva Natural',
    description: 'Explora la biodiversidad única de República Dominicana en esta experiencia ecológica guiada por expertos naturalistas.',
    imageUrl: '/placeholder.jpg',
    location: 'Los Haitises, República Dominicana',
    type: 'Eco',
    availability: {
      mode: 'recurring',
      frequency: 'Lunes, Miércoles y Viernes',
      maxCapacity: 16,
      bookedCount: 11
    },
    isAvailable: true,
    price: 75,
    currency: 'USD',
    language: 'Español, Inglés',
    host: {
      id: 'host-006',
      name: 'Isabel Rodríguez',
      avatarUrl: '/placeholder-user.jpg'
    },
    rating: {
      score: 4.6,
      count: 128
    },
    tags: ['Eco', 'Naturaleza', 'Educativo', 'Biodiversidad'],
    createdAt: '2025-06-25T10:45:00',
    updatedAt: '2025-07-16T12:00:00'
  }
];

// Convertir experiencias a formato RowData para SearchWithFilters
const convertExperiencesToRowData = (experiences: ExperienceData[]) => {
  return experiences.map(experience => ({
    id: experience.id,
    title: experience.title,
    descMain: experience.host.name,
    descSub: `${experience.type} • ${experience.location}`,
    price: experience.price,
    currency: experience.currency,
    rating: experience.rating?.score || 0,
    reviews: experience.rating?.count || 0,
    availability: experience.availability.maxCapacity ? 
      experience.availability.maxCapacity - (experience.availability.bookedCount || 0) : 999,
    experienceType: experience.type,
    location: experience.location,
    language: experience.language,
    availabilityMode: experience.availability.mode,
    tags: experience.tags?.join(', ') || '',
    experienceData: experience
  }));
};

const ExperiencesResultsTemplate: React.FC<ExperiencesResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  experienceData,
  onSave,
  onShare
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook de paginación - Ajustado para layout de 2 columnas
  const {
    visibleItems: visibleExperiences,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: 4, // 2 filas x 2 columnas = 4 experiencias iniciales
    itemsPerStep: 4, // Cargar de 4 en 4 para mantener filas completas
    totalItems: rows.length
  });

  // Configuración del data source para búsqueda
  const dataSourcesExperiences = useMemo(() => [
    {
      id: "experiences",
      label: "Experiencias",
      icon: <Compass className="h-4 w-4" />,
      type: "custom" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: rows
    }
  ], [rows]);

  // Configuración de filtros
  const filtersConfig: GenericFilterConfig[] = useMemo(() => [
    {
      id: "search",
      type: "search",
      label: "Buscar experiencias",
      placeholder: filterDefaults.search || "Buscar por actividad, lugar, anfitrión...",
      dataSources: dataSourcesExperiences,
      defaultValue: filterDefaults.search || "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron experiencias",
      searchPlaceholder: "Escribe para buscar experiencias..."
    },
    { id: "separator-1", type: "separator" },
    {
      id: "popularFilters",
      type: "checkbox",
      label: "Filtros populares",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 6,
      showMoreText: "Ver más filtros",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.popularFilters || []
    },
    { id: "separator-2", type: "separator" },
    {
      id: "priceRange",
      type: "range",
      label: "Rango de precio",
      min: 0,
      max: 200,
      step: 5,
      currency: "USD",
      defaultValue: filterDefaults.priceRange || [0, 200]
    },
    { id: "separator-3", type: "separator" },
    {
      id: "experienceTypes",
      type: "toggle",
      label: "Tipos de experiencia",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 6,
      defaultValue: filterDefaults.experienceTypes || []
    },
    { id: "separator-4", type: "separator" },
    {
      id: "availability",
      type: "radio",
      label: "Disponibilidad",
      defaultValue: filterDefaults.availability?.[0] || ""
    },
    { id: "separator-5", type: "separator" },
    {
      id: "location",
      type: "checkbox",
      label: "Ubicación",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más ubicaciones",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.location || []
    },
    { id: "separator-6", type: "separator" },
    {
      id: "duration",
      type: "toggle",
      label: "Duración",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 4,
      defaultValue: filterDefaults.duration || []
    },
    { id: "separator-7", type: "separator" },
    {
      id: "language",
      type: "checkbox",
      label: "Idioma",
      showCounts: true,
      maxSelections: 4,
      initialVisibleCount: 4,
      showMoreText: "Ver más idiomas",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.language || []
    },
    { id: "separator-8", type: "separator" },
    {
      id: "rating",
      type: "radio",
      label: "Calificación mínima",
      defaultValue: filterDefaults.rating || ""
    },
    { id: "separator-9", type: "separator" },
    {
      id: "amenities",
      type: "checkbox",
      label: "Características",
      showCounts: true,
      maxSelections: 6,
      initialVisibleCount: 6,
      showMoreText: "Ver más características",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.amenities || []
    }
  ], [dataSourcesExperiences, filterDefaults]);

  // Opciones de filtros
  const filterOptions: { [filterId: string]: GenericFilterOption[] } = useMemo(() => ({
    popularFilters: [
      { value: 'familiar', label: 'Familiar', count: 24 },
      { value: 'aventura', label: 'Aventura', count: 18 },
      { value: 'relajacion', label: 'Relajación', count: 16 },
      { value: 'cultural', label: 'Cultural', count: 14 },
      { value: 'fotografía', label: 'Fotografía', count: 12 },
      { value: 'gastronomico', label: 'Gastronómico', count: 10 }
    ],
    experienceTypes: [
      { value: 'playa', label: 'Playa', icon: <Waves className="w-4 h-4" /> },
      { value: 'aventura', label: 'Aventura', icon: <Mountain className="w-4 h-4" /> },
      { value: 'cultural', label: 'Cultural', icon: <Camera className="w-4 h-4" /> },
      { value: 'gastronomica', label: 'Gastronómica', icon: <Utensils className="w-4 h-4" /> },
      { value: 'wellness', label: 'Wellness', icon: <Heart className="w-4 h-4" /> },
      { value: 'eco', label: 'Eco', icon: <TreePine className="w-4 h-4" /> },
      { value: 'urbana', label: 'Urbana', icon: <Building className="w-4 h-4" /> },
      { value: 'deportiva', label: 'Deportiva', icon: <Trophy className="w-4 h-4" /> }
    ],
    availability: [
      { value: 'hoy', label: 'Disponible hoy', count: 8 },
      { value: 'esta-semana', label: 'Esta semana', count: 22 },
      { value: 'este-mes', label: 'Este mes', count: 45 },
      { value: 'cualquier-momento', label: 'Cualquier momento', count: 67 }
    ],
    location: [
      { value: 'punta-cana', label: 'Punta Cana', count: 18 },
      { value: 'santo-domingo', label: 'Santo Domingo', count: 15 },
      { value: 'puerto-plata', label: 'Puerto Plata', count: 12 },
      { value: 'samana', label: 'Samaná', count: 10 },
      { value: 'bavaro', label: 'Bávaro', count: 8 },
      { value: 'jarabacoa', label: 'Jarabacoa', count: 6 },
      { value: 'los-haitises', label: 'Los Haitises', count: 4 }
    ],
    duration: [
      { value: 'corta', label: '1-3 horas', icon: <Clock className="w-4 h-4" /> },
      { value: 'media', label: '4-6 horas', icon: <Clock className="w-4 h-4" /> },
      { value: 'larga', label: '7+ horas', icon: <Clock className="w-4 h-4" /> },
      { value: 'multiple-dias', label: 'Múltiples días', icon: <Calendar className="w-4 h-4" /> }
    ],
    language: [
      { value: 'español', label: 'Español', count: 42 },
      { value: 'ingles', label: 'Inglés', count: 35 },
      { value: 'frances', label: 'Francés', count: 18 },
      { value: 'aleman', label: 'Alemán', count: 12 }
    ],
    rating: [
      { value: '4.5', label: '4.5+ estrellas', count: 28 },
      { value: '4.0', label: '4.0+ estrellas', count: 45 },
      { value: '3.5', label: '3.5+ estrellas', count: 67 },
      { value: 'cualquiera', label: 'Cualquier calificación', count: 89 }
    ],
    amenities: [
      { value: 'equipamiento-incluido', label: 'Equipamiento incluido', count: 32 },
      { value: 'transporte-incluido', label: 'Transporte incluido', count: 28 },
      { value: 'comida-incluida', label: 'Comida incluida', count: 24 },
      { value: 'fotos-incluidas', label: 'Fotos incluidas', count: 20 },
      { value: 'guia-profesional', label: 'Guía profesional', count: 38 },
      { value: 'seguro-incluido', label: 'Seguro incluido', count: 16 }
    ]
  }), []);

  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'price-asc', label: 'Precio: menor a mayor' },
    { key: 'price-desc', label: 'Precio: mayor a menor' },
    { key: 'rating-desc', label: 'Mejor calificados' },
    { key: 'popularity-desc', label: 'Más populares' },
    { key: 'availability-desc', label: 'Más disponibilidad' },
    { key: 'newest', label: 'Más recientes' }
  ];

  // Simular carga de datos
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const dataToUse = experienceData || mockExperienceData;
      const convertedData = convertExperiencesToRowData(dataToUse);
      setRows(convertedData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [experienceData]);

  // Handler para click en tarjeta
  const handleCardClick = (idx: number, row: any) => {
    console.log('Experiencia seleccionada:', row);
    onCardClick?.(idx, row);
  };

  // Renderizar resultados de experiencias
  const renderExperienceResults = ({ filteredRows, compareMode, onCardClick }: any) => {
    const experiencesToShow = filteredRows.slice(0, visibleExperiences);
    
    return (
      <div className="space-y-6">
        {loading ? (
          // Skeleton loading - 2 columnas en desktop, 1 en mobile
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-96 w-full"></div>
              </div>
            ))}
          </div>
        ) : experiencesToShow.length > 0 ? (
          <>
            {/* Grid de experiencias - 2 columnas en desktop, 1 en mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiencesToShow.map((row: any, index: number) => (
                <ExperienceCard
                  key={row.id}
                  experience={row.experienceData}
                  onClick={() => handleCardClick(index, row)}
                  onSave={onSave}
                  onShare={onShare}
                  variant="default"
                  showSaveButton={true}
                  showShareButton={true}
                />
              ))}
            </div>
            
            {/* Componente de paginación */}
            {filteredRows.length > 4 && (
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleExperiences}
                initialVisibleItems={4}
                itemsPerStep={4}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="experiencias"
                showMoreText="Ver más experiencias"
                showLessText="Ver menos experiencias"
                allItemsMessage="Has visto todas las experiencias disponibles"
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Compass className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron experiencias
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros para encontrar más opciones de experiencias.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    }>
      <div className={className}>
      <SearchWithFilters
        rows={rows}
        filters={filtersConfig}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        renderResults={renderExperienceResults}
        onCardClick={handleCardClick}
        onFiltersChange={onFiltersChange}
        searchPlaceholder="Buscar experiencias por actividad, lugar, anfitrión..."
        noResultsMessage="No se encontraron experiencias que coincidan con tu búsqueda"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar por"
        resultsCountText={(count) => `${count}+ experiencias disponibles`}
        showToggleShowFilters={true}
      />
    </div>
    </Suspense>
  );
};

export default ExperiencesResultsTemplate;