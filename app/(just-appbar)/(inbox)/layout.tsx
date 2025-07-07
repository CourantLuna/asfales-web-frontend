"use client";
import { Bell, MessageCircle, BellRing } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function InboxLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
    router.prefetch("/notifications");
    router.prefetch("/chats");
    router.prefetch("/alerts");
    router.push("/notifications"); // Redirige a la página de notificaciones por defecto
  }, [router]);

  const pathname = usePathname() ?? "";
  const activeTab = pathname.endsWith("/chats")
    ? "chats"
    : pathname.endsWith("/alerts")
    ? "alerts"
    : "notifications";

  const classNameTab = `
    flex-1 justify-center border-b-2 border-transparent bg-transparent
    data-[state=active]:border-primary
    data-[state=active]:text-primary
    text-muted-foreground font-medium
    px-4 py-2 transition-colors
  `;

  return (
    <div className="w-full mx-auto pt-5 flex-1 flex-col flex">
     
      <Tabs value={activeTab} className=" flex justify-center border-b-2">
        <TabsList className="bg-transparent grid  grid-cols-3">
          <TabsTrigger value="notifications" asChild className={classNameTab}>
            <Link href="/notifications" className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Avisos
            </Link>
          </TabsTrigger>

          <TabsTrigger value="chats" asChild className={classNameTab}>
            <Link href="/chats" className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Mensajes
            </Link>
          </TabsTrigger>

          <TabsTrigger value="alerts" asChild className={classNameTab}>
            <Link href="/alerts" className="flex items-center justify-center gap-2">
              <BellRing className="w-4 h-4" />
              Alertas
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 max-w-7xl mx-auto flex-1 flex flex-col h-full mt-30 md:mt-0 md:justify-center">{children}</div>
    </div>
  );
}
