'use client';

import { CustomSheet } from '@/components/shared/CustomSheet';
import React, { useState } from 'react';
import { ItinerariesResultsTemplate } from '../ItinerariesResultsTemplate';

interface IMobileItinerariesResultsTemplateProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function MobileItinerariesResultsTemplate({
    open,
    onOpenChange
}: IMobileItinerariesResultsTemplateProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleShare = () => {
        // Implementar lógica de compartir
        console.log("Compartir búsqueda");
    };

    return (
        <CustomSheet
            open={open}
            onOpenChange={onOpenChange}
            title="Resultados de Itinerarios"
            showShareButton
            showFavoriteButton
            onShareClick={handleShare}
            onFavoriteClick={() => setIsFavorite(!isFavorite)}
            isFavorite={isFavorite}
            className="[&_.sidebar]:hidden" // Ocultar sidebar en mobile
        >
            {/* Aquí irían los resultados de Cruceros */}
            <ItinerariesResultsTemplate/>

        </CustomSheet>
    );
}