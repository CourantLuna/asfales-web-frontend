// app/(just-appbar)/inbox/chats/page.tsx
export const dynamic = "force-dynamic";

import ChatsClient from "@/components/inbox/ChatsClient";

export default function ChatsPage() {
  return <ChatsClient />;
}
