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
// ITINERARIOS DE VIAJE - SANTO DOMINGO A COLOMBIA
// ========================================

export interface ItineraryPackage {
  id: string;
  title: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  creator: {
    id: string;
    name: string;
    userName: string;
    avatarUrl: string;
  };
  creatorBio?: string; // opcional para mostrar en perfil
  colaborators?: Array<{
    id: string;
    name: string;
    avatarUrl: string;
    userName?: string; // opcional para mostrar en perfil 
    }>; // opcional para mostrar en perfil
  participants: Array<{
    id: string;
    name: string;
    avatarUrl: string;
    userName?: string; // opcional para mostrar en perfil
  }>;
  maxParticipants?: number; // máximo de participantes permitido
  cities: string[];
  lodgingCount: number;
  experienceCount: number;
  transportSummary: Array<{
    mode: "flight" | "bus" | "cruise";
    count: number;
  }>;
  isPriceEstimated?: boolean;
  duration: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  availableSpots: number;
  totalSpots: number;
}

export const colombiaItineraries: ItineraryPackage[] = [
  {
    id: "colombia-explorer-2025",
    title: "Colombia Explorer: Bogotá, Medellín y Cartagena",
    coverImage: "https://images.unsplash.com/photo-1605391833963-4ad669be6e94?w=800&q=80",
    startDate: "15 Ago",
    endDate: "28 Ago",
    price: "$1,850 USD",
    originalPrice: "$2,100 USD",
    discount: 12,
    duration: "14 días",
    creator: {
      id: "u-carlosviajes",
      name: "Carlos Rodríguez",
      userName: "carlosviajes",
      avatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    colaborators: [
      { 
        id: "col1", 
        name: "Andrea Morales", 
        avatarUrl: "https://i.pravatar.cc/150?img=24",
        userName: "andreamorales"
      },
      { 
        id: "col2", 
        name: "Roberto Silva", 
        avatarUrl: "https://i.pravatar.cc/150?img=31",
        userName: "robertosilva"
      }
    ],
    participants: [
      { id: "p1", name: "María González", avatarUrl: "https://i.pravatar.cc/150?img=25", userName: "mariagonzalez" },
      { id: "p2", name: "José Martínez", avatarUrl: "https://i.pravatar.cc/150?img=32", userName: "josemartinez" },
      { id: "p3", name: "Ana López", avatarUrl: "https://i.pravatar.cc/150?img=47", userName: "analopez" },
      { id: "p4", name: "Pedro Sánchez", avatarUrl: "https://i.pravatar.cc/150?img=18", userName: "pedrosanchez" },
      { id: "p5", name: "Carmen Ruiz", avatarUrl: "https://i.pravatar.cc/150?img=29", userName: "carmenruiz" }
    ],
    maxParticipants: 12,
    cities: ["Bogotá", "Medellín", "Cartagena"],
    lodgingCount: 4,
    experienceCount: 12,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Museo del Oro", "Comuna 13", "Ciudad Amurallada", "Café colombiano"],
    rating: 4.8,
    reviewCount: 34,
    availableSpots: 3,
    totalSpots: 12
  },
  {
    id: "caribe-colombia-2025",
    title: "Caribe Colombiano: Cartagena y Santa Marta",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    startDate: "22 Ago",
    endDate: "31 Ago",
    price: "$1,290 USD",
    duration: "10 días",
    creator: {
      id: "u-luzcaribe",
      name: "Luz Marina",
      userName: "luzcaribe",
      avatarUrl: "https://i.pravatar.cc/150?img=44"
    },
    colaborators: [
      { 
        id: "col3", 
        name: "Santiago Herrera", 
        avatarUrl: "https://i.pravatar.cc/150?img=15",
        userName: "santiagoherrera"
      }
    ],
    participants: [
      { id: "p6", name: "Roberto Vega", avatarUrl: "https://i.pravatar.cc/150?img=51", userName: "robertovega" },
      { id: "p7", name: "Elena Castro", avatarUrl: "https://i.pravatar.cc/150?img=16", userName: "elenacastro" },
      { id: "p8", name: "Miguel Torres", avatarUrl: "https://i.pravatar.cc/150?img=22", userName: "migueltorres" }
    ],
    maxParticipants: 8,
    cities: ["Cartagena", "Santa Marta", "Tayrona"],
    lodgingCount: 3,
    experienceCount: 8,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 2 }
    ],
    highlights: ["Playa Tayrona", "Ciudad Walled", "Castillo San Felipe", "Gastronomía costeña"],
    rating: 4.9,
    reviewCount: 28,
    availableSpots: 5,
    totalSpots: 10
  },
  {
    id: "aventura-colombia-2025",
    title: "Aventura en los Andes: Bogotá y San Gil",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    startDate: "5 Sep",
    endDate: "16 Sep",
    price: "$1,650 USD",
    duration: "12 días",
    creator: {
      id: "u-aventuracol",
      name: "Diego Morales",
      userName: "aventuracol",
      avatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    colaborators: [
      { 
        id: "col4", 
        name: "Camila Ospina", 
        avatarUrl: "https://i.pravatar.cc/150?img=36",
        userName: "camilaospina"
      },
      { 
        id: "col5", 
        name: "Julián Ríos", 
        avatarUrl: "https://i.pravatar.cc/150?img=45",
        userName: "julianrios"
      }
    ],
    participants: [
      { id: "p9", name: "Sofia Mendoza", avatarUrl: "https://i.pravatar.cc/150?img=19", userName: "sofiamendoza" },
      { id: "p10", name: "Andrés Parra", avatarUrl: "https://i.pravatar.cc/150?img=27", userName: "andresparra" },
      { id: "p11", name: "Valeria Díaz", avatarUrl: "https://i.pravatar.cc/150?img=38", userName: "valeriadiaz" },
      { id: "p12", name: "Luis Ramírez", avatarUrl: "https://i.pravatar.cc/150?img=14", userName: "luisramirez" }
    ],
    maxParticipants: 10,
    cities: ["Bogotá", "San Gil", "Villa de Leyva"],
    lodgingCount: 4,
    experienceCount: 15,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 4 }
    ],
    highlights: ["Rafting", "Parapente", "Rappel", "Arquitectura colonial"],
    rating: 4.7,
    reviewCount: 19,
    availableSpots: 2,
    totalSpots: 8
  },
  {
    id: "cultural-colombia-2025",
    title: "Ruta Cultural: Bogotá, Armenia y Manizales",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    startDate: "18 Sep",
    endDate: "30 Sep",
    price: "$1,750 USD",
    isPriceEstimated: true,
    duration: "13 días",
    creator: {
      id: "u-culturacol",
      name: "Patricia Vega",
      userName: "culturacol",
      avatarUrl: "https://i.pravatar.cc/150?img=26"
    },
    colaborators: [
      { 
        id: "col6", 
        name: "Alejandro Muñoz", 
        avatarUrl: "https://i.pravatar.cc/150?img=42",
        userName: "alejandromuz"
      }
    ],
    participants: [
      { id: "p13", name: "Fernando García", avatarUrl: "https://i.pravatar.cc/150?img=41", userName: "fernandogarcia" },
      { id: "p14", name: "Isabella Vargas", avatarUrl: "https://i.pravatar.cc/150?img=35", userName: "isabellavargas" },
      { id: "p15", name: "Rodrigo Peña", avatarUrl: "https://i.pravatar.cc/150?img=28", userName: "rodrigopena" }
    ],
    maxParticipants: 12,
    cities: ["Bogotá", "Armenia", "Manizales", "Salento"],
    lodgingCount: 5,
    experienceCount: 11,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Eje Cafetero", "Cocora Valley", "Termales", "Museos"],
    rating: 4.6,
    reviewCount: 15,
    availableSpots: 4,
    totalSpots: 10
  },
  {
    id: "relax-colombia-2025",
    title: "Relax Total: Cartagena y San Andrés",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    startDate: "8 Oct",
    endDate: "18 Oct",
    price: "$2,150 USD",
    duration: "11 días",
    creator: {
      id: "u-relaxcol",
      name: "Sandra López",
      userName: "relaxcol",
      avatarUrl: "https://i.pravatar.cc/150?img=49"
    },
    colaborators: [
      { 
        id: "col7", 
        name: "Daniela Restrepo", 
        avatarUrl: "https://i.pravatar.cc/150?img=43",
        userName: "danielarestrepo"
      },
      { 
        id: "col8", 
        name: "Mauricio Aguilar", 
        avatarUrl: "https://i.pravatar.cc/150?img=52",
        userName: "mauricioaguilar"
      }
    ],
    participants: [
      { id: "p16", name: "Julio Martín", avatarUrl: "https://i.pravatar.cc/150?img=31", userName: "juliomartin" },
      { id: "p17", name: "Claudia Rojas", avatarUrl: "https://i.pravatar.cc/150?img=42", userName: "claudiarojas" },
      { id: "p18", name: "Gustavo Pineda", avatarUrl: "https://i.pravatar.cc/150?img=23", userName: "gustavopineda" },
      { id: "p19", name: "Mónica Herrera", avatarUrl: "https://i.pravatar.cc/150?img=36", userName: "monicaherrera" },
      { id: "p20", name: "Raúl Jiménez", avatarUrl: "https://i.pravatar.cc/150?img=15", userName: "rauljimenez" },
      { id: "p21", name: "Teresa Moreno", avatarUrl: "https://i.pravatar.cc/150?img=48", userName: "teresamoreno" }
    ],
    maxParticipants: 10,
    cities: ["Cartagena", "San Andrés"],
    lodgingCount: 2,
    experienceCount: 6,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "cruise", count: 1 }
    ],
    highlights: ["Playas paradisíacas", "Hoyo Soplador", "Acuario", "Spa resorts"],
    rating: 4.9,
    reviewCount: 42,
    availableSpots: 1,
    totalSpots: 8
  },
  {
    id: "economico-colombia-2025",
    title: "Colombia Económico: Bogotá y Medellín",
    coverImage: "https://images.unsplash.com/photo-1610028117011-f07eb7f99c0e?w=800&q=80",
    startDate: "25 Oct",
    endDate: "2 Nov",
    price: "$980 USD",
    duration: "9 días",
    creator: {
      id: "u-economicocol",
      name: "Javier Ruiz",
      userName: "economicocol",
      avatarUrl: "https://i.pravatar.cc/150?img=17"
    },
    colaborators: [
      { 
        id: "col9", 
        name: "Laura Buitrago", 
        avatarUrl: "https://i.pravatar.cc/150?img=39",
        userName: "laurabuitrago"
      }
    ],
    participants: [
      { id: "p22", name: "David Navarro", avatarUrl: "https://i.pravatar.cc/150?img=39", userName: "davidnavarro" },
      { id: "p23", name: "Laura Ochoa", avatarUrl: "https://i.pravatar.cc/150?img=24", userName: "lauraochoa" }
    ],
    maxParticipants: 15,
    cities: ["Bogotá", "Medellín"],
    lodgingCount: 2,
    experienceCount: 7,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 2 }
    ],
    highlights: ["Free walking tours", "Hostales céntricos", "Comida local", "Transporte público"],
    rating: 4.4,
    reviewCount: 8,
    availableSpots: 6,
    totalSpots: 15
  },
  {
    id: "llanos-orientales-2025",
    title: "Llanos Orientales: Villavicencio y Meta",
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    startDate: "12 Nov",
    endDate: "20 Nov",
    price: "$1,200 USD",
    duration: "9 días",
    creator: {
      id: "u-llanero",
      name: "Ricardo Vargas",
      userName: "llanero",
      avatarUrl: "https://i.pravatar.cc/150?img=52"
    },
    colaborators: [
      { 
        id: "col10", 
        name: "Esperanza Quintero", 
        avatarUrl: "https://i.pravatar.cc/150?img=50",
        userName: "esperanzaquintero"
      }
    ],
    participants: [
      { id: "p24", name: "Camila Suárez", avatarUrl: "https://i.pravatar.cc/150?img=45", userName: "camilasuarez" },
      { id: "p25", name: "Santiago Mendez", avatarUrl: "https://i.pravatar.cc/150?img=13", userName: "santiagomendez" }
    ],
    maxParticipants: 8,
    cities: ["Villavicencio", "Puerto López", "Yopal"],
    lodgingCount: 3,
    experienceCount: 9,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Joropo", "Ganadería", "Río Meta", "Cultura llanera"],
    rating: 4.5,
    reviewCount: 12,
    availableSpots: 4,
    totalSpots: 8
  },
  {
    id: "amazonas-aventura-2025",
    title: "Amazonas Profundo: Leticia y Puerto Nariño",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    startDate: "5 Dic",
    endDate: "15 Dic",
    price: "$2,300 USD",
    duration: "11 días",
    creator: {
      id: "u-amazonico",
      name: "Elena Moreno",
      userName: "amazonico",
      avatarUrl: "https://i.pravatar.cc/150?img=37"
    },
    colaborators: [
      { 
        id: "col11", 
        name: "Carlos Yagüe", 
        avatarUrl: "https://i.pravatar.cc/150?img=21",
        userName: "carlosyague"
      },
      { 
        id: "col12", 
        name: "Natalia Rincón", 
        avatarUrl: "https://i.pravatar.cc/150?img=43",
        userName: "nataliarincon"
      }
    ],
    participants: [
      { id: "p26", name: "Mateo Delgado", avatarUrl: "https://i.pravatar.cc/150?img=21", userName: "mateodelgado" },
      { id: "p27", name: "Daniela Córdoba", avatarUrl: "https://i.pravatar.cc/150?img=43", userName: "danielacordoba" },
      { id: "p28", name: "Sebastián Villa", avatarUrl: "https://i.pravatar.cc/150?img=11", userName: "sebastianvilla" }
    ],
    maxParticipants: 6,
    cities: ["Leticia", "Puerto Nariño", "Isla de los Micos"],
    lodgingCount: 2,
    experienceCount: 14,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "cruise", count: 2 }
    ],
    highlights: ["Selva amazónica", "Delfines rosados", "Comunidades indígenas", "Canopy"],
    rating: 4.9,
    reviewCount: 18,
    availableSpots: 2,
    totalSpots: 6
  },
  {
    id: "pacifico-colombiano-2025",
    title: "Pacífico Colombiano: Nuquí y Bahía Solano",
    coverImage: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
    startDate: "18 Dic",
    endDate: "28 Dic",
    price: "$1,950 USD",
    duration: "11 días",
    creator: {
      id: "u-pacifico",
      name: "Alejandra Costa",
      userName: "pacifico",
      avatarUrl: "https://i.pravatar.cc/150?img=46"
    },
    colaborators: [
      { 
        id: "col13", 
        name: "Felipe Londoño", 
        avatarUrl: "https://i.pravatar.cc/150?img=20",
        userName: "felipelondono"
      }
    ],
    participants: [
      { id: "p29", name: "Felipe Miranda", avatarUrl: "https://i.pravatar.cc/150?img=20", userName: "felipemiranda" },
      { id: "p30", name: "Valentina Cruz", avatarUrl: "https://i.pravatar.cc/150?img=34", userName: "valentinacruz" },
      { id: "p31", name: "Nicolás Arango", avatarUrl: "https://i.pravatar.cc/150?img=50", userName: "nicolasarango" }
    ],
    maxParticipants: 10,
    cities: ["Nuquí", "Bahía Solano", "El Valle"],
    lodgingCount: 3,
    experienceCount: 10,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "bus", count: 1 }
    ],
    highlights: ["Avistamiento ballenas", "Playas vírgenes", "Selva tropical", "Pesca deportiva"],
    rating: 4.7,
    reviewCount: 25,
    availableSpots: 3,
    totalSpots: 10
  },
  {
    id: "boyaca-colonial-2025",
    title: "Boyacá Colonial: Villa de Leyva y Tunja",
    coverImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    startDate: "8 Ene",
    endDate: "16 Ene",
    price: "$1,350 USD",
    duration: "9 días",
    creator: {
      id: "u-colonial",
      name: "Andrés Molina",
      userName: "colonial",
      avatarUrl: "https://i.pravatar.cc/150?img=40"
    },
    colaborators: [
      { 
        id: "col14", 
        name: "Lucía Escobar", 
        avatarUrl: "https://i.pravatar.cc/150?img=48",
        userName: "luciaescobar"
      },
      { 
        id: "col15", 
        name: "Gabriel Ayala", 
        avatarUrl: "https://i.pravatar.cc/150?img=19",
        userName: "gabrielayala"
      }
    ],
    participants: [
      { id: "p32", name: "Lucía Fernández", avatarUrl: "https://i.pravatar.cc/150?img=48", userName: "luciafernandez" },
      { id: "p33", name: "Gabriel Cárdenas", avatarUrl: "https://i.pravatar.cc/150?img=19", userName: "gabrielcardenas" }
    ],
    maxParticipants: 12,
    cities: ["Villa de Leyva", "Tunja", "Ráquira", "Chiquinquirá"],
    lodgingCount: 3,
    experienceCount: 8,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Arquitectura colonial", "Artesanías", "Paleontología", "Pueblos patrimonio"],
    rating: 4.6,
    reviewCount: 16,
    availableSpots: 5,
    totalSpots: 12
  },
  {
    id: "santander-extremo-2025",
    title: "Santander Extremo: San Gil y Barichara",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    startDate: "22 Ene",
    endDate: "2 Feb",
    price: "$1,580 USD",
    duration: "12 días",
    creator: {
      id: "u-extremo",
      name: "Carolina Ruiz",
      userName: "extremo",
      avatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    colaborators: [
      { 
        id: "col16", 
        name: "Martín Solano", 
        avatarUrl: "https://i.pravatar.cc/150?img=15",
        userName: "martinsolano"
      }
    ],
    participants: [
      { id: "p34", name: "Martín García", avatarUrl: "https://i.pravatar.cc/150?img=15", userName: "martingarcia" },
      { id: "p35", name: "Paola Rivera", avatarUrl: "https://i.pravatar.cc/150?img=41", userName: "paolarivera" },
      { id: "p36", name: "Esteban Cortés", avatarUrl: "https://i.pravatar.cc/150?img=27", userName: "estebancortes" }
    ],
    maxParticipants: 8,
    cities: ["San Gil", "Barichara", "Socorro", "Curití"],
    lodgingCount: 4,
    experienceCount: 16,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 4 }
    ],
    highlights: ["Deportes extremos", "Pueblo más bello", "Cañón del Chicamocha", "Espeleología"],
    rating: 4.8,
    reviewCount: 31,
    availableSpots: 2,
    totalSpots: 8
  },
  {
    id: "tolima-nevados-2025",
    title: "Tolima y Nevados: Ibagué y Parque Nacional",
    coverImage: "https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=800&q=80",
    startDate: "15 Feb",
    endDate: "25 Feb",
    price: "$1,750 USD",
    duration: "11 días",
    creator: {
      id: "u-nevados",
      name: "Miguel Torres",
      userName: "nevados",
      avatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    colaborators: [
      { 
        id: "col17", 
        name: "Andrea Castillo", 
        avatarUrl: "https://i.pravatar.cc/150?img=29",
        userName: "andreacastillo"
      }
    ],
    participants: [
      { id: "p37", name: "Andrea Beltrán", avatarUrl: "https://i.pravatar.cc/150?img=29", userName: "andreabeltran" },
      { id: "p38", name: "Julián Acosta", avatarUrl: "https://i.pravatar.cc/150?img=16", userName: "julianacosta" }
    ],
    maxParticipants: 10,
    cities: ["Ibagué", "Salento", "Santa Isabel", "Nevado del Ruiz"],
    lodgingCount: 4,
    experienceCount: 13,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 5 }
    ],
    highlights: ["Nevado del Ruiz", "Aguas termales", "Café especial", "Trekking alta montaña"],
    rating: 4.7,
    reviewCount: 22,
    availableSpots: 4,
    totalSpots: 10
  },
  {
    id: "huila-arqueologico-2025",
    title: "Huila Arqueológico: San Agustín y Tierradentro",
    coverImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6b?w=800&q=80",
    startDate: "10 Mar",
    endDate: "20 Mar",
    price: "$1,450 USD",
    duration: "11 días",
    creator: {
      id: "u-arqueologico",
      name: "Patricia Sánchez",
      userName: "arqueologico",
      avatarUrl: "https://i.pravatar.cc/150?img=44"
    },
    colaborators: [
      { 
        id: "col18", 
        name: "Carlos Duarte", 
        avatarUrl: "https://i.pravatar.cc/150?img=23",
        userName: "carlosduarte"
      }
    ],
    participants: [
      { id: "p39", name: "Carlos Montoya", avatarUrl: "https://i.pravatar.cc/150?img=23", userName: "carlosmontoya" },
      { id: "p40", name: "María José Pérez", avatarUrl: "https://i.pravatar.cc/150?img=32", userName: "mariajoseperez" },
      { id: "p41", name: "Ricardo Zapata", avatarUrl: "https://i.pravatar.cc/150?img=18", userName: "ricardozapata" }
    ],
    maxParticipants: 9,
    cities: ["San Agustín", "Tierradentro", "Pitalito", "Isnos"],
    lodgingCount: 4,
    experienceCount: 12,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 4 }
    ],
    highlights: ["Parque Arqueológico", "Estatuas precolombinas", "Tumbas ancestrales", "Desierto de la Tatacoa"],
    rating: 4.6,
    reviewCount: 19,
    availableSpots: 3,
    totalSpots: 9
  },
  {
    id: "nariño-frontera-2025",
    title: "Nariño Frontera: Pasto y Las Lajas",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    startDate: "5 Abr",
    endDate: "14 Abr",
    price: "$1,320 USD",
    duration: "10 días",
    creator: {
      id: "u-frontera",
      name: "Jorge Delgado",
      userName: "frontera",
      avatarUrl: "https://i.pravatar.cc/150?img=51"
    },
    colaborators: [
      { 
        id: "col19", 
        name: "Sofía Ordóñez", 
        avatarUrl: "https://i.pravatar.cc/150?img=25",
        userName: "sofiaordonez"
      }
    ],
    participants: [
      { id: "p42", name: "Sofía Herrera", avatarUrl: "https://i.pravatar.cc/150?img=25", userName: "sofiaherrera" },
      { id: "p43", name: "Alejandro Mora", avatarUrl: "https://i.pravatar.cc/150?img=14", userName: "alejandromora" }
    ],
    maxParticipants: 12,
    cities: ["Pasto", "Ipiales", "Las Lajas", "Túquerres"],
    lodgingCount: 3,
    experienceCount: 9,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Santuario Las Lajas", "Carnaval de Negros y Blancos", "Volcán Galeras", "Cultura andina"],
    rating: 4.5,
    reviewCount: 14,
    availableSpots: 6,
    totalSpots: 12
  },
  {
    id: "cesar-vallenato-2025",
    title: "Cesar Vallenato: Valledupar y Provincia",
    coverImage: "https://images.unsplash.com/photo-1493225457124-e506b85b6dd0?w=800&q=80",
    startDate: "28 Abr",
    endDate: "6 May",
    price: "$1,180 USD",
    duration: "9 días",
    creator: {
      id: "u-vallenato",
      name: "Camilo Zabaleta",
      userName: "vallenato",
      avatarUrl: "https://i.pravatar.cc/150?img=30"
    },
    colaborators: [
      { 
        id: "col20", 
        name: "Isabella Mejía", 
        avatarUrl: "https://i.pravatar.cc/150?img=47",
        userName: "isabellamejia"
      }
    ],
    participants: [
      { id: "p44", name: "Isabella Carrillo", avatarUrl: "https://i.pravatar.cc/150?img=47", userName: "isabellacarrillo" },
      { id: "p45", name: "Diego Bermúdez", avatarUrl: "https://i.pravatar.cc/150?img=26", userName: "diegobermudez" },
      { id: "p46", name: "Natalia Gómez", avatarUrl: "https://i.pravatar.cc/150?img=38", userName: "nataliagomez" }
    ],
    maxParticipants: 10,
    cities: ["Valledupar", "La Paz", "Pueblo Bello", "Manaure"],
    lodgingCount: 3,
    experienceCount: 8,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 2 }
    ],
    highlights: ["Festival Vallenato", "Casa de Rafael Escalona", "Sierra Nevada", "Música tradicional"],
    rating: 4.7,
    reviewCount: 20,
    availableSpots: 4,
    totalSpots: 10
  },
  {
    id: "choco-biodiversidad-2025",
    title: "Chocó Biodiversidad: Quibdó y Atrato",
    coverImage: "https://images.unsplash.com/photo-1502780402662-acc01917424e?w=800&q=80",
    startDate: "15 May",
    endDate: "26 May",
    price: "$2,100 USD",
    duration: "12 días",
    creator: {
      id: "u-biodiversidad",
      name: "Ana Lucía Perea",
      userName: "biodiversidad",
      avatarUrl: "https://i.pravatar.cc/150?img=49"
    },
    colaborators: [
      { 
        id: "col21", 
        name: "Manuel Cuesta", 
        avatarUrl: "https://i.pravatar.cc/150?img=22",
        userName: "manuelcuesta"
      }
    ],
    participants: [
      { id: "p47", name: "Manuel Restrepo", avatarUrl: "https://i.pravatar.cc/150?img=22", userName: "manuelrestrepo" },
      { id: "p48", name: "Cristina Varón", avatarUrl: "https://i.pravatar.cc/150?img=35", userName: "cristinavaron" }
    ],
    maxParticipants: 6,
    cities: ["Quibdó", "Acandí", "Capurganá", "Río Atrato"],
    lodgingCount: 4,
    experienceCount: 15,
    transportSummary: [
      { mode: "flight", count: 2 },
      { mode: "cruise", count: 2 }
    ],
    highlights: ["Hotspot biodiversidad", "Cultura afrocolombiana", "Selva tropical", "Ballenas jorobadas"],
    rating: 4.8,
    reviewCount: 17,
    availableSpots: 2,
    totalSpots: 6
  },
  {
    id: "guajira-desierto-2025",
    title: "Guajira Mágica: Cabo de la Vela y Punta Gallinas",
    coverImage: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
    startDate: "8 Jun",
    endDate: "18 Jun",
    price: "$1,850 USD",
    duration: "11 días",
    creator: {
      id: "u-guajira",
      name: "Rafael Pushaina",
      userName: "guajira",
      avatarUrl: "https://i.pravatar.cc/150?img=28"
    },
    colaborators: [
      { 
        id: "col22", 
        name: "Laura Jiménez", 
        avatarUrl: "https://i.pravatar.cc/150?img=42",
        userName: "laurajimenez"
      },
      { 
        id: "col23", 
        name: "Tomás Uriana", 
        avatarUrl: "https://i.pravatar.cc/150?img=31",
        userName: "tomasuriana"
      }
    ],
    participants: [
      { id: "p49", name: "Laura Bustamante", avatarUrl: "https://i.pravatar.cc/150?img=42", userName: "laurabustamante" },
      { id: "p50", name: "Tomás Galvis", avatarUrl: "https://i.pravatar.cc/150?img=31", userName: "tomasgalvis" },
      { id: "p51", name: "Camila Uribe", avatarUrl: "https://i.pravatar.cc/150?img=24", userName: "camilauribe" }
    ],
    maxParticipants: 8,
    cities: ["Riohacha", "Cabo de la Vela", "Punta Gallinas", "Uribia"],
    lodgingCount: 3,
    experienceCount: 11,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 4 }
    ],
    highlights: ["Punto más norte de Sudamérica", "Cultura Wayuu", "Desierto y mar", "Atardeceres únicos"],
    rating: 4.9,
    reviewCount: 35,
    availableSpots: 1,
    totalSpots: 8
  },
  {
    id: "caldas-paisaje-2025",
    title: "Caldas Paisaje Cafetero: Manizales y Chinchiná",
    coverImage: "https://images.unsplash.com/photo-1497888329096-51c27beff665?w=800&q=80",
    startDate: "25 Jun",
    endDate: "5 Jul",
    price: "$1,680 USD",
    duration: "11 días",
    creator: {
      id: "u-paisaje",
      name: "Gloria Henao",
      userName: "paisaje",
      avatarUrl: "https://i.pravatar.cc/150?img=36"
    },
    colaborators: [
      { 
        id: "col24", 
        name: "Juan Pablo Uribe", 
        avatarUrl: "https://i.pravatar.cc/150?img=17",
        userName: "juanpablou"
      }
    ],
    participants: [
      { id: "p52", name: "Juan Pablo Cifuentes", avatarUrl: "https://i.pravatar.cc/150?img=17", userName: "juanpabloc" },
      { id: "p53", name: "Mariana Zuluaga", avatarUrl: "https://i.pravatar.cc/150?img=45", userName: "marianazuluaga" }
    ],
    maxParticipants: 12,
    cities: ["Manizales", "Chinchiná", "Neira", "Villamaría"],
    lodgingCount: 4,
    experienceCount: 12,
    transportSummary: [
      { mode: "flight", count: 1 },
      { mode: "bus", count: 3 }
    ],
    highlights: ["Paisaje Cultural Cafetero", "Recorrido fincas", "Nevado del Ruiz", "Teleférico"],
    rating: 4.6,
    reviewCount: 27,
    availableSpots: 5,
    totalSpots: 12
  },
  {
    id: "completo-colombia-2025",
    title: "Colombia Completa: Gran Tour Nacional",
    coverImage: "https://images.unsplash.com/photo-1605391833963-4ad669be6e94?w=800&q=80",
    startDate: "15 Jul",
    endDate: "15 Ago",
    price: "$4,200 USD",
    originalPrice: "$4,800 USD",
    discount: 15,
    duration: "32 días",
    creator: {
      id: "u-completo",
      name: "Fernando Gutiérrez",
      userName: "completo",
      avatarUrl: "https://i.pravatar.cc/150?img=39"
    },
    colaborators: [
      { 
        id: "col25", 
        name: "Adriana Ramos", 
        avatarUrl: "https://i.pravatar.cc/150?img=50",
        userName: "adrianaramos"
      },
      { 
        id: "col26", 
        name: "Pablo Quintana", 
        avatarUrl: "https://i.pravatar.cc/150?img=13",
        userName: "pabloquintana"
      },
      { 
        id: "col27", 
        name: "Verónica Salazar", 
        avatarUrl: "https://i.pravatar.cc/150?img=21",
        userName: "veronicasalazar"
      }
    ],
    participants: [
      { id: "p54", name: "Adriana Valencia", avatarUrl: "https://i.pravatar.cc/150?img=50", userName: "adrianavalencia" },
      { id: "p55", name: "Pablo Medina", avatarUrl: "https://i.pravatar.cc/150?img=13", userName: "pablomedina" },
      { id: "p56", name: "Verónica León", avatarUrl: "https://i.pravatar.cc/150?img=21", userName: "veronicaleon" },
      { id: "p57", name: "Álvaro Rincón", avatarUrl: "https://i.pravatar.cc/150?img=43", userName: "alvarorincon" }
    ],
    maxParticipants: 6,
    cities: ["Bogotá", "Medellín", "Cartagena", "Cali", "Bucaramanga", "Pereira", "Manizales", "Santa Marta"],
    lodgingCount: 12,
    experienceCount: 45,
    transportSummary: [
      { mode: "flight", count: 8 },
      { mode: "bus", count: 12 },
      { mode: "cruise", count: 2 }
    ],
    highlights: ["Todas las regiones", "Completa inmersión cultural", "Diversidad gastronómica", "Paisajes únicos"],
    rating: 4.9,
    reviewCount: 52,
    availableSpots: 1,
    totalSpots: 6
  }
];

// ========================================
// FUNCIONES HELPER PARA ITINERARIOS
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
export const mockData = {
  searchDataSources,
  lodgingOptions,
  experiencesOptions,
  transportTypes,
  defaultGuestRooms,
  defaultDateRange,
  defaultPassengers,
  defaultSelectedLodgingTypes,
  defaultSelectedTransportTypes,
  defaultSelectedExperiences,
  colombiaItineraries
};


// Función para formatear nombres de ciudades usando los datos de searchDataSources
export const formatCityName = (cityName: string) => {
  if (!cityName) return "";
  
  // Primero verificar si es un código de aeropuerto (con o sin números)
  const cleanInput = cityName.toLowerCase().replace(/\d+/g, ''); // Remover números
  
  // Obtener códigos de aeropuerto desde searchDataSources
  const airportsSource = searchDataSources.find(source => source.id === "airports");
  const citiesSource = searchDataSources.find(source => source.id === "cities");
  const recentSource = searchDataSources.find(source => source.id === "recent");
  
  // Crear mapas de códigos desde los datos existentes
  const airportCodeMap: Record<string, string> = {};
  const cityCodeMap: Record<string, string> = {};
  
  // Mapear aeropuertos
  if (airportsSource?.options) {
    airportsSource.options.forEach((airport: any) => {
      if (airport.code && airport.name) {
        airportCodeMap[airport.code.toLowerCase()] = airport.name.split(' (')[0]; // Extraer solo el nombre de la ciudad
      }
    });
  }
  
  // Mapear ciudades
  if (citiesSource?.options) {
    citiesSource.options.forEach((city: any) => {
      if (city.cityCode && city.cityName) {
        cityCodeMap[city.cityCode.toLowerCase()] = city.cityName.split(',')[0]; // Extraer solo el nombre de la ciudad
      }
    });
  }
  
  // Mapear búsquedas recientes (extraer códigos de aeropuerto)
  if (recentSource?.options) {
    recentSource.options.forEach((recent: any) => {
      if (recent.searchId && recent.destination) {
        const destinationName = recent.destination.split(' (')[0]; // Extraer nombre antes del paréntesis
        airportCodeMap[recent.searchId.replace(/\d+/g, '').toLowerCase()] = destinationName;
      }
    });
  }
  
  // Verificar si el input limpio coincide con algún código de aeropuerto
  if (cleanInput in airportCodeMap) {
    return airportCodeMap[cleanInput];
  }
  
  // Verificar si coincide con algún código de ciudad
  if (cleanInput in cityCodeMap) {
    return cityCodeMap[cleanInput];
  }
  
  // Si no es un código, aplicar formateo normal
  const formatted = cityName
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Casos especiales para preposiciones y artículos en español
      const exceptions = ['de', 'del', 'la', 'el', 'los', 'las', 'y', 'e', 'en', 'a', 'al'];
      if (exceptions.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
  return formatted;
};