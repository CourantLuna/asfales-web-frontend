import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import CruisesSearchBar from "@/components/transport/CruisesSearchBar";
export const dynamic = "force-dynamic";

export default function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
    <div>
      <div className = "">
        <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-8 ">
          ¡Te llevamos navegando!
        </h1>
        </div>
        <CruisesSearchBar />
       <div className="w-full py-2">
                        <BreadcrumbNav />
                      </div>
        
    <div>{children}</div>
    </div>
   );
}