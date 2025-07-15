import CruiseCardDemo from '@/components/transport/CruiseCardDemo';
import { Suspense } from 'react';
export const dynamic = "force-dynamic";

export default function CruisesDemo() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
        <CruiseCardDemo />
    </Suspense>
  );
}
