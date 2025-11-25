'use client';

import { CustomSheet } from '@/components/shared/CustomSheet';
import React, { useState } from 'react';
import BusesResultsTemplate from '../BusesResultsTemplate';

interface IMobileBusResultsTemplateProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function MobileBusResultsTemplate({
  open,
  onOpenChange
}: IMobileBusResultsTemplateProps) {
const [isFavorite, setIsFavorite] = useState(false);

    const handleShare = () => {
       // Implementar lógica de compartir
       console.log("Compartir búsqueda");
     };
    return (
       <CustomSheet
                open={open}
                onOpenChange={onOpenChange}
                title="Resultados de Buses"
                showShareButton
                showFavoriteButton
                onShareClick={handleShare}
                onFavoriteClick={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
                className="[&_.sidebar]:hidden" // Ocultar sidebar en mobile
              >
                   {/* Aquí irían los resultados de buses */}
            <BusesResultsTemplate/>
        </CustomSheet>
   );
}