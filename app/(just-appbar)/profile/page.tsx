// app/(just-appbar)/profile/page.tsx
import Profile from "@/components/profile/Profile";
import React, { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Profile />
    </Suspense>
  );
}
