import LodgingHomeSearchBar from "@/components/lodging-search/LodgingHomeSearchBar";
import LodgingSearchBar from "@/components/lodging-search/LodgingSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export default function LodgingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className + " flex flex-col min-h-screen w-full"}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <LodgingHomeSearchBar />
    
      <div className="w-full pt-1 pb-2 p-4 lg:px-6 lg:py-2 flex-1 flex flex-col h-full max-w-7xl mx-auto">
       
        {children}
      </div>
       </ThemeProvider>
    </div>
  );
}