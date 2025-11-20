"use client";

import { ChevronLeft, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <>
      {/* Header con botón de retorno */}
      <div className=" fixed top-0 left-0 right-0 z-50 h-16 flex items-center p-8 mt-5">
        <div 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10  backdrop-blur-sm hover:bg-white/20 transition-colors"

        onClick={() => router.push("/")}>
          
       
          <MoveLeft className="h-6 w-6 text-white hover:text-secondary" />
        </div>
      </div>
      
      {children}
    </>
  );
}
