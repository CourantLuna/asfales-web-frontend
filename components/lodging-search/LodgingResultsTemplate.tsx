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
import { LodgingResultsTemplateProps } from "@/lib/data/lodging-types";
import { createDataSourcesLodging } from "@/lib/data/lodging-config";
import { getFilterOptionsForLodgingType, getFiltersForLodgingType, getPriceRangeForType } from "@/lib/data/lodging-utils";

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
    id: "viva-take-off",
    src: "https://tpc.googlesyndication.com/simgad/3719967787830508080?",
    alt: "Vacaciones de ensueño",
    href: "https://tpc.googlesyndication.com/simgad/3719967787830508080?",
    title: "Viva Take-off ",
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
    id: "fake-ad-3",
    src: "https://tpc.googlesyndication.com/simgad/10478692533147659811?",
    alt: "Fake ad",
    href: "https://placehold.co/160x600?text=Ad+160x600",
    title: "Viaja por colombia", height: 600, width: 150
  }


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



export default function LodgingResultsTemplate({
  filterDefaults = {},
  className,
  onFiltersChange,
  onCardClick,
  LodgingData,
  LodgingType, // Por defecto es "hotels"
}: LodgingResultsTemplateProps) {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const progressRef = useRef<EventDrivenProgressRef>(null);

  // Configuración del data source para búsqueda de propiedades
  const dataSourcesLodging = React.useMemo(() => {
   return createDataSourcesLodging(rows)
}, [rows]);

  // Filtros específicos por tipo de lodging
  const getFiltersForLodgingTypeLocal = React.useMemo(() => {
    return getFiltersForLodgingType(LodgingType || "hotels-and-resorts", filterDefaults, dataSourcesLodging);
  }, [dataSourcesLodging, filterDefaults, LodgingType]);

  // Actualizar el precio rango según el tipo
  const getPriceRangeForTypeLocal = React.useMemo(() => {
    return getPriceRangeForType(LodgingType || "hotels-and-resorts"); 
  }, [LodgingType]);

  // Aplicar configuración de precio dinámico a los filtros
  const filters = React.useMemo(() => {
    return getFiltersForLodgingTypeLocal.map(filter => {
      if (filter.id === "price-range") {
        const priceConfig = getPriceRangeForTypeLocal;
        return { ...filter, ...priceConfig };
      }
      return filter;
    });
  }, [getFiltersForLodgingTypeLocal, getPriceRangeForTypeLocal]);

  // Opciones específicas por tipo de lodging
  const getFilterOptionsForLodgingTypeLocal = React.useMemo(() => {

     return getFilterOptionsForLodgingType(LodgingType || "hotels-and-resorts")
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

// Efecto separado para manejar cambios en LodgingData
useEffect(() => {
  if (LodgingData && LodgingData.length > 0) {
    setLoading(true);
    setTimeout(() => {     
      setRows(LodgingData);
      setLoading(false);
    }, 1000);
  }
}, [LodgingData]);


  if (loading)
    return <EventDrivenProgress ref={progressRef} className="w-full my-4 px-0 md:px-0" />;

  return (
    <div className={className}>
      <SearchWithFilters
        rows={rows}
        // Nueva API genérica - usando filtros dinámicos
        filters={filters}
        filterOptions={getFilterOptionsForLodgingTypeLocal}
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
        onCardClick={onCardClick || ((idx, row) => alert(`¡Click en card #${idx}: ${row.title} ubicado en ${row.location}!`))}
        onFiltersChange={onFiltersChange || ((filters) => console.log("Filters changed:", filters))}



      />
    </div>
  );
}
