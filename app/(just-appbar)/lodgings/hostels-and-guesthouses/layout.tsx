import LodgingSearchBar from "@/components/lodging-search/LodgingSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });


export default function HostelsGueshousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
       
        {children}
      </>
    );
}