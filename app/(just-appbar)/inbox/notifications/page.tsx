// app/(just-appbar)/inbox/notifications/page.tsx
export const dynamic = "force-dynamic";

import NotificationsClient from "@/components/inbox/NotificationsClient";

export default function NotificationsPage() {
  return <NotificationsClient />;
}
