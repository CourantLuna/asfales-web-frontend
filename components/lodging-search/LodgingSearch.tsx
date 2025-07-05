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
import CustomSelect, { CustomSelectOption } from "../shared/CustomSelect";
import CompareSwitchControl from "../shared/CompareSwitchControl";
import { PriceRangeFilter } from "../shared/PriceRangeFilter";
import { AirVent, Bath, Bus, Car, Dices, Dumbbell, Gamepad2, Info, LandPlot, MapPin, Mountain, Phone, Utensils, WashingMachine, Waves, Wifi, Building2 } from "lucide-react";
import { FilterChips, FilterChip } from "../shared/FilterChips";
import { CheckboxFilter, CheckboxOption } from "../shared/CheckboxFilter";
import { Separator } from "@/components/ui/separator";
import { StandardToggleGroup } from "../shared/StandardToggleGroup";
import { StandardRadioGroup } from "../shared/StandardRadioGroup";
import { StandardSearchField } from "../shared/StandardSearchField";
import ResultFilters, { FilterConfig } from "../shared/ResultFilters";


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

export default function LodgingSearch() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const progressRef = useRef<EventDrivenProgressRef>(null);

  const [sort, setSort] = React.useState("recomendado");
  const [compareMode, setCompareMode] = React.useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [priceFilterString, setPriceFilterString] = useState<string>("");
  
  // Estado para búsqueda por nombre de propiedad
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);
  
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);

  // Estados para filtros de checkbox - Servicios del hotel
  // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [amenitiesOutputString, setAmenitiesOutputString] = useState<string>("");
  const [amenitiesChips, setAmenitiesChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Estados para filtros populares
  const [selectedPopularFilters, setSelectedPopularFilters] = useState<string[]>([]);
  const [popularFiltersOutputString, setPopularFiltersOutputString] = useState<string>("");
  const [popularFiltersChips, setPopularFiltersChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Estado para calificación de huéspedes
  const [selectedGuestRating, setSelectedGuestRating] = useState<string>("");

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Estados para filtros de calificación por estrellas
  const [selectedStarRating, setSelectedStarRating] = useState<string[]>([]);
  const [starRatingChips, setStarRatingChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Estados para filtros de tipo de pago
  const [selectedPaymentType, setSelectedPaymentType] = useState<string[]>([]);
  const [paymentTypeChips, setPaymentTypeChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Estados para filtros de opciones de cancelación
  const [selectedCancellationOptions, setSelectedCancellationOptions] = useState<string[]>([]);
  const [cancellationOptionsChips, setCancellationOptionsChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Estados para filtros de tipo de propiedad
  const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>([]);
  const [propertyTypeChips, setPropertyTypeChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Opciones para calificación de huéspedes
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

  // Opciones para calificación por estrellas
  const starRatingOptions: CheckboxOption[] = React.useMemo(() => [
    { value: "5-stars", label: "5 estrellas", count: 4 },
    { value: "4-stars", label: "4 estrellas", count: 44 },
    { value: "3-stars", label: "3 estrellas", count: 102 },
    { value: "2-stars", label: "2 estrellas", count: 123 },
    { value: "1-star", label: "1 estrella", count: 4 },
  ], []);

  // Opciones para tipo de pago
  const paymentTypeOptions: CheckboxOption[] = React.useMemo(() => [
    { value: "reserve-now-pay-later", label: "Reserva ahora, paga después", count: 287 },
  ], []);

  // Opciones para cancelación de propiedad
  const cancellationOptions: CheckboxOption[] = React.useMemo(() => [
    { value: "fully-refundable", label: "Propiedad totalmente reembolsable", count: 245 },
  ], []);

  // Opciones para tipo de propiedad
  const propertyTypeOptions: CheckboxOption[] = React.useMemo(() => [
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
  ], []);

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

  // Opciones para filtros populares
  const popularFiltersOptions: CheckboxOption[] = React.useMemo(() => [
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
  ], []);
  
  // Componente reutilizable para el contenido de filtros
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Búsqueda por nombre de propiedad */}
      <StandardSearchField
        label="Buscar por nombre de propiedad"
        placeholder="Buscar alojamiento..."
        value={searchValue}
        onValueChange={handleSearchChange}
        dataSources={dataSourcesLodging}
        onSelect={handleLodgingSelect}
        showClearButton={true}
        minSearchLength={2}
        disabled={false}
        emptyMessage="No se encontraron propiedades"
        searchPlaceholder="Escribir para buscar propiedades..."
      />
  
      {/* Compare Switch Control */}
      <CompareSwitchControl
        checked={compareMode}
        onCheckedChange={setCompareMode}
        titleOff="Comparar propiedades"
        subtitleOff="Obtén una vista lado a lado de hasta 5 propiedades"
        titleOn="Comparando propiedades"
        subtitleOn="Selecciona propiedades para comparar lado a lado"
      />
  
      <Separator className="my-4 bg-muted" />
  
      {/* Filtros Populares */}
      <CheckboxFilter
        label="Filtros populares"
        options={popularFiltersOptions}
        selectedValues={selectedPopularFilters}
        onChange={handlePopularFiltersChange}
        onOutputStringChange={handlePopularFiltersOutputStringChange}
        onIndividualChipsChange={handlePopularFiltersChipsChange}
        showCounts={true}
        maxSelections={10}
        initialVisibleCount={5}
        showMoreText="Ver más filtros"
        showLessText="Ver menos"
      />
  
      <Separator className="my-4" />
  
      {/* Calificación de huéspedes */}
      <StandardRadioGroup
        label="Calificación de huéspedes"
        options={guestRatingOptions}
        value={selectedGuestRating}
        onValueChange={handleGuestRatingChange}
        variant="vertical"
        helperText="Filtra por calificación promedio"
      />
  
      <Separator className="my-4" />
  
      {/* Filtro de Precio */}
      <PriceRangeFilter
        min={0}
        max={1000}
        value={priceRange}
        onChange={(newRange) => {
          setPriceRange(newRange);
          console.log("Filtrar por precio:", newRange);
        }}
        onOutputStringChange={setPriceFilterString}
        label="Precio por noche"
        currency="$"
        step={10}
      />
  
      {/* Servicios del Hotel */}
      <StandardToggleGroup
        label="Amenities"
        options={amenitiesOptions}
        value={selectedAmenities}
        onValueChange={handleStandardToggleChange}
        type="multiple"
        variant="vertical"
        wrap={true}
        gridCols="auto"
        containerClassName="w-full"
        labelClassName="text-lg font-semibold mb-4"
        toggleGroupClassName="gap-3"
        toggleItemClassName="border-2 hover:border-primary/50 transition-colors"
      />
  
      <Separator className="my-4" />
  
      {/* Calificación por estrellas */}
      <CheckboxFilter
        label="Calificación por estrellas"
        options={starRatingOptions}
        selectedValues={selectedStarRating}
        onChange={handleStarRatingChange}
        onIndividualChipsChange={handleStarRatingChipsChange}
        showCounts={true}
        maxSelections={5}
        initialVisibleCount={5}
        showMoreText="Ver más"
        showLessText="Ver menos"
      />
  
      <Separator className="my-4" />
  
      {/* Tipo de pago */}
      <CheckboxFilter
        label="Tipo de pago"
        options={paymentTypeOptions}
        selectedValues={selectedPaymentType}
        onChange={handlePaymentTypeChange}
        onIndividualChipsChange={handlePaymentTypeChipsChange}
        showCounts={true}
        maxSelections={1}
        initialVisibleCount={1}
      />
  
      <Separator className="my-4" />
  
      {/* Opciones de cancelación de propiedad */}
      <CheckboxFilter
        label="Opciones de cancelación"
        options={cancellationOptions}
        selectedValues={selectedCancellationOptions}
        onChange={handleCancellationOptionsChange}
        onIndividualChipsChange={handleCancellationOptionsChipsChange}
        showCounts={true}
        maxSelections={1}
        initialVisibleCount={1}
      />
  
      <Separator className="my-4" />
  
      {/* Tipo de propiedad */}
      <CheckboxFilter
        label="Tipo de propiedad"
        options={propertyTypeOptions}
        selectedValues={selectedPropertyType}
        onChange={handlePropertyTypeChange}
        onIndividualChipsChange={handlePropertyTypeChipsChange}
        showCounts={true}
        maxSelections={10}
        initialVisibleCount={8}
        showMoreText="Ver más"
        showLessText="Ver menos"
      />
    </div>
  );

  // Handler para StandardToggleGroup que maneja tanto string como string[]
  const handleStandardToggleChange = React.useCallback((value: string | string[]) => {
    const newValues = Array.isArray(value) ? value : [value];
    setSelectedAmenities(newValues);
    
    // Generar chips manualmente para StandardToggleGroup
    const newChips = newValues.map(val => {
      const option = amenitiesOptions.find(opt => opt.value === val);
      return {
        id: `amenity-${val}`,
        label: option?.label || val,
        onRemove: () => {
          setSelectedAmenities(prev => prev.filter(v => v !== val));
        }
      };
    });
    setAmenitiesChips(newChips);
    
    console.log("Amenities seleccionados:", newValues);
  }, [amenitiesOptions]);

  // Handlers para calificación por estrellas
  const handleStarRatingChange = React.useCallback((values: string[]) => {
    setSelectedStarRating(values);
    console.log("Calificación por estrellas seleccionada:", values);
  }, []);

  const handleStarRatingChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setStarRatingChips(chips);
  }, []);

  // Handlers para tipo de pago
  const handlePaymentTypeChange = React.useCallback((values: string[]) => {
    setSelectedPaymentType(values);
    console.log("Tipo de pago seleccionado:", values);
  }, []);

  const handlePaymentTypeChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setPaymentTypeChips(chips);
  }, []);

  // Handlers para opciones de cancelación
  const handleCancellationOptionsChange = React.useCallback((values: string[]) => {
    setSelectedCancellationOptions(values);
    console.log("Opciones de cancelación seleccionadas:", values);
  }, []);

  const handleCancellationOptionsChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setCancellationOptionsChips(chips);
  }, []);

  // Handlers para tipo de propiedad
  const handlePropertyTypeChange = React.useCallback((values: string[]) => {
    setSelectedPropertyType(values);
    console.log("Tipo de propiedad seleccionado:", values);
  }, []);

  const handlePropertyTypeChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setPropertyTypeChips(chips);
  }, []);

  // Callbacks para filtros populares
  const handlePopularFiltersChange = React.useCallback((values: string[]) => {
    setSelectedPopularFilters(values);
    console.log("Filtros populares seleccionados:", values);
  }, []);

  // Callback para calificación de huéspedes
  const handleGuestRatingChange = React.useCallback((value: string) => {
    setSelectedGuestRating(value);
    console.log("Calificación seleccionada:", value);
  }, []);

  const handlePopularFiltersOutputStringChange = React.useCallback((outputString: string) => {
    setPopularFiltersOutputString(outputString);
  }, []);

  const handlePopularFiltersChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setPopularFiltersChips(chips);
  }, []);

  // Función para resetear el filtro de precio
  const resetPriceFilter = React.useCallback(() => {
    setPriceRange([0, 1000]);
    console.log("Filtro de precio reseteado");
  }, []);

  // Función para resetear filtros de servicios
  const resetAmenitiesFilter = React.useCallback(() => {
    setSelectedAmenities([]);
    console.log("Filtro de servicios reseteado");
  }, []);

  // Función para resetear filtros populares
  const resetPopularFilters = React.useCallback(() => {
    setSelectedPopularFilters([]);
    console.log("Filtros populares reseteados");
  }, []);

  // Función para resetear calificación de huéspedes
  const resetGuestRating = React.useCallback(() => {
    setSelectedGuestRating("");
    console.log("Calificación de huéspedes reseteada");
  }, []);

  // Agregar después de resetGuestRating

  // Funciones para resetear nuevos filtros
  const resetStarRatingFilter = React.useCallback(() => {
    setSelectedStarRating([]);
    setStarRatingChips([]);
    console.log("Filtro de calificación por estrellas reseteado");
  }, []);

  const resetPaymentTypeFilter = React.useCallback(() => {
    setSelectedPaymentType([]);
    setPaymentTypeChips([]);
    console.log("Filtro de tipo de pago reseteado");
  }, []);

  const resetCancellationOptionsFilter = React.useCallback(() => {
    setSelectedCancellationOptions([]);
    setCancellationOptionsChips([]);
    console.log("Filtro de opciones de cancelación reseteado");
  }, []);

  const resetPropertyTypeFilter = React.useCallback(() => {
    setSelectedPropertyType([]);
    setPropertyTypeChips([]);
    console.log("Filtro de tipo de propiedad reseteado");
  }, []);

  // Generar filtros activos para FilterChips
  const generateActiveFilters = (): FilterChip[] => {
    const filters: FilterChip[] = [];

    // Filtro de búsqueda por nombre
    if (searchValue.trim()) {
      filters.push({
        id: "search",
        label: "Búsqueda",
        value: searchValue,
        onRemove: () => setSearchValue(""),
      });
    }

    // Filtro de precio
    if (priceFilterString) {
      filters.push({
        id: "price",
        label: "Precio",
        value: priceFilterString,
        onRemove: resetPriceFilter,
      });
    }

    // Filtro de calificación de huéspedes
    if (selectedGuestRating && selectedGuestRating !== "any") {
      const ratingOption = guestRatingOptions.find(opt => opt.value === selectedGuestRating);
      if (ratingOption) {
        filters.push({
          id: "guest-rating",
          label: "Calificación",
          value: ratingOption.label,
          onRemove: resetGuestRating,
        });
      }
    }

    // Filtros de servicios individuales
    amenitiesChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "", // Sin prefijo
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Filtros populares individuales
    popularFiltersChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "", // Sin prefijo
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Agregar antes de return filters; en generateActiveFilters

    // Filtros de calificación por estrellas individuales
    starRatingChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Filtros de tipo de pago individuales
    paymentTypeChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Filtros de opciones de cancelación individuales
    cancellationOptionsChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Filtros de tipo de propiedad individuales
    propertyTypeChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "",
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    return filters;
  };

  // Reemplazar clearAllFilters existente

  const clearAllFilters = React.useCallback(() => {
    resetPriceFilter();
    resetAmenitiesFilter();
    resetPopularFilters();
    resetGuestRating();
    resetStarRatingFilter();
    resetPaymentTypeFilter();
    resetCancellationOptionsFilter();
    resetPropertyTypeFilter();
    setSearchValue(""); // Limpiar búsqueda
  }, [resetPriceFilter, resetAmenitiesFilter, resetPopularFilters, resetGuestRating, resetStarRatingFilter, resetPaymentTypeFilter, resetCancellationOptionsFilter, resetPropertyTypeFilter]);
  
  const handleApplyFilters = React.useCallback(() => {
    setIsFiltersSheetOpen(false);
  }, []);
  
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

  // Handler para búsqueda por nombre de propiedad
  const handleSearchChange = React.useCallback((value: string) => {
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

  // Handler para selección de propiedad
  const handleLodgingSelect = React.useCallback((option: any, sourceType: string) => {
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

  // Configuración de filtros para ResultFilters
  const filtersConfig: FilterConfig[] = React.useMemo(() => [
    // Filtro de búsqueda
    {
      id: "property-search",
      type: "search",
      label: "Buscar por nombre de propiedad",
      placeholder: "Buscar alojamiento...",
      value: searchValue,
      onValueChange: handleSearchChange,
      dataSources: dataSourcesLodging,
      onSelect: handleLodgingSelect,
      showClearButton: true,
      minSearchLength: 2,
      disabled: false,
      emptyMessage: "No se encontraron propiedades",
      searchPlaceholder: "Escribir para buscar propiedades..."
    },
    // Compare Switch Control personalizado
  {
    id: "compare-switch",
    type: "custom",
    content: (
      <CompareSwitchControl
        checked={compareMode}
        onCheckedChange={setCompareMode}
        titleOff="Comparar propiedades"
        subtitleOff="Obtén una vista lado a lado de hasta 5 propiedades"
        titleOn="Comparando propiedades"
        subtitleOn="Selecciona propiedades para comparar lado a lado"
      />
    ),
    containerClassName: "my-4"
  },
    
    // Separador
    {
      id: "separator-1",
      type: "separator",
      className: "bg-muted"
    },
    
    // Filtros populares
    {
      id: "popular-filters",
      type: "checkbox",
      label: "Filtros populares",
      options: popularFiltersOptions,
      selectedValues: selectedPopularFilters,
      onChange: handlePopularFiltersChange,
      onOutputStringChange: handlePopularFiltersOutputStringChange,
      onIndividualChipsChange: handlePopularFiltersChipsChange,
      showCounts: true,
      maxSelections: 10,
      initialVisibleCount: 5,
      showMoreText: "Ver más filtros",
      showLessText: "Ver menos"
    },
    
    // Separador
    {
      id: "separator-2",
      type: "separator"
    },
    
    // Calificación de huéspedes
    {
      id: "guest-rating",
      type: "radio",
      label: "Calificación de huéspedes",
      options: guestRatingOptions,
      value: selectedGuestRating,
      onValueChange: handleGuestRatingChange,
      variant: "vertical",
      helperText: "Filtra por calificación promedio"
    },
    
    // Separador
    {
      id: "separator-3",
      type: "separator"
    },
    
    // Filtro de precio
    {
      id: "price-range",
      type: "range",
      label: "Precio por noche",
      min: 0,
      max: 1000,
      value: priceRange,
      onChange: (newRange) => {
        setPriceRange(newRange);
        console.log("Filtrar por precio:", newRange);
      },
      onOutputStringChange: setPriceFilterString,
      currency: "$",
      step: 10
    },
    
    // Amenities
    {
      id: "amenities",
      type: "toggle",
      label: "Amenities",
      options: amenitiesOptions,
      value: selectedAmenities,
      onValueChange: handleStandardToggleChange,
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      containerClassName: "w-full",
      labelClassName: "text-lg font-semibold mb-4",
      toggleGroupClassName: "gap-3",
      toggleItemClassName: "border-2 hover:border-primary/50 transition-colors"
    },
    
    // Separador
    {
      id: "separator-4",
      type: "separator"
    },
    
    // Calificación por estrellas
    {
      id: "star-rating",
      type: "checkbox",
      label: "Calificación por estrellas",
      options: starRatingOptions,
      selectedValues: selectedStarRating,
      onChange: handleStarRatingChange,
      onIndividualChipsChange: handleStarRatingChipsChange,
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 5,
      showMoreText: "Ver más",
      showLessText: "Ver menos"
    },
    
    // Separador
    {
      id: "separator-5",
      type: "separator"
    },
    
    // Tipo de pago
    {
      id: "payment-type",
      type: "checkbox",
      label: "Tipo de pago",
      options: paymentTypeOptions,
      selectedValues: selectedPaymentType,
      onChange: handlePaymentTypeChange,
      onIndividualChipsChange: handlePaymentTypeChipsChange,
      showCounts: true,
      maxSelections: 1,
      initialVisibleCount: 1
    },
    
    // Separador
    {
      id: "separator-6",
      type: "separator"
    },
    
    // Opciones de cancelación
    {
      id: "cancellation-options",
      type: "checkbox",
      label: "Opciones de cancelación",
      options: cancellationOptions,
      selectedValues: selectedCancellationOptions,
      onChange: handleCancellationOptionsChange,
      onIndividualChipsChange: handleCancellationOptionsChipsChange,
      showCounts: true,
      maxSelections: 1,
      initialVisibleCount: 1
    },
    
    // Separador
    {
      id: "separator-7",
      type: "separator"
    },
    
    // Tipo de propiedad
    {
      id: "property-type",
      type: "checkbox",
      label: "Tipo de propiedad",
      options: propertyTypeOptions,
      selectedValues: selectedPropertyType,
      onChange: handlePropertyTypeChange,
      onIndividualChipsChange: handlePropertyTypeChipsChange,
      showCounts: true,
      maxSelections: 10,
      initialVisibleCount: 8,
      showMoreText: "Ver más",
      showLessText: "Ver menos"
    }
  ], [
    searchValue,
    handleSearchChange,
    dataSourcesLodging,
    handleLodgingSelect,
    popularFiltersOptions,
    selectedPopularFilters,
    handlePopularFiltersChange,
    handlePopularFiltersOutputStringChange,
    handlePopularFiltersChipsChange,
    guestRatingOptions,
    selectedGuestRating,
    handleGuestRatingChange,
    priceRange,
    setPriceFilterString,
    amenitiesOptions,
    selectedAmenities,
    handleStandardToggleChange,
    starRatingOptions,
    selectedStarRating,
    handleStarRatingChange,
    handleStarRatingChipsChange,
    paymentTypeOptions,
    selectedPaymentType,
    handlePaymentTypeChange,
    handlePaymentTypeChipsChange,
    cancellationOptions,
    selectedCancellationOptions,
    handleCancellationOptionsChange,
    handleCancellationOptionsChipsChange,
    propertyTypeOptions,
    selectedPropertyType,
    handlePropertyTypeChange,
    handlePropertyTypeChipsChange
  ]);

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
    <div className="flex flex-col lg:flex-row gap-6 mt-2 mb-12">
      {/* Columna de Filtros - Lado Izquierdo */}
      <div className="w-full lg:w-60 flex-shrink-0 mt-1">
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
            clearAllText="Limpiar filtros"
          />
        </div>

        {/* Barra de control superior */}
                <div className="flex flex-col md:flex-row w-full items-center md:justify-between justify-center gap-4 border-b border-muted pb-2 mb-6">
          <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto">
            <span className="text-xs text-muted-foreground font-medium">
              {filteredRows.length
                ? `${filteredRows.length}+ alojamientos`
                : "Alojamientos encontrados"}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                ¿Cómo funciona nuestro orden?
              </span>
              <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <span className="text-xs text-muted-foreground mb-0.5">
              Ordenar por
            </span>
            <CustomSelect
              options={sortOptions}
              selectedKey={sort}
              onChange={setSort}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Cards de Alojamientos */}
          <LodgingCardList
            
            onCardClick={(idx, row) =>
              alert(`¡Click en card #${idx}: ${row.title}!`)
            }
            rows={filteredRows}
            showCompareCheckbox={compareMode}
            initialVisibleCards={6}
            cardsPerStep={6}
            showMoreLabel="Mostrar más alojamientos"
            showLessLabel="Mostrar menos"
            enableShowLess={true}
          />
        </div>
      </div>
    </div>
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


