'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '@/components/shared/SearchWithFilters';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import CustomBusCard, { BusTrip } from './CustomBusCard';
import { Bus, Clock, MapPin, Users } from 'lucide-react';

interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  priceRange?: [number, number];
  operators?: string[];
  departureTime?: string[];
  stops?: string[];
  amenities?: string[];
  duration?: string[];
  busClass?: string;
}

interface BusesResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  busData?: BusTrip[];
  onClassSelect?: (tripId: string, classType: string) => void;
}

// Datos simulados de buses
const mockBusData: BusTrip[] = [
  {
    id: 'bus-001',
    routeCode: 'SDQ-STI-001',
    operator: {
      id: 'caribe-tours',
      name: 'Caribe Tours',
      logoUrl: '/placeholder-logo.png',
      rating: 4.5,
      contact: {
        phone: '+1-809-221-4422',
        email: 'info@caribetours.com.do',
        website: 'www.caribetours.com.do'
      }
    },
    origin: {
      city: 'Santo Domingo',
      terminal: 'Terminal Caribe Tours Centro',
      countryCode: 'DO',
      departureDateTime: '2025-07-20T08:00:00'
    },
    destination: {
      city: 'Santiago',
      terminal: 'Terminal Santiago',
      countryCode: 'DO',
      arrivalDateTime: '2025-07-20T11:30:00'
    },
    durationMinutes: 210,
    distanceKm: 155,
    stops: [
      { city: 'La Vega', terminal: 'Terminal La Vega', arrivalTime: '09:45:00', departureTime: '10:00:00' }
    ],
    prices: [
      { class: 'Económica', price: 450, currency: 'DOP', refundable: false },
      { class: 'Premium', price: 650, currency: 'DOP', refundable: true, includesMeal: true },
      { class: 'VIP', price: 850, currency: 'DOP', refundable: true, includesMeal: true, seatSelectionIncluded: true }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: true,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: { includedKg: 20, carryOnKg: 8, extraKgPrice: 50 },
      cancellation: 'Cancelación gratuita hasta 24h antes',
      changes: 'Cambios permitidos con cargo de RD$100',
      minors: 'Menores viajan con descuento del 15%',
      pets: 'Mascotas pequeñas permitidas en transportadora'
    },
    availability: { seatsAvailable: 28, totalCapacity: 45 },
    images: ['/placeholder.jpg'],
    ratings: {
      overall: 4.5,
      comfort: 4.3,
      punctuality: 4.7,
      service: 4.4,
      cleanliness: 4.6,
      totalReviews: 234
    },
    isDirect: false,
    recurring: {
      frequency: 'Diario',
      nextDates: ['2025-07-21', '2025-07-22', '2025-07-23']
    },
    updatedAt: '2025-07-16T10:00:00'
  },
  {
    id: 'bus-002',
    routeCode: 'SDQ-STI-002',
    operator: {
      id: 'metro-bus',
      name: 'Metro Bus',
      logoUrl: '/placeholder-logo.png',
      rating: 4.2,
      contact: {
        phone: '+1-809-227-0101',
        email: 'contacto@metrobus.com.do',
        website: 'www.metrobus.com.do'
      }
    },
    origin: {
      city: 'Santo Domingo',
      terminal: 'Terminal Metro Parque Enriquillo',
      countryCode: 'DO',
      departureDateTime: '2025-07-20T14:30:00'
    },
    destination: {
      city: 'Santiago',
      terminal: 'Terminal Metro Santiago',
      countryCode: 'DO',
      arrivalDateTime: '2025-07-20T17:45:00'
    },
    durationMinutes: 195,
    distanceKm: 155,
    stops: [],
    prices: [
      { class: 'Económica', price: 380, currency: 'DOP', refundable: false },
      { class: 'Premium', price: 580, currency: 'DOP', refundable: true }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: false,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: { includedKg: 15, carryOnKg: 5, extraKgPrice: 75 },
      cancellation: 'Cancelación con cargo del 10%',
      changes: 'Cambios permitidos con cargo de RD$150',
      minors: 'Menores viajan con descuento del 10%'
    },
    availability: { seatsAvailable: 15, totalCapacity: 42 },
    images: ['/placeholder.jpg'],
    ratings: {
      overall: 4.2,
      comfort: 4.0,
      punctuality: 4.5,
      service: 4.1,
      cleanliness: 4.3,
      totalReviews: 156
    },
    isDirect: true,
    recurring: {
      frequency: 'Cada 2 horas',
      nextDates: ['2025-07-20', '2025-07-21', '2025-07-22']
    },
    updatedAt: '2025-07-16T09:30:00'
  },
  {
    id: 'bus-003',
    routeCode: 'SDQ-POP-001',
    operator: {
      id: 'expreso-bavaro',
      name: 'Expreso Bávaro',
      logoUrl: '/placeholder-logo.png',
      rating: 4.7,
      contact: {
        phone: '+1-809-552-1670',
        email: 'reservas@expresobavaro.com',
        website: 'www.expresobavaro.com'
      }
    },
    origin: {
      city: 'Santo Domingo',
      terminal: 'Terminal Expreso Bávaro',
      countryCode: 'DO',
      departureDateTime: '2025-07-20T09:00:00'
    },
    destination: {
      city: 'Puerto Plata',
      terminal: 'Terminal Puerto Plata',
      countryCode: 'DO',
      arrivalDateTime: '2025-07-20T13:00:00'
    },
    durationMinutes: 240,
    distanceKm: 215,
    stops: [
      { city: 'Santiago', terminal: 'Terminal Santiago', arrivalTime: '11:30:00', departureTime: '11:45:00' }
    ],
    prices: [
      { class: 'Premium', price: 750, currency: 'DOP', refundable: true, includesMeal: true },
      { class: 'VIP', price: 950, currency: 'DOP', refundable: true, includesMeal: true, seatSelectionIncluded: true }
    ],
    amenities: {
      wifi: true,
      usbPorts: true,
      ac: true,
      onboardToilet: true,
      recliningSeats: true,
      entertainment: true,
      reading_light: true,
      gps_tracking: true,
      emergency_exit: true
    },
    policies: {
      baggage: { includedKg: 25, carryOnKg: 10, extraKgPrice: 40 },
      cancellation: 'Cancelación gratuita hasta 12h antes',
      changes: 'Cambios gratuitos hasta 2h antes',
      minors: 'Menores viajan con descuento del 20%',
      pets: 'Mascotas permitidas con cargo adicional'
    },
    availability: { seatsAvailable: 8, totalCapacity: 35 },
    images: ['/placeholder.jpg'],
    ratings: {
      overall: 4.7,
      comfort: 4.8,
      punctuality: 4.6,
      service: 4.7,
      cleanliness: 4.9,
      totalReviews: 89
    },
    isDirect: false,
    recurring: {
      frequency: 'Diario',
      nextDates: ['2025-07-21', '2025-07-22', '2025-07-23']
    },
    updatedAt: '2025-07-16T08:45:00'
  }
];

// Convertir buses a formato RowData para SearchWithFilters
const convertBusesToRowData = (buses: BusTrip[]) => {
  return buses.map(bus => ({
    id: bus.id,
    title: `${bus.origin.city} → ${bus.destination.city}`,
    descMain: bus.operator.name,
    descSub: `${bus.durationMinutes} min • ${bus.stops.length === 0 ? 'Directo' : `${bus.stops.length} parada${bus.stops.length > 1 ? 's' : ''}`}`,
    price: bus.prices[0]?.price || 0,
    currency: bus.prices[0]?.currency || 'DOP',
    rating: bus.ratings?.overall || 0,
    reviews: bus.ratings?.totalReviews || 0,
    availability: bus.availability.seatsAvailable,
    operator: bus.operator.name,
    departureTime: bus.origin.departureDateTime,
    arrivalTime: bus.destination.arrivalDateTime,
    duration: bus.durationMinutes,
    stops: bus.stops.length,
    amenities: Object.values(bus.amenities).filter(Boolean).length,
    busClass: bus.prices.map(p => p.class).join(', '),
    busData: bus
  }));
};

const BusesResultsTemplate: React.FC<BusesResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  busData,
  onClassSelect
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook de paginación
  const {
    visibleItems: visibleBuses,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: 3,
    itemsPerStep: 3,
    totalItems: rows.length
  });

  // Configuración del data source para búsqueda
  const dataSourcesBuses = useMemo(() => [
    {
      id: "buses",
      label: "Buses",
      icon: <Bus className="h-4 w-4" />,
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
      label: "Buscar buses",
      placeholder: filterDefaults.search || "Buscar por ruta, operador...",
      dataSources: dataSourcesBuses,
      defaultValue: filterDefaults.search || "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron buses",
      searchPlaceholder: "Escribe para buscar buses..."
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
      min: 300,
      max: 1000,
      step: 25,
      currency: "DOP",
      defaultValue: filterDefaults.priceRange || [300, 1000]
    },
    { id: "separator-3", type: "separator" },
    {
      id: "operators",
      type: "checkbox",
      label: "Operadores",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más operadores",
      showLessText: "Ver menos",
      defaultValue: filterDefaults.operators || []
    },
    { id: "separator-4", type: "separator" },
    {
      id: "departureTime",
      type: "toggle",
      label: "Horario de salida",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
      maxSelections: 4,
      defaultValue: filterDefaults.departureTime || []
    },
    { id: "separator-5", type: "separator" },
    {
      id: "stops",
      type: "radio",
      label: "Paradas",
      defaultValue: filterDefaults.stops?.[0] || ""
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
      id: "duration",
      type: "toggle",
      label: "Duración del viaje",
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
    { id: "separator-8", type: "separator" },
    {
      id: "busClass",
      type: "radio",
      label: "Clase de bus",
      defaultValue: filterDefaults.busClass || ""
    }
  ], [dataSourcesBuses, filterDefaults]);

  // Opciones de filtros
  const filterOptions: { [filterId: string]: GenericFilterOption[] } = useMemo(() => ({
    popularFilters: [
      { value: 'wifi', label: 'WiFi gratis', count: 12 },
      { value: 'directo', label: 'Viaje directo', count: 8 },
      { value: 'premium', label: 'Clase premium', count: 6 },
      { value: 'baño', label: 'Baño a bordo', count: 15 },
      { value: 'reembolsable', label: 'Reembolsable', count: 9 },
      { value: 'comida', label: 'Comida incluida', count: 4 }
    ],
    operators: [
      { value: 'caribe-tours', label: 'Caribe Tours', count: 8 },
      { value: 'metro-bus', label: 'Metro Bus', count: 6 },
      { value: 'expreso-bavaro', label: 'Expreso Bávaro', count: 4 },
      { value: 'bavaro-express', label: 'Bávaro Express', count: 3 },
      { value: 'transporte-del-cibao', label: 'Transporte del Cibao', count: 5 }
    ],
    departureTime: [
      { value: 'madrugada', label: '00:00 - 06:00', icon: <Clock className="w-4 h-4" /> },
      { value: 'mañana', label: '06:00 - 12:00', icon: <Clock className="w-4 h-4" /> },
      { value: 'tarde', label: '12:00 - 18:00', icon: <Clock className="w-4 h-4" /> },
      { value: 'noche', label: '18:00 - 00:00', icon: <Clock className="w-4 h-4" /> }
    ],
    stops: [
      { value: 'directo', label: 'Directo (sin paradas)', count: 8 },
      { value: '1-parada', label: '1 parada', count: 12 },
      { value: '2-paradas', label: '2+ paradas', count: 6 }
    ],
    amenities: [
      { value: 'wifi', label: 'WiFi', count: 18 },
      { value: 'ac', label: 'Aire acondicionado', count: 20 },
      { value: 'usb', label: 'Puertos USB', count: 16 },
      { value: 'baño', label: 'Baño a bordo', count: 15 },
      { value: 'reclinable', label: 'Asientos reclinables', count: 14 },
      { value: 'entretenimiento', label: 'Entretenimiento', count: 8 },
      { value: 'luz-lectura', label: 'Luz de lectura', count: 12 },
      { value: 'gps', label: 'Rastreo GPS', count: 10 }
    ],
    duration: [
      { value: 'corto', label: 'Menos de 3h', icon: <Clock className="w-4 h-4" /> },
      { value: 'medio', label: '3h - 5h', icon: <Clock className="w-4 h-4" /> },
      { value: 'largo', label: '5h - 8h', icon: <Clock className="w-4 h-4" /> },
      { value: 'muy-largo', label: 'Más de 8h', icon: <Clock className="w-4 h-4" /> }
    ],
    busClass: [
      { value: 'economica', label: 'Económica', count: 15 },
      { value: 'premium', label: 'Premium', count: 8 },
      { value: 'vip', label: 'VIP', count: 4 }
    ]
  }), []);

  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'price-asc', label: 'Precio: menor a mayor' },
    { key: 'price-desc', label: 'Precio: mayor a menor' },
    { key: 'duration-asc', label: 'Duración: menor a mayor' },
    { key: 'departure-asc', label: 'Horario de salida' },
    { key: 'rating-desc', label: 'Mejor calificados' },
    { key: 'availability-desc', label: 'Más disponibilidad' }
  ];

  // Simular carga de datos
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const dataToUse = busData || mockBusData;
      const convertedData = convertBusesToRowData(dataToUse);
      setRows(convertedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [busData]);

  // Handler para click en tarjeta
  const handleCardClick = (idx: number, row: any) => {
    console.log('Bus seleccionado:', row);
    onCardClick?.(idx, row);
  };

  // Renderizar resultados de buses
  const renderBusResults = ({ filteredRows, compareMode, onCardClick }: any) => {
    const busesToShow = filteredRows.slice(0, visibleBuses);
    
    return (
      <div className="space-y-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
            </div>
          ))
        ) : busesToShow.length > 0 ? (
          <>
            {busesToShow.map((row: any, index: number) => (
              <CustomBusCard
                key={row.id}
                busTrip={row.busData}
                onClick={() => handleCardClick(index, row)}
                onClassSelect={onClassSelect}
              />
            ))}
            
            {/* Componente de paginación */}
            {filteredRows.length > 3 && (
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleBuses}
                initialVisibleItems={3}
                itemsPerStep={3}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="buses"
                showMoreText="Ver más buses"
                showLessText="Ver menos buses"
                allItemsMessage="Has visto todos los buses disponibles"
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Bus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron buses
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
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <div className={className}>
      <SearchWithFilters
        rows={rows}
        filters={filtersConfig}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        renderResults={renderBusResults}
        onCardClick={handleCardClick}
        onFiltersChange={onFiltersChange}
        searchPlaceholder="Buscar buses por ruta, operador..."
        noResultsMessage="No se encontraron buses que coincidan con tu búsqueda"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar por"
        resultsCountText={(count) => `${count}+ buses disponibles`}
        showToggleShowFilters= {true}
      />
    </div>
    </Suspense>
  );
};

export default BusesResultsTemplate;