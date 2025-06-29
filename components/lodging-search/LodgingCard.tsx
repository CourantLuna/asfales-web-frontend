'use client';

import { Waves } from 'lucide-react';
import React, { useState } from 'react';
import { ColField, MultiColumnFields } from '../shared/RenderFields';
import CustomCard from '../shared/CustomCard';
import { OverlayCarrusel, OverlayValue } from '../shared/ImageCarouselv2';
interface ILodgingCardProps {}

const column1: ColField[] = [
  { field: "title", type: "text", key: "title", className: "text-xl font-bold text-gray-900" },
  { field: "subtitle", type: "text", key: "subtitle", className: "text-base text-gray-600" },
  {
    key: "pool",
    type: "icon",
    label: "Pool",
    className: "text-base text-gray-700 flex items-center gap-1 mt-2"
  },
  { field: "descMain", type: "text", key: "descMain", className: "font-bold text-sm mt-2" },
  { field: "descSub", type: "text", key: "descSub", className: "text-sm text-gray-500" },
  { field: "refundable", type: "text", key: "refundable", className: "text-green-700 font-semibold mt-3" },
  { field: "reserveNow", type: "text", key: "reserveNow", className: "text-green-600" },
  // Rating bloque (puedes hacer grupo anidado si quieres, aquí se puede dejar como badge+fields)
  {
    field: "rating",
    type: "badge",
    key: "rating",
    className: "bg-green-600 text-white text-base rounded-lg font-semibold px-2 h-7 flex items-center mt-3",
    fields: [
      { field: "ratingLabel", type: "text", key: "ratingLabel", className: "font-semibold text-lg text-gray-900 ml-2" },
      { field: "ratingCount", type: "text", key: "ratingCount", className: "text-xs text-gray-500 ml-2" }
    ]
  }
];

const column2: ColField[] = [
  { field: "alert", type: "alert", key: "alert" },
  {
    field: "nightlyPrice",
    type: "price",
    key: "nightlyPrice",
    className: "text-sm text-gray-500 line-through text-right",
    // puedes agregar más props para variantes si lo necesitas
  },
  {
    field: "beforePrice",
    type: "price",
    key: "beforePrice",
    className: "text-sm text-gray-400 line-through text-right",
  },
  {
    field: "afterPrice",
    type: "price",
    key: "afterPrice",
    className: "text-2xl font-bold text-right text-gray-900",
  }
];

const rowData = {
  title: "York Luxury Suites Medellín",
  subtitle: "El Poblado",
  descMain: "Fully equipped suites with google home",
  descSub: "Suites up to 56m2, fully equipped kitchen and google home. Terrace over looking the city and jacuzzi",
  refundable: "Fully refundable",
  reserveNow: "Reserve now, pay later",
  rating: 9.6,
  ratingLabel: "Exceptional",
  ratingCount: "1,217 reviews",
  alert: "We have 5 left at $137 off at",
  beforePrice: { currency: "USD", value: 227 },
  afterPrice: { currency: "USD", value: 189 },
  nightlyPrice: { currency: "USD", value: 189 },
};



const imagesSrc = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",


];


const overlays: OverlayCarrusel[] = [
  {
    type: "badge",
    bgcolor: "bg-green-100",
    field: "price",
    align: "top-left",
    textColor: "text-black",
  },
  {
    type: "favorite",
    bgcolor: "bg-white",
    align: "top-right",
    actionFavorite: (idx) => alert("Favorito en " + idx),
  },
  {
    type: "badge",
    bgcolor: "bg-secondary",
    align: "bottom-right",
    field: "oferta",
  },
];


const overlayValues: OverlayValue =
  { price: "$100", isFavorite: false, oferta: "Oferta" };

export default function LodgingCard() {
  return (
    <div>
 <CustomCard
  orientationCard="horizontal"
  cardWidth='w-[full]'
  carouselWidth='w-1/3'
  images={imagesSrc}
  title="Viaja con Asfales"
  description="Comparador inteligente de viajes y experiencias."
  overlayCarrusel={overlays}
  overlayValues={overlayValues}
  content={
    <MultiColumnFields
        columns={[column1, column2]}
        rowData={rowData}
        gap={0}
        aligns={["start", "end"]}
        yAligns={["start", "end"]}
        
      />
  }
/>

<img
src={imagesSrc[0]}
alt="Lodging"
className="object-cover w-[400px] h-[850px] rounded-l-2xl"
/>

            
      
    </div>
  );
}