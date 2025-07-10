import FooterMobile from "@/components/shared/FooterMobile";
import TravelSearchBarMobile from "@/components/shared/TravelSearchBarMobile";

export default function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
     <div className="w-full mx-auto pt-5 flex-1 min-h-0 flex flex-col">
       <div className="w-full px-4 flex-1 flex flex-col">
               <TravelSearchBarMobile/>

         {children}
         </div>
       <FooterMobile />
     </div>
   );
}