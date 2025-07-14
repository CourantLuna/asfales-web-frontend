import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { CustomSelectOption } from '@/components/shared/CustomSelect';
import { AdItem } from '@/components/shared/Ads';

// Datos de ejemplo para anuncios de vuelos
export const flightAds: AdItem[] = [
  {
    id: "cheap-flights",
    src: "https://tpc.googlesyndication.com/simgad/14018803340569695221?",
    alt: "Vuelos Baratos - Reserva Ahora",
    href: "https://cheapflights.com/ofertas-especiales",
    title: "Vuelos nacionales e internacionales desde $99",
    height: 600,
    width: 160,
  },
  {
    id: "last-minute",
    src: "https://tpc.googlesyndication.com/simgad/12562425310683427121?",
    alt: "Ofertas de Último Minuto",
    href: "https://lastminute.com/vuelos",
    title: "Ofertas de último minuto - Hasta 60% OFF",
    height: 600,
    width: 160,
  },
  {
    id: "premium-airlines",
    src: "https://tpc.googlesyndication.com/simgad/8989349070575090120?",
    alt: "Aerolíneas Premium",
    href: "https://premium-airlines.com/business-class",
    title: "Vuela en Business Class por menos",
    height: 600,
    width: 160,
  }
];


// Opciones de filtros constantes
export const popularFiltersOptions: CheckboxOption[] = [
  { value: "non-stop", label: "Vuelos sin escalas", count: 145 },
  { value: "flexible-dates", label: "Fechas flexibles", count: 89 },
  { value: "baggage-included", label: "Equipaje incluido", count: 203 },
  { value: "morning-departure", label: "Salida matutina", count: 167 },
  { value: "evening-departure", label: "Salida nocturna", count: 134 },
  { value: "refundable", label: "Reembolsable", count: 78 },
  { value: "same-airline", label: "Misma aerolínea", count: 156 },
  { value: "short-layover", label: "Escala corta", count: 98 },
];

export const airlinesOptions: CheckboxOption[] = [
  { value: "arajet", label: "Arajet", count: 45 },
  { value: "copa", label: "Copa Airlines", count: 38 },
  { value: "avianca", label: "Avianca", count: 52 },
  { value: "latam", label: "LATAM", count: 41 },
  { value: "jetblue", label: "JetBlue", count: 29 },
  { value: "spirit", label: "Spirit", count: 33 },
  { value: "american", label: "American Airlines", count: 28 },
  { value: "delta", label: "Delta", count: 24 },
  { value: "iberia", label: "Iberia", count: 18 },
  { value: "air-europa", label: "Air Europa", count: 15 },
];

// Tipo para opciones con iconos
export interface OptionWithIcon {
  value: string;
  label: string;
  icon: string; // Nombre del icono en lugar de JSX
  count: number;
}

export const departureTimeOptions: OptionWithIcon[] = [
  { value: "early-morning", label: "Madrugada (00:00 - 06:00)", icon: "Clock4", count: 42 },
  { value: "morning", label: "Mañana (06:00 - 12:00)", icon: "Clock9", count: 89 },
  { value: "afternoon", label: "Tarde (12:00 - 18:00)", icon: "Clock5", count: 76 },
  { value: "evening", label: "Noche (18:00 - 24:00)", icon: "Clock8", count: 65 },
];

export const stopsOptions: CheckboxOption[] = [
  { value: "non-stop", label: "Sin escalas", count: 98 },
  { value: "1-stop", label: "1 escala", count: 145 },
  { value: "2-stops", label: "2+ escalas", count: 29 },
];

export const durationOptions: OptionWithIcon[] = [
  { value: "short", label: "Corto (menos de 4h)", icon: "Plane", count: 67 },
  { value: "medium", label: "Medio (4h - 8h)", icon: "Plane", count: 123 },
  { value: "long", label: "Largo (8h - 12h)", icon: "Plane", count: 89 },
  { value: "very-long", label: "Muy largo (más de 12h)", icon: "Plane", count: 43 },
];

export const flightClassOptions: CheckboxOption[] = [
  { value: "economy", label: "Económica", count: 245 },
  { value: "premium-economy", label: "Económica Premium", count: 89 },
  { value: "business", label: "Business", count: 34 },
  { value: "first", label: "Primera Clase", count: 12 },
];

export const baggageOptions: CheckboxOption[] = [
  { value: "carry-on-included", label: "Equipaje de mano incluido", count: 198 },
  { value: "checked-bag-included", label: "Maleta facturada incluida", count: 87 },
  { value: "extra-baggage", label: "Equipaje adicional disponible", count: 156 },
];

// Opciones de ordenamiento
export const sortOptions: CustomSelectOption[] = [
  { key: "recommended", label: "Recomendado" },
  { key: "price_low", label: "Precio: menor a mayor" },
  { key: "price_high", label: "Precio: mayor a menor" },
  { key: "duration_short", label: "Duración: más corto" },
  { key: "departure_early", label: "Salida: más temprano" },
  { key: "departure_late", label: "Salida: más tarde" },
  { key: "airline", label: "Aerolínea A-Z" },
];

// Función helper para obtener todas las opciones de filtros
export const getFilterOptionsForFlights = () => ({
  popularFilters: popularFiltersOptions,
  airlines: airlinesOptions,
  departureTime: departureTimeOptions,
  stops: stopsOptions,
  duration: durationOptions,
  flightClass: flightClassOptions,
  baggage: baggageOptions
});


