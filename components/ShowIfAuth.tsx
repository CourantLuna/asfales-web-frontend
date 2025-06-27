// components/ShowIfAuth.tsx
"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";

export function ShowIfAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const params = useSearchParams();
  const didLogout = params.get("logout") === "1";

  // solo mostramos si hay user _y_ NO acabamos de hacer logout
  if (!user || didLogout) return null;
  return <>{children}</>;
}
