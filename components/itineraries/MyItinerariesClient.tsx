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
  ChevronRight,
  UserPlus,
  DollarSign,
  Globe,
  Route,
  Eye,
  Search
} from 'lucide-react';
import { ShowIfAuth } from '../ShowIfAuth';
import { ShowIfUnauth } from '../ShowIfUnauth';

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
  const itinerariesPerStep = 2;
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

      

{/* Secciones de Interés del Usuario - MEJORADAS CON GRADIENTES SELECTIVOS */}
<div className="space-y-8 pb-12">
  {/* Sección principal de acciones - Solo para usuarios autenticados */}
  <ShowIfAuth>
    <div className="bg-gray-50 rounded-3xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Crea • Edita • Comparte
        </h2>
        <p className="text-gray-600 text-lg">
          Gestiona tus itinerarios de manera profesional
        </p>
        <Button className="mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 h-12">
          <Plus className="mr-2 h-5 w-5" />
          Crear Nuevo Itinerario
        </Button>
      </div>

      {/* Cards de gestión de itinerarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Crear desde cero */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
          <div className="relative h-48">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop" 
              alt="Crear itinerario"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                CREAR DESDE CERO
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 text-white pr-4">
              <h3 className="font-semibold text-lg mb-1">
                Diseña tu itinerario perfecto
              </h3>
              <p className="text-sm text-white/80">
                Agrega segmentos, edita detalles y personaliza tu viaje
              </p>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Editar y gestionar */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
          <div className="relative h-48">
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop" 
              alt="Editar itinerarios"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-0">
                EDITAR Y GESTIONAR
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 text-white pr-4">
              <h3 className="font-semibold text-lg mb-1">
                Perfecciona tus itinerarios
              </h3>
              <p className="text-sm text-white/80">
                Reordena segmentos, ajusta detalles y optimiza rutas
              </p>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Publicar y comercializar */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
          <div className="relative h-48">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop" 
              alt="Publicar itinerario"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-primary via-secondary to-primary text-white border-0">
                PUBLICAR Y MONETIZAR
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 text-white pr-4">
              <h3 className="font-semibold text-lg mb-1">
                Comparte con el mundo
              </h3>
              <p className="text-sm text-white/80">
                Publica, asigna precios y colabora con otros viajeros
              </p>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary via-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </ShowIfAuth>

  {/* Sección de búsqueda de reservaciones - Full width */}
  <div className="bg-white rounded-xl border shadow-sm p-6">
    <div className="max-w-7xl mx-auto text-center justify-center">
      <ShowIfAuth>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Busca tu Reservación
        </h3>
        <p className="text-gray-600 mb-6">
          Busca con tu número de itinerario para ver los detalles de tu reservación
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
            <input
              type="text"
              placeholder="IT-2024-001234"
              className="w-full w-full lg:w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          <Button className="px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white w-full lg:w-[280px]">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
       
      </ShowIfAuth>

      <ShowIfUnauth>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Busca tu Reservación
        </h3>
        <p className="text-gray-600 mb-6">
          Ingresa tu correo electrónico y número de itinerario para ver los detalles de tu reservación
        </p>
        
        <div className="space-y-3 max-w-md mx-auto">
          <div>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Número de itinerario"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <Button className="w-full px-8 py-3 h-12 bg-primary hover:bg-primary/90 text-white">
            <Search className="w-4 h-4 mr-2" />
            Buscar Reservación
          </Button>
        </div>
        
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">
            Ejemplo: IT-2024-001234
          </p>
          <button className="text-primary hover:text-primary/80 text-sm underline">
            ¿Olvidaste tu número de itinerario?
          </button>
        </div>
      </ShowIfUnauth>
    </div>
  </div>  

  {/* Funcionalidades principales - Solo autenticados */}
  <ShowIfAuth>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Panel de gestión de segmentos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Segmentos</h3>
            <p className="text-gray-600 text-sm">Organiza y perfecciona cada parte de tu viaje</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <Route className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Agregar Segmentos</h4>
              <p className="text-sm text-gray-500">Manual o desde resultados de búsqueda</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Reordenar Elementos</h4>
              <p className="text-sm text-gray-500">Arrastra y reorganiza tu itinerario</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Editar Detalles</h4>
              <p className="text-sm text-gray-500">Personaliza cada segmento del viaje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de colaboración y monetización */}
      <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Colaboración y Ventas</h3>
            <p className="text-gray-600 text-sm">Comparte y monetiza tus creaciones</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
              <Share2 className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Compartir con Colaboradores</h4>
              <p className="text-sm text-gray-500">Invita a amigos a planear juntos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Publicar como Grupo</h4>
              <p className="text-sm text-gray-500">Haz tu itinerario público</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Asignar Precio Comercial</h4>
              <p className="text-sm text-gray-500">Monetiza tu experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ShowIfAuth>

  {/* Sección de herramientas avanzadas - Solo autenticados */}
  <ShowIfAuth>
    <div className="bg-gray-50 rounded-xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Herramientas Profesionales
        </h3>
        <p className="text-gray-600 text-lg">
          Lleva tus itinerarios al siguiente nivel
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Planificación Avanzada</h4>
          <p className="text-sm text-gray-600">Cronogramas detallados y optimización de rutas</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Chat Colaborativo</h4>
          <p className="text-sm text-gray-600">Comunícate en tiempo real con tu equipo</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Análticas Premium</h4>
          <p className="text-sm text-gray-600">Estadísticas de tus itinerarios publicados</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Exportar y Compartir</h4>
          <p className="text-sm text-gray-600">PDF, enlaces públicos y redes sociales</p>
        </div>
      </div>
    </div>
  </ShowIfAuth>

  {/* Sección de estadísticas mejorada - Solo autenticados */}
  <ShowIfAuth>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 text-center border hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</h4>
        <p className="text-sm text-gray-600">Itinerarios Creados</p>
        <div className="mt-2 text-xs text-primary font-medium">+3 este mes</div>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center border hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{stats.active}</h4>
        <p className="text-sm text-gray-600">Viajes Activos</p>
        <div className="mt-2 text-xs text-secondary font-medium">En planificación</div>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center border hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{stats.completed}</h4>
        <p className="text-sm text-gray-600">Completados</p>
        <div className="mt-2 text-xs text-primary font-medium">¡Genial!</div>
      </div>
      
      <div className="bg-white rounded-xl p-6 text-center border hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{stats.shared}</h4>
        <p className="text-sm text-gray-600">Compartidos</p>
        <div className="mt-2 text-xs text-secondary font-medium">124 visualizaciones</div>
      </div>
    </div>
  </ShowIfAuth>

  {/* CTA final - Adaptativo según autenticación */}
  <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-3xl p-8 text-center">
    <ShowIfAuth>
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          ¿Listo para tu próxima creación?
        </h3>
        <p className="text-white/90 text-lg mb-8">
          Transforma tus ideas de viaje en itinerarios profesionales que otros querrán seguir
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" className="px-8 py-3 h-12 text-lg">
            <Plus className="mr-2 h-5 w-5" />
            Crear Nuevo Itinerario
          </Button>
          <Button variant="ghost" className="border border-white px-8 py-3 h-12 text-lg">
            <Star className="mr-2 h-5 w-5" />
            Ver Plantillas Populares
          </Button>
        </div>
      </div>
    </ShowIfAuth>

    <ShowIfUnauth>
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          ¡Descubre el Poder de Planificar en Asfales!
        </h3>
        <p className="text-white/90 text-lg mb-8">
          Únete a miles de viajeros que ya están creando y compartiendo itinerarios increíbles
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" className="px-8 py-3 h-12 text-lg">
            <UserPlus className="mr-2 h-5 w-5" />
            Registrarse Gratis
          </Button>
          <Button variant="ghost" className="border border-white px-8 py-3 h-12 text-lg">
            <Eye className="mr-2 h-5 w-5" />
            Ver Demo
          </Button>
        </div>
      </div>
    </ShowIfUnauth>
  </div>
</div>

     
    </div>
        </Suspense>
  );
}