'use client';

import CruisesDemo from '@/app/demo/cruises/page';
import { CustomSheet } from '@/components/shared/CustomSheet';
import React, { useState } from 'react';
import CruisesResultsTemplate from '../CruisesResultsTemplate';

interface IMobileCruiseResultsTemplateProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function MobileCruiseResultsTemplate({
  open,
  onOpenChange
}: IMobileCruiseResultsTemplateProps) {
   const [isFavorite, setIsFavorite] = useState(false);
   
       const handleShare = () => {
          // Implementar lógica de compartir
          console.log("Compartir búsqueda");
        };
   return (
       <CustomSheet
                open={open}
                onOpenChange={onOpenChange}
                title="Resultados de Cruceros"
                showShareButton
                showFavoriteButton
                onShareClick={handleShare}
                onFavoriteClick={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
                className="[&_.sidebar]:hidden" // Ocultar sidebar en mobile
              >
                   {/* Aquí irían los resultados de Cruceros */}
                   <CruisesResultsTemplate/>
          
              </CustomSheet>
   );
}