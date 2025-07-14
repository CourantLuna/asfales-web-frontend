import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { 
  LodgingType, 
  FilterDefaults, 
  PriceRangeConfig 
} from './lodging-types';
import {
  popularFiltersOptions,
  guestRatingOptions,
  amenitiesOptions,
  starRatingOptions,
  paymentTypeOptions,
  cancellationOptions,
  propertyTypeOptions,
  hostelRoomTypeOptions,
  hostelDormSizeOptions,
  hostelAtmosphereOptions,
  apartmentStayDurationOptions,
  apartmentSizeOptions,
  apartmentIncludedServicesOptions
} from './lodging-filter-options';

// Configuración de rangos de precio por tipo
export const getPriceRangeForType = (lodgingType: LodgingType): PriceRangeConfig => {
  switch (lodgingType) {
    case "hostels-and-guesthouses":
      return { min: 5, max: 80, step: 5 };
    case "apartments-and-longstays":
      return { min: 50, max: 500, step: 10 };
    default: // hotels-and-resorts
      return { min: 0, max: 1000, step: 10 };
  }
};

// Generar filtros específicos por tipo de alojamiento
export const getFiltersForLodgingType = (
  lodgingType: LodgingType,
  filterDefaults: FilterDefaults,
  dataSourcesLodging: any[]
) => {
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
      currency: "$",
      defaultValue: filterDefaults.priceRange,
      ...getPriceRangeForType(lodgingType)
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
  const typeSpecificFilters = getTypeSpecificFilters(lodgingType, filterDefaults);

  return [...baseFilters, ...typeSpecificFilters];
};

// Obtener filtros específicos por tipo
const getTypeSpecificFilters = (lodgingType: LodgingType, filterDefaults: FilterDefaults) => {
  switch (lodgingType) {
    case "hotels-and-resorts":
      return [
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
      ];

    case "hostels-and-guesthouses":
      return [
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
      ];

    case "apartments-and-longstays":
      return [
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
      ];

    default:
      return [];
  }
};

// Obtener opciones de filtros específicas por tipo de alojamiento
export const getFilterOptionsForLodgingType = (lodgingType: LodgingType) => {
  if (!["hotels-and-resorts", "hostels-and-guesthouses", "apartments-and-longstays"].includes(lodgingType)) {
    return {};
  }

  const baseOptions = {
    "popular-filters": getPopularFiltersForType(lodgingType),
    "guest-rating": guestRatingOptions.map(opt => ({
      value: opt.value,
      label: opt.label,
      count: opt.count
    })),
    "amenities": getAmenitiesForType(lodgingType),
    "property-type": getPropertyTypesForType(lodgingType)
  };

  // Opciones específicas por tipo
  switch (lodgingType) {
    case "hotels-and-resorts":
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

    case "hostels-and-guesthouses":
      return {
        ...baseOptions,
        "room-type": hostelRoomTypeOptions,
        "dorm-size": hostelDormSizeOptions,
        "hostel-atmosphere": hostelAtmosphereOptions
      };

    case "apartments-and-longstays":
      return {
        ...baseOptions,
        "stay-duration": apartmentStayDurationOptions,
        "apartment-size": apartmentSizeOptions,
        "included-services": apartmentIncludedServicesOptions
      };

    default:
      return baseOptions;
  }
};

// Funciones auxiliares para obtener opciones específicas por tipo
export function getPopularFiltersForType(lodgingType: LodgingType): CheckboxOption[] {
  switch (lodgingType) {
    case "hostels-and-guesthouses":
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

    case "apartments-and-longstays":
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

    default: // hotels-and-resorts
      return popularFiltersOptions;
  }
}

export function getAmenitiesForType(lodgingType: LodgingType): any[] {
  switch (lodgingType) {
    case "hostels-and-guesthouses":
      return [
        { value: "wifi", label: "Free WiFi", icon: "Wifi", count: 407 },
        { value: "shared-kitchen", label: "Shared Kitchen", icon: "Utensils", count: 229 },
        { value: "shared-bathroom", label: "Shared Bathroom", icon: "Bath", count: 180 },
        { value: "private-bathroom", label: "Private Bathroom", icon: "Bath", count: 95 },
        { value: "luggage-storage", label: "Luggage Storage", icon: "MapPin", count: 350 },
        { value: "laundry-facilities", label: "Laundry Facilities", icon: "WashingMachine", count: 285 },
        { value: "common-area", label: "Common Area/Lounge", icon: "MapPin", count: 320 },
        { value: "24-hour-reception", label: "24-hour Reception", icon: "Phone", count: 180 },
        { value: "lockers", label: "Lockers", icon: "Phone", count: 290 },
        { value: "air-conditioned", label: "Air Conditioning", icon: "AirVent", count: 120 },
        { value: "female-dorms", label: "Female-only Dorms", icon: "Building2", count: 85 },
        { value: "breakfast-included", label: "Breakfast Included", icon: "Utensils", count: 150 }
      ];

    case "apartments-and-longstays":
      return [
        { value: "full-kitchen", label: "Full Kitchen", icon: "Utensils", count: 320 },
        { value: "washer-dryer", label: "Washer/Dryer in Unit", icon: "WashingMachine", count: 285 },
        { value: "wifi", label: "Free WiFi", icon: "Wifi", count: 407 },
        { value: "air-conditioned", label: "Air Conditioning", icon: "AirVent", count: 337 },
        { value: "workspace", label: "Workspace/Office Area", icon: "MapPin", count: 250 },
        { value: "parking", label: "Parking Included", icon: "Car", count: 220 },
        { value: "balcony-terrace", label: "Balcony/Terrace", icon: "Mountain", count: 180 },
        { value: "dishwasher", label: "Dishwasher", icon: "Utensils", count: 200 },
        { value: "elevator", label: "Elevator", icon: "Building2", count: 150 },
        { value: "building-gym", label: "Building Gym", icon: "Dumbbell", count: 120 },
        { value: "building-pool", label: "Building Pool", icon: "Waves", count: 95 },
        { value: "furnished", label: "Fully Furnished", icon: "Building2", count: 290 },
        { value: "pets-allowed", label: "Pets Allowed", icon: "Building2", count: 160 }
      ];

    default: // hotels-and-resorts
      return amenitiesOptions.map(opt => ({
        value: opt.value,
        label: opt.label,
        count: opt.count,
        icon: opt.icon,
        disabled: opt.disabled
      }));
  }
}

export function getPropertyTypesForType(lodgingType: LodgingType): CheckboxOption[] {
  switch (lodgingType) {
    case "hostels-and-guesthouses":
      return [
        { value: "hostel-backpacker", label: "Hostel/Backpacker accommodation", count: 45 },
        { value: "guesthouse", label: "Guesthouse", count: 32 },
        { value: "bed-breakfast", label: "Bed & breakfast", count: 18 },
        { value: "budget-hotel", label: "Budget Hotel", count: 25 },
        { value: "capsule-hotel", label: "Capsule Hotel", count: 8 },
        { value: "youth-hostel", label: "Youth Hostel", count: 15 }
      ];

    case "apartments-and-longstays":
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

    default: // hotels-and-resorts
      return propertyTypeOptions;
  }
}
