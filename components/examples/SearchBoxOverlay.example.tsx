import SearchBoxOverlay from '../landing/sections/SearchBoxOverlay';
import { StandardSearchDataSource } from '@/components/shared/standard-fields-component/StandardSearchField';
import { MapPin, Plane, Building, Clock } from 'lucide-react';

// Ejemplo de uso del SearchBoxOverlay actualizado con StandardSearchField para ambos campos

const ExampleSearchBoxOverlay = () => {
  // Datos de ejemplo para las fuentes de datos
  const dataSources: StandardSearchDataSource[] = [
    {
      id: "recent",
      label: "Búsquedas recientes",
      icon: <Clock className="h-4 w-4" />,
      type: "recent",
      nameLabelField: "name",
      nameValueField: "code",
      nameDescriptionField: "description",
      options: [
        { name: "Madrid", code: "MAD", description: "España" },
        { name: "Barcelona", code: "BCN", description: "España" },
        { name: "París", code: "PAR", description: "Francia" },
        { name: "Londres", code: "LHR", description: "Reino Unido" },
      ]
    },
    {
      id: "airports",
      label: "Aeropuertos",
      icon: <Plane className="h-4 w-4" />,
      type: "airport",
      nameLabelField: "name",
      nameValueField: "code",
      nameDescriptionField: "city",
      options: [
        { name: "Aeropuerto de Madrid-Barajas", code: "MAD", city: "Madrid, España" },
        { name: "Aeropuerto de Barcelona-El Prat", code: "BCN", city: "Barcelona, España" },
        { name: "Aeropuerto Charles de Gaulle", code: "CDG", city: "París, Francia" },
        { name: "Aeropuerto de Londres-Heathrow", code: "LHR", city: "Londres, Reino Unido" },
        { name: "Aeropuerto de Roma-Fiumicino", code: "FCO", city: "Roma, Italia" },
        { name: "Aeropuerto de Múnich", code: "MUC", city: "Múnich, Alemania" },
      ]
    },
    {
      id: "cities",
      label: "Ciudades populares",
      icon: <Building className="h-4 w-4" />,
      type: "city",
      nameLabelField: "name",
      nameValueField: "id",
      nameDescriptionField: "country",
      options: [
        { name: "Madrid", id: "madrid", country: "España" },
        { name: "Barcelona", id: "barcelona", country: "España" },
        { name: "París", id: "paris", country: "Francia" },
        { name: "Londres", id: "london", country: "Reino Unido" },
        { name: "Roma", id: "rome", country: "Italia" },
        { name: "Berlín", id: "berlin", country: "Alemania" },
        { name: "Amsterdam", id: "amsterdam", country: "Países Bajos" },
        { name: "Viena", id: "vienna", country: "Austria" },
      ]
    },
    {
      id: "destinations",
      label: "Destinos destacados",
      icon: <MapPin className="h-4 w-4" />,
      type: "custom",
      nameLabelField: "name",
      nameValueField: "id",
      nameDescriptionField: "description",
      options: [
        { name: "Costa del Sol", id: "costa-del-sol", description: "Playas de Andalucía, España" },
        { name: "Islas Baleares", id: "baleares", description: "Mallorca, Ibiza, Menorca" },
        { name: "Islas Canarias", id: "canarias", description: "Tenerife, Gran Canaria, Lanzarote" },
        { name: "Riviera Francesa", id: "riviera", description: "Niza, Cannes, Saint-Tropez" },
        { name: "Toscana", id: "toscana", description: "Florencia, Siena, Pisa" },
      ]
    }
  ];

  const handleSearch = (origin: string, destination: string) => {
    console.log('Búsqueda realizada:', { origin, destination });
    
    // Validación básica
    if (!origin || !destination) {
      alert('Por favor, selecciona tanto el origen como el destino');
      return;
    }
    
    if (origin === destination) {
      alert('El origen y destino no pueden ser el mismo');
      return;
    }
    
    // Aquí implementarías la lógica de búsqueda real
    alert(`Buscando vuelos de ${origin} a ${destination}`);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Contenido de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Encuentra tu próximo destino</h1>
            <p className="text-xl opacity-90 mb-8">Descubre el mundo con nuestras mejores ofertas</p>
            
            {/* Características destacadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <Plane className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-lg font-semibold mb-2">Vuelos</h3>
                <p className="text-sm opacity-80">Encuentra los mejores precios en vuelos</p>
              </div>
              <div className="text-center">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-lg font-semibold mb-2">Hoteles</h3>
                <p className="text-sm opacity-80">Alojamientos para todos los presupuestos</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-lg font-semibold mb-2">Destinos</h3>
                <p className="text-sm opacity-80">Explora lugares increíbles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SearchBoxOverlay con ambos campos StandardSearchField */}
      <SearchBoxOverlay
        onSearch={handleSearch}
        dataSources={dataSources}
      />
    </div>
  );
};

export default ExampleSearchBoxOverlay;
