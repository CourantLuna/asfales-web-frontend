"use client"

import LandingSections from "@/components/landing/LandingSections";
import { RenderFields, RowData, ColField, MultiColumnFields } from "@/components/shared/RenderFields";
import LodgingCard from "@/components/lodging-search/LodgingCard";

interface HomePageProps {
  children?: React.ReactNode;
}




const rowData = {
  ratingScore: 4.7,
  ratingLabel: "Excelente",
  reviews: 378,
  price: { currency: "USD", value: 598.52 },
  benefits: [
    { label: "Wifi Gratis", included: true },
    { label: "Piscina", included: true },
    { label: "Mascotas", included: false },
  ],
  otherScore: 2.1,
  otherLabel: "Regular",
  otherValue: 99,
  otherPrice: { currency: "EUR", value: 102.00 },
};


const column1: ColField[] = [
  { 
    field: "ratingScore", 
    type: "text", 
    className: "bg-[#15b32a] text-white text-sm font-semibold rounded-lg py-1 flex items-center px-4",
    key: "ratingScore",
    fields: [
      { field: "ratingLabel", type: "text", className: "text-sm font-medium text-gray-800", key: "ratingLabel" },
      { field: "reviews", type: "number", className: "text-xs text-muted-foreground", key: "reviews" }
    ]
  },
  {
    key: "price",
    field: "price",
    type: "price",
    className: "text-xl font-bold text-blue-700",
  },
  {
    key: "benefits",
    field: "benefits",
    type: "benefits",
    className: "",
  },
];

const column2: ColField[] = [
  { 
    field: "otherScore", 
    type: "text", 
    className: "bg-[#15b3ea] text-white text-sm font-semibold rounded-lg py-1 flex items-center px-4",
    key: "otherScore",
    fields: [
      { field: "otherLabel", type: "text", className: "text-sm font-medium text-gray-800", key: "otherLabel" },
      { field: "otherValue", type: "number", className: "text-xs text-muted-foreground", key: "otherValue" }
    ]
  },
  {
    key: "otherPrice",
    field: "otherPrice",
    type: "price",
    className: "text-xl font-bold text-red-700",
  },
];




export default function Page({ children }: HomePageProps) {
  return (

  <div className="space-y-12">


   
 <LodgingCard />
  <MultiColumnFields columns={[column1, column2]} rowData={rowData}   aligns={["start", "end"]} width="w-[400px]"/>


  <LandingSections></LandingSections>


  </div>

);
}
