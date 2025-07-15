import ExperienceCardDemo from '@/components/experiences/ExperienceCardDemo';
export const dynamic = "force-dynamic";
import React, { Suspense } from 'react';
export default function ExperiencesDemo() {
  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
      <ExperienceCardDemo />
    </Suspense>
  );
}
