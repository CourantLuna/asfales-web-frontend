// components/ShowIfAuth.tsx
"use client";

import { ReactNode, Suspense } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";

function ShowIfAuthInner({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const params = useSearchParams();
  const didLogout = params.get("logout") === "1";

  // solo mostramos si hay user _y_ NO acabamos de hacer logout
  if (!user || didLogout) return null;
  return <>{children}</>;
}

export function ShowIfAuth({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ShowIfAuthInner>{children}</ShowIfAuthInner>
    </Suspense>
  );
}
