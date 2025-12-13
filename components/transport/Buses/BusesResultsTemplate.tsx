'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '@/components/shared/SearchWithFilters';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import CustomBusCard, { BusTrip } from './CustomBusCard';
import { Bus, Clock, MapPin, Users } from 'lucide-react';
import { TransportStop, TransportTrip } from '../types/transport.types';
import { da, id } from 'date-fns/locale';
import SeatMap from '@/components/shared/SeatMap';
import { useSearchParams } from 'next/navigation';

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
  operatorRating?: string;
}

interface BusesResultsTemplateProps {
  filterDefaults?: FilterDefaults;
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  busData?: BusTrip[];
  onClassSelect?: (tripId: string, classType: string) => void;
}

// // Convertir buses a formato RowData para SearchWithFilters
// const convertBusesToRowData = (buses: TransportTrip[]) => {
//   return buses.map(bus => ({
//     id: bus.id,
//     title: `${bus.origin.city} → ${bus.destination.city}`,
//     descMain: bus.operator.name,
//     descSub: `${bus.durationMinutes} min • ${bus.stops.length === 0 ? 'Directo' : `${bus.stops.length} parada${bus.stops.length > 1 ? 's' : ''}`}`,
//     price: bus.prices[0]?.price || 0,
//     currency: bus.prices[0]?.currency || 'DOP',
//     rating: bus.ratings?.overall || 0,
//     reviews: bus.ratings?.totalReviews || 0,
//     availability: bus.availability.seatsAvailable,
//     operator: bus.operator.name,
//     departureTime: bus.origin.departureDateTime,
//     arrivalTime: bus.destination.arrivalDateTime,
//     duration: bus.durationMinutes,
//     stops: bus.stops.length,
//     amenities: Object.values(bus.amenities).filter(Boolean).length,
//     busClass: bus.prices.map(p => p.class).join(', '),
//     busData: bus
//   }));
// };

const BusesResultsTemplate: React.FC<BusesResultsTemplateProps> = ({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  busData,
  onClassSelect
}) => {
const [rows, setRows] = useState<any[]>([]); // datos originales

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
      nameValueField: "id",
      nameDescriptionField: "descSub",
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
    // {
    //   id: "popularFilters",
    //   type: "checkbox",
    //   label: "Filtros populares",
    //   showCounts: true,
    //   maxSelections: 5,
    //   initialVisibleCount: 6,
    //   showMoreText: "Ver más filtros",
    //   showLessText: "Ver menos",
    //   defaultValue: filterDefaults.popularFilters || []
    // },
    // { id: "separator-2", type: "separator" },
    {
      id: "operators",
      type: "checkbox",
      label: "Operadores",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más operadores",
      showLessText: "Ver menos",
      keyname: "operator.name",
      defaultValue: filterDefaults.operators || []
    },
    { id: "separator-4", type: "separator" },
    {
      id: "priceRange",
      type: "range",
      label: "Rango de precio",
      min: 0,
      max: 1000,
      step: 25,
      currency: "DOP",
      defaultValue: filterDefaults.priceRange || [0, 1000],
      keyname: "prices.0.price"
    },
    { id: "separator-3", type: "separator" },
    
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
      defaultValue: filterDefaults.departureTime || [],
      keyname: "departureTime"
    },
    { id: "separator-5", type: "separator" },
    {
      id: "stops",
      type: "radio",
      label: "Paradas",
      keyname: "counterStops",
      defaultValue: filterDefaults.stops?.[0] || ""
    },
    { id: "separator-6", type: "separator" },
    {
      id: "amenities",
      keyname: "amenities",
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
      defaultValue: filterDefaults.duration || [],
      keyname: "durationTime"
    },
    { id: "separator-8", type: "separator" },
    {
      id: "busClass",
      type: "radio",
      label: "Clase de bus",
      defaultValue: filterDefaults.busClass || "",
      keyname: "classesAvailable"
    },
    { id: "separator-9", type: "separator" },
    {
      id: "operatorRating",
      type: "checkbox",
      label: "Calificación del operador",
      defaultValue: filterDefaults.operatorRating || "",
      keyname: "operatorRatingLabel"
    }
  ], [dataSourcesBuses, filterDefaults]);


  const dynamicFilterValues = useMemo(() => {
  if (!rows || rows.length === 0) {
    return {
      operators: [],
      departureTimes: []
    };
  }

  // Operadores únicos
  const operatorsMap: Record<string, number> = {};


  rows.forEach(bus => {
    // OPERADORES
    const op = bus.operator?.name;
    if (op) {
      operatorsMap[op] = (operatorsMap[op] ?? 0) + 1;
    }

    
  });

  return {
    operators: Object.entries(operatorsMap).map(([op, count]) => ({
      value: op,
      label: op,
      count
    }))

   
  };
}, [rows]);


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
   operators: dynamicFilterValues.operators,
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
      { value: 'Económica', label: 'Económica', count: 15 },
      { value: 'Premium', label: 'Premium', count: 8 },
      { value: 'vip', label: 'VIP', count: 4 },
    ],
    operatorRating: [
      { value: "excelente", label: 'Excelente +4.5', count: 15 },
      { value: 'muy bueno', label: 'Muy bueno +4', count: 8 },
      { value: 'bueno', label: 'Bueno +3', count: 4 },
      { value: 'regular', label: 'Regular +2', count: 4 },
      { value: 'basico', label: 'Básico', count: 4 },

    ]
  }), [dynamicFilterValues]);


  // Opciones de ordenamiento
  const sortOptions = [
    { key: 'price-asc', label: 'Precio: menor a mayor' },
    { key: 'price-desc', label: 'Precio: mayor a menor' },
    { key: 'duration-asc', label: 'Duración: menor a mayor' },
    { key: 'departure-asc', label: 'Horario de salida' },
    { key: 'rating-desc', label: 'Mejor calificados' },
    { key: 'availability-desc', label: 'Más disponibilidad' }
  ];

const searchParams = useSearchParams();

const params = {
  from: searchParams.get("from"),
  to: searchParams.get("to"),
  departureDate: searchParams.get("departureDate"),
  returnDate: searchParams.get("returnDate"),
  adults: searchParams.get("adults"),
  showresults: searchParams.get("showresults"),
  transportType: searchParams.get("transportType"),
};
useEffect(() => {
  setLoading(true);

  const safeParse = (val: any) => {
    if (!val) return null;
    try { return JSON.parse(val); } catch { return null; }
  };

  const fetchBusData = async () => {
    try {
      const res = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1qcdbiCekt3GKoaQJGrYbigcL987PNEIklocKq6CuMzA/values/BusProviders!A1:Z?key=AIzaSyDj0h9wnuOB5OyKH4yfgFHB2SG1IKpGrsA"
      );

      const data = await res.json();
      const [header, ...rows] = data.values;

      const buses: TransportTrip[] = rows.map((row: any[]) => {
        const rowObj: Record<string, any> = {};
        header.forEach((key: string, idx: number) => {
          rowObj[key] = row[idx];
        });

        // Parseo seguro
        const stopsArray = safeParse(rowObj.stops) || [];
        const pricesArray = safeParse(rowObj.prices) || [];
        const amenitiesObj = safeParse(rowObj.amenities) || {};
        const seatMap = safeParse(rowObj.seatMap) || [];
        const availability = safeParse(rowObj.availability) || {};
        const policies = safeParse(rowObj.policies) || {};
        const recurring = safeParse(rowObj.recurring) || {};
        const images = safeParse(rowObj.images) || [];
        const ratings = safeParse(rowObj.ratings) || {};

        // Clases
        const classesAvailable = [
          ...new Set(pricesArray.map((p: any) => p.class).filter(Boolean))
        ];

        // Amenities list para filtros
        const amenitiesList = Object.entries(amenitiesObj)
          .filter(([k, v]) => v === true)
          .map(([k]) => k);

        // Derived fields
        const counterStops = translateStopsFilter(stopsArray.length);
        const departureTime = translateTime(rowObj.dateTime_origin);
        const durationTime = translateDuration(parseInt(rowObj.durationMinutes || "0"));
        const priceMin = pricesArray.length
          ? Math.min(...pricesArray.map((p: any) => p.price))
          : 0;

        // Origin & destination stops
        const originStop = safeParse(rowObj.origin) || { stopCode: '', city: '', stopName: '' };
        const destinationStop = safeParse(rowObj.destination) || { stopCode: '', city: '', stopName: '' };


      

        return {
          id: rowObj.id,
          title: `${originStop?.city} → ${destinationStop.city}`,
          descSub: `${rowObj.operatorName} • ${rowObj.durationMinutes/60} h • ${stopsArray.length === 0 ? 'Directo' : `${stopsArray.length} parada${stopsArray.length > 1 ? 's' : ''}`}`,
          operator: {
            id: rowObj.operatorId,
            name: rowObj.operatorName,
            logoUrl: rowObj.operatorLogoUrl,
            rating: rowObj.operatorRating ? parseFloat(rowObj.operatorRating) : undefined,
            contact: {
              phone: rowObj.operatorPhone,
              email: rowObj.operatorEmail,
              website: rowObj.operatorWebsite,
            },
          },
          operatorRatingLabel: translateRatingLabel(rowObj.operatorRating),

          routeId: rowObj.routeCode || undefined,

          /** ESTA ES LA PARTE IMPORTANTE — ANIDADOS */
  origin: {
    stop: originStop || null,
    dateTime: rowObj.dateTime_origin,
  },

  destination: {
    stop: destinationStop || null,
    dateTime: rowObj.dateTime_destination,
  },
          stops: stopsArray,
          durationMinutes: rowObj.durationMinutes ? parseInt(rowObj.durationMinutes) : undefined,
          distanceKm: rowObj.distanceKm ? parseFloat(rowObj.distanceKm) : undefined,
          isDirect: rowObj.isDirect === "true" || rowObj.isDirect === "TRUE",

          prices: pricesArray,
          classesAvailable,

          amenities: amenitiesObj,
          amenitiesList,

          seatMap,
          availability,
          policies,
          recurring,
          images,
          ratings,

          // Derived fields for filters
          counterStops,
          durationTime,
          priceMin,
          departureTime,

          updatedAt: rowObj.updatedAt,
        };
      });

      setRows(buses);
      console.log("✅ Bus data loaded:", buses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching buses", error);
      setLoading(false);
    }
  };

  fetchBusData();
      console.log("Buses to show:", SearchResultRows);

}, []);

const SearchResultRows = useMemo(() => {
  if (!rows || rows.length === 0) return [];

  let filtered = [...rows];

  if (params.from) {
    filtered = filtered.filter(r => r.origin?.stop?.cityCode === params.from);
  }

  if (params.to) {
    filtered = filtered.filter(r => r.destination?.stop?.cityCode === params.to);
  }

  if (params.departureDate) {
    filtered = filtered.filter(r => r.origin?.dateTime?.slice(0, 10) === params.departureDate);
  }

  if (params.returnDate) {
    const returnFlights = rows.filter(r =>
      r.origin?.stop?.stopCode === params.to &&
      r.destination?.stop?.stopCode === params.from &&
      r.origin?.dateTime?.slice(0, 10) === params.returnDate
    );
    filtered = [...filtered, ...returnFlights];
  }

  // Solo rutas con asientos
  filtered = filtered.filter(r => Number(r.availability?.seatsAvailable) > 0);

  // // Si el filtrado queda vacío, mostrar todos los buses
  // if (filtered.length === 0) {
  //   return rows;
  // }

  return filtered;
}, [rows, params]);




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
                busTrip={row}
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
        rows={SearchResultRows? SearchResultRows : rows}
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

function translateTime(datetime: string) {
  if (!datetime) return "";

  // Convertir la fecha ISO en objeto Date
  const dateObj = new Date(datetime);

  // Obtener la hora en formato 0–23
  const hour = dateObj.getHours();

  if (hour >= 6 && hour < 12) return "mañana";
  if (hour >= 12 && hour < 18) return "tarde";
  if (hour >= 18 && hour <= 23) return "noche";
  if (hour >= 0 && hour < 6) return "madrugada";

  return "";
}

function translateDuration(durationMinutes: number): string {
  if (durationMinutes < 180) {
    return "corto"; // Menos de 3 horas
  } else if (durationMinutes >= 180 && durationMinutes < 300) {
    return "medio"; // 3 a 5 horas
  } else if (durationMinutes >= 300 && durationMinutes < 480) {
    return "largo"; // 5 a 8 horas
  } else if (durationMinutes >= 480) {
    return "muy-largo"; // Más de 8 horas
  }
  return "";
}
function translateStopsFilter(stopsLength: number): string {
  if (stopsLength === 0) {
    return "directo";
  } else if (stopsLength === 1) {
    return "1-parada";
  } else {
    return "2-paradas";
  }
}

function translateRatingLabel(rating: string | number | undefined): string {
  if (!rating) return "";
  const ratingNum = typeof rating === "string" ? parseFloat(rating) : rating;
  if (ratingNum >= 4.5) return "excelente";
  if (ratingNum >= 4) return "muy bueno";
  if (ratingNum >= 3) return "bueno";
  if (ratingNum >= 2) return "regular";
  return "basico";
}


