import { FlightData } from './flight-types';

// Datos de vuelos base (Santo Domingo → Medellín)
export const baseFlights: FlightData[] = [
  {
    id: "dep-1",
    airline: "Arajet",
    flightNumber: "DM 642",
    departureTime: "7:07 p. m.",
    arrivalTime: "8:42 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "2 h 35 min",
    stops: "Vuelo sin escalas",
    price: 325,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/DM_sq.svg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Servicio de bebidas", "Snack ligero"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: false,
        dimensions: "55cm x 40cm x 20cm",
        weight: "8kg",
        price: 45
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 65,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso según política de la aerolínea",
      changeable: false,
      changePolicy: "No se admiten cambios"
    },
    services: {
      wifi: false,
      meals: false,
      entertainment: true,
      powerOutlets: false
    }
  },
  {
    id: "dep-2",
    airline: "Copa",
    flightNumber: "CM 315",
    departureTime: "5:23 a. m.",
    arrivalTime: "5:00 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "12 h 37 min",
    stops: "1 escala",
    price: 265,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/CM_sq.svg",
    badge: "Ahorra en paquete",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "23kg",
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 75
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "dep-3",
    airline: "Avianca",
    flightNumber: "AV 8456",
    departureTime: "9:15 a. m.",
    arrivalTime: "2:30 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "5 h 15 min",
    stops: "1 escala",
    price: 380,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsX3AErK8dyqywQCNvjUdfHxewcn96gbwFyA&s",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable con espacio extra",
      amenities: ["Comida completa", "Bebidas premium", "Kit de amenidades"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 85,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo hasta 24h antes",
      changeable: true,
      changePolicy: "Cambios permitidos con tarifa",
      changeFee: 50
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "dep-4",
    airline: "LATAM",
    flightNumber: "LA 2594",
    departureTime: "11:45 a. m.",
    arrivalTime: "4:20 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "4 h 35 min",
    stops: "Vuelo sin escalas",
    price: 450,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
    travelClass: "premium-economy" as const,
    travelClassDetails: {
      name: "Económica Premium",
      description: "Asiento premium con servicios mejorados",
      seatType: "Asiento reclinable premium con más espacio",
      amenities: ["Comida gourmet", "Bebidas premium", "Kit premium", "Prioridad en abordaje"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "32kg",
        count: 2
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo sin penalización",
      changeable: true,
      changePolicy: "Cambios gratuitos",
      changeFee: 0
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "dep-5",
    airline: "JetBlue",
    flightNumber: "B6 1247",
    departureTime: "3:30 p. m.",
    arrivalTime: "10:45 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "7 h 15 min",
    stops: "1 escala",
    price: 290,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/b6_sq.svg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento estándar con entretenimiento personal",
      amenities: ["TV personal", "Snacks", "Bebidas"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "43cm x 33cm x 20cm"
      },
      carryOn: {
        included: false,
        dimensions: "55cm x 35cm x 23cm",
        weight: "10kg",
        price: 65
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 80,
        count: 1
      }
    },
    flexibility: {
      refundable: false,
      refundPolicy: "No reembolsable",
      changeable: true,
      changePolicy: "Cambios permitidos con tarifa",
      changeFee: 100
    },
    services: {
      wifi: true,
      meals: false,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "dep-6",
    airline: "Spirit",
    flightNumber: "NK 847",
    departureTime: "6:00 p. m.",
    arrivalTime: "11:25 p. m.",
    departureAirport: "Santo Domingo (SDQ)",
    arrivalAirport: "Medellín (MDE)",
    duration: "5 h 25 min",
    stops: "Vuelo sin escalas",
    price: 199,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://download.logo.wine/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.png",
    badge: "Precio más bajo",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica Básica",
      description: "Tarifa básica solo incluye el asiento",
      seatType: "Asiento básico no reclinable",
      amenities: ["Solo transporte"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: false,
        dimensions: "56cm x 46cm x 25cm",
        weight: "10kg",
        price: 144
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 116,
        count: 1
      }
    },
    flexibility: {
      refundable: false,
      refundPolicy: "No reembolsable",
      changeable: false,
      changePolicy: "No se admiten cambios"
    },
    services: {
      wifi: false,
      meals: false,
      entertainment: false,
      powerOutlets: false
    }
  }
];

// Datos de vuelos de regreso (Medellín → Santo Domingo)
export const returnFlights: FlightData[] = [
  {
    id: "ret-1",
    airline: "LATAM",
    flightNumber: "LA 2595",
    departureTime: "10:15 a. m.",
    arrivalTime: "6:30 p. m.",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "8 h 15 min",
    stops: "1 escala",
    price: 380,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 90,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización del 15%",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 60
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "ret-2",
    airline: "Avianca",
    flightNumber: "AV 8457",
    departureTime: "2:45 p. m.",
    arrivalTime: "8:20 p. m.",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "5 h 35 min",
    stops: "Vuelo sin escalas",
    price: 420,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsX3AErK8dyqywQCNvjUdfHxewcn96gbwFyA&s",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable con espacio extra",
      amenities: ["Comida completa", "Bebidas premium", "Kit de amenidades"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 85,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo hasta 24h antes",
      changeable: true,
      changePolicy: "Cambios permitidos con tarifa",
      changeFee: 50
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "ret-3",
    airline: "Copa",
    flightNumber: "CM 316",
    departureTime: "6:30 a. m.",
    arrivalTime: "2:15 p. m.",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "7 h 45 min",
    stops: "1 escala",
    price: 340,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/CM_sq.svg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "23kg",
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 75
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "ret-4",
    airline: "Arajet",
    flightNumber: "DM 643",
    departureTime: "11:20 a. m.",
    arrivalTime: "4:55 p. m.",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "5 h 35 min",
    stops: "Vuelo sin escalas",
    price: 395,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/DM_sq.svg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Servicio de bebidas", "Snack ligero"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: false,
        dimensions: "55cm x 40cm x 20cm",
        weight: "8kg",
        price: 45
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 65,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso según política de la aerolínea",
      changeable: false,
      changePolicy: "No se admiten cambios"
    },
    services: {
      wifi: false,
      meals: false,
      entertainment: true,
      powerOutlets: false
    }
  },
  {
    id: "ret-5",
    airline: "JetBlue",
    flightNumber: "B6 1248",
    departureTime: "4:10 p. m.",
    arrivalTime: "10:45 p. m.",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "6 h 35 min",
    stops: "1 escala",
    price: 320,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/b6_sq.svg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento estándar con entretenimiento personal",
      amenities: ["TV personal", "Snacks", "Bebidas"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "43cm x 33cm x 20cm"
      },
      carryOn: {
        included: false,
        dimensions: "55cm x 35cm x 23cm",
        weight: "10kg",
        price: 65
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 80,
        count: 1
      }
    },
    flexibility: {
      refundable: false,
      refundPolicy: "No reembolsable",
      changeable: true,
      changePolicy: "Cambios permitidos con tarifa",
      changeFee: 100
    },
    services: {
      wifi: true,
      meals: false,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "ret-6",
    airline: "Spirit",
    flightNumber: "NK 848",
    departureTime: "8:45 p. m.",
    arrivalTime: "2:30 a. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Santo Domingo (SDQ)",
    duration: "5 h 45 min",
    stops: "Vuelo sin escalas",
    price: 250,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://download.logo.wine/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.png",
    badge: "Precio más bajo",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica Básica",
      description: "Tarifa básica solo incluye el asiento",
      seatType: "Asiento básico no reclinable",
      amenities: ["Solo transporte"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: false,
        dimensions: "56cm x 46cm x 25cm",
        weight: "10kg",
        price: 144
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 116,
        count: 1
      }
    },
    flexibility: {
      refundable: false,
      refundPolicy: "No reembolsable",
      changeable: false,
      changePolicy: "No se admiten cambios"
    },
    services: {
      wifi: false,
      meals: false,
      entertainment: false,
      powerOutlets: false
    }
  }
];

// Datos de vuelos a Madrid (Medellín → Madrid)
export const madridFlights: FlightData[] = [
  {
    id: "mad-1",
    airline: "Iberia",
    flightNumber: "IB 6025",
    departureTime: "11:30 a. m.",
    arrivalTime: "6:45 a. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "11 h 15 min",
    stops: "1 escala",
    price: 850,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://i.pinimg.com/736x/7a/0e/e1/7a0ee10240a467544945f3d95065e99a.jpg",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios premium",
      seatType: "Asiento reclinable con espacio extra",
      amenities: ["Comida gourmet", "Bebidas premium", "Entretenimiento personal", "Kit de viaje"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "23kg",
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo hasta 24h antes",
      changeable: true,
      changePolicy: "Cambios gratuitos",
      changeFee: 0
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "mad-2",
    airline: "Air Europa",
    flightNumber: "UX 1094",
    departureTime: "6:20 p. m.",
    arrivalTime: "2:10 p. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "13 h 50 min",
    stops: "1 escala",
    price: 780,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://play-lh.googleusercontent.com/dBtR6JtR4XpTjcPLjy8WmHrRWRc5mU4DlftaJucD8CWR566-lL3ULlzQ0pTNFH3M-mo",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 95,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización del 20%",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 80
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "mad-3",
    airline: "LATAM",
    flightNumber: "LA 5240",
    departureTime: "9:15 a. m.",
    arrivalTime: "4:30 a. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "12 h 15 min",
    stops: "1 escala",
    price: 920,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
    travelClass: "premium-economy" as const,
    travelClassDetails: {
      name: "Económica Premium",
      description: "Asiento premium con servicios mejorados",
      seatType: "Asiento reclinable premium con más espacio",
      amenities: ["Comida gourmet", "Bebidas premium", "Kit premium", "Prioridad en abordaje", "Asiento preferencial"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "32kg",
        count: 2
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo sin penalización",
      changeable: true,
      changePolicy: "Cambios gratuitos",
      changeFee: 0
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "mad-4",
    airline: "Avianca",
    flightNumber: "AV 0027",
    departureTime: "3:45 p. m.",
    arrivalTime: "11:20 a. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "14 h 35 min",
    stops: "2 escalas",
    price: 750,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsX3AErK8dyqywQCNvjUdfHxewcn96gbwFyA&s",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable con espacio extra",
      amenities: ["Comida completa", "Bebidas premium", "Kit de amenidades"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: false,
        weight: "23kg",
        price: 110,
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso completo hasta 24h antes",
      changeable: true,
      changePolicy: "Cambios permitidos con tarifa",
      changeFee: 60
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "mad-5",
    airline: "Copa",
    flightNumber: "CM 0492",
    departureTime: "7:00 a. m.",
    arrivalTime: "1:45 a. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "15 h 45 min",
    stops: "2 escalas",
    price: 680,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://images.trvl-media.com/media/content/expus/graphics/static_content/fusion/v0.1b/images/airlines/vector/s/CM_sq.svg",
    badge: "Precio más bajo",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "10kg"
      },
      checkedBag: {
        included: true,
        weight: "23kg",
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 75
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  },
  {
    id: "mad-6",
    airline: "Turkish Airlines",
    flightNumber: "TK 1852",
    departureTime: "10:30 p. m.",
    arrivalTime: "8:15 p. m.+1",
    departureAirport: "Medellín (MDE)",
    arrivalAirport: "Madrid (MAD)",
    duration: "16 h 45 min",
    stops: "2 escalas",
    price: 890,
    currency: "USD",
    priceLabel: "Redondeado por pasajero",
    logo: "https://1000logos.net/wp-content/uploads/2020/04/Turkish-Airlines-symbol.png",
    travelClass: "economy" as const,
    travelClassDetails: {
      name: "Económica",
      description: "Asiento estándar con servicios básicos",
      seatType: "Asiento reclinable estándar",
      amenities: ["Comida tradicional turca", "Bebidas", "Entretenimiento amplio"]
    },
    baggage: {
      personalItem: {
        included: true,
        dimensions: "40cm x 20cm x 25cm"
      },
      carryOn: {
        included: true,
        dimensions: "55cm x 40cm x 20cm",
        weight: "8kg"
      },
      checkedBag: {
        included: true,
        weight: "30kg",
        count: 1
      }
    },
    flexibility: {
      refundable: true,
      refundPolicy: "Reembolso con penalización del 25%",
      changeable: true,
      changePolicy: "Cambios permitidos",
      changeFee: 100
    },
    services: {
      wifi: true,
      meals: true,
      entertainment: true,
      powerOutlets: true
    }
  }
];
