// import { RowData } from '@/components/shared/RenderFields';
// import { LodgingType } from './lodging-types';




// // Función para generar más datos mock dinámicamente
// export const generateMockLodgingData = (
//   type: LodgingType, 
//   count: number = 10
// ): RowData[] => {
//   const baseData = getMockDataForLodgingType(type);
//   const generated: RowData[] = [];
  
//   for (let i = 0; i < count; i++) {
//     const base = baseData[i % baseData.length];
//     generated.push({
//       ...base,
//       id: `${type}-generated-${i + 1}`,
//       title: `${base.title} ${i + 1}`,
//       afterPrice: {
//         ...base.afterPrice!,
//         value: base.afterPrice!.value + Math.floor(Math.random() * 50) - 25
//       },
//       rating: Number((4 + Math.random()).toFixed(1)),
//       totalRatings: Math.floor(Math.random() * 1000) + 100
//     });
//   }
  
//   return generated;
// };
