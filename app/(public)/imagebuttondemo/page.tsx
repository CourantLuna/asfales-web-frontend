// "use client";

// import { useState } from 'react';
// import { ImageButtonSheet, type ImageButtonSheetItem } from '@/components/shared/standard-fields-component/ImageButtonSheet';

// export default function ImageButtonDemoPage() {
//   const [selectedOption, setSelectedOption] = useState<string>('');

//   // Ejemplo completo con todos los íconos disponibles
//   const travelOptions: ImageButtonSheetItem[] = [
//     {
//       label: 'Vuelos',
//       src: '/menu-icons/plane-icon.svg',
//       size: 80,
//       sheetTitle: 'Reservar Vuelos',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
//               ✈️
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Encuentra tu vuelo perfecto
//             </h3>
//             <p className="text-gray-600">
//               Compara precios de más de 500 aerolíneas y encuentra las mejores ofertas
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <div className="text-2xl font-bold text-blue-600">40%</div>
//               <div className="text-sm text-blue-800">Descuento máximo</div>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <div className="text-2xl font-bold text-blue-600">500+</div>
//               <div className="text-sm text-blue-800">Aerolíneas</div>
//             </div>
//           </div>
          
//           <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
//             <h4 className="font-semibold text-yellow-900 mb-2">🎉 Oferta especial</h4>
//             <p className="text-yellow-800 text-sm">
//               Vuelos a Europa desde $299 USD. Válido hasta fin de mes.
//             </p>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Buscar Vuelos Ahora',
//       btnAction: () => {
//         setSelectedOption('Vuelos');
//         console.log('Navegando a búsqueda de vuelos...');
//       }
//     },
//     {
//       label: 'Hoteles',
//       src: '/menu-icons/lodging-icon.svg',
//       size: 80,
//       sheetTitle: 'Reservar Hoteles',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
//               🏨
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Alójate con estilo
//             </h3>
//             <p className="text-gray-600">
//               Desde hoteles boutique hasta resorts de lujo, encuentra tu hogar perfecto
//             </p>
//           </div>
          
//           <div className="space-y-3">
//             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
//                 ⭐
//               </div>
//               <div>
//                 <div className="font-semibold">Hoteles 5 estrellas</div>
//                 <div className="text-sm text-gray-600">Lujo y comodidad garantizados</div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
//                 💰
//               </div>
//               <div>
//                 <div className="font-semibold">Ofertas exclusivas</div>
//                 <div className="text-sm text-gray-600">Hasta 60% de descuento</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Explorar Hoteles',
//       btnAction: () => {
//         setSelectedOption('Hoteles');
//         console.log('Navegando a búsqueda de hoteles...');
//       }
//     },
//     {
//       label: 'Cruceros',
//       src: '/menu-icons/cruise-icon.svg',
//       size: 80,
//       sheetTitle: 'Reservar Cruceros',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
//               🚢
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Navega hacia la aventura
//             </h3>
//             <p className="text-gray-600">
//               Descubre el mundo desde una perspectiva única con nuestros cruceros
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             <h4 className="font-semibold text-gray-900">Destinos populares:</h4>
//             <div className="grid grid-cols-1 gap-3">
//               <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border">
//                 <div className="font-semibold text-blue-900">🏝️ Caribe</div>
//                 <div className="text-sm text-blue-700">7-14 días • Desde $599</div>
//               </div>
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border">
//                 <div className="font-semibold text-amber-900">🏛️ Mediterráneo</div>
//                 <div className="text-sm text-amber-700">10-12 días • Desde $899</div>
//               </div>
//               <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border">
//                 <div className="font-semibold text-slate-900">🏔️ Fiordos Noruegos</div>
//                 <div className="text-sm text-slate-700">7-10 días • Desde $1299</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Ver Cruceros Disponibles',
//       btnAction: () => {
//         setSelectedOption('Cruceros');
//         console.log('Navegando a búsqueda de cruceros...');
//       }
//     },
//     {
//       label: 'Buses',
//       src: '/menu-icons/bus-icon.svg',
//       size: 80,
//       sheetTitle: 'Viajes en Bus',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
//               🚌
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Viaja cómodo y económico
//             </h3>
//             <p className="text-gray-600">
//               Red de buses moderna con las mejores comodidades para tu viaje
//             </p>
//           </div>
          
//           <div className="grid grid-cols-3 gap-3 text-center">
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="text-lg font-bold text-orange-600">📶</div>
//               <div className="text-xs text-orange-800 mt-1">WiFi Gratis</div>
//             </div>
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="text-lg font-bold text-orange-600">🔌</div>
//               <div className="text-xs text-orange-800 mt-1">Tomas USB</div>
//             </div>
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="text-lg font-bold text-orange-600">❄️</div>
//               <div className="text-xs text-orange-800 mt-1">Aire A/C</div>
//             </div>
//           </div>
          
//           <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
//             <h4 className="font-semibold text-green-900 mb-2">💚 Eco-friendly</h4>
//             <p className="text-green-800 text-sm">
//               Viaja de forma sostenible. Nuestros buses reducen la huella de carbono comparado con otros medios de transporte.
//             </p>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Buscar Rutas de Bus',
//       btnAction: () => {
//         setSelectedOption('Buses');
//         console.log('Navegando a búsqueda de buses...');
//       }
//     },
//     {
//       label: 'Actividades',
//       src: '/menu-icons/activities-icon.svg',
//       size: 80,
//       sheetTitle: 'Actividades y Tours',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//               🎯
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Experiencias inolvidables
//             </h3>
//             <p className="text-gray-600">
//               Descubre actividades únicas y tours guiados en tu destino
//             </p>
//           </div>
          
//           <div className="space-y-3">
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">🍕</span>
//                 <div>
//                   <div className="font-semibold text-red-900">Tours Gastronómicos</div>
//                   <div className="text-sm text-red-700">Sabores auténticos locales</div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">🏔️</span>
//                 <div>
//                   <div className="font-semibold text-green-900">Aventuras Extremas</div>
//                   <div className="text-sm text-green-700">Adrenalina y naturaleza</div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl">🏛️</span>
//                 <div>
//                   <div className="font-semibold text-blue-900">Tours Culturales</div>
//                   <div className="text-sm text-blue-700">Historia y tradiciones</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Explorar Actividades',
//       btnAction: () => {
//         setSelectedOption('Actividades');
//         console.log('Navegando a actividades...');
//       }
//     },
//     {
//       label: 'Itinerarios',
//       src: '/menu-icons/itineraries-icon.svg',
//       size: 80,
//       sheetTitle: 'Itinerarios Personalizados',
//       sheetContent: (
//         <div className="space-y-6">
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
//               🗺️
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Tu viaje, a tu medida
//             </h3>
//             <p className="text-gray-600">
//               Creamos itinerarios personalizados basados en tus intereses y presupuesto
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             <h4 className="font-semibold text-gray-900">¿Cómo funciona?</h4>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
//                 <div>
//                   <div className="font-medium">Cuéntanos tus preferencias</div>
//                   <div className="text-sm text-gray-600">Destinos, fechas, presupuesto y actividades favoritas</div>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
//                 <div>
//                   <div className="font-medium">Recibe tu itinerario</div>
//                   <div className="text-sm text-gray-600">Plan detallado día a día con reservas incluidas</div>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
//                 <div>
//                   <div className="font-medium">¡Disfruta tu viaje!</div>
//                   <div className="text-sm text-gray-600">Todo organizado para que solo te preocupes por disfrutar</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       btnLabel: 'Crear Mi Itinerario',
//       btnAction: () => {
//         setSelectedOption('Itinerarios');
//         console.log('Navegando a creación de itinerarios...');
//       }
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto py-8">
//         <div className="max-w-4xl mx-auto space-y-8">
          
//           {/* Header */}
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               🖼️ ImageButtonSheet Demo
//             </h1>
//             <p className="text-gray-600 mb-8">
//               Componente para mostrar botones con imágenes que abren sheets con contenido personalizable.
//               <br />
//               En mobile, los sheets se abren en pantalla completa desde abajo.
//             </p>
//           </div>

//           {/* Demo Principal */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-6">Opciones de Viaje</h2>
            
//             <ImageButtonSheet
//               label="¿Qué tipo de experiencia buscas?"
//               items={travelOptions}
//               containerClassName="mb-6"
//               required={true}
//               helperText="Toca cualquier opción para ver más detalles y ofertas especiales"
//             />

//             {/* Estado seleccionado */}
//             {selectedOption && (
//               <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-green-800">
//                   <span className="font-semibold">Última selección:</span> {selectedOption}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Ejemplo con menos opciones */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-semibold mb-6">Ejemplo Compacto</h2>
            
//             <ImageButtonSheet
//               label="Transporte preferido"
//               items={travelOptions.slice(0, 3)} // Solo primeros 3
//               containerClassName="mb-4"
//               helperText="Versión con menos opciones para espacios más pequeños"
//             />
//           </div>

//           {/* Features */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-blue-900 mb-4">
//               ✨ Características del ImageButtonSheet
//             </h3>
//             <div className="grid md:grid-cols-2 gap-4 text-blue-800">
//               <div>
//                 <h4 className="font-semibold mb-2">🖼️ Imágenes</h4>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Soporte SVG y PNG</li>
//                   <li>• Tamaño configurable (1:1)</li>
//                   <li>• Optimización con Next.js Image</li>
//                   <li>• Hover effects suaves</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">📱 Mobile-First</h4>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Sheet desde abajo en mobile</li>
//                   <li>• Header con título personalizable</li>
//                   <li>• Contenido scrolleable</li>
//                   <li>• Botón de acción fijo abajo</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">🎨 Diseño</h4>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Flex wrap responsive</li>
//                   <li>• Labels fuera del botón</li>
//                   <li>• Estados disabled</li>
//                   <li>• Consistente con otros fields</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">⚙️ Configuración</h4>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Props totalmente tipadas</li>
//                   <li>• Contenido JSX personalizable</li>
//                   <li>• Acciones configurables</li>
//                   <li>• Error handling integrado</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Instrucciones técnicas */}
//           <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               🔧 Uso técnico
//             </h3>
//             <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
//               <pre className="text-sm">
// {`import { ImageButtonSheet } from '@/components/shared/standard-fields-component/ImageButtonSheet';

// const items = [
//   {
//     label: 'Vuelos',
//     src: '/menu-icons/plane-icon.svg',
//     size: 80,
//     sheetTitle: 'Reservar Vuelos',
//     sheetContent: <div>Tu contenido aquí</div>,
//     btnLabel: 'Buscar Vuelos',
//     btnAction: () => console.log('Acción!')
//   }
// ];

// <ImageButtonSheet
//   label="Selecciona una opción"
//   items={items}
//   required={true}
// />`}
//               </pre>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
