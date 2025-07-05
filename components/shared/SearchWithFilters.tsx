"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Info } from "lucide-react";
import { FilterChips, FilterChip } from "./FilterChips";
import { CheckboxOption } from "./CheckboxFilter";
import ResultFilters, { FilterConfig } from "./ResultFilters";
import CustomSelect, { CustomSelectOption } from "./CustomSelect";
import { RowData } from "./RenderFields";
import CompareSwitchControl from "./CompareSwitchControl";
import { Separator } from "@radix-ui/react-select";


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


interface SearchWithFiltersProps {
  // Datos
  rows: RowData[];
 
  // Opciones de filtros
  guestRatingOptions?: Array<{value: string, label: string, count: number}>;
  starRatingOptions?: CheckboxOption[];
  paymentTypeOptions?: CheckboxOption[];
  cancellationOptions?: CheckboxOption[];
  propertyTypeOptions?: CheckboxOption[];
  amenitiesOptions?: Array<{value: string, label: string, icon?: React.ReactNode, count: number, disabled?: boolean}>;
  popularFiltersOptions?: CheckboxOption[];
 
  // Configuración de ordenamiento
  sortOptions: CustomSelectOption[];
 
  // Configuración de data sources
  dataSources: DataSource[];
 
  // Configuración adicional
  priceRange?: { min: number, max: number, step: number };
  currency?: string;
 
  // Configuración de filtros personalizados
  customFilters?: FilterConfig[];

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
  onFiltersChange?: (filters: any) => void;
 
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
  guestRatingOptions = [],
  starRatingOptions = [],
  paymentTypeOptions = [],
  cancellationOptions = [],
  propertyTypeOptions = [],
  amenitiesOptions = [],
  popularFiltersOptions = [],
  sortOptions,
  dataSources,
  priceRange = { min: 0, max: 1000, step: 10 },
  currency = "$",
  customFilters = [],
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
  const [priceRangeValue, setPriceRangeValue] = useState<[number, number]>([priceRange.min, priceRange.max]);
  const [priceFilterString, setPriceFilterString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<RowData[]>(rows);


  // Hook personalizado para manejar filtros
  const useFilter = useCallback(<T,>(
    initialValue: T,
    filterName: string
  ): [FilterState<T>, FilterHandlers<T>] => {
    const [value, setValue] = useState<T>(initialValue);
    const [chips, setChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);
    const [outputString, setOutputString] = useState<string>("");


    const onChange = useCallback((newValue: T) => {
      setValue(newValue);
      console.log(`${filterName} seleccionado:`, newValue);
    }, [filterName]);


    const onChipsChange = useCallback((newChips: Array<{id: string, label: string, onRemove: () => void}>) => {
      setChips(newChips);
    }, []);


    const onOutputStringChange = useCallback((newOutputString: string) => {
      setOutputString(newOutputString);
    }, []);


    const onReset = useCallback(() => {
      setValue(initialValue);
      setChips([]);
      setOutputString("");
      console.log(`Filtro ${filterName} reseteado`);
    }, [initialValue, filterName]);


    return [
      { value, chips, outputString },
      { onChange, onChipsChange, onOutputStringChange, onReset }
    ];
  }, []);


  // Hook para filtros de amenities
  const useAmenitiesFilter = useCallback((
    initialValue: string[],
    options: Array<{value: string, label: string}>
  ): [FilterState<string[]>, FilterHandlers<string | string[]>] => {
    const [value, setValue] = useState<string[]>(initialValue);
    const [chips, setChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);


    const onChange = useCallback((newValue: string | string[]) => {
      const newValues = Array.isArray(newValue) ? newValue : [newValue];
      setValue(newValues);
     
      const newChips = newValues.map(val => {
        const option = options.find(opt => opt.value === val);
        return {
          id: `amenity-${val}`,
          label: option?.label || val,
          onRemove: () => {
            setValue(prev => prev.filter(v => v !== val));
          }
        };
      });
      setChips(newChips);
     
      console.log("Amenities seleccionados:", newValues);
    }, [options]);


    const onChipsChange = useCallback((newChips: Array<{id: string, label: string, onRemove: () => void}>) => {
      setChips(newChips);
    }, []);


    const onReset = useCallback(() => {
      setValue(initialValue);
      setChips([]);
      console.log("Filtro de amenities reseteado");
    }, [initialValue]);


    return [
      { value, chips },
      { onChange, onChipsChange, onReset }
    ];
  }, []);


  // Estados de filtros
  const [popularFiltersState, popularFiltersHandlers] = useFilter<string[]>([], "Filtros populares");
  const [guestRatingState, guestRatingHandlers] = useFilter<string>("", "Calificación de huéspedes");
  const [starRatingState, starRatingHandlers] = useFilter<string[]>([], "Calificación por estrellas");
  const [paymentTypeState, paymentTypeHandlers] = useFilter<string[]>([], "Tipo de pago");
  const [cancellationOptionsState, cancellationOptionsHandlers] = useFilter<string[]>([], "Opciones de cancelación");
  const [propertyTypeState, propertyTypeHandlers] = useFilter<string[]>([], "Tipo de propiedad");
  const [amenitiesState, amenitiesHandlers] = useAmenitiesFilter([], amenitiesOptions);


  // Handlers para casos especiales
  const handlePriceChange = useCallback((newRange: [number, number]) => {
    setPriceRangeValue(newRange);
    console.log("Filtrar por precio:", newRange);
  }, []);


  const resetPriceFilter = useCallback(() => {
    setPriceRangeValue([priceRange.min, priceRange.max]);
    setPriceFilterString("");
    console.log("Filtro de precio reseteado");
  }, [priceRange]);


  const resetSearchFilter = useCallback(() => {
    setSearchValue("");
    console.log("Filtro de búsqueda reseteado");
  }, []);


  // Handler para búsqueda
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
   
    if (value.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter(row =>
        row.title?.toLowerCase().includes(value.toLowerCase()) ||
        row.descMain?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [rows]);


  // Handler para selección de elemento
  const handleItemSelect = useCallback((option: any, sourceType: string) => {
    setSearchValue(option.label);
    const filtered = rows.filter(row => row.title === option.value);
    setFilteredRows(filtered);
  }, [rows]);


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
    const filters: FilterChip[] = [];


    if (searchValue.trim()) {
      filters.push({
        id: "search",
        label: "Búsqueda",
        value: searchValue,
        onRemove: resetSearchFilter,
      });
    }


    if (priceFilterString) {
      filters.push({
        id: "price",
        label: "Precio",
        value: priceFilterString,
        onRemove: resetPriceFilter,
      });
    }


    if (guestRatingState.value && guestRatingState.value !== "any") {
      const ratingOption = guestRatingOptions.find(opt => opt.value === guestRatingState.value);
      if (ratingOption) {
        filters.push({
          id: "guest-rating",
          label: "Calificación",
          value: ratingOption.label,
          onRemove: guestRatingHandlers.onReset,
        });
      }
    }


    const allChips = [
      ...amenitiesState.chips,
      ...popularFiltersState.chips,
      ...starRatingState.chips,
      ...paymentTypeState.chips,
      ...cancellationOptionsState.chips,
      ...propertyTypeState.chips
    ];


    allChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });


    return filters;
  }, [
    searchValue, priceFilterString, guestRatingState.value, guestRatingOptions,
    amenitiesState.chips, popularFiltersState.chips, starRatingState.chips,
    paymentTypeState.chips, cancellationOptionsState.chips, propertyTypeState.chips,
    resetSearchFilter, resetPriceFilter, guestRatingHandlers.onReset
  ]);


  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    resetPriceFilter();
    resetSearchFilter();
    amenitiesHandlers.onReset();
    popularFiltersHandlers.onReset();
    guestRatingHandlers.onReset();
    starRatingHandlers.onReset();
    paymentTypeHandlers.onReset();
    cancellationOptionsHandlers.onReset();
    propertyTypeHandlers.onReset();
  }, [
    resetPriceFilter, resetSearchFilter, amenitiesHandlers.onReset,
    popularFiltersHandlers.onReset, guestRatingHandlers.onReset,
    starRatingHandlers.onReset, paymentTypeHandlers.onReset,
    cancellationOptionsHandlers.onReset, propertyTypeHandlers.onReset
  ]);


  // Configuración de filtros
  const filtersConfig: FilterConfig[] = useMemo(() => {
    const baseFilters: FilterConfig[] = [
      {
        id: "search",
        type: "search",
        label: "Buscar",
        placeholder: searchPlaceholder,
        value: searchValue,
        onValueChange: handleSearchChange,
        dataSources: dataSources,
        onSelect: handleItemSelect,
        showClearButton: true,
        minSearchLength: 2,
        disabled: false,
        emptyMessage: noResultsMessage,
        searchPlaceholder: searchPlaceholder
      },
      { id: "separator-1", type: "separator", className: "bg-muted" }
    ];


    if (popularFiltersOptions.length > 0) {
      baseFilters.push({
        id: "popular-filters",
        type: "checkbox",
        label: "Filtros populares",
        options: popularFiltersOptions,
        selectedValues: popularFiltersState.value,
        onChange: popularFiltersHandlers.onChange,
        onOutputStringChange: popularFiltersHandlers.onOutputStringChange,
        onIndividualChipsChange: popularFiltersHandlers.onChipsChange,
        showCounts: true,
        maxSelections: 10,
        initialVisibleCount: 5,
        showMoreText: "Ver más filtros",
        showLessText: "Ver menos"
      });
      baseFilters.push({ id: "separator-2", type: "separator" });
    }


    if (guestRatingOptions.length > 0) {
      baseFilters.push({
        id: "guest-rating",
        type: "radio",
        label: "Calificación de huéspedes",
        options: guestRatingOptions,
        value: guestRatingState.value,
        onValueChange: guestRatingHandlers.onChange,
        variant: "vertical",
        helperText: "Filtra por calificación promedio"
      });
      baseFilters.push({ id: "separator-3", type: "separator" });
    }


    baseFilters.push({
      id: "price-range",
      type: "range",
      label: "Precio por noche",
      min: priceRange.min,
      max: priceRange.max,
      value: priceRangeValue,
      onChange: handlePriceChange,
      onOutputStringChange: setPriceFilterString,
      currency: currency,
      step: priceRange.step
    });


    if (amenitiesOptions.length > 0) {
      baseFilters.push({
        id: "amenities",
        type: "toggle",
        label: "Amenities",
        options: amenitiesOptions,
        value: amenitiesState.value,
        onValueChange: amenitiesHandlers.onChange,
        type_toggle: "multiple",
        variant: "vertical",
        wrap: true,
        gridCols: "auto",
        containerClassName: "w-full",
        labelClassName: "text-lg font-semibold mb-4",
        toggleGroupClassName: "gap-3",
        toggleItemClassName: "border-2 hover:border-primary/50 transition-colors",
        onOutputStringChange: amenitiesHandlers.onOutputStringChange,
        onIndividualChipsChange: amenitiesHandlers.onChipsChange,
        maxSelections: 10
      });
      baseFilters.push({ id: "separator-4", type: "separator" });
    }


    if (starRatingOptions.length > 0) {
      baseFilters.push({
        id: "star-rating",
        type: "checkbox",
        label: "Calificación por estrellas",
        options: starRatingOptions,
        selectedValues: starRatingState.value,
        onChange: starRatingHandlers.onChange,
        onIndividualChipsChange: starRatingHandlers.onChipsChange,
        showCounts: true,
        maxSelections: 5,
        initialVisibleCount: 5,
        showMoreText: "Ver más",
        showLessText: "Ver menos"
      });
      baseFilters.push({ id: "separator-5", type: "separator" });
    }


    if (paymentTypeOptions.length > 0) {
      baseFilters.push({
        id: "payment-type",
        type: "checkbox",
        label: "Tipo de pago",
        options: paymentTypeOptions,
        selectedValues: paymentTypeState.value,
        onChange: paymentTypeHandlers.onChange,
        onIndividualChipsChange: paymentTypeHandlers.onChipsChange,
        showCounts: true,
        maxSelections: 1,
        initialVisibleCount: 1
      });
      baseFilters.push({ id: "separator-6", type: "separator" });
    }


    if (cancellationOptions.length > 0) {
      baseFilters.push({
        id: "cancellation-options",
        type: "checkbox",
        label: "Opciones de cancelación",
        options: cancellationOptions,
        selectedValues: cancellationOptionsState.value,
        onChange: cancellationOptionsHandlers.onChange,
        onIndividualChipsChange: cancellationOptionsHandlers.onChipsChange,
        showCounts: true,
        maxSelections: 1,
        initialVisibleCount: 1
      });
      baseFilters.push({ id: "separator-7", type: "separator" });
    }


    if (propertyTypeOptions.length > 0) {
      baseFilters.push({
        id: "property-type",
        type: "checkbox",
        label: "Tipo de propiedad",
        options: propertyTypeOptions,
        selectedValues: propertyTypeState.value,
        onChange: propertyTypeHandlers.onChange,
        onIndividualChipsChange: propertyTypeHandlers.onChipsChange,
        showCounts: true,
        maxSelections: 10,
        initialVisibleCount: 8,
        showMoreText: "Ver más",
        showLessText: "Ver menos"
      });
    }


    return [...baseFilters, ...customFilters];
  }, [
    searchValue, handleSearchChange, dataSources, handleItemSelect, compareMode,
    popularFiltersOptions, popularFiltersState.value, popularFiltersHandlers,
    guestRatingOptions, guestRatingState.value, guestRatingHandlers,
    priceRangeValue, handlePriceChange, amenitiesOptions, amenitiesState.value, amenitiesHandlers,
    starRatingOptions, starRatingState.value, starRatingHandlers,
    paymentTypeOptions, paymentTypeState.value, paymentTypeHandlers,
    cancellationOptions, cancellationOptionsState.value, cancellationOptionsHandlers,
    propertyTypeOptions, propertyTypeState.value, propertyTypeHandlers,
    customFilters, priceRange, currency, searchPlaceholder, noResultsMessage
  ]);


  // Notificar cambios de filtros
  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        search: searchValue,
        price: priceRangeValue,
        guestRating: guestRatingState.value,
        amenities: amenitiesState.value,
        popularFilters: popularFiltersState.value,
        starRating: starRatingState.value,
        paymentType: paymentTypeState.value,
        cancellation: cancellationOptionsState.value,
        propertyType: propertyTypeState.value,
        compareMode
      });
    }
  }, [
    searchValue, priceRangeValue, guestRatingState.value, amenitiesState.value,
    popularFiltersState.value, starRatingState.value, paymentTypeState.value,
    cancellationOptionsState.value, propertyTypeState.value, compareMode, onFiltersChange
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



