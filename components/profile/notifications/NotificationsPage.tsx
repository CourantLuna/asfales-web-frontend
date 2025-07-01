"use client";

import NotificationsConfig from "@/components/profile/NotificationsConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 lg:hidden">
      {/* Header con botón de regreso */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center p-4">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="mr-3">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Comunicaciones</h1>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <NotificationsConfig />
      </div>
    </div>
  );
}
