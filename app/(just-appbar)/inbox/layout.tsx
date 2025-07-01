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
    router.prefetch("/inbox/general");
    router.prefetch("/inbox/chats");
    router.prefetch("/inbox/alerts");
  }, [router]);

  const pathname = usePathname() ?? "";
  const activeTab = pathname.endsWith("/chats")
    ? "chats"
    : pathname.endsWith("/alerts")
    ? "alerts"
    : "general";

  const classNameTab = `
    flex-1 justify-center border-b-2 border-transparent bg-transparent
    data-[state=active]:border-primary
    data-[state=active]:text-primary
    text-muted-foreground font-medium
    px-4 py-2 transition-colors
  `;

  return (
    <div className="w-full mx-auto">
      <div className="md:hidden mb-4  w-full">
              <h1 className="text-2xl font-semibold mx-4 text-secondary ">Notificaciones</h1>

      </div>
      <Tabs value={activeTab} className="  md:mt-[60px] flex justify-center border-b-2">
        <TabsList className="bg-transparent grid  grid-cols-3">
          <TabsTrigger value="general" asChild className={classNameTab}>
            <Link href="/inbox/general" className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              General
            </Link>
          </TabsTrigger>

          <TabsTrigger value="chats" asChild className={classNameTab}>
            <Link href="/inbox/chats" className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Mensajes
            </Link>
          </TabsTrigger>

          <TabsTrigger value="alerts" asChild className={classNameTab}>
            <Link href="/inbox/alerts" className="flex items-center justify-center gap-2">
              <BellRing className="w-4 h-4" />
              Alertas
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
