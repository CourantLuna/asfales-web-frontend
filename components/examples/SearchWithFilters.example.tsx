import SearchWithFilters, { GenericFilterConfig, GenericFilterOption } from '../shared/SearchWithFilters';
import { CustomSelectOption } from '../shared/CustomSelect';
import { RowData } from '../shared/RenderFields';

// Ejemplo de uso del componente SearchWithFilters con la nueva funcionalidad responsive

const ExampleSearchWithFilters = () => {
  // Datos de ejemplo
  const exampleData: RowData[] = [
    {
      id: "1",
      title: "Hotel Ejemplo 1",
      descMain: "Un hotel moderno en el centro de la ciudad",
      price: 150,
      rating: 4.5,
    },
    {
      id: "2", 
      title: "Hotel Ejemplo 2",
      descMain: "Hotel boutique con vista al mar",
      price: 220,
      rating: 4.8,
    },
    // ... más datos
  ];

  // Configuración de filtros
  const filtersConfig: GenericFilterConfig[] = [
    {
      id: "search",
      type: "search",
      label: "Buscar hoteles",
      placeholder: "Buscar por nombre o descripción...",
      showClearButton: true,
      minSearchLength: 2,
    },
    {
      id: "separator1",
      type: "separator",
    },
    {
      id: "price_range",
      type: "range",
      label: "Rango de precios",
      min: 0,
      max: 500,
      step: 10,
      currency: "$",
    },
    {
      id: "hotel_type",
      type: "checkbox",
      label: "Tipo de hotel",
      showCounts: true,
      maxSelections: 5,
      initialVisibleCount: 4,
      showMoreText: "Ver más tipos",
      showLessText: "Ver menos",
    },
    {
      id: "amenities",
      type: "toggle",
      label: "Amenidades",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: 2,
      maxSelections: 8,
    },
    {
      id: "rating",
      type: "radio",
      label: "Calificación mínima",
      variant: "vertical",
      helperText: "Selecciona la calificación mínima deseada",
    },
  ];

  // Opciones para cada filtro
  const filterOptions: { [filterId: string]: GenericFilterOption[] } = {
    hotel_type: [
      { value: "luxury", label: "Lujo", count: 12 },
      { value: "boutique", label: "Boutique", count: 8 },
      { value: "business", label: "Negocios", count: 15 },
      { value: "resort", label: "Resort", count: 6 },
      { value: "budget", label: "Económico", count: 20 },
    ],
    amenities: [
      { value: "wifi", label: "Wi-Fi gratuito" },
      { value: "pool", label: "Piscina" },
      { value: "gym", label: "Gimnasio" },
      { value: "spa", label: "Spa" },
      { value: "parking", label: "Estacionamiento" },
      { value: "restaurant", label: "Restaurante" },
      { value: "bar", label: "Bar" },
      { value: "room_service", label: "Servicio a la habitación" },
    ],
    rating: [
      { value: "any", label: "Cualquier calificación" },
      { value: "3", label: "3+ estrellas" },
      { value: "4", label: "4+ estrellas" },
      { value: "5", label: "5 estrellas" },
    ],
  };

  // Opciones de ordenamiento
  const sortOptions: CustomSelectOption[] = [
    { key: "relevance", label: "Relevancia" },
    { key: "price_asc", label: "Precio: menor a mayor" },
    { key: "price_desc", label: "Precio: mayor a menor" },
    { key: "rating_desc", label: "Mejor calificación" },
    { key: "distance", label: "Distancia" },
  ];

  // Función para renderizar los resultados
  const renderResults = ({ 
    filteredRows, 
    compareMode, 
    onCardClick 
  }: {
    filteredRows: RowData[];
    compareMode: boolean;
    onCardClick: (idx: number, row: RowData) => void;
  }) => {
    if (filteredRows?.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron resultados</p>
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        {filteredRows.map((row, idx) => (
          <div 
            key={row.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onCardClick(idx, row)}
          >
            <h3 className="font-semibold text-lg">{row.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{row.descMain}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-lg font-bold">${row.price}/noche</span>
              <span className="text-sm text-muted-foreground">★ {row.rating}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Buscar Hoteles</h1>
      
      <SearchWithFilters
        rows={exampleData}
        filters={filtersConfig}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        enableCompareMode={true}
        compareConfig={{
          titleOff: "Comparar hoteles",
          subtitleOff: "Selecciona hasta 5 hoteles para comparar",
          titleOn: "Comparando hoteles",
          subtitleOn: "Selecciona los hoteles que quieres comparar",
        }}
        renderResults={renderResults}
        onCardClick={(idx, row) => {
          console.log("Hotel seleccionado:", row.title);
        }}
        onFiltersChange={(filters) => {
          console.log("Filtros cambiados:", filters);
        }}
        searchPlaceholder="Buscar hoteles..."
        noResultsMessage="No se encontraron hoteles"
        clearFiltersText="Limpiar filtros"
        sortByText="Ordenar por"
        howItWorksText="¿Cómo funciona nuestro orden?"
        resultsCountText={(count) => `${count} hoteles encontrados`}
      />
    </div>
  );
};

export default ExampleSearchWithFilters;
