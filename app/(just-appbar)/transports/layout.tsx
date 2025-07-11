import TransportSearchBar from "@/components/transport/TransportsSearchBar";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className + " flex flex-col w-full"}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      ></ThemeProvider>
      <div className="w-full pt-1 pb-2 p-4 lg:p-6 flex-1 flex flex-col h-full max-w-7xl mx-auto">
            <div className="w-full flex-1 flex flex-col ">
        <TransportSearchBar />
                    {children}

            </div>
      </div>
    </div>
  );
}