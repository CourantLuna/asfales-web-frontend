import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { CustomSelectOption } from '@/components/shared/CustomSelect';
import { AdItem } from '@/components/shared/Ads';
import { FilterDefaults, GuestRatingOption, OptionWithIcon } from './lodging-types';
import React from 'react';

// Datos de ejemplo para anuncios de alojamiento
export const lodgingAds: AdItem[] = [
  {
    id: "premium-hotels",
    src: "https://tpc.googlesyndication.com/simgad/7006773931942455307?",
    alt: "Hoteles Premium - Reserva Directa",
    href: "https://premium-hotels.com/ofertas-especiales",
    title: "Hoteles de lujo con descuentos exclusivos - Hasta 40% OFF",
    height: 600,
    width: 160,
  },
  {
    id: "airline-deals",
    src: "https://tpc.googlesyndication.com/simgad/12562425310683427121?",
    alt: "Precios Increíbles",
    href: "https://airline-deals.com/promociones-vuelos",
    title: "Vuelos nacionales e internacionales desde $199",
    height: 600,
    width: 160,
  },
  {
    id: "vacation-packages",
    src: "https://tpc.googlesyndication.com/simgad/8989349070575090120?",
    alt: "Paquetes RIU Vacacionales Todo Incluido",
    href: "https://vacation-packages.com/ofertas-caribe-riu",
    title: "Paquetes todo incluido al Caribe - 7 días desde $899",
    height: 600,
    width: 160,
  },
  {
    id: "zemi-beach-house",
    src: "https://tpc.googlesyndication.com/simgad/13847073648655381401?",
    alt: "Ahorra hasta 40%",
    href: "https://tpc.googlesyndication.com/simgad/13847073648655381401?",
    title: "Zemi Miches - All inclusive Resort",
    height: 600,
    width: 160,
  },
  {
    id: "viva-take-off",
    src: "https://tpc.googlesyndication.com/simgad/3719967787830508080?",
    alt: "Vacaciones de ensueño",
    href: "https://tpc.googlesyndication.com/simgad/3719967787830508080?",
    title: "Viva Take-off",
    height: 600,
    width: 160,
  },
  {
    id: "fake-ad-1",
    src: "https://placehold.co/160x660?text=Ad+160x660",
    alt: "Fake ad",
    href: "https://placehold.co/160x660?text=Ad+160x660",
    title: "fake ad", 
    height: 660, 
    width: 150
  },
  {
    id: "fake-ad-3",
    src: "https://tpc.googlesyndication.com/simgad/10478692533147659811?",
    alt: "Fake ad",
    href: "https://placehold.co/160x600?text=Ad+160x600",
    title: "Viaja por colombia", 
    height: 600, 
    width: 150
  }
];

// Opciones para calificación de huéspedes
export const guestRatingOptions: GuestRatingOption[] = [
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

// Opciones para calificación por estrellas
export const starRatingOptions: CheckboxOption[] = [
  { value: "5-stars", label: "5 estrellas", count: 4 },
  { value: "4-stars", label: "4 estrellas", count: 44 },
  { value: "3-stars", label: "3 estrellas", count: 102 },
  { value: "2-stars", label: "2 estrellas", count: 123 },
  { value: "1-star", label: "1 estrella", count: 4 },
];

// Opciones para tipo de pago
export const paymentTypeOptions: CheckboxOption[] = [
  { value: "reserve-now-pay-later", label: "Reserva ahora, paga después", count: 287 },
];

// Opciones para cancelación de propiedad
export const cancellationOptions: CheckboxOption[] = [
  { value: "fully-refundable", label: "Propiedad totalmente reembolsable", count: 245 },
];

// Opciones para tipo de propiedad
export const propertyTypeOptions: CheckboxOption[] = [
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
  { value: "boutique-hotel", label: "Boutique Hotel", count: 12 },
];

// Opciones de amenidades base
export const amenitiesOptions: OptionWithIcon[] = [
  {
    value: "pet-friendly",
    label: "Pet friendly",
    icon: "Heart",
    count: 413
  },
  {
    value: "pool",
    label: "Pool",
    icon: "Waves",
    count: 105
  },
  {
    value: "hot-tub",
    label: "Hot tub",
    icon: "Bath",
    count: 67
  },
  {
    value: "wifi",
    label: "Wifi included",
    icon: "Wifi",
    count: 407
  },
  {
    value: "spa",
    label: "Spa",
    icon: "Bath",
    count: 13
  },
  {
    value: "gym",
    label: "Gym",
    icon: "Dumbbell",
    count: 177
  },
  {
    value: "kitchen",
    label: "Kitchen",
    icon: "Utensils",
    count: 229
  },
  {
    value: "air-conditioned",
    label: "Air conditioned",
    icon: "AirVent",
    count: 337
  },
  {
    value: "ocean-view",
    label: "Ocean view",
    icon: "Mountain",
    count: 13
  },
  {
    value: "restaurant",
    label: "Restaurant",
    icon: "Utensils",
    count: 90
  },
  {
    value: "outdoor-space",
    label: "Outdoor space",
    icon: "MapPin",
    count: 198
  },
  {
    value: "washer-dryer",
    label: "Washer and dryer",
    icon: "WashingMachine",
    count: 29
  },
  {
    value: "electric-car",
    label: "Electric car charging station",
    icon: "Car",
    count: 70
  },
  {
    value: "golf-course",
    label: "Golf course",
    icon: "LandPlot",
    count: 0,
    disabled: true
  },
  {
    value: "water-park",
    label: "Water park",
    icon: "Waves",
    count: 7
  },
  {
    value: "airport-shuttle",
    label: "Airport shuttle included",
    icon: "Bus",
    count: 23
  },
  {
    value: "casino",
    label: "Casino",
    icon: "Dices",
    count: 1
  },
  {
    value: "cribs",
    label: "Cribs",
    icon: "Baby",
    count: 127
  }
];

// Opciones para filtros populares base
export const popularFiltersOptions: CheckboxOption[] = [
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

// Opciones de ordenamiento
export const sortOptions: CustomSelectOption[] = [
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

// Opciones específicas para hostels
export const hostelRoomTypeOptions: CheckboxOption[] = [
  { value: "mixed-dorm", label: "Mixed Dormitory", count: 180 },
  { value: "female-dorm", label: "Female-only Dorm", count: 85 },
  { value: "male-dorm", label: "Male-only Dorm", count: 65 },
  { value: "private-room", label: "Private Room", count: 95 },
  { value: "ensuite-private", label: "Private with Ensuite", count: 45 }
];

export const hostelDormSizeOptions: CheckboxOption[] = [
  { value: "4-bed", label: "4-bed dorm", count: 45 },
  { value: "6-bed", label: "6-bed dorm", count: 85 },
  { value: "8-bed", label: "8-bed dorm", count: 120 },
  { value: "10-plus-bed", label: "10+ bed dorm", count: 75 }
];

export const hostelAtmosphereOptions: GuestRatingOption[] = [
  { value: "party", label: "Party Hostel", count: 45 },
  { value: "quiet", label: "Quiet/Chill", count: 65 },
  { value: "social", label: "Social", count: 120 },
  { value: "business", label: "Business Travelers", count: 35 }
];

// Opciones específicas para apartamentos
export const apartmentStayDurationOptions: GuestRatingOption[] = [
  { value: "weekly", label: "1+ semana", count: 250 },
  { value: "monthly", label: "1+ mes", count: 180 },
  { value: "quarterly", label: "3+ meses", count: 120 },
  { value: "long-term", label: "6+ meses", count: 85 }
];

export const apartmentSizeOptions: CheckboxOption[] = [
  { value: "studio", label: "Studio (< 500 sq ft)", count: 95 },
  { value: "small", label: "Small (500-800 sq ft)", count: 120 },
  { value: "medium", label: "Medium (800-1200 sq ft)", count: 150 },
  { value: "large", label: "Large (1200+ sq ft)", count: 85 }
];

export const apartmentIncludedServicesOptions: CheckboxOption[] = [
  { value: "utilities", label: "Utilities", count: 180 },
  { value: "internet", label: "Internet", count: 320 },
  { value: "housekeeping", label: "Housekeeping", count: 120 },
  { value: "maintenance", label: "Maintenance", count: 200 },
  { value: "linen-change", label: "Linen Change", count: 95 },
  { value: "concierge", label: "Concierge Service", count: 80 }
];

// Función helper para obtener todas las opciones de filtros
export const getFilterOptionsForLodging = () => ({
  popularFilters: popularFiltersOptions,
  guestRating: guestRatingOptions,
  amenities: amenitiesOptions,
  starRating: starRatingOptions,
  paymentType: paymentTypeOptions,
  cancellationOptions: cancellationOptions,
  propertyType: propertyTypeOptions,
  // Hostels
  roomType: hostelRoomTypeOptions,
  dormSize: hostelDormSizeOptions,
  hostelAtmosphere: hostelAtmosphereOptions,
  // Apartments
  stayDuration: apartmentStayDurationOptions,
  apartmentSize: apartmentSizeOptions,
  includedServices: apartmentIncludedServicesOptions
});