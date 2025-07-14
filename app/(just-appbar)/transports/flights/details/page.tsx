// 'use client';

// import React from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { 
//   Plane, 
//   Clock, 
//   MapPin, 
//   Briefcase, 
//   Wifi, 
//   Coffee, 
//   Tv, 
//   Zap,
//   Check,
//   X,
//   ArrowRight,
//   Calendar,
//   User,
//   CreditCard
// } from 'lucide-react';

// // Simulamos los datos del vuelo basado en el ID
// const getFlightDetails = (flightId: string) => {
//   // Aquí normalmente harías una llamada a la API
//   // Por ahora retornamos datos simulados basados en el ID
  
//   // Base de datos simulada con todos los vuelos
//   const allFlights: Record<string, any> = {
//     // Vuelos base (SDQ -> MDE)
//     'base-1': {
//       id: "base-1",
//       airline: "LATAM",
//       flightNumber: "LA 2040",
//       departureTime: "6:30 a. m.",
//       arrivalTime: "12:45 p. m.",
//       departureAirport: "Santo Domingo (SDQ)",
//       arrivalAirport: "Medellín (MDE)",
//       duration: "6 h 15 min",
//       stops: "Vuelo sin escalas",
//       price: 450,
//       currency: "USD",
//       priceLabel: "Redondeado por pasajero",
//       logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
//       travelClass: "economy" as const,
//       travelClassDetails: {
//         name: "Económica",
//         description: "Asiento estándar con servicios básicos",
//         seatType: "Asiento reclinable estándar",
//         amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
//       },
//       baggage: {
//         personalItem: {
//           included: true,
//           dimensions: "40cm x 20cm x 25cm"
//         },
//         carryOn: {
//           included: true,
//           dimensions: "55cm x 40cm x 20cm",
//           weight: "10kg"
//         },
//         checkedBag: {
//           included: false,
//           weight: "23kg",
//           price: 90,
//           count: 1
//         }
//       },
//       flexibility: {
//         refundable: true,
//         refundPolicy: "Reembolso con penalización del 15%",
//         changeable: true,
//         changePolicy: "Cambios permitidos",
//         changeFee: 60
//       },
//       services: {
//         wifi: true,
//         meals: true,
//         entertainment: true,
//         powerOutlets: true
//       }
//     },
    
//     'base-2': {
//       id: "base-2",
//       airline: "Avianca",
//       flightNumber: "AV 9621",
//       departureTime: "9:15 a. m.",
//       arrivalTime: "3:30 p. m.",
//       departureAirport: "Santo Domingo (SDQ)",
//       arrivalAirport: "Medellín (MDE)",
//       duration: "6 h 15 min",
//       stops: "Vuelo sin escalas",
//       price: 380,
//       currency: "USD",
//       priceLabel: "Redondeado por pasajero",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsX3AErK8dyqywQCNvjUdfHxewcn96gbwFyA&s",
//       travelClass: "economy" as const,
//       travelClassDetails: {
//         name: "Económica",
//         description: "Asiento estándar con servicios básicos",
//         seatType: "Asiento reclinable con espacio extra",
//         amenities: ["Comida completa", "Bebidas premium", "Kit de amenidades"]
//       },
//       baggage: {
//         personalItem: {
//           included: true,
//           dimensions: "40cm x 20cm x 25cm"
//         },
//         carryOn: {
//           included: true,
//           dimensions: "55cm x 40cm x 20cm",
//           weight: "10kg"
//         },
//         checkedBag: {
//           included: false,
//           weight: "23kg",
//           price: 85,
//           count: 1
//         }
//       },
//       flexibility: {
//         refundable: true,
//         refundPolicy: "Reembolso completo hasta 24h antes",
//         changeable: true,
//         changePolicy: "Cambios permitidos con tarifa",
//         changeFee: 50
//       },
//       services: {
//         wifi: true,
//         meals: true,
//         entertainment: true,
//         powerOutlets: true
//       }
//     },

//     // Vuelos de retorno (MDE -> SDQ)
//     'ret-1': {
//       id: "ret-1",
//       airline: "LATAM",
//       flightNumber: "LA 2595",
//       departureTime: "10:15 a. m.",
//       arrivalTime: "6:30 p. m.",
//       departureAirport: "Medellín (MDE)",
//       arrivalAirport: "Santo Domingo (SDQ)",
//       duration: "8 h 15 min",
//       stops: "1 escala",
//       price: 380,
//       currency: "USD",
//       priceLabel: "Redondeado por pasajero",
//       logo: "https://i.pinimg.com/736x/0d/04/bb/0d04bb1980de2098c247543a2cfeb152.jpg",
//       travelClass: "economy" as const,
//       travelClassDetails: {
//         name: "Económica",
//         description: "Asiento estándar con servicios básicos",
//         seatType: "Asiento reclinable estándar",
//         amenities: ["Comida incluida", "Bebidas", "Entretenimiento"]
//       },
//       baggage: {
//         personalItem: {
//           included: true,
//           dimensions: "40cm x 20cm x 25cm"
//         },
//         carryOn: {
//           included: true,
//           dimensions: "55cm x 40cm x 20cm",
//           weight: "10kg"
//         },
//         checkedBag: {
//           included: false,
//           weight: "23kg",
//           price: 90,
//           count: 1
//         }
//       },
//       flexibility: {
//         refundable: true,
//         refundPolicy: "Reembolso con penalización del 15%",
//         changeable: true,
//         changePolicy: "Cambios permitidos",
//         changeFee: 60
//       },
//       services: {
//         wifi: true,
//         meals: true,
//         entertainment: true,
//         powerOutlets: true
//       }
//     },

//     // Vuelos a Madrid (MDE -> MAD)
//     'mad-1': {
//       id: "mad-1",
//       airline: "Iberia",
//       flightNumber: "IB 6025",
//       departureTime: "11:30 a. m.",
//       arrivalTime: "6:45 a. m.+1",
//       departureAirport: "Medellín (MDE)",
//       arrivalAirport: "Madrid (MAD)",
//       duration: "11 h 15 min",
//       stops: "1 escala",
//       price: 850,
//       currency: "USD",
//       priceLabel: "Redondeado por pasajero",
//       logo: "https://i.pinimg.com/736x/7a/0e/e1/7a0ee10240a467544945f3d95065e99a.jpg",
//       travelClass: "economy" as const,
//       travelClassDetails: {
//         name: "Económica",
//         description: "Asiento estándar con servicios premium",
//         seatType: "Asiento reclinable con espacio extra",
//         amenities: ["Comida gourmet", "Bebidas premium", "Entretenimiento personal", "Kit de viaje"]
//       },
//       baggage: {
//         personalItem: {
//           included: true,
//           dimensions: "40cm x 20cm x 25cm"
//         },
//         carryOn: {
//           included: true,
//           dimensions: "55cm x 40cm x 20cm",
//           weight: "10kg"
//         },
//         checkedBag: {
//           included: true,
//           weight: "23kg",
//           count: 1
//         }
//       },
//       flexibility: {
//         refundable: true,
//         refundPolicy: "Reembolso completo hasta 24h antes",
//         changeable: true,
//         changePolicy: "Cambios gratuitos",
//         changeFee: 0
//       },
//       services: {
//         wifi: true,
//         meals: true,
//         entertainment: true,
//         powerOutlets: true
//       }
//     }
//   };

//   // Retornar el vuelo específico o un vuelo por defecto
//   return allFlights[flightId] || allFlights['base-1'];
// };

// export default function FlightDetailsPage() {
//   const searchParams = useSearchParams();
//   const flightId = searchParams.get('id') || 'base-1';
//   const returnUrl = searchParams.get('return') || '/transports/flights';
  
//   const flight = getFlightDetails(flightId);

//   const handleContinueBooking = () => {
//     // Aquí redirigirías al proceso de reserva
//     console.log('Continuar con la reserva del vuelo:', flight.id);
//     // window.location.href = `/booking/flights/${flight.id}`;
//   };

//   const handleBackToResults = () => {
//     window.location.href = returnUrl;
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 max-w-4xl">
//       {/* Header */}
//       <div className="mb-6">
//         <Button 
//           variant="outline" 
//           onClick={handleBackToResults}
//           className="mb-4"
//         >
//           ← Volver a resultados
//         </Button>
        
//         <div className="flex items-center gap-4 mb-4">
//           <img 
//             src={flight.logo} 
//             alt={flight.airline}
//             className="w-12 h-12 rounded-lg object-contain bg-white p-1"
//           />
//           <div>
//             <h1 className="text-2xl font-bold">{flight.airline}</h1>
//             <p className="text-gray-600">{flight.flightNumber}</p>
//           </div>
//           {flight.badge && (
//             <Badge variant="secondary" className="ml-auto">
//               {flight.badge}
//             </Badge>
//           )}
//         </div>

//         {/* Ruta del vuelo */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div className="text-center">
//                 <p className="text-2xl font-bold">{flight.departureTime}</p>
//                 <p className="text-gray-600">{flight.departureAirport}</p>
//               </div>
              
//               <div className="flex-1 mx-6">
//                 <div className="flex items-center justify-center">
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                   <div className="mx-4 text-center">
//                     <Plane className="h-6 w-6 mx-auto text-gray-400 mb-1" />
//                     <p className="text-sm text-gray-600">{flight.duration}</p>
//                     <p className="text-xs text-gray-500">{flight.stops}</p>
//                   </div>
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                 </div>
//               </div>
              
//               <div className="text-center">
//                 <p className="text-2xl font-bold">{flight.arrivalTime}</p>
//                 <p className="text-gray-600">{flight.arrivalAirport}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Información principal */}
//         <div className="md:col-span-2 space-y-6">
          
//           {/* Clase de viaje */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 Clase de viaje
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h4 className="font-semibold">{flight.travelClassDetails.name}</h4>
//                   <Badge variant="outline">{flight.travelClass}</Badge>
//                 </div>
//                 <p className="text-gray-600">{flight.travelClassDetails.description}</p>
//                 {flight.travelClassDetails.seatType && (
//                   <p className="text-sm text-gray-500">
//                     <strong>Asiento:</strong> {flight.travelClassDetails.seatType}
//                   </p>
//                 )}
//                 {flight.travelClassDetails.amenities && (
//                   <div>
//                     <p className="text-sm font-medium mb-2">Servicios incluidos:</p>
//                     <ul className="text-sm text-gray-600 space-y-1">
//                       {flight.travelClassDetails.amenities.map((amenity: string, index: number) => (
//                         <li key={index} className="flex items-center gap-2">
//                           <Check className="h-4 w-4 text-green-500" />
//                           {amenity}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Equipaje */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Briefcase className="h-5 w-5" />
//                 Equipaje
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
              
//               {/* Artículo personal */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-medium">Artículo personal</h4>
//                   {flight.baggage.personalItem.included ? (
//                     <Badge variant="default" className="bg-green-100 text-green-800">Incluido</Badge>
//                   ) : (
//                     <Badge variant="outline">No incluido</Badge>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Máximo: {flight.baggage.personalItem.dimensions}
//                 </p>
//               </div>

//               {/* Equipaje de mano */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-medium">Equipaje de mano</h4>
//                   {flight.baggage.carryOn.included ? (
//                     <Badge variant="default" className="bg-green-100 text-green-800">Incluido</Badge>
//                   ) : (
//                     <Badge variant="outline">
//                       ${flight.baggage.carryOn.price} {flight.currency}
//                     </Badge>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Máximo: {flight.baggage.carryOn.dimensions}
//                   {flight.baggage.carryOn.weight && ` • ${flight.baggage.carryOn.weight}`}
//                 </p>
//               </div>

//               {/* Equipaje documentado */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-medium">Equipaje documentado</h4>
//                   {flight.baggage.checkedBag.included ? (
//                     <Badge variant="default" className="bg-green-100 text-green-800">Incluido</Badge>
//                   ) : (
//                     <Badge variant="outline">
//                       ${flight.baggage.checkedBag.price} {flight.currency}
//                     </Badge>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Hasta {flight.baggage.checkedBag.weight} • {flight.baggage.checkedBag.count} maleta{flight.baggage.checkedBag.count > 1 ? 's' : ''}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Servicios a bordo */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Servicios a bordo</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   <Wifi className={`h-5 w-5 ${flight.services.wifi ? 'text-green-500' : 'text-gray-400'}`} />
//                   <span className={flight.services.wifi ? '' : 'text-gray-400'}>
//                     Wi-Fi
//                   </span>
//                   {flight.services.wifi ? (
//                     <Check className="h-4 w-4 text-green-500 ml-auto" />
//                   ) : (
//                     <X className="h-4 w-4 text-gray-400 ml-auto" />
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <Coffee className={`h-5 w-5 ${flight.services.meals ? 'text-green-500' : 'text-gray-400'}`} />
//                   <span className={flight.services.meals ? '' : 'text-gray-400'}>
//                     Comidas
//                   </span>
//                   {flight.services.meals ? (
//                     <Check className="h-4 w-4 text-green-500 ml-auto" />
//                   ) : (
//                     <X className="h-4 w-4 text-gray-400 ml-auto" />
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <Tv className={`h-5 w-5 ${flight.services.entertainment ? 'text-green-500' : 'text-gray-400'}`} />
//                   <span className={flight.services.entertainment ? '' : 'text-gray-400'}>
//                     Entretenimiento
//                   </span>
//                   {flight.services.entertainment ? (
//                     <Check className="h-4 w-4 text-green-500 ml-auto" />
//                   ) : (
//                     <X className="h-4 w-4 text-gray-400 ml-auto" />
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <Zap className={`h-5 w-5 ${flight.services.powerOutlets ? 'text-green-500' : 'text-gray-400'}`} />
//                   <span className={flight.services.powerOutlets ? '' : 'text-gray-400'}>
//                     Enchufes
//                   </span>
//                   {flight.services.powerOutlets ? (
//                     <Check className="h-4 w-4 text-green-500 ml-auto" />
//                   ) : (
//                     <X className="h-4 w-4 text-gray-400 ml-auto" />
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Flexibilidad */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Políticas de flexibilidad</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
              
//               {/* Reembolsos */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   {flight.flexibility.refundable ? (
//                     <Check className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <X className="h-5 w-5 text-red-500" />
//                   )}
//                   <h4 className="font-medium">
//                     {flight.flexibility.refundable ? 'Reembolsable' : 'No reembolsable'}
//                   </h4>
//                 </div>
//                 {flight.flexibility.refundPolicy && (
//                   <p className="text-sm text-gray-600">{flight.flexibility.refundPolicy}</p>
//                 )}
//               </div>

//               {/* Cambios */}
//               <div className="border rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   {flight.flexibility.changeable ? (
//                     <Check className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <X className="h-5 w-5 text-red-500" />
//                   )}
//                   <h4 className="font-medium">
//                     {flight.flexibility.changeable ? 'Cambios permitidos' : 'Sin cambios'}
//                   </h4>
//                   {flight.flexibility.changeable && flight.flexibility.changeFee && (
//                     <Badge variant="outline" className="ml-auto">
//                       ${flight.flexibility.changeFee} {flight.currency}
//                     </Badge>
//                   )}
//                 </div>
//                 {flight.flexibility.changePolicy && (
//                   <p className="text-sm text-gray-600">{flight.flexibility.changePolicy}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar - Resumen y acciones */}
//         <div className="space-y-6">
          
//           {/* Resumen de precio */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Resumen del precio</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Vuelo base</span>
//                   <span>${flight.price} {flight.currency}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Impuestos y cargos</span>
//                   <span>Incluidos</span>
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span>${flight.price} {flight.currency}</span>
//               </div>
              
//               <p className="text-xs text-gray-500">{flight.priceLabel}</p>
//             </CardContent>
//           </Card>

//           {/* Acciones */}
//           <div className="space-y-3">
//             <Button 
//               className="w-full" 
//               size="lg"
//               onClick={handleContinueBooking}
//             >
//               <CreditCard className="h-4 w-4 mr-2" />
//               Continuar reserva
//             </Button>
            
//             <Button 
//               variant="outline" 
//               className="w-full"
//               onClick={handleBackToResults}
//             >
//               Volver a resultados
//             </Button>
//           </div>

//           {/* Información adicional */}
//           <Card>
//             <CardContent className="p-4">
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-gray-400" />
//                   <span className="text-gray-600">Selección de asiento disponible</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-gray-400" />
//                   <span className="text-gray-600">Check-in online 24h antes</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
