
import ExperiencesSearchBar from "@/components/experiences/ExperiencesSearchBar";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
export default function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
    <div className={inter.className + " flex flex-col"}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className = "">
        <h1 className="hidden lg:block text-4xl text-secondary mx-auto max-w-7xl w-full mb-8 ">
          ¡Vive lo local!
        </h1>
        </div>
    <Suspense
                    fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}
                  >
        <ExperiencesSearchBar />
        <div className="w-full py-2 mx-auto max-w-7xl w-full">
          <BreadcrumbNav />
        </div>
</Suspense>
        <div className="w-full pt-1 pb-2 p-4 2xl:px-0 lg:py-2 flex-1 flex flex-col h-full max-w-7xl mx-auto">
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}