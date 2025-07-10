"use client";

import { useState } from "react";
import { CustomSheet } from "@/components/shared/CustomSheet";
import LodgingSearchMedellinDemo from "./LodgingSearchMedellinDemo";

interface MobileLodgingResultsTemplateProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MobileLodgingResultsTemplate({
  open,
  onOpenChange
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
      <LodgingSearchMedellinDemo />
    </CustomSheet>
  );
}
