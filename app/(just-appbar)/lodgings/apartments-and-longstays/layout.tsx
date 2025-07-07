import LodgingSearchBar from "@/components/lodging-search/LodgingSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });


export default function ApartmentsAndLongstaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <LodgingSearchBar lodgingType="apartments-and-longstays"/>
        <div className="w-full py-2 px-4">
          <BreadcrumbNav />
        </div>
        {children}
      </>
    );
}