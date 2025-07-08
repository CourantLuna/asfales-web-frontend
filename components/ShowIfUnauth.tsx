// components/ShowIfUnauth.tsx
"use client";

import { ReactNode, Suspense } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";

function ShowIfUnauthInner({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const params = useSearchParams();
  const didLogout = params.get("logout") === "1";

  // si hay user _y_ NO acabamos de hacer logout, NO mostramos
  if (user && !didLogout) return null;
  return <>{children}</>;
}

export function ShowIfUnauth({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null} >
      <ShowIfUnauthInner>{children}</ShowIfUnauthInner>
    </Suspense>
  );
}
