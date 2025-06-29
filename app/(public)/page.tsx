"use client"

import LandingSections from "@/components/landing/LandingSections";
import { RenderFields, RowData, ColField, MultiColumnFields } from "@/components/shared/RenderFields";
import LodgingCard from "@/components/lodging-search/LodgingCard";
import LodgingCardList from "@/components/lodging-search/LodgingCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface HomePageProps {
  children?: React.ReactNode;
}


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
    price: "$100",
    isFavorite: false,
    oferta: "Oferta"
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
    price: "$419",
    isFavorite: true,
    oferta: "Last Minute"
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
    price: "$495",
    isFavorite: false,
    oferta: "Special"
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
    price: "$350",
    isFavorite: false,
    oferta: "Dubai Offer"
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
    price: "$279",
    isFavorite: true,
    oferta: "10% OFF"
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
    price: "$630",
    isFavorite: false,
    oferta: "Special Value"
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
    price: "$355",
    isFavorite: true,
    oferta: "Upgrade"
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
    price: "$430",
    isFavorite: false,
    oferta: "Exclusive"
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
    price: "$680",
    isFavorite: true,
    oferta: "Summer Deal"
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
    price: "$999",
    isFavorite: true,
    oferta: "Top Seller"
  }
];






export default function Page({ children }: HomePageProps) {
  return (

  <div className="">


   <div className="grid grid-cols-1  gap-6">
      <LodgingCardList
        rows={lodgingRows}
        orientationCard="horizontal"
        onCardClick={(idx, row) => alert(`¡Click en card #${idx}: ${row.title}!`)}
      />
    </div>


  <LandingSections></LandingSections>


  </div>

);
}
