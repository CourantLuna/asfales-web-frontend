
import LodgingSearchBar from "@/components/lodging-search/LodgingSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function HotelsAndResortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      < >
      
      {children}
    </>
  );
}