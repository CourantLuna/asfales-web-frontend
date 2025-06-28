"use client";
import { TravelOptionCard } from "@/components/TravelOptionCard";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/shared/CustomCard";


export default function lodgingSearch() {
  return (
    
  <TravelOptionCard
  images={[
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/335263879.jpg?k=0ad7e..."
  ]}
  isAd
  isFavorite
  onToggleFavorite={() => alert("Fav!")}
  title="Heiss Hotel"
  subtitle="El Poblado"
  amenities={[<>🏊 Pool</>]}
  highlight="Perfect Experiences, Every Time"
  description="We offer exceptional spaces created for a perfect experience, ensuring your comfort and satisfaction in every detail, every time"
  rating={{ score: 9.2, label: "Wonderful", reviews: 574 }}
  price={{ current: 69, old: 94, label: "total" }}
  discountLabel="$25 off"
  promoLabel="25% off"
  action={<Button>Reservar</Button>}
/>


  
  );
}
