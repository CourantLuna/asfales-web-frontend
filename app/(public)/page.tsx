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




export default function Page({ children }: HomePageProps) {
  return (

  < >

  <LandingSections></LandingSections>
  </>

);
}
