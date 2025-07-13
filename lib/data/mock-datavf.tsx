import React from 'react';
import { 
  Clock, 
  Plane, 
  MapPin, 
  Building2, 
  Hotel, 
  Home, 
  Mountain as MountainIcon,
  TentTree as TentTreeIcon,
  Footprints as FootprintsIcon,
  Landmark as LandmarkIcon,
  Sun as SunIcon,
  UtensilsCrossed as UtensilsIcon,
  Music2 as MusicIcon,
  Laugh as LaughIcon,
  Anchor,
  Bus,
  Ship,
  TreePine,
  Waves,
  Camera,
  ShoppingBag,
  Moon,
  Dumbbell,
  Calendar,
  Sparkles
} from "lucide-react";
import { StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { FilterOption } from "@/components/ui/quick-filter";
import { Room } from "@/components/shared/standard-fields-component/GuestSelector";
import { PassengerGroup } from "@/components/shared/standard-fields-component/PassengerSelector";
import { DateRange } from "react-day-picker";

// ========================================
// FUENTES DE DATOS PARA BÚSQUEDAS
// ========================================

export const searchDataSources: StandardSearchDataSource[] = [
  {
    id: "recent",
    label: "Búsquedas recientes",
    icon: <Clock className="h-4 w-4" />,
    type: "recent" as const,
    nameLabelField: "destination",
    nameValueField: "searchId",
    nameDescriptionField: "period",
    options: [
      {
        destination: "Medellín (MDE - A. Internacional José...)",
        searchId: "med1",
        period: "3 de julio–6 de julio"
      },
      {
        destination: "Miami (MIA - Aeropuerto Internacional...)",
        searchId: "mia1",
        period: "1 de julio–30 de agosto • 60 noches • 2..."
      },
      {
        destination: "San Juan de la Maguana",
        searchId: "sj1",
        period: "2 de junio–3 de junio • 1 noche • 2..."
      },
      {
        destination: "Barcelona (BCN - El Prat)",
        searchId: "bcn1",
        period: "15 de agosto–22 de agosto"
      },
      {
        destination: "París (CDG - Charles de Gaulle)",
        searchId: "par1",
        period: "10 de septiembre–17 de septiembre"
      },
      {
        destination: "Londres (LHR - Heathrow)",
        searchId: "lon1",
        period: "20 de octubre–27 de octubre"
      },
      {
        destination: "Nueva York (JFK - John F. Kennedy)",
        searchId: "nyc1",
        period: "5 de noviembre–12 de noviembre"
      },
      {
        destination: "Cancún (CUN - Aeropuerto Internacional...)",
        searchId: "cun1",
        period: "15 de diciembre–22 de diciembre"
      },
      {
        destination: "Santo Domingo (SDQ - Las Américas)",
        searchId: "sdq1",
        period: "25 de diciembre–1 de enero"
      }
    ]
  },
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "name",
    nameValueField: "code",
    nameDescriptionField: "city",
    options: [
      { name: "Madrid (MAD - Aeropuerto Barajas)", code: "MAD", city: "Capital de España" },
      { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "BCN", city: "Ciudad mediterránea" },
      { name: "París (CDG - Charles de Gaulle)", code: "CDG", city: "Ciudad de la luz" },
      { name: "Londres (LHR - Heathrow)", code: "LHR", city: "Capital británica" },
      { name: "Santo Domingo (SDQ - Las Américas)", code: "SDQ", city: "República Dominicana" },
      { name: "Nueva York (JFK - John F. Kennedy)", code: "JFK", city: "Estados Unidos" },
      { name: "Miami (MIA - Aeropuerto Internacional)", code: "MIA", city: "Estados Unidos" },
      { name: "Roma (FCO - Fiumicino)", code: "FCO", city: "Italia" },
      { name: "Tokio (NRT - Narita)", code: "NRT", city: "Japón" },
      { name: "Buenos Aires (EZE - Ezeiza)", code: "EZE", city: "Argentina" },
      { name: "Medellín (MDE - José María Córdova)", code: "MDE", city: "Colombia" },
      { name: "Cancún (CUN - Aeropuerto Internacional)", code: "CUN", city: "México" }
    ]
  },
  {
    id: "cities",
    label: "Ciudades",
    icon: <MapPin className="h-4 w-4" />,
    type: "city" as const,
    nameLabelField: "cityName",
    nameValueField: "cityCode",
    nameDescriptionField: "description",
    options: [
      { cityName: "Madrid, España", cityCode: "MAD", description: "Capital de España" },
      { cityName: "Barcelona, España", cityCode: "BCN", description: "Ciudad mediterránea" },
      { cityName: "París, Francia", cityCode: "PAR", description: "Ciudad de la luz" },
      { cityName: "Londres, Reino Unido", cityCode: "LON", description: "Capital británica" },
      { cityName: "Roma, Italia", cityCode: "ROM", description: "Ciudad eterna" },
      { cityName: "Nueva York, EE.UU.", cityCode: "NYC", description: "La gran manzana" },
      { cityName: "Miami, EE.UU.", cityCode: "MIA", description: "Ciudad del sol" },
      { cityName: "Tokio, Japón", cityCode: "TYO", description: "Metrópolis moderna" },
      { cityName: "Buenos Aires, Argentina", cityCode: "BUE", description: "París de Sudamérica" },
      { cityName: "Santo Domingo, R.D.", cityCode: "SDQ", description: "Capital caribeña" },
      { cityName: "Medellín, Colombia", cityCode: "MDE", description: "Ciudad de la eterna primavera" },
      { cityName: "Cancún, México", cityCode: "CUN", description: "Paraíso caribeño" },
      { cityName: "Punta Cana, R.D.", cityCode: "PUJ", description: "Destino tropical" },
      { cityName: "La Habana, Cuba", cityCode: "HAV", description: "Ciudad histórica" }
    ]
  },
  {
    id: "hotels",
    label: "Hoteles",
    icon: <Building2 className="h-4 w-4" />,
    type: "hotel" as const,
    nameLabelField: "hotelName",
    nameValueField: "hotelId",
    nameDescriptionField: "location",
    options: [
      { hotelName: "Hotel Ritz Madrid", hotelId: "ritz-mad", location: "Lujo en el centro de Madrid" },
      { hotelName: "Hotel Majestic Barcelona", hotelId: "maj-bcn", location: "Elegancia en Passeig de Gràcia" },
      { hotelName: "Le Bristol Paris", hotelId: "bristol-par", location: "Lujo parisino en Faubourg Saint-Honoré" },
      { hotelName: "The Savoy London", hotelId: "savoy-lon", location: "Icónico hotel en el Strand" },
      { hotelName: "Hotel de Russie Rome", hotelId: "russie-rom", location: "Elegancia cerca del Vaticano" },
      { hotelName: "The Plaza New York", hotelId: "plaza-nyc", location: "Legendario hotel en Fifth Avenue" },
      { hotelName: "Four Seasons Miami", hotelId: "4s-mia", location: "Lujo frente al mar en Brickell" }
    ]
  },
  {
    id: "cruise-ports",
    label: "Puertos de Cruceros",
    icon: <Anchor className="h-4 w-4" />,
    type: "cruise" as const,
    nameLabelField: "portName",
    nameValueField: "portCode",
    nameDescriptionField: "region",
    options: [
      { portName: "Miami, Florida", portCode: "MIA", region: "Caribe Occidental" },
      { portName: "Fort Lauderdale, Florida", portCode: "FLL", region: "Caribe Oriental" },
      { portName: "Barcelona, España", portCode: "BCN", region: "Mediterráneo Occidental" },
      { portName: "Roma (Civitavecchia), Italia", portCode: "CIV", region: "Mediterráneo Central" },
      { portName: "Southampton, Reino Unido", portCode: "SOU", region: "Norte de Europa" },
      { portName: "Seattle, Washington", portCode: "SEA", region: "Alaska" },
      { portName: "San Juan, Puerto Rico", portCode: "SJU", region: "Caribe Sur" }
    ]
  },
  {
    id: "bus-stations",
    label: "Estaciones de Autobús",
    icon: <Bus className="h-4 w-4" />,
    type: "bus" as const,
    nameLabelField: "stationName",
    nameValueField: "stationCode",
    nameDescriptionField: "city",
    options: [
      { stationName: "Terminal Sur Madrid", stationCode: "MAD-SUR", city: "Madrid, España" },
      { stationName: "Estació del Nord Barcelona", stationCode: "BCN-NOR", city: "Barcelona, España" },
      { stationName: "Gare Routière Paris Bercy", stationCode: "PAR-BER", city: "París, Francia" },
      { stationName: "Victoria Coach Station London", stationCode: "LON-VIC", city: "Londres, Reino Unido" },
      { stationName: "Port Authority NYC", stationCode: "NYC-PA", city: "Nueva York, EE.UU." },
      { stationName: "Terminal de Ómnibus Retiro", stationCode: "BUE-RET", city: "Buenos Aires, Argentina" }
    ]
  }
];

// ========================================
// OPCIONES DE FILTROS
// ========================================

export const lodgingOptions: FilterOption[] = [
  { label: "Hoteles", value: "hotel", icon: Hotel },
  { label: "Casas", value: "house", icon: Home },
  { label: "Apartamentos", value: "apartment", icon: Building2 },
  { label: "Casa de huéspedes", value: "guest" },
  { label: "Resorts", value: "resort" },
  { label: "Hostales", value: "hostel" },
  { label: "Villas", value: "villa"},
  { label: "Cabañas", value: "cabin",}
];

export const experiencesOptions: FilterOption[] = [
  { label: "Aventura", value: "adventure", icon: MountainIcon },
  { label: "Camping", value: "camping", icon: TentTreeIcon },
  { label: "Senderismo", value: "hiking", icon: FootprintsIcon },
  { label: "Trekking", value: "trekking", icon: TreePine },
  { label: "Cultural", value: "cultural", icon: LandmarkIcon },
  { label: "Playa", value: "beach", icon: SunIcon },
  { label: "Deportes Acuáticos", value: "watersports", icon: Waves },
  { label: "Gastronómica", value: "gastronomy", icon: UtensilsIcon },
  { label: "Conciertos", value: "concerts", icon: MusicIcon },
  { label: "Festivales", value: "festivals", icon: Calendar },
  { label: "Eventos de Comedia", value: "comedy", icon: LaughIcon },
  { label: "Fotografía", value: "photography", icon: Camera },
  { label: "Compras", value: "shopping", icon: ShoppingBag },
  { label: "Vida Nocturna", value: "nightlife", icon: Moon },
  { label: "Deportes", value: "sports", icon: Dumbbell },
  { label: "Spa y Relajación", value: "spa", icon: Sparkles },
  // { label: "Historia", value: "history", icon: () => "🏛️" }
];

export const transportTypes: FilterOption[] = [
  { label: "Avión", value: "air", icon: Plane },
  { label: "Tren", value: "train", icon: () => "🚂" },
  { label: "Autobús", value: "bus", icon: Bus },
  { label: "Auto", value: "car", icon: () => "🚗" },
  { label: "Crucero", value: "cruise", icon: Ship },
  { label: "Ferry", value: "ferry", icon: () => "⛴️" }
];

// ========================================
// VALORES POR DEFECTO
// ========================================

export const defaultGuestRooms: Room[] = [
  {
    id: "room-1",
    adults: 2,
    children: []
  }
];

export const defaultDateRange: DateRange = {
  from: new Date(),
  to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 días
};

export const defaultPassengers: PassengerGroup = {
  adults: 1,
  children: [],
  infantsOnLap: [],
  infantsInSeat: []
};

// ========================================
// SELECCIONES POR DEFECTO
// ========================================

export const defaultSelectedLodgingTypes = ["hotel"];
export const defaultSelectedTransportTypes = ["air"];
export const defaultSelectedExperiences = ["beach"];

// ========================================
// FUNCIONES HELPER
// ========================================

/**
 * Obtiene las opciones de una fuente de datos específica por ID
 */
export const getDataSourceById = (id: string): StandardSearchDataSource | undefined => {
  return searchDataSources.find(source => source.id === id);
};

/**
 * Obtiene todas las ciudades disponibles
 */
export const getAllCities = () => {
  const citiesSource = getDataSourceById("cities");
  return citiesSource?.options || [];
};

/**
 * Obtiene todos los aeropuertos disponibles
 */
export const getAllAirports = () => {
  const airportsSource = getDataSourceById("airports");
  return airportsSource?.options || [];
};

/**
 * Obtiene todos los hoteles disponibles
 */
export const getAllHotels = () => {
  const hotelsSource = getDataSourceById("hotels");
  return hotelsSource?.options || [];
};

/**
 * Filtra fuentes de datos por tipo de transporte
 */
export const getTransportDataSources = (transportType?: string): StandardSearchDataSource[] => {
  switch (transportType) {
    case "air":
      return searchDataSources.filter(source => 
        source.id === "airports" || source.id === "cities" || source.id === "recent"
      );
    case "bus":
      return searchDataSources.filter(source => 
        source.id === "bus-stations" || source.id === "cities" || source.id === "recent"
      );
    case "cruise":
      return searchDataSources.filter(source => 
        source.id === "cruise-ports" || source.id === "cities" || source.id === "recent"
      );
    default:
      return searchDataSources;
  }
};

/**
 * Filtra fuentes de datos para alojamiento
 */
export const getLodgingDataSources = (): StandardSearchDataSource[] => {
  return searchDataSources.filter(source => 
    source.id === "hotels" || source.id === "cities" || source.id === "airports" || source.id === "recent"
  );
};

/**
 * Filtra fuentes de datos para experiencias
 */
export const getExperiencesDataSources = (): StandardSearchDataSource[] => {
  return searchDataSources.filter(source => 
    source.id === "cities" || source.id === "recent"
  );
};

// ========================================
// TIPOS AUXILIARES
// ========================================

export type MockDataType = {
  searchDataSources: StandardSearchDataSource[];
  lodgingOptions: FilterOption[];
  experiencesOptions: FilterOption[];
  transportTypes: FilterOption[];
  defaultGuestRooms: Room[];
  defaultDateRange: DateRange;
  defaultPassengers: PassengerGroup;
  defaultSelectedLodgingTypes: string[];
  defaultSelectedTransportTypes: string[];
  defaultSelectedExperiences: string[];
};

/**
 * Exporta todos los datos mock en un solo objeto
 */
export const mockData: MockDataType = {
  searchDataSources,
  lodgingOptions,
  experiencesOptions,
  transportTypes,
  defaultGuestRooms,
  defaultDateRange,
  defaultPassengers,
  defaultSelectedLodgingTypes,
  defaultSelectedTransportTypes,
  defaultSelectedExperiences
};