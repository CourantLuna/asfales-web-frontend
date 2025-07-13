import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import FlightsSearchBar from "@/components/transport/FlightsSearchBar";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    
        <FlightsSearchBar />

      <div className="w-full py-2">
        <BreadcrumbNav />
      </div>

      <div>{children}</div>
    </div>
  );
}
