'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { ItinerariesPrivateCard } from './ItinerariesPrivateCard';
import PaginationCard from '@/components/shared/PaginationCard';
import { usePagination } from '@/hooks/usePagination';
import { 
  myPrivateItineraries, 
  myItinerariesFilterOptions,
  myItinerariesSortOptions,
  filterMyItineraries,
  sortMyItineraries,
  type PrivateItinerary
} from '@/lib/data/itineraries-data';
import SearchWithFilters, { GenericFilterConfig } from '@/components/shared/SearchWithFilters';
import { RowData } from '@/components/shared/RenderFields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Star,
  Users,
  Share2,
  Filter,
  Grid3X3,
  List,
  ChevronRight
} from 'lucide-react';

// Tipos para RowData de itinerarios privados
export interface MyItineraryRowData extends RowData {
  id: string;
  title: string;
  descMain: string;
  descSecondary?: string;
  originalData: PrivateItinerary;
}

interface IMyItinerariesClientProps {
  className?: string;
}

export default function MyItinerariesClient({ className = "" }: IMyItinerariesClientProps) {
  // Estados principales
  const [rows, setRows] = useState<MyItineraryRowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredRowsLength, setFilteredRowsLength] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Constantes de paginación
  const initialVisibleItineraries = 6;
  const itinerariesPerStep = 3;
  // Hook de paginación
  const {
    visibleItems: visibleItineraries,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: initialVisibleItineraries,
    itemsPerStep: itinerariesPerStep,
    totalItems: filteredRowsLength
  });



  // Configuración del data source para búsqueda
  const dataSourcesMyItineraries = useMemo(() => [
    {
      id: "my-itineraries",
      label: "Mis Itinerarios",
      icon: <MapPin className="h-4 w-4" />,
      type: "custom" as const,
      nameLabelField: "title",
      nameValueField: "title",
      nameDescriptionField: "descMain",
      options: rows
    }
  ], [rows]);

  // Configuración de filtros
  const getFiltersForMyItineraries = useMemo((): GenericFilterConfig[] => [
    {
      id: "search",
      type: "search",
      label: "Buscar mis itinerarios",
      placeholder: "Buscar por título, destino, etiquetas...",
      dataSources: dataSourcesMyItineraries,
      defaultValue: "",
      showClearButton: true,
      minSearchLength: 2,
      emptyMessage: "No se encontraron itinerarios",
      searchPlaceholder: "Escribe para buscar itinerarios..."
    },
    {
      id: "separator-1",
      type: "separator"
    },
    {
      id: "status",
      type: "toggle",
      label: "Estado del itinerario",
      type_toggle: "multiple",
      variant: "vertical",
      wrap: true,
      gridCols: "auto",
      maxSelections: 3,
      defaultValue: []
    },
    {
      id: "separator-2",
      type: "separator"
    },
    {
      id: "visibility",
      type: "radio",
      label: "Visibilidad",
      defaultValue: ""
    },
    {
      id: "separator-3",
      type: "separator"
    },
    {
      id: "budget",
      type: "checkbox",
      label: "Rango de presupuesto",
      showCounts: true,
      maxSelections: 2,
      defaultValue: []
    },
    {
      id: "separator-4",
      type: "separator"
    },
    {
      id: "duration",
      type: "toggle",
      label: "Duración del viaje",
      type_toggle: "multiple",
      variant: "vertical",
            gridCols: "auto",
      maxSelections: 1,
      wrap: true,
      defaultValue: ""
    },
    {
      id: "separator-5",
      type: "separator"
    },
    {
      id: "tags",
      type: "checkbox",
      label: "Etiquetas",
      showCounts: true,
      maxSelections: 4,
      initialVisibleCount: 6,
      showMoreText: "Ver más etiquetas",
      showLessText: "Ver menos",
      defaultValue: []
    },
    
  
  ], [dataSourcesMyItineraries]);

  // Función para transformar datos del itinerario a las props del componente
  const transformItineraryData = (itinerary: PrivateItinerary) => {
    // Transformar accommodations
    const accommodations = itinerary.accommodations.map(acc => ({
      type: acc.type as 'hotel' | 'apartment' | 'house' | 'resort',
      typeName: acc.type.charAt(0).toUpperCase() + acc.type.slice(1),
      count: 1 // Asumimos 1 por ahora, se puede ajustar
    }));

    // Transformar transports
    const transports = itinerary.transport.map(transport => ({
      type: transport.type as 'flight' | 'cruise' | 'bus' | 'train',
      typeName: transport.type.charAt(0).toUpperCase() + transport.type.slice(1),
      count: 1 // Asumimos 1 por ahora, se puede ajustar
    }));

    return {
      id: itinerary.id,
      title: itinerary.title,
      imageUrl: itinerary.coverImage,
      startDate: new Date(itinerary.startDate),
      endDate: new Date(itinerary.endDate),
      accommodations,
      transports,
      experiences: { count: itinerary.experiences.length },
      estimatedBudgetPerPerson: itinerary.totalBudget,
      currency: itinerary.currency,
      destination: itinerary.destinations.join(', ')
    };
  };

  // Función para mapear PrivateItinerary a MyItineraryRowData
  const mapItinerariesToRowData = (itineraries: PrivateItinerary[]): MyItineraryRowData[] => {
    return itineraries.map((itinerary) => ({
      id: itinerary.id,
      title: itinerary.title,
      descMain: `${itinerary.destinations.join(', ')} • ${itinerary.duration} • $${itinerary.totalBudget} ${itinerary.currency}`,
      descSecondary: `${itinerary.status} • ${itinerary.visibility} • ${itinerary.tags.join(', ')}`,
      originalData: itinerary
    }));
  };

  // Actualizar rows cuando cambien los itinerarios
  useEffect(() => {
    const mappedData = mapItinerariesToRowData(myPrivateItineraries);
    setRows(mappedData);
    setFilteredRowsLength(mappedData.length);
  }, []);

  // Handler para cambios en filtros
  const handleFiltersChange = (filters: Record<string, any>) => {
    // resetPagination();
  };

  // Handler para click en card
  const handleCardClick = (idx: number, row: RowData) => {
    const itineraryRow = row as MyItineraryRowData;
    console.log('🎯 Itinerario seleccionado:', itineraryRow.originalData.title);
    // Aquí puedes agregar navegación o abrir modal de detalle
  };

  // Estadísticas rápidas
  const stats = useMemo(() => {
    const total = myPrivateItineraries.length;
    const active = myPrivateItineraries.filter(i => i.status === 'active').length;
    const completed = myPrivateItineraries.filter(i => i.status === 'done').length;
    const shared = myPrivateItineraries.filter(i => i.isShared).length;
    
    return { total, active, completed, shared };
  }, []);

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <div className={`space-y-6 ${className}`}>
        <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-8 ">
              Mis Itinerarios
            </h1>
      {/* Header */}
      <div className="bg-white rounded-xl px-4 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2 py-4">
          <div className="space-y-2">
           
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{stats.total} itinerarios creados</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{stats.active} activos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{stats.completed} completados</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>{stats.shared} compartidos</span>
              </div>
            </div>
          </div>
          
          {/* Controles del header */}
          <div className="flex flex-wrap gap-2 justify-between h-full items-end">
            <Button variant="outline" className='h-12 w-full lg:w-[280px] text-primary'>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Itinerario
            </Button>
            
            <div className="flex border rounded-lg flex-row h-12 ">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="rounded-r-none h-full"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="rounded-l-none h-full"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SearchWithFilters */}
      <SearchWithFilters
        rows={rows}
        filters={getFiltersForMyItineraries}
        filterOptions={myItinerariesFilterOptions}
        sortOptions={myItinerariesSortOptions}
        onFiltersChange={handleFiltersChange}
        onCardClick={handleCardClick}
        renderResults={({ filteredRows, compareMode, onCardClick: onCardClickFromRender }) => {
          // Actualizar el length de filteredRows para el hook de paginación
          React.useEffect(() => {
            if (filteredRows.length !== filteredRowsLength) {
              setFilteredRowsLength(filteredRows.length);
              resetPagination();
            }
          }, [filteredRows.length]);

          return (
            <div className="space-y-6">
              {/* Grid/List de resultados */}
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                  : "space-y-4"
              }>
                {filteredRows.slice(0, visibleItineraries).map((row, index) => {
                  const itineraryRow = row as MyItineraryRowData;
                  const itinerary = itineraryRow.originalData;
                  const transformedData = transformItineraryData(itinerary);
                  
                  return (
                    <div key={itinerary.id} className="relative">
                      <ItinerariesPrivateCard
                        {...transformedData}
                        onClick={() => handleCardClick(index, itineraryRow)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Componente de paginación reutilizable */}
              <PaginationCard
                totalItems={filteredRows.length}
                visibleItems={visibleItineraries}
                initialVisibleItems={initialVisibleItineraries}
                itemsPerStep={itinerariesPerStep}
                onShowMore={handleShowMore}
                onShowLess={handleShowLess}
                itemLabel="itinerarios"
                showMoreText="Mostrar más itinerarios"
                showLessText="Mostrar menos itinerarios"
                allItemsMessage="🗺️ Has visto todos tus itinerarios"
                className=""
                showProgressBar={true}
                progressColor="bg-primary"
              />

              {/* Mensaje si no hay resultados */}
              {filteredRows.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No se encontraron itinerarios</h3>
                  <p className="text-muted-foreground mb-4">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear tu primer itinerario
                  </Button>
                </div>
              )}
            </div>
          );
        }}
        searchPlaceholder="Buscar en mis itinerarios..."
        noResultsMessage="No se encontraron itinerarios que coincidan con tus criterios"
        clearFiltersText="Limpiar todos los filtros"
        sortByText="Ordenar mis itinerarios por"
        resultsCountText={(count) => `${count} itinerarios encontrados`}
      />

      {/*Aqui quiero otras secciones como las que te mostrare */}
      
      {/* Secciones de Interés del Usuario */}
      <div className="space-y-8">
        {/* Sección principal de acciones */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Guarda • Planea • Comparte
            </h2>
            <p className="text-gray-600 text-lg">
              todo en un solo lugar
            </p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              Planear un viaje
            </Button>
          </div>

          {/* Cards de acciones principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Planea tu viaje */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop" 
                  alt="Planea tu viaje"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">PLANEA TU VIAJE</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white pr-4">
                  <h3 className="font-semibold text-lg mb-1 pr-4">
                    Planea tu viaje en la vista de itinerario
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Invita a otras personas */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop" 
                  alt="Invita a otras personas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">INVITA A OTRAS PERSONAS</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">
                    Comparte tu viaje y colabora con familiares y amigos
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Guarda y compara */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative h-48">
                <img 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop" 
                  alt="Guarda y compara"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600 text-white">GUARDA Y COMPARA</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">
                    Monitorea y compara en un solo lugar todos los elementos que guardas
                  </h3>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                      <ChevronRight className="w-5 h-5 text-white" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de reservaciones */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Busca tu reservación</h3>
              <p className="text-gray-600 text-sm">Busca con tu número de itinerario</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <ChevronRight className="w-5 h-5" />

            </div>
          </div>
        </div>

        {/* Sección de inspiración */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¿Necesitas inspiración para tu próximo viaje?
              </h3>
              <p className="text-gray-600">
                Descubre destinos increíbles y experiencias únicas
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                Ver destinos populares
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Explorar experiencias
              </Button>
            </div>
          </div>
        </div>

        {/* Sección de estadísticas y logros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 text-center border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{stats.total}</h4>
            <p className="text-sm text-gray-600">Itinerarios creados</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{stats.active}</h4>
            <p className="text-sm text-gray-600">Viajes activos</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{stats.completed}</h4>
            <p className="text-sm text-gray-600">Viajes completados</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{stats.shared}</h4>
            <p className="text-sm text-gray-600">Viajes compartidos</p>
          </div>
        </div>

        {/* Sección de acciones rápidas mejorada */}
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¿Listo para tu próxima aventura?
            </h3>
            <p className="text-gray-600">
              Comienza a planear tu próximo viaje increíble
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Crear nuevo itinerario
            </Button>
            {/* <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Unirse a un viaje colaborativo
            </Button> */}
            <Button variant="outline" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Ver itinerarios populares
            </Button>
          </div>
        </div>
      </div>



      {/* Footer con acciones rápidas */}
      {/* <div className="bg-muted/50 rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          ¿Quieres crear un nuevo itinerario?
        </p>
        <div className="flex justify-center gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Crear desde cero
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Colaborar en uno existente
          </Button>
        </div>
      </div> */}
    </div>
        </Suspense>
  );
}