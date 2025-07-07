// File: asfales-web-frontend/components/lodging-search/LodgingResultsTemplate.tsx

"use client";
import { Lodging } from "@/types/lodging.types";
import { RowData } from "../shared/RenderFields";
import LodgingCardList from "./LodgingCard";
import { fetchLodgings } from "@/services/lodging.service";
import { useEffect, useRef, useState } from "react";
import EventDrivenProgress, {
  EventDrivenProgressRef,
} from "@/components/shared/EventDrivenProgress";
import React from "react";
import { CustomSelectOption } from "../shared/CustomSelect";
import { AirVent, Bath, Bus, Car, Dices, Dumbbell, MapPin, Mountain, Phone, Utensils, WashingMachine, Waves, Wifi, Building2, LandPlot } from "lucide-react";
import { CheckboxOption } from  "../shared/standard-fields-component/CheckboxFilter";
import SearchWithFilters from "../shared/SearchWithFilters";
import { AdItem } from "../shared/Ads";

// Datos de ejemplo para los anuncios
const travelAds: AdItem[] = [
  {
    id: "premium-hotels",
    src: "https://tpc.googlesyndication.com/simgad/7006773931942455307?",
    alt: "Hoteles Premium - Reserva Directa",
    href: "https://premium-hotels.com/ofertas-especiales",
    title: "Hoteles de lujo con descuentos exclusivos - Hasta 40% OFF",
    height: 600, // Solo height para layout columna
    width: 160, // Solo width para layout columna
  },
  {
    id: "airline-deals",
    src: "https://tpc.googlesyndication.com/simgad/12562425310683427121?",
    alt: "Precios Increíbles",
    href: "https://airline-deals.com/promociones-vuelos",
    title: "Vuelos nacionales e internacionales desde $199",
    height: 600, // Solo height para layout columna
    width: 160, // Solo width para layout columna
  },
  {
    id: "vacation-packages",
    src: "https://tpc.googlesyndication.com/simgad/8989349070575090120?",
    alt: "Paquetes RIU Vacacionales Todo Incluido",
    href: "https://vacation-packages.com/ofertas-caribe-riu",
    title: "Paquetes todo incluido al Caribe - 7 días desde $899",
    height: 600, // Solo height para layout columna
    width: 160, // Solo width para layout columna
  },
  {
    id: "zemi-beach-house",
    src: "https://tpc.googlesyndication.com/simgad/13847073648655381401?",
    alt: "Ahorra hasta 40%",
    href: "https://tpc.googlesyndication.com/simgad/13847073648655381401?",
    title: "Zemi Miches - All inclusive Resort",
    height: 600, // Solo height para layout columna
    width: 160, // Solo width para layout columna
  },
  {
    id: "fake-ad-1",
    src: "https://placehold.co/160x660?text=Ad+160x660",
    alt: "Fake ad",
    href: "https://placehold.co/160x660?text=Ad+160x660",
    title: "fake ad", height: 660, width: 150
  },
  {
    id: "fake-ad-2",
    src: "https://placehold.co/160x600?text=Ad+160x600",
    alt: "Fake ad",
    href: "https://placehold.co/160x600?text=Ad+160x600",
    title: "fake ad", height: 600, width: 150
  },

];

// Opciones para calificación de huéspedes - moved outside component as regular constant
const guestRatingOptions = [
  {
    value: "wonderful",
    label: "Excelente 9+",
    count: 154
  },
  {
    value: "very-good",
    label: "Muy bueno 8+",
    count: 272
  },
  {
    value: "good",
    label: "Bueno 7+",
    count: 329
  }
];

// Opciones para calificación por estrellas - moved outside component as regular constant
const starRatingOptions: CheckboxOption[] = [
  { value: "5-stars", label: "5 estrellas", count: 4 },
  { value: "4-stars", label: "4 estrellas", count: 44 },
  { value: "3-stars", label: "3 estrellas", count: 102 },
  { value: "2-stars", label: "2 estrellas", count: 123 },
  { value: "1-star", label: "1 estrella", count: 4 },
];


// Opciones para tipo de pago - moved outside component as regular constant
const paymentTypeOptions: CheckboxOption[] = [
  { value: "reserve-now-pay-later", label: "Reserva ahora, paga después", count: 287 },
];

// Opciones para cancelación de propiedad - moved outside component as regular constant
const cancellationOptions: CheckboxOption[] = [
  { value: "fully-refundable", label: "Propiedad totalmente reembolsable", count: 245 },
];

// Opciones para tipo de propiedad - moved outside component as regular constant
const propertyTypeOptions: CheckboxOption[] = [
  { value: "motel", label: "Motel", count: 23 },
  { value: "hotel", label: "Hotel", count: 209 },
  { value: "resort", label: "Resort", count: 54 },
  { value: "bed-breakfast", label: "Bed & breakfast", count: 1 },
  { value: "guesthouse", label: "Guesthouse", count: 10 },
  { value: "hostel-backpacker", label: "Hostel/Backpacker accommodation", count: 3 },
  { value: "cabin", label: "Cabaña", count: 4 },
  { value: "apartment", label: "Apartamento", count: 68 },
  { value: "private-vacation-home", label: "Casa de vacaciones privada", count: 79 },
  { value: "cottage", label: "Cottage", count: 2 },
  { value: "condo", label: "Condo", count: 10 },
  { value: "aparthotel", label: "Aparthotel", count: 5 },
  { value: "lodge", label: "Lodge", count: 2 },
  { value: "camping", label: "Camping", count: 3 },
  { value: "youth-hostel", label: "Youth Hostel", count: 15 },
    { value: "capsule-hotel", label: "Capsule Hotel", count: 8 },
{value: "boutique-hotel", label: "Boutique Hotel", count: 12 },

];

const amenitiesOptions = [
  {
    value: "pet-friendly",
    label: "Pet friendly",
    icon: <Waves className="w-full h-full" />,
    count: 413
  },
  {
    value: "pool",
    label: "Pool",
    icon: <Waves className="w-full h-full" />,
    count: 105
  },
  {
    value: "hot-tub",
    label: "Hot tub",
    icon: <Bath className="w-full h-full" />,
    count: 67
  },
  {
    value: "wifi",
    label: "Wifi included",
    icon: <Wifi className="w-full h-full" />,
    count: 407
  },
  {
    value: "spa",
    label: "Spa",
    icon: <Bath className="w-full h-full" />,
    count: 13
  },
  {
    value: "gym",
    label: "Gym",
    icon: <Dumbbell className="w-full h-full" />,
    count: 177
  },
  {
    value: "kitchen",
    label: "Kitchen",
    icon: <Utensils className="w-full h-full" />,
    count: 229
  },
  {
    value: "air-conditioned",
    label: "Air conditioned",
    icon: <AirVent className="w-full h-full" />,
    count: 337
  },
  {
    value: "ocean-view",
    label: "Ocean view",
    icon: <Mountain className="w-full h-full" />,
    count: 13
  },
  {
    value: "restaurant",
    label: "Restaurant",
    icon: <Utensils className="w-full h-full" />,
    count: 90
  },
  {
    value: "outdoor-space",
    label: "Outdoor space",
    icon: <MapPin className="w-full h-full" />,
    count: 198
  },
  {
    value: "washer-dryer",
    label: "Washer and dryer",
    icon: <WashingMachine className="w-full h-full" />,
    count: 29
  },
  {
    value: "electric-car",
    label: "Electric car charging station",
    icon: <Car className="w-full h-full" />,
    count: 70
  },
  {
    value: "golf-course",
    label: "Golf course",
    icon: <LandPlot className="w-full h-full" />,
    count: 0,
    disabled: true
  },
  {
    value: "water-park",
    label: "Water park",
    icon: <Waves className="w-full h-full" />,
    count: 7
  },
  {
    value: "airport-shuttle",
    label: "Airport shuttle included",
    icon: <Bus className="w-full h-full" />,
    count: 23
  },
  {
    value: "casino",
    label: "Casino",
    icon: <Dices className="w-full h-full" />,
    count: 1
  },
  {
    value: "cribs",
    label: "Cribs",
    icon: <Phone className="w-full h-full" />,
    count: 127
  }
];

// Opciones para filtros populares - moved outside component as regular constant
const popularFiltersOptions: CheckboxOption[] = [
  { value: "pet-friendly", label: "Se admiten mascotas", count: 413 },
  { value: "all-inclusive", label: "Todo incluido", count: 44 },
  { value: "pool", label: "Piscina", count: 143 },
  { value: "hotel", label: "Hotel", count: 308 },
  { value: "breakfast-included", label: "Desayuno incluido", count: 246 },
  { value: "spa", label: "Spa y bienestar", count: 89 },
  { value: "beach-access", label: "Acceso a la playa", count: 67 },
  { value: "family-friendly", label: "Ideal para familias", count: 201 },
  { value: "business-center", label: "Centro de negocios", count: 156 },
  { value: "fitness-center", label: "Gimnasio", count: 187 },
];

// Ejemplo de opciones:
const sortOptions: CustomSelectOption[] = [
  { key: "recomendado", label: "Recomendado" },
  { key: "precio_menor", label: "Precio: menor a mayor" },
  { key: "precio_mayor", label: "Precio: mayor a menor" },
  { key: "mejor_valorado", label: "Mejor valorados" },
  {
    key: "mayor_descuento",
    label: "Mayor descuento",
    action: () => alert("¡Seleccionaste mayor descuento!"),
  },
];

// Configuración de valores por defecto para filtros
interface FilterDefaults {
  search?: string;
  popularFilters?: string[];
  guestRating?: string;
  priceRange?: [number, number];
  amenities?: string[];
  starRating?: string[];
  paymentType?: string[];
  cancellationOptions?: string[];
  propertyType?: string[];
  // Nuevos para hostels
  roomType?: string[];
  dormSize?: string[];
  hostelAtmosphere?: string;
  // Nuevos para apartments
  stayDuration?: string;
  apartmentSize?: string[];
  includedServices?: string[];
}

interface LodgingResultsTemplateProps {
  // Configuración de valores por defecto para cada filtro
  filterDefaults?: FilterDefaults;
  // Otros props que puedas necesitar en el futuro
  className?: string;
  onFiltersChange?: (filters: Record<string, any>) => void;
  onCardClick?: (idx: number, row: any) => void;
  LodgingData?: RowData[];
  LodgingType?: "hotels-and-resorts" | "hostels-and-guesthouses" | "apartments-and-longstays"; // Tipo de alojamiento (hotels, apartments, etc.)
}

export default function LodgingResultsTemplate({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  LodgingData,
  LodgingType = "hotels-and-resorts", // Por defecto es "hotels"
}: LodgingResultsTemplateProps) {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Configuración del data source para búsqueda de propiedades
  const dataSourcesLodging = React.useMemo(() => [
    {
      id: "hotels",
      label: "Hoteles",
      icon: <Building2 className="h-4 w-4" />,
      type: "hotel" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: rows
    }
  ], [rows]);

  // Filtros específicos por tipo de lodging
  const getFiltersForLodgingType = React.useMemo(() => {
    const baseFilters = [
      {
        id: "search",
        type: "search" as const,
        label: "Buscar",
        placeholder: "Buscar alojamiento...",
        showClearButton: true,
        minSearchLength: 2,
        dataSources: dataSourcesLodging,
        defaultValue: filterDefaults.search
      },
      { id: "separator-1", type: "separator" as const, className: "bg-muted" },
      {
        id: "popular-filters",
        type: "checkbox" as const,
        label: "Filtros populares",
        showCounts: true,
        maxSelections: 10,
        initialVisibleCount: 5,
        showMoreText: "Ver más filtros",
        showLessText: "Ver menos",
        defaultValue: filterDefaults.popularFilters
      },
      { id: "separator-2", type: "separator" as const },
      {
        id: "guest-rating",
        type: "radio" as const,
        label: "Calificación de huéspedes",
        variant: "vertical" as const,
        helperText: "Filtra por calificación promedio",
        defaultValue: filterDefaults.guestRating
      },
      { id: "separator-3", type: "separator" as const },
      {
        id: "price-range",
        type: "range" as const,
        label: "Precio por noche",
        min: 0,
        max: 1000,
        currency: "$",
        step: 10,
        defaultValue: filterDefaults.priceRange
      },
      {
        id: "amenities",
        type: "toggle" as const,
        label: "Amenities",
        type_toggle: "multiple" as const,
        variant: "vertical" as const,
        wrap: true,
        gridCols: "auto" as const,
        containerClassName: "w-full",
        labelClassName: "text-lg font-semibold mb-4",
        toggleGroupClassName: "gap-3",
        toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
        maxSelections: 10,
        defaultValue: filterDefaults.amenities
      },
      { id: "separator-4", type: "separator" as const },
      {
        id: "property-type",
        type: "checkbox" as const,
        label: "Tipo de propiedad",
        showCounts: true,
        maxSelections: 10,
        initialVisibleCount: 8,
        showMoreText: "Ver más",
        showLessText: "Ver menos",
        defaultValue: filterDefaults.propertyType
      }
    ];

    // Filtros específicos por tipo de lodging
    const typeSpecificFilters = [];

    if (LodgingType === "hotels-and-resorts") {
      typeSpecificFilters.push(
        { id: "separator-5", type: "separator" as const },
        {
          id: "star-rating",
          type: "checkbox" as const,
          label: "Calificación por estrellas",
          showCounts: true,
          maxSelections: 5,
          initialVisibleCount: 5,
          showMoreText: "Ver más",
          showLessText: "Ver menos",
          defaultValue: filterDefaults.starRating
        },
        { id: "separator-6", type: "separator" as const },
        {
          id: "payment-type",
          type: "checkbox" as const,
          label: "Tipo de pago",
          showCounts: true,
          maxSelections: 1,
          initialVisibleCount: 1,
          defaultValue: filterDefaults.paymentType
        },
        { id: "separator-7", type: "separator" as const },
        {
          id: "cancellation-options",
          type: "checkbox" as const,
          label: "Opciones de cancelación",
          showCounts: true,
          maxSelections: 1,
          initialVisibleCount: 1,
          defaultValue: filterDefaults.cancellationOptions
        }
      );
    } else if (LodgingType === "hostels-and-guesthouses") {
      typeSpecificFilters.push(
        { id: "separator-5", type: "separator" as const },
        {
          id: "room-type",
          type: "checkbox" as const,
          label: "Tipo de habitación",
          showCounts: true,
          maxSelections: 5,
          initialVisibleCount: 5,
          showMoreText: "Ver más",
          showLessText: "Ver menos",
          defaultValue: filterDefaults.roomType
        },
        { id: "separator-6", type: "separator" as const },
        {
          id: "dorm-size",
          type: "checkbox" as const,
          label: "Tamaño de dormitorio",
          showCounts: true,
          maxSelections: 4,
          initialVisibleCount: 4,
          defaultValue: filterDefaults.dormSize
        },
        { id: "separator-7", type: "separator" as const },
        {
          id: "hostel-atmosphere",
          type: "radio" as const,
          label: "Ambiente del hostel",
          variant: "vertical" as const,
          helperText: "Filtra por tipo de ambiente",
          defaultValue: filterDefaults.hostelAtmosphere
        }
      );
    } else if (LodgingType === "apartments-and-longstays") {
      typeSpecificFilters.push(
        { id: "separator-5", type: "separator" as const },
        {
          id: "stay-duration",
          type: "radio" as const,
          label: "Duración de estadía",
          variant: "vertical" as const,
          helperText: "Filtra por duración mínima",
          defaultValue: filterDefaults.stayDuration
        },
        { id: "separator-6", type: "separator" as const },
        {
          id: "apartment-size",
          type: "checkbox" as const,
          label: "Tamaño del apartamento",
          showCounts: true,
          maxSelections: 4,
          initialVisibleCount: 4,
          defaultValue: filterDefaults.apartmentSize
        },
        { id: "separator-7", type: "separator" as const },
        {
          id: "included-services",
          type: "checkbox" as const,
          label: "Servicios incluidos",
          showCounts: true,
          maxSelections: 6,
          initialVisibleCount: 5,
          showMoreText: "Ver más",
          showLessText: "Ver menos",
          defaultValue: filterDefaults.includedServices
        }
      );
    }

    return [...baseFilters, ...typeSpecificFilters];
  }, [dataSourcesLodging, filterDefaults, LodgingType]);

  // Actualizar el precio rango según el tipo
  const getPriceRangeForType = React.useMemo(() => {
    if (LodgingType === "hostels-and-guesthouses") {
      return { min: 5, max: 80, step: 5 };
    } else if (LodgingType === "apartments-and-longstays") {
      return { min: 50, max: 500, step: 10 };
    }
    return { min: 0, max: 1000, step: 10 };
  }, [LodgingType]);

  // Aplicar configuración de precio dinámico a los filtros
  const filters = React.useMemo(() => {
    return getFiltersForLodgingType.map(filter => {
      if (filter.id === "price-range") {
        const priceConfig = getPriceRangeForType;
        return { ...filter, ...priceConfig };
      }
      return filter;
    });
  }, [getFiltersForLodgingType, getPriceRangeForType]);

  // Opciones específicas por tipo de lodging
  const getFilterOptionsForLodgingType = React.useMemo(() => {
    const baseOptions = {
      "popular-filters": getPopularFiltersForType(LodgingType),
      "guest-rating": guestRatingOptions.map(opt => ({
        value: opt.value,
        label: opt.label,
        count: opt.count
      })),
      "amenities": getAmenitiesForType(LodgingType),
      "property-type": getPropertyTypesForType(LodgingType)
    };

    // Opciones específicas por tipo
    if (LodgingType === "hotels-and-resorts") {
      return {
        ...baseOptions,
        "star-rating": starRatingOptions.map(opt => ({
          value: opt.value,
          label: opt.label,
          count: opt.count
        })),
        "payment-type": paymentTypeOptions.map(opt => ({
          value: opt.value,
          label: opt.label,
          count: opt.count
        })),
        "cancellation-options": cancellationOptions.map(opt => ({
          value: opt.value,
          label: opt.label,
          count: opt.count
        }))
      };
    } else if (LodgingType === "hostels-and-guesthouses") {
      return {
        ...baseOptions,
        "room-type": [
          { value: "mixed-dorm", label: "Mixed Dormitory", count: 180 },
          { value: "female-dorm", label: "Female-only Dorm", count: 85 },
          { value: "male-dorm", label: "Male-only Dorm", count: 65 },
          { value: "private-room", label: "Private Room", count: 95 },
          { value: "ensuite-private", label: "Private with Ensuite", count: 45 }
        ],
        "dorm-size": [
          { value: "4-bed", label: "4-bed dorm", count: 45 },
          { value: "6-bed", label: "6-bed dorm", count: 85 },
          { value: "8-bed", label: "8-bed dorm", count: 120 },
          { value: "10-plus-bed", label: "10+ bed dorm", count: 75 }
        ],
        "hostel-atmosphere": [
          { value: "party", label: "Party Hostel", count: 45 },
          { value: "quiet", label: "Quiet/Chill", count: 65 },
          { value: "social", label: "Social", count: 120 },
          { value: "business", label: "Business Travelers", count: 35 }
        ]
      };
    } else if (LodgingType === "apartments-and-longstays") {
      return {
        ...baseOptions,
        "stay-duration": [
          { value: "weekly", label: "1+ semana", count: 250 },
          { value: "monthly", label: "1+ mes", count: 180 },
          { value: "quarterly", label: "3+ meses", count: 120 },
          { value: "long-term", label: "6+ meses", count: 85 }
        ],
        "apartment-size": [
          { value: "studio", label: "Studio (< 500 sq ft)", count: 95 },
          { value: "small", label: "Small (500-800 sq ft)", count: 120 },
          { value: "medium", label: "Medium (800-1200 sq ft)", count: 150 },
          { value: "large", label: "Large (1200+ sq ft)", count: 85 }
        ],
        "included-services": [
          { value: "utilities", label: "Utilities", count: 180 },
          { value: "internet", label: "Internet", count: 320 },
          { value: "housekeeping", label: "Housekeeping", count: 120 },
          { value: "maintenance", label: "Maintenance", count: 200 },
          { value: "linen-change", label: "Linen Change", count: 95 },
          { value: "concierge", label: "Concierge Service", count: 80 }
        ]
      };
    }

    return baseOptions;
  }, [LodgingType]);

  // Dispara la barra de progreso siempre que loading sea distinto de false
  useEffect(() => {
    if (loading !== false) {
      setTimeout(() => {
        progressRef.current?.start();
      }, 0);
    } else {
      progressRef.current?.finish();
    }
  }, [loading]);

  // Solo para DEMO: simula una carga lenta
  useEffect(() => {
           setLoading(true);
    if (LodgingData && LodgingData.length > 0) {
      setTimeout(() => {
        setLoading(false);
        setRows(LodgingData);
      }, 2000);
    }else {
    fetchLodgings()
      .then((apiData) => setRows(apiData.map(mapLodgingToRowData)))
      .finally(() => setLoading(false));
    }
  }, []);

  if (loading)
    return <EventDrivenProgress ref={progressRef} className="w-full my-4 px-0 md:px-0" />;

  return (
    <div className={className}>
      <SearchWithFilters
        rows={rows}
        // Nueva API genérica - usando filtros dinámicos
        filters={filters}
        filterOptions={getFilterOptionsForLodgingType}
        // Configuración
        sortOptions={sortOptions}
        enableCompareMode={true}
        compareConfig={{
          titleOff: "Comparar propiedades",
          subtitleOff: "Obtén una vista lado a lado de hasta 5 propiedades",
          titleOn: "Comparando propiedades",
          subtitleOn: "Selecciona propiedades para comparar lado a lado"
        }}
        ads={travelAds} // Anuncios de ejemplo
        adsGap={4} // Espacio entre anuncios (space-y-4 para col)
        adsDirection="col" // Dirección columna: width=full, height=individual
        showAds={true} // Mostrar anuncios
        adsContainerClassName="hidden xl:block flex-shrink-0 w-[12%]" // Clase para el contenedor de anuncios

        // Textos personalizables
        searchPlaceholder="Buscar alojamiento..."
        noResultsMessage="No se encontraron propiedades"
        clearFiltersText="Limpiar filtros"
        sortByText="Ordenar por"
        howItWorksText="¿Cómo funciona nuestro orden?"
        resultsCountText={(count) => `${count}+ alojamientos`}
        renderResults={({ filteredRows, compareMode, onCardClick: internalOnCardClick }) => (
          <LodgingCardList
            onCardClick={onCardClick || internalOnCardClick}
            rows={filteredRows}
            showCompareCheckbox={compareMode}
            initialVisibleCards={6}
            cardsPerStep={6}
            showMoreLabel="Mostrar más alojamientos"
            showLessLabel="Mostrar menos"
            enableShowLess={true}
          />
        )}
        onCardClick={onCardClick || ((idx, row) => alert(`¡Click en card #${idx}: ${row.title}!`))}
        onFiltersChange={onFiltersChange || ((filters) => console.log("Filters changed:", filters))}
      />
    </div>
  );
}

// Funciones auxiliares para obtener opciones específicas por tipo
function getPopularFiltersForType(lodgingType: string): CheckboxOption[] {
  if (lodgingType === "hostels-and-guesthouses") {
    return [
      { value: "budget-friendly", label: "Budget Friendly", count: 380 },
      { value: "central-location", label: "Central Location", count: 245 },
      { value: "free-wifi", label: "Free WiFi", count: 407 },
      { value: "shared-kitchen", label: "Shared Kitchen", count: 229 },
      { value: "female-dorms", label: "Female-only Dorms", count: 85 },
      { value: "party-hostel", label: "Party Hostel", count: 45 },
      { value: "quiet-hostel", label: "Quiet Hostel", count: 65 },
      { value: "backpacker-friendly", label: "Backpacker Friendly", count: 201 },
      { value: "luggage-storage", label: "Luggage Storage", count: 350 },
      { value: "24-hour-reception", label: "24-hour Reception", count: 180 }
    ];
  } else if (lodgingType === "apartments-and-longstays") {
    return [
      { value: "monthly-discounts", label: "Monthly Discounts", count: 180 },
      { value: "weekly-discounts", label: "Weekly Discounts", count: 220 },
      { value: "flexible-cancellation", label: "Flexible Cancellation", count: 150 },
      { value: "furnished", label: "Fully Furnished", count: 290 },
      { value: "full-kitchen", label: "Full Kitchen", count: 320 },
      { value: "washer-dryer", label: "Washer/Dryer", count: 285 },
      { value: "workspace", label: "Workspace", count: 250 },
      { value: "parking", label: "Parking Included", count: 220 },
      { value: "pet-friendly", label: "Pet Friendly", count: 160 },
      { value: "utilities-included", label: "Utilities Included", count: 180 }
    ];
  }
  
  // Default para hotels-and-resorts
  return popularFiltersOptions;
}

function getAmenitiesForType(lodgingType: string): any[] {
  if (lodgingType === "hostels-and-guesthouses") {
    return [
      { value: "wifi", label: "Free WiFi", icon: <Wifi className="w-full h-full" />, count: 407 },
      { value: "shared-kitchen", label: "Shared Kitchen", icon: <Utensils className="w-full h-full" />, count: 229 },
      { value: "shared-bathroom", label: "Shared Bathroom", icon: <Bath className="w-full h-full" />, count: 180 },
      { value: "private-bathroom", label: "Private Bathroom", icon: <Bath className="w-full h-full" />, count: 95 },
      { value: "luggage-storage", label: "Luggage Storage", icon: <MapPin className="w-full h-full" />, count: 350 },
      { value: "laundry-facilities", label: "Laundry Facilities", icon: <WashingMachine className="w-full h-full" />, count: 285 },
      { value: "common-area", label: "Common Area/Lounge", icon: <MapPin className="w-full h-full" />, count: 320 },
      { value: "24-hour-reception", label: "24-hour Reception", icon: <Phone className="w-full h-full" />, count: 180 },
      { value: "lockers", label: "Lockers", icon: <Phone className="w-full h-full" />, count: 290 },
      { value: "air-conditioned", label: "Air Conditioning", icon: <AirVent className="w-full h-full" />, count: 120 },
      { value: "female-dorms", label: "Female-only Dorms", icon: <Building2 className="w-full h-full" />, count: 85 },
      { value: "breakfast-included", label: "Breakfast Included", icon: <Utensils className="w-full h-full" />, count: 150 }
    ];
  } else if (lodgingType === "apartments-and-longstays") {
    return [
      { value: "full-kitchen", label: "Full Kitchen", icon: <Utensils className="w-full h-full" />, count: 320 },
      { value: "washer-dryer", label: "Washer/Dryer in Unit", icon: <WashingMachine className="w-full h-full" />, count: 285 },
      { value: "wifi", label: "Free WiFi", icon: <Wifi className="w-full h-full" />, count: 407 },
      { value: "air-conditioned", label: "Air Conditioning", icon: <AirVent className="w-full h-full" />, count: 337 },
      { value: "workspace", label: "Workspace/Office Area", icon: <MapPin className="w-full h-full" />, count: 250 },
      { value: "parking", label: "Parking Included", icon: <Car className="w-full h-full" />, count: 220 },
      { value: "balcony-terrace", label: "Balcony/Terrace", icon: <Mountain className="w-full h-full" />, count: 180 },
      { value: "dishwasher", label: "Dishwasher", icon: <Utensils className="w-full h-full" />, count: 200 },
      { value: "elevator", label: "Elevator", icon: <Building2 className="w-full h-full" />, count: 150 },
      { value: "building-gym", label: "Building Gym", icon: <Dumbbell className="w-full h-full" />, count: 120 },
      { value: "building-pool", label: "Building Pool", icon: <Waves className="w-full h-full" />, count: 95 },
      { value: "furnished", label: "Fully Furnished", icon: <Building2 className="w-full h-full" />, count: 290 },
      { value: "pets-allowed", label: "Pets Allowed", icon: <Building2 className="w-full h-full" />, count: 160 }
    ];
  }
  
  // Default para hotels-and-resorts
  return amenitiesOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count,
    icon: opt.icon,
    disabled: opt.disabled
  }));
}

function getPropertyTypesForType(lodgingType: string): CheckboxOption[] {
  if (lodgingType === "hostels-and-guesthouses") {
    return [
      { value: "hostel-backpacker", label: "Hostel/Backpacker accommodation", count: 45 },
      { value: "guesthouse", label: "Guesthouse", count: 32 },
      { value: "bed-breakfast", label: "Bed & breakfast", count: 18 },
      { value: "budget-hotel", label: "Budget Hotel", count: 25 },
      { value: "capsule-hotel", label: "Capsule Hotel", count: 8 },
      { value: "youth-hostel", label: "Youth Hostel", count: 15 }
    ];
  } else if (lodgingType === "apartments-and-longstays") {
    return [
      { value: "apartment", label: "Apartment", count: 180 },
      { value: "studio", label: "Studio", count: 95 },
      { value: "one-bedroom", label: "1 Bedroom", count: 150 },
      { value: "two-bedroom", label: "2 Bedroom", count: 120 },
      { value: "three-bedroom", label: "3+ Bedroom", count: 85 },
      { value: "serviced-apartment", label: "Serviced Apartment", count: 75 },
      { value: "extended-stay", label: "Extended Stay", count: 65 },
      { value: "corporate-housing", label: "Corporate Housing", count: 35 },
      { value: "loft", label: "Loft", count: 40 },
      { value: "penthouse", label: "Penthouse", count: 25 }
    ];
  }
  
  // Default para hotels-and-resorts
  return propertyTypeOptions;
}

// ...resto del código permanece igual
export function mapLodgingToRowData(lodging: Lodging): RowData {
  return {
    title: lodging.lodgingName,
    images: [
      lodging.image1,
      lodging.image2,
      lodging.image3,
      lodging.image4,
    ].filter(Boolean),
    feature1: lodging.feature1,
    feature2: lodging.feature1,
    descMain: lodging.descMain,
    descSub: lodging.descSub,
    refundable: lodging.refundable,
    reserveNow: lodging.reserveNow,
    beforePrice: { currency: "USD", value: lodging.beforePrice },
    afterPrice: { currency: "USD", value: lodging.priceTotal },
    nightlyPrice: { currency: "USD", value: lodging.nightlyPrice },
    badge1: lodging.badge1,
    badge2: lodging.availableBadge,
    badge2ndColumn: lodging.availableBadge,
    isFavorite: false,
    rating: lodging.rating,
    ratingLabel: lodging.ratingLabel,
    ratingCount: lodging.ratingCount,
  };
}
   

