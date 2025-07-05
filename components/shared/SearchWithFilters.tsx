"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Info } from "lucide-react";
import { FilterChips, FilterChip } from "./FilterChips";
import ResultFilters, { FilterConfig } from "./ResultFilters";
import CustomSelect, { CustomSelectOption } from "./CustomSelect";
import { RowData } from "./RenderFields";
import CompareSwitchControl from "./CompareSwitchControl";
import { Separator } from "@radix-ui/react-select";

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
 
  // Configuración del modo de comparación
  enableCompareMode?: boolean;
  compareConfig?: {
    titleOff?: string;
    subtitleOff?: string;
    titleOn?: string;
    subtitleOn?: string;
  };
 
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
  enableCompareMode = false,
  compareConfig = {
    titleOff: "Comparar elementos",
    subtitleOff: "Obtén una vista lado a lado de hasta 5 elementos",
    titleOn: "Comparando elementos",
    subtitleOn: "Selecciona elementos para comparar lado a lado"
  },
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
  
  // Estados dinámicos para filtros genéricos - Inicialización estática para evitar loops
  const [filterStates, setFilterStates] = useState<Record<string, any>>({});
  const [activeChips, setActiveChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Inicializar estados de filtros una sola vez
  React.useEffect(() => {
    if (Object.keys(filterStates).length === 0) {
      const initialStates: Record<string, any> = {};
      filters.forEach(filter => {
        if (filter.type === 'checkbox' || filter.type === 'toggle') {
          initialStates[filter.id] = [];
        } else if (filter.type === 'radio') {
          initialStates[filter.id] = '';
        } else if (filter.type === 'range') {
          initialStates[filter.id] = [filter.min || 0, filter.max || 1000];
        } else if (filter.type === 'search') {
          initialStates[filter.id] = '';
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

  // Función para generar chips de filtro
  const updateFilterChips = useCallback((filterId: string, chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setActiveChips(prev => {
      // Remover chips existentes de este filtro
      const filtered = prev.filter(chip => !chip.id.startsWith(filterId));
      // Agregar nuevos chips
      return [...filtered, ...chips];
    });
  }, []);

  // Función para resetear filtro
  const resetFilter = useCallback((filterId: string) => {
    const filter = filters.find(f => f.id === filterId);
    if (!filter) return;

    let resetValue;
    if (filter.type === 'checkbox' || filter.type === 'toggle') {
      resetValue = [];
    } else if (filter.type === 'radio') {
      resetValue = '';
    } else if (filter.type === 'range') {
      resetValue = [filter.min || 0, filter.max || 1000];
    } else if (filter.type === 'search') {
      resetValue = '';
    }

    updateFilterState(filterId, resetValue);
    // Remover chips de este filtro
    setActiveChips(prev => prev.filter(chip => !chip.id.startsWith(filterId)));
  }, [filters, updateFilterState]);

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
            // Generar chips para este filtro
            const chips = Array.isArray(value) ? value.map((val: string) => {
              const option = options.find((opt: any) => opt.value === val);
              return {
                id: `${filter.id}-${val}`,
                label: option?.label || val,
                onRemove: () => {
                  const newValue = (filterStates[filter.id] || []).filter((v: string) => v !== val);
                  updateFilterState(filter.id, newValue);
                }
              };
            }) : [];
            updateFilterChips(filter.id, chips);
          },
          onIndividualChipsChange: (chips: any) => updateFilterChips(filter.id, chips),
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
            // Generar chip para este filtro
            if (value && value !== "any") {
              const option = options.find((opt: any) => opt.value === value);
              if (option) {
                const chips = [{
                  id: `${filter.id}-${value}`,
                  label: option.label,
                  onRemove: () => resetFilter(filter.id)
                }];
                updateFilterChips(filter.id, chips);
              }
            } else {
              updateFilterChips(filter.id, []);
            }
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
          onOutputStringChange: (outputString: string) => {
            if (outputString) {
              const chips = [{
                id: `${filter.id}-range`,
                label: outputString,
                onRemove: () => resetFilter(filter.id)
              }];
              updateFilterChips(filter.id, chips);
            } else {
              updateFilterChips(filter.id, []);
            }
          },
          currency: filter.currency || "$",
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
            // Generar chips para este filtro
            const chips = Array.isArray(value) ? value.map((val: string) => {
              const option = options.find((opt: any) => opt.value === val);
              return {
                id: `${filter.id}-${val}`,
                label: option?.label || val,
                onRemove: () => {
                  const newValue = (filterStates[filter.id] || []).filter((v: string) => v !== val);
                  updateFilterState(filter.id, newValue);
                }
              };
            }) : [];
            updateFilterChips(filter.id, chips);
          },
          type_toggle: filter.type_toggle || "multiple",
          variant: filter.variant || "vertical",
          wrap: filter.wrap,
          gridCols: filter.gridCols as any,
          containerClassName: filter.containerClassName,
          labelClassName: filter.labelClassName,
          toggleGroupClassName: filter.toggleGroupClassName,
          toggleItemClassName: filter.toggleItemClassName,
          onIndividualChipsChange: (chips: any) => updateFilterChips(filter.id, chips),
          maxSelections: filter.maxSelections || 10
        });
      }
    });

    return configFilters;
  }, [
    filters, filterOptions, filterStates, searchPlaceholder,
    noResultsMessage, handleSearchChange, handleItemSelect, updateFilterState,
    updateFilterChips, resetFilter
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-2 mb-12">
      {/* Columna de Filtros - Lado Izquierdo */}
      <div className="w-full lg:w-60 flex-shrink-0 mt-1">
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
      </div>

      {/* Contenido Principal - Lado Derecho */}
      <div className="min-w-0 flex-1">
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
          <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto">
            <span className="text-xs text-muted-foreground font-medium">
              {filteredRows.length ? resultsCountText(filteredRows.length) : noResultsMessage}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                {howItWorksText}
              </span>
              <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
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
            onCardClick
          })}
        </div>
      </div>
    </div>
  );
}

export type { GenericFilterConfig, GenericFilterOption, DataSource };



