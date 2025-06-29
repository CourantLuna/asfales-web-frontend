"use client"
import { Lodging } from "@/types/lodging.types";
import { RowData } from "../shared/RenderFields";
import LodgingCardList from "./LodgingCard";
import { fetchLodgings } from "@/services/lodging.service";
import { useEffect, useRef, useState } from "react";
import EventDrivenProgress, { EventDrivenProgressRef } from "@/components/shared/EventDrivenProgress";
import React from "react";


const lodgingRows: RowData[] = [
  {
    title: "York Luxury Suites Medellín",
    subtitle: "El Poblado",
    descMain: "Fully equipped suites with Google Home",
    descSub: "Suites up to 56m², fully equipped kitchen and Google Home. Terrace overlooking the city and jacuzzi.",
    refundable: "Fully refundable",
    reserveNow: "Reserve now, pay later",
    rating: 9.6,
    ratingLabel: "Exceptional",
    ratingCount: "1,217 reviews",
    alert: "We have 5 left at $137 off",
    beforePrice: { currency: "USD", value: 227 },
    afterPrice: { currency: "USD", value: 189 },
    nightlyPrice: { currency: "USD", value: 189 },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$100",
    isFavorite: false,
    badge2: "oferta",
    badge2ndColumn: "We have 1 left at"
    
  },
  {
    title: "The Plaza Hotel NYC",
    subtitle: "Manhattan, New York",
    descMain: "Iconic luxury with Central Park views",
    descSub: "Elegant rooms, gourmet dining, and world-class spa in a historic setting.",
    refundable: "Free cancellation",
    reserveNow: "Book now, pay at stay",
    rating: 9.3,
    ratingLabel: "Wonderful",
    ratingCount: "2,007 reviews",
    alert: "Only 2 rooms left at this price!",
    beforePrice: { currency: "USD", value: 460 },
    afterPrice: { currency: "USD", value: 419 },
    nightlyPrice: { currency: "USD", value: 419 },
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3e92?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$419",
    isFavorite: true,
    badge: "Last Minute",
    badge2ndColumn: "We have 1 left at $20 off at"

  },
  {
    title: "Hotel Esencia",
    subtitle: "Tulum, Mexico",
    descMain: "Boutique luxury on the Riviera Maya",
    descSub: "Private beach, lush gardens, and top-rated spa for an unforgettable getaway.",
    refundable: "Fully refundable",
    reserveNow: "Pay later",
    rating: 9.8,
    ratingLabel: "Exceptional",
    ratingCount: "789 reviews",
    alert: "Limited time deal!",
    beforePrice: { currency: "USD", value: 540 },
    afterPrice: { currency: "USD", value: 495 },
    nightlyPrice: { currency: "USD", value: 495 },
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504470695779-75300268aa76?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$495",
    isFavorite: false,
    badge: "Special",
    badge2ndColumn: "We have 1 left at $16 off at"
  },
  {
    title: "Palace Downtown Dubai",
    subtitle: "Downtown Dubai",
    descMain: "Luxury in the heart of Dubai",
    descSub: "Experience opulence with Burj Khalifa views and 5-star amenities.",
    refundable: "No prepayment needed",
    reserveNow: "Book today, pay on arrival",
    rating: 9.1,
    ratingLabel: "Superb",
    ratingCount: "1,118 reviews",
    alert: "High demand! Book soon",
    beforePrice: { currency: "USD", value: 389 },
    afterPrice: { currency: "USD", value: 350 },
    nightlyPrice: { currency: "USD", value: 350 },
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764b79?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$350",
    isFavorite: false,
    badge: "Dubai Offer"
  },
  {
    title: "Fairmont Le Château Frontenac",
    subtitle: "Québec City, Canada",
    descMain: "Historic elegance meets modern comfort",
    descSub: "Stay in a castle overlooking Old Québec and the St. Lawrence River.",
    refundable: "Fully refundable",
    reserveNow: "No deposit required",
    rating: 9.4,
    ratingLabel: "Exceptional",
    ratingCount: "2,589 reviews",
    alert: "10% off today only!",
    beforePrice: { currency: "USD", value: 310 },
    afterPrice: { currency: "USD", value: 279 },
    nightlyPrice: { currency: "USD", value: 279 },
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$279",
    isFavorite: true,
    badge: "10% OFF"
  },
  {
    title: "Raffles Singapore",
    subtitle: "Singapore",
    descMain: "Timeless heritage, legendary hospitality",
    descSub: "Colonial luxury, famous for its Long Bar and iconic service.",
    refundable: "Free cancellation",
    reserveNow: "Reserve now, pay at property",
    rating: 9.7,
    ratingLabel: "Exceptional",
    ratingCount: "903 reviews",
    alert: "Best value in Singapore",
    beforePrice: { currency: "USD", value: 680 },
    afterPrice: { currency: "USD", value: 630 },
    nightlyPrice: { currency: "USD", value: 630 },
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$630",
    isFavorite: false,
    badge: "Special Value"
  },
  {
    title: "Hotel Arts Barcelona",
    subtitle: "Barcelona, Spain",
    descMain: "Modern art and Mediterranean views",
    descSub: "Exclusive beach access, Michelin-star dining, and stunning skyline vistas.",
    refundable: "Fully refundable",
    reserveNow: "Book now, pay at hotel",
    rating: 9.2,
    ratingLabel: "Superb",
    ratingCount: "1,678 reviews",
    alert: "Sea view upgrade included!",
    beforePrice: { currency: "USD", value: 390 },
    afterPrice: { currency: "USD", value: 355 },
    nightlyPrice: { currency: "USD", value: 355 },
    images: [
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3e92?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$355",
    isFavorite: true,
    badge: "Upgrade"
  },
  {
    title: "The Oberoi Udaivilas",
    subtitle: "Udaipur, India",
    descMain: "A palace by Lake Pichola",
    descSub: "Live like royalty with butler service, ornate suites, and lakeside serenity.",
    refundable: "Fully refundable",
    reserveNow: "Pay later",
    rating: 9.9,
    ratingLabel: "Outstanding",
    ratingCount: "812 reviews",
    alert: "Limited rooms available",
    beforePrice: { currency: "USD", value: 470 },
    afterPrice: { currency: "USD", value: 430 },
    nightlyPrice: { currency: "USD", value: 430 },
    images: [
      "https://images.unsplash.com/photo-1504470695779-75300268aa76?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$430",
    isFavorite: false,
    badge: "Exclusive"
  },
  {
    title: "Four Seasons Resort Maui",
    subtitle: "Maui, Hawaii",
    descMain: "Tropical paradise on Wailea Beach",
    descSub: "Swim-up suites, water sports, and world-class relaxation.",
    refundable: "Free cancellation",
    reserveNow: "Book now, pay at stay",
    rating: 9.5,
    ratingLabel: "Superb",
    ratingCount: "2,203 reviews",
    alert: "Summer deal - save $100",
    beforePrice: { currency: "USD", value: 780 },
    afterPrice: { currency: "USD", value: 680 },
    nightlyPrice: { currency: "USD", value: 680 },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$680",
    isFavorite: true,
    badge: "Summer Deal"
  },
  {
    title: "The Ritz Paris",
    subtitle: "Paris, France",
    descMain: "Ultimate Parisian luxury on Place Vendôme",
    descSub: "Historic glamour, fine dining, and legendary suites in the heart of Paris.",
    refundable: "No prepayment needed",
    reserveNow: "Reserve now, pay at property",
    rating: 9.8,
    ratingLabel: "Exceptional",
    ratingCount: "1,055 reviews",
    alert: "One of our bestsellers!",
    beforePrice: { currency: "USD", value: 1100 },
    afterPrice: { currency: "USD", value: 999 },
    nightlyPrice: { currency: "USD", value: 999 },
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ],
    badge1: "$999",
    isFavorite: true,
    badge2: "Top Seller"
  }
];


export default function LodgingSearch() {
     const [rows, setRows] = useState<RowData[]>([]);
const [loading, setLoading] = React.useState(true);
  const progressRef = useRef<EventDrivenProgressRef>(null);

 // Dispara la barra de progreso siempre que loading sea distinto de false (true o undefined)
  useEffect(() => {
    if (loading !== false) {
      // Espera un tick para asegurar que el ref esté listo
      setTimeout(() => {
        progressRef.current?.start();
      }, 0);
    } else {
      progressRef.current?.finish();
    }
  }, [loading]);

  // Solo para DEMO: simula una carga lenta
  useEffect(() => {
    setLoading(true);
    fetchLodgings()
      .then((apiData) => setRows(apiData.map(mapLodgingToRowData)))
      .finally(() => setLoading(false));
  }, []);

     if (loading) return       <EventDrivenProgress ref={progressRef} className="w-full my-4" />;
      return (
    <>
      {loading ? (
        <div style={{ minHeight: 60 }} /> // Espacio mínimo para que no "salte" la UI
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <LodgingCardList
            onCardClick={(idx, row) =>
              alert(`¡Click en card #${idx}: ${row.title}!`)
            }
            rows={rows}
          />
        </div>
      )}
    </>
  );

    //    <div className="grid grid-cols-1  gap-6">
    //         <LodgingCardList
    //           rows={lodgingRows}
    //           onCardClick={(idx, row) => alert(`¡Click en card #${idx}: ${row.title}!`)}
    //         />
    //       </div>

}

export function mapLodgingToRowData(lodging: Lodging): RowData {
  return {
    // Mapear lo que necesita tu UI
    title: lodging.hotelName,
    images: [
      lodging.hotelImage1,
      lodging.hotelImage2,
      lodging.hotelImage3,
      lodging.hotelImage4,
    ].filter(Boolean), // solo las que existen
    feature1: lodging.feature1,
    feature2: lodging.feature1,
    // descMain: lodging.,
    descSub: lodging.location,
    refundable: lodging.refundable,
    reserveNow: lodging.reserveNow,
    nightlyPrice: lodging.nightlyPrice,
    beforePrice: lodging.beforePrice,
    afterPrice: lodging.priceTotal,
    badge1: lodging.badge1,
    badge2: lodging.availableBadge,
    badge2ndColumn: lodging.availableBadge,
    isFavorite: false, // puedes setear desde API si tienes el campo
    rating: lodging.rating, // si tu API tiene campo rating
    ratingLabel: lodging.ratingLabel, // idem
    ratingCount: lodging.ratingCount, // idem
    location: lodging.location,
    subtitle: lodging.location, // puedes ajustar según tu diseño
    // ...otros campos que uses en tu sistema
  };
}
