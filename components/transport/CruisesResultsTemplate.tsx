'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '@/components/shared/SearchWithFilters';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import CustomCruiseCard, { CruiseTrip } from './CustomCruiseCard';
import { Ship, Clock, MapPin, Users, Star } from 'lucide-react';

interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  cruiseLines?: string[];
  departureTime?: string[];
  duration?: string[];
  amenities?: string[];
  cabinTypes?: string[];
  destinations?: string[];
}

interface CruisesResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  cruiseData?: CruiseTrip[];
  onCabinSelect?: (cruiseId: string, cabinType: string) => void;
}

// Datos simulados de cruceros
const mockCruiseData: CruiseTrip[] = [
  {
    id: 'cruise-001',
    cruiseLine: {
      id: 'royal-caribbean',
      name: 'Royal Caribbean',
      logoUrl: '/placeholder-logo.png',
      rating: 4.6,
      contact: {
        phone: '+1-800-327-6700',
        email: 'info@royalcaribbean.com',
        website: 'www.royalcaribbean.com'
      }
    },
    ship: {
      name: 'Symphony of the Seas',
      model: 'Oasis Class',
      yearBuilt: 2018,
      capacity: 6680,
      decks: 18,
      shipImageUrl: '/placeholder.jpg'
    },
    itinerary: {
      startPort: 'Miami, FL',
      endPort: 'Miami, FL',
      departureDate: '2025-08-15T17:00:00',
      returnDate: '2025-08-22T08:00:00',
      durationNights: 7,
      stops: [
        {
          port: 'Cozumel',
          country: 'México',
          arrivalDateTime: '2025-08-17T08:00:00',
          departureDateTime: '2025-08-17T17:00:00'
        },
        {
          port: 'Roatán',
          country: 'Honduras',
          arrivalDateTime: '2025-08-18T08:00:00',
          departureDateTime: '2025-08-18T17:00:00'
        },
        {
          port: 'Costa Maya',
          country: 'México',
          arrivalDateTime: '2025-08-19T08:00:00',
          departureDateTime: '2025-08-19T17:00:00'
        }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 899,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Piscinas y jacuzzis']
      },
      {
        type: 'Exterior',
        price: 1199,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Vista al mar', 'Piscinas y jacuzzis']
      },
      {
        type: 'Balcón',
        price: 1599,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Balcón privado', 'Servicio prioritario']
      },
      {
        type: 'Suite',
        price: 2599,
        currency: 'USD',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Balcón grande', 'Mayordomía', 'Embarque prioritario']
      }
    ],
    amenities: {
      pools: 4,
      restaurants: 23,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 50
      },
      cancellation: 'Cancelación gratuita hasta 60 días antes',
      healthAndVaccines: 'Pasaporte requerido. Consultar requisitos de vacunas por destino.'
    },
    availability: {
      remainingCabins: 245,
      capacityCabins: 2759
    },
    recurring: {
      frequency: 'Semanal',
      nextSailings: ['2025-08-22', '2025-08-29', '2025-09-05']
    },
    isRoundTrip: true,
    updatedAt: '2025-07-16T10:00:00'
  },
  {
    id: 'cruise-002',
    cruiseLine: {
      id: 'norwegian',
      name: 'Norwegian Cruise Line',
      logoUrl: '/placeholder-logo.png',
      rating: 4.3,
      contact: {
        phone: '+1-866-234-7350',
        email: 'info@ncl.com',
        website: 'www.ncl.com'
      }
    },
    ship: {
      name: 'Norwegian Breakaway',
      model: 'Breakaway Class',
      yearBuilt: 2013,
      capacity: 3963,
      decks: 16,
      shipImageUrl: '/placeholder.jpg'
    },
    itinerary: {
      startPort: 'New York, NY',
      endPort: 'New York, NY',
      departureDate: '2025-08-20T16:00:00',
      returnDate: '2025-08-27T07:00:00',
      durationNights: 7,
      stops: [
        {
          port: 'Bermuda',
          country: 'Bermuda',
          arrivalDateTime: '2025-08-22T10:00:00',
          departureDateTime: '2025-08-24T17:00:00'
        }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 749,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento']
      },
      {
        type: 'Exterior',
        price: 999,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Vista al mar']
      },
      {
        type: 'Balcón',
        price: 1399,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento', 'Balcón privado']
      }
    ],
    amenities: {
      pools: 3,
      restaurants: 18,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 45
      },
      cancellation: 'Cancelación con penalidad según fecha',
      healthAndVaccines: 'Pasaporte o REAL ID requerido.'
    },
    availability: {
      remainingCabins: 156,
      capacityCabins: 2014
    },
    recurring: {
      frequency: 'Semanal',
      nextSailings: ['2025-08-27', '2025-09-03', '2025-09-10']
    },
    isRoundTrip: true,
    updatedAt: '2025-07-16T09:30:00'
  },
  {
    id: 'cruise-003',
    cruiseLine: {
      id: 'celebrity',
      name: 'Celebrity Cruises',
      logoUrl: '/placeholder-logo.png',
      rating: 4.8,
      contact: {
        phone: '+1-888-751-7804',
        email: 'info@celebrity.com',
        website: 'www.celebritycruises.com'
      }
    },
    ship: {
      name: 'Celebrity Edge',
      model: 'Edge Class',
      yearBuilt: 2018,
      capacity: 2918,
      decks: 16,
      shipImageUrl: '/placeholder.jpg'
    },
    itinerary: {
      startPort: 'Barcelona, España',
      endPort: 'Roma, Italia',
      departureDate: '2025-09-05T18:00:00',
      returnDate: '2025-09-15T08:00:00',
      durationNights: 10,
      stops: [
        {
          port: 'Palma de Mallorca',
          country: 'España',
          arrivalDateTime: '2025-09-06T08:00:00',
          departureDateTime: '2025-09-06T18:00:00'
        },
        {
          port: 'Niza',
          country: 'Francia',
          arrivalDateTime: '2025-09-07T08:00:00',
          departureDateTime: '2025-09-07T18:00:00'
        },
        {
          port: 'Florencia',
          country: 'Italia',
          arrivalDateTime: '2025-09-08T08:00:00',
          departureDateTime: '2025-09-08T18:00:00'
        },
        {
          port: 'Nápoles',
          country: 'Italia',
          arrivalDateTime: '2025-09-09T08:00:00',
          departureDateTime: '2025-09-09T18:00:00'
        }
      ]
    },
    cabinOptions: [
      {
        type: 'Interior',
        price: 1599,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento de lujo']
      },
      {
        type: 'Exterior',
        price: 1999,
        currency: 'USD',
        maxGuests: 4,
        refundable: false,
        inclusions: ['Comidas principales', 'Entretenimiento de lujo', 'Vista al mar']
      },
      {
        type: 'Balcón',
        price: 2799,
        currency: 'USD',
        maxGuests: 4,
        refundable: true,
        inclusions: ['Comidas principales', 'Entretenimiento de lujo', 'Balcón privado', 'Servicio de conserjería']
      },
      {
        type: 'Suite',
        price: 4599,
        currency: 'USD',
        maxGuests: 6,
        refundable: true,
        inclusions: ['Comidas principales', 'Restaurantes especializados', 'Mayordomo personal', 'Spa incluido']
      }
    ],
    amenities: {
      pools: 2,
      restaurants: 15,
      gym: true,
      casino: true,
      kidsClub: true,
      showsIncluded: true,
      excursionsIncluded: false
    },
    policies: {
      baggage: {
        includedKgPerPerson: 55
      },
      cancellation: 'Cancelación gratuita hasta 90 días antes',
      healthAndVaccines: 'Pasaporte requerido. Consultar requisitos específicos por país.'
    },
    availability: {
      remainingCabins: 89,
      capacityCabins: 1467
    },
    recurring: {
      frequency: 'Quincenal',
      nextSailings: ['2025-09-19', '2025-10-03', '2025-10-17']
    },
    isRoundTrip: false,
    updatedAt: '2025-07-16T08:45:00'
  }
];

// Convertir cruceros a formato RowData para SearchWithFilters
const convertCruisesToRowData = (cruises: CruiseTrip[]) => {
  return cruises.map(cruise => ({
    id: cruise.id,
    title: `${cruise.itinerary.startPort} → ${cruise.itinerary.endPort}`,
    descMain: cruise.cruiseLine.name,
    descSub: `${cruise.itinerary.durationNights} noches • ${cruise.itinerary.stops.length} paradas`,
    price: Math.min(...cruise.cabinOptions.map(c => c.price)),
    currency: cruise.cabinOptions[0]?.currency || 'USD',
    rating: cruise.cruiseLine.rating || 0,
    reviews: 0,
    availability: cruise.availability.remainingCabins,
    cruiseLine: cruise.cruiseLine.name,
    departureDate: cruise.itinerary.departureDate,
    returnDate: cruise.itinerary.returnDate,
    duration: cruise.itinerary.durationNights,
    stops: cruise.itinerary.stops.length,
    amenities: Object.values(cruise.amenities).filter(Boolean).length,
    cabinTypes: cruise.cabinOptions.map(c => c.type).join(', '),
    cruiseData: cruise
  }));
};

const CruisesResultsTemplate: React.FC<CruisesResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  cruiseData,
  onCabinSelect
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook de paginación
  const {
    visibleItems: visibleCruises,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: 3,
    itemsPerStep: 3,
    totalItems: rows.length
  });

  // Configuración del data source para búsqueda
  const dataSourcesCruises = useMemo(() => [
    {
      id: "cruises",
      label: "Cruceros",
      icon: <Ship className="h-4 w-4" />,
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
      label: "Buscar cruceros",
      placeholder: filterDefaults.search || "Buscar por destino, naviera...",
      dataSources: dataSourcesCruises,
      defaultValue: filterDefaults.search || "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron cruceros",
      searchPlaceholder: "Escribe para buscar cruceros..."
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
      min: 500,
      max: 5000,
      step: 100,
      currency: "USD",
      defaultValue: filterDefaults.priceRange || [500, 5000]
    },
    { id: "separator-3", type: "separator" },
    {
      id: "cruiseLines",
      type: "checkbox",
      label: "Navieras",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más navieras",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.cruiseLines || []
    },
    { id: "separator-4", type: "separator" },
    {
      id: "duration",
      type: "toggle",
      label: "Duración del crucero",
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
    { id: "separator-5", type: "separator" },
    {
      id: "destinations",
      type: "checkbox",
      label: "Destinos",
      showCounts: true,
      maxSelections: 8,
      initialVisibleCount: 6,
      showMoreText: "Ver más destinos",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.destinations || []
    },
    { id: "separator-6", type: "separator" },
    {
      id: "amenities",
      type: "checkbox",
      label: "Amenidades",
      showCounts: true,
      maxSelections: 8,
      initialVisibleCount: 6,
      showMoreText: "Ver más amenidades",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.amenities || []
    },
    { id: "separator-7", type: "separator" },
    {
      id: "cabinTypes",
      type: "radio",
      label: "Tipo de cabina preferida",
      defaultValue: filterDefaults.cabinTypes?.[0] || ""
    },
    { id: "separator-8", type: "separator" },
    {
      id: "departureTime",
      type: "toggle",
      label: "Mes de salida",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 6,
      defaultValue: filterDefaults.departureTime || []
    }
  ], [dataSourcesCruises, filterDefaults]);

  // Opciones de filtros
  const filterOptions: { [filterId: string]: GenericFilterOption[] } = useMemo(() => ({
    popularFilters: [
      { value: 'balcon', label: 'Cabina con balcón', count: 15 },
      { value: 'todo-incluido', label: 'Todo incluido', count: 8 },
      { value: 'mediterraneo', label: 'Mediterráneo', count: 12 },
      { value: 'caribe', label: 'Caribe', count: 18 },
      { value: 'reembolsable', label: 'Reembolsable', count: 9 },
      { value: 'kids-free', label: 'Niños gratis', count: 6 }
    ],
    cruiseLines: [
      { value: 'royal-caribbean', label: 'Royal Caribbean', count: 12 },
      { value: 'norwegian', label: 'Norwegian Cruise Line', count: 8 },
      { value: 'celebrity', label: 'Celebrity Cruises', count: 6 },
      { value: 'princess', label: 'Princess Cruises', count: 7 },
      { value: 'carnival', label: 'Carnival Cruise Line', count: 10 },
      { value: 'msc', label: 'MSC Cruises', count: 5 }
    ],
    duration: [
      { value: 'corto', label: '3-5 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'medio', label: '6-8 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'largo', label: '9-14 noches', icon: <Clock className="w-4 h-4" /> },
      { value: 'muy-largo', label: '15+ noches', icon: <Clock className="w-4 h-4" /> }
    ],
    destinations: [
      { value: 'caribe', label: 'Caribe', count: 18 },
      { value: 'mediterraneo', label: 'Mediterráneo', count: 12 },
      { value: 'alaska', label: 'Alaska', count: 6 },
      { value: 'northern-europe', label: 'Europa del Norte', count: 8 },
      { value: 'asia', label: 'Asia', count: 5 },
      { value: 'transatlantico', label: 'Transatlántico', count: 3 },
      { value: 'repositioning', label: 'Reposicionamiento', count: 4 },
      { value: 'hawaii', label: 'Hawaii', count: 7 }
    ],
    amenities: [
      { value: 'piscinas', label: 'Múltiples piscinas', count: 20 },
      { value: 'restaurantes', label: 'Restaurantes especializados', count: 18 },
      { value: 'gimnasio', label: 'Gimnasio', count: 22 },
      { value: 'casino', label: 'Casino', count: 19 },
      { value: 'kids-club', label: 'Club de niños', count: 16 },
      { value: 'shows', label: 'Shows en vivo', count: 21 },
      { value: 'spa', label: 'Spa y wellness', count: 15 },
      { value: 'wifi', label: 'WiFi incluido', count: 8 }
    ],
    cabinTypes: [
      { value: 'interior', label: 'Interior', count: 22 },
      { value: 'exterior', label: 'Exterior', count: 20 },
      { value: 'balcon', label: 'Balcón', count: 15 },
      { value: 'suite', label: 'Suite', count: 8 }
    ],
    departureTime: [
      { value: 'agosto', label: 'Agosto 2025', icon: <Clock className="w-4 h-4" /> },
      { value: 'septiembre', label: 'Septiembre 2025', icon: <Clock className="w-4 h-4" /> },
      { value: 'octubre', label: 'Octubre 2025', icon: <Clock className="w-4 h-4" /> },
      { value: 'noviembre', label: 'Noviembre 2025', icon: <Clock className="w-4 h-4" /> },
      { value: 'diciembre', label: 'Diciembre 2025', icon: <Clock className="w-4 h-4" /> },
      { value: 'enero', label: 'Enero 2026', icon: <Clock className="w-4 h-4" /> }
    ]
  }), []);

  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'price-asc', label: 'Precio: menor a mayor' },
    { key: 'price-desc', label: 'Precio: mayor a menor' },
    { key: 'duration-asc', label: 'Duración: menor a mayor' },
    { key: 'departure-asc', label: 'Fecha de salida' },
    { key: 'rating-desc', label: 'Mejor calificados' },
    { key: 'availability-desc', label: 'Más disponibilidad' }
  ];

  // Simular carga de datos
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const dataToUse = cruiseData || mockCruiseData;
      const convertedData = convertCruisesToRowData(dataToUse);
      setRows(convertedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cruiseData]);

  // Handler para click en tarjeta
  const handleCardClick = (idx: number, row: any) => {
    console.log('Crucero seleccionado:', row);
    onCardClick?.(idx, row);
  };

  // Renderizar resultados de cruceros
  const renderCruiseResults = ({ filteredRows, compareMode, onCardClick }: any) => {
    const cruisesToShow = filteredRows.slice(0, visibleCruises);
    
    return (
      <div className="space-y-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
            </div>
          ))
        ) : cruisesToShow.length > 0 ? (
          <>
            {cruisesToShow.map((row: any, index: number) => (
              <CustomCruiseCard
                key={row.id}
                cruise={row.cruiseData}
                onClick={() => handleCardClick(index, row)}
                onCabinSelect={onCabinSelect}
              />
            ))}
            
            {/* Componente de paginación */}
            {filteredRows.length > 3 && (
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleCruises}
                initialVisibleItems={3}
                itemsPerStep={3}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="cruceros"
                showMoreText="Ver más cruceros"
                showLessText="Ver menos cruceros"
                allItemsMessage="Has visto todos los cruceros disponibles"
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Ship className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron cruceros
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros para encontrar más opciones.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
   <Suspense fallback={<div className="text-center py-12">Cargando cruceros...</div>}>
     <div className={className}>
      <SearchWithFilters
        rows={rows}
        filters={filtersConfig}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        renderResults={renderCruiseResults}
        onCardClick={handleCardClick}
        onFiltersChange={onFiltersChange}
        searchPlaceholder="Buscar cruceros por destino, naviera..."
        noResultsMessage="No se encontraron cruceros que coincidan con tu búsqueda"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar por"
        resultsCountText={(count) => `${count}+ cruceros disponibles`}
      />
    </div>
    </Suspense>
  );
};

export default CruisesResultsTemplate;