// Opciones de filtros para itinerarios

import { CheckboxOption } from '@/components/shared/standard-fields-component/CheckboxFilter';
import { CustomSelectOption } from '@/components/shared/CustomSelect';
import { ItineraryOptionWithIcon } from './itineraries-types';

// Opciones para filtros populares
export const popularFiltersOptions: CheckboxOption[] = [
  { value: "best-rated", label: "Mejor valorados (4.8+)", count: 8 },
  { value: "cultural", label: "Experiencias culturales", count: 12 },
  { value: "adventure", label: "Aventura y deportes", count: 6 },
  { value: "budget-friendly", label: "Económicos (<$1,500)", count: 9 },
  { value: "small-group", label: "Grupos pequeños", count: 14 },
  { value: "guided", label: "Con guía especializado", count: 18 },
  { value: "food-included", label: "Gastronomía incluida", count: 15 },
  { value: "short-duration", label: "Corta duración (<12 días)", count: 11 }
];

// Opciones de destinos
export const destinationsOptions: CheckboxOption[] = [
  { value: "bogota", label: "Bogotá", count: 8 },
  { value: "medellin", label: "Medellín", count: 6 },
  { value: "cartagena", label: "Cartagena", count: 7 },
  { value: "cali", label: "Cali", count: 3 },
  { value: "santa-marta", label: "Santa Marta", count: 4 },
  { value: "san-gil", label: "San Gil", count: 2 },
  { value: "armenia", label: "Armenia", count: 3 },
  { value: "leticia", label: "Leticia", count: 1 },
  { value: "pasto", label: "Pasto", count: 1 },
  { value: "valledupar", label: "Valledupar", count: 1 }
];

// Opciones de duración con iconos
export const durationOptions: ItineraryOptionWithIcon[] = [
  { value: "short", label: "Corto (7-10 días)", count: 8, icon: "Clock" },
  { value: "medium", label: "Medio (11-15 días)", count: 9, icon: "Clock" },
  { value: "long", label: "Largo (16-20 días)", count: 2, icon: "Clock" },
  { value: "extended", label: "Extendido (21+ días)", count: 1, icon: "Clock" }
];

// Opciones de tipos de experiencias
export const experienceTypesOptions: CheckboxOption[] = [
  { value: "cultural", label: "Cultural", count: 12 },
  { value: "adventure", label: "Aventura", count: 8 },
  { value: "nature", label: "Naturaleza", count: 10 },
  { value: "beach", label: "Playa", count: 6 },
  { value: "gastronomy", label: "Gastronomía", count: 15 },
  { value: "wellness", label: "Bienestar", count: 4 },
  { value: "photography", label: "Fotografía", count: 7 },
  { value: "music", label: "Música", count: 3 }
];

// Opciones de presupuesto
export const budgetOptions: CheckboxOption[] = [
  { value: "budget", label: "Económico (<$1,200)", count: 4 },
  { value: "mid-range", label: "Medio ($1,200-$1,800)", count: 11 },
  { value: "premium", label: "Premium ($1,800-$2,500)", count: 4 },
  { value: "luxury", label: "Lujo ($2,500+)", count: 1 }
];

// Opciones de transporte
export const transportOptions: CheckboxOption[] = [
  { value: "flight", label: "Vuelos incluidos", count: 19 },
  { value: "bus", label: "Transporte terrestre", count: 16 },
  { value: "cruise", label: "Cruceros", count: 4 },
  { value: "private", label: "Transporte privado", count: 8 }
];

// Opciones de ordenamiento
export const sortOptions: CustomSelectOption[] = [
  { key: "recommended", label: "Recomendados" },
  { key: "price-low", label: "Precio: menor a mayor" },
  { key: "price-high", label: "Precio: mayor a menor" },
  { key: "duration-short", label: "Duración: más corto" },
  { key: "duration-long", label: "Duración: más largo" },
  { key: "rating", label: "Mejor valorados" },
  { key: "newest", label: "Más recientes" }
];

// Función helper para obtener todas las opciones de filtros
export const getFilterOptionsForItineraries = () => ({
  popularFilters: popularFiltersOptions,
  destinations: destinationsOptions,
  duration: durationOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count,
    icon: opt.icon
  })),
  experienceTypes: experienceTypesOptions,
  budget: budgetOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    count: opt.count
  })),
  transport: transportOptions
});

// Opciones específicas por categoría de itinerario
export const getCategorySpecificOptions = (category: string) => {
  switch (category) {
    case 'cultural':
      return {
        popularFilters: popularFiltersOptions.filter(opt => 
          ['cultural', 'guided', 'food-included'].includes(opt.value)
        ),
        experienceTypes: experienceTypesOptions.filter(opt =>
          ['cultural', 'gastronomy', 'music', 'photography'].includes(opt.value)
        )
      };
    
    case 'adventure':
      return {
        popularFilters: popularFiltersOptions.filter(opt => 
          ['adventure', 'small-group', 'short-duration'].includes(opt.value)
        ),
        experienceTypes: experienceTypesOptions.filter(opt =>
          ['adventure', 'nature', 'photography'].includes(opt.value)
        )
      };
    
    case 'beach':
      return {
        popularFilters: popularFiltersOptions.filter(opt => 
          ['best-rated', 'wellness'].includes(opt.value)
        ),
        experienceTypes: experienceTypesOptions.filter(opt =>
          ['beach', 'wellness', 'photography'].includes(opt.value)
        ),
        destinations: destinationsOptions.filter(opt =>
          ['cartagena', 'santa-marta'].includes(opt.value)
        )
      };
    
    default:
      return {
        popularFilters: popularFiltersOptions,
        experienceTypes: experienceTypesOptions,
        destinations: destinationsOptions
      };
  }
};
