// "use client";

// import { useState } from 'react';
// import TransportsSearchBar from '@/components/transport/TransportsSearchBar';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';

// export default function TransportSearchDemoPage() {
//   const [showSearchButton, setShowSearchButton] = useState(true);
//   const [showMobileSelect, setShowMobileSelect] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Transport Search Demo
//             </h1>
//             <p className="text-gray-600">
//               Demonstrating the TransportsSearchBar component with configurable options
//             </p>
//           </div>

//           {/* Controls */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>Demo Controls</CardTitle>
//               <CardDescription>
//                 Use these controls to test the different configurations of the TransportsSearchBar
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="search-button-toggle" className="text-sm font-medium">
//                     Show Search Buttons
//                   </Label>
//                   <Switch
//                     id="search-button-toggle"
//                     checked={showSearchButton}
//                     onCheckedChange={setShowSearchButton}
//                   />
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="mobile-select-toggle" className="text-sm font-medium">
//                     Show Mobile Select Dropdown
//                   </Label>
//                   <Switch
//                     id="mobile-select-toggle"
//                     checked={showMobileSelect}
//                     onCheckedChange={setShowMobileSelect}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Transport Search Component */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Transport Search Bar</CardTitle>
//               <CardDescription>
//                 This component includes tabs for Flights, Cruises, and Buses with configurable search buttons
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <TransportsSearchBar 
//                 showSearchButton={showSearchButton}
//                 showMobileSelect={showMobileSelect}
//               />
//             </CardContent>
//           </Card>

//           {/* Current Configuration */}
//           <Card className="mt-8">
//             <CardHeader>
//               <CardTitle>Current Configuration</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="font-medium">showSearchButton:</span>
//                   <span className={showSearchButton ? 'text-green-600' : 'text-red-600'}>
//                     {showSearchButton ? 'true' : 'false'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium">showMobileSelect:</span>
//                   <span className={showMobileSelect ? 'text-green-600' : 'text-red-600'}>
//                     {showMobileSelect ? 'true' : 'false'}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Usage Examples */}
//           <Card className="mt-8">
//             <CardHeader>
//               <CardTitle>Usage Examples</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-medium mb-2">Basic Usage (with all buttons):</h4>
//                   <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
//                     <code>{`<TransportsSearchBar />`}</code>
//                   </pre>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium mb-2">Without Search Buttons:</h4>
//                   <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
//                     <code>{`<TransportsSearchBar showSearchButton={false} />`}</code>
//                   </pre>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium mb-2">Without Mobile Select:</h4>
//                   <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
//                     <code>{`<TransportsSearchBar showMobileSelect={false} />`}</code>
//                   </pre>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium mb-2">Custom Configuration:</h4>
//                   <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
//                     <code>{`<TransportsSearchBar 
//   showSearchButton={false} 
//   showMobileSelect={true} 
// />`}</code>
//                   </pre>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
