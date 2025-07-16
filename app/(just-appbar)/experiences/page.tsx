import ExperiencesHomeAndResults from '@/components/experiences/ExperiencesHomeAndResults';
import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";

export default function Page() {
   return (
       <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
        <ExperiencesHomeAndResults />
        </Suspense>
   );
}