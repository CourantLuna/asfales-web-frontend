"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { ShowIfUnauth } from "@/components/ShowIfUnauth";

export default function LandingBanner() {
  return (
   <ShowIfUnauth>
  <div className="w-full bg-background pb-5">
    <div className="w-full max-w-7xl mx-auto bg-blue-900 text-white rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-3">
      <div className="flex items-center space-x-2">
        <LogIn className="w-14 h-14 mr-2" />
        <span>Inicia sesión para acceder a los precios de miembros de One Key</span>
      </div>
      <Link
        href="/login"
        className="w-full md:w-[280px] px-4  py-2 bg-primary hover:bg-primary/90 rounded-full text-sm text-center"
      >
        Iniciar sesión
      </Link>
    </div>
  </div>
</ShowIfUnauth>

  );
}
