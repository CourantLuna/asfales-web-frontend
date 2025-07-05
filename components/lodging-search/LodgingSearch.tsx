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
import { CheckboxOption } from "../shared/CheckboxFilter";
import SearchWithFilters from "../shared/SearchWithFilters";

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
  { value: "motel", label: "Motel", count: 44 },
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

// Tipos para el sistema de filtros
interface FilterState<T = any> {
  value: T;
  chips: Array<{id: string, label: string, onRemove: () => void}>;
  outputString?: string;
}

interface FilterHandlers<T = any> {
  onChange: (value: T) => void;
  onChipsChange: (chips: Array<{id: string, label: string, onRemove: () => void}>) => void;
  onOutputStringChange?: (outputString: string) => void;
  onReset: () => void;
}

export default function LodgingSearch() {
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
    fetchLodgings()
      .then((apiData) => setRows(apiData.map(mapLodgingToRowData)))
      .finally(() => setLoading(false));
  }, []);




  if (loading)
    return <EventDrivenProgress ref={progressRef} className="w-full my-4 px-0 md:px-0" />;




  return (
    <SearchWithFilters
      rows={rows}
      guestRatingOptions={guestRatingOptions}
      starRatingOptions={starRatingOptions}
      paymentTypeOptions={paymentTypeOptions}
      cancellationOptions={cancellationOptions}
      propertyTypeOptions={propertyTypeOptions}
      amenitiesOptions={amenitiesOptions}
      popularFiltersOptions={popularFiltersOptions}
      sortOptions={sortOptions}
      dataSources={dataSourcesLodging}
      priceRange={{ min: 0, max: 1000, step: 10 }}
      currency="$"
      enableCompareMode={true}
      compareConfig={{
        titleOff: "Comparar propiedades",
        subtitleOff: "Obtén una vista lado a lado de hasta 5 propiedades",
        titleOn: "Comparando propiedades",
        subtitleOn: "Selecciona propiedades para comparar lado a lado"
      }}
      searchPlaceholder="Buscar alojamiento..."
      noResultsMessage="No se encontraron propiedades"
      clearFiltersText="Limpiar filtros"
      sortByText="Ordenar por"
      howItWorksText="¿Cómo funciona nuestro orden?"
      resultsCountText={(count) => `${count}+ alojamientos`}
      renderResults={({ filteredRows, compareMode, onCardClick }) => (
        <LodgingCardList
          onCardClick={onCardClick}
          rows={filteredRows}
          showCompareCheckbox={compareMode}
          initialVisibleCards={6}
          cardsPerStep={6}
          showMoreLabel="Mostrar más alojamientos"
          showLessLabel="Mostrar menos"
          enableShowLess={true}
        />
      )}
      onCardClick={(idx, row) => alert(`¡Click en card #${idx}: ${row.title}!`)}
      onFiltersChange={(filters) => console.log("Filters changed:", filters)}
    />
  );
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
   

