"use client";
import { Bell, MessageCircle, BellRing } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

export default function InboxLayout({ children }: { children: React.ReactNode }) {
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
    <div className="w-full max-w-7xl mx-auto px-4 py-8 border-b">
      <Tabs value={activeTab} className="mt-[130px] flex justify-center border-b-2">
        <TabsList className="bg-transparent grid  grid-cols-3">
          <TabsTrigger value="notifications" asChild className={classNameTab}>
            <Link href="/inbox/notifications" className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Notificaciones
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

      <div className="mt-6">{children}</div>
    </div>
  );
}
