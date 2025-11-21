"use client";

import { useState } from "react";
import { CustomSheet } from "@/components/shared/CustomSheet";
import LodgingSearchMedellinDemo from "./LodgingSearchMedellinDemo";
import ApartmentsAndLongstaysLayout from "@/app/(just-appbar)/lodgings/apartments-and-longstays/layout";
import HostelsGuesthousesResults from "./HostelsGueshousesResults";
import ApartmentsLongstaysResults from "./ApartmentsLongstaysResults";
import HotelsResortsResultSimple from "./HotelsResortsResultSimple";

interface MobileLodgingResultsTemplateProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  LodgingType?: string; // Tipo de alojamiento (hotels, apartments, etc.)
}

export function MobileLodgingResultsTemplate({
  open,
  onOpenChange,
  LodgingType
}: MobileLodgingResultsTemplateProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    // Implementar lógica de compartir
    console.log("Compartir búsqueda");
  };

  return (
    <CustomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Resultados de Alojamiento"
      showShareButton
      showFavoriteButton
      onShareClick={handleShare}
      onFavoriteClick={() => setIsFavorite(!isFavorite)}
      isFavorite={isFavorite}
      className="[&_.sidebar]:hidden" // Ocultar sidebar en mobile
    >
      { LodgingType === "hotels-and-resorts" && <HotelsResortsResultSimple /> }
      { LodgingType === "apartments-and-longstays" && <ApartmentsLongstaysResults /> }
      { LodgingType === "hostels-and-guesthouses" && <HostelsGuesthousesResults /> }

    </CustomSheet>
  );
}
