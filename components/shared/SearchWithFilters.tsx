"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Info, Filter, X, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { FilterChips, FilterChip } from "./standard-fields-component/FilterChips";
import ResultFilters, { FilterConfig } from "./ResultFilters";
import CustomSelect, { CustomSelectOption } from "./CustomSelect";
import { RowData } from "./RenderFields";
import Ads, { AdItem } from "./Ads";
import CompareSwitchControl from "./CompareSwitchControl";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePriceRangeOutputString } from "./standard-fields-component/PriceRangeFilter";
import { de } from "date-fns/locale";

interface DataSource {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "hotel" | "custom" | "recent" | "airport" | "city";
  nameLabelField: string;
  nameValueField: string;
  nameDescriptionField: string;
  options: RowData[];
}

// Configuración genérica para un filtro
interface GenericFilterConfig {
  id: string;
  type: 'checkbox' | 'radio' | 'toggle' | 'range' | 'search' | 'custom' | 'separator';
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  unitSuffix?: string; // Para rangos con unidades (ej: "h" para "2h", "min" para "30min")
  mode?: 'range' | 'single'; // Para rangos: modo dual o valor único
  showCounts?: boolean;
  maxSelections?: number;
  initialVisibleCount?: number;
  showMoreText?: string;
  showLessText?: string;
  variant?: 'vertical' | 'horizontal';
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  toggleGroupClassName?: string;
  toggleItemClassName?: string;
  type_toggle?: 'single' | 'multiple';
  wrap?: boolean;
  gridCols?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  content?: React.ReactNode;
  emptyMessage?: string;
  searchPlaceholder?: string;
  minSearchLength?: number;
  disabled?: boolean;
  showClearButton?: boolean;
  dataSources?: DataSource[];
  onSelect?: (option: any, sourceType: string) => void;
  // Nuevo: valores por defecto
  defaultValue?: any; // Para checkbox/toggle: string[], para radio: string, para range: [number, number], para search: string
}

// Opción genérica para filtros
interface GenericFilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SearchWithFiltersProps {
  // Datos
  rows: RowData[];
 
  // Configuración genérica de filtros
  filters: GenericFilterConfig[];
  filterOptions: { [filterId: string]: GenericFilterOption[] };

  // Configuración de ordenamiento
  sortOptions: CustomSelectOption[];
  
  // Configuración de anuncios
 ads?: AdItem[];
  adsDirection?: 'row' | 'col' | 'wrap';
  adsGap?: number;
  adsContainerClassName?: string;
  showAds?: boolean;
 
  // Configuración del modo de comparación
  enableCompareMode?: boolean;
  compareConfig?: {
    titleOff?: string;
    subtitleOff?: string;
    titleOn?: string;
    subtitleOn?: string;
  };

  // Control de visibilidad de la columna de filtros (opcional)
  showToggleShowFilters?: boolean;
 
  // Renderizado de resultados
  renderResults: (props: {
    filteredRows: RowData[];
    compareMode: boolean;
    onCardClick: (idx: number, row: RowData) => void;
  }) => React.ReactNode;
 
  // Callbacks
  onCardClick?: (idx: number, row: RowData) => void;
  onFiltersChange?: (filters: Record<string, any>) => void;
 
  // Textos personalizables
  searchPlaceholder?: string;
  noResultsMessage?: string;
  clearFiltersText?: string;
  sortByText?: string;
  howItWorksText?: string;
  resultsCountText?: (count: number) => string;
}

export default function SearchWithFilters({
  rows,
  filters,
  filterOptions,
  sortOptions,
  ads = [],
  adsDirection = 'col',
  adsGap = 4,
  adsContainerClassName,
  showAds = true,
  enableCompareMode = false,
  compareConfig = {
    titleOff: "Comparar elementos",
    subtitleOff: "Obtén una vista lado a lado de hasta 5 elementos",
    titleOn: "Comparando elementos",
    subtitleOn: "Selecciona elementos para comparar lado a lado"
  },
  showToggleShowFilters = false,
  renderResults,
  onCardClick = () => {},
  onFiltersChange,
  searchPlaceholder = "Buscar...",
  noResultsMessage = "No se encontraron resultados",
  clearFiltersText = "Limpiar filtros",
  sortByText = "Ordenar por",
  howItWorksText = "¿Cómo funciona nuestro orden?",
  resultsCountText = (count) => `${count}+ resultados`
}: SearchWithFiltersProps) {
 
  // Estados principales
  const [sort, setSort] = useState(sortOptions[0]?.key || "");
  const [compareMode, setCompareMode] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<RowData[]>(rows);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Estados dinámicos para filtros genéricos - Inicialización estática para evitar loops
  const [filterStates, setFilterStates] = useState<Record<string, any>>({});
  const [activeChips, setActiveChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Inicializar estados de filtros una sola vez
  React.useEffect(() => {
    if (Object.keys(filterStates).length === 0) {
      const initialStates: Record<string, any> = {};
      filters.forEach(filter => {
        if (filter.type === 'checkbox' || filter.type === 'toggle') {
          // Si hay defaultValue y es un array, usarlo, sino array vacío
          initialStates[filter.id] = filter.defaultValue && Array.isArray(filter.defaultValue) 
            ? filter.defaultValue 
            : [];
        } else if (filter.type === 'radio') {
          // Si hay defaultValue y es string, usarlo, sino string vacío
          initialStates[filter.id] = filter.defaultValue && typeof filter.defaultValue === 'string' 
            ? filter.defaultValue 
            : '';
        } else if (filter.type === 'range') {
          // Si hay defaultValue y es array de 2 elementos, usarlo, sino rango por defecto
          initialStates[filter.id] = filter.defaultValue && Array.isArray(filter.defaultValue) && filter.defaultValue.length === 2
            ? filter.defaultValue 
            : [filter.min || 0, filter.max || 1000];
        } else if (filter.type === 'search') {
          // Si hay defaultValue y es string, usarlo, sino string vacío
          initialStates[filter.id] = filter.defaultValue && typeof filter.defaultValue === 'string' 
            ? filter.defaultValue 
            : '';
        }
      });
      setFilterStates(initialStates);
    }
  }, [filters]);

  // Función para actualizar estado de filtro
  const updateFilterState = useCallback((filterId: string, value: any) => {
    setFilterStates(prev => ({
      ...prev,
      [filterId]: value
    }));
  }, []);

  // Función helper para remover un valor específico de un filtro múltiple
  const removeFilterValue = useCallback((filterId: string, valueToRemove: string) => {
    setFilterStates(prev => {
      const currentValues = prev[filterId] || [];
      const newValue = currentValues.filter((v: string) => v !== valueToRemove);
      return {
        ...prev,
        [filterId]: newValue
      };
    });
  }, []);

 // Función para resetear filtro - MODIFICADA para limpiar completamente
  const resetFilter = useCallback((filterId: string) => {
    const filter = filters.find(f => f.id === filterId);
    if (!filter) return;

    let resetValue;
    if (filter.type === 'checkbox' || filter.type === 'toggle') {
      resetValue = []; // Limpiar completamente
    } else if (filter.type === 'radio') {
      resetValue = ''; // Limpiar completamente
    } else if (filter.type === 'range') {
      resetValue = [filter.defaultValue[0] || 0, filter.defaultValue[1] || 1000]; // Resetear a rango completo
    } else if (filter.type === 'search') {
      resetValue = ''; // Limpiar completamente
    }

    updateFilterState(filterId, resetValue);
  }, [filters, updateFilterState]);

  // Regenerar chips automáticamente cuando cambien los filterStates
  React.useEffect(() => {
    const newChips: Array<{id: string, label: string, onRemove: () => void}> = [];
    
    filters.forEach(filter => {
      const values = filterStates[filter.id];
      const options = filterOptions[filter.id] || [];
      
      // Chips para checkbox y toggle (múltiples valores)
      if ((filter.type === 'checkbox' || filter.type === 'toggle') && values && Array.isArray(values) && values.length > 0) {
        values.forEach((val: string) => {
          const option = options.find((opt: any) => opt.value === val);
          if (option) {
            newChips.push({
              id: `${filter.id}-${val}`,
              label: option.label,
              onRemove: () => removeFilterValue(filter.id, val)
            });
          }
        });
      }
      
      // Chips para radio (un solo valor)
      else if (filter.type === 'radio' && values && values !== '' && values !== 'any') {
        const option = options.find((opt: any) => opt.value === values);
        if (option) {
          newChips.push({
            id: `${filter.id}-${values}`,
            label: option.label,
            onRemove: () => resetFilter(filter.id)
          });
        }
      }
      
      // Chips para range (usando output strings automáticos)
      else if (filter.type === 'range' && values && Array.isArray(values)) {
        const [min, max] = values;
        const defaultMin = filter.min || 0;
        const defaultMax = filter.max || 1000;
        const mode = filter.mode || 'range';

        // Solo mostrar chip si los valores son diferentes a los defaults
        if (mode === 'single') {
          // Para modo single, solo mostrar si el valor es diferente al mínimo default
          if (max !== defaultMax) {
            let label: string;
            if (filter.unitSuffix) {
              label = `menor a ${min}${filter.unitSuffix}`;
            } else {
              const currency = filter.currency || "$";
              label = `menor a ${currency}${min}`;
            }
            
            newChips.push({
              id: `${filter.id}-single`,
              label: label,
              onRemove: () => resetFilter(filter.id)
            });
          }
        } else {
          // Para modo range, mostrar si cualquiera de los valores es diferente
          if (min !== defaultMin || max !== defaultMax) {
           let label: string = usePriceRangeOutputString(min, max, defaultMin, defaultMax, filter.currency || "$", filter.unitSuffix, mode);
            
            newChips.push({
              id: `${filter.id}-range`,
              label: label,
              onRemove: () => resetFilter(filter.id)
            });
          }
        }

        //  let label: string = usePriceRangeOutputString(min, max, defaultMin, defaultMax, filter.currency );

        //   newChips.push({
        //       id: `${filter.id}-${mode}`,
        //       label: label,
        //       onRemove: () => resetFilter(filter.id)
        //     });
      }
    });
    
    setActiveChips(newChips);
  }, [filterStates, filters, filterOptions, removeFilterValue, resetFilter]);

  // Handler para búsqueda
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    updateFilterState('search', value);
   
    if (value.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(row =>
        row.title?.toLowerCase().includes(value.toLowerCase()) ||
        row.descMain?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [rows, updateFilterState]);

  // Handler para selección de elemento
  const handleItemSelect = useCallback((option: any, sourceType: string) => {
    setSearchValue(option.label);
    updateFilterState('search', option.label);
    const filtered = rows.filter(row => row.title === option.value);
    setFilteredRows(filtered);
  }, [rows, updateFilterState]);

  // Actualizar filteredRows cuando cambien los rows
  React.useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(row =>
        row.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.descMain?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [rows, searchValue]);

  // Generar filtros activos
  const generateActiveFilters = useCallback((): FilterChip[] => {
    const filterChips: FilterChip[] = [];

    if (searchValue.trim()) {
      filterChips.push({
        id: "search",
        label: "Búsqueda",
        value: searchValue,
        onRemove: () => {
          setSearchValue("");
          updateFilterState('search', '');
        },
      });
    }

    // Agregar chips de otros filtros activos
    activeChips.forEach(chip => {
      filterChips.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    return filterChips;
  }, [searchValue, activeChips, updateFilterState]);

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSearchValue("");
    setActiveChips([]);
    
    // Resetear todos los filtros
    filters.forEach(filter => {
      resetFilter(filter.id);
    });
  }, [filters, resetFilter]);

  // Configuración de filtros genérica - Memorizada para evitar re-creación innecesaria
  const filtersConfig: FilterConfig[] = useMemo(() => {
    const configFilters: FilterConfig[] = [];

    filters.forEach(filter => {
      const options = filterOptions[filter.id] || [];

      if (filter.type === 'search') {
        configFilters.push({
          id: filter.id,
          type: "search",
          label: filter.label || "Buscar",
          placeholder: filter.placeholder || searchPlaceholder,
          value: filterStates[filter.id] || '',
          onValueChange: handleSearchChange,
          dataSources: filter.dataSources || [],
          onSelect: filter.onSelect || handleItemSelect,
          showClearButton: filter.showClearButton !== false,
          minSearchLength: filter.minSearchLength || 2,
          disabled: filter.disabled || false,
          emptyMessage: filter.emptyMessage || noResultsMessage,
          searchPlaceholder: filter.searchPlaceholder || searchPlaceholder
        });
      } else if (filter.type === 'custom' && filter.content) {
        configFilters.push({
          id: filter.id,
          type: "custom",
          content: filter.content,
          containerClassName: filter.containerClassName
        });
      } else if (filter.type === 'separator') {
        configFilters.push({
          id: filter.id,
          type: "separator",
          className: filter.className
        });
      } else if (filter.type === 'checkbox' && options.length > 0) {
        configFilters.push({
          id: filter.id,
          type: "checkbox",
          label: filter.label || "",
          options: options,
          selectedValues: filterStates[filter.id] || [],
          onChange: (value: any) => {
            updateFilterState(filter.id, value);
          },
          showCounts: filter.showCounts !== false,
          maxSelections: filter.maxSelections || 10,
          initialVisibleCount: filter.initialVisibleCount || 5,
          showMoreText: filter.showMoreText || "Ver más",
          showLessText: filter.showLessText || "Ver menos"
        });
      } else if (filter.type === 'radio' && options.length > 0) {
        configFilters.push({
          id: filter.id,
          type: "radio",
          label: filter.label || "",
          options: options,
          value: filterStates[filter.id] || '',
          onValueChange: (value: any) => {
            updateFilterState(filter.id, value);
          },
          variant: filter.variant || "vertical",
          helperText: filter.helperText
        });
      } else if (filter.type === 'range') {
        configFilters.push({
          id: filter.id,
          type: "range",
          label: filter.label || "Rango",
          min: filter.min || 0,
          max: filter.max || 1000,
          value: filterStates[filter.id] || [filter.min || 0, filter.max || 1000],
          onChange: (value: any) => {
            updateFilterState(filter.id, value);
          },
          currency: filter.currency || "$",
          unitSuffix: filter.unitSuffix, // Pasar unitSuffix al componente
          mode: filter.mode || 'range', // Pasar modo al componente
          step: filter.step || 1
        });
      } else if (filter.type === 'toggle' && options.length > 0) {
        configFilters.push({
          id: filter.id,
          type: "toggle",
          label: filter.label || "",
          options: options,
          value: filterStates[filter.id] || [],
          onValueChange: (value: any) => {
            updateFilterState(filter.id, value);
          },
          type_toggle: filter.type_toggle || "multiple",
          variant: filter.variant || "vertical",
          wrap: filter.wrap,
          gridCols: filter.gridCols as any,
          containerClassName: filter.containerClassName,
          labelClassName: filter.labelClassName,
          toggleGroupClassName: filter.toggleGroupClassName,
          toggleItemClassName: filter.toggleItemClassName,
          maxSelections: filter.maxSelections || 10
        });
      }
    });

    return configFilters;
  }, [
    filters, filterOptions, filterStates, searchPlaceholder,
    noResultsMessage, handleSearchChange, handleItemSelect, updateFilterState,
    resetFilter
  ]);

  // Notificar cambios de filtros - Solo cuando realmente cambian
  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        ...filterStates,
        search: searchValue,
        compareMode
      });
    }
  }, [
    filterStates, searchValue, compareMode, onFiltersChange
  ]);

  // Componente de filtros reutilizable
  const FiltersContent = () => (
    <>
      {/* Modo de Comparación */}
      {enableCompareMode && (
        <div className="my-4">
          <CompareSwitchControl
            checked={compareMode}
            onCheckedChange={setCompareMode}
            titleOff={compareConfig.titleOff || "Comparar elementos"}
            subtitleOff={compareConfig.subtitleOff || "Obtén una vista lado a lado de hasta 5 elementos"}
            titleOn={compareConfig.titleOn || "Comparando elementos"}
            subtitleOn={compareConfig.subtitleOn || "Selecciona elementos para comparar lado a lado"}
          />
        </div>
      )}
      <Separator className="my-4" />
      {/* Filtros de Resultados */}
      <ResultFilters filters={filtersConfig} />
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row mt-2 mb-12">
      {/* Columna de Filtros - Lado Izquierdo (Desktop) - Controlada opcionalmente */}
      <div 
        className={`
          hidden lg:block flex-shrink-0 mt-1 transition-all duration-300 ease-in-out overflow-hidden
          ${showFilters 
            ? 'w-[280px] opacity-100 translate-x-0' 
            : 'w-0 opacity-0 -translate-x-4'
          }
        `}
      >
        <div className={`
          w-60 transition-all duration-300 ease-in-out
          ${showFilters ? 'opacity-100 scale-100 mr-10' : 'opacity-0 scale-95'}
        `}>
          <FiltersContent />
        </div>
      </div>

      {/* Contenido Principal - Lado Derecho */}
      <div className="min-w-0 flex-1">
        {/* Botón de Filtros para Mobile/Tablet */}
        <div className="lg:hidden mb-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[280px] h-12 text-primary"
              >
                <Filter className="w-4 h-4 mr-2" />
                Busca y Filtra
                {activeChips.length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                    {activeChips.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80 p-0">
              <SheetHeader className="p-6 pb-4">
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Personaliza tu búsqueda con los filtros disponibles
                </SheetDescription>
              </SheetHeader>
              <div className="px-6 pb-6 overflow-y-auto max-h-[calc(100vh-180px)]">
                {/* Selector de ordenamiento en mobile/laptop */}
                <div className="lg:hidden flex flex-col items-center md:items-end w-full md:w-auto">
                  <span className="text-xs text-muted-foreground mb-0.5">
                    {sortByText}
                  </span>
                  <CustomSelect
                    options={sortOptions}
                    selectedKey={sort}
                    onChange={setSort}
                  />
                </div>

                <FiltersContent />
              </div>
              <div className="border-t p-4 mt-auto">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsSheetOpen(false)}
                    className="flex-1"
                  >
                    Aplicar filtros
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filtros Activos */}
        <div>
          <FilterChips
            filters={generateActiveFilters()}
            onClearAll={clearAllFilters}
            showClearAll={true}
            clearAllText={clearFiltersText}
          />
        </div>

        {/* Barra de control superior */}
        <div className="flex flex-col md:flex-row w-full items-center md:justify-between justify-center gap-4 border-b border-muted pb-2 mb-6">
          <div className="flex items-center gap-2">
            {showToggleShowFilters && (
              <div 
    className="hidden lg:block cursor-pointer rounded-lg p-2 bg-primary text-white hover:bg-secondary transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" 
    role="button" 
    onClick={() => setShowFilters(!showFilters)}
  >
    <div className="transition-transform duration-200 ease-in-out">
      {showFilters ? <PanelLeftClose className="w-6 h-6"/> : <PanelLeftOpen className="w-6 h-6"/>}
    </div>
  </div>
            )}
            <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto">
              <span className="text-xs text-muted-foreground font-medium">
                {filteredRows.length
                  ? resultsCountText(filteredRows.length)
                  : noResultsMessage}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                  {howItWorksText}
                </span>
                <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </div>
            </div>
          </div>
          {/* Selector de ordenamiento en Desktop */}
          <div className="hidden lg:block flex flex-col items-center md:items-end w-full md:w-auto">
            <span className="text-xs text-muted-foreground mb-0.5">
              {sortByText}
            </span>
            <CustomSelect
              options={sortOptions}
              selectedKey={sort}
              onChange={setSort}
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="flex flex-col gap-6">
          {renderResults({
            filteredRows,
            compareMode,
            onCardClick,
          })}
        </div>
      </div>

      
        {showAds && ads && ads.length > 0 && (
        <Ads
          ads={ads}
          direction={adsDirection}
          gap={adsGap}
          containerClassName={`ml-6 ${adsContainerClassName || ''}`}
        />
      )}
      
    </div>
  );
}

export type { GenericFilterConfig, GenericFilterOption, DataSource };


