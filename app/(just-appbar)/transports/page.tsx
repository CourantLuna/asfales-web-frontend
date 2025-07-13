import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";
import TransportSearchBar from "@/components/transport/TransportsSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";

export default function Page() {
   return (
       <div>
        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
          <TransportSearchBar />
          <div className="w-full py-2 mx-auto max-w-7xl w-full">
                    <BreadcrumbNav />
                  </div>
        </Suspense>
       </div>
   );
}