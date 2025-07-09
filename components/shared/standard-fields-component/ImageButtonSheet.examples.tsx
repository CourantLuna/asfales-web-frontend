// import { ImageButtonSheet, type ImageButtonSheetItem } from '@/components/shared/standard-fields-component/ImageButtonSheet';

// // Ejemplo de uso del ImageButtonSheet
// const exampleItems: ImageButtonSheetItem[] = [
//   {
//     label: 'Vuelos',
//     src: '/menu-icons/plane-icon.svg',
//     size: 64,
//     sheetTitle: 'Reservar Vuelos',
//     sheetContent: (
//       <div className="space-y-4">
//         <p className="text-gray-600">
//           Encuentra los mejores vuelos a precios increíbles
//         </p>
//         <div className="bg-blue-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-blue-900 mb-2">Ofertas especiales</h3>
//           <p className="text-blue-800 text-sm">
//             Hasta 40% de descuento en vuelos internacionales
//           </p>
//         </div>
//       </div>
//     ),
//     btnLabel: 'Buscar Vuelos',
//     btnAction: () => {
//       console.log('Navegando a búsqueda de vuelos...');
//       // Aquí iría la navegación real
//     }
//   },
//   {
//     label: 'Hoteles',
//     src: '/menu-icons/lodging-icon.svg',
//     size: 64,
//     sheetTitle: 'Reservar Hoteles',
//     sheetContent: (
//       <div className="space-y-4">
//         <p className="text-gray-600">
//           Alojamientos perfectos para tu viaje
//         </p>
//         <div className="bg-green-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-green-900 mb-2">Hoteles recomendados</h3>
//           <p className="text-green-800 text-sm">
//             Desde hoteles boutique hasta resorts de lujo
//           </p>
//         </div>
//       </div>
//     ),
//     btnLabel: 'Buscar Hoteles',
//     btnAction: () => {
//       console.log('Navegando a búsqueda de hoteles...');
//     }
//   },
//   {
//     label: 'Cruceros',
//     src: '/menu-icons/cruise-icon.svg',
//     size: 64,
//     sheetTitle: 'Reservar Cruceros',
//     sheetContent: (
//       <div className="space-y-4">
//         <p className="text-gray-600">
//           Experiencias únicas navegando por el mundo
//         </p>
//         <div className="bg-purple-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-purple-900 mb-2">Destinos populares</h3>
//           <p className="text-purple-800 text-sm">
//             Caribe, Mediterráneo, Fiordos Noruegos y más
//           </p>
//         </div>
//       </div>
//     ),
//     btnLabel: 'Buscar Cruceros',
//     btnAction: () => {
//       console.log('Navegando a búsqueda de cruceros...');
//     }
//   },
//   {
//     label: 'Actividades',
//     src: '/menu-icons/activities-icon.svg',
//     size: 64,
//     sheetTitle: 'Actividades y Tours',
//     sheetContent: (
//       <div className="space-y-4">
//         <p className="text-gray-600">
//           Descubre experiencias inolvidables en tu destino
//         </p>
//         <div className="bg-orange-50 p-4 rounded-lg">
//           <h3 className="font-semibold text-orange-900 mb-2">Tours destacados</h3>
//           <p className="text-orange-800 text-sm">
//             Desde tours gastronómicos hasta aventuras extremas
//           </p>
//         </div>
//       </div>
//     ),
//     btnLabel: 'Ver Actividades',
//     btnAction: () => {
//       console.log('Navegando a actividades...');
//     }
//   }
// ];

// // Ejemplo de uso en un componente
// export default function ExampleUsage() {
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Ejemplo de ImageButtonSheet</h1>
      
//       <ImageButtonSheet
//         label="Selecciona tu tipo de viaje"
//         items={exampleItems}
//         containerClassName="mb-8"
//         required={true}
//         helperText="Toca cualquier opción para ver más detalles"
//       />
//     </div>
//   );
// }
